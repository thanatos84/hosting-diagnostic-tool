// ╔══════════════════════════════════════════════════════════╗
// ║  THANATOS HOSTING DIAGNOSTIC TOOL                     ║
// ║  Theme · i18n · Charts · New Tests                        ║
// ╚══════════════════════════════════════════════════════════╝
const DIAG={results:[],total:0,done:0,t0:Date.now()};
const SETTINGS={lang:'es',theme:'dark'};

// ═══ I18N ═══ — Translations loaded from lang/*.js files (window.I18N)

function t(key,vars){
  const lang=SETTINGS.lang||'es';
  const dict=(window.I18N&&window.I18N[lang])||(window.I18N&&window.I18N['es']);
  let str=dict?dict[key]:undefined;
  if(str===undefined){const fallback=window.I18N&&window.I18N['es']?window.I18N['es'][key]:undefined;if(fallback===undefined)return key;str=fallback;}
  if(vars)for(const k in vars)str=str.replace('{'+k+'}',vars[k]);
  return str;
}

function switchLang(lang){
  if(!window.I18N||!window.I18N[lang])return;
  SETTINGS.lang=lang;localStorage.setItem('thanatos_lang',lang);
  document.documentElement.lang=lang;
  document.title=t('t_title');
  const metaDesc=document.querySelector('meta[name=\"description\"]');
  if(metaDesc)metaDesc.content=t('t_footer');
  document.querySelectorAll('.i18n-option').forEach(o=>o.classList.toggle('active',o.dataset.lang===lang));
  // If this is the mandatory initial language selection, unlock the UI
  if(window._langLocked){
    window._langLocked=false;
    document.querySelector('.main').style.display='';
    document.querySelector('.header').style.display='';
    document.getElementById('i18nModal').classList.remove('show');
    document.getElementById('i18nBackdrop').classList.remove('show');
    updateAllTexts();buildSelection();
    return;
  }
  // Update header badge if visible
  updateAllTexts();reTranslateResults();
  if(document.getElementById('selPanel').style.display!=='none')rebuildUI();
  if(DIAG.done>=DIAG.total&&DIAG.total>0)rebuildUI();
  showToast((window.I18N[lang]&&window.I18N[lang]._langFlag||'')+' '+(window.I18N[lang]&&window.I18N[lang]._langName||lang.toUpperCase()),'info');
}

function updateAllTexts(){
  setText('selTitle',t('t_selTitle'));
  setText('selSubtitle',t('t_subtitle'));
  setText('btnAll',t('t_btnAll'));
  setText('btnNone',t('t_btnNone'));
  setText('btnCritical',t('t_btnCritical'));
  setText('btnServer',t('t_btnServer'));
  setText('btnLang',t('t_btnLang'));
  setText('btnSecurity',t('t_btnSecurity'));
  setText('btnPerf',t('t_btnPerf'));
  setText('btnBrowser',t('t_btnBrowser'));
  setText('btnRun',t('t_btnRun'));
  const badge=document.getElementById('globalBadge');
  if(badge){
    if(badge.classList.contains('badge-idle'))badge.textContent=t('t_badgeIdle');
    else if(badge.classList.contains('badge-testing'))badge.textContent=t('t_badgeTesting');
    else if(badge.classList.contains('badge-done'))badge.textContent=t('t_badgeDone',{sec:Math.round((Date.now()-DIAG.t0)/1000)});
  }
  setText('btnRerun',t('t_rerun'));
  setText('btnExport',t('t_export'));
  setText('labelApproved',t('t_approved'));
  setText('labelFailed',t('t_failed'));
  setText('labelWarnings',t('t_warnings'));
  setText('tileSectionTitle',t('t_langServer'));
  setText('compareTitle',t('t_compare'));
  setText('compareDesc',t('t_comparePaste'));
  const ci=document.getElementById('compareInput');if(ci)ci.placeholder=t('t_comparePlaceholder');
  setText('compareBtn',t('t_compareBtn'));
  setText('chartTitle',t('t_chartsTitle'));
  setText('chartResultsTitle',t('t_chartsResults'));
  setText('chartTimingTitle',t('t_chartsTiming'));
  setText('exportJsonBtn',t('t_exportJson'));
  setText('exportTxtBtn',t('t_exportTxt'));
  setText('exportCopyBtn',t('t_exportCopy'));
  setText('exportPdfBtn',t('t_exportPdf'));
  setText('footerDesc',t('t_footer'));
  const fb=document.getElementById('footerBy');if(fb)fb.innerHTML=t('t_footerBy')+' · <a href="https://github.com/thanatos84/hosting-diagnostic-tool" target="_blank" style="color:var(--accent3);text-decoration:none;border-bottom:1px dashed var(--accent3)">GitHub</a>';
  setText('i18nModalTitle','🌐️ '+t('t_i18nModalTitle'));
  const progressText=document.getElementById('progressText');
  if(progressText&&DIAG.total>0)progressText.textContent=t('t_progress',{done:DIAG.done,total:DIAG.total});
}
function setText(id,text){const el=document.getElementById(id);if(el&&text)el.textContent=text;}
function closeI18nModal(){
  if(window._langLocked)return; // Can't close during initial mandatory selection
  document.getElementById('i18nModal').classList.remove('show');
  document.getElementById('i18nBackdrop').classList.remove('show');
}

// ═══ AUTO-BUILD LANGUAGE SELECTOR ═══
function buildLangSelector(){
  const optsContainer=document.getElementById('i18nOptions');
  if(!optsContainer)return;
  const langs=window.I18N||{};
  let html='';
  for(const code of Object.keys(langs)){
    const meta=langs[code];
    const name=meta._langName||code.toUpperCase();
    const flag=meta._langFlag||'';
    html+=`<div class="i18n-option" data-lang="${code}" onclick="switchLang('${code}');closeI18nModal();"><span class="i18n-flag">${flag}</span> ${name}</div>`;
  }
  optsContainer.innerHTML=html;
}
// ═══ THEME ═══
function initTheme(){
  const saved=localStorage.getItem('thanatos_theme');
  if(saved){SETTINGS.theme=saved;}
  else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches){SETTINGS.theme='light';}
  applyTheme();
}
function toggleTheme(){
  SETTINGS.theme=SETTINGS.theme==='dark'?'light':'dark';
  localStorage.setItem('thanatos_theme',SETTINGS.theme);
  applyTheme();
}
function applyTheme(){
  document.documentElement.setAttribute('data-theme',SETTINGS.theme);
  const btn=document.getElementById('themeBtn');
  if(btn)btn.innerHTML=SETTINGS.theme==='dark'?'🌙️':'☀️';
  const metaTheme=document.querySelector('meta[name=\"theme-color\"]');
  if(metaTheme)metaTheme.content=SETTINGS.theme==='dark'?'#0b0f19':'#f0ede8';
}

// ═══ TOAST ═══
function showToast(msg,type='info'){
  let c=document.getElementById('toastContainer');
  if(!c){c=document.createElement('div');c.id='toastContainer';c.style.cssText='position:fixed;bottom:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:8px;pointer-events:none';document.body.appendChild(c);}
  const el=document.createElement('div');
  el.className='toast toast-'+type;
  el.textContent=msg;
  c.appendChild(el);
  setTimeout(()=>{el.style.opacity='0';setTimeout(()=>el.remove(),300);},3000);
}

// ═══ CATEGORIES ═══
function getParentCats(){return [
  {id:'servidor',icon:'🌐️',name:t('t_server'),desc:t('t_serverDesc')},
  {id:'lenguajes',icon:'💻️',name:t('t_languages'),desc:t('t_langDesc')},
  {id:'seguridad',icon:'🛡️',name:t('t_security'),desc:t('t_secDesc')},
  {id:'rendimiento',icon:'⚡️',name:t('t_performance'),desc:t('t_perfDesc')},
  {id:'navegador',icon:'🖥️',name:t('t_browser'),desc:t('t_browserDesc')},
];}

