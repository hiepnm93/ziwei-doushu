const link = { color: 'inherit', textDecoration: 'underline' } as const;

export default function SiteFooter() {
  return (
    <footer style={{ textAlign: 'center', fontSize: '11px', lineHeight: 1.7, padding: '24px 16px', opacity: 0.6 }}>
      Dựa trên mã nguồn mở{' '}
      <a href="https://github.com/Renhuai123/ziwei-doushu" target="_blank" rel="noopener noreferrer" style={link}>Renhuai123/ziwei-doushu</a>{' '}
      (MIT) · bản tiếng Việt:{' '}
      <a href="https://github.com/hiepnm93/ziwei-doushu" target="_blank" rel="noopener noreferrer" style={link}>hiepnm93/ziwei-doushu</a>.{' '}
      Lời giảng thầy Nghê Hải Hạ:{' '}
      <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer" style={link}>CC BY-NC-SA 4.0</a>, phi thương mại.
    </footer>
  );
}
