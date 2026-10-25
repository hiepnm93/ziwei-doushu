'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BirthForm, { type BirthFormState } from '@/components/BirthForm';
import { formToBirthInfo } from '@/lib/ziwei/share';
import { generateChart as buildChart } from '@/lib/ziwei/algorithm';
import type { ZiweiChart } from '@/lib/ziwei/types';
import { viTerm, viBranch } from '@/lib/i18n/vi';
import { useTheme } from '@/components/ThemeProvider';

export default function HemingPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // ─── 双方命盘状态 ─────────────────────────────────────────
  const [chartA, setChartA] = useState<ZiweiChart | null>(null);
  const [chartB, setChartB] = useState<ZiweiChart | null>(null);
  // 双方表单状态由 BirthForm onFormSave 同步到此处，统一按钮触发起盘
  const [formA, setFormA] = useState<BirthFormState | null>(null);
  const [formB, setFormB] = useState<BirthFormState | null>(null);

  const [formError, setFormError] = useState<string | null>(null);

  // 表单是否填齐
  const isFormReady = (f: BirthFormState | null): boolean =>
    !!(f && f.year && f.month && f.day && f.gender && (f.unknownTime || (f.clockHour !== '' && f.clockMinute !== '')));

  // 开源版不含 /api/heming：只在浏览器里起两张盘
  const runCompare = () => {
    setFormError(null);
    if (!isFormReady(formA) || !isFormReady(formB)) {
      setFormError('Vui lòng điền đầy đủ thông tin sinh của cả hai người');
      return;
    }
    try {
      setChartA(buildChart(formToBirthInfo(formA!)));
      setChartB(buildChart(formToBirthInfo(formB!)));
    } catch {
      setFormError('Không lập được lá số, vui lòng kiểm tra lại thông tin');
    }
  };

  const cardStyle = {
    background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.9)',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(200,160,60,0.2)'}`,
    borderRadius: '16px',
    padding: '24px',
  };

  const labelStyle = {
    fontSize: '10px', letterSpacing: '0.4em', color: 'var(--ac)', opacity: 0.7,
    marginBottom: '16px', display: 'block',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-0)' }}>
      {/* 顶栏 */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: isDark ? 'rgba(2,8,16,0.88)' : 'rgba(250,245,235,0.92)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--bdr)',
        display: 'flex', alignItems: 'center', padding: '0 24px', height: '52px', gap: '16px',
      }}>
        <button
          onClick={() => router.push('/')}
          style={{
            display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px',
            color: 'var(--tx-3)', background: 'none', border: 'none', cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: '16px' }}>‹</span>
          <span>Quay lại</span>
        </button>
        <div style={{ width: '1px', height: '20px', background: 'var(--bdr-med)' }} />
        <span style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.2em' }}>Hợp lá số</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: '11px', color: 'var(--tx-3)' }}>Tình cảm · Hợp tác · Cha con · Bạn bè</span>
      </header>

      {/* 主体 */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* 标题 */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ fontSize: '28px', color: 'var(--ac)', opacity: 0.15, marginBottom: '12px' }}>☯</div>
          <h1 style={{ fontSize: '22px', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--tx-0)', marginBottom: '8px' }}>
            Hợp lá số Tử Vi
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--tx-3)', lineHeight: 1.6 }}>
            Nhập thông tin sinh của hai người để lập và xem song song hai lá số theo hệ thống thầy Nghê Hải Hạ
          </p>
        </div>

        {/* 双栏表单 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}
          className="heming-grid">
          {/* 甲方 */}
          <div style={cardStyle}>
            <span style={labelStyle}>Người A</span>
            <BirthForm
              hideSubmit
              onSubmit={() => {}}
              onFormSave={setFormA}
            />
          </div>

          {/* 乙方 */}
          <div style={cardStyle}>
            <span style={labelStyle}>Người B</span>
            <BirthForm
              hideSubmit
              onSubmit={() => {}}
              onFormSave={setFormB}
            />
          </div>
        </div>

        {/* ═══ 双方命盘（浏览器内起盘；AI 合盘接口不在开源版）═══ */}
        <div style={{ ...cardStyle, textAlign: 'center' }}>
          <button
            onClick={runCompare}
            style={{
              padding: '14px 40px', borderRadius: 'var(--r-pill)', border: 'none',
              background: 'linear-gradient(135deg, #9a6210, #c88020)',
              color: '#fff8e8', fontSize: '14px', fontWeight: 600,
              letterSpacing: '0.05em', cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(140,100,20,0.25)',
            }}
          >
            Lập lá số hai người
          </button>
          {formError && (
            <div style={{ marginTop: '16px', fontSize: '13px', color: '#dc2626' }}>{formError}</div>
          )}
          <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--tx-3)' }}>
            Phân tích hợp hôn bằng AI: Tính năng này chưa có trên bản mở nguồn.
          </div>
        </div>

        {chartA && chartB && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '24px' }}
            className="heming-grid">
            {[chartA, chartB].map((c, i) => (
              <div key={i}>
                <span style={labelStyle}>{i === 0 ? 'Người A' : 'Người B'}</span>
                <ChartBrief chart={c} />
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 680px) {
          .heming-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/** 简要盘面（不引用 server-only 的 patterns） */
function ChartBrief({ chart }: { chart: ZiweiChart }) {
  const ming = chart.palaces.find(p => p.branch === chart.mingGongBranch);
  const main = ming?.stars.filter(s => s.type === 'major') ?? [];
  const row = { fontSize: '13px', color: 'var(--tx-2)', marginTop: '6px' } as const;
  return (
    <div style={{ padding: '14px 16px', borderRadius: '12px', border: '1px solid var(--bdr)', background: 'var(--bg-1)' }}>
      <div style={row}>Cung Mệnh: <strong>{viBranch(chart.mingGongBranch)}</strong> · Cung Thân: <strong>{viBranch(chart.shenGongBranch)}</strong></div>
      <div style={row}>Cục: <strong>{viTerm(chart.wuxingJuName)}</strong></div>
      <div style={row}>Chính tinh thủ Mệnh: <strong>{main.length ? main.map(s => viTerm(s.name)).join(', ') : 'Vô chính diệu'}</strong></div>
    </div>
  );
}