function getTestGroups(){return [
  {id:'info',parent:'servidor',icon:'🌐️',name:t('t_infoName'),desc:t('t_infoDesc'),tests:[
    {id:'t_hostname',name:t('t_hostnameName'),desc:t('t_hostnameDesc'),fn:'testHostname'},
    {id:'t_server',name:t('t_serverName'),desc:t('t_serverDesc'),fn:'testServerSoftware'},
    {id:'t_httpstatus',name:t('t_httpstatusName'),desc:t('t_httpstatusDesc'),fn:'testHttpStatus'}
  ]},
  {id:'ssl',parent:'servidor',icon:'🔒️',name:t('t_sslName'),desc:t('t_sslDesc'),tests:[
    {id:'t_https',name:t('t_httpsName'),desc:t('t_httpsDesc'),fn:'testHTTPS'},
    {id:'t_mixed',name:t('t_mixedName'),desc:t('t_mixedDesc'),fn:'testMixedContent'}
  ]},
  {id:'adv',parent:'servidor',icon:'⚙️',name:t('t_httpName'),desc:t('t_httpDesc'),tests:[
    {id:'t_compress',name:t('t_compressName'),desc:t('t_compressDesc'),fn:'testCompression'},
    {id:'t_range',name:t('t_rangeName'),desc:t('t_rangeDesc'),fn:'testRangeRequests'},
    {id:'t_methods',name:t('t_methodsName'),desc:t('t_methodsDesc'),fn:'testHTTPMethods'},
    {id:'t_headget',name:t('t_headgetName'),desc:t('t_headgetDesc'),fn:'testHeadVsGet'},
    {id:'t_cache',name:t('t_cacheName'),desc:t('t_cacheDesc'),fn:'testCacheHeaders'},
    {id:'t_etag',name:t('t_etagName'),desc:t('t_etagDesc'),fn:'testETag'},
    {id:'t_ssi',name:t('t_ssiName'),desc:t('t_ssiDesc'),fn:'testSSI'}
  ]},
  {id:'cdn',parent:'servidor',icon:'🌍️',name:t('t_cdnName'),desc:t('t_cdnDesc'),tests:[
    {id:'t_cdn',name:t('t_cdnName'),desc:t('t_cdnDesc'),fn:'testCDN'},
    {id:'t_cdn_cache',name:t('t_cdn_cacheName'),desc:t('t_cdn_cacheDesc'),fn:'testCDNCache'}
  ]},
  {id:'ssl_adv',parent:'servidor',icon:'🔐️',name:t('t_sslAdvName'),desc:t('t_sslAdvDesc'),tests:[
    {id:'t_ssl_details',name:t('t_ssl_detailsName'),desc:t('t_ssl_detailsDesc'),fn:'testSSLDetails'},
    {id:'t_ssl_valid',name:t('t_ssl_validName'),desc:t('t_ssl_validDesc'),fn:'testSSLValidity'}
  ]},
  {id:'lang_common',parent:'lenguajes',icon:'🟢️',name:t('t_langCommonName'),desc:t('t_langCommonDesc'),tests:[
    {id:'t_js',name:t('t_jsName'),desc:t('t_jsDesc'),fn:'testJS'},
    {id:'t_python',name:t('t_pythonName'),desc:t('t_pythonDesc'),fn:'testPython'},
    {id:'t_php',name:t('t_phpName'),desc:t('t_phpDesc'),fn:'testPHP'},
    {id:'t_ruby',name:t('t_rubyName'),desc:t('t_rubyDesc'),fn:'testRuby'},
    {id:'t_perl',name:t('t_perlName'),desc:t('t_perlDesc'),fn:'testPerl'}
  ]},
  {id:'lang_mid',parent:'lenguajes',icon:'🟡️',name:t('t_langMidName'),desc:t('t_langMidDesc'),tests:[
    {id:'t_typescript',name:t('t_typescriptName'),desc:t('t_typescriptDesc'),fn:'testTypeScript'},
    {id:'t_java',name:t('t_javaName'),desc:t('t_javaDesc'),fn:'testJava'},
    {id:'t_go',name:t('t_goName'),desc:t('t_goDesc'),fn:'testGo'},
    {id:'t_rust',name:t('t_rustName'),desc:t('t_rustDesc'),fn:'testRust'},
    {id:'t_swift',name:t('t_swiftName'),desc:t('t_swiftDesc'),fn:'testSwift'},
    {id:'t_c',name:t('t_cName'),desc:t('t_cDesc'),fn:'testC'},
    {id:'t_lua',name:t('t_luaName'),desc:t('t_luaDesc'),fn:'testLua'},
    {id:'t_bash',name:t('t_bashName'),desc:t('t_bashDesc'),fn:'testBash'},
    {id:'t_node',name:t('t_nodeName'),desc:t('t_nodeDesc'),fn:'testNodeServer'}
  ]},
  {id:'lang_rare',parent:'lenguajes',icon:'🔴️',name:t('t_langRareName'),desc:t('t_langRareDesc'),tests:[
    {id:'t_elixir',name:t('t_elixirName'),desc:t('t_elixirDesc'),fn:'testElixir'},
    {id:'t_haskell',name:t('t_haskellName'),desc:t('t_haskellDesc'),fn:'testHaskell'},
    {id:'t_clojure',name:t('t_clojureName'),desc:t('t_clojureDesc'),fn:'testClojure'},
    {id:'t_fortran',name:t('t_fortranName'),desc:t('t_fortranDesc'),fn:'testFortran'},
    {id:'t_cobol',name:t('t_cobolName'),desc:t('t_cobolDesc'),fn:'testCobol'}
  ]},
  {id:'lang_mime',parent:'lenguajes',icon:'📄️',name:t('t_langMimeName'),desc:t('t_langMimeDesc'),tests:[
    {id:'t_mime',name:t('t_mimeName'),desc:t('t_mimeDesc'),fn:'testMIME'}
  ]},
  {id:'files',parent:'seguridad',icon:'🔓️',name:t('t_filesName'),desc:t('t_filesDesc'),tests:[
    {id:'t_env',name:t('t_envName'),desc:t('t_envDesc'),fn:'testEnvFiles'},
    {id:'t_git',name:t('t_gitName'),desc:t('t_gitDesc'),fn:'testGitExposure'},
    {id:'t_config',name:t('t_configName'),desc:t('t_configDesc'),fn:'testConfigFiles'},
    {id:'t_backups',name:t('t_backupsName'),desc:t('t_backupsDesc'),fn:'testBackupFiles'},
    {id:'t_logs',name:t('t_logsName'),desc:t('t_logsDesc'),fn:'testLogsExposure'},
    {id:'t_admin',name:t('t_adminName'),desc:t('t_adminDesc'),fn:'testAdminPanels'},
    {id:'t_wordpress',name:t('t_wordpressName'),desc:t('t_wordpressDesc'),fn:'testWordPress'},
    {id:'t_laravel',name:t('t_laravelName'),desc:t('t_laravelDesc'),fn:'testLaravel'}
  ]},
  {id:'headers',parent:'seguridad',icon:'🛡️',name:t('t_headersName'),desc:t('t_headersDesc'),tests:[
    {id:'t_csp',name:t('t_cspName'),desc:t('t_cspDesc'),fn:'testCSP'},
    {id:'t_secheaders',name:t('t_secheadersName'),desc:t('t_secheadersDesc'),fn:'testSecurityHeaders'},
    {id:'t_cors',name:t('t_corsName'),desc:t('t_corsDesc'),fn:'testCORS'},
    {id:'t_hsts',name:t('t_hstsName'),desc:t('t_hstsDesc'),fn:'testHSTS'},
    {id:'t_htaccess',name:t('t_htaccessName'),desc:t('t_htaccessDesc'),fn:'testHtaccess'}
  ]},
  {id:'pentest',parent:'seguridad',icon:'💀️',name:t('t_pentestName'),desc:t('t_pentestDesc'),tests:[
    {id:'t_dirlist',name:t('t_dirlistName'),desc:t('t_dirlistDesc'),fn:'testDirListing'},
    {id:'t_errorinfo',name:t('t_errorinfoName'),desc:t('t_errorinfoDesc'),fn:'testErrorPages'},
    {id:'t_version',name:t('t_versionName'),desc:t('t_versionDesc'),fn:'testVersionDetection'},
    {id:'t_mimetype',name:t('t_mimetypeName'),desc:t('t_mimetypeDesc'),fn:'testMIMESniffing'},
    {id:'t_clickjack',name:t('t_clickjackName'),desc:t('t_clickjackDesc'),fn:'testClickjacking'},
    {id:'t_httpmethods_p',name:t('t_httpmethods_pName'),desc:t('t_httpmethods_pDesc'),fn:'testDangerousMethods'}
  ]},
  {id:'waf',parent:'seguridad',icon:'🛡️',name:t('t_wafName'),desc:t('t_wafDesc'),tests:[
    {id:'t_waf',name:t('t_wafName'),desc:t('t_wafDesc'),fn:'testWAF'}
  ]},
  {id:'ddos',parent:'seguridad',icon:'💥️',name:t('t_ddosName'),desc:t('t_ddosDesc'),tests:[
    {id:'t_ddos',name:t('t_ddosName'),desc:t('t_ddosDesc'),fn:'testDDoS'}
  ]},
  {id:'timing',parent:'rendimiento',icon:'📊️',name:t('t_timingName'),desc:t('t_timingDesc'),tests:[
    {id:'t_timing',name:t('t_timingName'),desc:t('t_timingDesc'),fn:'testNavigationTiming'},
    {id:'t_http2',name:t('t_http2Name'),desc:t('t_http2Desc'),fn:'testHTTP2'},
    {id:'t_resources',name:t('t_resourcesName'),desc:t('t_resourcesDesc'),fn:'testResources'},
    {id:'t_memory',name:t('t_memoryName'),desc:t('t_memoryDesc'),fn:'testMemory'}
  ]},
  {id:'speed',parent:'rendimiento',icon:'🏎️',name:t('t_speedName'),desc:t('t_speedDesc'),tests:[
    {id:'t_latency',name:t('t_latencyName'),desc:t('t_latencyDesc'),fn:'testLatency'},
    {id:'t_ratelimit',name:t('t_ratelimitName'),desc:t('t_ratelimitDesc'),fn:'testRateLimit'},
    {id:'t_concurrency',name:t('t_concurrencyName'),desc:t('t_concurrencyDesc'),fn:'testConcurrency'},
    {id:'t_upload',name:t('t_uploadName'),desc:t('t_uploadDesc'),fn:'testUploadPOST'},
    {id:'t_put',name:t('t_putName'),desc:t('t_putDesc'),fn:'testUploadPUT'},
    {id:'t_bigpost',name:t('t_bigpostName'),desc:t('t_bigpostDesc'),fn:'testBigPOST'},
    {id:'t_uploaddir',name:t('t_uploaddirName'),desc:t('t_uploaddirDesc'),fn:'testUploadDir'}
  ]},
  {id:'dns',parent:'rendimiento',icon:'📋️',name:t('t_dnsName'),desc:t('t_dnsDesc'),tests:[
    {id:'t_dns_headers',name:t('t_dns_headersName'),desc:t('t_dns_headersDesc'),fn:'testDNSHeaders'}
  ]},
  {id:'jsfeat',parent:'navegador',icon:'🔧️',name:t('t_jsfeatName'),desc:t('t_jsfeatDesc'),tests:[
    {id:'t_es6',name:t('t_es6Name'),desc:t('t_es6Desc'),fn:'testES6'},
    {id:'t_arrow',name:t('t_arrowName'),desc:t('t_arrowDesc'),fn:'testArrow'},
    {id:'t_async',name:t('t_asyncName'),desc:t('t_asyncDesc'),fn:'testAsync'},
    {id:'t_promise',name:t('t_promiseName'),desc:t('t_promiseDesc'),fn:'testPromise'},
    {id:'t_wasm',name:t('t_wasmName'),desc:t('t_wasmDesc'),fn:'testWasm'},
    {id:'t_bigint',name:t('t_bigintName'),desc:t('t_bigintDesc'),fn:'testBigInt'},
    {id:'t_proxy',name:t('t_proxyName'),desc:t('t_proxyDesc'),fn:'testProxy'},
    {id:'t_mapset',name:t('t_mapsetName'),desc:t('t_mapsetDesc'),fn:'testMapSet'},
    {id:'t_worker',name:t('t_workerName'),desc:t('t_workerDesc'),fn:'testWebWorker'},
    {id:'t_esm',name:t('t_esmName'),desc:t('t_esmDesc'),fn:'testESM'}
  ]},
  {id:'webapis',parent:'navegador',icon:'📡️',name:t('t_webapisName'),desc:t('t_webapisDesc'),tests:[
    {id:'t_webgl',name:t('t_webglName'),desc:t('t_webglDesc'),fn:'testWebGL'},
    {id:'t_geo',name:t('t_geoName'),desc:t('t_geoDesc'),fn:'testGeolocation'},
    {id:'t_notif',name:t('t_notifName'),desc:t('t_notifDesc'),fn:'testNotifications'},
    {id:'t_clipboard',name:t('t_clipboardName'),desc:t('t_clipboardDesc'),fn:'testClipboard'},
    {id:'t_battery',name:t('t_batteryName'),desc:t('t_batteryDesc'),fn:'testBattery'},
    {id:'t_media',name:t('t_mediaName'),desc:t('t_mediaDesc'),fn:'testMediaDevices'},
    {id:'t_canvas',name:t('t_canvasName'),desc:t('t_canvasDesc'),fn:'testCanvas'}
  ]},
  {id:'domfeat',parent:'navegador',icon:'👁️',name:t('t_domfeatName'),desc:t('t_domfeatDesc'),tests:[
    {id:'t_intobs',name:t('t_intobsName'),desc:t('t_intobsDesc'),fn:'testIntersectionObserver'},
    {id:'t_resize',name:t('t_resizeName'),desc:t('t_resizeDesc'),fn:'testResizeObserver'},
    {id:'t_perobs',name:t('t_perobsName'),desc:t('t_perobsDesc'),fn:'testPerfObserver'},
    {id:'t_visibility',name:t('t_visibilityName'),desc:t('t_visibilityDesc'),fn:'testPageVisibility'},
    {id:'t_dragdrop',name:t('t_dragdropName'),desc:t('t_dragdropDesc'),fn:'testDragDrop'},
    {id:'t_fileapi',name:t('t_fileapiName'),desc:t('t_fileapiDesc'),fn:'testFileAPI'},
    {id:'t_share',name:t('t_shareName'),desc:t('t_shareDesc'),fn:'testWebShare'}
  ]},
  {id:'cssfeat',parent:'navegador',icon:'🎨️',name:t('t_cssfeatName'),desc:t('t_cssfeatDesc'),tests:[
    {id:'t_cssgrid',name:t('t_cssgridName'),desc:t('t_cssgridDesc'),fn:'testCSSGrid'},
    {id:'t_cssflex',name:t('t_cssflexName'),desc:t('t_cssflexDesc'),fn:'testCSSFlexbox'},
    {id:'t_cssvar',name:t('t_cssvarName'),desc:t('t_cssvarDesc'),fn:'testCSSVars'}
  ]},
  {id:'storage',parent:'navegador',icon:'💾️',name:t('t_storageName'),desc:t('t_storageDesc'),tests:[
    {id:'t_ls',name:t('t_lsName'),desc:t('t_lsDesc'),fn:'testLocalStorage'},
    {id:'t_ss',name:t('t_ssName'),desc:t('t_ssDesc'),fn:'testSessionStorage'},
    {id:'t_idb',name:t('t_idbName'),desc:t('t_idbDesc'),fn:'testIndexedDB'},
    {id:'t_cache',name:t('t_cacheName'),desc:t('t_cacheDesc'),fn:'testCacheAPI'},
    {id:'t_cookies',name:t('t_cookiesName'),desc:t('t_cookiesDesc'),fn:'testCookies'},
    {id:'t_sw',name:t('t_swName'),desc:t('t_swDesc'),fn:'testServiceWorker'}
  ]},
  {id:'net',parent:'navegador',icon:'📡️',name:t('t_netName'),desc:t('t_netDesc'),tests:[
    {id:'t_conn',name:t('t_connName'),desc:t('t_connDesc'),fn:'testConnection'},
    {id:'t_ws',name:t('t_wsName'),desc:t('t_wsDesc'),fn:'testWebSocket'}
  ]},
  {id:'ws_adv',parent:'navegador',icon:'🔌️',name:t('t_wsAdvName'),desc:t('t_wsAdvDesc'),tests:[
    {id:'t_ws_bin',name:t('t_ws_binName'),desc:t('t_ws_binDesc'),fn:'testWSBinary'},
    {id:'t_ws_size',name:t('t_ws_sizeName'),desc:t('t_ws_sizeDesc'),fn:'testWSMsgSize'}
  ]},
  {id:'device',parent:'navegador',icon:'📱️',name:t('t_deviceName'),desc:t('t_deviceDesc'),tests:[
    {id:'t_device',name:t('t_deviceName'),desc:t('t_deviceDesc'),fn:'testDeviceInfo'},
    {id:'t_screen',name:t('t_screenName'),desc:t('t_screenDesc'),fn:'testScreen'},
    {id:'t_speech',name:t('t_speechName'),desc:t('t_speechDesc'),fn:'testSpeechSynth'},
    {id:'t_gamepad',name:t('t_gamepadName'),desc:t('t_gamepadDesc'),fn:'testGamepad'},
    {id:'t_ipv6',name:t('t_ipv6Name'),desc:t('t_ipv6Desc'),fn:'testIPv6'}
  ]},
];}

function getTileDefs(){return [
  {id:'js',lang:'JavaScript',icon:'🟨️'},{id:'py',lang:'Python',icon:'🐍️'},
  {id:'php',lang:'PHP',icon:'🐘️'},{id:'ruby',lang:'Ruby',icon:'💎️'},
  {id:'perl',lang:'Perl',icon:'🐪️'},{id:'lua',lang:'Lua',icon:'🌙️'},
  {id:'bash',lang:'Bash',icon:'🐚️'},{id:'ts',lang:'TypeScript',icon:'🔷️'},
  {id:'java',lang:'Java',icon:'☕️'},{id:'go',lang:'Go',icon:'🐹️'},
  {id:'rust',lang:'Rust',icon:'🦀️'},{id:'swift',lang:'Swift',icon:'🐦️'},
  {id:'c',lang:'C/C++',icon:'⚙️'},{id:'elixir',lang:'Elixir',icon:'💜️'},
  {id:'haskell',lang:'Haskell',icon:'🟤️'},{id:'clojure',lang:'Clojure',icon:'🔵️'},
  {id:'fortran',lang:'Fortran',icon:'📐️'},{id:'cobol',lang:'COBOL',icon:'🏢️'},
];}

// ═══ SECTIONS ═══
function buildSections(){
  const c=document.getElementById('resultsContainer');c.innerHTML='';
  const PC=getParentCats();
  const TG=getTestGroups();
  for(const p of PC){
    const grps=TG.filter(g=>g.parent===p.id);
    const d=document.createElement('div');d.id='parent-'+p.id;
    d.innerHTML=`<div style="margin:16px 0 6px;font-size:13px;font-weight:700;display:flex;align-items:center;gap:6px">${p.icon} ${p.name} <span style="font-size:10px;color:var(--dim);font-weight:400">— ${p.desc}</span></div>`;
    for(const g of grps){
      const a=document.createElement('div');a.className='accordion';a.id='acc-'+g.id;
      a.innerHTML=`<div class="accordion-head" onclick="toggleAcc('${g.id}')"><div><h3>${g.icon} ${g.name}</h3><div class="accordion-desc">${g.desc}</div></div><div class="accordion-badges" id="badges-${g.id}"></div><span class="accordion-arrow">▼️</span></div><div class="accordion-body"><div class="accordion-content" id="content-${g.id}"></div></div>`;
      d.appendChild(a);
    }
    c.appendChild(d);
  }
}
function toggleAcc(id){
  const el=document.getElementById('acc-'+id);el.classList.toggle('open');
  const b=el.querySelector('.accordion-body');
  if(el.classList.contains('open'))b.style.maxHeight=b.scrollHeight+'px';else b.style.maxHeight='0';
}

