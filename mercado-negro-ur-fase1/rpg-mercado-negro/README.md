# Mercado Negro UR (Fase 1)

Página web estática inspirada en un RPG de buscador de talentos: generas candidatos de rango **Deidad UR** en un mercado negro, los negocias, los reclutas y llevas un equipo con guardado en el navegador y exportación a Excel.

No necesita servidor ni build: es HTML, CSS y JavaScript puro.

## Qué incluye la Fase 1

- **Mercado negro:** botones `MERCADO NEGRO` (5 candidatos nuevos) y `MÁS CANDIDATOS`, más una barra de comandos (`EXAMINAR`, `NEGOCIAR CON`, `RECLUTAR`, `COMPARAR x Y y`, `HABILIDADES DE`, `MALDICIÓN DE`, `EQUIPO`, `INVENTARIO`, `MAZMORRAS`, `ARMAS MUNDIALES`, `ESTADÍSTICAS`).
- **Generador de personajes:** 12 especies, 28 elementos (16 oficiales + 12 personalizados con reglas), 27 clases (8 personalizadas), 12 personalidades, 4 habilidades por personaje, una maldición (categorías I a IV), un arma mundial, poder en tres cifras y precio en Paradios.
- **Negociación:** cada candidato es dispuesto, exigente, reacio o se niega. Puedes ofertar entre 60 % y 350 % del precio; nada se paga sin tu confirmación.
- **Equipo:** tarjetas, ficha completa, filtros, orden, sinergias, progreso de maldición (oro para la categoría I, casillas para II, III y IV).
- **Generador de nombres** por especie y género, sin repeticiones.
- **Guardado** automático en el navegador (localStorage), exportar e importar JSON.
- **Excel:** copiar o descargar la tabla en formato TSV (37 columnas, una por dato; cada habilidad en su propia columna).

### Reglas que respeta

- Los candidatos tienen entre 14 y 18 años, nivel 1 a 10.
- Las maldiciones de categoría II usan objetos de mazmorra marcados como **SIN REGISTRAR** hasta que entregues tu lista de mazmorras (Fase 2). No se inventan ubicaciones.
- La categoría IV exige un resucitador de rango Deidad, nivel 80 o más, con resurrección real. Ningún candidato inicial lo cumple, así que esas maldiciones quedan bloqueadas.
- Moneda de reclutamiento: **Paradios**. Moneda para maldiciones de categoría I: **Oro**. Puedes editar ambos saldos en Ajustes.

## Estructura

```
rpg-mercado-negro/
├── index.html
├── css/style.css
├── js/
│   ├── util.js         funciones auxiliares (azar, formato, géneros)
│   ├── elementos.js    16 elementos oficiales + 12 personalizados
│   ├── datos.js        especies, clases, personalidades, maldiciones, armas, plantillas de habilidades
│   ├── nombres.js      generador de nombres
│   ├── generador.js    generador de candidatos, poder, precio, actitud
│   ├── tsv.js          exportación a Excel
│   └── app.js          interfaz, mercado, equipo, guardado
├── README.md
└── .gitignore
```

Para agregar contenido (nuevos elementos, clases, maldiciones, etc.) edita los archivos de `js/` que empiezan por `elementos.js` y `datos.js`; son listas de datos.

## Probar en tu computador

Abre `index.html` con doble clic. Si el navegador bloquea algo, usa un servidor local:

```bash
python3 -m http.server 8000
# y abre http://localhost:8000
```

## Subir a GitHub

### Opción A: desde la web (sin instalar nada)

1. En GitHub pulsa **New repository**. Nombre sugerido: `mercado-negro-ur`. Déjalo vacío (sin README) y pulsa **Create repository**.
2. En la página del repositorio elige **uploading an existing file**.
3. Descomprime el .zip y arrastra **el contenido** de la carpeta `rpg-mercado-negro` (index.html, css, js, README.md, .gitignore) a la ventana. Arrastrar carpetas conserva la estructura.
4. Abajo pulsa **Commit changes**.

### Opción B: desde la terminal

```bash
cd rpg-mercado-negro
git init
git add .
git commit -m "Fase 1: mercado negro UR"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/mercado-negro-ur.git
git push -u origin main
```

## Publicar en Cloudflare Pages

1. En el panel de Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**.
2. Autoriza GitHub y elige el repositorio.
3. Configuración de compilación:
   - Framework preset: **None**
   - Build command: *(vacío)*
   - Build output directory: `/`
4. Pulsa **Save and Deploy**. Cada `git push` publicará la nueva versión.

Alternativa sin GitHub: **Create → Pages → Upload assets** y arrastra la carpeta.

## Siguientes fases

- **Fase 2:** mazmorras pequeñas con tu lista de mazmorras y objetos, objetos por rareza, subida de nivel y rotura real de maldiciones de categoría I y II.
- **Fase 3:** raids, orfanatos y gremios para encontrar talentos; categorías III y IV.
- **Fase 4:** guardado en la nube (Cloudflare D1 o KV) y combates más tácticos.

> El guardado está en el navegador: si borras los datos del sitio, se pierde. Exporta un respaldo de vez en cuando.
