import { SITE_NAME } from '@/lib/site';

export const metadata = { title: `Chính sách bảo mật · ${SITE_NAME}`, description: `Chính sách bảo mật ${SITE_NAME}` };

const H2 = { fontSize: 18, marginTop: 32, marginBottom: 12 } as const;

export default function PrivacyPage() {
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
        <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>Chính sách bảo mật</h1>
        <p style={{ fontSize: 12, color: 'var(--tx-3)', marginBottom: 32 }}>Cập nhật: 10/2026</p>

        <h2 style={H2}>1. Thông tin bạn nhập</h2>
        <p>Để lập lá số, bạn nhập: tên (không bắt buộc), ngày tháng năm sinh dương lịch, giờ sinh, giới tính, nơi sinh (để tính giờ Mặt Trời thực). Lá số được tính <strong>ngay trên trình duyệt của bạn</strong>; bản mở nguồn không có tài khoản, thanh toán hay máy chủ luận giải AI, nên không gửi các thông tin này về máy chủ để lưu.</p>

        <h2 style={H2}>2. Liên kết chia sẻ</h2>
        <p>Khi bạn bấm chia sẻ, thông tin sinh được mã hóa vào địa chỉ liên kết (URL). Ai có liên kết đều xem được lá số đó — chỉ gửi cho người bạn tin.</p>

        <h2 style={H2}>3. Lưu trữ cục bộ</h2>
        <p>Trang dùng localStorage của trình duyệt để lưu: giao diện sáng/tối, lịch sử lá số gần đây, tùy chọn trường phái. Dữ liệu này chỉ nằm trên máy bạn; bạn có thể xóa trong cài đặt trình duyệt bất cứ lúc nào.</p>

        <h2 style={H2}>4. Hạ tầng</h2>
        <p>Như mọi trang web, máy chủ hoặc dịch vụ trung gian (CDN) có thể ghi nhật ký truy cập kỹ thuật (địa chỉ IP, thời điểm, trang được mở). Bản này không dùng công cụ phân tích của bên thứ ba.</p>

        <h2 style={H2}>5. Người chưa thành niên</h2>
        <p>Nội dung mệnh lý dành cho người từ 18 tuổi. Người chưa thành niên nên dùng khi có sự đồng ý của người giám hộ và không dùng kết quả cho các quyết định lớn.</p>

        <h2 style={H2}>6. Thay đổi chính sách</h2>
        <p>Chính sách này có thể được cập nhật. Tiếp tục sử dụng nghĩa là bạn đồng ý với bản cập nhật.</p>

        <p style={{ marginTop: 48, fontSize: 12, color: 'var(--tx-3)' }}>
          <a href="/terms" style={{ color: 'var(--ac)' }}>Điều khoản sử dụng</a> · <a href="/" style={{ color: 'var(--ac)' }}>Về trang chủ</a>
        </p>
      </main>
    </>
  );
}