// ═══ SELECTION ═══
function buildSelection(){
  const c=document.getElementById('selContainer');c.innerHTML='';
  const PC=getParentCats();
  const TG=getTestGroups();
  for(const p of PC){
    const grps=TG.filter(g=>g.parent===p.id);
    const d=document.createElement('div');
    d.innerHTML=`<div style="margin:12px 0 4px;font-size:12px;font-weight:700;color:var(--muted)">${p.icon} ${p.name}</div>`;
    for(const g of grps){
      const gd=document.createElement('div');gd.className='sel-group';
      gd.innerHTML=`<div class="sel-group-head" onclick="this.parentElement.classList.toggle('open')"><input type="checkbox" checked id="grp-${g.id}" onchange="toggleGroup('${g.id}',this.checked)"><span class="sg-label">${g.icon} ${g.name}</span><span class="sg-desc">${g.desc}</span><span class="sg-count">${g.tests.length}</span></div><div class="sel-group-body">${g.tests.map(tt=>`<div class="sel-item"><input type="checkbox" checked id="chk-${tt.id}" data-group="${g.id}" data-fn="${tt.fn}"><label for="chk-${tt.id}"><b>${tt.name}</b> <span style="color:var(--dim);font-size:10px">— ${tt.desc}</span></label></div>`).join('')}</div>`;
      d.appendChild(gd);
    }
    c.appendChild(d);
  }
}
function selectAll(){document.querySelectorAll('.sel-item input[type=checkbox]').forEach(cc=>cc.checked=true);document.querySelectorAll('.sel-group input[type=checkbox]').forEach(cc=>cc.checked=true);}
function selectNone(){document.querySelectorAll('.sel-item input[type=checkbox]').forEach(cc=>cc.checked=false);document.querySelectorAll('.sel-group input[type=checkbox]').forEach(cc=>cc.checked=false);}
function selectGroup(type){
  selectNone();
  const TG=getTestGroups();
  for(const g of TG){
    let m=false;
    if(type==='critical')m=['info','ssl','files','headers','pentest'].includes(g.id);
    else if(type==='server')m=g.parent==='servidor';
    else if(type==='lang')m=g.parent==='lenguajes';
    else if(type==='security')m=g.parent==='seguridad';
    else if(type==='perf')m=g.parent==='rendimiento';
    else if(type==='browser')m=g.parent==='navegador';
    if(m){document.getElementById('grp-'+g.id).checked=true;toggleGroup(g.id,true);}
  }
}
function toggleGroup(id,ch){document.querySelectorAll(`[data-group="${id}"]`).forEach(cc=>cc.checked=ch);}
function getSelectedTests(){return Array.from(document.querySelectorAll('.sel-item input[type=checkbox]:checked')).map(cc=>cc.dataset.fn);}

// ═══ RESULTS ═══
function addResult(sec,name,status,detail,raw,testFn,i18nKey,i18nVars,i18nNameKey){const r={sec,name,status,detail,raw,fn:testFn||null,_i18n:i18nKey||i18nNameKey?{key:i18nKey||null,vars:i18nVars||null,nameKey:i18nNameKey||null}:null};DIAG.results.push(r);DIAG.done++;updateUI();}
function escHtml(s){if(!s)return'';return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function reTranslateResults(){for(const r of DIAG.results){if(r._i18n){if(r._i18n.key)r.detail=t(r._i18n.key,r._i18n.vars||undefined);if(r._i18n.nameKey)r.name=t(r._i18n.nameKey);}}}
function safeTrunc(s,n){if(!s)return'';const str=String(s);return str.length<=n?str:[...str].slice(0,n).join('');}
function updateUI(){
  const pct=DIAG.total>0?Math.round((DIAG.done/DIAG.total)*100):0;
  document.getElementById('progressFill').style.width=pct+'%';
  document.getElementById('progressText').textContent=t('t_progress',{done:DIAG.done,total:DIAG.total})+' ('+pct+'%)';
  const p=DIAG.results.filter(r=>r.status==='pass').length;
  const f=DIAG.results.filter(r=>r.status==='fail').length;
  const w=DIAG.results.filter(r=>r.status==='warn').length;
  document.getElementById('statP').textContent=p;
  document.getElementById('statF').textContent=f;
  document.getElementById('statW').textContent=w;
  updateTiles();updateAccordions();
  if(DIAG.done>=DIAG.total&&DIAG.total>0){
    const dur=Math.round((Date.now()-DIAG.t0)/1000);
    document.getElementById('globalBadge').className='badge badge-done';
    document.getElementById('globalBadge').textContent=t('t_badgeDone',{sec:dur});
    document.getElementById('progressText').textContent=t('t_complete',{done:DIAG.done});
    renderServerInfo();
    renderCharts();
    document.getElementById('compareSection').classList.add('show');
    document.getElementById('exportBar').classList.add('show');
    document.getElementById('btnRerun').style.display='';
    document.getElementById('btnExport').style.display='';
  }
}

// ═══ TILES ═══
function initTiles(){
  document.getElementById('tileSection').classList.add('show');
  document.getElementById('tileGrid').innerHTML=getTileDefs().map(tt=>`<div class="tile testing" id="tile-${tt.id}" onclick="this.classList.toggle('expanded')"><div class="tile-icon">${tt.icon}</div><div class="tile-name">${tt.lang}</div><div class="tile-status">⏳️</div><div class="tile-arrow">▼️</div><div class="tile-detail" id="td-${tt.id}"></div></div>`).join('');
}
function updateTiles(){
  const langMap={js:'JavaScript',py:'Python',php:'PHP',ruby:'Ruby',perl:'Perl',lua:'Lua',bash:'Bash',ts:'TypeScript',java:'Java',go:'Go',rust:'Rust',swift:'Swift',c:'C++',elixir:'Elixir',haskell:'Haskell',clojure:'Clojure',fortran:'Fortran',cobol:'COBOL'};
  const TILE_DEFS=getTileDefs();
  for(const td of TILE_DEFS){
    const el=document.getElementById('tile-'+td.id);if(!el)continue;
    const rel=DIAG.results.filter(r=>(r.fn&&r.fn.toLowerCase().includes(td.id))||(r.name&&r.name.toLowerCase().includes(langMap[td.id].toLowerCase())));
    const pass=rel.some(r=>r.status==='pass'),fail=rel.some(r=>r.status==='fail');
    el.className='tile '+(pass?'pass':fail?'fail':rel.length===0?'testing':'warn');
    el.querySelector('.tile-status').textContent=pass?'✅️':fail?'❌️':'⏳️';
    document.getElementById('td-'+td.id).innerHTML=rel.map(r=>{const i=r.status==='pass'?'✅️':r.status==='fail'?'❌️':'⚠️';return `<div>${i} ${escHtml(r.name.replace(/(?:🟢|🟡|🔴)️?/g,'').trim())}</div><div style="padding-left:14px;margin:2px 0 6px">${r.detail}</div>`;}).join('');
  }
}

// ═══ SERVER INFO ═══
function renderServerInfo(){
  const box=document.getElementById('serverBox');
  const srv=DIAG.results.find(r=>r.sec==='info'&&r.name&&r.name.includes('Servidor'));
  if(!srv)return;box.classList.add('show');
  let items=`<div class="server-item"><span class="si-label">${t('t_serverHost')}</span><span class="si-val">${location.hostname}</span></div>`;
  items+=`<div class="server-item"><span class="si-label">${t('t_serverProto')}</span><span class="si-val">${location.protocol}</span></div>`;
  if(srv.detail){const lines=srv.detail.split(' · ');for(const l of lines){const m=l.match(/^(.+?):\s*<code>(.+?)<\/code>$/);if(m)items+=`<div class="server-item"><span class="si-label">${escHtml(m[1])}</span><span class="si-val">${m[2]}</span></div>`;}}
  box.innerHTML=items;
}

// ═══ ACCORDIONS ═══
function updateAccordions(){
  const TG=getTestGroups();
  for(const grp of TG){
    const tests=DIAG.results.filter(r=>r.sec===grp.id);
    const pass=tests.filter(tt=>tt.status==='pass').length;
    const fail=tests.filter(tt=>tt.status==='fail').length;
    const warn=tests.filter(tt=>tt.status==='warn').length;
    const info=tests.filter(tt=>tt.status==='info').length;
    const badges=document.getElementById('badges-'+grp.id);
    if(badges){let bh='';if(pass)bh+=`<span class="abadge apass">${pass}✓️</span>`;if(fail)bh+=`<span class="abadge afail">${fail}✗️</span>`;if(warn)bh+=`<span class="abadge awarn">${warn}⚠️</span>`;if(info)bh+=`<span class="abadge ainfo">${info}ℹ️</span>`;badges.innerHTML=bh;}
    const content=document.getElementById('content-'+grp.id);
    if(content&&tests.length){
      content.innerHTML=tests.map(tt=>{
        const icon=tt.status==='pass'?'✅️':tt.status==='fail'?'❌️':tt.status==='warn'?'⚠️':'ℹ️';
        const tdef=grp.tests.find(x=>(tt.fn&&tt.fn===x.fn)||(tt.name&&tt.name.includes(x.name.replace(/(?:🟢|🟡|🔴)️?/g,'').trim())));
        const desc=tdef?tdef.desc:'';
        return `<div class="test-row"><span class="test-icon">${icon}</span><div class="test-info"><div class="test-name">${escHtml(tt.name.replace(/(?:🟢|🟡|🔴)️?/g,'').trim())}</div><div class="test-desc">${desc}</div><div class="test-result">${tt.detail}</div>${tt.raw?`<div class="test-raw">${escHtml(typeof tt.raw==='string'?safeTrunc(tt.raw,300):safeTrunc(JSON.stringify(tt.raw,null,2),300))}</div>`:''}</div></div>`;
      }).join('');
      const acc=document.getElementById('acc-'+grp.id);
      if(acc&&acc.classList.contains('open')){const body=acc.querySelector('.accordion-body');if(body)body.style.maxHeight=body.scrollHeight+'px';}
    }
  }
  // Hide parent categories that have no executed tests
  const PC=getParentCats();
  for(const p of PC){
    const parentDiv=document.getElementById('parent-'+p.id);
    if(!parentDiv)continue;
    const grps=TG.filter(g=>g.parent===p.id);
    const hasResults=grps.some(g=>DIAG.results.some(r=>r.sec===g.id));
    parentDiv.style.display=hasResults?'':'none';
  }
}

// ═══ CHARTS ═══
function renderCharts(){
  const sec=document.getElementById('chartSection');
  if(!sec)return;
  sec.classList.add('show');
  const p=DIAG.results.filter(r=>r.status==='pass').length;
  const f=DIAG.results.filter(r=>r.status==='fail').length;
  const w=DIAG.results.filter(r=>r.status==='warn').length;
  const i=DIAG.results.filter(r=>r.status==='info').length;
  renderPieChart('chartResults',p,f,w,i);
  document.getElementById('chartLegend').innerHTML=`<span><span class="dot" style="background:var(--green)"></span>${t('t_approved')}: ${p}</span><span><span class="dot" style="background:var(--red)"></span>${t('t_failed')}: ${f}</span><span><span class="dot" style="background:var(--orange)"></span>${t('t_warnings')}: ${w}</span><span><span class="dot" style="background:var(--accent)"></span>${t("t_info_label")}: ${i}</span>`;
  renderTimingChart('chartTiming');
}
function renderPieChart(canvasId,p,f,w,i){
  const canvas=document.getElementById(canvasId);if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const dpr=window.devicePixelRatio||1;
  const W=canvas.clientWidth,H=canvas.clientHeight;
  canvas.width=W*dpr;canvas.height=H*dpr;
  ctx.scale(dpr,dpr);
  const total=p+f+w+i||1;
  const cx=W/2,cy=H/2,cr=Math.min(cx,cy)-10;
  ctx.clearRect(0,0,W,H);
  const slices=[{v:p,c:'#22c55e'},{v:f,c:'#ef4444'},{v:w,c:'#f59e0b'},{v:i,c:'#3b82f6'}];
  let start=-Math.PI/2;
  for(const s of slices){
    if(s.v===0)continue;
    const angle=(s.v/total)*Math.PI*2;
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,cr,start,start+angle);ctx.closePath();
    ctx.fillStyle=s.c;ctx.fill();
    // percentage label
    const mid=start+angle/2;
    const lx=cx+Math.cos(mid)*cr*0.65;
    const ly=cy+Math.sin(mid)*cr*0.65;
    if(s.v/total>0.05){
      ctx.fillStyle='#fff';ctx.font='bold 11px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText(Math.round(s.v/total*100)+'%',lx,ly);
    }
    start+=angle;
  }
  // donut hole
  ctx.beginPath();ctx.arc(cx,cy,cr*0.45,0,Math.PI*2);
  ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--bg3').trim()||'#1a2235';
  ctx.fill();
  ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--text').trim()||'#e2e8f0';
  ctx.font='bold 14px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(total,cx,cy);
  ctx.font='9px system-ui';
  ctx.fillText(t('t_tests_label'),cx,cy+14);
}
function renderTimingChart(canvasId){
  const canvas=document.getElementById(canvasId);if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const dpr=window.devicePixelRatio||1;
  const W=canvas.clientWidth,H=canvas.clientHeight;
  canvas.width=W*dpr;canvas.height=H*dpr;
  ctx.scale(dpr,dpr);
  ctx.clearRect(0,0,W,H);
  let dns=0,tcp=0,ttfb=0,dl=0,dom=0,full=0;
  if(performance.getEntriesByType){
    const n=performance.getEntriesByType('navigation')[0];
    if(n){dns=Math.round(n.domainLookupEnd-n.domainLookupStart);tcp=Math.round(n.connectEnd-n.connectStart);ttfb=Math.round(n.responseStart-n.requestStart);dl=Math.round(n.responseEnd-n.responseStart);dom=Math.round(n.domContentLoadedEventEnd-n.startTime);full=Math.round(n.loadEventEnd-n.startTime);}
  }
  const bars=[{l:'DNS',v:dns,c:'#8b5cf6'},{l:'TCP',v:tcp,c:'#3b82f6'},{l:'TTFB',v:ttfb,c:'#06b6d4'},{l:'DL',v:dl,c:'#22c55e'},{l:'DOM',v:dom,c:'#f59e0b'},{l:'Full',v:full,c:'#ef4444'}];
  const max=Math.max(...bars.map(b=>b.v),1);
  const barW=Math.floor((W-80)/bars.length);
  const chartH=H-40;
  const textColor=getComputedStyle(document.documentElement).getPropertyValue('--muted').trim()||'#94a3b8';
  ctx.fillStyle=textColor;ctx.font='9px system-ui';ctx.textAlign='center';
  bars.forEach((b,i)=>{
    const x=40+i*barW;
    const h=Math.max((b.v/max)*chartH,2);
    const y=H-20-h;
    ctx.fillStyle=b.c;ctx.globalAlpha=0.85;
    ctx.fillRect(x+4,y,barW-8,h);
    ctx.globalAlpha=1;
    ctx.fillStyle=textColor;
    ctx.fillText(b.l,x+barW/2,H-4);
    ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--text').trim()||'#e2e8f0';
    ctx.fillText(b.v+'ms',x+barW/2,y-4);
  });
}

