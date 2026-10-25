import { SITE_NAME } from '@/lib/site';

export const metadata = { title: `Điều khoản sử dụng · ${SITE_NAME}`, description: `Điều khoản sử dụng ${SITE_NAME}` };

const H2 = { fontSize: 18, marginTop: 32, marginBottom: 12 } as const;

export default function TermsPage() {
  return (
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg-0)', borderBottom: '1px solid var(--bdr)', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--tx-3)', textDecoration: 'none' }}>
          <span style={{ fontSize: '16px' }}>‹</span>
          <span>Về trang chủ</span>
        </a>
        <div style={{ width: '1px', height: '20px', background: 'var(--bdr-med)' }} />
        <span style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.2em' }}>{SITE_NAME}</span>
      </header>
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 80px', color: 'var(--tx-1)', lineHeight: 1.8 }}>
        <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>Điều khoản sử dụng</h1>
        <p style={{ fontSize: 12, color: 'var(--tx-3)', marginBottom: 32 }}>Cập nhật: 10/2026</p>

        <h2 style={H2}>1. Giới thiệu</h2>
        <p>{SITE_NAME} (sau đây gọi là “trang này”) là bản tiếng Việt mở nguồn, lập lá số Tử Vi Đẩu Số theo hệ thống «Thiên Kỷ» của thầy Nghê Hải Hạ. Mọi nội dung mệnh lý chỉ để tham khảo, <strong>không phải lời khuyên y tế, đầu tư, pháp lý, tâm lý hay cho các quyết định quan trọng trong đời</strong>.</p>

        <h2 style={H2}>2. Giấy phép</h2>
        <ul style={{ paddingLeft: 24 }}>
          <li>Mã nguồn dựa trên dự án mở nguồn <a href="https://github.com/Renhuai123/ziwei-doushu" style={{ color: 'var(--ac)' }}>Renhuai123/ziwei-doushu</a> (giấy phép MIT); bản tiếng Việt: <a href="https://github.com/hiepnm93/ziwei-doushu" style={{ color: 'var(--ac)' }}>hiepnm93/ziwei-doushu</a>.</li>
          <li>Lời giảng của thầy Nghê Hải Hạ và phần biên dịch: <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.vi" style={{ color: 'var(--ac)' }}>CC BY-NC-SA 4.0</a> — ghi nguồn, phi thương mại, chia sẻ cùng giấy phép.</li>
        </ul>

        <h2 style={H2}>3. Sử dụng hợp lý</h2>
        <ul style={{ paddingLeft: 24 }}>
          <li>Chỉ dùng cho mục đích hợp pháp, tham khảo cá nhân, học tập.</li>
          <li>Không dùng phần lời giảng vào mục đích thương mại (theo CC BY-NC-SA 4.0).</li>
          <li>Kết quả phụ thuộc thông tin sinh bạn nhập; trang này không chịu trách nhiệm về sai lệch do thông tin sai.</li>
        </ul>

        <h2 style={H2}>4. Miễn trừ trách nhiệm</h2>
        <p>Nội dung được biên soạn từ Tử Vi Đẩu Số truyền thống và hệ thống của thầy Nghê Hải Hạ, <strong>không bảo đảm chính xác tuyệt đối</strong>. Vận mệnh chịu ảnh hưởng của cả Thiên, Địa, Nhân; hãy xem kết quả như một tham chiếu để hiểu bản thân, đừng phụ thuộc vào một nhận định mệnh lý duy nhất.</p>
        <p>Trang này không chịu trách nhiệm pháp lý về mọi hậu quả phát sinh từ việc sử dụng nội dung (bao gồm quyết định sai, ảnh hưởng tâm lý, thay đổi quan hệ…).</p>

        <h2 style={H2}>5. Thay đổi dịch vụ</h2>
        <p>Trang này có thể điều chỉnh, tạm dừng hoặc ngừng một phần hay toàn bộ tính năng bất cứ lúc nào.</p>

        <p style={{ marginTop: 48, fontSize: 12, color: 'var(--tx-3)' }}>
          <a href="/privacy" style={{ color: 'var(--ac)' }}>Chính sách bảo mật</a> · <a href="/" style={{ color: 'var(--ac)' }}>Về trang chủ</a>
        </p>
      </main>
    </>
  );
}
