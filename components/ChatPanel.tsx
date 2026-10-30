'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ZiweiChart } from '@/lib/ziwei/types';
import { chartText } from '@/lib/ziwei/chart-text';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatPanelProps {
  chart: ZiweiChart;
}

const MAX_Q = 300; // khớp với app/api/interpret/route.ts

const PRESET_QUESTIONS = [
  'Mệnh cách tổng thể của tôi thế nào? Tính cách ra sao?',
  'Vận tình cảm, hôn nhân của tôi thế nào?',
  'Sự nghiệp, tài lộc của tôi thế nào? Hợp hướng nào?',
  'Đại hạn hiện tại của tôi thế nào?',
  'Sức khỏe tôi cần lưu ý gì?',
  'Vận năm nay của tôi thế nào?',
];

/**
 * Hỏi đáp AI về lá số. Mỗi câu hỏi là một lượt gọi riêng tới /api/interpret ({text, question}),
 * dùng chung hạn mức với nút «Luận giải» (máy chủ giữ token; trình duyệt không gọi AI trực tiếp).
 */
export default function ChatPanel({ chart }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const setLast = (content: string) =>
    setMessages(prev => [...prev.slice(0, -1), { role: 'assistant', content }]);

  const sendMessage = async (raw: string) => {
    const text = raw.trim().slice(0, MAX_Q);
    if (!text || loading) return;
    setMessages(prev => [...prev, { role: 'user', content: text }, { role: 'assistant', content: '' }]);
    setInput('');
    setLoading(true);
    let answer = '';
    try {
      const res = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: chartText(chart), question: text }),
      });
      if (!res.ok || !res.body) {
        const j = await res.json().catch(() => ({}));
        return setLast(j.error || 'Có lỗi, thử lại sau.');
      }
      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        answer += value;
        setLast(answer);
      }
      if (!answer.trim()) setLast('AI đang bận, thử lại sau ít phút.');
    } catch {
      setLast(answer || 'Không kết nối được, thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col rounded-xl overflow-hidden card-glass" style={{ maxHeight: 560 }}>
      <div className="px-4 py-3 flex-shrink-0" style={{ borderBottom: '1px solid var(--t-border)' }}>
        <h3 className="text-xs font-medium tracking-widest" style={{ color: 'var(--t-gold)' }}>Hỏi AI về lá số</h3>
        <p className="text-[10px] mt-0.5" style={{ color: 'var(--t-faint)' }}>
          Mỗi câu hỏi tính 1 lượt, chung hạn mức 5 lượt/ngày với nút Luận giải
        </p>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {messages.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4">
            <div className="text-3xl mb-2" style={{ color: 'var(--t-gold)', opacity: 0.2 }}>✦</div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--t-faint)' }}>
              Lá số đã lập xong, hãy đặt câu hỏi<br />
              hoặc chọn một câu hỏi gợi ý bên dưới
            </p>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className="max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed"
                style={msg.role === 'user' ? {
                  background: 'var(--ac-bg)',
                  border: '1px solid var(--ac-bdr)',
                  color: 'var(--t-gold)',
                } : {
                  background: 'var(--t-card)',
                  border: '1px solid var(--t-border)',
                  color: 'var(--t-text)',
                }}
              >
                {msg.role === 'assistant' && (
                  <div className="text-[10px] mb-1" style={{ color: 'var(--t-faint)' }}>Thầy Tử Vi (AI) ·</div>
                )}
                <div className="whitespace-pre-wrap text-xs leading-relaxed">
                  {msg.content}
                  {loading && i === messages.length - 1 && msg.role === 'assistant' && (
                    <span className="inline-block w-1.5 h-3 ml-0.5 animate-pulse" style={{ background: 'var(--t-gold)', opacity: 0.6 }} />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {messages.length === 0 && (
        <div className="px-3 pb-2 flex-shrink-0">
          <div className="grid grid-cols-2 gap-1.5">
            {PRESET_QUESTIONS.map(q => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                disabled={loading}
                className="text-left text-[10px] rounded-lg px-2.5 py-2 transition-colors line-clamp-2 hover:opacity-100"
                style={{ color: 'var(--t-text2)', border: '1px solid var(--t-border)', background: 'transparent' }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="px-3 pb-3 pt-2 flex-shrink-0" style={{ borderTop: '1px solid var(--t-border)' }}>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            maxLength={MAX_Q}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
            placeholder="Nhập câu hỏi, ví dụ: vận tình cảm của tôi thế nào?"
            disabled={loading}
            className="flex-1 rounded-lg px-3 py-2 text-xs focus:outline-none transition-colors"
            style={{ background: 'var(--t-card)', border: '1px solid var(--t-border)', color: 'var(--t-text)' }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
            className="px-3 py-2 rounded-lg text-xs font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: 'var(--ac-bg)', border: '1px solid var(--ac-bdr)', color: 'var(--t-gold)' }}
          >
            Hỏi
          </button>
        </div>
      </div>
    </div>
  );
}
