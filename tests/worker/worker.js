// worker.js — Test file for Web Worker detection
// The main page will try to instantiate this as a Web Worker
self.onmessage = function(e) {
  if (e.data === 'ping') {
    self.postMessage({
      status: 'WORKER_EXECUTED',
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      timestamp: new Date().toISOString()
    });
  }
};
