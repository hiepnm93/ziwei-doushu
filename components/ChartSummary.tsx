'use client';
import { motion } from 'framer-motion';
import type { ZiweiChart } from '@/lib/ziwei/types';
import { viTerm, viPalace, viStem, viBranch } from '@/lib/i18n/vi';
import { detectPatterns, getMingGongSummary } from '@/lib/ziwei/patterns';

interface ChartSummaryProps {
  chart: ZiweiChart;
}

const PatternLevelStyle = {
  excellent: { dot: 'bg-amber-400', label: 'text-amber-500', badge: 'text-amber-500 bg-amber-500/10 border-amber-500/25' },
  good: { dot: 'bg-sky-400', label: 'text-sky-500', badge: 'text-sky-500 bg-sky-500/10 border-sky-500/25' },
  neutral: { dot: 'bg-slate-400', label: 'text-slate-400', badge: 'text-slate-400 bg-slate-500/10 border-slate-500/20' },
  caution: { dot: 'bg-orange-500', label: 'text-orange-500', badge: 'text-orange-500 bg-orange-500/10 border-orange-500/25' },
};

const SIHUA_ORDER = ['禄', '权', '科', '忌'];
const SIHUA_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  '禄': { text: '#22a35a', bg: 'rgba(74,222,128,0.06)', border: 'rgba(74,222,128,0.25)' },
  '权': { text: '#3b82f6', bg: 'rgba(96,165,250,0.06)', border: 'rgba(96,165,250,0.25)' },
  '科': { text: '#ca9a04', bg: 'rgba(250,204,21,0.06)', border: 'rgba(250,204,21,0.25)' },
  '忌': { text: '#ef4444', bg: 'rgba(248,113,113,0.06)', border: 'rgba(248,113,113,0.25)' },
};