// ═══════════════════════════════════════════
// ═══ TEST FUNCTIONS ═══
// ═══════════════════════════════════════════

// --- SERVIDOR ---
async function testHostname(){addResult('info',t('t_hostnameName'),'info',t('t_host_label')+` <code>${location.hostname}</code> · `+t('t_protocol_label')+` <code>${location.protocol}</code> · `+t('t_puerto')+`: <code>${location.port||t('t_default')}</code>`,null,null,null,'t_hostnameName');}
async function testServerSoftware(){try{const r=await fetch(location.href,{method:'HEAD',cache:'no-store'});const s=r.headers.get('server')||'N/A',p=r.headers.get('x-powered-by')||'N/A',ct=r.headers.get('content-type')||'N/A',lm=r.headers.get('last-modified')||'N/A';addResult('info',t('t_serverName'),'info',`Server: <code>${escHtml(s)}</code> · X-Powered-By: <code>${escHtml(p)}</code> · Content-Type: <code>${escHtml(ct)}</code> · Last-Modified: <code>${escHtml(lm)}</code>`,null,null,null,'t_serverName');const sl=s.toLowerCase();if(sl.includes('nginx'))addResult('info','🟢️ Nginx','pass',t('t_nginx_detected'));else if(sl.includes('apache'))addResult('info','🟢️ Apache','pass',t('t_apache_detected'));else if(sl.includes('iis'))addResult('info','🟢️ IIS','pass',t('t_iis_detected'));else if(sl.includes('cloudflare'))addResult('info','🟢️ Cloudflare','pass',t('t_cf_proxy_detected'));else if(sl!=='n/a')addResult('info','ℹ️ Servidor',sl.includes('ghs')?'pass':'info',t('t_server_detail',{server:escHtml(s)}));else addResult('info','🔴️ Servidor','warn',t('t_software_not_detected'));}catch(e){addResult('info','🔴️ Headers','fail',t('t_fetch_failed',{msg:escHtml(e&&e.message||'')}),null,null,'t_fetch_failed',{msg:escHtml(e&&e.message||'')});}}
async function testHttpStatus(){try{const r=await fetch(location.href,{cache:'no-store'});addResult('info',t('t_httpstatusName'),'info',`Status: <code>${r.status} ${r.statusText}</code>`,null,null,null,'t_httpstatusName');}catch(e){addResult('info','📡️ HTTP Status','fail',t('t_fetch_failed',{msg:escHtml(e&&e.message||'')}),null,null,'t_fetch_failed',{msg:escHtml(e&&e.message||'')});}}
async function testHTTPS(){if(location.protocol==='https:')addResult('ssl',t('t_httpsName'),'pass',t('t_https_active_detail'),null,null,null,'t_httpsName');else addResult('ssl',t('t_httpsName'),'warn',t('t_https_inactive_detail'),null,null,null,'t_httpsName');}
async function testMixedContent(){const m=document.querySelectorAll('img[src^=\"http://\"],script[src^=\"http://\"],link[href^=\"http://\"]').length;addResult('ssl',m>0?t('t_mixed_content_name'):t('t_mixed_secure_name'),m>0?'warn':'pass',m>0?t('t_mixed_resources',{count:m}):t('t_secure'));}

// --- CAPACIDADES HTTP ---
async function testCompression(){try{const r=await fetch(location.href,{headers:{'Accept-Encoding':'gzip, deflate, br'},cache:'no-store'});const enc=(r.headers.get('content-encoding')||t('t_compression_none')).toLowerCase();if(enc.includes('br'))addResult('adv','📦️ Brotli','pass',t('t_compression_active',{type:'Brotli'}));else if(enc.includes('gzip'))addResult('adv','📦️ Gzip','pass',t('t_compression_active',{type:'Gzip'}));else if(enc.includes('deflate'))addResult('adv','📦️ Deflate','pass',t('t_compression_active',{type:'Deflate'}));else addResult('adv',t('t_compressName'),'warn',`Content-Encoding: <code>${escHtml(enc)}</code>. ` + t('t_no_compression'),null,null,null,'t_compressName');}catch(e){addResult('adv',t('t_compressName'),'fail',t('t_fetch_failed',{msg:escHtml(e&&e.message||'')}),null,null,'t_fetch_failed',{msg:escHtml(e&&e.message||'')});}}
async function testRangeRequests(){try{const r=await fetch(location.href,{headers:{'Range':'bytes=0-0'},cache:'no-store'});if(r.status===206||r.headers.get('content-range'))addResult('adv',t('t_rangeName'),'pass',t('t_range_supported_detail',{status:r.status}),null,null,null,'t_rangeName');else addResult('adv',t('t_rangeName'),'warn',t('t_range_not_supported_detail',{status:r.status}),null,null,null,'t_rangeName');}catch(e){addResult('adv',t('t_rangeName'),'fail',t('t_fetch_failed',{msg:escHtml(e&&e.message||'')}),null,null,'t_fetch_failed',{msg:escHtml(e&&e.message||'')});}}
async function testHTTPMethods(){try{const r=await fetch(location.href,{method:'OPTIONS',cache:'no-store'});const allow=r.headers.get('allow')||r.headers.get('access-control-allow-methods')||'N/A';addResult('adv',t('t_methodsName'),'info',`Allow: <code>${escHtml(allow)}</code>`,null,null,null,'t_methodsName');}catch(e){addResult('adv',t('t_methodsName'),'fail',t('t_fetch_failed',{msg:escHtml(e&&e.message||'')}),null,null,'t_fetch_failed',{msg:escHtml(e&&e.message||'')});}}
async function testHeadVsGet(){try{const[h,g]=await Promise.all([fetch(location.href,{method:'HEAD',cache:'no-store'}),fetch(location.href,{method:'GET',cache:'no-store'})]);const hl=parseInt(h.headers.get('content-length')||'0'),gl=parseInt(g.headers.get('content-length')||'0');addResult('adv',t('t_headgetName'),hl===gl?'pass':'warn',`HEAD: <code>${hl}B</code> · GET: <code>${gl}B</code>${hl!==gl?' '+t('t_different'):''}`);}catch(e){addResult('adv',t('t_headgetName'),'fail',t('t_fetch_failed',{msg:escHtml(e&&e.message||'')}),null,null,'t_fetch_failed',{msg:escHtml(e&&e.message||'')});}}
async function testCacheHeaders(){try{const r=await fetch(location.href+'?_nc='+Date.now(),{cache:'no-store'});const cc=r.headers.get('cache-control')||'N/A',pr=r.headers.get('pragma')||'N/A',ex=r.headers.get('expires')||'N/A';addResult('adv',t('t_cacheName'),cc!=='N/A'?'pass':'warn',`Cache-Control: <code>${escHtml(cc)}</code> · Pragma: <code>${escHtml(pr)}</code> · Expires: <code>${escHtml(ex)}</code>`);}catch(e){addResult('adv',t('t_cacheName'),'fail',t('t_fetch_failed',{msg:escHtml(e&&e.message||'')}),null,null,'t_fetch_failed',{msg:escHtml(e&&e.message||'')});}}
async function testETag(){try{const r1=await fetch(location.href,{cache:'no-store'});const etag=r1.headers.get('etag');if(etag){const r2=await fetch(location.href,{headers:{'If-None-Match':etag},cache:'no-store'});addResult('adv',t('t_etagName'),r2.status===304?'pass':'warn',`ETag: <code>${escHtml(etag)}</code> · 304: <code>${r2.status===304?t('t_yes'):t('t_no')}</code>`);}else addResult('adv',t('t_etagName'),'warn',t('t_no_etag'),null,null,null,'t_etagName');}catch(e){addResult('adv',t('t_etagName'),'fail',t('t_fetch_failed',{msg:escHtml(e&&e.message||'')}),null,null,'t_fetch_failed',{msg:escHtml(e&&e.message||'')});}}
async function testSSI(){try{const r=await fetch('probes/test.ssi?'+Date.now(),{cache:'no-store'});const tt=await r.text();if(tt.includes('DATE_LOCAL')||tt.includes('SERVER_SOFTWARE'))addResult('adv',t('t_ssiName'),'pass',t('t_processed'),null,null,null,'t_ssiName');else addResult('adv',t('t_ssiName'),'warn',t('t_not_processed'),null,null,null,'t_ssiName');}catch{addResult('adv',t('t_ssiName'),'warn',t('t_not_testable'),null,null,null,'t_ssiName');}}

// --- CDN DETECTION ---
async function testCDN(){
  try{
    const r=await fetch(location.href,{method:'HEAD',cache:'no-store'});
    const headers={'cf-ray':r.headers.get('cf-ray'),'cf-cache-status':r.headers.get('cf-cache-status'),'x-cache':r.headers.get('x-cache'),'x-amz-cf-id':r.headers.get('x-amz-cf-id'),'x-served-by':r.headers.get('x-served-by'),'x-timer':r.headers.get('x-timer'),'x-fastly-request-id':r.headers.get('x-fastly-request-id'),'x-akamai-request-id':r.headers.get('x-akamai-request-id'),'server-timing':r.headers.get('server-timing'),'via':r.headers.get('via')};
    const cdn=[];
    if(headers['cf-ray'])cdn.push('Cloudflare');
    if(headers['x-amz-cf-id'])cdn.push('AWS CloudFront');
    if(headers['x-fastly-request-id'])cdn.push('Fastly');
    if(headers['x-akamai-request-id'])cdn.push('Akamai');
    if(headers['x-cache']&&headers['x-cache'].toLowerCase().includes('hit'))cdn.push('Varnish/native');
    if(headers['server-timing']&&headers['server-timing'].includes('cdn'))cdn.push('CDN (Server-Timing)');
    if(headers['via']&&headers['via'].includes('varnish'))cdn.push('Varnish');
    if(cdn.length>0)addResult('cdn',t('t_cdnName'),'pass',t('t_cdn_detected_detail',{cdns:cdn.map(c=>`<code>${c}</code>`).join(', ')}),headers,null,null,null,'t_cdnName');
    else addResult('cdn',t('t_cdnName'),'warn',t('t_no_cdn_detected_detail'),headers,null,null,null,'t_cdnName');
  }catch(e){addResult('cdn',t('t_cdnName'),'fail',t('t_fetch_failed',{msg:escHtml(e&&e.message||'')}),null,null,'t_fetch_failed',{msg:escHtml(e&&e.message||'')});}
}
async function testCDNCache(){
  try{
    const r=await fetch(location.href,{method:'HEAD',cache:'no-store'});
    const cc=r.headers.get('cf-cache-status')||r.headers.get('x-cache')||'N/A';
    let status='info',detail=`Cache Status: <code>${escHtml(cc)}</code>`;
    if(cc.toUpperCase().includes('HIT')){status='pass';detail+='. '+t('t_content_cached');}
    else if(cc.toUpperCase().includes('MISS')){status='warn';detail+='. '+t('t_cache_miss');}
    addResult('cdn',t('t_cdn_cacheName'),status,detail);
  }catch(e){addResult('cdn',t('t_cdn_cacheName'),'fail',t('t_fetch_failed',{msg:escHtml(e&&e.message||'')}),null,null,'t_fetch_failed',{msg:escHtml(e&&e.message||'')});}
}

// --- SSL DETAILS ---
async function testSSLDetails(){
  try{
    let proto='N/A',tls='N/A';
    if(performance.getEntriesByType){
      const n=performance.getEntriesByType('navigation')[0];
      if(n){proto=n.nextHopProtocol||'N/A';tls=proto;}
    }
    const isTLS=location.protocol==='https:';
    if(isTLS){
      const r=await fetch(location.href,{method:'HEAD',cache:'no-store'});
      const sts=r.headers.get('strict-transport-security')||'N/A';
      addResult('ssl_adv',t('t_ssl_detailsName'),'pass',t('t_protocol_label')+` <code>${tls}</code> · HSTS: <code>${escHtml(sts)}</code> · `+t('t_secure_conn_with',{protocol:location.protocol}),null,null,null,'t_ssl_detailsName');
    }else{
      addResult('ssl_adv',t('t_ssl_detailsName'),'warn',t('t_protocol_label')+` <code>${tls}</code>. `+t('t_unencrypted_conn',{protocol:location.protocol}),null,null,null,'t_ssl_detailsName');
    }
  }catch(e){addResult('ssl_adv',t('t_ssl_detailsName'),'warn',t('t_fetch_failed',{msg:escHtml(e&&e.message||'')}),null,null,'t_fetch_failed',{msg:escHtml(e&&e.message||'')});}
}
async function testSSLValidity(){
  try{
    if(!performance.getEntriesByType)return addResult('ssl_adv',t('t_ssl_validName'),'info',t('t_no_perf_api'),null,null,null,'t_ssl_validName');
    const nav=performance.getEntriesByType('navigation')[0];
    if(!nav||!nav.secureConnectionStart||nav.secureConnectionStart===0)return addResult('ssl_adv',t('t_ssl_validName'),'info',t('t_no_secure_conn'),null,null,null,'t_ssl_validName');
    const handshakeTime=Math.round(nav.connectEnd-nav.secureConnectionStart);
    const info=handshakeTime>0?t('t_tls_handshake',{ms:handshakeTime}):t('t_handshake_resumed');
    addResult('ssl_adv',t('t_ssl_validName'),'pass',`${info}. `+t('t_cert_active',{protocol:location.protocol}),null,null,null,'t_ssl_validName');
  }catch(e){addResult('ssl_adv',t('t_ssl_validName'),'warn',t('t_fetch_failed',{msg:escHtml(e&&e.message||'')}),null,null,'t_fetch_failed',{msg:escHtml(e&&e.message||'')});}
}

