/**
 *
 * @param {String} url
 * @param {Object|Function} opts
 * @param {Function} cb
 *
 * opts:
 *  -param(String) 参数 默认'callback'
 *  -name(String) 自定义回调函数名
 *  -prefix(String) 回调函数名前缀 默认'jp'
 *  -timeout(Number) 超时 默认60000
 *
 */
function jp(url, opts, cb) {
  if (typeof opts == "function") {
    cb = opts;
    opts = {};
  }
  if (!opts) opts = {};

  // opts
  let param = opts.param || "callback";
  let prefix = opts.prefix || "jp";
  let name = opts.name || prefix + String(Math.random() * 10).replace(".", "");
  let timeout = opts.timeout != null ? opts.timeout : 60000;

  // clean ->script callback timer
  function clean() {
    if (script) document.body.removeChild(script);
    window[name] = function() {};
    if (timer) clearTimeout(timer);
  }

  // timer
  let timer = setTimeout(() => {
    clean();
    if (cb) cb(new Error("Timeout"));
  }, timeout);

  // callback
  window[name] = function(data) {
    clean();
    if (cb) cb(null, data);
  };

  // script
  let src =
    url +
    (url.includes("?") ? "&" : "?") +
    param +
    "=" +
    encodeURIComponent(name);
  src = src.replace("?&", "?");

  let script = document.createElement("script");
  script.src = src;
  document.body.appendChild(script);
}

export default jp;
