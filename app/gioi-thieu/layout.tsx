import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/site';

// page.tsx 是客户端组件，metadata 放这里
export const metadata: Metadata = {
  title: `Giới thiệu · ${SITE_NAME}`,
  description: 'Giới thiệu Tử Vi Đẩu Số theo hệ thống thầy Nghê Hải Hạ: 14 chính tinh, Tứ Hóa, lộ trình Thiên Kỷ · Địa Kỷ · Nhân Kỷ.',
  alternates: { canonical: '/gioi-thieu' },
};

export default function IntroLayout({ children }: { children: React.ReactNode }) {
  return children;
}
