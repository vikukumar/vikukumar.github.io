export function ThemeScript() {
  const code = `
(() => {
  try {
    const stored = localStorage.getItem('theme') || 'system';
    const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolved = stored === 'system' ? (systemDark ? 'dark' : 'light') : stored;
    document.documentElement.dataset.theme = resolved;
    document.documentElement.dataset.themePref = stored;
  } catch (e) {}
})();
`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

