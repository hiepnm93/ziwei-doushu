import SiteHeader from '@/components/SiteHeader';
import ChartApp from '@/components/ChartApp';

// 旧链接 /chart 保留：与首页同一套起盘界面
export default function ChartPage() {
  return (
    <>
      <SiteHeader />
      <main className="px-4 pt-6 pb-10">
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-5" style={{ color: 'var(--tx-0)' }}>Lập lá số Tử Vi Đẩu Số</h1>
        <ChartApp />
      </main>
    </>
  );
}
