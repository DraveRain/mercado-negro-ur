(function () {
  const R = (globalThis.RPG = globalThis.RPG || {});
  const E = [];

  // el(id, nombre, oficial, peso, color, mat, datos)
  function el(id, nombre, oficial, peso, c, mat, o) {
    E.push(Object.assign({ id, nombre, oficial, peso, c, mat }, o));
  }

  // ---------- ELEMENTOS OFICIALES ----------
  el("tierra", "Tierra", true, 10, "#a1795a", "tierra", {
    forma: ["lanzas de roca viva", "puños de piedra que emergen del suelo", "avalanchas de grava afilada"],
    defensa: ["un muro de roca que se levanta del suelo", "una armadura de piedra pulida"],
    mov: ["una columna de roca que lo impulsa hacia adelante", "un túnel breve bajo tierra"],
    campo: ["un suelo que se agrieta y se desplaza", "un laberinto de pilares de piedra"],
    nombres: ["Roca", "Cordillera", "Geoda", "Gólem", "Terremoto"],
    limite: ["necesita estar en contacto con el suelo", "los movimientos grandes lo dejan lento"],
    comp: ["metal", "fuego", "naturaleza"],
  });
  el("fuego", "Fuego", true, 10, "#e8592b", "fuego", {
    forma: ["lanzas de fuego comprimido", "látigos ígneos", "meteoros de brasa", "hojas de llama blanca"],
    defensa: ["un muro de brasas vivas", "una coraza de llamas rotatorias"],
    mov: ["una propulsión de llamas bajo los pies", "una estela incandescente que lo catapulta"],
    campo: ["un suelo incandescente", "un anillo de fuego que no deja salir a nadie"],
    nombres: ["Pira", "Brasa", "Ígneo", "Cenit Ardiente", "Caldera"],
    limite: ["calienta su propio cuerpo y debe enfriarse después", "gasta mucha energía si el terreno está húmedo"],
    comp: ["metal", "aire", "tierra"],
  });
  el("electrico", "Eléctrico", true, 9, "#f2d03b", "electricidad", {
    forma: ["arcos eléctricos que saltan entre objetivos", "cadenas de chispas que buscan metal", "esferas de energía estática"],
    defensa: ["una jaula de descargas que quema a quien la toca", "una piel de corriente que repele impactos"],
    mov: ["un salto de conductor en conductor", "una carga que lo lanza a gran velocidad en línea recta"],
    campo: ["una red de cables de luz que cruza el área", "un suelo cargado que da descargas"],
    nombres: ["Voltio", "Circuito", "Chispa", "Dínamo", "Sobrecarga"],
    limite: ["sobrecargarse le deja los músculos temblando", "pierde precisión si no hay metal o agua cerca"],
    comp: ["metal", "agua"],
  });
  el("oscuridad", "Oscuridad", true, 9, "#4a3a6a", "oscuridad", {
    forma: ["cuchillas de sombra", "zarcillos de oscuridad que se arrastran por el suelo", "orbes de noche concentrada"],
    defensa: ["un manto de sombras que absorbe impactos", "un escudo de noche que devora la luz"],
    mov: ["un paso entre sombras", "una sombra que lo arrastra hasta otra sombra cercana"],
    campo: ["una zona de penumbra total", "un bosque de sombras con ojos brillantes"],
    nombres: ["Umbra", "Eclipse", "Noctis", "Penumbra", "Sombra"],
    limite: ["se debilita bajo luz solar directa", "necesita sombras cercanas para canalizar"],
    comp: ["luz", "caos"],
  });
  el("luz", "Luz", true, 9, "#ffe9a0", "luz", {
    forma: ["lanzas de luz pura", "haces que atraviesan armaduras", "ráfagas de destellos cegadores"],
    defensa: ["un halo que desvía el golpe", "un escudo de rayos dorados"],
    mov: ["un salto a la velocidad de un destello", "una estela luminosa que lo lleva a otro punto"],
    campo: ["un domo de luz sagrada", "un suelo de resplandor que revela lo oculto"],
    nombres: ["Aurora", "Cenit", "Halo", "Alba", "Prisma"],
    limite: ["se debilita en oscuridad total", "los destellos grandes lo dejan visible para todos"],
    comp: ["oscuridad", "orden"],
  });
  el("belico", "Bélico", true, 8, "#b0452f", "energía bélica", {
    forma: ["armas espectrales de guerra", "salvas de proyectiles de energía marcial", "lanzas de formación que caen del cielo"],
    defensa: ["una formación de escudos espectrales", "una muralla de estandartes de guerra"],
    mov: ["una carga de caballería espectral", "un avance en formación que arrasa el terreno"],
    campo: ["un campo de batalla fantasma con trincheras", "un territorio marcado con estandartes que inspira a sus aliados"],
    nombres: ["Legión", "Estandarte", "Vanguardia", "Asedio", "Estratega"],
    limite: ["su poder depende de armas o aliados cercanos", "gasta mucha energía manteniendo las formaciones"],
    comp: ["metal", "luz", "orden"],
  });
  el("naturaleza", "Naturaleza", true, 9, "#4fa34f", "naturaleza", {
    forma: ["lianas con espinas", "enjambres de hojas cortantes", "raíces que perforan el suelo"],
    defensa: ["un muro de zarzas vivas", "una corteza endurecida"],
    mov: ["una rama que lo catapulta", "un salto entre raíces"],
    campo: ["un bosque que crece en segundos", "un jardín que entrelaza a los enemigos"],
    nombres: ["Raíz", "Selva", "Brote", "Floración", "Savia"],
    limite: ["necesita semillas o plantas cercanas para actuar con rapidez", "el fuego intenso destruye sus creaciones"],
    comp: ["agua", "tierra", "luz"],
  });
  el("rayo", "Rayo", true, 9, "#8ad3ff", "rayo", {
    forma: ["relámpagos que caen en secuencia", "lanzas de trueno", "cadenas de rayos que persiguen"],
    defensa: ["una cúpula de truenos", "un aura de tormenta que fulmina lo que se acerca"],
    mov: ["un paso relámpago", "un salto que deja un rastro de truenos"],
    campo: ["una tormenta que cubre el área", "un cielo de nubes que descarga sobre quien se detenga"],
    nombres: ["Trueno", "Tempestad", "Relámpago", "Fulgor", "Cumulonimbo"],
    limite: ["el aire seco debilita su tormenta", "tras un ataque grande queda sordo unos segundos"],
    comp: ["aire", "agua"],
  });
  el("agua", "Agua", true, 10, "#3a8fd1", "agua", {
    forma: ["lanzas de agua a presión", "látigos de corriente", "olas cortantes"],
    defensa: ["una esfera de agua que amortigua", "un muro de agua que fluye y desvía"],
    mov: ["una ola que lo lleva por el suelo", "un salto dentro de una corriente"],
    campo: ["una inundación breve que sube hasta las rodillas", "una niebla húmeda que oculta"],
    nombres: ["Marea", "Torrente", "Océano", "Corriente", "Cascada"],
    limite: ["su poder disminuye en lugares secos sin fuentes de agua", "el calor intenso la evapora"],
    comp: ["hielo", "rayo", "naturaleza"],
  });
  el("hielo", "Hielo", true, 9, "#a7e3f5", "hielo", {
    forma: ["estacas de hielo", "ventiscas de cristales afilados", "lanzas de escarcha"],
    defensa: ["un muro de hielo grueso", "una armadura de escarcha"],
    mov: ["un deslizamiento sobre una pista de hielo", "una pasarela helada que se forma bajo sus pasos"],
    campo: ["un suelo resbaladizo que ralentiza a los rivales", "una tormenta de nieve localizada"],
    nombres: ["Escarcha", "Glaciar", "Ventisca", "Cristal Helado", "Invierno"],
    limite: ["el calor extremo lo derrite", "necesita humedad cercana para crear hielo con rapidez"],
    comp: ["agua", "aire"],
  });
  el("metal", "Metal", true, 10, "#b8b8c8", "metal", {
    forma: ["cuchillas de acero líquido", "lanzas de metal que cambian de forma", "enjambres de agujas metálicas"],
    defensa: ["una coraza de metal aleado", "un escudo de acero que se adapta"],
    mov: ["un deslizamiento sobre rieles de acero", "un salto con muelles de metal"],
    campo: ["un bosque de columnas de acero", "un suelo magnetizado que atrapa armaduras"],
    nombres: ["Acero", "Forja", "Aleación", "Yunque", "Titanio"],
    limite: ["necesita metal cercano o su propio reservorio", "el óxido puede debilitar sus creaciones"],
    comp: ["fuego", "electrico", "tierra"],
  });
  el("aire", "Aire", true, 9, "#cfe8e8", "aire", {
    forma: ["cuchillas de viento", "torbellinos que arrastran", "bolas de aire comprimido"],
    defensa: ["una pared de viento que desvía proyectiles", "un colchón de aire que amortigua"],
    mov: ["un vuelo breve sobre corrientes", "un impulso de ráfaga"],
    campo: ["un ciclón controlado", "un área de corrientes ascendentes que eleva a los rivales"],
    nombres: ["Céfiro", "Ráfaga", "Tifón", "Brisa", "Huracán"],
    limite: ["en espacios cerrados pierde alcance", "los ataques grandes gastan mucho aliento"],
    comp: ["rayo", "fuego", "hielo"],
  });
  el("toxico", "Tóxico", true, 8, "#7ecb34", "toxinas", {
    forma: ["nubes de esporas tóxicas", "dardos con veneno lento", "lluvias de ácido leve"],
    defensa: ["un velo de gas que sofoca a quien se acerca", "una piel con toxinas que quema al tocar"],
    mov: ["un paso entre nubes tóxicas", "una estela de vapores"],
    campo: ["un pantano de vapores", "una niebla verdosa que desgasta"],
    nombres: ["Veneno", "Plaga", "Esporas", "Miasma", "Ponzoña"],
    limite: ["los vientos fuertes dispersan sus nubes", "los enemigos inmunes anulan sus efectos"],
    comp: ["naturaleza", "oscuridad"],
  });
  el("tiempo", "Tiempo", true, 1, "#d9b3ff", "tiempo", {
    forma: ["ecos de sus propios golpes enviados desde el futuro cercano", "agujas de instantes cristalizados", "fragmentos de segundos que cortan"],
    defensa: ["una burbuja en la que el golpe llega un segundo tarde", "un rebobinado de unos instantes que le permite esquivar"],
    mov: ["un salto de medio segundo hacia adelante", "una estela de posiciones anteriores"],
    campo: ["una zona donde el tiempo fluye a ritmos desiguales", "un reloj gigante dibujado en el suelo"],
    nombres: ["Cronos", "Instante", "Horologio", "Eterno", "Presagio"],
    limite: ["cada uso le agota la memoria reciente", "solo altera fragmentos de unos pocos segundos"],
    comp: ["orden", "caos"],
  });
  el("caos", "Caos", true, 1, "#ff4fb0", "caos", {
    forma: ["fragmentos de probabilidad rota", "esferas de caos que cambian de forma", "oleadas de azar"],
    defensa: ["un manto de azar que desvía impactos de forma impredecible", "un escudo que cambia de densidad"],
    mov: ["un salto a un punto aleatorio cercano que él puede sesgar", "una caída hacia arriba"],
    campo: ["una zona donde las reglas físicas cambian", "un torbellino de colores que desorienta"],
    nombres: ["Entropía", "Azar", "Quimera", "Anarquía", "Paradoja"],
    limite: ["sus efectos son parcialmente impredecibles, incluso para quien los usa", "los ataques grandes pueden volverse contra sus aliados"],
    comp: ["tiempo", "oscuridad"],
  });
  el("orden", "Orden", true, 1, "#ffffff", "orden", {
    forma: ["líneas de ley que cortan lo ambiguo", "sentencias de luz geométrica", "cadenas de reglas visibles"],
    defensa: ["una cuadrícula de reglas inviolables", "una armadura de proporciones perfectas"],
    mov: ["un recorrido que sigue una línea recta perfecta", "un salto a un punto marcado en una cuadrícula"],
    campo: ["una zona regida por tres reglas que él define", "un tablero de piezas de luz sobre el suelo"],
    nombres: ["Canon", "Axioma", "Código", "Estatuto", "Sentencia"],
    limite: ["solo funciona si la regla puede definirse con claridad", "las reglas que impone también lo obligan a él"],
    comp: ["tiempo", "luz", "belico"],
  });

  // ---------- ELEMENTOS PERSONALIZADOS (con reglas claras) ----------
  el("acido", "Ácido", false, 3, "#9be15d", "ácido", {
    regla: "Corroe metales y armaduras con el contacto; no afecta al cristal puro ni funciona bajo el agua.",
    forma: ["goteos de ácido corrosivo", "látigos de ácido que desintegran armaduras", "lluvia de gotas que perforan"],
    defensa: ["una película de ácido que corroe lo que la toca", "una cortina de gotas corrosivas"],
    mov: ["un deslizamiento sobre un charco que se forma bajo los pies", "una estela corrosiva que derrite el suelo"],
    campo: ["un charco extenso que carcome el suelo", "una niebla ácida que desgasta armaduras"],
    nombres: ["Corrosión", "Vitriolo", "Cáustico", "Herrumbre", "Disolución"],
    limite: ["el agua abundante lo diluye", "su propio equipo se degrada si no lo protege"],
    comp: ["metal", "fuego"],
  });
  el("gravedad", "Gravedad", false, 2, "#6a5acd", "gravedad", {
    regla: "Aumenta o reduce el peso en un radio limitado y desvía trayectorias; no crea ni destruye materia, ni altera el tiempo.",
    forma: ["esferas de gravedad condensada", "ondas de presión que aplastan", "rocas levantadas que caen como proyectiles"],
    defensa: ["un campo que desvía los proyectiles hacia el suelo", "una burbuja de peso que frena todo lo que entra"],
    mov: ["una caída controlada hacia el punto que escoge", "un salto de peso reducido de gran altura"],
    campo: ["una zona donde todo pesa el triple", "un área de gravedad invertida"],
    nombres: ["Peso", "Colapso", "Órbita", "Singularidad", "Atracción"],
    limite: ["el área es pequeña y su coste de energía aumenta con el tamaño", "no afecta con facilidad a seres de gran tamaño"],
    comp: ["aire", "metal"],
  });
  el("cristal", "Cristal", false, 3, "#7ee8e8", "cristal", {
    regla: "Cristaliza materia en objetos duros y quebradizos; los cristales reflejan y refractan energía, pero se rompen con impactos fuertes.",
    forma: ["esquirlas de cristal que refractan", "lanzas de cristal afilado", "prismas que redirigen la luz"],
    defensa: ["un muro de cristal pulido que refleja ataques", "una armadura facetada"],
    mov: ["un deslizamiento sobre una pista de cristal", "un salto entre espejos de cristal"],
    campo: ["un bosque de cristales que confunde la vista", "un suelo de espejos que multiplica los reflejos"],
    nombres: ["Prisma", "Geoda", "Facetas", "Fractura", "Reflejo"],
    limite: ["los golpes fuertes destruyen sus cristales", "necesita materia de la que cristalizar"],
    comp: ["luz", "tierra"],
  });
  el("sonido", "Sonido", false, 3, "#f0a5ff", "sonido", {
    regla: "Manipula vibraciones: ondas de choque, resonancia en estructuras y aturdimiento; no se propaga en el vacío.",
    forma: ["ondas de choque", "notas cortantes", "ecos que rebotan y se multiplican"],
    defensa: ["una pared de vibración que desvía impactos", "un tono grave que amortigua golpes"],
    mov: ["un impulso de onda que lo lanza hacia atrás o adelante", "una ráfaga de eco que lo desplaza"],
    campo: ["un área de resonancia que agrieta lo sólido", "una sinfonía continua que desorienta"],
    nombres: ["Resonancia", "Eco", "Réquiem", "Armonía", "Estruendo"],
    limite: ["el silencio mágico o el vacío anulan sus efectos", "los sonidos fuertes también afectan a sus oídos"],
    comp: ["rayo", "aire"],
  });
  el("magnetismo", "Magnetismo", false, 3, "#d4605a", "magnetismo", {
    regla: "Atrae y repele metales y campos; es poco útil contra materiales no metálicos, salvo con soporte metálico.",
    forma: ["fragmentos de metal arrojados a gran velocidad", "lanzas de limaduras magnéticas", "esferas de atracción"],
    defensa: ["un campo que desvía armas metálicas", "una coraza de imanes giratorios"],
    mov: ["un impulso que lo hace volar entre objetos metálicos", "una atracción que lo arrastra a un punto"],
    campo: ["un campo que arrebata armas y armaduras", "un área de polos opuestos que repele y atrae"],
    nombres: ["Polo", "Imán", "Campo", "Atracción", "Limadura"],
    limite: ["necesita metal cerca para actuar", "las armaduras no metálicas casi lo ignoran"],
    comp: ["metal", "electrico"],
  });
  el("plasma", "Plasma", false, 2, "#ff7ad9", "plasma", {
    regla: "Genera materia ionizada a altísima temperatura; consume mucha energía y es difícil de dirigir con precisión.",
    forma: ["lanzas de plasma incandescente", "esferas ionizadas que explotan", "arcos de plasma"],
    defensa: ["una cortina de plasma que derrite proyectiles", "un campo ionizado"],
    mov: ["un impulso de plasma que lo catapulta", "una estela ionizada"],
    campo: ["una zona ionizada que quema el aire", "un cielo de plasma"],
    nombres: ["Ion", "Corona", "Fusión", "Estela", "Aurora Roja"],
    limite: ["se agota rápido y le cuesta controlar la precisión", "el calor residual lo quema si abusa"],
    comp: ["electrico", "fuego"],
  });
  el("ceniza", "Ceniza", false, 3, "#8a8a8a", "ceniza", {
    regla: "Convierte materia quemada en polvo fino que oculta, sofoca y desgasta; necesita restos de combustión disponibles.",
    forma: ["ráfagas de ceniza abrasiva", "lanzas de ceniza compactada", "nubes que sofocan"],
    defensa: ["un manto de ceniza que amortigua", "una pared de polvo denso"],
    mov: ["una nube de ceniza que lo desplaza", "un paso entre cenizas"],
    campo: ["una tormenta de ceniza que ciega", "un suelo cubierto que ahoga las llamas"],
    nombres: ["Cenizas", "Brasa Muerta", "Polvo", "Hollín", "Ocaso"],
    limite: ["la lluvia o el agua la compactan", "necesita restos quemados cerca"],
    comp: ["fuego", "oscuridad"],
  });
  el("humo", "Humo", false, 3, "#a0a0b0", "humo", {
    regla: "Genera nubes que ocultan, asfixian y permiten borrar el rastro; se disipa con viento fuerte.",
    forma: ["zarcillos de humo asfixiante", "bolas de humo que estallan", "látigos de humo"],
    defensa: ["una cortina de humo que desvía ataques", "un cuerpo difuso que apenas puede herirse"],
    mov: ["una disolución en humo que reaparece más lejos", "una estela de niebla"],
    campo: ["una niebla densa donde solo él ve", "un humo que sofoca"],
    nombres: ["Niebla", "Vapor", "Velo", "Bruma", "Espectro"],
    limite: ["el viento lo disipa", "el humo también limita su propia visión"],
    comp: ["fuego", "oscuridad"],
  });
  el("lava", "Lava", false, 3, "#ff5a1f", "lava", {
    regla: "Funde roca y metal en un fluido que quema y enfría lento; requiere suelo rocoso o calor previo.",
    forma: ["chorros de lava", "bolas de roca fundida", "látigos de magma"],
    defensa: ["un muro de roca fundida", "una piel de magma"],
    mov: ["un río de lava bajo los pies", "una columna de magma que lo eleva"],
    campo: ["un suelo de lava burbujeante", "un cráter que se abre en el terreno"],
    nombres: ["Magma", "Volcán", "Colada", "Cráter", "Erupción"],
    limite: ["necesita suelo rocoso o fuente de calor", "el agua la enfría y la vuelve piedra"],
    comp: ["tierra", "fuego"],
  });
  el("veneno", "Veneno", false, 3, "#5aa02c", "veneno", {
    regla: "Crea toxinas específicas con efectos graduales; no es instantáneo y depende de que el objetivo sea vulnerable.",
    forma: ["agujas envenenadas", "gotas de toxina", "niebla de veneno lento"],
    defensa: ["una piel que envenena al contacto", "un velo de vapores que debilita"],
    mov: ["un paso entre gases", "una estela de vapores"],
    campo: ["un charco de veneno", "un aire viciado que debilita"],
    nombres: ["Toxina", "Antídoto", "Aguijón", "Dosis", "Ponzoña"],
    limite: ["los enemigos inmunes anulan sus efectos", "tarda en hacer efecto"],
    comp: ["toxico", "naturaleza"],
  });
  el("sangre", "Sangre", false, 2, "#a01025", "sangre", {
    regla: "Manipula la sangre propia o la de un objetivo cercano; exige una herida abierta y cuesta resistencia vital.",
    forma: ["cuchillas de sangre endurecida", "látigos de sangre", "lanzas de sangre que giran"],
    defensa: ["un escudo de sangre coagulada", "una armadura de costras vivas"],
    mov: ["un impulso de sangre que lo lanza", "un salto con rastro carmesí"],
    campo: ["un charco de sangre que absorbe y refuerza", "un círculo carmesí que marca territorio"],
    nombres: ["Carmesí", "Pacto Rojo", "Hemo", "Vena", "Sed"],
    limite: ["necesita sangre disponible y cuesta resistencia vital", "no funciona contra seres sin sangre"],
    comp: ["oscuridad", "metal"],
  });
  el("vacio", "Vacío", false, 2, "#201830", "vacío", {
    regla: "Crea zonas sin aire ni energía que apagan y absorben llamas, sonido y hechizos menores; no borra objetos grandes.",
    forma: ["esferas de vacío que absorben", "cortes que arrancan el aire", "lanzas de nada"],
    defensa: ["una burbuja de vacío que absorbe impactos menores", "un manto que devora energía"],
    mov: ["un paso a través de un pliegue de vacío corto", "una caída hacia un punto de succión"],
    campo: ["una zona sin aire ni energía", "un agujero que absorbe lo cercano"],
    nombres: ["Vacuo", "Nada", "Abismo", "Silencio", "Hueco"],
    limite: ["no destruye lo grande y se agota rápido", "le cuesta mucho mantenerlo en zonas grandes"],
    comp: ["gravedad", "oscuridad"],
  });

  R.elementos = E;
  R.elementoPorId = (id) => E.find((e) => e.id === id);
})();
