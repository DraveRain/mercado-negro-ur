(function () {
  const R = (globalThis.RPG = globalThis.RPG || {});
  const U = (R.util = {});

  U.int = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  U.float = (a, b) => a + Math.random() * (b - a);
  U.pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  U.chance = (p) => Math.random() < p;

  U.weighted = (items, wf) => {
    let total = 0;
    const ws = items.map((i) => {
      const w = Math.max(0, wf(i));
      total += w;
      return w;
    });
    let r = Math.random() * total;
    for (let i = 0; i < items.length; i++) {
      r -= ws[i];
      if (r <= 0) return items[i];
    }
    return items[items.length - 1];
  };

  U.shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  U.pickN = (arr, n) => U.shuffle(arr).slice(0, n);
  U.cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
  U.round = (n, step) => Math.round(n / step) * step;

  // Tokens de género: {o|a} -> o (hombre) / a (mujer)
  U.gender = (txt, g) =>
    txt.replace(/\{([^{}|]*)\|([^{}|]*)\}/g, (m, a, b) => (g === "mujer" ? b : a));

  // Sustituye {clave} con ctx y luego resuelve tokens de género
  U.fill = (txt, ctx, g) => {
    const out = String(txt).replace(/\{(\w+)\}/g, (m, k) => (ctx[k] !== undefined ? ctx[k] : m));
    return U.gender(out, g);
  };

  U.fmt = (n) => Number(n).toLocaleString("es-CO");
  U.fmtM = (v) => {
    v = Number(v);
    if (v < 10) return v.toFixed(1).replace(".", ",") + " M";
    return Math.round(v).toLocaleString("es-CO") + " M";
  };
  U.esc = (s) =>
    String(s === undefined || s === null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  U.uid = () => "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
})();
