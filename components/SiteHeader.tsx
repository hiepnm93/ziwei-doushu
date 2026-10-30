'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

const NAV = [
  { href: '/gioi-thieu', label: 'Giới thiệu' },
  { href: '/heming', label: 'So lá số' },
];

// 顶部导航：首页、/gioi-thieu 共用；「Lập lá số」回首页（表单就在首页）
export default function SiteHeader() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-2 px-4 sm:px-8 py-3"
      style={{ background: 'var(--bg-0)', borderBottom: '1px solid var(--bdr)' }}>
      <Link href="/" className="text-[11px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] font-medium flex-shrink-0"
        style={{ color: 'var(--ac)' }}>
        Tử Vi Đẩu Số
      </Link>
      <nav className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
        <ThemeToggle />
        {NAV.map(n => (
          <Link key={n.href} href={n.href}
            className="text-[11px] sm:text-xs px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full"
            style={{
              border: '1px solid var(--bdr-med)',
              color: path === n.href ? 'var(--ac)' : 'var(--tx-2)',
            }}>
            {n.label}
          </Link>
        ))}
        {/* mobile: logo already links home, this button would overflow 390px */}
        <Link href="/"
          className="hidden sm:inline-block text-xs px-4 py-1.5 rounded-full"
          style={{ border: '1px solid var(--ac-bdr)', color: 'var(--ac)' }}>
          Lập lá số
        </Link>
      </nav>
    </header>
  );
}