// --- LENGUAJES ---
async function testJS(){await new Promise(rs=>{const s=document.createElement('script');s.src='tests/js/test.js?'+Date.now();s.onload=()=>{addResult('lang_common',t('t_jsName'),'pass',t('t_js_executed_detail'),null,null,null,'t_jsName');rs()};s.onerror=()=>{addResult('lang_common',t('t_jsName'),'fail',t('t_js_not_loaded_detail'),null,null,null,'t_jsName');rs()};document.head.appendChild(s)});}
async function testPython(){await testLangFile('tests/python/test.py','Python',['PYTHON_EXECUTED'],'lang_common');}
async function testPHP(){await testLangFile('tests/php/test.php','PHP',['PHP_EXECUTED'],'lang_common');}
async function testRuby(){await testLangFile('tests/ruby/test.rb','Ruby',['RUBY_EXECUTED'],'lang_common');}
async function testPerl(){await testLangFile('tests/perl/test.pl','Perl',['PERL_EXECUTED'],'lang_common');}
async function testTypeScript(){await testLangFile('tests/typescript/test.ts','TypeScript',['TS_EXECUTED'],'lang_mid');}
async function testJava(){await testLangFile('tests/java/test.java','Java',['JAVA_EXECUTED'],'lang_mid');}
async function testGo(){await testLangFile('tests/go/test.go','Go',['GO_EXECUTED'],'lang_mid');}
async function testRust(){await testLangFile('tests/rust/test.rs','Rust',['RUST_EXECUTED'],'lang_mid');}
async function testSwift(){await testLangFile('tests/swift/test.swift','Swift',['SWIFT_EXECUTED'],'lang_mid');}
async function testC(){await testLangFile('tests/c/test.c','C/C++',['C_EXECUTED'],'lang_mid');}
async function testLua(){await testLangFile('tests/lua/test.lua','Lua',['LUA_EXECUTED'],'lang_mid');}
async function testBash(){await testLangFile('tests/bash/test.sh','Bash',['BASH_EXECUTED'],'lang_mid');}
async function testElixir(){await testLangFile('tests/elixir/test.exs','Elixir',['ELIXIR_EXECUTED'],'lang_rare');}
async function testHaskell(){await testLangFile('tests/haskell/Test.hs','Haskell',['HASKELL_EXECUTED'],'lang_rare');}
async function testClojure(){await testLangFile('tests/clojure/test.clj','Clojure',['CLOJURE_EXECUTED'],'lang_rare');}
async function testFortran(){await testLangFile('tests/fortran/test.f90','Fortran',['FORTRAN_EXECUTED'],'lang_rare');}
async function testCobol(){await testLangFile('tests/cobol/test.cob','COBOL',['COBOL_EXECUTED'],'lang_rare');}
async function testNodeServer(){addResult('lang_mid',t('t_nodeName'),'info',t('t_node_server_detail'),null,null,null,'t_nodeName');}
async function testMIME(){try{const r=await fetch('tests/js/test.js?'+Date.now(),{cache:'no-store'});addResult('lang_mime',t('t_mimeName'),'info',`Content-Type: <code>${escHtml(r.headers.get('content-type')||'N/A')}</code>`,null,null,null,'t_mimeName');}catch{addResult('lang_mime',t('t_mimeName'),'warn',t('t_not_testable'),null,null,null,'t_mimeName');}}
async function testLangFile(path,lang,markers,section){try{const r=await fetch(path+'?'+Date.now(),{cache:'no-store'});const tt=await r.text();try{const j=JSON.parse(tt);if(markers.some(m=>j.status===m))addResult(section,`🟢️ ${lang}`,'pass',t('t_lang_executed',{lang}),j);else addResult(section,`🟡️ ${lang}`,'warn',t('t_lang_unexpected'),safeTrunc(tt,200));}catch(err_inner){if(markers.some(m=>tt.includes(m)))addResult(section,`🟢️ ${lang}`,'pass',t('t_lang_executed',{lang}),safeTrunc(tt,300));else if(tt.includes('#!/'))addResult(section,`🔴️ ${lang} no ejecutado`,'fail',t('t_lang_raw_returned',{path,lang}),safeTrunc(tt,150));else addResult(section,`🔴️ ${lang}`,'fail',t('t_lang_unexpected'),safeTrunc(tt,150));}}catch(e){const _em=escHtml(e&&e.message||'');addResult(section,`🔴️ ${lang}`,'fail',t('t_lang_error_detail',{msg:_em}),null,null,'t_lang_error_detail',{msg:_em});}}

// --- SEGURIDAD: ARCHIVOS ---
async function testEnvFiles(){const files=['.env','.env.local','.env.production','.env.backup','.env.old'];let found=false;for(const ff of files){try{const r=await fetch(ff+'?_p='+Date.now(),{cache:'no-store'});if(r.status===200){const tt=await r.text().catch(()=>'');if(tt.includes('DB_')||tt.includes('APP_KEY')||tt.includes('SECRET')||tt.includes('PASSWORD')||tt.includes('API_KEY')){addResult('files','🚨️ '+ff,'fail',`<span style=\"color:var(--red);font-weight:700\">`+t('t_credential_exposed_word')+`</span> \u2014 `+t('t_credential_exposed_detail'));found=true;break;}}}catch{}}if(!found)addResult('files',t('t_envName'),'pass',t('t_no_env_exposed'),null,null,null,'t_envName');}
async function testGitExposure(){const files=['.git/HEAD','.git/config','.gitignore'];let found=false;for(const ff of files){try{const r=await fetch(ff+'?_p='+Date.now(),{cache:'no-store'});if(r.status===200){const tt=await r.text().catch(()=>'');if(tt.includes('ref:')||tt.includes('[core]')){addResult('files','🚨️ '+ff,'fail',`<span style=\"color:var(--red);font-weight:700\">`+t('t_git_repo_exposed')+`</span>.`);found=true;break;}}}catch{}}if(!found)addResult('files',t('t_gitName'),'pass',t('t_no_git_exposed'),null,null,null,'t_gitName');}
async function testConfigFiles(){const files=['composer.json','composer.lock','package.json','web.config','config.php','config.yml'];let found=0;for(const ff of files){try{const r=await fetch(ff+'?_p='+Date.now(),{cache:'no-store'});if(r.status===200){const ct=r.headers.get('content-type')||'';if(ct.includes('text')||ct.includes('json')){found++;addResult('files','🚨️ '+ff,'fail',`<span style=\"color:var(--red)\">`+t('t_config_exposed_word')+`</span>.`);}}}catch{}}if(found===0)addResult('files',t('t_configName'),'pass',t('t_no_config_exposed'),null,null,null,'t_configName');else addResult('files','⚠️ Resumen','fail',`<span style=\"color:var(--red)\">`+t('t_n_files_exposed',{count:found})+`</span>.`);}
async function testBackupFiles(){const files=['backup.sql','dump.sql','database.sql','backup.zip','site.tar.gz','www.zip'];let found=0;for(const ff of files){try{const r=await fetch(ff+'?_p='+Date.now(),{cache:'no-store'});if(r.status===200){const cl=parseInt(r.headers.get('content-length')||'0');if(cl>0){found++;addResult('files','🚨️ '+ff,'fail',`<span style=\"color:var(--red)\">`+t('t_backup_exposed_word')+`</span> (${cl}B).`);}}}catch{}}if(found===0)addResult('files',t('t_backupsName'),'pass',t('t_no_backups_exposed'),null,null,null,'t_backupsName');else addResult('files','⚠️ Resumen','fail',`<span style=\"color:var(--red)\">`+t('t_n_backups_exposed',{count:found})+`</span>.`);}
async function testLogsExposure(){const files=['debug.log','error.log','access.log','app.log','laravel.log','php_errors.log'];let found=0;for(const ff of files){try{const r=await fetch(ff+'?_p='+Date.now(),{cache:'no-store'});if(r.status===200){const ct=r.headers.get('content-type')||'';if(ct.includes('text')||ct.includes('octet')){found++;addResult('files','🚨️ '+ff,'fail',`<span style=\"color:var(--red)\">`+t('t_log_exposed')+`</span>.`);}}}catch{}}if(found===0)addResult('files',t('t_logsName'),'pass',t('t_no_logs_exposed'),null,null,null,'t_logsName');else addResult('files','⚠️ Resumen','fail',`<span style=\"color:var(--red)\">`+t('t_n_logs_exposed',{count:found})+`</span>.`);}
async function testAdminPanels(){const panels=[{path:'phpmyadmin/',name:'phpMyAdmin'},{path:'admin/',name:'Admin'},{path:'administrator/',name:'Joomla Admin'},{path:'cpanel/',name:'cPanel'},{path:'webmail/',name:'Webmail'}];let found=0;for(const pp of panels){try{const r=await fetch(pp.path+'?_p='+Date.now(),{cache:'no-store',redirect:'follow'});if(r.status<400){found++;addResult('files','🔐️ '+pp.name,'warn',t('t_admin_detected_detail',{status:r.status}));}}catch{}}if(found===0)addResult('files',t('t_adminName'),'pass',t('t_no_admin_accessible'),null,null,null,'t_adminName');}
async function testWordPress(){try{const r1=await fetch('wp-login.php',{cache:'no-store'}).catch(()=>null);const r2=await fetch('wp-includes/',{cache:'no-store'}).catch(()=>null);const r3=await fetch('xmlrpc.php',{cache:'no-store'}).catch(()=>null);if((r1&&r1.status<400)||(r2&&r2.status<400)||(r3&&r3.status<400)){const d=[];if(r1)d.push(`wp-login: <code>${r1.status}</code>`);if(r2)d.push(`wp-includes: <code>${r2.status}</code>`);if(r3)d.push(`xmlrpc: <code>${r3.status}</code>`);addResult('files',t('t_wordpressName'),'pass',t('t_wp_detected')+` ${d.join(' · ')}`,null,null,null,'t_wordpressName');}else addResult('files',t('t_wordpressName'),'info',t('t_wp_not_detected'),null,null,null,'t_wordpressName');}catch{}}
async function testLaravel(){try{const r=await fetch('storage/logs/laravel.log',{cache:'no-store'}).catch(()=>null);if(r&&r.status===200)addResult('files',t('t_laravelName'),'pass',t('t_laravel_detected')+` <span style=\"color:var(--red)\">`+t('t_laravel_log_exposed')+`</span>.`,null,null,null,'t_laravelName');else addResult('files',t('t_laravelName'),'info',t('t_laravel_not_detected'),null,null,null,'t_laravelName');}catch{}}

// --- SEGURIDAD: HEADERS ---
async function testCSP(){addResult('headers',t('t_cspName'),document.querySelector('meta[http-equiv=\"Content-Security-Policy\"]')?'pass':'warn',document.querySelector('meta[http-equiv=\"Content-Security-Policy\"]')?t('t_csp_meta_detected'):t('t_no_csp_meta'));}
async function testSecurityHeaders(){try{const r=await fetch(location.href,{cache:'no-store'});const h={'X-Content-Type-Options':r.headers.get('x-content-type-options'),'X-Frame-Options':r.headers.get('x-frame-options'),'Strict-Transport-Security':r.headers.get('strict-transport-security'),'Referrer-Policy':r.headers.get('referrer-policy'),'Permissions-Policy':r.headers.get('permissions-policy')};const pp=Object.entries(h).filter(([,v])=>v);const m=Object.entries(h).filter(([,v])=>!v);addResult('headers',t('t_secheadersName'),pp.length?'pass':'warn',t('t_detected_count',{count:pp.length,total:Object.keys(h).length})+(pp.length?' · '+pp.map(([k,v])=>`<code>${k}</code>=<span style=\"color:var(--green)\">${escHtml(v)}</span>`).join(' · '):'')+(m.length?'<br><span style=\"color:var(--orange)\">'+t('t_missing_hdrs',{headers:m.map(([k])=>`<code>${k}</code>`).join(', ')})+'</span>':''));}catch(e){addResult('headers',t('t_secheadersName'),'fail',t('t_fetch_failed',{msg:escHtml(e&&e.message||'')}),null,null,'t_fetch_failed',{msg:escHtml(e&&e.message||'')});}}
async function testCORS(){try{const r=await fetch(location.href,{cache:'no-store'});const cors=r.headers.get('access-control-allow-origin');addResult('headers',t('t_corsName'),cors?'pass':'warn',cors?`CORS: <code>${escHtml(cors)}</code>`:t('t_no_cors_header'));}catch(e){addResult('headers',t('t_corsName'),'fail',t('t_fetch_failed',{msg:escHtml(e&&e.message||'')}),null,null,'t_fetch_failed',{msg:escHtml(e&&e.message||'')});}}
async function testHSTS(){try{const r=await fetch(location.href,{cache:'no-store'});const hsts=r.headers.get('strict-transport-security');addResult('headers',t('t_hstsName'),hsts?'pass':'warn',hsts?`HSTS: <code>${escHtml(hsts)}</code>`:t('t_no_hsts'));}catch{}}
async function testHtaccess(){try{const r=await fetch('.htaccess?'+Date.now(),{cache:'no-store'});if(r.status===403||r.status===404)addResult('headers',t('t_htaccessName'),'pass',t('t_protected')+` (${r.status}).`,null,null,null,'t_htaccessName');else addResult('headers',t('t_htaccessName'),'warn',t('t_accessible')+` (${r.status}).`,null,null,null,'t_htaccessName');}catch{addResult('headers',t('t_htaccessName'),'info',t('t_not_accessible'),null,null,null,'t_htaccessName');}}

