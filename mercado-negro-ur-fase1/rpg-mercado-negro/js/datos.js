(function () {
  const R = (globalThis.RPG = globalThis.RPG || {});
  const D = (R.data = {});

  /* =========================== ESPECIES =========================== */
  D.especies = [
    {
      id: "humano", nombre: "Humano", peso: 14, f: 1.0,
      nm: { pre: ["Ka", "Ren", "Al", "Mar", "Dor", "Ly", "Tho", "Eri", "Sel", "Vik", "Ro", "Ian", "Cas", "Ner", "Ju", "Bran"], mid: ["a", "e", "i", "o", "ri", "la", "ne", "va", "dar", "mi"], sufM: ["n", "ron", "dric", "el", "an", "us", "rik", "ro", "th"], sufF: ["a", "ia", "ine", "elle", "ira", "wen", "ra", "ys"] },
      rasgos: ["cicatrices rituales sobre las manos", "un mechón teñido por el uso de su elemento", "ojos que cambian de brillo al usar su poder"],
      ojos: ["ámbar", "gris acero", "verde oscuro", "violeta", "azul glaciar"],
      pelo: ["negro azabache", "castaño rojizo", "plateado", "blanco ceniza", "rubio sucio"],
      afin: ["tierra", "fuego", "metal", "belico", "luz"],
      fisio: "Cuerpo adaptable, sin ventajas innatas pero con gran capacidad de aprender.",
      debil: "Resistencia física inferior a la de otras especies.",
    },
    {
      id: "elfo", nombre: "Elfo", peso: 9, f: 1.05,
      nm: { pre: ["Ae", "Cal", "Elen", "Fae", "Ilu", "Lor", "Syl", "Thal", "Aran", "Vael", "Nae", "Lir"], mid: ["la", "ri", "vi", "na", "the", "li", "mi"], sufM: ["ion", "ael", "orn", "il", "andir", "eth", "ar"], sufF: ["iel", "wen", "ara", "ariel", "ynn", "eth", "ia", "ana"] },
      rasgos: ["orejas largas y puntiagudas", "marcas de savia luminosa en los brazos", "una diadema de ramas finas"],
      ojos: ["verde esmeralda", "plata", "dorado claro", "azul cielo"],
      pelo: ["rubio claro", "plateado", "castaño dorado", "verde apagado"],
      afin: ["naturaleza", "luz", "aire", "agua"],
      fisio: "Larga vida y sentidos agudos; sensibles a la energía de la naturaleza.",
      debil: "Cuerpo ligero y vulnerable a los metales corruptos.",
    },
    {
      id: "elfo_oscuro", nombre: "Elfo oscuro", peso: 8, f: 1.08,
      nm: { pre: ["Zy", "Vhael", "Xar", "Mor", "Ny", "Ulth", "Kael", "Szar", "Qor", "Drak"], mid: ["or", "ith", "es", "za", "ul", "ax"], sufM: ["ak", "oth", "ix", "ul", "ar", "eth"], sufF: ["issa", "yra", "ith", "ana", "eth", "ys", "iza"] },
      rasgos: ["piel gris azulada con vetas plateadas", "orejas largas con aros de metal", "marcas de sombra que se mueven bajo la piel"],
      ojos: ["rojo apagado", "violeta intenso", "plata brillante", "dorado"],
      pelo: ["blanco puro", "plateado", "negro con puntas violeta", "gris perla"],
      afin: ["oscuridad", "veneno", "hielo", "caos", "cristal"],
      fisio: "Visión en penumbra y gran agilidad; viven mucho tiempo en cavernas profundas.",
      debil: "Sufren con la luz intensa y la luz solar prolongada.",
    },
    {
      id: "vampiro", nombre: "Vampiro", peso: 8, f: 1.1,
      nm: { pre: ["Vlad", "Mir", "Cas", "Dra", "Sang", "Lil", "Not", "Zor", "Ves", "Cris", "Ser", "Ur"], mid: ["e", "a", "i", "ev", "or", "ul"], sufM: ["ius", "mir", "an", "ov", "ek", "ard"], sufF: ["ina", "ela", "ise", "ova", "etta", "ia", "ana"] },
      rasgos: ["colmillos pronunciados", "piel muy pálida con venas oscuras", "pupilas rasgadas que brillan en la sombra"],
      ojos: ["carmesí", "ámbar", "rojo oscuro", "violeta"],
      pelo: ["negro", "plateado", "castaño oscuro", "blanco"],
      afin: ["sangre", "oscuridad", "vacio", "humo"],
      fisio: "Regeneran con rapidez y se alimentan de energía vital; su ritmo vital es lento.",
      debil: "Necesitan alimentarse de energía vital y se debilitan bajo el sol directo.",
    },
    {
      id: "bestia", nombre: "Hombre bestia", peso: 12, f: 1.05,
      variantes: ["lobo", "zorro", "pantera", "oso", "halcón", "tigre", "ciervo", "tejón"],
      nm: { pre: ["Gru", "Tha", "Ro", "Ba", "Ku", "Fen", "Kor", "Zha", "Mog", "Ra", "Hak", "Tor"], mid: ["u", "a", "ro", "ga", "ki", "mo"], sufM: ["k", "gar", "nak", "bo", "ruk", "dan"], sufF: ["ra", "na", "ka", "sha", "ri", "la"] },
      rasgos: ["orejas y cola de {var}", "garras cortas y retráctiles", "pelaje marcado con rayas o manchas propias del {var}"],
      ojos: ["ámbar", "amarillo", "verde", "marrón dorado"],
      pelo: ["castaño", "gris", "negro", "rojizo", "blanco"],
      afin: ["tierra", "naturaleza", "aire", "rayo", "metal"],
      fisio: "Gran fuerza, olfato y oído agudos y reflejos felinos o caninos.",
      debil: "Los olores intensos y los sonidos fuertes los desorientan.",
    },
    {
      id: "dragonido", nombre: "Dragónido", peso: 8, f: 1.15,
      nm: { pre: ["Dra", "Ky", "Vyr", "Sar", "Ign", "Zah", "Thar", "Aur", "Bal", "Kha", "Orm", "Vel"], mid: ["ko", "ga", "va", "ru", "an", "ex"], sufM: ["ax", "oth", "gor", "rax", "ion", "dur"], sufF: ["ira", "yx", "ara", "eth", "isa", "ona"] },
      rasgos: ["pequeños cuernos curvos", "escamas en antebrazos y cuello", "una cola corta de reptil"],
      ojos: ["dorado", "rojo fuego", "verde reptil", "azul eléctrico"],
      pelo: ["rojo", "negro", "dorado", "blanco", "azul oscuro"],
      afin: ["fuego", "rayo", "tierra", "lava", "hielo", "plasma"],
      fisio: "Escamas resistentes y fuerza superior; la sangre de dragón da energía extra a su elemento.",
      debil: "Orgullo draconiano y sensibilidad al frío extremo.",
    },
    {
      id: "demonio", nombre: "Demonio humanoide", peso: 7, f: 1.1,
      nm: { pre: ["Mal", "Baal", "Az", "Ghor", "Xe", "Ve", "Mor", "Dae", "Lil", "Aba", "Ner", "Is"], mid: ["ph", "za", "go", "li", "ba", "th"], sufM: ["ez", "ion", "oth", "us", "ath", "as"], sufF: ["eth", "ia", "is", "ara", "ael", "ith"] },
      rasgos: ["cuernos pequeños de obsidiana", "una cola fina con punta", "marcas rojas que brillan en brazos y rostro"],
      ojos: ["rojo", "dorado brillante", "violeta", "negro con iris encendido"],
      pelo: ["negro", "rojo oscuro", "blanco", "azul medianoche"],
      afin: ["fuego", "oscuridad", "caos", "ceniza", "sangre"],
      fisio: "Su energía crece en los combates y los pactos; resisten bien el fuego.",
      debil: "La luz consagrada y los juramentos de ángeles los hieren más.",
    },
    {
      id: "angel", nombre: "Ángel", peso: 6, f: 1.12,
      nm: { pre: ["Ser", "Ur", "Raph", "Gab", "Is", "Ar", "Mi", "Ze", "Ha", "Lu", "Cael", "An"], mid: ["a", "e", "i", "el", "ri", "ma"], sufM: ["iel", "ael", "on", "us", "im", "ion"], sufF: ["iel", "ael", "ia", "ina", "ene", "ella"] },
      rasgos: ["un halo tenue sobre la cabeza", "alas pequeñas y luminosas", "plumas en los antebrazos"],
      ojos: ["dorado", "azul cielo", "blanco perlado", "plata"],
      pelo: ["dorado", "blanco", "plateado", "castaño claro"],
      afin: ["luz", "orden", "aire", "belico", "cristal"],
      fisio: "Resistencia espiritual y vuelo breve; su energía se potencia con la fe o la disciplina.",
      debil: "Sus alas son frágiles; la oscuridad profunda los desorienta.",
    },
    {
      id: "feerico", nombre: "Ser feérico", peso: 6, f: 0.95,
      nm: { pre: ["Pip", "Tin", "Wil", "Bri", "Fi", "Lum", "Nym", "Thi", "Oz", "Mi", "Whis", "Glim"], mid: ["a", "i", "li", "ra", "po", "ni"], sufM: ["in", "ik", "oo", "el", "by", "ow"], sufF: ["a", "ie", "ina", "ella", "ly", "ia"] },
      rasgos: ["alas translúcidas como cristal", "orejas puntiagudas con flores", "motas de luz que flotan a su alrededor"],
      ojos: ["verde claro", "rosa", "violeta", "turquesa"],
      pelo: ["rosa pálido", "verde menta", "azul claro", "lila"],
      afin: ["naturaleza", "luz", "aire", "cristal", "sonido"],
      fisio: "Estatura baja, gran agilidad y sensibilidad a los hechizos menores.",
      debil: "El hierro frío los debilita y les cuesta mentir.",
    },
    {
      id: "homunculo", nombre: "Homúnculo", peso: 6, f: 1.05, sinApellido: true,
      nm: { pre: ["Ho", "Ze", "Ni", "Ux", "Ka", "Eu", "Ph", "Ar", "Te", "Mo", "Si", "Lu"], mid: ["mu", "ro", "ni", "xa", "li", "te"], sufM: ["n", "x", "on", "is", "um", "os"], sufF: ["a", "ia", "ix", "ea", "is", "ei"] },
      rasgos: ["un núcleo luminoso visible bajo el pecho", "líneas de circuito alquímico en la piel", "piel de porcelana con grietas doradas"],
      ojos: ["dorado", "blanco", "azul pálido", "rojo suave"],
      pelo: ["blanco", "plateado", "castaño", "negro"],
      afin: ["metal", "cristal", "orden", "plasma", "veneno"],
      fisio: "Cuerpo creado por alquimia; no envejece y se repara con materiales.",
      debil: "Dependen de su núcleo; si se agrieta, pierden energía.",
    },
    {
      id: "espiritu", nombre: "Espíritu materializado", peso: 5, f: 1.1, sinApellido: true,
      variantes: ["viento", "brasa", "sombra", "marea", "bosque", "luna", "estrella", "ceniza"],
      nm: { pre: ["Yu", "Sei", "Ama", "Hi", "Su", "Ren", "Kai", "Mizu", "Tsu", "Ka", "Mi", "Shi"], mid: ["ra", "ki", "na", "to", "mi", "ya"], sufM: ["to", "ru", "shi", "ki", "ma", "ro"], sufF: ["ko", "mi", "ne", "ka", "yu", "ri"] },
      rasgos: ["cuerpo en parte translúcido que deja un rastro de {var}", "mechones que fluyen como {var}", "marcas luminosas relacionadas con el {var}"],
      ojos: ["blanco luminoso", "azul claro", "dorado", "violeta tenue"],
      pelo: ["blanco", "plateado azulado", "gris humo", "dorado pálido"],
      afin: ["aire", "agua", "luz", "oscuridad", "humo", "ceniza"],
      fisio: "Su cuerpo es una forma materializada de energía; puede atravesar objetos finos.",
      debil: "Se disipa si pierde energía o si su ancla espiritual es dañada.",
    },
    {
      id: "abisal", nombre: "Abisal", peso: 5, f: 1.08,
      nm: { pre: ["Ul", "Cth", "Nox", "Ghul", "Abys", "Thal", "Ny", "Oru", "Zhul", "Kra", "Vor", "Ixa"], mid: ["a", "u", "lo", "gu", "th"], sufM: ["oth", "un", "ax", "ul", "gor", "mus"], sufF: ["ia", "ys", "una", "eth", "ula", "ax"] },
      rasgos: ["piel azul oscura con puntos luminosos", "branquias finas en el cuello", "tentáculos cortos como mechones"],
      ojos: ["turquesa", "violeta brillante", "negro con destellos", "verde bioluminiscente"],
      pelo: ["azul marino", "violeta oscuro", "negro", "verde profundo"],
      afin: ["agua", "oscuridad", "vacio", "hielo", "gravedad"],
      fisio: "Aguantan la presión de las profundidades y respiran bajo el agua.",
      debil: "En tierra seca y luz fuerte se agotan con rapidez.",
    },
  ];

  /* ============================= CLASES ============================ */
  D.clases = [
    { id: "guerrero", nombre: "Guerrero", rol: "dps", f: 1.0, estilo: ["con cada tajo de su arma", "mediante golpes pesados de su arma", "a través de un corte descendente de su arma"], armas: ["espada ancha", "mandoble", "hacha de guerra"], vest: ["armadura ligera de cuero reforzado con una capa corta", "peto de placas y brazales con grabados"], ident: "Convierte cada golpe recibido en impulso para el siguiente ataque.", fort: "Daño directo constante y mucha resistencia al castigo.", deb: "Poco alcance si el enemigo mantiene la distancia." },
    { id: "paladin", nombre: "Paladín", rol: "tanque", f: 0.95, estilo: ["a través de su escudo y su arma bendecida", "mediante un golpe consagrado de su martillo"], armas: ["martillo de guerra con escudo", "espada y escudo largo", "maza bendecida"], vest: ["armadura blanca con tabardo ceremonial", "coraza pesada con capa de orden"], ident: "Jura un voto de combate: mientras lo cumple, su defensa crece.", fort: "Protege a los aliados y castiga a quienes los atacan.", deb: "Lento y dependiente de su posición." },
    { id: "healer", nombre: "Healer", rol: "soporte", f: 0.8, estilo: ["mediante una melodía susurrada", "a través de gestos amplios de sus manos", "por medio de su báculo"], armas: ["báculo con campanilla", "libro de plegarias", "campana de mano"], vest: ["túnica larga con bordados y bolsas de hierbas", "vestidura clara de mangas amplias"], ident: "Cura heridas pero no resucita: su poder tiene un límite claro.", fort: "Mantiene al grupo en pie en peleas largas.", deb: "Poca defensa propia." },
    { id: "mago", nombre: "Mago", rol: "control", f: 1.05, estilo: ["a través de círculos de energía que dibuja en el aire", "mediante cantos breves"], armas: ["bastón", "grimorio", "orbe flotante"], vest: ["capa larga con círculos bordados", "abrigo de erudito con amuletos"], ident: "Combina dos hechizos en uno si los lanza en el orden correcto.", fort: "Alcance, versatilidad y daño de área.", deb: "Frágil si lo alcanzan." },
    { id: "tanque", nombre: "Tanque", rol: "tanque", f: 0.95, estilo: ["a través de un golpe contundente de su escudo", "mediante embestidas con todo su peso"], armas: ["escudo torre", "maza", "gran escudo con cadenas"], vest: ["armadura de placas gruesas", "coraza de ciudadela con hombreras masivas"], ident: "Cuanto más daño absorbe, más difícil es derribarlo.", fort: "Aguanta castigo enorme y protege a los demás.", deb: "Poca movilidad y poco daño de ruptura." },
    { id: "soporte", nombre: "Soporte", rol: "soporte", f: 0.8, estilo: ["a través de sus talismanes", "mediante señales con sus manos y su instrumento"], armas: ["instrumento", "amuleto de mando", "bastón de señales"], vest: ["chaleco de campo con muchos bolsillos y talismanes", "capa corta con insignias de gremio"], ident: "Sincroniza al grupo: sus aliados ganan coordinación.", fort: "Potencia a los aliados y arregla situaciones.", deb: "Depende de tener aliados cerca." },
    { id: "alquimista", nombre: "Alquimista", rol: "control", f: 1.0, estilo: ["lanzando frascos que explotan", "mediante mezclas que prepara en pleno combate"], armas: ["caldero portátil", "bandolera de frascos", "guanteletes de crisol"], vest: ["delantal de cuero con bolsillos y guantes gruesos", "abrigo con tubos de ensayo"], ident: "Combina ingredientes en combate para crear efectos nuevos.", fort: "Versatilidad y control mediante mezclas.", deb: "Depende de sus materiales." },
    { id: "nigromante", nombre: "Nigromante", rol: "control", f: 1.05, estilo: ["a través de cetros de hueso", "mediante invocaciones susurradas"], armas: ["guadaña", "cetro de hueso", "libro de nombres muertos"], vest: ["túnica gris con símbolos de hueso", "capucha negra con adornos de plata"], ident: "Aprovecha los restos de la batalla para convocar ayudas efímeras.", fort: "Controla el campo con sirvientes temporales.", deb: "Necesita restos o energía residual." },
    { id: "arquero", nombre: "Arquero", rol: "dps", f: 1.0, estilo: ["a través de flechas encantadas", "mediante disparos que curvan en el aire"], armas: ["arco largo", "ballesta ligera", "arco compuesto"], vest: ["capa de cazador con carcaj lleno", "cuero ligero con guantes de tiro"], ident: "Marca objetivos antes de disparar para que sus flechas los persigan.", fort: "Daño a distancia y precisión.", deb: "Vulnerable en cuerpo a cuerpo." },
    { id: "asesino", nombre: "Asesino", rol: "sigilo", f: 1.05, estilo: ["con cortes rápidos desde los ángulos ciegos", "mediante estocadas precisas"], armas: ["dagas gemelas", "cadenas con cuchillas", "hoz corta"], vest: ["ropa ajustada oscura con capucha", "chaqueta ligera con cuchillos ocultos"], ident: "Su daño aumenta cuando el enemigo no lo está mirando.", fort: "Daño explosivo y movilidad.", deb: "Débil si lo descubren." },
    { id: "invocador", nombre: "Invocador", rol: "control", f: 1.0, estilo: ["a través de sellos que dibuja en el suelo", "mediante llamadas a sus invocaciones"], armas: ["libro de pactos", "cristal de enlace", "sello grabado"], vest: ["abrigo largo con sellos cosidos", "túnica con medallones de pacto"], ident: "Comparte sentidos con sus invocaciones.", fort: "Controla el campo con invocaciones.", deb: "Si caen sus invocaciones, queda expuesto." },
    { id: "monje", nombre: "Monje", rol: "dps", f: 1.0, estilo: ["mediante golpes de palma y respiración controlada", "a través de patadas giratorias"], armas: ["guanteletes", "bastón largo", "cuentas de oración reforzadas"], vest: ["túnica ligera con vendas en las manos", "ropa de entrenamiento con cinturón de colores"], ident: "Su respiración regula su poder: puede aumentarlo o dormirlo.", fort: "Combate cuerpo a cuerpo y resistencia.", deb: "Muy corto alcance." },
    { id: "espadachin", nombre: "Espadachín", rol: "dps", f: 1.05, estilo: ["mediante tajos veloces de su espada", "con cortes en cadena"], armas: ["katana", "estoque", "sable curvo"], vest: ["chaqueta larga con cinturón de vaina", "kimono de combate con mangas cortas"], ident: "Cada corte deja una marca que se activa con el siguiente.", fort: "Velocidad y daño continuo.", deb: "Alcance limitado." },
    { id: "lancero", nombre: "Lancero", rol: "dps", f: 1.0, estilo: ["con estocadas largas de su lanza", "mediante giros amplios de su lanza"], armas: ["lanza larga", "alabarda", "pica de dos puntas"], vest: ["armadura media con capa de caballería", "peto ligero con pantalón de montar"], ident: "Controla la distancia con su arma larga.", fort: "Alcance medio y control del espacio.", deb: "Débil en espacios cerrados." },
    { id: "duelista", nombre: "Duelista", rol: "sigilo", f: 1.0, estilo: ["con estocadas y disparos precisos", "mediante fintas y contragolpes"], armas: ["pistola fantástica y estoque", "estoque con cámara de energía", "par de revólveres rúnicos"], vest: ["chaqueta de duelo con volantes y botas altas", "levita corta con guantes blancos"], ident: "Gana ventaja al responder a los ataques del rival.", fort: "Precisión y contraataques.", deb: "Débil frente a varios rivales." },
    { id: "artificiero", nombre: "Artificiero", rol: "control", f: 1.0, estilo: ["a través de artefactos que construye y dispara", "mediante cargas que detonan a distancia"], armas: ["arma de fuego fantástica", "mecanismo de engranajes", "lanzador de cargas"], vest: ["mono de taller con muchas herramientas", "chaleco con engranajes colgando"], ident: "Construye artilugios sobre la marcha con piezas del entorno.", fort: "Área, trampas y versatilidad.", deb: "Depende de sus piezas." },
    { id: "domador", nombre: "Domador", rol: "control", f: 1.0, estilo: ["junto a una criatura compañera", "a través de látigos y silbatos"], armas: ["látigo", "cadenas de domador", "silbato de hueso"], vest: ["ropa de campo con guantes gruesos", "abrigo de explorador con adornos de plumas"], ident: "Su criatura compañera siente lo que él siente.", fort: "Control mediante criaturas.", deb: "Si su criatura cae, se debilita." },
    { id: "exorcista", nombre: "Exorcista", rol: "control", f: 1.0, estilo: ["a través de talismanes y cadenas", "mediante oraciones breves y sellos de papel"], armas: ["cadenas", "rosario de plata", "talismanes de papel"], vest: ["sotana con cinturón de talismanes", "kimono ritual con tiras de papel"], ident: "Sella y libera efectos sobrenaturales con rituales cortos.", fort: "Control sobre lo sobrenatural.", deb: "Poco útil contra enemigos puramente físicos." },
    { id: "hechicero", nombre: "Hechicero rúnico", rol: "control", f: 1.05, estilo: ["mediante runas que graba en el aire", "a través de tablillas que lanza"], armas: ["tablillas rúnicas", "bastón rúnico", "guantes con runas"], vest: ["capa con runas bordadas", "túnica corta con tatuajes rúnicos"], ident: "Graba runas que se activan al combinarlas.", fort: "Combinaciones y trampas.", deb: "Necesita tiempo para preparar sus runas." },
    // Clases personalizadas con identidad propia
    { id: "paladin_oscuro", nombre: "Paladín oscuro", custom: true, rol: "tanque", f: 0.97, estilo: ["a través de un golpe cargado de sombras", "mediante su escudo y su espada oscura"], armas: ["espada negra y escudo", "martillo de obsidiana"], vest: ["armadura negra con capa desgarrada", "coraza con símbolos de un juramento roto"], ident: "Convierte el daño que absorbe en una reserva de sombra que luego descarga; si se llena, pierde control.", fort: "Tanque que castiga con contraataques.", deb: "Si su reserva se llena, es peligroso hasta para sus aliados." },
    { id: "mago_heroico", nombre: "Mago heroico", custom: true, rol: "dps", f: 1.1, estilo: ["gritando el nombre de su hechizo", "con una pose de héroe y gestos exagerados"], armas: ["bastón de héroe", "espada-bastón"], vest: ["capa roja con peto ligero", "abrigo de aventurero con una gran insignia"], ident: "Sus hechizos son mucho más fuertes cuando protege a un aliado; en solitario son mediocres.", fort: "Poder enorme al proteger a otros.", deb: "Débil cuando está solo." },
    { id: "guardian_umbral", nombre: "Guardián del umbral", custom: true, rol: "control", f: 1.0, estilo: ["a través de puertas de energía que abre", "mediante su lanza-llave"], armas: ["lanza-llave", "escudo-puerta"], vest: ["armadura con grabados de puertas", "túnica con llaves colgando"], ident: "Abre y cierra puertas en el campo de batalla para separar o reunir combatientes.", fort: "Controla el espacio y el posicionamiento.", deb: "Sus puertas son visibles y los rivales aprenden a evitarlas." },
    { id: "caballero_vacio", nombre: "Caballero del vacío", custom: true, rol: "dps", f: 1.05, estilo: ["con golpes que dejan huecos a su paso", "mediante cortes que absorben la energía"], armas: ["espada hueca", "lanza sin punta"], vest: ["armadura con huecos vacíos", "capa negra con bordes difusos"], ident: "Sus golpes dejan huecos que absorben energía enemiga.", fort: "Debilita la energía rival.", deb: "El exceso de energía absorbida lo desestabiliza." },
    { id: "arquero_sangre", nombre: "Arquero de sangre", custom: true, rol: "dps", f: 1.05, estilo: ["con flechas hechas de su propia sangre", "mediante disparos carmesí"], armas: ["arco de hueso", "ballesta de venas"], vest: ["capa roja con brazales de cuero", "chaleco con tubos de sangre"], ident: "Dispara flechas de su propia sangre: cada flecha cuesta resistencia, pero la recupera al acertar.", fort: "Daño a distancia sostenido.", deb: "Si falla demasiado, se agota." },
    { id: "alquimista_almas", nombre: "Alquimista de almas", custom: true, rol: "soporte", f: 0.9, estilo: ["a través de elixires de esencia", "mediante frascos que contienen energía vital"], armas: ["frascos de esencia", "crisol de almas"], vest: ["abrigo con frascos luminosos", "delantal de cuero con tubos brillantes"], ident: "Destila fragmentos de energía vital de objetos y enemigos caídos para fabricar elixires temporales.", fort: "Elixires potentes y adaptables.", deb: "Sus elixires son temporales." },
    { id: "cantor_guerra", nombre: "Cantor de guerra", custom: true, rol: "soporte", f: 0.9, estilo: ["a través de su canto de guerra", "mediante un instrumento de batalla"], armas: ["laúd de guerra", "tambor ritual", "trompeta rúnica"], vest: ["chaqueta de bardo con insignias", "capa de juglar con campanillas"], ident: "Su canto marca el ritmo del combate y sincroniza a los aliados, pero revela su posición.", fort: "Sincroniza a todo el grupo.", deb: "Su canto lo hace fácil de localizar." },
    { id: "cazador_reliquias", nombre: "Cazador de reliquias", custom: true, rol: "sigilo", f: 1.0, estilo: ["mediante trampas y mecanismos antiguos", "con gancho y cadena"], armas: ["látigo con gancho", "guante de llaves", "brújula-arma"], vest: ["ropa de explorador con mochila grande", "chaleco de bolsillos y guantes finos"], ident: "Detecta puntos débiles en estructuras y criaturas antiguas y desactiva sus defensas.", fort: "Experto en mazmorras y trampas.", deb: "Menos eficaz contra enemigos modernos." },
  ];

  /* ========================== PERSONALIDADES ========================== */
  D.personalidades = [
    { id: "arrogante", nombre: "Arrogante", rasgo: "Se sabe superior y lo demuestra con una media sonrisa; trata a los demás como candidatos a su admiración.", mot: ["ser reconocid{o|a} como el más fuerte de su generación", "demostrar que su talento no se debe a la suerte", "superar a un rival de la infancia"], mie: ["que descubran que depende de su arma", "quedar a la sombra de otro", "ser olvidad{o|a}"], busca: ["quiere un patrocinador que pueda costear su ascenso", "necesita un escenario digno de su talento", "cree que tu equipo es el único que merece su atención"], cond: ["Exige liderar al menos una misión importante", "Pide un contrato de prestigio con su nombre en los registros", "Quiere que le demuestres capacidad antes de aceptar"], act: [10, 45, 35, 10], pm: [1.1, 1.4] },
    { id: "reservado", nombre: "Reservado", rasgo: "Habla poco, observa mucho y rara vez revela lo que piensa.", mot: ["proteger un secreto de su pasado", "encontrar un lugar donde no lo juzguen", "entender el origen de su poder"], mie: ["que su secreto salga a la luz", "ser tratad{o|a} como una herramienta", "perder el único lugar tranquilo que ha encontrado"], busca: ["necesita recursos para investigar su pasado", "busca estabilidad sin ser el centro de atención", "acepta ofertas solo si no le exigen exposición pública"], cond: ["Pide discreción absoluta sobre su identidad", "Exige habitación privada y tiempo libre", "Quiere conocer a todo el equipo antes de decidir"], act: [25, 25, 35, 15], pm: [0.9, 1.2] },
    { id: "amable", nombre: "Amable", rasgo: "Cálid{o|a} y empátic{o|a}, se preocupa por quienes lo rodean.", mot: ["proteger a quienes no pueden defenderse", "pagar la deuda de un orfanato", "ser un ejemplo para otros niños"], mie: ["que alguien salga herido por su culpa", "su propio poder", "volverse insensible"], busca: ["quiere un equipo que lo trate como persona", "busca recursos para apoyar a su hogar de origen", "confía en tu proyecto si se muestra honesto"], cond: ["Pide que se financie su orfanato o comunidad", "Quiere cláusulas de cuidado para sus amigos", "Exige que no se use su poder contra civiles"], act: [55, 20, 15, 10], pm: [0.8, 1.05] },
    { id: "competitivo", nombre: "Competitivo", rasgo: "Todo es un duelo; cualquier reto le enciende la mirada.", mot: ["ganar el torneo de mazmorras del continente", "superar su marca personal cada semana", "vencer al campeón actual de su gremio"], mie: ["perder dos veces contra el mismo rival", "estancarse", "que su victoria se deba a la suerte"], busca: ["busca rivales y entrenamiento para crecer", "quiere una plaza en un equipo que enfrente mazmorras difíciles", "aceptará si le prometes combates serios"], cond: ["Exige un duelo de prueba contra alguien de tu equipo", "Quiere acceso a mazmorras de alto nivel", "Pide bonificaciones por victorias"], act: [30, 35, 25, 10], pm: [1.0, 1.3] },
    { id: "desconfiado", nombre: "Desconfiado", rasgo: "Sospecha de toda oferta y revisa las salidas antes de sentarse.", mot: ["no volver a ser traicionad{o|a}", "encontrar a quien lo vendió", "sobrevivir con sus propias reglas"], mie: ["firmar un contrato con letra pequeña", "ser vendid{o|a} otra vez", "que su arma sea robada"], busca: ["necesita protección contra un antiguo patrón", "busca un contrato con garantías claras", "solo acepta si verifica la reputación de tu equipo"], cond: ["Exige revisar el contrato con un notario independiente", "Pide pagos escalonados", "Quiere una cláusula de salida"], act: [10, 30, 40, 20], pm: [1.0, 1.35] },
    { id: "idealista", nombre: "Idealista", rasgo: "Cree que el mundo puede cambiarse si los fuertes se comprometen.", mot: ["acabar con el mercado de esclavos", "encontrar la verdad sobre los dioses caídos", "crear un refugio seguro para huérfanos"], mie: ["que su causa sea usada con fines opuestos", "desilusionarse de sus aliados", "no estar a la altura de sus ideales"], busca: ["busca un patrocinador que comparta sus valores", "quiere recursos para una misión justa", "evalúa si tus fines coinciden con los suyos"], cond: ["Exige conocer tus objetivos reales", "Pide libertad para rechazar misiones inmorales", "Quiere que liberes a otros del mercado"], act: [35, 25, 25, 15], pm: [0.85, 1.15] },
    { id: "ambicioso", nombre: "Ambicioso", rasgo: "Calcula cada paso: ve cada oferta como un escalón.", mot: ["fundar su propio gremio algún día", "reunir fama y fortuna antes de los veinte", "convertirse en leyenda"], mie: ["no destacar", "caer en la mediocridad", "depender de otros"], busca: ["quiere el mejor patrocinador disponible", "busca un contrato con participación en los botines", "ve en tu equipo una plataforma de ascenso"], cond: ["Exige un porcentaje de los botines", "Pide una cláusula de ascenso", "Quiere mando en su futura unidad"], act: [20, 50, 20, 10], pm: [1.15, 1.5] },
    { id: "volatil", nombre: "Temperamental", rasgo: "Cambiante: puede ser encantador o insoportable en un mismo día.", mot: ["encontrar a alguien que soporte su carácter", "desahogar su frustración en combate", "romper la maldición cuanto antes"], mie: ["perder el control", "herir a alguien cercano", "que lo encierren"], busca: ["busca una oportunidad antes de que su carácter lo deje sin opciones", "necesita supervisión sin sentirse vigilad{o|a}", "acepta si le dan libertad y espacio"], cond: ["Exige un espacio de entrenamiento propio", "Pide que nadie le dé órdenes directas", "Quiere avances rápidos con su maldición"], act: [20, 25, 35, 20], pm: [0.95, 1.3] },
    { id: "excentrico", nombre: "Excéntrico", rasgo: "Distraíd{o|a} y curios{o|a}; sus ideas parecen locuras y a veces funcionan.", mot: ["coleccionar secretos de las mazmorras", "probar todos los elementos del mundo", "descubrir qué hay tras el último piso de una mazmorra"], mie: ["el aburrimiento", "olvidar su propósito", "perder sus cuadernos"], busca: ["quiere acceso a mazmorras nunca exploradas", "necesita materiales para un experimento", "acepta si le prometes rarezas"], cond: ["Exige materiales o libros raros", "Pide acceso a mazmorras inexploradas", "Quiere que financies sus experimentos"], act: [40, 25, 25, 10], pm: [0.85, 1.2] },
    { id: "protector", nombre: "Leal y protector", rasgo: "Leal hasta el extremo con quienes considera suyos.", mot: ["proteger a su pequeño grupo", "pagar una deuda de honor", "no volver a perder a un compañero"], mie: ["perder a los suyos", "tener que elegir entre dos lealtades", "no llegar a tiempo"], busca: ["necesita fondos para proteger a su familia adoptiva", "busca un equipo donde pueda proteger a otros", "solo se une si sus amigos también tienen lugar"], cond: ["Exige que acepten a un amigo o hermano en el equipo", "Pide protección para su familia adoptiva", "Quiere cláusulas de lealtad mutua"], act: [45, 25, 20, 10], pm: [0.85, 1.15] },
    { id: "cinico", nombre: "Cínico", rasgo: "Pragmático y sarcástico; todo tiene precio y lo dice sin rodeos.", mot: ["ahorrar para comprar su libertad definitiva", "retirarse con una fortuna", "salir de la vida de mazmorras"], mie: ["quedarse sin dinero", "morir por una causa ajena", "creer en algo y que falle"], busca: ["quiere el contrato mejor pagado", "busca ingresos estables", "vende su fuerza al mejor postor"], cond: ["Exige pago adelantado", "Pide bonificaciones por riesgo", "Quiere cláusula de rescisión"], act: [30, 40, 25, 5], pm: [1.1, 1.45] },
    { id: "sereno", nombre: "Sereno", rasgo: "Tranquil{o|a} y reflexiv{o|a}; escucha antes de hablar y mide cada palabra.", mot: ["entender la naturaleza de su poder", "encontrar paz tras una tragedia", "guiar a otros más jóvenes"], mie: ["perder la calma en batalla", "que su poder lastime a inocentes", "no encontrar sentido a su fuerza"], busca: ["busca un maestro o un equipo que valore la paciencia", "le interesa un lugar para entrenar con calma", "acepta si respetan su ritmo"], cond: ["Pide tiempo para decidir", "Exige un periodo de prueba de un mes", "Quiere meditar en un santuario antes de partir"], act: [35, 20, 30, 15], pm: [0.9, 1.15] },
  ];

  /* ============================ HISTORIA ============================ */
  D.lugares = ["Valmora", "Karthen", "la Isla Oryn", "Dunhar", "Saelis", "Puerto Ceniza", "las Marismas de Veth", "Rocafría", "Ámbarcrest", "el Delta Dorado"];
  D.origenes = [
    "Creció en un orfanato del puerto de {lugar}, donde aprendió a pelear antes que a leer.",
    "Nació en una familia noble de {lugar} que cayó en desgracia tras una traición.",
    "Fue criad{o|a} por un gremio de mercenarios que lo trataba más como arma que como hij{o|a}.",
    "Fue encontrad{o|a} en el interior de una mazmorra cerca de {lugar}, sin recuerdos claros de su pasado.",
    "Es el único superviviente de una raid fallida en {lugar}, donde su poder despertó por primera vez.",
    "Escapó de un templo de {lugar} que pretendía usar su poder como arma de guerra.",
    "Creció entre caravanas y mercados de {lugar}, vendiendo información y evitando deudas.",
    "Fue entrenad{o|a} en secreto por un maestro retirado de {lugar}.",
    "Nació en una aldea fronteriza de {lugar} destruida por un monstruo de rango alto.",
    "Vivió en una academia de {lugar}, donde era el estudiante más temido y menos comprendido.",
  ];
  D.eventos = [
    "Su poder de {mat} despertó por instinto durante un ataque de monstruos.",
    "Un maestro errante vio su potencial y le enseñó lo básico antes de desaparecer sin explicación.",
    "Su maldición se manifestó el día en que intentó dominar su poder por primera vez.",
    "Venció a un enemigo muy superior en una pelea que todavía se cuenta en las tabernas.",
    "Fue captur{ado|ada} por traficantes que querían subastar su talento, pero logró escapar.",
    "Un incidente en el que perdió a un ser querido marcó el inicio de su entrenamiento.",
    "Aprendió a controlar su elemento observando a las criaturas de la zona.",
    "Participó en una raid de gremio, donde fue subestimad{o|a} hasta que salvó al grupo.",
    "Encontró su arma mundial en un lugar que ya no recuerda cómo encontrar.",
    "Fue el centro de un rumor en el mercado negro que atrajo a coleccionistas de talentos.",
  ];
  D.situaciones = [
    "Hoy sobrevive aceptando contratos de escolta y caza de monstruos.",
    "Se oculta bajo un nombre falso para evitar a quienes lo buscan.",
    "Vive de las ofertas del mercado negro mientras decide en quién confiar.",
    "Recibió propuestas de varios gremios, pero ninguna le ofreció lo que realmente necesita.",
    "Lleva meses recorriendo mazmorras menores para entrenar a escondidas.",
    "Está bajo vigilancia de un intermediario que lo ofrece al mejor postor.",
    "Trabaja como guía en raids, siempre al borde de aceptar una oferta mayor.",
    "Está en una pensión barata esperando una oportunidad real.",
  ];
  D.epitetosM = ["el Cuervo de Ceniza", "el Heredero Hueco", "el Niño de las Cien Mazmorras", "el Filo Sereno", "el Guardián sin Casa", "el Último Juramento", "el Lobo de Escarcha", "el Sol Pequeño"];
  D.epitetosF = ["la Hoja sin Nombre", "la Chispa del Norte", "la Sombra de Vael", "la Voz del Ocaso", "la Estrella Rota", "la Tormenta Silente", "la Reina sin Corona", "la Flor de Hierro"];
  D.reputaciones = [
    "Conocid{o|a} en gremios menores como «{ep}».",
    "Los rumores dicen que ha derrotado a rivales de rango mayor con ayuda de su arma.",
    "Pocos {lo|la} han visto combatir y siguen sin entender cómo gana.",
    "Los coleccionistas {lo|la} vigilan desde hace meses.",
    "Su nombre circula en el mercado negro, pero nadie conoce su historia completa.",
    "Los gremios de la región {lo|la} consideran una apuesta de alto riesgo y gran recompensa.",
    "Es famos{o|a} por rechazar ofertas que otros considerarían irrechazables.",
    "Se le conoce como «{ep}» entre los cazadores de mazmorras.",
  ];
  D.apellidoA = ["Ash", "Storm", "Iron", "Moon", "Ember", "Night", "Frost", "Raven", "Silver", "Wolf", "Dusk", "Star", "Thorn", "Gold"];
  D.apellidoB = ["fall", "wind", "thorn", "vale", "brand", "moor", "crest", "born", "ward", "song", "veil", "shade", "heart", "gate"];
  D.accesorios = ["una bufanda larga", "un colgante con un fragmento de cristal", "guantes de cuero desgastados", "una insignia de gremio rota", "una cinta en el brazo", "pendientes con pequeñas runas", "un cinturón con muchos bolsillos", "un medallón antiguo"];
  D.presencias = ["Camina con calma, como si el campo de batalla le perteneciera.", "Su mirada se vuelve afilada en cuanto detecta peligro.", "Habla en voz baja pero todos guardan silencio cuando lo hace.", "Parece distraíd{o|a}, aunque nunca baja la guardia.", "Su sola presencia hace que el aire se sienta más pesado.", "Sonríe con facilidad, aunque sus ojos no dejan de calcular.", "Se mueve sin hacer ruido, como si no quisiera ser notad{o|a}.", "Siempre está atent{o|a} a las salidas del lugar."];

  D.condicionesGenerales = ["Contrato de tres años renovables", "Pago de {pct}% por adelantado", "Beca mensual de entrenamiento", "Acceso a un maestro asignado", "Alojamiento propio dentro de tu base", "Cláusula de rescisión con aviso de un mes", "Bonificación por mazmorra completada", "Derecho a rechazar una misión por semestre"];
  D.observaciones = ["Advierto que su maldición es más grave de lo que aparenta.", "Varios coleccionistas ya preguntaron por esta oferta.", "Su arma ha rechazado a otros portadores antes.", "Garantizo la autenticidad de su rango, no la de su lealtad.", "Quien lo reclute deberá ganarse su confianza.", "La oferta puede caducar si otro comprador paga primero.", "Tiene contactos incómodos en el mercado negro.", "No ha entrenado con otros: su compatibilidad en equipo es incierta."];

  /* ========================== ARMAS MUNDIALES ========================== */
  D.armaA = ["Aurora", "Réquiem", "Eclipse", "Génesis", "Lamento", "Juramento", "Corona", "Susurro", "Cenit", "Ocaso", "Himno", "Colmillo", "Voz", "Estigma", "Vigilia"];
  D.armaB = ["los Cien Inviernos", "la Última Ceniza", "los Dioses Caídos", "la Reina Hueca", "un Sol Muerto", "las Cinco Mareas", "el Primer Juramento", "la Noche Eterna", "los Reyes Olvidados", "la Estrella Rota", "la Marea Muda", "los Mil Ecos"];
  D.armaMateriales = ["acero negro", "cristal de ceniza", "marfil antiguo", "oro envejecido", "hueso blanco", "bronce estelar", "madera petrificada", "plata fría"];
  D.armaDetalles = ["con grabados que brillan cuando usa {mat}", "con un núcleo luminoso que late", "envuelta en cintas de tela viejas", "con una gema incrustada que sigue a su portador", "cuyo filo parece vibrar", "con cadenas finas que tintinean al moverse"];
  D.armaCivs = ["el Imperio de Orhal", "la Dinastía Cristalina", "los Reinos Hundidos de Veth", "el Concilio Solar", "la Orden del Último Faro", "los Forjadores de Brasa Negra", "el pueblo olvidado de Ysmir", "la Era de los Dioses Caídos"];
  D.armaEventos = ["fue forjada para sellar a un dios menor", "se creó con el último aliento de un rey moribundo", "fue ofrenda en una guerra entre tres naciones", "nació cuando una estrella cayó sobre un templo", "fue el instrumento de un heraldo condenado", "se perdió en una mazmorra durante siglos tras la caída de su creador", "fue fruto de un pacto roto entre un artesano y un espíritu"];
  D.armaEspeciales = [
    "Permite al portador materializar {forma} directamente desde el arma sin gastar energía propia, hasta cierto límite.",
    "Absorbe una pequeña parte de la energía del enemigo en cada golpe certero y la almacena para una descarga posterior de {mat}.",
    "Cambia entre dos modos: uno rápido y ligero y otro pesado y devastador, ambos impregnados de {mat}.",
    "Marca el entorno donde el portador combate con una resonancia de {mat} que mejora sus reflejos y sus sentidos.",
    "Almacena el eco de los hechizos que recibe y puede reproducirlos una vez como {forma}.",
    "Se separa en fragmentos que orbitan al portador y actúan como armas flotantes cargadas de {mat}.",
  ];
  D.armaSync = [
    "Requiere que el portador derrame su sangre sobre el arma al amanecer durante siete días.",
    "Solo responde si el portador pronuncia su nombre verdadero.",
    "Se sincroniza con el latido del portador; si este se acelera demasiado, pierde control.",
    "Debe compartir una memoria dolorosa con el arma.",
    "Necesita una ofrenda de {mat} concentrado cada luna llena.",
    "Exige superar una prueba de resistencia en la que el arma intenta rechazar al portador.",
    "Se vincula al alma durante un ritual de una noche; después no puede separarse.",
    "Se une al portador cuando este toma una decisión que desafía su propio miedo.",
  ];
  D.armaLimites = [
    "Cada uso prolongado le desgasta al portador la resistencia física.",
    "Solo funciona plenamente cerca de fuentes de {mat}.",
    "Rechaza a otros portadores y los hiere si la empuñan.",
    "Pierde fuerza si el portador miente en combate.",
    "Se vuelve más pesada cuanto más tiempo la usa en un mismo combate.",
    "Su energía se agota tras tres usos especiales seguidos.",
    "Atrae la atención de criaturas antiguas que la buscan.",
    "No puede usarse en lugares consagrados.",
  ];
  D.armaConciencia = ["susurra consejos sarcásticos", "exige ser tratada con respeto", "habla con la voz de su creador muerto", "solo comenta en combate", "se niega a pelear si considera injusta la causa", "canturrea cuando siente peligro"];
  D.armaRarezas = [
    { n: "Reliquia Antigua", f: 1.1, w: 40, pct: 10 },
    { n: "Reliquia Primordial", f: 1.25, w: 35, pct: 25 },
    { n: "Arma Mundial Génesis", f: 1.4, w: 18, pct: 40 },
    { n: "Arma Mundial Celestial", f: 1.6, w: 7, pct: 60 },
  ];

  /* ============================ MALDICIONES ============================ */
  D.objetoA = ["Lágrima", "Fragmento", "Núcleo", "Semilla", "Espejo", "Sello", "Corazón", "Pétalo", "Cálculo"];
  D.objetoB = ["del Guardián Hueco", "de la Marea Negra", "del Reloj Dormido", "de Cristal Ceniciento", "del Primer Eclipse", "de la Reina Pálida", "de Hueso Dorado"];

  D.maldiciones = {
    I: [
      { n: "Sello de Ceniza Hueca", ef: "Pierde sensibilidad en las manos durante unos minutos cada vez que usa {mat}.", co: "Falla al sujetar objetos finos y su precisión baja tras varias habilidades seguidas.", po: "Limita la fluidez de su elemento.", be: "Recupera el control del flujo de {mat} y sus habilidades dejan de tener pausas forzadas.", ri: "La purificación es dolorosa; si se interrumpe, el sello se endurece y sube de precio." },
      { n: "Eco de Voz Prestada", ef: "Su voz se reduce a un susurro cuando intenta invocar una habilidad definitiva.", co: "Necesita el doble de esfuerzo para usar su técnica final.", po: "Corta el acceso a su técnica más poderosa.", be: "Su técnica final vuelve a fluir y gana alcance.", ri: "Un mal ritual podría dejarlo sin voz unos días." },
      { n: "Grillete de Sombra Menor", ef: "Una sombra se pega a sus pies y lo vuelve más lento al cambiar de dirección.", co: "Pierde velocidad en las esquivas y los giros bruscos.", po: "Reduce su movilidad natural.", be: "Recupera su velocidad completa.", ri: "La sombra puede aferrarse a otra persona." },
      { n: "Marca del Deudor", ef: "Una marca en la muñeca absorbe una parte de su energía cada día: es una deuda mágica.", co: "Empieza los combates con la energía reducida.", po: "Drena su reserva diaria.", be: "Recupera toda su reserva de energía.", ri: "Si no se paga a tiempo, la deuda crece." },
      { n: "Espina de Cristal Dormido", ef: "Un fragmento clavado en su reserva de energía la vacía antes de tiempo.", co: "Se agota rápido en combates largos.", po: "Acorta su resistencia.", be: "Su resistencia vuelve a un nivel normal para su rango.", ri: "Extraerla sin cuidado puede dañar su núcleo." },
      { n: "Velo de Olvido Parcial", ef: "Olvida el orden de sus técnicas durante combates largos.", co: "Pierde coordinación entre habilidades al pasar de cierto tiempo.", po: "Limita las sinergias entre habilidades.", be: "Mantiene memoria perfecta de sus técnicas.", ri: "El ritual puede borrar recuerdos útiles." },
    ],
    II: [
      { n: "Herida del Reloj Oxidado", ef: "Sus habilidades se enfrían con un retraso creciente.", co: "Las recargas son más largas cuanto más usa su poder.", po: "Restringe el uso continuo de habilidades.", be: "Recuperación normal de habilidades y mejor ritmo de combate.", ri: "Un objeto equivocado puede agravar el retraso." },
      { n: "Corona de Espinas Mudas", ef: "Su concentración se rompe cada vez que recibe un golpe en la cabeza.", co: "Tiene problemas para mantener habilidades largas.", po: "Limita las técnicas sostenidas.", be: "Puede sostener habilidades sin interrupciones.", ri: "Retirar la corona puede dejarlo aturdido." },
      { n: "Sed del Cuenco Vacío", ef: "Su energía se vacía si no bebe un elixir específico cada día.", co: "Se agota a media pelea si olvida beber.", po: "Lo hace dependiente de un recurso.", be: "Ya no necesita el elixir diario.", ri: "Si falla, queda debilitado varios días." },
      { n: "Costura de Sombra", ef: "Una cicatriz oscura impide que use sus elementos a plena potencia.", co: "Sus elementos pierden intensidad.", po: "Reduce el poder de sus elementos.", be: "Libera la intensidad total de su elemento.", ri: "La cicatriz puede abrirse." },
      { n: "Pacto Roto con un Espíritu Menor", ef: "Un espíritu enojado interfiere con sus técnicas en momentos críticos.", co: "A veces falla una habilidad clave.", po: "Introduce fallos aleatorios.", be: "Las habilidades dejan de fallar.", ri: "El espíritu puede vengarse." },
      { n: "Peso de la Luna Hueca", ef: "Su cuerpo se vuelve más pesado durante las noches de luna.", co: "Pierde agilidad en esas noches.", po: "Limita su agilidad lunar.", be: "Agilidad constante y mayor control.", ri: "Si falla, el peso se queda más tiempo." },
    ],
    III: [
      { n: "Cadena del Juramento Inverso", ef: "Una cadena invisible lo ata a un juramento que no recuerda haber hecho.", co: "Sus ataques fallan contra el objetivo del juramento.", po: "Bloquea parte de su poder contra ciertos rivales.", be: "Se libera del juramento sin perder su elemento.", ri: "La runa lo marca de por vida.", runa: { n: "Runa del Pacto Inverso", ap: "Una cadena fina grabada en el antebrazo", pod: "Permite pausar un juramento durante un combate", ef: "Sella la cadena y la convierte en una fuente de energía controlada", ub: "Rumor: un altar hundido; ubicación no confirmada", con: "No puede romper ningún juramento nuevo sin dolor." } },
      { n: "Fiebre del Eco Ancestral", ef: "Voces de sus antepasados interfieren en sus decisiones.", co: "Pierde concentración y a veces ataca por reflejo.", po: "Divide su atención y reduce su control.", be: "Acceso a la memoria útil de su linaje.", ri: "La runa puede amplificar las voces.", runa: { n: "Runa Eco-Madre", ap: "Un patrón de ondas en el pecho", pod: "Canaliza la memoria del linaje en una sola voz", ef: "Transforma el ruido en guía y contiene la fiebre", ub: "Rumor: un templo de linajes; no confirmada", con: "Las voces nunca desaparecen por completo." } },
      { n: "Sombra del Nombre Robado", ef: "Alguien tiene su nombre verdadero y resta potencia a sus habilidades.", co: "No puede usar su técnica final sin dolor.", po: "Bloquea la fase final de su poder.", be: "Recupera el control de su nombre.", ri: "La runa lo hace rastreable.", runa: { n: "Runa del Nombre Fijo", ap: "Un símbolo circular en la nuca", pod: "Fija su nombre en su alma", ef: "Impide que su nombre sea usado en su contra", ub: "Rumor: un archivo antiguo; no confirmada", con: "Su nombre queda registrado para siempre." } },
      { n: "Corazón de Dos Tormentas", ef: "Dos fuerzas opuestas dentro de él se pelean y descontrolan su poder.", co: "Sufre sobrecargas al usar habilidades fuertes.", po: "Limita la potencia por riesgo de sobrecarga.", be: "Armoniza sus dos fuerzas.", ri: "Un error puede liberar una tormenta.", runa: { n: "Runa Concordia", ap: "Dos líneas entrelazadas en el hombro", pod: "Estabiliza la fuerza dual", ef: "Contiene la sobrecarga y la canaliza", ub: "Rumor: un santuario en las montañas; no confirmada", con: "Siempre sentirá la tormenta, aunque contenida." } },
      { n: "Silencio de la Estrella Muerta", ef: "Una estrella extinta absorbe parte de su energía cada noche.", co: "Se debilita en la noche y en las zonas oscuras.", po: "Reduce su poder en la oscuridad.", be: "Poder constante a cualquier hora.", ri: "La runa puede atraer a criaturas de la noche.", runa: { n: "Runa Vigía", ap: "Un ojo abierto en la palma", pod: "Vigila su energía y la protege", ef: "Cierra la fuga de energía y la devuelve", ub: "Rumor: una torre perdida; no confirmada", con: "Nunca podrá dormir del todo." } },
      { n: "Hambre del Vacío Interior", ef: "Un vacío en su interior consume su energía con cada habilidad.", co: "Se agota mucho más rápido.", po: "Reduce su reserva real.", be: "Reserva completa y recuperación rápida.", ri: "La runa sacia el vacío, pero cuesta mantenerla.", runa: { n: "Runa Sacia", ap: "Un círculo oscuro en el abdomen", pod: "Alimenta el vacío con energía ajena de forma controlada", ef: "Contiene el vacío y evita que se alimente de él", ub: "Rumor: una mazmorra olvidada; no confirmada", con: "Necesitará un tributo de energía periódico." } },
    ],
    IV: [
      { n: "Muerte Aplazada", ef: "Su cuerpo ya murió una vez y su energía se pudre lentamente.", co: "Pierde fuerza con el tiempo y se debilita en combates largos.", po: "Bloquea la mayor parte de su potencial real.", be: "Renace con el cuerpo libre de la corrupción y su potencial pleno.", ri: "Puede no regresar.", muerte: "Debe morir en un ritual con un círculo de sal y plata.", limites: "El resucitador debe revivirlo antes de una hora.", riesgos: "Si falla, el alma se pierde." },
      { n: "Alma Dividida", ef: "Su alma está partida en dos y solo una mitad actúa a la vez.", co: "A veces sus habilidades responden con retraso.", po: "Solo accede a una parte de su poder.", be: "Recupera la unidad de su alma.", ri: "Puede no recuperar las dos mitades.", muerte: "Debe morir en un círculo que reúna ambas mitades.", limites: "La resurrección debe unir las dos partes.", riesgos: "Puede despertar con otra personalidad." },
      { n: "Linaje Maldito de los Reyes Hundidos", ef: "Una maldición familiar sella su potencial hasta que él mismo muera.", co: "Su potencial permanece bloqueado.", po: "Bloquea casi todo su potencial.", be: "Libera el potencial de su linaje.", ri: "Puede heredar una nueva maldición.", muerte: "Debe morir en el lugar donde cayó su familia.", limites: "La resurrección debe ocurrir al amanecer.", riesgos: "La maldición puede transferirse al resucitador." },
      { n: "Contrato con un Dios Menor", ef: "Un dios menor tiene derecho sobre su alma y limita su poder.", co: "No puede usar su máximo poder sin permiso del dios.", po: "Limita casi todo su poder.", be: "Libertad total de su poder.", ri: "El dios puede reclamarlo al morir.", muerte: "Debe morir con el contrato en la mano.", limites: "La resurrección debe cortar el contrato.", riesgos: "El dios puede negarse." },
      { n: "Corazón Sellado", ef: "Su corazón está sellado y bloquea su energía vital.", co: "Pierde fuerza en combates largos.", po: "Reduce su energía vital.", be: "Acceso a su energía completa.", ri: "Un error puede detener su corazón para siempre.", muerte: "Debe morir con el sello roto.", limites: "El resucitador debe volver a latir su corazón.", riesgos: "Puede quedar con el corazón dañado." },
      { n: "Jaula del Primer Aliento", ef: "Su primer aliento quedó atrapado y le impide respirar con libertad.", co: "Pierde aliento con rapidez.", po: "Limita su reserva de energía.", be: "Respira con libertad y su energía fluye.", ri: "Puede no recuperarlo.", muerte: "Debe morir sin su primer aliento.", limites: "La resurrección debe devolverlo.", riesgos: "Puede despertar sin voz." },
    ],
  };
  D.curseCat = {
    I: { w: 30, pen: [0.1, 0.22], precio: 0.92 },
    II: { w: 30, pen: [0.22, 0.38], precio: 0.85 },
    III: { w: 25, pen: [0.35, 0.52], precio: 0.78 },
    IV: { w: 15, pen: [0.5, 0.7], precio: 0.7 },
  };

  /* ===================== PLANTILLAS DE HABILIDADES ===================== */
  D.habNombres = {
    ofensiva: ["Colmillo", "Réquiem", "Tormenta", "Filo", "Cascada", "Sentencia", "Lanza", "Furia"],
    defensiva: ["Bastión", "Velo", "Égida", "Caparazón", "Umbral", "Espejo", "Resguardo"],
    movilidad: ["Paso", "Estela", "Danza", "Salto", "Deriva", "Cruce", "Fuga"],
    apoyo: ["Canto", "Pacto", "Bendición", "Latido", "Vínculo", "Aliento"],
    definitiva: ["Apoteosis", "Cataclismo", "Sinfonía Final", "Juicio", "Eclipse", "Génesis", "Ocaso"],
    pasiva: ["Resonancia", "Instinto", "Herencia", "Latencia", "Presagio"],
  };
  D.hab = {
    ofensiva: [
      { t: "ofensiva", d: "Condensa {forma} {est} y las encadena en una ráfaga que persigue al objetivo; cada impacto marca al enemigo y el siguiente golpe sobre esa marca hace más daño.", v: "Aparecen {forma} que giran alrededor del cuerpo antes de salir disparadas en espiral.", a: "Obliga al rival a moverse y le abre el flanco; castiga a quien no rompe la línea de visión.", l: "{limite}." },
      { t: "ofensiva", d: "Acumula {forma} en su arma {est} durante unos segundos y las descarga en un único impacto que atraviesa defensas ligeras; cuanto más espera, mayor el área.", v: "El arma brilla con {mat} y el aire se deforma antes del disparo.", a: "Ideal como remate tras una distracción; es arriesgada sin cobertura.", l: "Durante la carga queda casi inmóvil y expuesto." },
      { t: "ofensiva", d: "Lanza {forma} que rebotan en el terreno y los obstáculos, trazando ángulos imposibles hasta cerrar al objetivo en un círculo.", v: "Los proyectiles dejan líneas de {mat} que se cruzan formando una jaula.", a: "Muy buena en espacios cerrados y para cortar rutas de escape.", l: "Los proyectiles pueden herir a aliados si están en la trayectoria." },
      { t: "ofensiva", d: "Siembra {forma} que quedan activas y desgastan al enemigo poco a poco, aumentando de intensidad mientras se mueve.", v: "Pequeñas marcas de {mat} brillan en el suelo y en el cuerpo del rival.", a: "Fuerza peleas largas y castiga a quien huye.", l: "{limite}." },
      { t: "ofensiva", d: "Envuelve su arma en {mat} y encadena golpes cortos {est} que acumulan una carga; al tercer golpe libera una onda en cono.", v: "Cada golpe deja un destello de {mat} y el tercero expulsa una onda visible.", a: "Funciona en combate cercano para empujar a los rivales fuera de posición.", l: "Si el rival se aleja entre golpes, pierde la carga." },
      { t: "ofensiva", d: "Divide {forma} en dos grupos: uno ataca de frente y otro describe una curva por la espalda del objetivo, golpeando casi a la vez.", v: "Dos corrientes de {mat} se cruzan en el aire formando una pinza.", a: "Rompe guardias frontales y castiga a quienes confían en un solo escudo.", l: "Requiere ver al objetivo para fijar la pinza." },
    ],
    defensiva: [
      { t: "defensiva", d: "Eleva {defensa} que absorbe el siguiente golpe y devuelve parte de la fuerza del impacto en una onda de {mat} hacia el atacante.", v: "Surge {defensa} y, al recibir el golpe, estalla en un anillo.", a: "Convierte el ataque rival en una oportunidad de contraataque.", l: "Solo absorbe un golpe a la vez y tarda en reformarse." },
      { t: "defensiva", d: "Ante un ataque directo, desvía la fuerza con {defensa} y deja al enemigo sin equilibrio un instante; un desvío perfecto permite contraatacar de inmediato.", v: "{defensa} se curva alrededor del impacto y lo redirige hacia un lado.", a: "Recompensa la lectura del combate y castiga ataques predecibles.", l: "Necesita un buen tiempo de reacción; un desvío fallido lo deja expuesto." },
      { t: "defensiva", d: "Levanta {defensa} en torno a sí y a los aliados cercanos; mientras exista, cada golpe recibido carga la defensa para estallar al romperse.", v: "{defensa} brilla más a cada golpe hasta romperse en fragmentos.", a: "Protege posiciones y cambia el ritmo de la pelea.", l: "Si se rompe antes de tiempo, la explosión es débil." },
      { t: "defensiva", d: "Si recibe un golpe grave, {mat} reacciona por instinto y forma {defensa} automáticamente un instante, reduciendo el daño y empujando al rival.", v: "{defensa} aparece de golpe con un destello y desaparece casi enseguida.", a: "Es una red de seguridad contra emboscadas.", l: "Se activa una vez cada cierto tiempo y no distingue amigos de enemigos." },
      { t: "defensiva", d: "Crea {defensa} que no bloquea, sino que redirige los proyectiles enemigos hacia otra dirección.", v: "{defensa} actúa como un espejo curvo y los proyectiles giran sin chocar.", a: "Útil contra arqueros, magos y ataques a distancia.", l: "No sirve contra ataques cuerpo a cuerpo ni contra el área grande." },
    ],
    movilidad: [
      { t: "movilidad", d: "Se desplaza mediante {mov}, atravesando varios metros en un instante; puede cambiar de dirección una vez en el aire.", v: "Deja una estela de {mat} durante todo el trayecto.", a: "Permite flanquear, escapar o cerrar distancia con rapidez.", l: "El trayecto es predecible si el rival conoce la técnica." },
      { t: "movilidad", d: "Extiende {campo} sobre el terreno que cambia las reglas del combate: favorece sus ataques y complica los movimientos rivales.", v: "El suelo se transforma en {campo} en un radio considerable.", a: "Limita la libertad del rival y le da ventaja posicional.", l: "{limite}." },
      { t: "movilidad", d: "Planta marcas de {mat} en el terreno que detonan al ser pisadas, creando un campo de minas visible solo para él.", v: "Pequeños símbolos de {mat} brillan un instante antes de desaparecer.", a: "Controla rutas de acceso y protege posiciones.", l: "Solo puede mantener un número limitado de marcas." },
      { t: "movilidad", d: "Aprovecha {mov} para embestir a un enemigo y, si conecta, lo arrastra consigo hasta una nueva posición.", v: "Un destello de {mat} lo envuelve mientras recorre la distancia.", a: "Saca a los rivales de su zona y los separa del grupo.", l: "Si falla, queda expuesto al final del recorrido." },
      { t: "movilidad", d: "Convierte el terreno en {campo} durante unos segundos, dividiendo la zona de combate y obligando a los rivales a pelear separados.", v: "{campo} surge entre los combatientes como una frontera visible.", a: "Aísla enemigos y permite pelear uno contra uno.", l: "Los rivales ágiles pueden cruzarla con facilidad." },
    ],
    apoyo: [
      { t: "apoyo", d: "Canaliza {mat} {est} hacia un aliado, cerrando heridas superficiales y renovando su energía poco a poco; no es resurrección ni cura heridas mortales.", v: "Hilos de {mat} unen a quien lo lanza con el aliado.", a: "Mantiene al grupo en pie y gana tiempo en peleas largas.", l: "No cura heridas mortales ni sustituye una resurrección." },
      { t: "apoyo", d: "Teje {defensa} sobre un aliado para protegerlo y, cuando se rompe, libera una pulsación que revitaliza al grupo.", v: "Un patrón de {mat} cubre al aliado y estalla en luz.", a: "Protege al frente y recupera energía al grupo.", l: "El escudo cae rápido ante golpes muy fuertes." },
      { t: "apoyo", d: "Marca a un aliado con {mat}: sus ataques ganan alcance y su elemento se refuerza durante un tiempo; si el aliado cae, la marca se transfiere.", v: "Un símbolo de {mat} brilla sobre el aliado como un sello.", a: "Potencia al mejor atacante o al más expuesto.", l: "Solo puede marcar a un aliado a la vez." },
      { t: "apoyo", d: "Crea {campo} que acelera la recuperación de los aliados y debilita a los enemigos que lo cruzan.", v: "{campo} aparece con un resplandor suave y constante.", a: "Define el punto donde el grupo debe pelear.", l: "Es fijo: si el grupo se mueve, pierde efecto." },
    ],
    definitiva: [
      { t: "definitiva", d: "Concentra su poder y desata una versión devastadora de {forma} sobre un área amplia; tras el impacto, el terreno queda marcado con {mat} residual que sigue dañando.", v: "El cielo se tiñe de {mat} antes de que todo caiga.", a: "Rompe formaciones y decide enfrentamientos cuando el rival está agrupado.", l: "Consume casi toda su energía y lo deja vulnerable." },
      { t: "definitiva", d: "Entra en una forma ascendida: su cuerpo se cubre de {mat}, ganando velocidad, alcance y resistencia durante poco tiempo; sus otras habilidades se vuelven más intensas.", v: "Un aura de {mat} lo envuelve y cambia su silueta.", a: "Invierte el curso de una pelea si logra mantenerla.", l: "Al terminar, queda agotado y sin acceso a sus habilidades unos instantes." },
      { t: "definitiva", dual: true, d: "Fusiona {forma} con {forma2} en un único ataque que combina ambos elementos y busca el punto más débil del rival.", v: "Dos corrientes de poder se enrollan en espiral hasta formar una sola lanza.", a: "Perfora defensas especializadas en un solo elemento.", l: "Requiere varios segundos de concentración y deja agotado al usuario." },
      { t: "definitiva", d: "Tras recitar una breve invocación, abre {campo} del tamaño de una arena que dura poco; dentro, todas sus habilidades se potencian y los enemigos pierden precisión.", v: "El suelo cambia de color y todo el entorno cambia de aspecto.", a: "Fija el ritmo de la pelea en su favor.", l: "Si sale de la arena, pierde todos los beneficios." },
      { t: "definitiva", d: "Despierta {arma} en su forma verdadera; durante unos segundos cada ataque corta además por la vía de {mat}.", v: "El arma cambia de forma y se rodea de {mat} brillante.", a: "Es su carta final para pelear de igual a igual con rivales superiores.", l: "El arma cobra un precio en energía vital." },
      { t: "definitiva", d: "Acumula el daño recibido como energía de {mat} y lo libera en un contraataque total cuando está a punto de caer; solo funciona una vez por combate.", v: "Su cuerpo se llena de {mat} que luego estalla hacia todos los lados.", a: "Convierte una derrota casi segura en una oportunidad.", l: "Solo funciona una vez por combate y no distingue a los aliados cercanos." },
    ],
    pasiva: [
      { t: "pasiva", d: "Cada vez que recibe daño de otro elemento, absorbe una fracción como {mat} y la almacena para potenciar su siguiente ataque; el exceso se disipa dañándolo a él.", v: "Chispas de {mat} recorren su piel al recibir golpes.", a: "Aguanta golpes para devolver más fuerza.", l: "Si almacena demasiado, sufre daño propio." },
      { t: "pasiva", d: "Su cuerpo reacciona al peligro: percibe ataques inminentes como destellos de {mat} y reduce su tiempo de reacción.", v: "Destellos de {mat} se encienden en su visión antes del golpe.", a: "Reaccionar mejor ante emboscadas y ataques sorpresa.", l: "Demasiados estímulos a la vez lo abruman." },
      { t: "pasiva", d: "Los aliados que combaten cerca resuenan con {mat} y mejoran su coordinación; pero los enemigos lo detectan con más facilidad.", v: "Un halo suave de {mat} lo rodea.", a: "Mejora la sinergia del equipo y hace de él un objetivo prioritario.", l: "Su ubicación queda expuesta para los rivales sensibles al elemento." },
    ],
  };

  /* =============== SINERGIAS ENTRE ELEMENTOS (texto) =============== */
  D.sinergias = {
    "fuego+metal": "Fuego y Metal: uno forja y calienta armas que el otro moldea en pleno combate.",
    "electrico+metal": "Eléctrico y Metal: el metal conduce y amplifica las descargas.",
    "agua+rayo": "Agua y Rayo: el agua conduce los rayos y multiplica su alcance.",
    "hielo+agua": "Hielo y Agua: pueden alternar estados de la materia para controlar el terreno.",
    "luz+oscuridad": "Luz y Oscuridad: contrastes que se potencian al combinarse.",
    "tiempo+orden": "Tiempo y Orden: reglas y secuencias que se refuerzan mutuamente.",
    "caos+tiempo": "Caos y Tiempo: peligrosos juntos, pero pueden desestabilizarse mutuamente.",
    "fuego+aire": "Fuego y Aire: el aire alimenta las llamas y las extiende.",
    "tierra+naturaleza": "Tierra y Naturaleza: el suelo fértil acelera el crecimiento de sus creaciones.",
    "naturaleza+agua": "Naturaleza y Agua: la humedad fortalece raíces y brotes.",
    "oscuridad+caos": "Oscuridad y Caos: sombras que cambian de forma.",
    "luz+orden": "Luz y Orden: disciplina y brillo en una misma formación.",
    "belico+metal": "Bélico y Metal: ejércitos espectrales con armas de acero.",
    "rayo+aire": "Rayo y Aire: tormentas que cubren grandes áreas.",
    "sangre+oscuridad": "Sangre y Oscuridad: ritual y sombra, ideal para trampas.",
    "gravedad+metal": "Gravedad y Metal: proyectiles muy pesados.",
  };
  D.sinergiasRol = {
    "tanque+dps": "Un tanque protege la línea y deja que el atacante rinda sin presión.",
    "tanque+control": "El tanque da tiempo al controlador para preparar sus técnicas.",
    "soporte+dps": "El soporte potencia al atacante principal.",
    "control+dps": "El controlador debilita rivales para que el atacante los remate.",
    "sigilo+control": "El sigilo aprovecha los huecos que crea el controlador.",
    "soporte+tanque": "El soporte mantiene al tanque en pie mientras sostiene la línea.",
  };
})();
