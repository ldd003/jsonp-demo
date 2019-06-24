## jsonp-demo

jsonp的小实现

### Installation

```javascript
npm install jsonp-demo
```

### API

```javascript
const jp = require('jsonp-demo')
jp(url,opts,fn)
```

* url(String)
* opts(Object)
  * param--参数 默认'callback'
  * prefix(String)--回调函数名字前缀 默认'jp'
  * name(String)--自定义回调函数名字
  * timeout(Number)--超时 默认60000

* fn(callback)