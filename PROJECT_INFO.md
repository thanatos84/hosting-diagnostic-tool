# 📖 Thanatos Hosting Diagnostic Tool — Información del Proyecto

## Enlaces

| Plataforma | URL |
|------------|-----|
| 🚀 **Demo Surge.sh** | [thanatos84-hosting-diagnostic-tool.surge.sh](http://thanatos84-hosting-diagnostic-tool.surge.sh/) |
| ☁️ **Demo Cloudflare Pages** | [thanatos84-hosting-diagnostic-tool.pages.dev](http://thanatos84-hosting-diagnostic-tool.pages.dev/) |
| 📖 **Tutorial HTML (Surge.sh)** | [walkthrough.html](http://thanatos84-hosting-diagnostic-tool.surge.sh/walkthrough.html) |
| 📖 **Tutorial HTML (Cloudflare)** | [walkthrough.html](http://thanatos84-hosting-diagnostic-tool.pages.dev/walkthrough.html) |
| 📦 **Repositorio GitHub** | [github.com/thanatos84/hosting-diagnostic-tool](https://github.com/thanatos84/hosting-diagnostic-tool) |

---

## Resumen
Thanatos Hosting Diagnostic Tool es una herramienta web auto-contenida que diagnostica las capacidades reales de cualquier hosting. Sube los archivos, abre el HTML en tu navegador, selecciona los tests que quieres ejecutar, y obtén un reporte completo del servidor.

## Propósito
Muchos hostings ocultan o no publicitan todas sus características reales. Esta herramienta revela:
- Qué lenguajes de programación puede ejecutar realmente el servidor
- Qué servicios tiene habilitados (bases de datos, frameworks, CMS)
- Problemas de seguridad (archivos expuestos, headers faltantes)
- Capacidades ocultas (compresión, WebDAV, SSI, etc.)
- Límites reales (rate limiting, uploads, concurrencia)
- Rendimiento del servidor (latencia, throughput)

## Arquitectura del Proyecto

### Archivos Principales
```
web tester/
├── index.html              ← Página principal (dashboard + tests + UI)
├── .gitignore              ← Archivos ignorados por git
├── WALKTHROUGH.md          ← Guía paso a paso de uso
├── TODO.md                 ← Lista de tareas del proyecto
├── TOCHECK.md              ← Checklist de pruebas
├── PROJECT_INFO.md         ← Este archivo (info del proyecto)
├── README.md               ← Readme del proyecto
│
├── tests/                  ← Scripts de test por lenguaje
│   ├── js/
│   │   └── test.js         ← Test de JavaScript (se ejecuta en navegador)
│   ├── python/
│   │   ├── test.py         ← Test de Python CGI
│   │   └── test.cgi        ← Test CGI genérico
│   ├── php/
│   │   └── test.php        ← Test de PHP
│   ├── ruby/
│   │   └── test.rb         ← Test de Ruby CGI
│   ├── perl/
│   │   └── test.pl         ← Test de Perl CGI
│   ├── lua/
│   │   └── test.lua        ← Test de Lua CGI
│   ├── bash/
│   │   └── test.sh         ← Test de Bash/Shell CGI
│   ├── elixir/
│   │   └── test.exs        ← Test de Elixir (requiere Erlang)
│   ├── haskell/
│   │   └── Test.hs         ← Test de Haskell
│   ├── clojure/
│   │   └── test.clj        ← Test de Clojure
│   ├── fortran/
│   │   └── test.f90        ← Test de Fortran
│   ├── cobol/
│   │   └── test.cob        ← Test de COBOL
│   ├── worker/
│   │   └── worker.js       ← Web Worker para tests del navegador
│   └── sw/
│       └── sw.js           ← Service Worker (placeholder)
│
├── probes/                 ← Archivos de probe para tests de seguridad
│   ├── .htaccess           ← Config Apache para CGI
│   ├── test_upload.txt     ← Test de acceso a directorios
│   └── test.ssi            ← Test de Server-Side Includes
│
└── reports/                ← Directorio para reportes exportados (creado por el usuario)
```

### Categorías de Tests

#### 🌐 Categoría Madre: Servidor
| Subcategoría | Tests | Descripción |
|---|---|---|
| Información del Servidor | Hostname, Server headers, HTTP status | Identifica qué software ejecuta |
| SSL / HTTPS | HTTPS, mixed content | Verifica cifrado del sitio |
| Capacidades Avanzadas | Compresión, Range Requests, HTTP Methods, ETag, SSI | Funcionalidades HTTP avanzadas |

#### 💻 Categoría Madre: Lenguajes
| Lenguaje | Archivo de Test | Descripción |
|---|---|---|
| JavaScript | tests/js/test.js | Se ejecuta en el navegador (siempre funciona) |
| Python | tests/python/test.py | CGI - requiere Python en el servidor |
| PHP | tests/php/test.php | Requiere PHP en el servidor |
| Ruby | tests/ruby/test.rb | CGI - requiere Ruby en el servidor |
| Perl | tests/perl/test.pl | CGI - requiere Perl en el servidor |
| Lua | tests/lua/test.lua | CGI - requiere Lua en el servidor |
| Bash | tests/bash/test.sh | CGI - requiere Shell en el servidor |
| Elixir | tests/elixir/test.exs | Requiere Erlang/Elixir |
| Haskell | tests/haskell/Test.hs | Requiere Glasgow Haskell |
| Clojure | tests/clojure/test.clj | Requiere Clojure/JVM |
| Fortran | tests/fortran/test.f90 | Requiere gfortran |
| COBOL | tests/cobol/test.cob | Requiere GnuCOBOL |

#### 🔓 Categoría Madre: Seguridad
| Subcategoría | Tests | Descripción |
|---|---|---|
| Archivos Expuestos | .env, .git, config files, backups | Archivos que no deberían ser accesibles |
| Headers de Seguridad | CSP, HSTS, X-Frame-Options, CORS | Headers de protección |
| Penetración | Version detection, error pages, directory listing | Tests de seguridad profundos |

#### 📊 Categoría Madre: Rendimiento
| Subcategoría | Tests | Descripción |
|---|---|---|
| Timing | DNS, TCP, TTFB, DOM Ready, Full Load | Métricas de velocidad |
| Upload/Download | Upload POST/PUT, throughput | Velocidad de transferencia |
| Concurrencia | Rate limiting, parallel requests | Comportamiento bajo carga |

### Cómo Funciona (Mecanismo Técnico)

1. **JavaScript:** Se crea un `<script>` tag que carga `test.js`. Si el navegador lo ejecuta, se detecta.
2. **Lenguajes de servidor:** Se hace `fetch()` a archivos como `test.py`, `test.php`, etc.
   - Si el servidor ejecuta el script → devuelve JSON con la salida
   - Si el servidor NO ejecuta → devuelve el código fuente en bruto
   - Esto determina si el lenguaje está habilitado
3. **Archivos expuestos:** Se hace `fetch()` a rutas comunes (.env, .git/HEAD, etc.)
   - Si status 200 + contenido → archivo expuesto
   - Si status 403/404 → protegido
4. **Rate limiting:** Se envían 10 requests rápidas. Si alguna devuelve 429 → rate limiting activo
5. **Compresión:** Se envía `Accept-Encoding: gzip, br` y se verifica `Content-Encoding` en la respuesta
6. **HTTP Methods:** Se envía OPTIONS y se lee el header `Allow`

### APIs del Navegador Detectadas
- ES6+ Features (let/const, arrow functions, async/await, etc.)
- Web Workers
- Service Workers
- IndexedDB, LocalStorage, SessionStorage, Cache API
- WebGL, Canvas 2D
- Geolocation, Notifications, Battery
- IntersectionObserver, ResizeObserver, PerformanceObserver
- CSS Grid, Flexbox, Variables
- WebAssembly, BigInt, Proxy, Symbol

### Tecnologías Utilizadas
- **Frontend:** HTML5, CSS3 (variables, grid, flexbox), Vanilla JavaScript (ES6+)
- **Server-side tests:** Python 3, PHP, Ruby, Perl, Lua, Bash, Elixir, Haskell, Clojure, Fortran, COBOL
- **Sin dependencias:** No requiere npm, frameworks, ni构建 tools
- **Self-contained:** Todo en un solo HTML + archivos de test

### Compatibilidad
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Opera 67+
- Chrome Mobile (Android)
- Safari Mobile (iOS)

### Licencia
MIT License. Ver archivo `LICENSE` para más detalles.

### Autor
Thanatos — Creado con pasión por la tecnología.
