import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import ChartApp from '@/components/ChartApp';

// 首页：一进来就是起盘表单，起盘后命盘同页显示；介绍内容在 /gioi-thieu
const LINKS = [
  { href: '/gioi-thieu', label: 'Giới thiệu' },
  { href: '/knowledge', label: 'Kho kiến thức' },
  { href: '/library', label: 'Thư viện cổ thư' },
  { href: '/terms', label: 'Điều khoản' },
  { href: '/privacy', label: 'Bảo mật' },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="px-4 pt-6 pb-10 sm:pt-8">
        <div className="text-center mb-5" style={{ maxWidth: 720, margin: '0 auto 20px' }}>
          <h1 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--tx-0)' }}>Lập lá số Tử Vi Đẩu Số</h1>
          <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--tx-3)' }}>
            Nhập ngày giờ sinh, lá số hiện ngay bên dưới — miễn phí, không cần đăng ký.
          </p>
        </div>
        <ChartApp />
        <nav className="mt-10 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs" style={{ color: 'var(--tx-3)' }}>
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} className="underline underline-offset-2">{l.label}</Link>
          ))}
        </nav>
      </main>
    </>
  );
}
