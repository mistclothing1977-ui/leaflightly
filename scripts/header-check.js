// Header regression check. Paste into the browser console on any page (or run via a
// browser tool's JS exec) at each width in CLAUDE.md. Every line must report
// overlaps=none clipped=0 hScroll=false and a single nav font size.
(() => {
  const h = document.querySelector('header');
  const mobile = innerWidth <= 768;
  const visible = (e) => {
    const r = e.getBoundingClientRect();
    return r.width && r.height && getComputedStyle(e).display !== 'none';
  };
  const items = [
    h.querySelector('a[href="/"]'),
    ...(mobile ? [] : h.querySelectorAll('nav > *')),
    ...h.querySelector('[class*=rightSection]').children,
    h.querySelector('button[aria-label="Toggle menu"]'),
  ].filter(visible);

  const overlaps = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const a = items[i].getBoundingClientRect();
      const b = items[j].getBoundingClientRect();
      if (a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1) {
        overlaps.push(`${items[i].textContent.trim().slice(0, 10) || 'logo'} x ${items[j].textContent.trim().slice(0, 10) || 'search'}`);
      }
    }
  }
  const hb = h.getBoundingClientRect();
  const clipped = items.filter((e) => {
    const r = e.getBoundingClientRect();
    return r.right > innerWidth + 0.5 || r.bottom > hb.bottom + 0.5;
  }).length;
  // Top-level nav items only; links inside an open mega-menu dropdown have their own size.
  const navSizes = [...new Set([...h.querySelectorAll('nav a, nav button')]
    .filter((e) => !e.closest('[role="menu"]'))
    .map((e) => getComputedStyle(e).fontSize))];
  const hScroll = document.documentElement.scrollWidth > innerWidth;
  const pass = !overlaps.length && !clipped && !hScroll && navSizes.length === 1;
  return `${pass ? 'PASS' : 'FAIL'} ${innerWidth}px: overlaps=${overlaps.join(', ') || 'none'} clipped=${clipped} navSizes=${navSizes} hScroll=${hScroll} headerH=${h.offsetHeight}`;
})();
