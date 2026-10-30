// AI 解读：把客户端整理好的命盘文字交给 AI 代理（内网，持有 Cloudflare token），返回越南语解读。
// Flow: InsightPanel / ChatPanel → POST {text, question?} → per-IP + global daily cap → AI_PROXY_URL (OpenAI-style chat, SSE) → streamed plain text (errors: JSON {error})
import { NextResponse } from 'next/server';

const PROXY = process.env.AI_PROXY_URL; // e.g. http://cfai:8080/chat — token lives in the proxy, not here
const PER_IP = Number(process.env.AI_PER_IP_DAY || 5);
const GLOBAL = Number(process.env.AI_GLOBAL_DAY || 300); // free tier 10k neurons/day
const MAX_IN = 4000;
const MAX_Q = 300;

const SYSTEM = `Bạn là thầy Tử Vi Đẩu Số. Người dùng gửi lá số (các cung, sao, tứ hóa, đại hạn).
Viết luận giải bằng tiếng Việt, giọng mộc mạc, dễ hiểu, khoảng 300-450 chữ:
1) Tính cách và điểm mạnh theo cung Mệnh/Thân; 2) Sự nghiệp, tài lộc; 3) Tình cảm, gia đạo; 4) Đại hạn hiện tại nên chú ý gì.
Chỉ dựa vào dữ liệu lá số. Không phán chuyện sống chết, bệnh nặng; không khuyên tài chính cụ thể.
Kết bằng một câu nhắc: Tử Vi chỉ để tham khảo. Nếu nội dung gửi tới không phải lá số Tử Vi thì từ chối ngắn gọn.`;

// ChatPanel: one question about the same chart (stateless; each question costs one quota unit)
const SYSTEM_QA = `Bạn là thầy Tử Vi Đẩu Số. Người dùng gửi lá số (các cung, sao, tứ hóa, đại hạn) kèm một câu hỏi.
Trả lời đúng câu hỏi bằng tiếng Việt, giọng mộc mạc, dễ hiểu, khoảng 150-300 chữ, chỉ dựa vào dữ liệu lá số.
Không phán chuyện sống chết, bệnh nặng; không khuyên tài chính cụ thể. Kết bằng một câu nhắc: Tử Vi chỉ để tham khảo.
Nếu câu hỏi không liên quan tới lá số Tử Vi thì từ chối ngắn gọn.`;

// ponytail: in-memory counters, reset on container restart; move to a store if we run >1 replica
let day = '';
const perIp = new Map<string, number>();
let total = 0;

function today() {
  return new Date(Date.now() + 7 * 3600_000).toISOString().slice(0, 10); // VN date (UTC+7)
}

export async function POST(req: Request) {
  if (!PROXY) return NextResponse.json({ error: 'Chưa cấu hình AI.' }, { status: 503 });

  let text: unknown, question: unknown;
  try {
    ({ text, question } = await req.json());
  } catch {
    return NextResponse.json({ error: 'Dữ liệu không hợp lệ.' }, { status: 400 });
  }
  if (typeof text !== 'string' || !text.trim() || text.length > MAX_IN) {
    return NextResponse.json({ error: 'Dữ liệu không hợp lệ.' }, { status: 400 });
  }
  if (question !== undefined && (typeof question !== 'string' || !question.trim() || question.length > MAX_Q)) {
    return NextResponse.json({ error: `Câu hỏi trống hoặc dài quá ${MAX_Q} ký tự.` }, { status: 400 });
  }
  const q = typeof question === 'string' ? question.trim() : '';

  const d = today();
  if (d !== day) { day = d; perIp.clear(); total = 0; }
  const ip = req.headers.get('x-real-ip') || 'unknown'; // set by nginx from $remote_addr
  const used = perIp.get(ip) || 0;
  if (used >= PER_IP) {
    return NextResponse.json({ error: `Bạn đã dùng hết ${PER_IP} lượt hôm nay, mai quay lại nhé.` }, { status: 429 });
  }
  if (total >= GLOBAL) {
    return NextResponse.json({ error: 'Hôm nay hệ thống đã hết lượt AI, mai quay lại nhé.' }, { status: 429 });
  }
  perIp.set(ip, used + 1);
  total++;

  try {
    const r = await fetch(PROXY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: q
          ? [{ role: 'system', content: SYSTEM_QA }, { role: 'user', content: `${text}\n\nCâu hỏi: ${q}` }]
          : [{ role: 'system', content: SYSTEM }, { role: 'user', content: text }],
        max_tokens: q ? 600 : 900,
        temperature: 0.6,
        stream: true,
      }),
      signal: AbortSignal.timeout(90_000),
    });
    if (!r.ok || !r.body) {
      perIp.set(ip, used); total--; // failed call doesn't burn the user's quota
      console.error('interpret upstream', r.status, (await r.text().catch(() => '')).slice(0, 300));
      return NextResponse.json({ error: 'AI đang bận, thử lại sau ít phút.' }, { status: 502 });
    }
    // SSE "data: {choices:[{delta:{content}}]}" lines → plain text chunks for the client
    const reader = r.body.pipeThrough(new TextDecoderStream()).getReader();
    const enc = new TextEncoder();
    let buf = '';
    const out = new ReadableStream<Uint8Array>({
      // must enqueue or close before returning, else the stream never pulls again
      async pull(ctl) {
        for (;;) {
          const { value, done } = await reader.read().catch(() => ({ value: undefined, done: true }));
          if (done) return ctl.close();
          buf += value;
          const lines = buf.split('\n');
          buf = lines.pop() ?? '';
          let piece = '';
          for (const l of lines) {
            if (!l.startsWith('data: ') || l === 'data: [DONE]') continue;
            try { piece += JSON.parse(l.slice(6)).choices?.[0]?.delta?.content ?? ''; } catch {}
          }
          if (piece) return ctl.enqueue(enc.encode(piece));
        }
      },
      cancel() { reader.cancel(); },
    });
    return new Response(out, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache', 'X-Accel-Buffering': 'no' },
    });
  } catch (e) {
    perIp.set(ip, used); total--;
    console.error('interpret', String(e).slice(0, 200));
    return NextResponse.json({ error: 'AI đang bận, thử lại sau ít phút.' }, { status: 502 });
  }
}