// --- PENETRACIÓN ---
async function testDirListing(){const dirs=['/images/','/uploads/','/assets/','/static/','/files/','/tmp/'];let found=0;for(const d of dirs){try{const r=await fetch(d+'?_p='+Date.now(),{cache:'no-store'});const tt=await r.text().catch(()=>'');if(tt.includes('Index of')||tt.includes('Directory listing')||tt.includes('<title>Index')){found++;addResult('pentest','📂️ '+d,'fail',`<span style=\"color:var(--red)\">`+t('t_dir_listing_active')+`</span>.`);}}catch{}}if(found===0)addResult('pentest',t('t_dirlistName'),'pass',t('t_no_dir_listing'),null,null,null,'t_dirlistName');}
async function testErrorPages(){try{const r=await fetch('/nonexistent_page_12345?_p='+Date.now(),{cache:'no-store'});const tt=await r.text().catch(()=>'');const lower=tt.toLowerCase();let server='';if(lower.includes('apache'))server='Apache';else if(lower.includes('nginx'))server='Nginx';else if(lower.includes('iis'))server='IIS';else if(lower.includes('php'))server='PHP';if(server)addResult('pentest',t('t_errorinfoName'),'fail',t('t_error_reveals_server',{server}),null,null,null,'t_errorinfoName');else addResult('pentest',t('t_errorinfoName'),'info',t('t_no_excess_info',{status:r.status}),null,null,null,'t_errorinfoName');}catch{}}
async function testVersionDetection(){try{const r=await fetch(location.href,{cache:'no-store'});const powered=r.headers.get('x-powered-by')||'';const server=r.headers.get('server')||'';const poweredMatch=powered.match(/[\\d.]+/);const serverMatch=server.match(/[\\d.]+/);if(poweredMatch)addResult('pentest',t('t_versionName'),'warn',t('t_version_exposed_rec',{version:escHtml(powered)}),null,null,null,'t_versionName');else if(serverMatch)addResult('pentest',t('t_versionName'),'info',t('t_version_partial',{server:escHtml(server)}),null,null,null,'t_versionName');else addResult('pentest',t('t_versionName'),'pass',t('t_no_version_exposed'),null,null,null,'t_versionName');}catch{}}
async function testMIMESniffing(){try{const r=await fetch(location.href,{cache:'no-store'});const xnso=r.headers.get('x-content-type-options');addResult('pentest',t('t_mimetypeName'),xnso==='nosniff'?'pass':'warn',xnso?t('t_mime_protected',{value:xnso}):t('t_vulnerable_mime'));}catch{}}
async function testClickjacking(){try{const r=await fetch(location.href,{cache:'no-store'});const xfo=r.headers.get('x-frame-options');const csp=r.headers.get('content-security-policy')||'';const fa=csp.includes('frame-ancestors');addResult('pentest',t('t_clickjackName'),(xfo||fa)?'pass':'warn',(xfo||fa)?t('t_clickjack_protected_detail',{detail:xfo?'X-Frame-Options: '+escHtml(xfo):t('t_frame_ancestors_csp')}):t('t_no_clickjack_protection'));}catch{}}
async function testDangerousMethods(){const methods=['PUT','DELETE','PATCH','TRACE','CONNECT'];for(const m of methods){try{const r=await fetch(location.href+'?_p='+Date.now(),{method:m,cache:'no-store'});if(r.status===200)addResult('pentest','🔴️ '+m,'fail',t('t_method_accepted',{method:m}));else addResult('pentest','✅️ '+m,'pass',t('t_method_not_accepted',{status:r.status}));}catch{addResult('pentest','✅️ '+m,'pass',t('t_method_blocked'));}}}

// --- WAF DETECTION ---
async function testWAF(){
  try{
    const r=await fetch(location.href,{method:'HEAD',cache:'no-store'});
    const headers={'x-waf':r.headers.get('x-waf'),'x-waf-status':r.headers.get('x-waf-status'),'x-sucuri-id':r.headers.get('x-sucuri-id'),'x-modsecurity':r.headers.get('x-modsecurity'),'x-content-security-policy':r.headers.get('content-security-policy'),'x-waf-block':r.headers.get('x-waf-block')};
    const waf=[];
    if(headers['x-sucuri-id'])waf.push('Sucuri WAF');
    if(headers['x-modsecurity'])waf.push('ModSecurity');
    if(headers['x-waf']||headers['x-waf-status']||headers['x-waf-block'])waf.push(t('t_waf_generic'));
    // Try a simple XSS payload to check WAF blocking
    try{
      const test=await fetch(location.href+'?q=<script>alert(1)</script>&_waf='+Date.now(),{cache:'no-store'});
      if(test.status===403||test.status===406)waf.push(t('t_xss_blocked',{status:test.status}));
    }catch{}
    if(waf.length>0)addResult('waf',t('t_wafName'),'pass',t('t_waf_detected_detail',{wafs:waf.map(w=>`<code>${w}</code>`).join(', ')}),headers,null,null,null,'t_wafName');
    else addResult('waf',t('t_wafName'),'warn',t('t_no_waf_detected_detail'),headers,null,null,null,'t_wafName');
  }catch(e){addResult('waf',t('t_wafName'),'fail',t('t_fetch_failed',{msg:escHtml(e&&e.message||'')}),null,null,'t_fetch_failed',{msg:escHtml(e&&e.message||'')});}
}

// --- DDoS PROTECTION ---
async function testDDoS(){
  try{
    const r=await fetch(location.href,{method:'HEAD',cache:'no-store'});
    const cfRay=r.headers.get('cf-ray');
    const awsShield=r.headers.get('x-amzn-requestid')||r.headers.get('x-amz-request-id');
    const protections=[];
    if(cfRay)protections.push('Cloudflare DDoS');
    if(awsShield)protections.push('AWS Shield');
    if(r.headers.get('server')&&r.headers.get('server').toLowerCase().includes('cloudflare'))protections.push('Cloudflare');
    // Check rate limiting as DDoS indicator
    let limited=false;
    for(let i=0;i<5;i++){try{const rr=await fetch(location.href+'?ddos='+i+'&'+Date.now(),{cache:'no-store'});if(rr.status===429){limited=true;break;}}catch{}}
    if(limited)protections.push(t('t_rate_limiting_active'));
    if(protections.length>0)addResult('ddos',t('t_ddosName'),'pass',t('t_ddos_protection_detected',{protections:protections.map(p=>`<code>${p}</code>`).join(', ')}),null,null,null,'t_ddosName');
    else addResult('ddos',t('t_ddosName'),'warn',t('t_no_ddos_visible'),null,null,null,'t_ddosName');
  }catch(e){addResult('ddos',t('t_ddosName'),'fail',t('t_fetch_failed',{msg:escHtml(e&&e.message||'')}),null,null,'t_fetch_failed',{msg:escHtml(e&&e.message||'')});}
}

// --- RENDIMIENTO ---
async function testNavigationTiming(){if(performance.getEntriesByType){const n=performance.getEntriesByType('navigation')[0];if(n){const dns=Math.round(n.domainLookupEnd-n.domainLookupStart),tcp=Math.round(n.connectEnd-n.connectStart),ttfb=Math.round(n.responseStart-n.requestStart),dl=Math.round(n.responseEnd-n.responseStart),dom=Math.round(n.domContentLoadedEventEnd-n.startTime),full=Math.round(n.loadEventEnd-n.startTime);addResult('timing',t('t_timingName'),'pass',`DNS: <code>${dns}ms</code> · TCP: <code>${tcp}ms</code> · TTFB: <code>${ttfb}ms</code> · DL: <code>${dl}ms</code> · DOM: <code>${dom}ms</code> · Full: <code>${full}ms</code>`,null,null,null,'t_timingName');}}}
async function testHTTP2(){if(performance.getEntriesByType){const n=performance.getEntriesByType('navigation')[0];if(n){const pp=n.nextHopProtocol||'';if(pp.includes('h2'))addResult('timing',t('t_http2Name'),'pass',t('t_http2_detail'),null,null,null,'t_http2Name');else if(pp.includes('h3'))addResult('timing',t('t_http2Name'),'pass',t('t_http3_detail'),null,null,null,'t_http2Name');else if(pp)addResult('timing',t('t_http2Name'),'warn',t('t_http_proto_detail',{proto:pp}),null,null,null,'t_http2Name');}}}
async function testResources(){if(performance.getEntriesByType){const rr=performance.getEntriesByType('resource');const sz=rr.reduce((a,x)=>a+(x.transferSize||0),0);addResult('timing',t('t_resourcesName'),'info',`${rr.length} `+t('t_resources_label')+` · ${Math.round(sz/1024)}KB`,null,null,null,'t_resourcesName');}}
async function testMemory(){if(performance.memory)addResult('timing',t('t_memoryName'),'info',t('t_used')+`: <code>${(performance.memory.usedJSHeapSize/1048576).toFixed(1)}MB</code> · `+t('t_limit')+`: <code>${(performance.memory.jsHeapSizeLimit/1048576).toFixed(0)}MB</code>`,null,null,null,'t_memoryName');}
async function testLatency(){const t0=performance.now();try{await fetch(location.href,{method:'HEAD',cache:'no-store'});const ms=Math.round(performance.now()-t0);addResult('speed',t('t_latencyName'),'pass',`<code>${ms}ms</code> `+(ms<200?t('t_latency_excellent'):ms<500?t('t_latency_good'):ms<1000?t('t_latency_normal'):t('t_latency_slow')),null,null,null,'t_latencyName');}catch(e){addResult('speed',t('t_latencyName'),'fail',t('t_fetch_failed',{msg:escHtml(e&&e.message||'')}),null,null,'t_fetch_failed',{msg:escHtml(e&&e.message||'')});}}
async function testRateLimit(){let rl=false;const promises=[];for(let i=0;i<10;i++)promises.push(fetch(location.href+'?rl='+i+'&'+Date.now(),{cache:'no-store'}).then(rr=>{if(rr.status===429)rl=true;return rr.status}).catch(()=>-1));await Promise.all(promises);addResult('speed',t('t_ratelimitName'),rl?'fail':'pass',rl?'<span style=\"color:var(--red);font-weight:700\">'+t('t_rate_limiting_detected')+'</span>.':t('t_no_rate_limiting'));}
async function testConcurrency(){const t0=performance.now();const promises=[];for(let i=0;i<10;i++)promises.push(fetch(location.href+'?c='+i+'&'+Date.now(),{cache:'no-store'}).then(rr=>rr.status).catch(()=>-1));const results=await Promise.all(promises);const ms=Math.round(performance.now()-t0);const ok=results.filter(rr=>rr>=200&&rr<400).length;addResult('speed',t('t_concurrencyName'),'info',t('t_concurrency_detail',{ms,avg:Math.round(ms/10),ok}),null,null,null,'t_concurrencyName');}
async function testUploadPOST(){try{const fd=new FormData();fd.append('file',new Blob(['Thanatos test'],{type:'text/plain'}),'test.txt');const r=await fetch('probes/?_u='+Date.now(),{method:'POST',body:fd,cache:'no-store'});addResult('speed',t('t_uploadName'),r.status<400?'pass':'info',`Status: <code>${r.status}</code>.`);}catch(e){addResult('speed',t('t_uploadName'),'warn',t('t_fetch_failed',{msg:escHtml(e&&e.message||'')}),null,null,'t_fetch_failed',{msg:escHtml(e&&e.message||'')});}}
async function testUploadPUT(){try{const r=await fetch('probes/thanatos.txt',{method:'PUT',body:'test',headers:{'Content-Type':'text/plain'},cache:'no-store'});addResult('speed',t('t_putName'),r.status<400?'pass':'info',`Status: <code>${r.status}</code>.`);}catch(e){addResult('speed',t('t_putName'),'info',t('t_fetch_failed',{msg:escHtml(e&&e.message||'')}),null,null,'t_fetch_failed',{msg:escHtml(e&&e.message||'')});}}
async function testBigPOST(){try{const big='x'.repeat(102400);const t0=performance.now();const r=await fetch(location.href,{method:'POST',body:big,headers:{'Content-Type':'application/octet-stream'},cache:'no-store'});const ms=Math.round(performance.now()-t0);addResult('speed',t('t_bigpostName'),'info',`Status: <code>${r.status}</code> · <code>${ms}ms</code>.`,null,null,null,'t_bigpostName');}catch{addResult('speed',t('t_bigpostName'),'warn',t('t_rejected'),null,null,null,'t_bigpostName');}}
async function testUploadDir(){try{const r=await fetch('probes/test_upload.txt?'+Date.now(),{cache:'no-store'});if(r.status===200){const tt=await r.text();addResult('speed',t('t_uploaddirName'),tt.includes('Thanatos')?'pass':'warn',t('t_accessible_dir'));}else addResult('speed',t('t_uploaddirName'),'info',`Status: <code>${r.status}</code>.`,null,null,null,'t_uploaddirName');}catch{addResult('speed',t('t_uploaddirName'),'info',t('t_not_accessible'),null,null,null,'t_uploaddirName');}}

// --- DNS ---
async function testDNSHeaders(){
  try{
    const r=await fetch(location.href,{method:'HEAD',cache:'no-store'});
    const cfRay=r.headers.get('cf-ray')||'';
    const dnsInfo=[];
    // CF-RAY contains datacenter info
    if(cfRay){
      const parts=cfRay.split('-');
      if(parts.length>=2)dnsInfo.push(`CF Datacenter: <code>${parts[1]}</code>`);
      dnsInfo.push(`CF Ray: <code>${cfRay}</code>`);
      addResult('dns',t('t_dns_headersName'),'pass',dnsInfo.join(' · '),null,null,null,'t_dns_headersName');
    }else{
      // Try DNS-over-HTTPS via Cloudflare
      try{
        const doh=await fetch(`https://cloudflare-dns.com/dns-query?name=${location.hostname}&type=A`,{headers:{'Accept':'application/dns-json'},cache:'no-store'});
        if(doh.ok){
          const data=await doh.json();
          if(data.Answer&&data.Answer.length>0){
            const answers=data.Answer.filter(a=>a.type===1).map(a=>`<code>${a.data}</code>`);
            dnsInfo.push(`DNS A: ${answers.join(', ')}`);
          }
          if(data.AD)dnsInfo.push(t('t_dnssec_validated'));
          addResult('dns',t('t_dns_headersName'),'pass',dnsInfo.join(' · '),data,null,null,null,'t_dns_headersName');
        }else{
          addResult('dns',t('t_dns_headersName'),'warn',t('t_dns_not_queryable'),null,null,null,'t_dns_headersName');
        }
      }catch{
        addResult('dns',t('t_dns_headersName'),'info',t('t_dns_not_available'),null,null,null,'t_dns_headersName');
      }
    }
  }catch(e){addResult('dns',t('t_dns_headersName'),'fail',t('t_fetch_failed',{msg:escHtml(e&&e.message||'')}),null,null,'t_fetch_failed',{msg:escHtml(e&&e.message||'')});}
}

