// AI 解读：把客户端整理好的命盘文字交给 AI 代理（内网，持有 Cloudflare token），返回越南语解读。
// Flow: InsightPanel → POST {text} → per-IP + global daily cap → AI_PROXY_URL (OpenAI-style chat) → {text}
import { NextResponse } from 'next/server';

const PROXY = process.env.AI_PROXY_URL; // e.g. http://cfai:8080/chat — token lives in the proxy, not here
const PER_IP = Number(process.env.AI_PER_IP_DAY || 5);
const GLOBAL = Number(process.env.AI_GLOBAL_DAY || 300); // free tier 10k neurons/day
const MAX_IN = 4000;

const SYSTEM = `Bạn là thầy Tử Vi Đẩu Số. Người dùng gửi lá số (các cung, sao, tứ hóa, đại hạn).
Viết luận giải bằng tiếng Việt, giọng mộc mạc, dễ hiểu, khoảng 300-450 chữ:
1) Tính cách và điểm mạnh theo cung Mệnh/Thân; 2) Sự nghiệp, tài lộc; 3) Tình cảm, gia đạo; 4) Đại hạn hiện tại nên chú ý gì.
Chỉ dựa vào dữ liệu lá số. Không phán chuyện sống chết, bệnh nặng; không khuyên tài chính cụ thể.
Kết bằng một câu nhắc: Tử Vi chỉ để tham khảo. Nếu nội dung gửi tới không phải lá số Tử Vi thì từ chối ngắn gọn.`;

// ponytail: in-memory counters, reset on container restart; move to a store if we run >1 replica
let day = '';
const perIp = new Map<string, number>();
let total = 0;

function today() {
  return new Date(Date.now() + 7 * 3600_000).toISOString().slice(0, 10); // VN date (UTC+7)
}

export async function POST(req: Request) {
  if (!PROXY) return NextResponse.json({ error: 'Chưa cấu hình AI.' }, { status: 503 });

  let text: unknown;
  try {
    ({ text } = await req.json());
  } catch {
    return NextResponse.json({ error: 'Dữ liệu không hợp lệ.' }, { status: 400 });
  }
  if (typeof text !== 'string' || !text.trim() || text.length > MAX_IN) {
    return NextResponse.json({ error: 'Dữ liệu không hợp lệ.' }, { status: 400 });
  }

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
        messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: text }],
        max_tokens: 900,
        temperature: 0.6,
      }),
      signal: AbortSignal.timeout(60_000),
    });
    const j = await r.json().catch(() => null);
    const out = j?.choices?.[0]?.message?.content;
    if (!r.ok || typeof out !== 'string') {
      perIp.set(ip, used); total--; // failed call doesn't burn the user's quota
      console.error('interpret upstream', r.status, JSON.stringify(j?.errors ?? '').slice(0, 300));
      return NextResponse.json({ error: 'AI đang bận, thử lại sau ít phút.' }, { status: 502 });
    }
    return NextResponse.json({ text: out.trim(), left: PER_IP - used - 1 });
  } catch (e) {
    perIp.set(ip, used); total--;
    console.error('interpret', String(e).slice(0, 200));
    return NextResponse.json({ error: 'AI đang bận, thử lại sau ít phút.' }, { status: 502 });
  }
}
