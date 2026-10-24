(function () {
  const R = (globalThis.RPG = globalThis.RPG || {});
  const U = R.util;
  const D = R.data;
  const E = R.elementos;
  const byId = R.elementoPorId;

  const NIVELES_W = { 1: 12, 2: 16, 3: 15, 4: 14, 5: 13, 6: 11, 7: 8, 8: 6, 9: 3, 10: 2 };
  const RAROS = ["tiempo", "caos", "orden"];
  const SIN_RESUCITAR = false; // en fase 1 ningún candidato tiene resurrección real

  /* ---------- Elementos ---------- */
  function elegirElementos(esp) {
    const pesoEl = (e) => {
      let w = e.peso;
      if (esp.afin && esp.afin.includes(e.id)) w *= 3;
      return w;
    };
    const e1 = U.weighted(E, pesoEl);
    const lista = [e1];
    if (U.chance(0.42)) {
      const pool = E.filter((e) => e.id !== e1.id && !(RAROS.includes(e.id) && RAROS.includes(e1.id)));
      const e2 = U.weighted(pool, (e) => pesoEl(e) * (e1.comp && e1.comp.includes(e.id) ? 3 : 1));
      lista.push(e2);
    }
    return lista;
  }

  /* ---------- Nivel y potencial ---------- */
  function elegirNivel() {
    return Number(U.weighted(Object.keys(NIVELES_W), (k) => NIVELES_W[k]));
  }
  function elegirPotencial() {
    const banda = U.weighted(
      [
        [85, 99, 38],
        [100, 109, 28],
        [110, 124, 20],
        [125, 149, 10],
        [150, 200, 4],
      ],
      (b) => b[2]
    );
    return U.int(banda[0], banda[1]);
  }

  /* ---------- Maldición ---------- */
  function elegirMaldicion(ctx) {
    const cat = U.weighted(Object.keys(D.curseCat), (k) => D.curseCat[k].w);
    const m = U.pick(D.maldiciones[cat]);
    const cfg = D.curseCat[cat];
    const pen = +U.float(cfg.pen[0], cfg.pen[1]).toFixed(2);
    const pct = Math.round(pen * 100);
    const f = (t) => U.fill(t, { mat: ctx.el1.mat, pct }, ctx.genero);

    const out = {
      nombre: m.n,
      categoria: cat,
      efecto: f(m.ef),
      combate: f(m.co),
      potencial: f(m.po) + " Bloquea aproximadamente el " + pct + "% de su poder real.",
      beneficio: f(m.be),
      riesgo: f(m.ri),
      pen,
      estado: "activa",
      requisitos: [],
      progreso: [],
      ubicacion: "",
      metodo: "",
    };

    if (cat === "I") {
      const costo = U.round(U.int(8000, 40000) * (1 + ctx.nivel * 0.25), 100);
      out.costoOro = costo;
      out.metodo = "Pagar " + U.fmt(costo) + " Oro a un purificador de sellos en una ceremonia de un día.";
      out.requisitos = ["Pagar " + U.fmt(costo) + " Oro"];
      out.ubicacion = "Cualquier templo o gremio de sellos (no requiere mazmorra)";
    } else if (cat === "II") {
      const n = U.chance(0.4) ? 2 : 1;
      const objs = [];
      while (objs.length < n) {
        const o = U.pick(D.objetoA) + " " + U.pick(D.objetoB);
        if (!objs.includes(o)) objs.push(o);
      }
      out.objetos = objs.map((nombre) => ({
        nombre,
        mazmorra: "SIN REGISTRAR",
        condicion: "Desconocida hasta que registres la mazmorra (propuesta pendiente de tu aprobación)",
      }));
      out.metodo = "Reunir " + (n > 1 ? "los objetos" : "el objeto") + " de mazmorra: " + objs.join(" y ") + ".";
      out.requisitos = objs.slice();
      out.ubicacion = "Sin registrar: se asignará cuando entregues tu lista de mazmorras (Fase 2)";
    } else if (cat === "III") {
      out.runa = Object.assign({}, m.runa);
      out.metodo = "Obtener la " + m.runa.n + " y llevarla de por vida.";
      out.requisitos = ["Obtener la " + m.runa.n, "Realizar el ritual de sincronización de la runa"];
      out.ubicacion = m.runa.ub;
    } else {
      out.muerte = m.muerte;
      out.limites = m.limites;
      out.riesgosResurreccion = m.riesgos;
      out.metodo =
        "Muerte ritual y resurrección verdadera. " + m.muerte + " " + m.limites + " Riesgo: " + m.riesgos;
      out.requisitos = [
        "Contar con un resucitador de rango Deidad o superior, nivel 80+ y resurrección real",
        "Cumplir las condiciones de la muerte ritual",
      ];
      out.ubicacion = "No depende de mazmorras: depende de un resucitador";
    }
    out.progreso = out.requisitos.map(() => false);
    if (cat === "I") out.progreso = [false];
    return out;
  }

  /* ---------- Arma mundial ---------- */
  function elegirArma(ctx) {
    const rar = U.weighted(D.armaRarezas, (r) => r.w);
    const tipo = U.pick(ctx.clase.armas);
    let nombre = "";
    for (let i = 0; i < 20; i++) {
      nombre = U.pick(D.armaA) + " de " + U.pick(D.armaB);
      if (!ctx.usadosArmas.has(nombre)) break;
    }
    ctx.usadosArmas.add(nombre);
    const material = U.pick(D.armaMateriales);
    const f = (t) => U.fill(t, { mat: ctx.el1.mat, forma: U.pick(ctx.el1.forma) }, ctx.genero);
    const consciente = U.chance(0.25);
    const separable = U.chance(0.3);
    return {
      nombre,
      tipo,
      apariencia: U.cap(tipo) + " de " + material + " " + f(U.pick(D.armaDetalles)) + ".",
      historia: "Procede de " + U.pick(D.armaCivs) + ": " + U.pick(D.armaEventos) + ".",
      especial: f(U.pick(D.armaEspeciales)),
      sincronizacion: f(U.pick(D.armaSync)),
      limitacion: f(U.pick(D.armaLimites)),
      consciente,
      voz: consciente ? "Tiene conciencia propia: " + U.pick(D.armaConciencia) + "." : "Sin conciencia propia.",
      rareza: rar.n,
      fRar: rar.f,
      aporte: "Aporta cerca de +" + rar.pct + "% a su poder de combate, sin sustituir sus capacidades propias.",
      separable,
    };
  }

  /* ---------- Habilidades ---------- */
  function nombreHab(tipoNombre, el, usados) {
    for (let i = 0; i < 30; i++) {
      const s = U.pick(D.habNombres[tipoNombre]);
      const n = U.pick(el.nombres);
      const nom = U.chance(0.55) ? s + " de " + n : n + ": " + s;
      if (!usados.has(nom)) {
        usados.add(nom);
        return nom;
      }
    }
    const fallback = U.pick(D.habNombres[tipoNombre]) + " de " + U.pick(el.nombres) + " " + U.int(2, 9);
    usados.add(fallback);
    return fallback;
  }

  function elegirHabilidades(ctx) {
    const { el1, el2, clase, genero, arma } = ctx;
    const dual = !!el2;
    const usadosN = new Set();
    const formas1 = U.shuffle(el1.forma);
    let idx = 0;
    const nextForma = () => formas1[idx++ % formas1.length];

    const mkCtx = (elPrincipal) => {
      const e = elPrincipal;
      const formaPrincipal = e === el1 ? nextForma() : U.pick(e.forma);
      return {
        forma: formaPrincipal,
        forma2: dual ? U.pick(el2.forma) : U.pick(el1.forma),
        defensa: U.pick(e.defensa),
        mov: U.pick(e.mov),
        campo: U.pick(e.campo),
        mat: e.mat,
        mat2: dual ? el2.mat : el1.mat,
        est: U.pick(clase.estilo),
        limite: U.pick(e.limite),
        arma: arma.nombre,
      };
    };

    const gen = (slot, tipoNombre, elBase, withIdent) => {
      const plantillas = D.hab[slot].filter((p) => dual || !p.dual);
      const p = U.pick(plantillas);
      const c = mkCtx(elBase);
      let a = U.fill(p.a, c, genero);
      if (withIdent) a += " Identidad de clase: " + clase.ident;
      return {
        nombre: nombreHab(tipoNombre, elBase, usadosN),
        tipo: p.t,
        desc: U.cap(U.fill(p.d, c, genero)),
        visual: U.cap(U.fill(p.v, c, genero)),
        tactica: U.cap(a),
        limite: U.cap(U.fill(p.l, c, genero)),
        resurreccion: SIN_RESUCITAR,
      };
    };

    const soporte = clase.rol === "soporte";
    const identSlot = U.int(0, 2);
    const e2 = el2 || el1;
    const hs = [];
    hs.push(soporte ? gen("apoyo", "apoyo", el1, identSlot === 0) : gen("ofensiva", "ofensiva", el1, identSlot === 0));
    hs.push(gen("defensiva", "defensiva", U.chance(0.5) ? el1 : e2, identSlot === 1));
    const movSlot = soporte && U.chance(0.5) ? "apoyo" : "movilidad";
    hs.push(gen(movSlot, movSlot === "apoyo" ? "apoyo" : "movilidad", U.chance(0.5) ? e2 : el1, identSlot === 2));
    // Slot 4: definitiva (75%) o pasiva potente (25%)
    if (U.chance(0.75)) hs.push(gen("definitiva", "definitiva", el1, false));
    else hs.push(gen("pasiva", "pasiva", e2, false));
    return hs;
  }

  /* ---------- Textos de apoyo ---------- */
  function apariencia(esp, variante, clase, genero, edad) {
    const rasgos = U.pickN(esp.rasgos, 2).map((r) => r.replace(/\{var\}/g, variante || ""));
    const base =
      "Tiene " + edad + " años, cabello " + U.pick(esp.pelo) + " y ojos " + U.pick(esp.ojos) + ". Destacan " + rasgos[0] + " y " + rasgos[1] + ". Viste " + U.pick(clase.vest) + " y lleva " + U.pick(D.accesorios) + ". " + U.pick(D.presencias);
    return U.gender(base, genero);
  }

  function motivoRango(c) {
    const razones = [];
    if (c.potencial >= 120) razones.push("su potencial de " + c.potencial + " supera con creces los límites ordinarios");
    const rar = c.elementos.find((e) => RAROS.includes(e.id));
    if (rar) razones.push("domina el elemento " + rar.nombre + ", de los más raros del mundo");
    const cust = c.elementos.find((e) => !e.oficial);
    if (cust) razones.push("su elemento " + cust.nombre + " no está catalogado oficialmente y es casi único");
    if (c.arma.rareza.includes("Génesis") || c.arma.rareza.includes("Celestial")) razones.push("está vinculado a un arma de grado " + c.arma.rareza);
    if (c.maldicion.categoria === "IV") razones.push("su maldición de resurrección esconde un potencial enorme que aún no puede usarse");
    if (c.nivel <= 3 && c.potencial >= 100) razones.push("a pesar de su bajo nivel, su talento natural es excepcional");
    if (razones.length === 0) razones.push("su combinación de " + c.elementos.map((e) => e.nombre).join(" y ") + " con la clase " + c.clase.nombre + " es única en su generación");
    return U.cap(razones.slice(0, 2).join(" y ")) + ".";
  }

  /* ---------- Poder, precio y actitud ---------- */
  function calcularPoder(ctx) {
    const { nivel, potencial, clase, elementos, arma, especie, maldicion } = ctx;
    const base = 0.45 * Math.pow(1.62, nivel - 1);
    const elF = elementos.reduce((a, e) => a * (RAROS.includes(e.id) ? 1.35 : e.oficial ? 1.0 : 1.1), 1);
    const factor = Math.pow(potencial / 90, 0.6) * clase.f * elF * arma.fRar * especie.f * U.float(0.75, 1.5);
    const tras = base * factor;
    const actual = tras * (1 - maldicion.pen);
    const max = tras * (1.5 + potencial / 20) * (1 + (10 - nivel) * 0.5);
    const r = (v) => (v < 10 ? +v.toFixed(2) : +v.toFixed(1));
    return { actual: r(actual), tras: r(tras), max: r(max) };
  }

  function calcularPrecio(c, pers) {
    const p = c.poder;
    let v = (p.tras * 1.2 + p.max * 0.35) * 900000;
    const rarEl = c.elementos.reduce((a, e) => a * (RAROS.includes(e.id) ? 1.6 : e.oficial ? 1.0 : 1.15), 1);
    v *= rarEl * (1 + (c.potencial - 85) / 200) * c.arma.fRar;
    v *= D.curseCat[c.maldicion.categoria].precio;
    const mercado = Math.max(1500000, U.round(v, 100000));
    const mult = +U.float(pers.pm[0], pers.pm[1]).toFixed(2);
    const exigido = U.round(mercado * mult, 100000);
    const armaPrecio = c.arma.separable ? U.round(exigido * 0.3, 100000) : 0;
    return { mercado, exigido, mult, contrato: exigido - armaPrecio, arma: armaPrecio, armaSeparable: c.arma.separable };
  }

  function actitudDe(pers) {
    const nombres = ["dispuesto", "exigente", "reacio", "rechaza"];
    const i = U.weighted([0, 1, 2, 3], (k) => pers.act[k]);
    const act = nombres[i];
    let umbral;
    if (act === "dispuesto") umbral = +U.float(0.88, 1.0).toFixed(2);
    else if (act === "exigente") umbral = +U.float(1.15, 1.4).toFixed(2);
    else if (act === "reacio") umbral = +U.float(1.5, 1.9).toFixed(2);
    else umbral = +U.float(2.5, 3.2).toFixed(2);
    return { act, umbral };
  }

  function sinergiasTexto(c) {
    const out = [];
    const comp = new Set();
    c.elementos.forEach((e) => (e.comp || []).forEach((id) => comp.add(id)));
    const nombres = [...comp].map((id) => byId(id)).filter(Boolean).slice(0, 3).map((e) => e.nombre);
    if (nombres.length) out.push("Combina bien con usuarios de " + nombres.join(", ") + ".");
    const rol = c.clase.rol;
    const rolTxt = {
      tanque: "Ideal para acompañar a atacantes frágiles.",
      dps: "Rinde mejor con un tanque delante y un soporte detrás.",
      soporte: "Necesita aliados que mantengan la línea.",
      control: "Prepara el terreno para atacantes y sigilosos.",
      sigilo: "Aprovecha los huecos que crean los controladores.",
    };
    out.push(rolTxt[rol]);
    return out.join(" ");
  }

  /* ---------- Generador principal ---------- */
  function generarCandidato(usadosNombres, usadosArmas) {
    const genero = U.chance(0.5) ? "mujer" : "hombre";
    const especie = U.weighted(D.especies, (e) => e.peso);
    const variante = especie.variantes ? U.pick(especie.variantes) : null;
    const elementos = elegirElementos(especie);
    const el1 = elementos[0];
    const el2 = elementos[1] || null;
    const clase = U.weighted(D.clases, (c) => (c.custom ? 0.7 : 1.0));
    const edad = U.int(14, 18);
    const nivel = elegirNivel();
    const potencial = elegirPotencial();
    const pers = U.pick(D.personalidades);
    const nombre = R.names.generar(especie.id, genero, usadosNombres);
    const maldicion = elegirMaldicion({ el1, genero, nivel });
    const arma = elegirArma({ clase, el1, genero, usadosArmas });
    const habilidades = elegirHabilidades({ el1, el2, clase, genero, arma });

    const c = {
      id: U.uid(),
      nombre,
      genero,
      edad,
      especieId: especie.id,
      especie: especie.nombre + (variante ? " (" + variante + ")" : ""),
      especieNota: especie.fisio + " Debilidad: " + especie.debil,
      rango: "Deidad UR",
      nivel,
      potencial,
      elementos: elementos.map((e) => ({ id: e.id, nombre: e.nombre, oficial: e.oficial, regla: e.regla || "", comp: e.comp })),
      clase: { id: clase.id, nombre: clase.nombre, rol: clase.rol, custom: !!clase.custom, ident: clase.ident, fort: clase.fort, deb: clase.deb },
      habilidades,
      maldicion,
      arma,
    };
    c.apariencia = apariencia(especie, variante, clase, genero, edad);
    const ep = U.pick(genero === "mujer" ? D.epitetosF : D.epitetosM);
    c.personalidad = { arquetipo: pers.nombre, texto: U.gender(pers.rasgo, genero) };
    c.motivaciones = U.gender(U.pick(pers.mot), genero);
    c.miedos = U.gender(U.pick(pers.mie), genero);
    c.motivoBusca = U.gender(U.pick(pers.busca), genero);
    c.reputacion = U.fill(U.pick(D.reputaciones), { ep }, genero);
    const lugar = U.pick(D.lugares);
    c.historia = U.fill(U.pick(D.origenes), { lugar }, genero) + " " + U.fill(U.pick(D.eventos), { mat: el1.mat }, genero) + " " + U.gender(U.pick(D.situaciones), genero);
    c.motivoRango = motivoRango(c);

    const clasePoder = D.clases.find((x) => x.id === clase.id);
    c.poder = calcularPoder({ nivel, potencial, clase: clasePoder, elementos: elementos, arma, especie, maldicion });
    c.precio = calcularPrecio(c, pers);
    const a = actitudDe(pers);
    c.actitud = a.act;
    c.umbral = a.umbral;

    const pct = U.int(20, 50);
    const gen = U.pickN(D.condicionesGenerales, 2).map((t) => U.fill(t, { pct }, genero));
    const extra = U.pickN(pers.cond, 2).map((t) => U.gender(t, genero));
    c.condiciones = extra.concat(gen);
    c.sinergias = sinergiasTexto(c);
    const obs = [U.pick(D.observaciones)];
    if (a.act === "rechaza") obs.push("Se niega a casi cualquier oferta; solo cedería ante una suma desmedida.");
    if (a.act === "reacio") obs.push("Es reacio a firmar: necesitarás un sobreprecio significativo.");
    if (a.act === "exigente") obs.push("Pedirá un bono de firma por encima del precio base.");
    if (c.arma.separable) obs.push("Su arma mundial puede adquirirse por separado del contrato.");
    c.observaciones = obs.join(" ");
    return c;
  }

  function generarTanda(cantidad, usadosNombres, usadosArmas) {
    const out = [];
    const nombres = new Set(usadosNombres || []);
    const armas = new Set(usadosArmas || []);
    for (let i = 0; i < cantidad; i++) {
      // Intenta evitar clones: misma clase+elemento+especie
      let c = null;
      for (let t = 0; t < 8; t++) {
        c = generarCandidato(nombres, armas);
        const clon = out.some(
          (o) => o.clase.id === c.clase.id || (o.elementos[0].id === c.elementos[0].id && o.especieId === c.especieId) || o.maldicion.nombre === c.maldicion.nombre
        );
        if (!clon) break;
      }
      nombres.add(c.nombre.toLowerCase());
      out.push(c);
    }
    return out;
  }

  /* ---------- Poder efectivo y sinergias de equipo ---------- */
  function poderEfectivo(c) {
    let p = c.maldicion.estado === "rota" ? c.poder.tras : c.poder.actual;
    if (c.arma.separable && !c.armaAdquirida) p *= 0.8;
    return +p.toFixed(2);
  }

  function sinergiasEquipo(c, equipo) {
    const out = [];
    equipo
      .filter((o) => o.id !== c.id)
      .forEach((o) => {
        c.elementos.forEach((e1) => {
          o.elementos.forEach((e2) => {
            const k1 = e1.id + "+" + e2.id;
            const k2 = e2.id + "+" + e1.id;
            const t = D.sinergias[k1] || D.sinergias[k2];
            if (t) out.push(o.nombre + ": " + t);
          });
        });
        const kr1 = c.clase.rol + "+" + o.clase.rol;
        const kr2 = o.clase.rol + "+" + c.clase.rol;
        const tr = D.sinergiasRol[kr1] || D.sinergiasRol[kr2];
        if (tr) out.push(o.nombre + ": " + tr);
      });
    return [...new Set(out)];
  }

  function hayResucitador(equipo) {
    return equipo.some((c) => c.habilidades.some((h) => h.resurreccion) && c.nivel >= 80);
  }

  R.gen = { generarCandidato, generarTanda, poderEfectivo, sinergiasEquipo, hayResucitador };
})();
