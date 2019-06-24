/**
 *
 * @param {String} url
 * @param {Object|Function} opts
 * @param {Function} fn
 *
 * opts:
 *  -param(String) 参数 默认callback
 *  -prefix(String) 回调函数名字前缀 默认jp
 *  -name(String) 自定义回调函数名字
 *  -timeout(Number) 超时 默认60000
 *
 */
function jp(url, opts = {}, fn) {
  if (typeof opts == 'function') {
    fn = opts;
    opts = {};
  }

  // opts
  const param = opts.param || 'callback';
  const prefix = opts.prefix || 'jp';
  const name =
    opts.name || prefix + String(Math.random() * 10).replace('.', '');
  const timeout = opts.timeout != null ? opts.timeout : 60000;

  // clean ->script callback timer
  function clean() {
    document.body.removeChild(script);
    window[name] = function() {};
    clearTimeout(timer);
  }

  // timer
  const timer = setTimeout(() => {
    clean();
    if (fn) fn(new Error('Timeout'));
  }, timeout);

  // callback
  window[name] = function(data) {
    clean();
    if (fn) fn(null, data);
  };

  // script
  let src = url + (url.includes('?') ? '&' : '?') + param + '=' + name;
  src = src.replace('?&', '?');

  let script = document.createElement('script');
  script.src = src;
  document.body.appendChild(script);
}

module.exports = jp;
