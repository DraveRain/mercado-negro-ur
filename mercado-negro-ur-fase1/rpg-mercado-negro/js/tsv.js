(function () {
  const R = (globalThis.RPG = globalThis.RPG || {});
  const U = R.util;

  const COLUMNAS = [
    "Nombre", "Género", "Edad", "Especie", "Rango", "Nivel", "Potencial", "Elemento 1", "Elemento 2", "Clase",
    "Apariencia", "Personalidad", "Historia",
    "Habilidad 1 Nombre", "Habilidad 1 Descripción", "Habilidad 2 Nombre", "Habilidad 2 Descripción",
    "Habilidad 3 Nombre", "Habilidad 3 Descripción", "Habilidad 4 Nombre", "Habilidad 4 Descripción",
    "Maldición", "Categoría Maldición", "Efectos Maldición", "Método de Ruptura", "Requisitos", "Ubicación del Objeto",
    "Beneficio al Romperla", "Arma Mundial", "Poder del Arma", "Poder Actual en Millones", "Poder Tras Romper Maldición",
    "Poder Máximo Teórico", "Precio en Paradios", "Condiciones de Contratación", "Sinergias", "Observaciones",
  ];

  const limpiar = (s) =>
    String(s === undefined || s === null ? "" : s)
      .replace(/[\t\r\n]+/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim();
  const num = (n) => String(n).replace(".", ",");

  function descHab(h) {
    return limpiar("[" + h.tipo + "] " + h.desc + " Visual: " + h.visual + " Táctica: " + h.tactica + " Límite: " + h.limite);
  }

  function fila(c, opts) {
    opts = opts || {};
    const h = c.habilidades;
    const m = c.maldicion;
    const cols = [
      c.nombre, c.genero === "mujer" ? "Mujer" : "Hombre", c.edad, c.especie, c.rango, c.nivel, c.potencial,
      c.elementos[0].nombre, c.elementos[1] ? c.elementos[1].nombre : "", c.clase.nombre,
      c.apariencia, c.personalidad.arquetipo + ": " + c.personalidad.texto, c.historia,
      h[0].nombre, descHab(h[0]), h[1].nombre, descHab(h[1]), h[2].nombre, descHab(h[2]), h[3].nombre, descHab(h[3]),
      m.nombre, "Categoría " + m.categoria, m.efecto + " " + m.combate + " " + m.potencial, m.metodo,
      m.requisitos.join(" | "), m.ubicacion, m.beneficio,
      c.arma.nombre + " (" + c.arma.tipo + ", " + c.arma.rareza + ")", c.arma.especial + " " + c.arma.aporte,
      num(c.poder.actual), num(c.poder.tras), num(c.poder.max),
      c.precio.exigido, c.condiciones.join(" | "), c.sinergias, c.observaciones,
    ];
    if (opts.equipo) cols.push(m.estado === "rota" ? "Rota" : "Activa");
    return cols.map(limpiar).join("\t");
  }

  function tabla(lista, opts) {
    opts = opts || {};
    const head = COLUMNAS.slice();
    if (opts.equipo) head.push("Estado Maldición");
    return [head.join("\t")].concat(lista.map((c) => fila(c, opts))).join("\n");
  }

  function habilidadesTabla(c) {
    const filas = c.habilidades.map((h, i) => "Habilidad " + (i + 1) + ": " + limpiar(h.nombre) + "\t" + descHab(h));
    return filas.join("\n");
  }

  R.tsv = { COLUMNAS, fila, tabla, habilidadesTabla };
})();
