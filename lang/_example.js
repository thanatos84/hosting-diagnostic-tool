// ╔══════════════════════════════════════════════════════════════╗
// ║  THANATOS HOSTING DIAGNOSTIC — Language Template            ║
// ║                                                              ║
// ║  HOW TO USE THIS FILE:                                       ║
// ║  1. Copy to lang/XX.js (XX = your language code, e.g. fr)   ║
// ║  2. Change "XX" to your code (e.g. window.I18N["fr"])       ║
// ║  3. Translate the STRING VALUES only (right of the colon)   ║
// ║  4. Keep {placeholders}, <code> tags, and emoji icons       ║
// ║  5. Every key is REQUIRED — do NOT remove any                ║
// ║  6. Each comment shows: USAGE → where it appears             ║
// ║                         OUTPUT → what it looks like rendered ║
// ╚══════════════════════════════════════════════════════════════╝

window.I18N = window.I18N || {};
window.I18N["XX"] = {

  // ═══════════════════════════════════════════════════════════════
  // ═══ 1. METADATA (REQUIRED)                                ═══
  // ═══════════════════════════════════════════════════════════════

  // USAGE: Language selector modal — shown as option label
  // OUTPUT: "English", "Français", "Español"
  // FORMAT: Native language name (the language's name in ITSELF)
  _langName:'Language Name',

  // USAGE: Language selector modal — shown next to the name
  // OUTPUT: "🇬🇧", "🇫🇷", "🇪🇸"
  // FORMAT: Country flag emoji (use the most standard one)
  _langFlag:'🏳️',

  // ═══════════════════════════════════════════════════════════════
  // ═══ 2. BROWSER TAB TITLE                                 ═══
  // ═══════════════════════════════════════════════════════════════

  // USAGE: <title> tag in <head> — shown in browser tab
  // OUTPUT: "⚔️ Thanatos Hosting Diagnostic Tool"
  // NOTE: This appears in the browser tab and in window title
  t_title:'⚔️ Thanatos Hosting Diagnostic Tool',

  // ═══════════════════════════════════════════════════════════════
  // ═══ 3. LANGUAGE SELECTION MODAL                           ═══
  // ═══════════════════════════════════════════════════════════════

  // USAGE: Heading inside the language selection modal overlay
  // OUTPUT: "🌐️ Select Language"
  // LOCATION: id="i18nModalTitle"
  t_i18nModalTitle:'Select Language',

  // ═══════════════════════════════════════════════════════════════
  // ═══ 4. TEST SELECTION PANEL                               ═══
  // ═══════════════════════════════════════════════════════════════

  // USAGE: Main heading of the test selection panel
  // OUTPUT: "⚔️ Select Tests"
  // LOCATION: id="selTitle"
  t_selTitle:'⚔️ Select Tests',

  // USAGE: Subtitle / instruction text below the heading
  // OUTPUT: "Choose which diagnostics to run. Select by group or individually."
  // LOCATION: id="selSubtitle"
  t_subtitle:'Choose which diagnostics to run. Select by group or individually.',

  // QUICK-SELECT BUTTONS — each runs a function to toggle tests
  // LOCATION: class="sel-actions"

  // USAGE: Button text — selects ALL available tests
  // OUTPUT: "✅️ All"
  t_btnAll:'✅️ All',

  // USAGE: Button text — deselects ALL tests
  // OUTPUT: "⬜️ None"
  t_btnNone:'⬜️ None',

  // USAGE: Button text — selects only CRITICAL security tests
  // OUTPUT: "🔴️ Critical"
  // CATEGORIES: info, ssl, files, headers, pentest
  t_btnCritical:'🔴️ Critical',

  // USAGE: Button text — selects only SERVER tests
  // OUTPUT: "🌐️ Server Only"
  // CATEGORIES: servidor
  t_btnServer:'🌐️ Server Only',

  // USAGE: Button text — selects only LANGUAGE tests
  // OUTPUT: "💻️ Languages Only"
  // CATEGORIES: lenguajes
  t_btnLang:'💻️ Languages Only',

  // USAGE: Button text — selects only SECURITY tests
  // OUTPUT: "🛡️ Security Only"
  // CATEGORIES: seguridad
  t_btnSecurity:'🛡️ Security Only',

  // USAGE: Button text — selects only PERFORMANCE tests
  // OUTPUT: "⚡️ Performance Only"
  // CATEGORIES: rendimiento
  t_btnPerf:'⚡️ Performance Only',

  // USAGE: Button text — selects only BROWSER tests
  // OUTPUT: "🖥️ Browser Only"
  // CATEGORIES: navegador
  t_btnBrowser:'🖥️ Browser Only',

  // USAGE: Main action button — starts all selected tests
  // OUTPUT: "▶️ Run Tests"
  // LOCATION: id="btnRun"
  t_btnRun:'▶️ Run Tests',

  // ═══════════════════════════════════════════════════════════════
  // ═══ 5. PROGRESS BAR & STATS                              ═══
  // ═══════════════════════════════════════════════════════════════

  // USAGE: Progress text showing completed vs total tests
  // OUTPUT: "⏳️ 5 / 20"
  // VARIABLES: {done} = completed count, {total} = total count
  // LOCATION: id="progressText"
  t_progress:'⏳️ {done} / {total}',

  // USAGE: Label for the passed tests count
  // OUTPUT: "Passed  (next to number, e.g. '15 Passed')"
  // LOCATION: id="labelApproved"
  t_approved:'Passed',

  // USAGE: Label for the failed tests count
  // OUTPUT: "Failed  (next to number, e.g. '2 Failed')"
  // LOCATION: id="labelFailed"
  t_failed:'Failed',

  // USAGE: Label for the warnings count
  // OUTPUT: "Warnings  (next to number, e.g. '3 Warnings')"
  // LOCATION: id="labelWarnings"
  t_warnings:'Warnings',

  // STATUS BADGE — shown in header (top-right), changes state

  // USAGE: Shown when no tests are running (idle state)
  // OUTPUT: "⏸️ Ready"
  // LOCATION: id="globalBadge", class="badge-idle"
  t_badgeIdle:'⏸️ Ready',

  // USAGE: Shown while tests are executing
  // OUTPUT: "⏳️ Running..."
  // LOCATION: id="globalBadge", class="badge-testing"
  t_badgeTesting:'⏳️ Running...',

  // USAGE: Shown when all tests complete
  // OUTPUT: "✅️ Complete (12s)"
  // VARIABLES: {sec} = elapsed seconds
  // LOCATION: id="globalBadge", class="badge-done"
  t_badgeDone:'✅️ Complete ({sec}s)',

  // USAGE: Final progress message after all tests done
  // OUTPUT: "✅️ 20 tests completed"
  // VARIABLES: {done} = total completed count
  t_complete:'✅️ {done} tests completed',

  // USAGE: Button to re-run tests
  // OUTPUT: "🔄️ Re-run"
  // LOCATION: id="btnRerun"
  t_rerun:'🔄️ Re-run',

  // USAGE: Button to open export options
  // OUTPUT: "📥️ Export"
  // LOCATION: id="btnExport"
  t_export:'📥️ Export',

  // ═══════════════════════════════════════════════════════════════
  // ═══ 6. COMPARISON SECTION                                ═══
  // ═══════════════════════════════════════════════════════════════

  // USAGE: Section heading — the Compare panel title
  // OUTPUT: "🔍️ Compare with Another Hosting"
  // LOCATION: id="compareTitle"
  t_compare:'🔍️ Compare with Another Hosting',

  // USAGE: Description text explaining what to do
  // OUTPUT: "Paste the JSON report from another hosting to compare side by side."
  // LOCATION: id="compareDesc"
  t_comparePaste:'Paste the JSON report from another hosting to compare side by side.',

  // USAGE: Placeholder inside the JSON textarea
  // OUTPUT: "Paste the JSON from another hosting here..."
  // LOCATION: id="compareInput" (placeholder attribute)
  t_comparePlaceholder:'Paste the JSON from another hosting here...',

  // USAGE: Button to execute the comparison
  // OUTPUT: "📊️ Compare"
  // LOCATION: id="compareBtn"
  t_compareBtn:'📊️ Compare',

  // USAGE: Label for the local (current) hosting in comparison grid
  // OUTPUT: "Local"
  t_compareLocal:'Local',

  // USAGE: Label for the remote (pasted) hosting in comparison grid
  // OUTPUT: "Remote Hosting"
  t_compareRemote:'Remote Hosting',

  // USAGE: Summary text at the bottom of comparison results
  // OUTPUT: "3 difference(s) out of 20 compared results"
  // VARIABLES: {count} = differing items, {total} = total compared
  t_compareDiff:'{count} difference(s) out of {total} compared results',

  // ═══════════════════════════════════════════════════════════════
  // ═══ 7. EXPORT BUTTONS                                    ═══
  // ═══════════════════════════════════════════════════════════════

  // USAGE: Button — exports all results as JSON file
  // OUTPUT: "📥️ JSON"
  // LOCATION: id="exportJsonBtn"
  t_exportJson:'📥️ JSON',

  // USAGE: Button — exports all results as TXT file
  // OUTPUT: "📝️ TXT"
  // LOCATION: id="exportTxtBtn"
  t_exportTxt:'📝️ TXT',

  // USAGE: Button — copies JSON to clipboard
  // OUTPUT: "📋️ Copy JSON"
  // LOCATION: id="exportCopyBtn"
  t_exportCopy:'📋️ Copy JSON',

  // USAGE: Button — generates and downloads PDF via html2canvas + jsPDF
  // OUTPUT: "📄️ Export PDF"
  // LOCATION: id="exportPdfBtn"
  t_exportPdf:'📄️ Export PDF',

  // ═══════════════════════════════════════════════════════════════
  // ═══ 8. SERVER INFO BOX                                   ═══
  // ═══════════════════════════════════════════════════════════════

  // USAGE: Section heading in the Server Info box
  // OUTPUT: "🌐️ Server Information"
  // LOCATION: not set via setText, hardcoded in renderServerInfo()
  t_serverInfo:'🌐️ Server Information',

  // USAGE: Label for the hostname value in Server Info
  // OUTPUT: "Host" (followed by the actual hostname, e.g. "example.com")
  // LOCATION: .server-item .si-label
  t_serverHost:'Host',

  // USAGE: Label for the protocol value in Server Info
  // OUTPUT: "Protocol" (followed by "https:" or "http:")
  // LOCATION: .server-item .si-label
  t_serverProto:'Protocol',

  // ═══════════════════════════════════════════════════════════════
  // ═══ 9. CHARTS / DASHBOARD                                ═══
  // ═══════════════════════════════════════════════════════════════

  // USAGE: Section heading of the Charts / Dashboard section
  // OUTPUT: "📊️ Performance Dashboard"
  // LOCATION: id="chartTitle"
  t_chartsTitle:'📊️ Performance Dashboard',

  // USAGE: Sub-heading of the Results pie chart card
  // OUTPUT: "📈️ Results"
  // LOCATION: id="chartResultsTitle"
  t_chartsResults:'📈️ Results',

  // USAGE: Sub-heading of the Timing bar chart card
  // OUTPUT: "⏱️ Timing (ms)"
  // LOCATION: id="chartTimingTitle"
  t_chartsTiming:'⏱️ Timing (ms)',

  // USAGE: Label for "Info" results in the pie chart legend
  // OUTPUT: "Info: 3"
  // LOCATION: #chartLegend span
  t_info_label:'Info:',

  // USAGE: Center text inside the donut pie chart
  // OUTPUT: "Tests" (shown below the total number)
  // LOCATION: Canvas donut hole text
  t_tests_label:'Tests',

  // ═══════════════════════════════════════════════════════════════
  // ═══ 10. CATEGORY NAMES & DESCRIPTIONS                     ═══
  // ═══════════════════════════════════════════════════════════════

  // ───── 10-A. Parent categories (5 main groups) ─────
  // Each appears as a section header in the selection panel AND
  // as a parent separator in the results accordion section

  // USAGE: Category name — Server group heading
  // OUTPUT: "🌐️ Server"  (icon prepended in code)
  // LOCATION: parent-cat header (servidor)
  t_server:'Server',

  // USAGE: Category name — Languages group heading
  // OUTPUT: "💻️ Server Languages"
  // LOCATION: parent-cat header (lenguajes)
  t_languages:'Server Languages',

  // USAGE: Category name — Security group heading
  // OUTPUT: "🛡️ Security"
  // LOCATION: parent-cat header (seguridad)
  t_security:'Security',

  // USAGE: Category name — Performance group heading
  // OUTPUT: "⚡️ Performance"
  // LOCATION: parent-cat header (rendimiento)
  t_performance:'Performance',

  // USAGE: Category name — Browser & APIs group heading
  // OUTPUT: "🖥️ Browser & APIs"
  // LOCATION: parent-cat header (navegador)
  t_browser:'Browser & APIs',

  // USAGE: Category description — shown after the category name
  // OUTPUT: "— Identifies what software runs the hosting and its HTTP capabilities."
  t_serverDesc:'Identifies what software runs the hosting and its HTTP capabilities.',

  // USAGE: Category description — for Languages
  t_langDesc:'Checks which programming languages the server can execute.',

  // USAGE: Category description — for Security
  t_secDesc:'Detects exposed files, security headers, and vulnerabilities.',

  // USAGE: Category description — for Performance
  t_perfDesc:'Measures speed, latency, compression, and behavior under load.',

  // USAGE: Category description — for Browser
  t_browserDesc:'Browser capabilities and available client-side APIs.',

  // USAGE: Title above the language server tiles grid
  // OUTPUT: "💻️ Server Languages"
  // LOCATION: id="tileSectionTitle"
  t_langServer:'💻️ Server Languages',

  // ───── 10-B. Group names (accordion headers) ─────
  // Each is a test GROUP header in both:
  //   - Selection panel (as collapsible group label)
  //   - Results accordion (as collapsible section heading)
  // Format: Keep the icon as part of the value (e.g. "🌐️ Server Info")

  // USAGE: Group name — first group under Server
  // OUTPUT: "🌐️ Server Information"
  t_infoName:'Server Information',

  // USAGE: Group name — SSL/HTTPS
  // OUTPUT: "🔒️ SSL / HTTPS"
  t_sslName:'SSL / HTTPS',

  // USAGE: Group name — HTTP capabilities
  // OUTPUT: "⚙️ HTTP Capabilities"
  t_httpName:'HTTP Capabilities',

  // USAGE: Group name — CDN detection
  // OUTPUT: "🌍️ CDN Detection"
  t_cdnName:'CDN Detection',

  // USAGE: Group name — SSL certificate details
  // OUTPUT: "🔐️ SSL Certificate Details"
  t_sslAdvName:'SSL Certificate Details',

  // USAGE: Group name — Common languages
  // OUTPUT: "🟢️ Common Languages"
  t_langCommonName:'Common Languages',

  // USAGE: Group name — Intermediate languages
  // OUTPUT: "🟡️ Intermediate Languages"
  t_langMidName:'Intermediate Languages',

  // USAGE: Group name — Rare languages
  // OUTPUT: "🔴️ Rare Languages"
  t_langRareName:'Rare Languages',

  // USAGE: Group name — MIME types
  // OUTPUT: "📄️ MIME Types"
  t_langMimeName:'MIME Types',

  // USAGE: Group name — Exposed files
  // OUTPUT: "🔓️ Exposed Files"
  t_filesName:'Exposed Files',

  // USAGE: Group name — Security headers
  // OUTPUT: "🛡️ Security Headers"
  t_headersName:'Security Headers',

  // USAGE: Group name — Advanced penetration testing
  // OUTPUT: "💀️ Advanced Penetration"
  t_pentestName:'Advanced Penetration',

  // USAGE: Group name — WAF detection
  // OUTPUT: "🛡️ WAF Detection"
  t_wafName:'WAF Detection',

  // USAGE: Group name — DDoS protection
  // OUTPUT: "💥️ DDoS Protection"
  t_ddosName:'DDoS Protection',

  // USAGE: Group name — Navigation timing
  // OUTPUT: "📊️ Navigation Timing"
  t_timingName:'Navigation Timing',

  // USAGE: Group name — Server speed tests
  // OUTPUT: "🏎️ Server Speed"
  t_speedName:'Server Speed',

  // USAGE: Group name — JavaScript features
  // OUTPUT: "🔧️ JavaScript Features"
  t_jsfeatName:'JavaScript Features',

  // USAGE: Group name — Web APIs
  // OUTPUT: "📡️ Web APIs"
  t_webapisName:'Web APIs',

  // USAGE: Group name — DOM & Observers
  // OUTPUT: "👁️ DOM & Observers"
  t_domfeatName:'DOM & Observers',

  // USAGE: Group name — CSS features
  // OUTPUT: "🎨️ CSS Features"
  t_cssfeatName:'CSS Features',

  // USAGE: Group name — Storage capabilities
  // OUTPUT: "💾️ Storage"
  t_storageName:'Storage',

  // USAGE: Group name — Network & connectivity
  // OUTPUT: "📡️ Network & Connectivity"
  // NOTE: "Network" here refers to computer networking
  t_netName:'Network & Connectivity',

  // USAGE: Group name — Device info
  // OUTPUT: "📱️ Device"
  t_deviceName:'Device',

  // USAGE: Group name — DNS tests
  // OUTPUT: "📋️ DNS Tests"
  t_dnsName:'DNS Tests',

  // USAGE: Group name — Advanced WebSocket tests
  // OUTPUT: "🔌️ Advanced WebSocket"
  t_wsAdvName:'Advanced WebSocket',

  // USAGE: Group name — IPv6 detection
  // OUTPUT: "📶️ IPv6"
  t_ipv6Name:'IPv6',

  // ───── 10-C. Group descriptions ─────
  // Shown below the group name in the selection panel and accordion

  t_infoDesc:'Hostname, software, HTTP headers.',
  t_sslDesc:'HTTPS encryption, certificates and mixed content.',
  t_httpDesc:'Compression, Range Requests, methods, cache, ETag, SSI.',
  t_cdnDesc:'Cloudflare, Fastly, Akamai, CloudFront and other CDNs.',
  t_sslAdvDesc:'SSL/TLS certificate details.',
  t_langCommonDesc:'JS, Python, PHP, Ruby, Perl.',
  t_langMidDesc:'TypeScript, Java, Go, Rust, Swift, C/C++, Lua, Bash.',
  t_langRareDesc:'Elixir, Haskell, Clojure, Fortran, COBOL.',
  t_langMimeDesc:'Content type handling.',
  t_filesDesc:'Config, backups, logs, accessible admin panels.',
  t_headersDesc:'CSP, CORS, HSTS, X-Frame-Options, etc.',
  t_pentestDesc:'Version detection, directory listing, informative errors.',
  t_wafDesc:'Web Application Firewall detection.',
  t_ddosDesc:'Anti-DDoS protection detection.',
  t_timingDesc:'DNS, TCP, TTFB, DOM Ready, Full Load.',
  t_speedDesc:'Latency, rate limiting, concurrency, upload.',
  t_jsfeatDesc:'ES6+, async/await, WebAssembly, Proxy, BigInt.',
  t_webapisDesc:'Geolocation, Notifications, Battery, Clipboard.',
  t_domfeatDesc:'IntersectionObserver, ResizeObserver, Drag & Drop.',
  t_cssfeatDesc:'Grid, Flexbox, CSS Variables.',
  t_storageDesc:'LocalStorage, IndexedDB, Cache API, Cookies.',
  t_netDesc:'Connection type, WebSocket.',
  t_deviceDesc:'Device info, screen, speech, gamepad.',
  t_dnsDesc:'Basic DNS configuration detection.',
  t_wsAdvDesc:'Binary frames, ping/pong, message size limits.',
  t_ipv6Desc:'IPv6 support detection.',

  // ═══════════════════════════════════════════════════════════════
  // ═══ 11. INDIVIDUAL TEST NAMES & DESCRIPTIONS              ═══
  // ═══════════════════════════════════════════════════════════════
  // Each test has TWO keys:
  //   t_xxxName   → Test name label (shown in selection & results)
  //   t_xxxDesc   → Short description (shown in selection & results)
  //
  // The icon prefix in the Name is OPTIONAL but recommended for visual
  // consistency. Keep the icon if present.
  //
  // FUNCTIONS CALLED: Each test has a corresponding async function
  // in app.js (e.g. testHostname, testHTTPS, etc.)

  // ─── SERVER INFO TESTS (fn: testHostname, testServerSoftware, testHttpStatus) ───

  // USAGE: Test name — displays server hostname
  // OUTPUT: "🏠️ Hostname"
  // FUNCTION: testHostname()
  t_hostnameName:'🏠️ Hostname',

  // USAGE: Test description
  // OUTPUT: "Server domain name and port."
  t_hostnameDesc:'Server domain name and port.',

  // USAGE: Test name — detects server software (Nginx, Apache, IIS, etc.)
  // OUTPUT: "🖥️ Software"
  // FUNCTION: testServerSoftware()
  // NOTE: t_serverDesc (category description) is reused as this test's desc
  t_serverName:'🖥️ Software',

  // USAGE: Test name — checks HTTP status code
  // OUTPUT: "📡️ HTTP Status"
  // FUNCTION: testHttpStatus()
  t_httpstatusName:'📡️ HTTP Status',

  // USAGE: Test description
  t_httpstatusDesc:'Server HTTP response code.',

  // ─── SSL / HTTPS TESTS (fn: testHTTPS, testMixedContent) ───

  // USAGE: Test name — verifies HTTPS encryption
  // OUTPUT: "🔒️ HTTPS"
  // FUNCTION: testHTTPS()
  t_httpsName:'🔒️ HTTPS',

  // USAGE: Test description
  t_httpsDesc:'Verifies if the connection is encrypted with HTTPS.',

  // USAGE: Test name — detects mixed HTTP content on HTTPS page
  // OUTPUT: "⚠️ Mixed Content"
  // FUNCTION: testMixedContent()
  t_mixedName:'⚠️ Mixed Content',

  // USAGE: Test description
  t_mixedDesc:'HTTP resources loaded on HTTPS page (security risk).',

  // ─── HTTP CAPABILITIES (fn: testCompression, testRangeRequests, etc.) ───

  // USAGE: Test name — compression (Brotli, Gzip, Deflate)
  // OUTPUT: "📦️ Compression"
  // FUNCTION: testCompression()
  t_compressName:'📦️ Compression',

  // USAGE: Test description
  t_compressDesc:'Brotli, Gzip or Deflate to reduce response size.',

  // USAGE: Test name — Range requests (partial content)
  // OUTPUT: "📏️ Range Requests"
  // FUNCTION: testRangeRequests()
  t_rangeName:'📏️ Range Requests',

  // USAGE: Test description
  t_rangeDesc:'Support for partial downloads (Range).',

  // USAGE: Test name — HTTP methods detection
  // OUTPUT: "🔧️ HTTP Methods"
  // FUNCTION: testHTTPMethods()
  t_methodsName:'🔧️ HTTP Methods',

  // USAGE: Test description
  t_methodsDesc:'GET, POST, PUT, DELETE, OPTIONS available.',

  // USAGE: Test name — compares HEAD vs GET response sizes
  // OUTPUT: "⚖️ HEAD vs GET"
  // FUNCTION: testHeadVsGet()
  t_headgetName:'⚖️ HEAD vs GET',

  // USAGE: Test description
  t_headgetDesc:'Compares HEAD and GET responses.',

  // USAGE: Test name — cache headers detection
  // OUTPUT: "🗄️ Cache"
  // FUNCTION: testCacheHeaders()
  t_cacheName:'🗄️ Cache',

  // USAGE: Test description
  t_cacheDesc:'Browser cache validation and storage.',

  // USAGE: Test name — ETag validation
  // OUTPUT: "🏷️ ETag"
  // FUNCTION: testETag()
  t_etagName:'🏷️ ETag',

  // USAGE: Test description
  t_etagDesc:'Cache validation with ETag/If-None-Match.',

  // USAGE: Test name — Server Side Includes
  // OUTPUT: "📜️ SSI"
  // FUNCTION: testSSI()
  t_ssiName:'📜️ SSI',

  // USAGE: Test description
  t_ssiDesc:'Server Side Includes processed.',

  // ─── CDN TESTS (fn: testCDN, testCDNCache) ───

  // USAGE: Test name — CDN cache status
  // OUTPUT: "🗂️ CDN Cache"
  // FUNCTION: testCDNCache()
  t_cdn_cacheName:'🗂️ CDN Cache',

  // USAGE: Test description
  t_cdn_cacheDesc:'CDN cache status (HIT/MISS).',

  // ─── SSL DETAILS (fn: testSSLDetails, testSSLValidity) ───

  // USAGE: Test name — SSL/TLS details
  // OUTPUT: "🔐️ SSL Details"
  // FUNCTION: testSSLDetails()
  t_ssl_detailsName:'🔐️ SSL Details',

  // USAGE: Test description
  t_ssl_detailsDesc:'TLS protocol, HSTS and secure connection details.',

  // USAGE: Test name — SSL certificate validity
  // OUTPUT: "📅️ SSL Validity"
  // FUNCTION: testSSLValidity()
  t_ssl_validName:'📅️ SSL Validity',

  // USAGE: Test description
  t_ssl_validDesc:'TLS handshake time and certificate status.',

  // ─── COMMON LANGUAGES (fn: testJS, testPython, testPHP, testRuby, testPerl) ───

  t_jsName:'🟢️ JavaScript',
  t_jsDesc:'Executes .js files on the client.',
  t_pythonName:'🟢️ Python',
  t_pythonDesc:'Executes Python scripts (CGI or mod_python).',
  t_phpName:'🟢️ PHP',
  t_phpDesc:'Executes PHP scripts on the server.',
  t_rubyName:'🟢️ Ruby',
  t_rubyDesc:'Executes Ruby scripts on the server.',
  t_perlName:'🟢️ Perl',
  t_perlDesc:'Executes Perl scripts (CGI or mod_perl).',

  // ─── INTERMEDIATE LANGUAGES (fn: testTypeScript, testJava, testGo, etc.) ───

  t_typescriptName:'🟡️ TypeScript',
  t_typescriptDesc:'TypeScript compilation on the server.',
  t_javaName:'🟡️ Java',
  t_javaDesc:'Executes Java (JSP, Servlets, CGI).',
  t_goName:'🟡️ Go',
  t_goDesc:'Executes Go binaries on the server.',
  t_rustName:'🟡️ Rust',
  t_rustDesc:'Executes Rust binaries on the server.',
  t_swiftName:'🟡️ Swift',
  t_swiftDesc:'Executes Swift on the server.',
  t_cName:'🟡️ C/C++',
  t_cDesc:'Executes C/C++ binaries on the server.',
  t_luaName:'🟡️ Lua',
  t_luaDesc:'Executes Lua scripts on the server.',
  t_bashName:'🟡️ Bash',
  t_bashDesc:'Executes Bash scripts on the server.',
  t_nodeName:'🟡️ Node.js',
  t_nodeDesc:'Node.js server detection.',

  // ─── RARE LANGUAGES (fn: testElixir, testHaskell, testClojure, etc.) ───

  t_elixirName:'🔴️ Elixir',
  t_elixirDesc:'Executes Elixir/Phoenix on the server.',
  t_haskellName:'🔴️ Haskell',
  t_haskellDesc:'Executes Haskell on the server.',
  t_clojureName:'🔴️ Clojure',
  t_clojureDesc:'Executes Clojure on the server.',
  t_fortranName:'🔴️ Fortran',
  t_fortranDesc:'Executes Fortran on the server.',
  t_cobolName:'🔴️ COBOL',
  t_cobolDesc:'Executes COBOL on the server.',

  // ─── MIME (fn: testMIME) ───

  t_mimeName:'📄️ MIME Types',
  t_mimeDesc:'Content type handling.',

  // ─── EXPOSED FILES (fn: testEnvFiles, testGitExposure, testConfigFiles, etc.) ───

  t_envName:'✅️ .env Files',
  t_envDesc:'Searches for exposed .env and .env.* files.',
  t_gitName:'✅️ .git',
  t_gitDesc:'Searches for exposed .git repositories.',
  t_configName:'✅️ Config Files',
  t_configDesc:'Searches for exposed configuration files.',
  t_backupsName:'✅️ Backups',
  t_backupsDesc:'Searches for exposed database and file backups.',
  t_logsName:'✅️ Logs',
  t_logsDesc:'Searches for exposed log files.',
  t_adminName:'✅️ Admin Panels',
  t_adminDesc:'Searches for accessible admin panels.',
  t_wordpressName:'🟣️ WordPress',
  t_wordpressDesc:'WordPress detection and exposed files.',
  t_laravelName:'🔴️ Laravel',
  t_laravelDesc:'Laravel detection and exposed logs.',

  // ─── SECURITY HEADERS (fn: testCSP, testSecurityHeaders, testCORS, etc.) ───

  t_cspName:'🛡️ CSP',
  t_cspDesc:'Content Security Policy in meta tag.',
  t_secheadersName:'📋️ Security Headers',
  t_secheadersDesc:'HTTP security headers (X-Frame-Options, etc.).',
  t_corsName:'🔓️ CORS',
  t_corsDesc:'Cross-Origin Resource Sharing.',
  t_hstsName:'🔒️ HSTS',
  t_hstsDesc:'HTTP Strict Transport Security.',
  t_htaccessName:'⚙️ .htaccess',
  t_htaccessDesc:'.htaccess file accessible or protected.',

  // ─── PENETRATION (fn: testDirListing, testErrorPages, testVersionDetection, etc.) ───

  t_dirlistName:'✅️ Directory Listing',
  t_dirlistDesc:'Directory listing detection.',
  t_errorinfoName:'✅️ Error Pages',
  t_errorinfoDesc:'Information detection in error pages.',
  t_versionName:'✅️ Version Detection',
  t_versionDesc:'Detection of versions exposed in headers.',
  t_mimetypeName:'📄️ MIME Sniffing',
  t_mimetypeDesc:'X-Content-Type-Options protection.',
  t_clickjackName:'🛡️ Clickjacking',
  t_clickjackDesc:'X-Frame-Options / frame-ancestors protection.',
  t_httpmethods_pName:'🔴️ HTTP Methods',
  t_httpmethods_pDesc:'Dangerous HTTP methods (PUT, DELETE, TRACE).',

  // ─── TIMING (fn: testNavigationTiming, testHTTP2, testResources, testMemory) ───

  t_http2Name:'🚀️ HTTP/2',
  t_http2Desc:'HTTP/2 or HTTP/3 support detection.',
  t_resourcesName:'📦️ Resources',
  t_resourcesDesc:'Number of loaded resources and total weight.',
  t_memoryName:'🧠️ Memory',
  t_memoryDesc:'JS memory usage and heap limit.',

  // ─── SPEED (fn: testLatency, testRateLimit, testConcurrency, etc.) ───

  t_latencyName:'⏱️ Latency',
  t_latencyDesc:'Server response time in ms.',
  t_ratelimitName:'🚦️ Rate Limiting',
  t_ratelimitDesc:'Request limit detection (429).',
  t_concurrencyName:'⚡️ Concurrency',
  t_concurrencyDesc:'Performance with 10 simultaneous requests.',
  t_uploadName:'📤️ Upload POST',
  t_uploadDesc:'File upload capability via POST.',
  t_putName:'📤️ Upload PUT',
  t_putDesc:'File upload capability via PUT.',
  t_bigpostName:'📦️ POST 100KB',
  t_bigpostDesc:'Handling of large POST requests.',
  t_uploaddirName:'📁️ Dir Upload',
  t_uploaddirDesc:'Access to probes/upload directory.',

  // ─── DNS (fn: testDNSHeaders) ───

  t_dns_headersName:'📋️ DNS Info',
  t_dns_headersDesc:'DNS information via CF-RAY or DNS-over-HTTPS.',

  // ─── JS FEATURES (fn: testES6, testArrow, testAsync, testPromise, etc.) ───

  t_es6Name:'ES6+',
  t_es6Desc:'Support for let/const and modern functions.',
  t_arrowName:'Arrow Functions',
  t_arrowDesc:'Support for arrow functions.',
  t_asyncName:'async/await',
  t_asyncDesc:'Support for async/await.',
  t_promiseName:'Promise',
  t_promiseDesc:'Support for native Promises.',
  t_wasmName:'WebAssembly',
  t_wasmDesc:'Support for WebAssembly.',
  t_bigintName:'BigInt',
  t_bigintDesc:'Support for large integers.',
  t_proxyName:'Proxy',
  t_proxyDesc:'Support for Proxy objects.',
  t_mapsetName:'Map/Set',
  t_mapsetDesc:'Support for native Map and Set.',
  t_workerName:'⚡️ Web Worker',
  t_workerDesc:'Background Worker execution.',
  t_esmName:'ES Modules',
  t_esmDesc:'Support for ES modules (import/export).',

  // ─── WEB APIs (fn: testWebGL, testGeolocation, testNotifications, etc.) ───

  t_webglName:'🎮️ WebGL',
  t_webglDesc:'WebGL graphics support and GPU info.',
  t_geoName:'📍️ Geolocation',
  t_geoDesc:'Geolocation API available.',
  t_notifName:'🔔️ Notifications',
  t_notifDesc:'Notifications API available.',
  t_clipboardName:'📋️ Clipboard',
  t_clipboardDesc:'Clipboard API available.',
  t_batteryName:'🔋️ Battery',
  t_batteryDesc:'Battery API available.',
  t_mediaName:'🎥️ Media Devices',
  t_mediaDesc:'Media devices API available.',
  t_canvasName:'🎨️ Canvas',
  t_canvasDesc:'Canvas 2D element support.',

  // ─── DOM & OBSERVERS (fn: testIntersectionObserver, testResizeObserver, etc.) ───

  t_intobsName:'👁️ IntersectionObserver',
  t_intobsDesc:'Intersection observer API.',
  t_resizeName:'📐️ ResizeObserver',
  t_resizeDesc:'Resize observer API.',
  t_perobsName:'📊️ PerformanceObserver',
  t_perobsDesc:'Performance observer API.',
  t_visibilityName:'👁️ Page Visibility',
  t_visibilityDesc:'Page visibility API.',
  t_dragdropName:'🖱️ Drag & Drop',
  t_dragdropDesc:'Drag and drop API.',
  t_fileapiName:'📁️ File API',
  t_fileapiDesc:'Browser file API.',
  t_shareName:'📤️ Web Share',
  t_shareDesc:'Browser share API.',

  // ─── CSS FEATURES (fn: testCSSGrid, testCSSFlexbox, testCSSVars) ───

  t_cssgridName:'🎨️ CSS Grid',
  t_cssgridDesc:'CSS Grid Layout support.',
  t_cssflexName:'🎨️ CSS Flexbox',
  t_cssflexDesc:'CSS Flexbox support.',
  t_cssvarName:'🎨️ CSS Variables',
  t_cssvarDesc:'CSS custom properties support.',

  // ─── STORAGE (fn: testLocalStorage, testSessionStorage, testIndexedDB, etc.) ───

  t_lsName:'💾️ LocalStorage',
  t_lsDesc:'Browser local storage.',
  t_ssName:'🔄️ SessionStorage',
  t_ssDesc:'Browser session storage.',
  t_idbName:'🗄️ IndexedDB',
  t_idbDesc:'Browser IndexedDB database.',
  t_cookiesName:'🍪️ Cookies',
  t_cookiesDesc:'Browser cookie support.',
  t_swName:'⚙️ Service Worker',
  t_swDesc:'Service Worker API available.',

  // ─── NETWORK (fn: testConnection, testWebSocket) ───

  // USAGE: Test name — connection detection (type, speed, RTT)
  // OUTPUT: "📶️ Connection"
  // FUNCTION: testConnection()
  t_connName:'📶️ Connection',

  // USAGE: Test description
  t_connDesc:'Connection type, speed and RTT.',

  // USAGE: Test name — WebSocket connectivity
  // OUTPUT: "🔌️ WebSocket"
  // FUNCTION: testWebSocket()
  t_wsName:'🔌️ WebSocket',

  // USAGE: Test description
  t_wsDesc:'WebSocket connection support.',

  // ─── WEBSOCKET ADVANCED (fn: testWSBinary, testWSMsgSize) ───

  t_ws_binName:'📦️ WS Binary',
  t_ws_binDesc:'Binary frame support in WebSocket.',
  t_ws_sizeName:'📏️ WS Msg Size',
  t_ws_sizeDesc:'Message size limit in WebSocket.',

  // ─── DEVICE (fn: testScreen, testSpeechSynth, testGamepad, testIPv6) ───

  t_screenName:'🖥️ Screen',
  t_screenDesc:'Resolution, viewport and DPR.',
  t_speechName:'🔊️ Speech',
  t_speechDesc:'Speech synthesis API.',
  t_gamepadName:'🎮️ Gamepad',
  t_gamepadDesc:'Gamepad API available.',

  // ═══════════════════════════════════════════════════════════════
  // ═══ 12. SHORT STATUS WORDS                               ═══
  // ═══════════════════════════════════════════════════════════════
  // These are short words used inside test result DETAIL strings.
  // They are often concatenated into larger messages.
  // Keep them concise — they appear inline in results.

  // USAGE: Test result — feature is available/working
  // OUTPUT: "Available." (e.g. "Geolocation API Available.")
  t_available:'Available.',

  // USAGE: Test result — feature not available
  // OUTPUT: "Not available."
  t_unavailable:'Not available.',

  // USAGE: Generic "Complete" text
  t_complete_word:'Complete',

  // USAGE: Shown inline — indicates active state
  // OUTPUT: "active" (e.g. "HTTPS active.")
  t_active:'active',

  // USAGE: Shown inline — indicates inactive state
  t_inactive:'inactive',

  // USAGE: Boolean "Yes"
  // OUTPUT: "Yes"
  t_yes:'Yes',

  // USAGE: Boolean "No"
  // OUTPUT: "No"
  t_no:'No',

  // USAGE: Unknown / not available abbreviation
  // OUTPUT: "N/A"
  t_unknown:'N/A',

  // USAGE: Feature restricted by browser policy
  // OUTPUT: "Restricted."
  t_restricted:'Restricted.',

  // USAGE: Feature works normally
  // OUTPUT: "Functional."
  t_functional:'Functional.',

  // USAGE: Feature cannot be tested
  // OUTPUT: "Not testable."
  t_not_testable:'Not testable.',

  // USAGE: Shorter form of t_range_supported_detail (legacy)
  t_range_supported:'Supported.',

  // USAGE: Shorter form of t_range_not_supported_detail (legacy)
  t_range_not_supported:'Not supported.',

  // USAGE: Generic error
  // OUTPUT: "Error."
  t_error:'Error.',

  // USAGE: Feature is supported
  // OUTPUT: "Supported."
  t_supported:'Supported.',

  // USAGE: Feature is not supported
  // OUTPUT: "Not supported."
  t_not_supported:'Not supported.',

  // USAGE: Content was processed (e.g. SSI)
  // OUTPUT: "processed."
  t_processed:'processed.',

  // USAGE: Content was NOT processed
  t_not_processed:'not processed.',

  // USAGE: Communication is encrypted
  // OUTPUT: "encrypted."
  t_encrypted:'encrypted.',

  // USAGE: Communication NOT encrypted
  t_not_encrypted:'not encrypted.',

  // USAGE: Insecure state
  // OUTPUT: "insecure"
  t_insecure:'insecure',

  // USAGE: Secure state
  t_secure:'secure',

  // USAGE: Something was detected
  // OUTPUT: "detected."
  t_detected:'detected.',

  // USAGE: Something was NOT detected
  t_not_detected:'not detected.',

  // USAGE: Feature is enabled
  // OUTPUT: "enabled."
  t_enabled:'enabled.',

  // USAGE: Feature is disabled
  // OUTPUT: "disabled."
  t_disabled:'disabled.',

  // USAGE: Feature does not work
  // OUTPUT: "Not functional."
  t_not_functional:'Not functional.',

  // USAGE: Cannot be verified
  // OUTPUT: "Not verifiable."
  t_not_verifiable:'Not verifiable.',

  // USAGE: Path is not accessible
  // OUTPUT: "Not accessible."
  t_not_accessible:'Not accessible.',

  // USAGE: Request was rejected
  // OUTPUT: "Rejected."
  t_rejected:'Rejected.',

  // USAGE: Directory is accessible/listed
  // OUTPUT: "Directory accessible."
  t_accessible_dir:'Directory accessible.',

  // USAGE: No ETag header found
  // OUTPUT: "No ETag."
  t_no_etag:'No ETag.',

  // USAGE: Could not detect server software
  // OUTPUT: "Software not detected"
  t_software_not_detected:'Software not detected',

  // USAGE: HTTPS is active
  // OUTPUT: "HTTPS active."
  t_https_active:'HTTPS active.',

  // USAGE: Traffic is encrypted
  // OUTPUT: "Traffic encrypted."
  t_traffic_encrypted:'Traffic encrypted.',

  // USAGE: No HTTPS detected
  // OUTPUT: "No HTTPS."
  t_https_inactive:'No HTTPS.',

  // USAGE: Traffic is not encrypted
  // OUTPUT: "Traffic not encrypted."
  t_traffic_unencrypted:'Traffic not encrypted.',

  // USAGE: No compression enabled
  // OUTPUT: "No compression."
  t_no_compression:'No compression.',

  // USAGE: Resource is protected/blocked
  // OUTPUT: "Protected"
  t_protected:'Protected',

  // USAGE: Resource is accessible
  // OUTPUT: "Accessible"
  t_accessible:'Accessible',

  // ═══════════════════════════════════════════════════════════════
  // ═══ 13. DETAIL / RESULT STRINGS                           ═══
  // ═══════════════════════════════════════════════════════════════
  // These are FULL SENTENCES shown as test result detail text.
  // They use {variable} placeholders — keep them intact.
  // HTML <code> tags format technical values — keep them.
  //
  // EXAMPLE: If t_cdn_detected_detail is "CDN detected: {cdns}."
  // and {cdns} is replaced with "<code>Cloudflare</code>",
  // the output would be: "CDN detected: <code>Cloudflare</code>."

  // ─── Compression ───
  // USAGE: Shown when compression is active
  // OUTPUT: 'Compression <code>Brotli</code> active.'
  // VARIABLES: {type} = "Brotli", "Gzip", or "Deflate"
  // FUNCTION: testCompression()
  t_compression_active:'Compression <code>{type}</code> active.',

  // ─── HTTPS ───
  // USAGE: Shown when HTTPS is active
  // OUTPUT: "HTTPS active. Traffic encrypted."
  // FUNCTION: testHTTPS()
  t_https_active_detail:'HTTPS active. Traffic encrypted.',

  // USAGE: Shown when no HTTPS
  // OUTPUT: "No HTTPS. Traffic not encrypted."
  t_https_inactive_detail:'No HTTPS. Traffic not encrypted.',

  // ─── Mixed Content ───
  // USAGE: Mixed resources count
  // OUTPUT: "3 HTTP insecure resources"
  // VARIABLES: {count} = number of insecure resources
  // FUNCTION: testMixedContent()
  t_mixed_resources:'{count} HTTP insecure resources',

  // USAGE: Shown as result name when mixed content found
  // OUTPUT: "⚠️ Mixed Content"
  t_mixed_content_name:'⚠️ Mixed Content',

  // USAGE: Shown as result name when all content is secure
  // OUTPUT: "✅️ Secure"
  t_mixed_secure_name:'✅️ Secure',

  // ─── HEAD vs GET ───
  // USAGE: Shown when HEAD and GET content-length differ
  // OUTPUT: "(Different!)"
  // FUNCTION: testHeadVsGet()
  t_different:'(Different!)',

  // ─── CDN ───
  // USAGE: CDN(s) detected
  // OUTPUT: "CDN detected: <code>Cloudflare</code>, <code>Fastly</code>."
  // VARIABLES: {cdns} = comma-separated <code> wrapped CDN names
  // FUNCTION: testCDN()
  t_cdn_detected_detail:'CDN detected: {cdns}.',

  // USAGE: No CDN detected
  // OUTPUT: "No CDN detected (or headers hidden)."
  t_no_cdn_detected_detail:'No CDN detected (or headers hidden).',

  // USAGE: Content cached by CDN
  // OUTPUT: "Content cached."
  t_content_cached:'Content cached.',

  // USAGE: Cache miss from CDN
  // OUTPUT: "Cache MISS."
  t_cache_miss:'Cache MISS.',

  // ─── SSL ───
  // USAGE: Secure connection
  // OUTPUT: "Secure connection with https:"
  // VARIABLES: {protocol} = "https:" or "http:"
  t_secure_conn_with:'Secure connection with {protocol}',

  // USAGE: Unencrypted connection
  // OUTPUT: "Unencrypted connection (http:)"
  t_unencrypted_conn:'Unencrypted connection ({protocol})',

  // USAGE: Performance API not available
  // OUTPUT: "Not available without Performance API."
  t_no_perf_api:'Not available without Performance API.',

  // USAGE: No secure connection
  // OUTPUT: "No secure connection detected."
  t_no_secure_conn:'No secure connection detected.',

  // USAGE: TLS handshake duration
  // OUTPUT: "TLS handshake: 45ms"
  // VARIABLES: {ms} = milliseconds
  t_tls_handshake:'TLS handshake: {ms}ms',

  // USAGE: Handshake resumed (0ms)
  // OUTPUT: "Handshake: 0ms (resumed)"
  t_handshake_resumed:'Handshake: 0ms (resumed)',

  // USAGE: Certificate is active
  // OUTPUT: "Certificate active with https:."
  t_cert_active:'Certificate active with {protocol}.',

  // NOTE: t_protocol_label is in section 14 (Hardcoded Label Keys)

  // ─── Languages ───
  // USAGE: test.js executed successfully
  // OUTPUT: "<code>test.js</code> executed. JS functional."
  t_js_executed_detail:'<code>test.js</code> executed. JS functional.',

  // USAGE: test.js failed to load
  t_js_not_loaded_detail:'<code>test.js</code> not loaded.',

  // USAGE: Language test executed
  // OUTPUT: "Python executed."
  // VARIABLES: {lang} = language name
  t_lang_executed:'{lang} executed.',

  // USAGE: Unexpected response from language test
  t_lang_unexpected:'Unexpected response.',

  // USAGE: Language NOT executed
  t_lang_not_executed:'{lang} not executed',

  // USAGE: File returned as raw text (not executed by server)
  // OUTPUT: "<code>test.py</code> returned raw. Python not enabled."
  t_lang_raw_returned:'<code>{path}</code> returned raw. {lang} not enabled.',

  // USAGE: Language test error
  // OUTPUT: "Error: Failed to fetch"
  t_lang_error_detail:'Error: {msg}',

  // USAGE: Node.js detection info text
  // OUTPUT: "Node.js server-side requires a Node server. ..."
  t_node_server_detail:'Node.js server-side requires a Node server. .js files run in the browser. To detect Node, look for <code>X-Powered-By: Express</code>.',

  // ─── Exposed Files ───
  // USAGE: No .env files found
  // OUTPUT: "No .env files exposed."
  t_no_env_exposed:'No .env files exposed.',

  // USAGE: Exposed file contains credentials
  // OUTPUT: "EXPOSED — Contains credentials."
  t_credential_exposed:'EXPOSED — Contains credentials.',

  // USAGE: Shorter warning word for credential exposure
  // OUTPUT: "EXPOSED" (shown as styled badge text)
  t_credential_exposed_word:'EXPOSED',

  // USAGE: Detailed message for credential exposure
  // OUTPUT: "Contains credentials."
  t_credential_exposed_detail:'Contains credentials.',

  // USAGE: No git repos exposed
  t_no_git_exposed:'No .git repositories exposed.',

  // USAGE: Git repo found
  // OUTPUT: "GIT REPOSITORY EXPOSED"
  t_git_repo_exposed:'GIT REPOSITORY EXPOSED',

  // USAGE: No config files exposed
  t_no_config_exposed:'No config files exposed.',

  // USAGE: Config file exposed badge
  t_config_exposed_word:'EXPOSED',

  // USAGE: Number of files exposed
  // OUTPUT: "3 file(s) exposed"
  t_n_files_exposed:'{count} file(s) exposed',

  // USAGE: No backups exposed
  t_no_backups_exposed:'No backups exposed.',

  // USAGE: Backup exposed badge
  t_backup_exposed_word:'BACKUP EXPOSED',

  // USAGE: Backup exposed with size
  // OUTPUT: "BACKUP EXPOSED (2048B)"
  t_backup_exposed_size:'BACKUP EXPOSED ({size}B)',

  // USAGE: Number of backups exposed
  // OUTPUT: "2 backup(s) exposed"
  t_n_backups_exposed:'{count} backup(s) exposed',

  // USAGE: No logs exposed
  t_no_logs_exposed:'No logs exposed.',

  // USAGE: Log exposed badge
  t_log_exposed:'LOG EXPOSED',

  // USAGE: Number of logs exposed
  t_n_logs_exposed:'{count} log(s) exposed',

  // USAGE: No admin panels found
  t_no_admin_accessible:'No admin panels accessible.',

  // USAGE: Admin panel detected
  // OUTPUT: "Detected. Status: <code>200</code>."
  t_admin_detected_detail:'Detected. Status: <code>{status}</code>.',

  // ─── CMS Detection ───

  t_wp_detected:'WordPress detected.',
  t_wp_not_detected:'WordPress not detected.',
  t_laravel_detected:'Laravel detected.',
  t_laravel_not_detected:'Laravel not detected.',
  t_laravel_log_exposed:'Log EXPOSED.',

  // ─── Security Headers ───

  t_csp_meta_detected:'CSP meta tag detected.',
  t_no_csp_meta:'No CSP. (May be in HTTP headers.)',

  // USAGE: Count of detected vs total headers
  // OUTPUT: "Detected: 4/6"
  t_detected_count:'Detected: {count}/{total}',

  // USAGE: List of missing headers
  // OUTPUT: "Missing: <code>X-Frame-Options</code>, <code>CSP</code>"
  t_missing_hdrs:'Missing: {headers}',

  t_no_cors_header:'No Access-Control-Allow-Origin.',
  t_no_hsts:'No HSTS.',

  // ─── Penetration ───

  t_dir_listing_active:'Directory listing active',
  t_no_dir_listing:'No directory listing detected.',

  // USAGE: Error page reveals server type
  // OUTPUT: "Error page reveals Apache."
  t_error_reveals_server:'Error page reveals {server}.',

  // OUTPUT: "Status: 404. No excess info."
  t_no_excess_info:'Status: {status}. No excess info.',

  // OUTPUT: "Version exposed: 7.4.33. Recommended to hide."
  t_version_exposed_rec:'Version exposed: {version}. Recommended to hide.',

  // OUTPUT: "Server: Apache/2.4.41. Version partially visible."
  t_version_partial:'Server: {server}. Version partially visible.',

  t_no_version_exposed:'No version exposed in headers.',

  // OUTPUT: "X-Content-Type-Options: nosniff. Protected."
  t_mime_protected:'X-Content-Type-Options: {value}. Protected.',

  t_vulnerable_mime:'No X-Content-Type-Options. Vulnerable to MIME sniffing.',

  // OUTPUT: "Protected. X-Frame-Options: DENY"
  t_clickjack_protected_detail:'Protected. {detail}',
  t_no_clickjack_protection:'No clickjacking protection.',
  t_frame_ancestors_csp:'frame-ancestors in CSP.',

  // USAGE: Dangerous HTTP method was accepted
  // OUTPUT: "Status: <code>200</code>. Method <code>PUT</code> accepted."
  t_method_accepted:'Status: <code>200</code>. Method <code>{method}</code> accepted.',

  // OUTPUT: "Status: <code>405</code>. Method not accepted."
  t_method_not_accepted:'Status: <code>{status}</code>. Method not accepted.',

  // USAGE: HTTP method was blocked (connection refused)
  // OUTPUT: "Blocked."
  t_method_blocked:'Blocked.',

  // ─── WAF ───
  t_waf_detected_detail:'WAF detected: {wafs}.',
  t_no_waf_detected_detail:'No WAF detected. Consider adding protection. (Headers hidden)',

  // USAGE: Generic WAF name
  // OUTPUT: "Generic WAF"
  t_waf_generic:'Generic WAF',

  // OUTPUT: "WAF (XSS blocked: 403)"
  t_xss_blocked:'WAF (XSS blocked: {status})',

  // ─── DDoS ───
  t_ddos_protection_detected:'Protection detected: {protections}.',
  t_no_ddos_visible:'No DDoS protection visible. Consider Cloudflare or similar.',
  t_rate_limiting_active:'Rate Limiting active',

  // ─── Latency ───
  // OUTPUT: "(Excellent)"  — shown when latency < 200ms
  t_latency_excellent:'(Excellent)',
  // OUTPUT: "(Good)"       — shown when latency 200-500ms
  t_latency_good:'(Good)',
  // OUTPUT: "(Normal)"     — shown when latency 500-1000ms
  t_latency_normal:'(Normal)',
  // OUTPUT: "(Slow)"       — shown when latency > 1000ms
  t_latency_slow:'(Slow)',

  t_rate_limiting_detected:'Rate limiting detected (429)',
  t_no_rate_limiting:'No rate limiting in 10 requests.',

  // ─── JS Features ───

  t_es6_supported_detail:'ES6 (let/const) supported.',
  t_arrow_fns_supported:'Arrow functions supported.',
  t_async_supported_detail:'async/await supported.',
  t_promise_supported_detail:'Promise supported.',
  t_mapset_supported:'Map/Set supported.',

  // USAGE: Web Worker executed successfully
  // OUTPUT: "Worker executed."
  t_worker_executed:'Worker executed.',

  // ─── WebSocket ───

  t_ws_binary_supported:'Binary frames supported.',
  t_ws_binary_not_verified:'Could not verify.',
  t_ws_msg_sent:'64KB message sent successfully.',
  t_ws_msg_timeout:'Timeout sending large message.',
  t_ws_msg_limitation:'Limitation: {reason}',

  // ─── IPv6 ───

  t_ipv6_detected:'IPv6 detected on device. Dual-stack support.',
  t_ipv6_not_detected:'IPv6 not detected on device. (May be disabled or IPv4 only)',

  // ─── Concurrency ───
  // USAGE: Shows concurrency test results
  // OUTPUT: "10 req in <code>450ms</code> (avg: <code>45ms</code>) · OK: <code>10/10</code>"
  // NOTE: Keep the · separator (middle dot) and HTML <code> tags
  t_concurrency_detail:'10 req in <code>{ms}ms</code> (avg: <code>{avg}ms</code>) · OK: <code>{ok}/10</code>',

  // ─── Server Detection ───

  t_nginx_detected:'Server: Nginx',
  t_apache_detected:'Server: Apache',
  t_iis_detected:'Server: Microsoft IIS',
  t_cf_proxy_detected:'Proxy: Cloudflare',

  // USAGE: Generic server detail with hostname
  // OUTPUT: "Server: <code>nginx/1.18.0</code>"
  t_server_detail:'Server: <code>{server}</code>',

  // ─── Utility ───

  // USAGE: Port number label (e.g. "Port: 8080")
  t_puerto:'Port',

  // USAGE: No compression algorithm found
  t_compression_none:'none',

  // USAGE: Count label for resources
  t_resources_label:'resources',

  // USAGE: Memory used label
  t_used:'Used',

  // USAGE: Memory limit label
  t_limit:'Limit',

  // USAGE: State label (e.g. "State: visible")
  t_state:'State',

  // USAGE: Default value for port
  // OUTPUT: "(default)"  — when port is the standard port
  t_default:'(default)',

  // ─── DNS ───

  t_dns_not_queryable:'Could not query DNS-over-HTTPS.',
  t_dns_not_available:'DNS info not available via CF-RAY or DoH. (May be local environment)',
  t_dnssec_validated:'DNSSEC: Validated',

  // ─── HTTP Protocol Details ───

  t_http2_detail:'Protocol: HTTP/2.',
  t_http3_detail:'Protocol: HTTP/3.',
  t_http_proto_detail:'Protocol: <code>{proto}</code>.',

  // ─── Range Requests ───

  t_range_supported_detail:'Supported. Status: <code>{status}</code>',
  t_range_not_supported_detail:'Not supported. Status: <code>{status}</code>',

  // ═══════════════════════════════════════════════════════════════
  // ═══ 14. HARDCODED LABEL KEYS (for test result details)    ═══
  // ═══════════════════════════════════════════════════════════════
  // These are used in test functions to label data values inline.
  // They are short labels followed by the actual value in <code>.
  // Include the colon in the value where the template expects it.
  //
  // PATTERN: Most are used as:   t('t_key') + ` <code>value</code>`
  // If the colon is in the key value, no extra colon is added.
  // If the colon follows in the template, omit it from the value.

  // USAGE: Test Hostname — label before the hostname value
  // OUTPUT: "Host: <code>example.com</code>"
  // TEMPLATE: t('t_host_label') + ` <code>${hostname}</code>`
  // The colon IS part of this value
  t_host_label:'Host:',

  // USAGE: Test Hostname — i18n alternative for "Protocol:" label
  // OUTPUT: "Protocol: <code>https:</code>"
  // NOTE: This key is used in testHostname() instead of hardcoded "Proto:"
  t_protocol_label:'Protocol:',

  // USAGE: Test Connection — label before connection type
  // OUTPUT: "Type: <code>4g</code>"
  // The colon IS part of this value
  t_type_label:'Type:',

  // USAGE: Test Connection — label before download speed
  // OUTPUT: "Down: <code>10Mbps</code>"
  // The colon follows separately in the template
  t_down_label:'Down',

  // USAGE: Test Connection — label before round-trip time
  // OUTPUT: "RTT: <code>45ms</code>"
  // The colon follows separately in the template
  t_rtt_label:'RTT',

  // USAGE: Test Device Info — label before User Agent string
  // OUTPUT: "UA: <code>Mozilla/5.0 ...</code>"
  // The colon IS part of this value
  t_ua_label:'UA:',

  // USAGE: Test Device Info — label before CPU core count
  // OUTPUT: "Cores: <code>8</code>"
  // The colon follows separately in the template
  t_cores_label:'Cores',

  // USAGE: Test Device Info — label before memory amount
  // OUTPUT: "Mem: <code>8GB</code>"
  // The colon follows separately in the template
  t_mem_label:'Mem',

  // USAGE: Test Device Info — label before cookies status
  // OUTPUT: "Cookies: <code>Yes</code>"
  // The colon IS part of this value
  t_cookies_label:'Cookies:',

  // USAGE: Test Screen — label before resolution
  // OUTPUT: "Res: <code>1920x1080</code>"
  // The colon IS part of this value
  t_res_label:'Res:',

  // USAGE: Test Screen — label before viewport size
  // OUTPUT: "Viewport: <code>1920x1040</code>"
  // The colon follows separately in the template
  t_viewport_label:'Viewport',

  // USAGE: Test Screen — label before device pixel ratio
  // OUTPUT: "DPR: <code>2</code>"
  // The colon follows separately in the template
  t_dpr_label:'DPR',

  // ═══════════════════════════════════════════════════════════════
  // ═══ 15. TOAST / NOTIFICATION MESSAGES                     ═══
  // ═══════════════════════════════════════════════════════════════
  // These appear as floating toast notifications in the bottom-right.
  // Keep them short and informative.

  // USAGE: Shown when user clicks Run without selecting any test
  // OUTPUT: "Select at least one test."
  t_toastNone:'Select at least one test.',

  t_toastJsonExported:'✅️ JSON exported',
  t_toastTxtExported:'✅️ TXT exported',

  // USAGE: Shown while PDF is being generated (may take a moment)
  // OUTPUT: "Generating PDF..."
  t_toastPdfGen:'Generating PDF...',

  t_toastPdfOk:'✅️ PDF exported',

  // USAGE: Error message, followed by error details
  // OUTPUT: "Error generating PDF: canvas error"
  // NOTE: Keep trailing space — the error message follows
  t_toastPdfErr:'Error generating PDF: ',

  t_toastCopied:'✅️ JSON copied to clipboard',

  // USAGE: Error message, followed by error details
  // NOTE: Keep trailing space
  t_toastCopyErr:'Error copying: ',

  // USAGE: User clicked Compare without pasting JSON
  // OUTPUT: "Paste the JSON from the other hosting."
  t_toastNoJson:'Paste the JSON from the other hosting.',

  // USAGE: Pasted content is not valid JSON
  // NOTE: Keep trailing space — the error message follows
  t_toastBadJson:'Invalid JSON: ',

  // ═══════════════════════════════════════════════════════════════
  // ═══ 16. FOOTER                                            ═══
  // ═══════════════════════════════════════════════════════════════

  // USAGE: Footer description — appears at the bottom of the page
  // OUTPUT: "Hosting Diagnostic Tool — Analyze and verify the real capabilities of any hosting."
  // LOCATION: id="footerDesc"
  t_footer:'Hosting Diagnostic Tool — Analyze and verify the real capabilities of any hosting.',

  // USAGE: Footer credit line — includes "v2.2" and GitHub link appended in code
  // OUTPUT: "Created with passion for technology. · v2.2 · <a>GitHub</a>"
  // LOCATION: id="footerBy" (innerHTML — can include HTML)
  t_footerBy:'Created with passion for technology.',

  // ═══════════════════════════════════════════════════════════════
  // ═══ 17. NETWORK ERROR FALLBACK                            ═══
  // ═══════════════════════════════════════════════════════════════

  // USAGE: Shown when a fetch request fails (network error)
  // OUTPUT: "Connection error (Failed to fetch)"
  // VARIABLES: {msg} = error message from the browser
  // NOTE: This is the LAST key and has NO trailing comma
  t_fetch_failed:'Connection error ({msg})'

};