// --- IPv6 ---
async function testIPv6(){
  try{
    // Try to detect IPv6 via fetch to a known dual-stack endpoint
    let ipv6=false;
    try{
      // Use WebRTC to detect local IP (may reveal IPv6)
      if(window.RTCPeerConnection){
        const pc=new RTCPeerConnection({iceServers:[{urls:'stun:stun.l.google.com:19302'}]});
        pc.createDataChannel('');
        const offer=await pc.createOffer();
        await pc.setLocalDescription(offer);
        const candidates=await new Promise(ok=>{
          const cs=[];pc.onicecandidate=e=>{if(e.candidate)cs.push(e.candidate.candidate);else ok(cs);};
          setTimeout(()=>ok(cs),2000);
        });
        pc.close();
        for(const cand of candidates){if(cand.includes('::')||/\b[0-9a-fA-F:]+:[0-9a-fA-F:]+/.test(cand)){ipv6=true;break;}}
      }
    }catch{}
    if(ipv6){
      addResult('device',t('t_ipv6Name'),'pass',t('t_ipv6_detected'),null,null,null,'t_ipv6Name');
    }else{
      addResult('device',t('t_ipv6Name'),'info',t('t_ipv6_not_detected'),null,null,null,'t_ipv6Name');
    }
  }catch(e){addResult('device',t('t_ipv6Name'),'warn',t('t_fetch_failed',{msg:escHtml(e&&e.message||'')}),null,null,'t_fetch_failed',{msg:escHtml(e&&e.message||'')});}
}

// --- NAVEGADOR ---
async function testES6(){try{addResult('jsfeat',t('t_es6Name'),new Function('let x=1;const y=2;return x+y===3')()?'pass':'fail',t('t_es6_supported_detail'));}catch{addResult('jsfeat',t('t_es6Name'),'fail',t('t_not_supported'),null,null,null,'t_es6Name');}}
async function testArrow(){addResult('jsfeat',t('t_arrowName'),typeof(()=>{})==='function'?'pass':'fail',t('t_arrow_fns_supported'));}
async function testAsync(){addResult('jsfeat',t('t_asyncName'),typeof(async function(){}).constructor==='AsyncFunction'?'pass':'fail',t('t_async_supported_detail'));}
async function testPromise(){addResult('jsfeat',t('t_promiseName'),typeof Promise!=='undefined'?'pass':'fail',t('t_promise_supported_detail'));}
async function testWasm(){addResult('jsfeat',t('t_wasmName'),typeof WebAssembly!=='undefined'?'pass':'fail',typeof WebAssembly!=='undefined'?t('t_supported'):t('t_not_supported'));}
async function testBigInt(){addResult('jsfeat',t('t_bigintName'),typeof BigInt!=='undefined'?'pass':'fail',typeof BigInt!=='undefined'?t('t_supported'):t('t_not_supported'));}
async function testProxy(){addResult('jsfeat',t('t_proxyName'),typeof Proxy!=='undefined'?'pass':'fail',typeof Proxy!=='undefined'?t('t_supported'):t('t_not_supported'));}
async function testMapSet(){addResult('jsfeat',t('t_mapsetName'),typeof Map!=='undefined'&&typeof Set!=='undefined'?'pass':'fail',t('t_mapset_supported'));}
async function testWebWorker(){try{const w=new Worker('tests/worker/worker.js');const rr=await new Promise((ok,rej)=>{const tt=setTimeout(()=>{w.terminate();rej()},3000);w.onmessage=e=>{clearTimeout(tt);w.terminate();ok(e.data)};w.onerror=()=>{clearTimeout(tt);rej()};w.postMessage('ping')});addResult('jsfeat',t('t_workerName'),'pass',t('t_worker_executed'),rr,null,null,null,'t_workerName');}catch(e){addResult('jsfeat',t('t_workerName'),'fail',t('t_fetch_failed',{msg:escHtml(e&&e.message||'')}),null,null,'t_fetch_failed',{msg:escHtml(e&&e.message||'')});}}
async function testESM(){addResult('jsfeat',t('t_esmName'),HTMLScriptElement.supports?HTMLScriptElement.supports('module')?'pass':'fail':'warn',HTMLScriptElement.supports?(HTMLScriptElement.supports('module')?t('t_supported'):t('t_not_supported')):t('t_not_verifiable'));}
async function testWebGL(){try{const c=document.createElement('canvas');const g=c.getContext('webgl')||c.getContext('experimental-webgl');if(g){const d=g.getExtension('WEBGL_debug_renderer_info');addResult('webapis',t('t_webglName'),'pass',`GPU: <code>${d?g.getParameter(d.UNMASKED_RENDERER_WEBGL):'N/A'}</code>`,null,null,null,'t_webglName');}else addResult('webapis',t('t_webglName'),'fail',t('t_unavailable'),null,null,null,'t_webglName');}catch{addResult('webapis',t('t_webglName'),'fail',t('t_error'),null,null,null,'t_webglName');}}
async function testGeolocation(){addResult('webapis',t('t_geoName'),typeof navigator!=='undefined'&&'geolocation' in navigator?'pass':'warn',typeof navigator!=='undefined'&&'geolocation' in navigator?t('t_available'):t('t_unavailable'));}
async function testNotifications(){addResult('webapis',t('t_notifName'),typeof Notification!=='undefined'?'pass':'fail',typeof Notification!=='undefined'?t('t_available'):t('t_unavailable'));}
async function testClipboard(){addResult('webapis',t('t_clipboardName'),navigator.clipboard?'pass':'warn',navigator.clipboard?t('t_available'):t('t_unavailable'));}
async function testBattery(){addResult('webapis',t('t_batteryName'),navigator.getBattery?'pass':'warn',navigator.getBattery?t('t_available'):t('t_unavailable'));}
async function testMediaDevices(){addResult('webapis',t('t_mediaName'),navigator.mediaDevices?'pass':'warn',navigator.mediaDevices?t('t_available'):t('t_unavailable'));}
async function testCanvas(){try{const c=document.createElement('canvas').getContext('2d');addResult('webapis',t('t_canvasName'),c?'pass':'fail',c?t('t_available'):t('t_unavailable'));}catch{}}
async function testIntersectionObserver(){addResult('domfeat',t('t_intobsName'),typeof IntersectionObserver!=='undefined'?'pass':'fail',typeof IntersectionObserver!=='undefined'?t('t_available'):t('t_unavailable'));}
async function testResizeObserver(){addResult('domfeat',t('t_resizeName'),typeof ResizeObserver!=='undefined'?'pass':'fail',typeof ResizeObserver!=='undefined'?t('t_available'):t('t_unavailable'));}
async function testPerfObserver(){addResult('domfeat',t('t_perobsName'),typeof PerformanceObserver!=='undefined'?'pass':'fail',typeof PerformanceObserver!=='undefined'?t('t_available'):t('t_unavailable'));}
async function testPageVisibility(){addResult('domfeat',t('t_visibilityName'),typeof document!=='undefined'&&'visibilityState' in document?'pass':'warn',t('t_state')+`: <code>${document.visibilityState}</code>`);}
async function testDragDrop(){addResult('domfeat',t('t_dragdropName'),typeof document!=='undefined'&&typeof document.createElement('span').draggable!=='undefined'?'pass':'warn',t('t_available'));}
async function testFileAPI(){addResult('domfeat',t('t_fileapiName'),typeof File!=='undefined'?'pass':'fail',typeof File!=='undefined'?t('t_available'):t('t_unavailable'));}
async function testWebShare(){addResult('domfeat',t('t_shareName'),navigator.share?'pass':'warn',navigator.share?t('t_available'):t('t_unavailable'));}
async function testCSSGrid(){try{addResult('cssfeat',t('t_cssgridName'),CSS.supports('display','grid')?'pass':'warn',t('t_supported'));}catch{addResult('cssfeat',t('t_cssgridName'),'warn',t('t_not_verifiable'),null,null,null,'t_cssgridName');}}
async function testCSSFlexbox(){try{addResult('cssfeat',t('t_cssflexName'),CSS.supports('display','flex')?'pass':'warn',t('t_supported'));}catch{addResult('cssfeat',t('t_cssflexName'),'warn',t('t_not_verifiable'),null,null,null,'t_cssflexName');}}
async function testCSSVars(){try{addResult('cssfeat',t('t_cssvarName'),CSS.supports('--test','x')?'pass':'warn',t('t_supported'));}catch{addResult('cssfeat',t('t_cssvarName'),'warn',t('t_not_verifiable'),null,null,null,'t_cssvarName');}}
async function testLocalStorage(){try{localStorage.setItem('_dt_','ok');const v=localStorage.getItem('_dt_');localStorage.removeItem('_dt_');addResult('storage',t('t_lsName'),v==='ok'?'pass':'fail',t('t_functional'));}catch(e){addResult('storage',t('t_lsName'),'fail',t('t_fetch_failed',{msg:escHtml(e&&e.message||'')}),null,null,'t_fetch_failed',{msg:escHtml(e&&e.message||'')});}}
async function testSessionStorage(){try{sessionStorage.setItem('_dt_','ok');const v=sessionStorage.getItem('_dt_');sessionStorage.removeItem('_dt_');addResult('storage',t('t_ssName'),v==='ok'?'pass':'fail',t('t_functional'));}catch(e){addResult('storage',t('t_ssName'),'fail',t('t_fetch_failed',{msg:escHtml(e&&e.message||'')}),null,null,'t_fetch_failed',{msg:escHtml(e&&e.message||'')});}}
async function testIndexedDB(){try{const db=await new Promise((ok,rej)=>{const rr=indexedDB.open('_dt_',1);rr.onupgradeneeded=e=>e.target.result.createObjectStore('t');rr.onsuccess=e=>ok(e.target.result);rr.onerror=rej});db.close();indexedDB.deleteDatabase('_dt_');addResult('storage',t('t_idbName'),'pass',t('t_functional'),null,null,null,'t_idbName');}catch{addResult('storage',t('t_idbName'),'fail',t('t_not_functional'),null,null,null,'t_idbName');}}
async function testCacheAPI(){if('caches' in window){try{const c=await caches.open('_dt_');await c.put('/_dt_',new Response('ok'));const m=await c.match('/_dt_');await caches.delete('_dt_');addResult('storage',t('t_cacheName'),m?'pass':'fail',t('t_functional'));}catch{addResult('storage',t('t_cacheName'),'warn',t('t_restricted'),null,null,null,'t_cacheName');}}else addResult('storage',t('t_cacheName'),'fail',t('t_unavailable'),null,null,null,'t_cacheName');}
async function testCookies(){document.cookie='_dt_=ok;path=/';const ok=document.cookie.includes('_dt_=ok');document.cookie='_dt_=;path=/;max-age=0';addResult('storage',t('t_cookiesName'),ok?'pass':'fail',ok?t('t_functional'):t('t_not_functional'));}
async function testServiceWorker(){addResult('storage',t('t_swName'),typeof navigator!=='undefined'&&'serviceWorker' in navigator?'pass':'warn',typeof navigator!=='undefined'&&navigator.serviceWorker?t('t_available'):t('t_unavailable'));}
async function testConnection(){const c=navigator.connection||navigator.mozConnection||navigator.webkitConnection;addResult('net',t('t_connName'),c?'pass':'warn',c?t('t_type_label')+` <code>${c.effectiveType||'N/A'}</code> · `+t('t_down_label')+`: <code>${c.downlink||'N/A'}Mbps</code> · `+t('t_rtt_label')+`: <code>${c.rtt||'N/A'}ms</code>`:t('t_unavailable'));}
async function testWebSocket(){try{const ws=new WebSocket((location.protocol==='https:'?'wss://':'ws://')+location.host);await new Promise((ok,rej)=>{ws.onopen=()=>{ws.close();ok()};ws.onerror=()=>rej();setTimeout(rej,2000)});addResult('net',t('t_wsName'),'pass',t('t_available'),null,null,null,'t_wsName');}catch{addResult('net',t('t_wsName'),'warn',t('t_unavailable'),null,null,null,'t_wsName');}}
async function testDeviceInfo(){addResult('device',t('t_deviceName'),'info',t('t_ua_label')+` <code>${escHtml(navigator.userAgent.substring(0,70))}</code> · `+t('t_cores_label')+`: <code>${navigator.hardwareConcurrency||'N/A'}</code> · `+t('t_mem_label')+`: <code>${navigator.deviceMemory||'N/A'}GB</code> · `+t('t_cookies_label')+` <code>${navigator.cookieEnabled?t('t_yes'):t('t_no')}</code>`,null,null,null,'t_deviceName');}
async function testScreen(){addResult('device',t('t_screenName'),'info',t('t_res_label')+` <code>${screen.width}x${screen.height}</code> · `+t('t_viewport_label')+`: <code>${window.innerWidth}x${window.innerHeight}</code> · `+t('t_dpr_label')+`: <code>${window.devicePixelRatio}</code>`,null,null,null,'t_screenName');}
async function testSpeechSynth(){addResult('device',t('t_speechName'),typeof speechSynthesis!=='undefined'?'pass':'fail',typeof speechSynthesis!=='undefined'?t('t_available'):t('t_unavailable'));}
async function testGamepad(){addResult('device',t('t_gamepadName'),typeof navigator!=='undefined'&&'getGamepads' in navigator?'pass':'warn',typeof navigator!=='undefined'&&navigator.getGamepads?t('t_available'):t('t_unavailable'));}

