(function () {
  const R = (globalThis.RPG = globalThis.RPG || {});
  const U = R.util;
  const D = R.data;

  function limpiar(s) {
    return s
      .replace(/([aeiouáéíóú])\1+/gi, "$1")
      .replace(/([^aeiou])\1{2,}/gi, "$1$1")
      .replace(/[^aeiouáéíóúy]{4,}/gi, (m) => m.slice(0, 3));
  }

  function nombreSimple(esp, genero) {
    const nm = esp.nm;
    const suf = genero === "mujer" ? nm.sufF : nm.sufM;
    let s = U.pick(nm.pre);
    if (U.chance(0.45)) s += U.pick(nm.mid);
    s += U.pick(suf);
    return U.cap(limpiar(s.toLowerCase()));
  }

  function apellido() {
    return U.pick(D.apellidoA) + U.pick(D.apellidoB);
  }

  // Devuelve un nombre completo único respecto a "usados" (Set o array)
  function generar(especieId, genero, usados) {
    const esp = D.especies.find((e) => e.id === especieId) || D.especies[0];
    const set = usados instanceof Set ? usados : new Set(usados || []);
    let nombre = "";
    for (let i = 0; i < 40; i++) {
      nombre = nombreSimple(esp, genero);
      if (!esp.sinApellido || U.chance(0.12)) {
        if (U.chance(0.75)) nombre += " " + apellido();
      }
      if (!set.has(nombre.toLowerCase())) break;
      if (i === 39) nombre += " " + ["II", "III", "IV", "V"][U.int(0, 3)];
    }
    return nombre;
  }

  function lista(especieId, genero, cantidad, usados) {
    const set = new Set(usados || []);
    const out = [];
    for (let i = 0; i < cantidad; i++) {
      const n = generar(especieId, genero, set);
      set.add(n.toLowerCase());
      out.push(n);
    }
    return out;
  }

  R.names = { generar, lista };
})();
