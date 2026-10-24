(function () {
  const R = globalThis.RPG;
  const U = R.util;
  const D = R.data;
  const G = R.gen;
  const T = R.tsv;
  const esc = U.esc;
  const KEY = "rpg_mercado_negro_v1";

  /* ============================ ESTADO ============================ */
  function defaults() {
    return { v: 1, paradios: 1000000000, oro: 500000, candidatos: [], equipo: [], usadosNombres: [], usadosArmas: [], tandas: 0 };
  }
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return Object.assign(defaults(), JSON.parse(raw));
    } catch (e) {
      /* ignora */
    }
    return defaults();
  }
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(S));
    } catch (e) {
      toast("No se pudo guardar en el navegador. Usa Exportar para no perder datos.", true);
    }
  }
  let S = load();
  let tabActual = "mercado";
  let cmpSel = [];
  const filtro = { q: "", elemento: "", clase: "", orden: "reciente" };

  /* ============================ UTILIDADES ============================ */
  const $ = (s, r) => (r || document).querySelector(s);
  const P = (n) => U.fmt(n) + " P";
  const norm = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const ACT = { dispuesto: "Dispuesto a escuchar", exigente: "Exigente: pedirá un bono", reacio: "Reacio: costará convencerlo", rechaza: "Se niega a casi cualquier oferta" };
  const elColor = (id) => (R.elementoPorId(id) || {}).c || "#999";
  const todos = () => S.candidatos.concat(S.equipo);
  const buscar = (id) => todos().find((c) => c.id === id);
  const buscarNombre = (txt) => {
    const t = norm(txt.trim());
    if (!t) return null;
    return todos().find((c) => norm(c.nombre) === t) || todos().find((c) => norm(c.nombre).includes(t)) || null;
  };

  let toastT = null;
  function toast(msg, err) {
    const t = $("#toast");
    t.textContent = msg;
    t.className = "toast" + (err ? " err" : "");
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.add("hidden"), 3800);
  }

  function copiar(texto, msg) {
    const ok = () => toast(msg || "Copiado al portapapeles");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(ok, () => fallbackCopy(texto, ok));
    } else fallbackCopy(texto, ok);
  }
  function fallbackCopy(texto, cb) {
    const ta = document.createElement("textarea");
    ta.value = texto;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      cb();
    } catch (e) {
      toast("No se pudo copiar. Selecciona el texto manualmente.", true);
    }
    ta.remove();
  }
  function descargar(nombre, texto, tipo) {
    const blob = new Blob(["﻿" + texto], { type: tipo || "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = nombre;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(a.href);
      a.remove();
    }, 500);
  }

  /* ============================ MODAL ============================ */
  function abrirModal(html) {
    $("#modal-body").innerHTML = html;
    $("#modal").classList.remove("hidden");
    $("#modal").scrollTop = 0;
  }
  function cerrarModal() {
    $("#modal").classList.add("hidden");
    $("#modal-body").innerHTML = "";
  }
  function confirmar(titulo, texto, act, id, extra) {
    abrirModal(
      "<h2>" + esc(titulo) + '</h2><p class="lead">' + texto + '</p><div class="row"><button class="btn primary" data-act="' + act + '" data-id="' + esc(id || "") + '"' + (extra || "") + '>Confirmar</button><button class="btn" data-act="cerrar">Cancelar</button></div>'
    );
  }

  /* ============================ RENDER GENERAL ============================ */
  function renderCartera() {
    $("#w-paradios").textContent = U.fmt(S.paradios);
    $("#w-oro").textContent = U.fmt(S.oro);
    $("#badge-equipo").textContent = S.equipo.length;
  }
  function renderTabs() {
    document.querySelectorAll("#tabs button").forEach((b) => b.classList.toggle("active", b.dataset.tab === tabActual));
    ["mercado", "equipo", "nombres", "ajustes"].forEach((t) => $("#view-" + t).classList.toggle("hidden", t !== tabActual));
  }
  function renderTodo() {
    renderCartera();
    renderTabs();
    renderMercado();
    renderEquipo();
    renderNombres();
    renderAjustes();
  }

  const chipsEl = (c) => '<div class="chips">' + c.elementos.map((e) => '<span class="chip' + (e.oficial ? "" : " custom") + '" style="--c:' + elColor(e.id) + '" title="' + esc(e.regla || "Elemento oficial") + '">' + esc(e.nombre) + "</span>").join("") + "</div>";

  /* ============================ MERCADO ============================ */
  function cardCand(c) {
    const sel = cmpSel.includes(c.id);
    const c1 = elColor(c.elementos[0].id);
    const c2 = elColor((c.elementos[1] || c.elementos[0]).id);
    return (
      '<article class="card" style="--c1:' + c1 + ";--c2:" + c2 + '">' +
      "<header><div><h3>" + esc(c.nombre) + '</h3><p class="sub">' + (c.genero === "mujer" ? "Mujer" : "Hombre") + " · " + c.edad + " años · " + esc(c.especie) + " · " + esc(c.clase.nombre) + '</p></div><span class="badge ur">UR</span></header>' +
      chipsEl(c) +
      '<dl class="stats"><div><dt>Nivel</dt><dd>' + c.nivel + "</dd></div><div><dt>Potencial</dt><dd>" + c.potencial + "</dd></div><div><dt>Poder actual</dt><dd>" + U.fmtM(c.poder.actual) + "</dd></div><div><dt>Tras romper</dt><dd>" + U.fmtM(c.poder.tras) + "</dd></div><div><dt>Máx. teórico</dt><dd>" + U.fmtM(c.poder.max) + "</dd></div><div><dt>Precio</dt><dd>" + U.fmt(c.precio.exigido) + "</dd></div></dl>" +
      '<p class="curse">☠ ' + esc(c.maldicion.nombre) + " · Cat. " + c.maldicion.categoria + "</p>" +
      '<p class="act act-' + c.actitud + '">' + esc(ACT[c.actitud]) + "</p>" +
      '<div class="actions"><button class="btn sm" data-act="examinar" data-id="' + c.id + '">Examinar</button><button class="btn sm" data-act="negociar" data-id="' + c.id + '">Negociar</button><button class="btn sm primary" data-act="reclutar" data-id="' + c.id + '">Reclutar</button><button class="btn sm danger" data-act="descartar" data-id="' + c.id + '" title="Quitar de la lista">✕</button><label class="inline"><input type="checkbox" data-act="cmp" data-id="' + c.id + '"' + (sel ? " checked" : "") + "> comparar</label></div></article>"
    );
  }

  function renderMercado() {
    const v = $("#view-mercado");
    const hay = S.candidatos.length > 0;
    v.innerHTML =
      "<h2>Mercado negro</h2>" +
      '<p class="lead">Un intermediario clandestino te presenta talentos de rango Deidad UR. Ninguno es automático: pueden aceptar, exigir condiciones o negarse. Nada se paga sin tu confirmación.</p>' +
      '<div class="toolbar"><button class="btn primary" data-act="mercado">MERCADO NEGRO</button><button class="btn" data-act="mas">MÁS CANDIDATOS</button><button class="btn" data-act="comparar"' + (cmpSel.length === 2 ? "" : " disabled") + ">COMPARAR (" + cmpSel.length + "/2)</button>" +
      '<button class="btn" data-act="tsv-cand-copiar"' + (hay ? "" : " disabled") + '>Copiar TSV</button><button class="btn" data-act="tsv-cand-bajar"' + (hay ? "" : " disabled") + ">Descargar TSV</button></div>" +
      '<form class="cmd" id="cmd-form"><input type="text" id="cmd" autocomplete="off" placeholder="Comando: EXAMINAR nombre · NEGOCIAR CON nombre · RECLUTAR nombre · EQUIPO · ESTADÍSTICAS ..."><button class="btn">Enviar</button></form>' +
      (hay ? '<div class="grid">' + S.candidatos.map(cardCand).join("") + "</div>" : '<div class="empty">No hay ofertas todavía.<br>Pulsa <strong>MERCADO NEGRO</strong> para recibir cinco candidatos.</div>');
  }

  function nuevosCandidatos(n, reemplazar) {
    const usados = S.usadosNombres.concat(S.equipo.map((c) => c.nombre.toLowerCase()), S.candidatos.map((c) => c.nombre.toLowerCase()));
    const lista = G.generarTanda(n, usados, S.usadosArmas);
    lista.forEach((c) => {
      S.usadosNombres.push(c.nombre.toLowerCase());
      S.usadosArmas.push(c.arma.nombre);
    });
    S.candidatos = reemplazar ? lista : S.candidatos.concat(lista);
    S.tandas++;
    cmpSel = cmpSel.filter((id) => S.candidatos.some((c) => c.id === id));
    save();
  }

  /* ============================ FICHA ============================ */
  const kv = (k, v) => '<div class="kv"><span>' + esc(k) + "</span><span>" + esc(v) + "</span></div>";
  const sec = (t, h) => '<section class="sec"><h4>' + esc(t) + "</h4>" + h + "</section>";

  function maldicionHTML(c, enEquipo) {
    const m = c.maldicion;
    let h = kv("Nombre", m.nombre) + kv("Categoría", "Categoría " + m.categoria + (m.estado === "rota" ? " · ROTA" : " · activa")) + kv("Efecto actual", m.efecto) + kv("En combate", m.combate) + kv("Sobre el potencial", m.potencial) + kv("Método para romperla", m.metodo);
    if (m.categoria === "II") {
      h += kv("Objetos requeridos", m.objetos.map((o) => o.nombre + " (mazmorra: " + o.mazmorra + ")").join(" · "));
      h += '<div class="note warn">Información sin confirmar: los nombres de objetos son una propuesta. Su mazmorra y condiciones se registrarán cuando entregues tu lista de mazmorras (Fase 2).</div>';
    }
    if (m.categoria === "III") {
      h += kv("Runa", m.runa.n) + kv("Apariencia", m.runa.ap) + kv("Poder que concede", m.runa.pod) + kv("Efecto sobre la maldición", m.runa.ef) + kv("Ubicación", m.runa.ub) + kv("Consecuencia permanente", m.runa.con);
    }
    if (m.categoria === "IV") {
      h += kv("Muerte ritual", m.muerte) + kv("Límites de la resurrección", m.limites) + kv("Riesgos de fracaso", m.riesgosResurreccion);
      h += '<div class="note warn">Requiere un resucitador de rango Deidad o superior, nivel 80+ y resurrección verdadera. Curación, regeneración y reanimación temporal no cuentan. Si no se cumplen las condiciones, la maldición sigue activa.</div>';
    }
    h += kv("Requisitos", m.requisitos.join(" · ")) + kv("Ubicación", m.ubicacion) + kv("Beneficio al romperla", m.beneficio) + kv("Riesgos", m.riesgo);
    if (enEquipo) h += panelRuptura(c);
    return h;
  }

  function panelRuptura(c) {
    const m = c.maldicion;
    if (m.estado === "rota") return '<div class="note ok">Maldición rota. Su poder actual pasó a ' + U.fmtM(c.poder.tras) + ".</div>";
    let h = '<div class="note"><strong>Progreso de ruptura</strong>';
    if (m.categoria === "I") {
      h += "<p>Coste: <strong>" + U.fmt(m.costoOro) + " Oro</strong>. Tienes " + U.fmt(S.oro) + " Oro.</p>" + '<button class="btn primary" data-act="romper-oro" data-id="' + c.id + '"' + (S.oro >= m.costoOro ? "" : " disabled") + ">Pagar Oro y romper</button>";
    } else {
      h += '<ul class="checklist">' + m.requisitos.map((r, i) => '<li><label class="inline"><input type="checkbox" data-act="check" data-id="' + c.id + '" data-i="' + i + '"' + (m.progreso[i] ? " checked" : "") + "> " + esc(r) + "</label></li>").join("") + "</ul>";
      const todosOk = m.progreso.every(Boolean);
      if (m.categoria === "IV") {
        const res = G.hayResucitador(S.equipo);
        h += '<p class="' + (res ? "" : "mut") + '">Resucitador disponible en tu equipo: <strong>' + (res ? "Sí" : "No") + "</strong></p>";
        h += '<button class="btn primary" data-act="romper-check" data-id="' + c.id + '"' + (todosOk && res ? "" : " disabled") + ">Realizar ritual y marcar como rota</button>";
      } else {
        h += '<button class="btn primary" data-act="romper-check" data-id="' + c.id + '"' + (todosOk ? "" : " disabled") + ">Marcar maldición como rota</button>";
        h += '<p class="mut">En esta fase el progreso se marca a mano. En la Fase 2 se conectará con mazmorras y objetos reales.</p>';
      }
    }
    return h + "</div>";
  }

  function fichaHTML(c, modo) {
    const a = c.arma;
    const p = c.poder;
    const pr = c.precio;
    const eq = modo === "equipo";
    let h = '<div class="row"><div class="grow"><h2>' + esc(c.nombre) + '</h2><p class="lead">' + (c.genero === "mujer" ? "Mujer" : "Hombre") + " · " + c.edad + " años · " + esc(c.especie) + " · " + esc(c.clase.nombre) + '</p></div><span class="badge ur">RANGO ' + esc(c.rango) + "</span></div>" + chipsEl(c);
    h += sec("Resumen", kv("Nivel", c.nivel) + kv("Potencial", c.potencial) + kv("Por qué es UR", c.motivoRango) + kv("Especie", c.especieNota) + kv("Clase", c.clase.nombre + (c.clase.custom ? " (clase personalizada)" : "") + " · " + c.clase.fort + " Debilidad: " + c.clase.deb) + kv("Identidad de clase", c.clase.ident) + c.elementos.filter((e) => !e.oficial).map((e) => kv("Regla de " + e.nombre, e.regla)).join(""));
    h += sec("Apariencia y personalidad", "<p>" + esc(c.apariencia) + "</p>" + kv("Personalidad", c.personalidad.arquetipo + ": " + c.personalidad.texto) + kv("Motivación", c.motivaciones) + kv("Miedo", c.miedos) + kv("Por qué busca equipo", c.motivoBusca) + kv("Reputación", c.reputacion));
    h += sec("Historia", "<p>" + esc(c.historia) + "</p>");
    h += sec("Habilidades", c.habilidades.map((x, i) => '<div class="hab"><h5>Habilidad ' + (i + 1) + ": " + esc(x.nombre) + "<em>" + esc(x.tipo) + "</em></h5><p>" + esc(x.desc) + '</p><p class="mut"><strong>Visual:</strong> ' + esc(x.visual) + '</p><p class="mut"><strong>Táctica:</strong> ' + esc(x.tactica) + '</p><p class="mut"><strong>Límite:</strong> ' + esc(x.limite) + "</p></div>").join("") + '<button class="btn sm" data-act="hab-tsv" data-id="' + c.id + '">Copiar habilidades (Excel)</button>');
    h += sec("Maldición", maldicionHTML(c, eq));
    h += sec("Arma mundial", kv("Nombre", a.nombre) + kv("Tipo", a.tipo) + kv("Rareza", a.rareza) + kv("Apariencia", a.apariencia) + kv("Procedencia", a.historia) + kv("Habilidad especial", a.especial) + kv("Sincronización", a.sincronizacion) + kv("Limitaciones", a.limitacion) + kv("Conciencia", a.voz) + kv("Poder que aporta", a.aporte) + (eq && a.separable && !c.armaAdquirida ? '<div class="note warn">Arma pendiente de adquirir (' + P(pr.arma) + '): mientras tanto su poder baja un 20%.<br><button class="btn sm primary" data-act="comprar-arma" data-id="' + c.id + '">Comprar arma</button></div>' : ""));
    const pe = eq ? G.poderEfectivo(c) : null;
    h += sec("Poder de combate", kv("Poder actual (maldición activa)", U.fmtM(p.actual)) + kv("Poder tras romper la maldición", U.fmtM(p.tras)) + kv("Poder máximo teórico", U.fmtM(p.max)) + (eq ? kv("Poder efectivo ahora", U.fmtM(pe)) : ""));
    if (!eq) {
      h += sec("Oferta del mercado", kv("Valor de mercado estimado", P(pr.mercado)) + kv("Precio que exige", P(pr.exigido)) + kv("Incluye", pr.armaSeparable ? "Contrato de servicio (" + P(pr.contrato) + "). El arma mundial se adquiere por separado (" + P(pr.arma) + ")." : "Contrato de servicio y vinculación del arma mundial (atada a su alma, no puede separarse).") + kv("Actitud", ACT[c.actitud]) + kv("Condiciones", c.condiciones.join(" · ")));
    } else {
      h += sec("Contrato", kv("Pagado", P(c.pagado || 0)) + kv("Condiciones", c.condiciones.join(" · ")));
    }
    h += sec("Sinergias", "<p>" + esc(c.sinergias) + "</p>" + sinergiasLive(c));
    h += sec("Observaciones del intermediario", "<p>" + esc(c.observaciones) + "</p>");
    if (!eq) h += '<div class="row"><button class="btn" data-act="negociar" data-id="' + c.id + '">Negociar</button><button class="btn primary" data-act="reclutar" data-id="' + c.id + '">Reclutar</button></div>';
    return h;
  }

  function sinergiasLive(c) {
    const base = S.equipo.filter((o) => o.id !== c.id);
    const lista = G.sinergiasEquipo(c, S.equipo.includes(c) ? S.equipo : S.equipo.concat([c]));
    if (!base.length) return '<p class="mut">Cuando tengas más miembros, aquí verás las sinergias con tu equipo.</p>';
    return lista.length ? "<ul>" + lista.map((s) => "<li>" + esc(s) + "</li>").join("") + "</ul>" : '<p class="mut">Sin sinergias notables con tu equipo actual.</p>';
  }

  function abrirFicha(id) {
    const c = buscar(id);
    if (!c) return;
    abrirModal(fichaHTML(c, S.equipo.includes(c) ? "equipo" : "cand"));
  }

  /* ============================ NEGOCIAR / RECLUTAR ============================ */
  const baseOferta = (c, conArma) => c.precio.contrato + (c.arma.separable ? (conArma ? c.precio.arma : 0) : c.precio.arma);
  const precioOferta = (c, mult, conArma) => U.round(baseOferta(c, conArma) * mult, 100000);

  function modalNegociar(id, mensaje) {
    const c = buscar(id);
    if (!c || !S.candidatos.includes(c)) return;
    const conArma = true;
    let h = "<h2>Negociar con " + esc(c.nombre) + '</h2><p class="lead">' + esc(c.personalidad.arquetipo) + ": " + esc(c.personalidad.texto) + "</p>";
    h += '<div class="note">Pide <strong>' + P(c.precio.exigido) + "</strong> (valor de mercado estimado: " + P(c.precio.mercado) + "). " + esc(c.precio.armaSeparable ? "Contrato: " + P(c.precio.contrato) + " · Arma mundial por separado: " + P(c.precio.arma) + "." : "Incluye contrato y vinculación del arma mundial.") + "</div>";
    h += "<p>Condiciones que exigiría: " + esc(c.condiciones.join(" · ")) + "</p>";
    if (mensaje) h += '<div class="note warn">' + esc(mensaje) + "</div>";
    if (c.arma.separable) h += '<label class="inline"><input type="checkbox" id="chk-arma" data-id="' + c.id + '" checked> Incluir el arma mundial (+' + P(c.precio.arma) + ")</label>";
    h += '<p><strong>Tu oferta: <span id="oferta-label">' + P(precioOferta(c, 1, conArma)) + '</span></strong> <span class="mut" id="oferta-pct">(100%)</span></p><input type="range" id="oferta-range" data-id="' + c.id + '" min="60" max="350" step="5" value="100">';
    h += '<p class="mut">Tienes ' + P(S.paradios) + ". Si el candidato acepta, se descontará el pago al instante.</p>";
    h += '<div class="row"><button class="btn primary" data-act="ofrecer" data-id="' + c.id + '">Hacer oferta</button><button class="btn" data-act="cerrar">Retirarme</button></div>';
    abrirModal(h);
  }

  function actualizarOferta() {
    const rng = $("#oferta-range");
    if (!rng) return;
    const c = buscar(rng.dataset.id);
    if (!c) return;
    const chk = $("#chk-arma");
    const conArma = chk ? chk.checked : true;
    const mult = Number(rng.value) / 100;
    $("#oferta-label").textContent = P(precioOferta(c, mult, conArma));
    $("#oferta-pct").textContent = "(" + rng.value + "%)";
  }

  function intentar(id, mult, conArma) {
    const c = S.candidatos.find((x) => x.id === id);
    if (!c) return { ok: false, msg: "Este candidato ya no está disponible." };
    const oferta = precioOferta(c, mult, conArma);
    if (S.paradios < oferta) return { ok: false, msg: "No tienes suficientes Paradios para esa oferta." };
    if (mult >= c.umbral) {
      S.paradios -= oferta;
      c.pagado = oferta;
      c.armaAdquirida = c.arma.separable ? !!conArma : true;
      c.fechaReclutado = Date.now();
      S.candidatos = S.candidatos.filter((x) => x.id !== id);
      S.equipo.push(c);
      cmpSel = cmpSel.filter((x) => x !== id);
      save();
      return { ok: true, c, oferta };
    }
    c.intentos = (c.intentos || 0) + 1;
    const ratio = mult / c.umbral;
    let msg;
    if (c.actitud === "rechaza" && ratio < 0.7) msg = c.nombre + " se niega en seco y da por terminada la conversación.";
    else if (ratio < 0.7) msg = c.nombre + " ríe con desdén: esa oferta no está ni cerca de lo que busca.";
    else if (ratio < 0.9) msg = c.nombre + " duda, pero dice que no es suficiente.";
    else msg = c.nombre + " está casi convencid" + (c.genero === "mujer" ? "a" : "o") + ", pero quiere un poco más.";
    if (c.intentos >= 2) msg += " Contraoferta: " + P(U.round(baseOferta(c, conArma) * c.umbral, 100000)) + ".";
    save();
    return { ok: false, msg };
  }

  /* ============================ EQUIPO ============================ */
  function listaEquipoFiltrada() {
    let l = S.equipo.slice();
    const q = norm(filtro.q);
    if (q) l = l.filter((c) => norm(c.nombre + " " + c.especie + " " + c.clase.nombre).includes(q));
    if (filtro.elemento) l = l.filter((c) => c.elementos.some((e) => e.id === filtro.elemento));
    if (filtro.clase) l = l.filter((c) => c.clase.id === filtro.clase);
    const o = filtro.orden;
    if (o === "poder") l.sort((a, b) => G.poderEfectivo(b) - G.poderEfectivo(a));
    else if (o === "nivel") l.sort((a, b) => b.nivel - a.nivel);
    else if (o === "potencial") l.sort((a, b) => b.potencial - a.potencial);
    else if (o === "nombre") l.sort((a, b) => a.nombre.localeCompare(b.nombre));
    else l.sort((a, b) => (b.fechaReclutado || 0) - (a.fechaReclutado || 0));
    return l;
  }

  function cardEquipo(c) {
    const c1 = elColor(c.elementos[0].id);
    const c2 = elColor((c.elementos[1] || c.elementos[0]).id);
    const rota = c.maldicion.estado === "rota";
    return (
      '<article class="card" style="--c1:' + c1 + ";--c2:" + c2 + '"><header><div><h3>' + esc(c.nombre) + '</h3><p class="sub">' + (c.genero === "mujer" ? "Mujer" : "Hombre") + " · " + c.edad + " años · " + esc(c.especie) + " · " + esc(c.clase.nombre) + '</p></div><span class="badge ur">UR</span></header>' +
      chipsEl(c) +
      '<dl class="stats"><div><dt>Nivel</dt><dd>' + c.nivel + "</dd></div><div><dt>Potencial</dt><dd>" + c.potencial + "</dd></div><div><dt>Poder ahora</dt><dd>" + U.fmtM(G.poderEfectivo(c)) + "</dd></div></dl>" +
      '<p class="' + (rota ? "act act-dispuesto" : "curse") + '">' + (rota ? "✔ Maldición rota: " : "☠ Maldición " + (c.maldicion.progreso.some(Boolean) ? "en proceso: " : "activa: ")) + esc(c.maldicion.nombre) + " (Cat. " + c.maldicion.categoria + ")</p>" +
      (c.arma.separable && !c.armaAdquirida ? '<p class="act act-exigente">Arma mundial pendiente de adquirir</p>' : "") +
      '<div class="actions"><button class="btn sm primary" data-act="equipo-ficha" data-id="' + c.id + '">Ver ficha</button></div></article>'
    );
  }

  function listaEquipoHTML() {
    const l = listaEquipoFiltrada();
    if (!S.equipo.length) return '<div class="empty">Tu equipo está vacío. Recluta talentos en el mercado negro.</div>';
    if (!l.length) return '<div class="empty">Ningún miembro coincide con los filtros.</div>';
    return '<div class="grid">' + l.map(cardEquipo).join("") + "</div>";
  }

  function renderEquipo() {
    const v = $("#view-equipo");
    const n = S.equipo.length;
    const totalAct = S.equipo.reduce((a, c) => a + G.poderEfectivo(c), 0);
    const totalTras = S.equipo.reduce((a, c) => a + c.poder.tras, 0);
    const rotas = S.equipo.filter((c) => c.maldicion.estado === "rota").length;
    const elems = new Set();
    S.equipo.forEach((c) => c.elementos.forEach((e) => elems.add(e.nombre)));
    const todosElem = [];
    const vistos = new Set();
    R.elementos.forEach((e) => {
      if (!vistos.has(e.id)) {
        vistos.add(e.id);
        todosElem.push(e);
      }
    });
    v.innerHTML =
      "<h2>Tu equipo</h2>" +
      '<div class="summary"><div><span>Miembros</span><strong>' + n + "</strong></div><div><span>Poder total ahora</span><strong>" + U.fmtM(totalAct) + "</strong></div><div><span>Poder tras romper maldiciones</span><strong>" + U.fmtM(totalTras) + "</strong></div><div><span>Maldiciones rotas</span><strong>" + rotas + " / " + n + "</strong></div><div><span>Elementos cubiertos</span><strong>" + elems.size + "</strong></div></div>" +
      '<div class="filters"><input type="text" id="f-q" placeholder="Buscar por nombre, especie o clase" value="' + esc(filtro.q) + '">' +
      '<select id="f-el"><option value="">Todos los elementos</option>' + todosElem.map((e) => '<option value="' + e.id + '"' + (filtro.elemento === e.id ? " selected" : "") + ">" + esc(e.nombre) + "</option>").join("") + "</select>" +
      '<select id="f-cl"><option value="">Todas las clases</option>' + D.clases.map((c) => '<option value="' + c.id + '"' + (filtro.clase === c.id ? " selected" : "") + ">" + esc(c.nombre) + "</option>").join("") + "</select>" +
      '<select id="f-or">' + [["reciente", "Más recientes"], ["poder", "Mayor poder"], ["nivel", "Mayor nivel"], ["potencial", "Mayor potencial"], ["nombre", "Nombre A-Z"]].map((o) => '<option value="' + o[0] + '"' + (filtro.orden === o[0] ? " selected" : "") + ">" + o[1] + "</option>").join("") + "</select></div>" +
      '<div class="toolbar"><button class="btn" data-act="tsv-eq-copiar"' + (n ? "" : " disabled") + '>Copiar equipo (TSV)</button><button class="btn" data-act="tsv-eq-bajar"' + (n ? "" : " disabled") + '>Descargar equipo (TSV)</button></div>' +
      '<div id="equipo-lista">' + listaEquipoHTML() + "</div>";
  }

  /* ============================ NOMBRES ============================ */
  let ultimosNombres = [];
  function renderNombres() {
    const v = $("#view-nombres");
    v.innerHTML =
      "<h2>Generador de nombres</h2>" +
      '<p class="lead">Nombres casi infinitos por especie y género. No se repiten dentro de tus personajes.</p>' +
      '<div class="filters" style="grid-template-columns:1fr 1fr 1fr auto"><select id="n-esp">' + D.especies.map((e) => '<option value="' + e.id + '">' + esc(e.nombre) + "</option>").join("") + '</select><select id="n-gen"><option value="mujer">Mujer</option><option value="hombre">Hombre</option></select><select id="n-cant"><option>5</option><option selected>10</option><option>20</option><option>50</option></select><button class="btn primary" data-act="nombres-gen">Generar</button></div>' +
      '<div class="toolbar"><button class="btn" data-act="nombres-copiar"' + (ultimosNombres.length ? "" : " disabled") + '>Copiar lista</button></div>' +
      '<ul class="nlist" id="n-lista">' + ultimosNombres.map((n) => "<li>" + esc(n) + "</li>").join("") + "</ul>";
  }

  /* ============================ AJUSTES ============================ */
  function renderAjustes() {
    const v = $("#view-ajustes");
    v.innerHTML =
      "<h2>Ajustes y datos</h2>" +
      '<p class="lead">Todo se guarda en este navegador. Exporta un respaldo de vez en cuando, sobre todo antes de cambiar de dispositivo o borrar datos del navegador.</p>' +
      '<div class="sec"><h4>Saldos</h4><div class="row"><label class="inline">Paradios <input type="number" id="s-par" min="0" step="100000" value="' + S.paradios + '"></label><label class="inline">Oro <input type="number" id="s-oro" min="0" step="1000" value="' + S.oro + '"></label><button class="btn" data-act="guardar-saldos">Guardar saldos</button></div><p class="mut">Los Paradios sirven para reclutar; el Oro, para romper maldiciones de categoría I.</p></div>' +
      '<div class="sec"><h4>Respaldo</h4><div class="row"><button class="btn primary" data-act="exportar">Exportar partida (JSON)</button><label class="btn">Importar partida<input type="file" id="f-import" accept="application/json,.json" hidden></label><button class="btn danger" data-act="reset">Borrar todo</button></div></div>' +
      '<div class="sec"><h4>Acerca de</h4><p class="mut">Fase 1: generador de personajes, mercado negro, equipo, guardado local y exportación a Excel (TSV). Las mazmorras, objetos, subida de nivel, raids y orfanatos llegan en las siguientes fases. Los decimales de la tabla TSV usan coma, pensada para Excel en español.</p><p class="mut">Partidas generadas: ' + S.tandas + " tandas.</p></div>";
  }

  /* ============================ COMANDOS ============================ */
  function comando(txt) {
    const t = norm(txt.trim());
    if (!t) return;
    const quitar = (re) => txt.trim().replace(re, "").trim();
    if (t === "mercado negro") return pedirMercado();
    if (t === "mas candidatos") return masCandidatos();
    if (t === "equipo") return irTab("equipo");
    if (t === "estadisticas") return irTab("equipo");
    if (t === "inventario") return abrirModal("<h2>Inventario</h2>" + kv("Paradios", P(S.paradios)) + kv("Oro", U.fmt(S.oro)) + kv("Objetos de mazmorra", "Ninguno registrado (Fase 2)"));
    if (t === "mazmorras") return abrirModal("<h2>Mazmorras</h2><p>Aún no hay mazmorras registradas. Entrega tu lista de mazmorras y objetos para activarlas en la Fase 2. Hasta entonces, cualquier objeto de mazmorra se marca como SIN REGISTRAR.</p>");
    if (t === "armas mundiales") {
      const l = todos();
      return abrirModal("<h2>Armas mundiales conocidas</h2>" + (l.length ? "<ul>" + l.map((c) => "<li><strong>" + esc(c.arma.nombre) + "</strong> (" + esc(c.arma.tipo) + ", " + esc(c.arma.rareza) + ") · portador: " + esc(c.nombre) + "</li>").join("") + "</ul>" : "<p>No hay registros todavía.</p>"));
    }
    let m;
    if ((m = t.match(/^examinar (.+)/))) return conPersonaje(quitar(/^examinar/i), (c) => abrirFicha(c.id));
    if ((m = t.match(/^negociar con (.+)/))) return conPersonaje(quitar(/^negociar con/i), (c) => modalNegociar(c.id));
    if ((m = t.match(/^reclutar (.+)/))) return conPersonaje(quitar(/^reclutar/i), (c) => modalReclutar(c.id));
    if ((m = t.match(/^maldicion de (.+)/))) return conPersonaje(quitar(/^maldici[oó]n de/i), (c) => abrirModal("<h2>Maldición de " + esc(c.nombre) + "</h2>" + maldicionHTML(c, S.equipo.includes(c))));
    if ((m = t.match(/^habilidades de (.+)/))) return conPersonaje(quitar(/^habilidades de/i), (c) => abrirModal("<h2>Habilidades de " + esc(c.nombre) + '</h2><p class="mut">Copia y pega en Excel (nombre y descripción en columnas separadas).</p><textarea readonly id="ta-hab">' + esc(T.habilidadesTabla(c)) + '</textarea><div class="row"><button class="btn primary" data-act="hab-tsv" data-id="' + c.id + '">Copiar</button></div>'));
    if ((m = t.match(/^comparar (.+) y (.+)/))) {
      const partes = quitar(/^comparar/i).split(/\s+y\s+/i);
      const a = buscarNombre(partes[0] || "");
      const b = buscarNombre(partes[1] || "");
      if (a && b) return abrirComparar(a, b);
      return toast("No encontré a uno de los dos personajes.", true);
    }
    toast("Comando no reconocido.", true);
  }
  function conPersonaje(nombre, fn) {
    const c = buscarNombre(nombre);
    if (!c) return toast("No encontré a «" + nombre + "».", true);
    fn(c);
  }

  function irTab(t) {
    tabActual = t;
    renderTabs();
  }

  function pedirMercado() {
    if (S.candidatos.length) confirmar("Nueva tanda del mercado negro", "Las ofertas actuales desaparecerán del mercado. Los reclutados no se ven afectados.", "confirm-mercado");
    else {
      nuevosCandidatos(5, true);
      renderTodo();
    }
  }
  function masCandidatos() {
    if (S.candidatos.length >= 40) return toast("Ya hay muchas ofertas abiertas. Descarta algunas primero.", true);
    nuevosCandidatos(5, false);
    renderTodo();
  }

  function modalReclutar(id) {
    const c = buscar(id);
    if (!c || !S.candidatos.includes(c)) return;
    let h = "<h2>Reclutar a " + esc(c.nombre) + "</h2>";
    h += '<p class="lead">' + esc(c.personalidad.texto) + "</p>";
    h += kv("Precio que exige", P(c.precio.exigido)) + kv("Incluye", c.precio.armaSeparable ? "Contrato (" + P(c.precio.contrato) + ") y, opcionalmente, el arma mundial (" + P(c.precio.arma) + ")" : "Contrato y vinculación del arma mundial") + kv("Condiciones", c.condiciones.join(" · ")) + kv("Tus Paradios", P(S.paradios));
    if (c.umbral <= 1) {
      if (c.precio.armaSeparable) h += '<label class="inline"><input type="checkbox" id="chk-arma" data-id="' + c.id + '" checked> Incluir el arma mundial (+' + P(c.precio.arma) + ")</label>";
      h += '<div class="note ok">' + esc(c.nombre) + " acepta las condiciones al precio indicado.</div>";
      h += '<div class="row"><button class="btn primary" data-act="confirmar-reclutar" data-id="' + c.id + '">Confirmar y pagar</button><button class="btn" data-act="cerrar">Cancelar</button></div>';
    } else {
      h += '<div class="note warn">' + esc(c.nombre) + " no acepta el precio base. Tendrás que negociar y mejorar la oferta.</div>";
      h += '<div class="row"><button class="btn primary" data-act="negociar" data-id="' + c.id + '">Ir a negociar</button><button class="btn" data-act="cerrar">Cancelar</button></div>';
    }
    abrirModal(h);
  }

  function abrirComparar(a, b) {
    const row = (k, fa, fb) => "<tr><th>" + esc(k) + "</th><td>" + fa + "</td><td>" + fb + "</td></tr>";
    const g = (f) => (c) => esc(f(c));
    const filas = [
      ["Género / edad", (c) => (c.genero === "mujer" ? "Mujer" : "Hombre") + ", " + c.edad],
      ["Especie", (c) => c.especie],
      ["Clase", (c) => c.clase.nombre],
      ["Elementos", (c) => c.elementos.map((e) => e.nombre).join(" + ")],
      ["Nivel", (c) => c.nivel],
      ["Potencial", (c) => c.potencial],
      ["Poder actual", (c) => U.fmtM(c.poder.actual)],
      ["Tras romper", (c) => U.fmtM(c.poder.tras)],
      ["Máximo teórico", (c) => U.fmtM(c.poder.max)],
      ["Maldición", (c) => c.maldicion.nombre + " (Cat. " + c.maldicion.categoria + ")"],
      ["Arma mundial", (c) => c.arma.nombre + " · " + c.arma.rareza],
      ["Habilidades", (c) => c.habilidades.map((h) => h.nombre).join(" · ")],
      ["Precio", (c) => P(c.precio.exigido)],
      ["Actitud", (c) => ACT[c.actitud]],
      ["Personalidad", (c) => c.personalidad.arquetipo],
    ];
    abrirModal(
      "<h2>Comparación</h2>" +
        '<p class="mut">Los datos no deciden por ti: el resultado de un combate depende de enfrentamientos elementales, estrategia y terreno.</p><table class="cmp"><tr><th></th><th>' + esc(a.nombre) + "</th><th>" + esc(b.nombre) + "</th></tr>" +
        filas.map((f) => row(f[0], g(f[1])(a), g(f[1])(b))).join("") +
        "</table>"
    );
  }

  /* ============================ EVENTOS ============================ */
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-act]");
    if (!t) return;
    const act = t.dataset.act;
    if (act === "cmp" || act === "check") return; // se maneja en change
    const id = t.dataset.id;
    switch (act) {
      case "tab":
        irTab(t.dataset.tab);
        break;
      case "cerrar":
        cerrarModal();
        break;
      case "mercado":
        pedirMercado();
        break;
      case "confirm-mercado":
        nuevosCandidatos(5, true);
        cerrarModal();
        renderTodo();
        break;
      case "mas":
        masCandidatos();
        break;
      case "comparar":
        if (cmpSel.length === 2) abrirComparar(buscar(cmpSel[0]), buscar(cmpSel[1]));
        break;
      case "tsv-cand-copiar":
        copiar(T.tabla(S.candidatos), "Tabla de candidatos copiada (pega en Excel)");
        break;
      case "tsv-cand-bajar":
        descargar("candidatos.tsv", T.tabla(S.candidatos), "text/tab-separated-values;charset=utf-8");
        break;
      case "tsv-eq-copiar":
        copiar(T.tabla(S.equipo, { equipo: true }), "Equipo copiado (pega en Excel)");
        break;
      case "tsv-eq-bajar":
        descargar("equipo.tsv", T.tabla(S.equipo, { equipo: true }), "text/tab-separated-values;charset=utf-8");
        break;
      case "hab-tsv": {
        const c = buscar(id);
        if (c) copiar(T.habilidadesTabla(c), "Habilidades copiadas (pega en Excel)");
        break;
      }
      case "examinar":
      case "equipo-ficha":
        abrirFicha(id);
        break;
      case "descartar": {
        S.candidatos = S.candidatos.filter((c) => c.id !== id);
        cmpSel = cmpSel.filter((x) => x !== id);
        save();
        renderMercado();
        break;
      }
      case "negociar":
        modalNegociar(id);
        break;
      case "reclutar":
        modalReclutar(id);
        break;
      case "confirmar-reclutar": {
        const chk = $("#chk-arma");
        const r = intentar(id, 1, chk ? chk.checked : true);
        if (r.ok) {
          cerrarModal();
          renderTodo();
          toast(r.c.nombre + " se une a tu equipo por " + P(r.oferta) + ".");
        } else toast(r.msg, true);
        break;
      }
      case "ofrecer": {
        const rng = $("#oferta-range");
        const chk = $("#chk-arma");
        const conArma = chk ? chk.checked : true;
        const r = intentar(id, Number(rng.value) / 100, conArma);
        if (r.ok) {
          cerrarModal();
          renderTodo();
          toast(r.c.nombre + " acepta y se une a tu equipo por " + P(r.oferta) + ".");
        } else {
          modalNegociar(id, r.msg);
          if (chk) $("#chk-arma").checked = conArma;
          $("#oferta-range").value = rng.value;
          actualizarOferta();
        }
        break;
      }
      case "romper-oro": {
        const c = buscar(id);
        if (c) confirmar("Romper maldición con oro", "Se descontarán <strong>" + U.fmt(c.maldicion.costoOro) + " Oro</strong> para romper «" + esc(c.maldicion.nombre) + "» de " + esc(c.nombre) + ".", "confirm-romper-oro", id);
        break;
      }
      case "confirm-romper-oro": {
        const c = buscar(id);
        if (c && c.maldicion.estado !== "rota" && S.oro >= c.maldicion.costoOro) {
          S.oro -= c.maldicion.costoOro;
          c.maldicion.estado = "rota";
          c.maldicion.progreso = c.maldicion.progreso.map(() => true);
          save();
          renderTodo();
          abrirFicha(id);
          toast("Maldición rota.");
        } else toast("No se puede romper: oro insuficiente.", true);
        break;
      }
      case "romper-check": {
        const c = buscar(id);
        if (c) confirmar("Marcar maldición como rota", "Confirma que cumpliste todos los requisitos de «" + esc(c.maldicion.nombre) + "» para " + esc(c.nombre) + ".", "confirm-romper-check", id);
        break;
      }
      case "confirm-romper-check": {
        const c = buscar(id);
        const m = c && c.maldicion;
        if (c && m.progreso.every(Boolean) && (m.categoria !== "IV" || G.hayResucitador(S.equipo))) {
          m.estado = "rota";
          save();
          renderTodo();
          abrirFicha(id);
          toast("Maldición rota.");
        } else toast("Faltan requisitos para romper esta maldición.", true);
        break;
      }
      case "comprar-arma": {
        const c = buscar(id);
        if (c) confirmar("Comprar arma mundial", "Se descontarán <strong>" + P(c.precio.arma) + "</strong> para adquirir " + esc(c.arma.nombre) + ".", "confirm-comprar-arma", id);
        break;
      }
      case "confirm-comprar-arma": {
        const c = buscar(id);
        if (c && !c.armaAdquirida && S.paradios >= c.precio.arma) {
          S.paradios -= c.precio.arma;
          c.armaAdquirida = true;
          c.pagado = (c.pagado || 0) + c.precio.arma;
          save();
          renderTodo();
          abrirFicha(id);
          toast("Arma adquirida.");
        } else toast("No tienes suficientes Paradios.", true);
        break;
      }
      case "nombres-gen": {
        const usados = S.usadosNombres.concat(S.equipo.map((c) => c.nombre.toLowerCase()));
        ultimosNombres = R.names.lista($("#n-esp").value, $("#n-gen").value, Number($("#n-cant").value), usados);
        const keep = { esp: $("#n-esp").value, gen: $("#n-gen").value, cant: $("#n-cant").value };
        renderNombres();
        $("#n-esp").value = keep.esp;
        $("#n-gen").value = keep.gen;
        $("#n-cant").value = keep.cant;
        break;
      }
      case "nombres-copiar":
        copiar(ultimosNombres.join("\n"), "Nombres copiados");
        break;
      case "guardar-saldos": {
        const p = Math.max(0, Math.floor(Number($("#s-par").value) || 0));
        const o = Math.max(0, Math.floor(Number($("#s-oro").value) || 0));
        S.paradios = p;
        S.oro = o;
        save();
        renderCartera();
        toast("Saldos actualizados.");
        break;
      }
      case "exportar":
        descargar("partida-mercado-negro.json", JSON.stringify(S, null, 2), "application/json");
        toast("Partida exportada.");
        break;
      case "reset":
        confirmar("Borrar todo", "Se eliminarán tu equipo, ofertas y saldos de este navegador. Esta acción no se puede deshacer. ¿Exportaste un respaldo?", "confirm-reset");
        break;
      case "confirm-reset":
        S = defaults();
        cmpSel = [];
        ultimosNombres = [];
        save();
        cerrarModal();
        renderTodo();
        toast("Partida reiniciada.");
        break;
      default:
        break;
    }
  });

  document.addEventListener("change", (e) => {
    const t = e.target;
    if (t.dataset && t.dataset.act === "cmp") {
      const id = t.dataset.id;
      if (t.checked) {
        if (cmpSel.length >= 2) {
          t.checked = false;
          toast("Solo puedes comparar dos personajes a la vez.", true);
          return;
        }
        cmpSel.push(id);
      } else cmpSel = cmpSel.filter((x) => x !== id);
      renderMercado();
    } else if (t.dataset && t.dataset.act === "check") {
      const c = buscar(t.dataset.id);
      if (c) {
        c.maldicion.progreso[Number(t.dataset.i)] = t.checked;
        save();
        renderEquipo();
        const sc = $("#modal").scrollTop;
        abrirFicha(c.id);
        $("#modal").scrollTop = sc;
      }
    } else if (t.id === "chk-arma") {
      actualizarOferta();
    } else if (t.id === "f-import") {
      const f = t.files && t.files[0];
      if (!f) return;
      const rd = new FileReader();
      rd.onload = () => {
        try {
          const d = JSON.parse(rd.result);
          if (!d || typeof d !== "object" || !Array.isArray(d.equipo) || !Array.isArray(d.candidatos)) throw new Error("formato");
          S = Object.assign(defaults(), d);
          save();
          renderTodo();
          toast("Partida importada.");
        } catch (err) {
          toast("El archivo no parece una partida válida.", true);
        }
      };
      rd.readAsText(f);
    } else if (t.id === "f-el") {
      filtro.elemento = t.value;
      $("#equipo-lista").innerHTML = listaEquipoHTML();
    } else if (t.id === "f-cl") {
      filtro.clase = t.value;
      $("#equipo-lista").innerHTML = listaEquipoHTML();
    } else if (t.id === "f-or") {
      filtro.orden = t.value;
      $("#equipo-lista").innerHTML = listaEquipoHTML();
    }
  });

  document.addEventListener("input", (e) => {
    const t = e.target;
    if (t.id === "oferta-range") actualizarOferta();
    else if (t.id === "f-q") {
      filtro.q = t.value;
      $("#equipo-lista").innerHTML = listaEquipoHTML();
    }
  });

  document.addEventListener("submit", (e) => {
    if (e.target.id === "cmd-form") {
      e.preventDefault();
      const inp = $("#cmd");
      const v = inp.value;
      inp.value = "";
      comando(v);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarModal();
  });
  $("#modal").addEventListener("click", (e) => {
    if (e.target.id === "modal") cerrarModal();
  });

  /* ============================ INICIO ============================ */
  renderTodo();
})();