// --- WebSocket ADVANCED ---
async function testWSBinary(){
  try{
    const url=(location.protocol==='https:'?'wss://':'ws://')+location.host;
    const ws=new WebSocket(url);
    const result=await new Promise((ok,rej)=>{
      const t=setTimeout(()=>{try{ws.close()}catch{};rej('Timeout')},3000);
      ws.onopen=()=>{try{const buf=new ArrayBuffer(4);new DataView(buf).setUint32(0,42);ws.send(buf);}catch(e){clearTimeout(t);rej(e.message)}};
      ws.onmessage=e=>{clearTimeout(t);ws.close();ok(e.data instanceof ArrayBuffer?'pass':'fail')};
      ws.onerror=()=>{clearTimeout(t);rej('Error')};
    });
    addResult('ws_adv',t('t_ws_binName'),result==='pass'?'pass':'warn',result==='pass'?t('t_ws_binary_supported'):t('t_ws_binary_not_verified'));
  }catch{addResult('ws_adv',t('t_ws_binName'),'warn',t('t_unavailable'),null,null,null,'t_ws_binName');}
}
async function testWSMsgSize(){
  try{
    const url=(location.protocol==='https:'?'wss://':'ws://')+location.host;
    const ws=new WebSocket(url);
    const result=await new Promise((ok,rej)=>{
      const t=setTimeout(()=>{try{ws.close()}catch{};ok('timeout')},3000);
      ws.onopen=()=>{try{const msg='T'.repeat(65536);ws.send(msg);ok('sent');}catch(e){clearTimeout(t);ok('error: '+e.message)}}
      ws.onerror=()=>{clearTimeout(t);ok('error')};
    });
    if(result==='sent')addResult('ws_adv',t('t_ws_sizeName'),'pass',t('t_ws_msg_sent'),null,null,null,'t_ws_sizeName');
    else if(result==='timeout')addResult('ws_adv',t('t_ws_sizeName'),'warn',t('t_ws_msg_timeout'),null,null,null,'t_ws_sizeName');
    else addResult('ws_adv',t('t_ws_sizeName'),'warn',t('t_ws_msg_limitation',{reason:result}),null,null,null,'t_ws_sizeName');
  }catch{addResult('ws_adv',t('t_ws_sizeName'),'warn',t('t_unavailable'),null,null,null,'t_ws_sizeName');}
}

// ═══════════════════════════════════════════
// ═══ RUN / EXPORT / COMPARISON ═══
// ═══════════════════════════════════════════

async function runSelected(){
  const selected=getSelectedTests();
  if(!selected.length){showToast(t('t_toastNone'),'warning');return;}
  DIAG.results=[];DIAG.done=0;DIAG.t0=Date.now();DIAG.total=selected.length;
  document.getElementById('selPanel').style.display='none';
  document.getElementById('progressBar').classList.add('show');
  document.getElementById('globalBadge').className='badge badge-testing';
  document.getElementById('globalBadge').textContent=t('t_badgeTesting');
  document.getElementById('progressFill').style.width='0%';
  document.getElementById('resultsContainer').innerHTML='';
  document.getElementById('serverBox').classList.remove('show');
  document.getElementById('tileSection').classList.remove('show');
  document.getElementById('chartSection').classList.remove('show');
  document.getElementById('compareSection').classList.remove('show');
  document.getElementById('exportBar').classList.remove('show');
  document.getElementById('btnRerun').style.display='none';
  document.getElementById('btnExport').style.display='none';
  buildSections();initTiles();
  const safe=fn=>fn().catch(e=>addResult('device','❌️ Error','fail',`<code>${escHtml(String(e.message||e))}</code>`));
  const fnMap={};
  const TG=getTestGroups();
  for(const grp of TG)for(const tt of grp.tests)fnMap[tt.fn]=window[tt.fn];
  const promises=selected.map(fnName=>fnMap[fnName]?safe(fnMap[fnName]):Promise.resolve());
  await Promise.all(promises);
  DIAG.total=DIAG.done;updateUI();
}

function rerunTests(){
  document.getElementById('selPanel').style.display='';
  document.getElementById('progressBar').classList.remove('show');
  document.getElementById('resultsContainer').innerHTML='';
  document.getElementById('serverBox').classList.remove('show');
  document.getElementById('tileSection').classList.remove('show');
  document.getElementById('chartSection').classList.remove('show');
  document.getElementById('compareSection').classList.remove('show');
  document.getElementById('exportBar').classList.remove('show');
  document.getElementById('btnRerun').style.display='none';
  document.getElementById('btnExport').style.display='none';
  document.getElementById('globalBadge').className='badge badge-idle';
  document.getElementById('globalBadge').textContent=t('t_badgeIdle');
  DIAG.results=[];DIAG.done=0;
}

// ═══ EXPORT ═══
function exportReport(){
  const rr={title:'Thanatos Hosting Diagnostic Tool',url:location.href,host:location.hostname,ts:new Date().toISOString(),dur:Math.round((Date.now()-DIAG.t0)/1000)+'s',summary:{total:DIAG.results.length,pass:DIAG.results.filter(r=>r.status==='pass').length,fail:DIAG.results.filter(r=>r.status==='fail').length,warn:DIAG.results.filter(r=>r.status==='warn').length},results:DIAG.results};
  const b=new Blob([JSON.stringify(rr,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='thanatos-'+location.hostname+'-'+Date.now()+'.json';a.click();
  showToast(t('t_toastJsonExported'),'success');
}
function exportText(){let txt='⚔️ THANATOS HOSTING DIAGNOSTIC\n'+location.hostname+' — '+new Date().toISOString()+'\n\n';for(const r of DIAG.results){const i=r.status==='pass'?'✅️':r.status==='fail'?'❌️':r.status==='warn'?'⚠️':'ℹ️';txt+=`${i} ${r.name}\n   ${r.detail.replace(/<[^>]+>/g,'')}\n\n`;}const b=new Blob([txt],{type:'text/plain'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='thanatos-'+location.hostname+'-'+Date.now()+'.txt';a.click();showToast(t('t_toastTxtExported'),'success');}
async function exportPDF(){
  showToast(t('t_toastPdfGen'),'info');
  const chartWasVisible=document.getElementById('chartSection').classList.contains('show');
  try{
    document.querySelectorAll('.accordion').forEach(a=>{a.classList.add('open');const b=a.querySelector('.accordion-body');if(b)b.style.maxHeight='none';});
    document.getElementById('chartSection').classList.add('show');
    const main=document.querySelector('.main');
    const canvas=await html2canvas(main,{scale:1.2,useCORS:true,backgroundColor:SETTINGS.theme==='dark'?'#0b0f19':'#f8fafc',logging:false,imageTimeout:5000,allowTaint:true});
    const{jsPDF}=window.jspdf;
    const pdf=new jsPDF('p','mm','a4');
    const pw=pdf.internal.pageSize.getWidth();
    const ph=pdf.internal.pageSize.getHeight();
    const imgW=pw-20;
    const imgH=(canvas.height*imgW)/canvas.width;
    const imgData=canvas.toDataURL('image/jpeg',0.85);
    if(imgH<=ph-20){pdf.addImage(imgData,'JPEG',10,10,imgW,imgH);}
    else{let offset=0;while(offset<imgH){pdf.addImage(imgData,'JPEG',10,10-offset,imgW,imgH);offset+=(ph-20);if(offset<imgH)pdf.addPage();}}
    pdf.save('thanatos-'+location.hostname+'-'+Date.now()+'.pdf');
    showToast(t('t_toastPdfOk'),'success');
  }catch(e){showToast(t('t_toastPdfErr')+e.message,'error');}
  if(!chartWasVisible)document.getElementById('chartSection').classList.remove('show');
}
async function copyToClipboard(){
  const json=JSON.stringify({host:location.hostname,url:location.href,timestamp:new Date().toISOString(),results:DIAG.results},null,2);
  try{await navigator.clipboard.writeText(json);showToast(t('t_toastCopied'),'success');}catch(e){showToast(t('t_toastCopyErr')+e.message,'error');}
}

// ═══ COMPARISON ═══
function runComparison(){
  const input=document.getElementById('compareInput').value.trim();
  if(!input){showToast(t('t_toastNoJson'),'warning');return;}
  try{
    const other=JSON.parse(input);
    const otherResults=other.results||[];
    const container=document.getElementById('compareResults');
    let html='<div style=\"margin-top:12px\">';
    // Side-by-side header
    html+=`<div style=\"display:grid;grid-template-columns:1fr auto 1fr;gap:12px;align-items:center;margin-bottom:12px\">`;
    html+=`<div style=\"text-align:center;padding:8px;background:var(--bg3);border-radius:var(--rad-sm);font-weight:700;font-size:13px\">🌐️ ${location.hostname}<br><small style=\"font-weight:400;color:var(--dim)\">${t('t_compareLocal')}</small></div>`;
    html+=`<div style=\"font-size:20px;font-weight:700;color:var(--muted)\">VS</div>`;
    html+=`<div style=\"text-align:center;padding:8px;background:var(--bg3);border-radius:var(--rad-sm);font-weight:700;font-size:13px\">🌐️ ${other.host||'?'}<br><small style=\"font-weight:400;color:var(--dim)\">${t('t_compareRemote')}</small></div>`;
    html+='</div>';
    // Stats summary
    const lp=DIAG.results.filter(r=>r.status==='pass').length;
    const lf=DIAG.results.filter(r=>r.status==='fail').length;
    const op=otherResults.filter(r=>r.status==='pass').length;
    const of=otherResults.filter(r=>r.status==='fail').length;
    html+=`<div style=\"display:flex;gap:8px;justify-content:center;font-size:10px;margin-bottom:12px;flex-wrap:wrap\">`;
    html+=`<span style=\"background:rgba(34,197,94,.12);padding:3px 8px;border-radius:8px;color:var(--green)\">✅️ ${lp} vs ${op}</span>`;
    html+=`<span style=\"background:rgba(239,68,68,.12);padding:3px 8px;border-radius:8px;color:var(--red)\">❌️ ${lf} vs ${of}</span>`;
    html+='</div>';
    // Comparison grid with icons
    let diffCount=0;
    // Group by category
    const TG=getTestGroups();
    for(const grp of TG){
      const localTests=DIAG.results.filter(r=>r.sec===grp.id);
      if(!localTests.length)continue;
      html+=`<div style=\"margin-bottom:8px\"><div style=\"font-size:11px;font-weight:700;color:var(--muted);margin-bottom:4px\">${grp.icon} ${grp.name}</div>`;
      for(const rr of localTests){
        const otherR=otherResults.find(o=>o.name===rr.name);
        const icon=s=>s==='pass'?'✅️':s==='fail'?'❌️':s==='warn'?'⚠️':'ℹ️';
        if(otherR){
          const same=rr.status===otherR.status;
          const bg=same?'':'rgba(255,200,50,.04)';
          html+=`<div style=\"display:grid;grid-template-columns:1fr 100px 100px;gap:8px;align-items:center;padding:4px 8px;font-size:11px;background:${bg};border-radius:var(--rad-sm);margin-bottom:2px\">`;
          html+=`<span style=\"font-weight:600\">${same?'':'⚡️ '}${rr.name}</span>`;
          html+=`<span style=\"text-align:center;color:var(--green);${same?'':'font-weight:700'}\">${icon(rr.status)} ${rr.status}</span>`;
          html+=`<span style=\"text-align:center;color:${otherR.status==='pass'?'var(--green)':otherR.status==='fail'?'var(--red)':'var(--orange)'};${same?'':'font-weight:700'}\">${icon(otherR.status)} ${otherR.status}</span>`;
          html+='</div>';
          if(!same)diffCount++;
        }else{
          html+=`<div style=\"display:grid;grid-template-columns:1fr 100px 100px;gap:8px;align-items:center;padding:4px 8px;font-size:11px;background:rgba(59,130,246,.02);border-radius:var(--rad-sm);margin-bottom:2px\">`;
          html+=`<span style=\"font-weight:600\">${rr.name}</span>`;
          html+=`<span style=\"text-align:center;color:var(--accent)\">${icon(rr.status)} ${rr.status}</span>`;
          html+=`<span style=\"text-align:center;color:var(--dim)\">—</span>`;
          html+='</div>';
        }
      }
      html+='</div>';
    }
    const total=Math.min(DIAG.results.length,otherResults.length);
    html+=`<div style=\"font-size:11px;color:var(--muted);margin-top:12px;text-align:center;padding:8px;background:var(--bg3);border-radius:var(--rad-sm)\">📊️ ${t('t_compareDiff',{count:diffCount,total:total})}</div>`;
    html+='</div>';
    container.innerHTML=html;
  }catch(e){showToast(t('t_toastBadJson')+e.message,'error');}
}


// ═══ REBUILD UI ═══
function rebuildUI(){
  buildSelection();
  if(DIAG.results.length>0){
    buildSections();
    updateTiles();
    updateAccordions();
    renderServerInfo();
    renderCharts();
  }
}

// ═══ INIT ═══
window.addEventListener('DOMContentLoaded',()=>{
  SETTINGS.lang=localStorage.getItem('thanatos_lang')||navigator.language.split('-')[0]||'es';
  if(!window.I18N||!window.I18N[SETTINGS.lang])SETTINGS.lang='es';
  buildLangSelector();
  document.documentElement.lang=SETTINGS.lang;
  document.title=t('t_title');
  initTheme();
  // Hide main UI and show mandatory language selector first
  document.querySelector('.main').style.display='none';
  document.querySelector('.header').style.display='none';
  window._langLocked=true;
  document.getElementById('i18nModal').classList.add('show');
  document.getElementById('i18nBackdrop').classList.add('show');
  // Set og:url dynamically
  const ogUrl=document.getElementById('ogUrl');
  if(ogUrl)ogUrl.content=window.location.href;
  // Listen for system theme changes
  if(window.matchMedia)window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',e=>{
    if(!localStorage.getItem('thanatos_theme')){SETTINGS.theme=e.matches?'dark':'light';applyTheme();}
  });
});