export default function ChartSummary({ chart }: ChartSummaryProps) {
  const patterns = detectPatterns(chart);
  const { stars: mingStars, keywords, nature } = getMingGongSummary(chart);
  const currentDx = chart.daXians[chart.currentDaXianIndex];

  const siHuaSummary: { name: string; siHua: string; palaceName: string }[] = [];
  for (const palace of chart.palaces) {
    for (const star of palace.stars) {
      if (star.siHua) siHuaSummary.push({ name: star.name, siHua: star.siHua, palaceName: palace.name });
    }
  }
  siHuaSummary.sort((a, b) => SIHUA_ORDER.indexOf(a.siHua) - SIHUA_ORDER.indexOf(b.siHua));

  const lunar = chart.lunarInfo;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="grid gap-4 md:grid-cols-2"
    >
      {/* ── Tổng quan mệnh cách ── */}
      <div className="card-glass rounded-xl p-5 md:col-span-2">
        <div className="text-[10px] tracking-widest mb-4 flex items-center gap-2" style={{ color: 'var(--t-faint)' }}>
          <span style={{ color: 'var(--t-gold)', opacity: 0.6 }}>✦</span>
          Tổng quan mệnh cách
        </div>

        <div className="flex flex-wrap items-start gap-4">
          <div>
            <div className="text-[9px] mb-1.5" style={{ color: 'var(--t-faint)' }}>Chính tinh cung Mệnh</div>
            <div className="flex items-center gap-2">
              {mingStars.length > 0 ? (
                mingStars.map(s => (
                  <span key={s} className="font-bold text-lg" style={{ color: 'var(--t-gold)' }}>{viTerm(s)}</span>
                ))
              ) : (
                <span className="text-sm" style={{ color: 'var(--t-faint)' }}>Vô chính diệu</span>
              )}
            </div>
            {nature && <div className="text-[10px] mt-1" style={{ color: 'var(--t-gold)', opacity: 0.6 }}>{nature}</div>}
          </div>

          {keywords.length > 0 && (
            <div>
              <div className="text-[9px] mb-1.5" style={{ color: 'var(--t-faint)' }}>Đặc điểm tính cách</div>
              <div className="flex flex-wrap gap-1.5">
                {keywords.map(k => (
                  <span key={k} className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ color: 'var(--t-gold)', background: 'var(--ac-bg)', border: '1px solid var(--ac-bdr)' }}>
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="ml-auto text-right">
            <div className="text-[9px] mb-1" style={{ color: 'var(--t-faint)' }}>Ngũ hành cục · Đại hạn hiện tại</div>
            <div className="text-[11px]" style={{ color: 'var(--t-text2)' }}>{viTerm(chart.wuxingJuName)}</div>
            {currentDx && (
              <div className="text-[11px] text-purple-500 mt-0.5">
                {currentDx.startAge}–{currentDx.endAge} tuổi · {viTerm(currentDx.palaceName)}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 pt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px]"
          style={{ borderTop: '1px solid var(--t-border)', color: 'var(--t-faint)' }}>
          <span>Dương lịch {chart.birthInfo.day}/{chart.birthInfo.month}/{chart.birthInfo.year}</span>
          <span>
            Âm lịch {lunar.lunarDay}/{Math.abs(lunar.lunarMonth)}{lunar.isLeapMonth ? ' (nhuận)' : ''}/{lunar.lunarYear}
          </span>
          <span>Năm {viStem(lunar.yearStem)} {viBranch(lunar.yearBranch)} · giờ {viBranch(chart.birthInfo.hour)}</span>
          <span>Cung Mệnh tại {viBranch(chart.mingGongBranch)} · cung Thân tại {viBranch(chart.shenGongBranch)}</span>
        </div>
      </div>

      {/* ── Tứ Hóa bản mệnh ── */}
      {siHuaSummary.length > 0 && (
        <div className="card-glass rounded-xl p-4">
          <div className="text-[10px] tracking-widest mb-3 flex items-center gap-2" style={{ color: 'var(--t-faint)' }}>
            <span style={{ color: 'var(--t-gold)', opacity: 0.6 }}>◆</span>
            Tứ Hóa bản mệnh
          </div>
          <div className="grid grid-cols-2 gap-2">
            {siHuaSummary.map(({ name, siHua, palaceName }) => {
              const c = SIHUA_COLORS[siHua] || SIHUA_COLORS['禄'];
              return (
                <div key={name + siHua}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-[10px]"
                  style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
                  <span className="font-medium">{viTerm(name)}</span>
                  <div className="flex items-center gap-1.5 text-right">
                    <span style={{ opacity: 0.7 }} className="text-[9px]">{viPalace(palaceName)}</span>
                    <span className="font-bold">Hóa {viTerm(siHua)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Vận trình đại hạn ── */}
      <div className="card-glass rounded-xl p-4">
        <div className="text-[10px] tracking-widest mb-3 flex items-center gap-2" style={{ color: 'var(--t-faint)' }}>
          <span className="text-purple-500/60">◎</span>
          Vận trình đại hạn
        </div>
        <div className="grid grid-cols-3 gap-2">
          {chart.daXians.slice(0, 9).map((dx, i) => {
            const isCurrent = i === chart.currentDaXianIndex;
            return (
              <div key={i}
                className="text-[10px] px-2 py-2 rounded-lg text-center transition-colors"
                style={{
                  border: isCurrent ? '1px solid rgba(147,51,234,0.4)' : '1px solid var(--t-border)',
                  background: isCurrent ? 'rgba(147,51,234,0.08)' : 'transparent',
                  color: isCurrent ? '#a78bfa' : 'var(--t-faint)',
                }}>
                <div className="font-mono tabular-nums">{dx.startAge}~{dx.endAge}</div>
                <div className="text-[9px] mt-0.5" style={{ opacity: 0.8 }}>{viPalace(dx.palaceName)}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Nhận diện cách cục ── */}
      {patterns.length > 0 && (
        <div className="card-glass rounded-xl p-4 md:col-span-2">
          <div className="text-[10px] tracking-widest mb-3 flex items-center gap-2" style={{ color: 'var(--t-faint)' }}>
            <span style={{ color: 'var(--t-gold)', opacity: 0.6 }}>◉</span>
            Nhận diện cách cục (theo điều kiện cổ thư)
            <span className="text-[9px] ml-auto" style={{ color: 'var(--t-faint)' }}>{patterns.length} cách cục</span>
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            {patterns.map((p, i) => {
              const st = PatternLevelStyle[p.level];
              return (
                <motion.div key={`${p.name}-${i}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="card-inner rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${st.dot}`} />
                    <span className={`text-[11px] font-medium ${st.label}`}>{viTerm(p.name)}</span>
                    <div className="flex gap-1 ml-auto">
                      {p.palaces.slice(0, 2).map(pa => (
                        <span key={pa} className={`text-[8px] px-1.5 py-px rounded-full border ${st.badge}`}>
                          {viPalace(pa)}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] leading-relaxed pl-3.5" style={{ color: 'var(--t-text2)' }}>{p.description}</p>

                  {p.conditions && (
                    <div className="mt-2 pl-3.5 space-y-0.5">
                      {p.conditions.required.length > 0 && (
                        <div className="text-[9px] leading-relaxed" style={{ color: 'var(--t-text2)' }}>
                          <span className="font-medium" style={{ color: 'var(--t-gold)' }}>Bắt buộc</span>
                          <span style={{ opacity: 0.6 }}> · </span>
                          {p.conditions.required.join(', ')}
                        </div>
                      )}
                      {p.conditions.bonus && p.conditions.bonus.length > 0 && (
                        <div className="text-[9px] leading-relaxed" style={{ color: 'var(--t-text2)' }}>
                          <span className="font-medium text-emerald-500">Cộng điểm</span>
                          <span style={{ opacity: 0.6 }}> · </span>
                          {p.conditions.bonus.join(', ')}
                        </div>
                      )}
                      {p.conditions.breaking && p.conditions.breaking.length > 0 && (
                        <div className="text-[9px] leading-relaxed" style={{ color: 'var(--t-text2)' }}>
                          <span className="font-medium text-orange-500">Phá cách</span>
                          <span style={{ opacity: 0.6 }}> · </span>
                          {p.conditions.breaking.join(', ')}
                        </div>
                      )}
                    </div>
                  )}

                  {p.source && (
                    <div className="text-[9px] mt-1.5 pl-3.5" style={{ color: 'var(--t-faint)', opacity: 0.7 }}>
                      Nguồn · {p.source}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}
