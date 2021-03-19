const http = require('http');
const url = require('url');
const path = require('path');

function Application() {
  this.router = [
    {
      path: '*',
      method: '*',
      handler(req, res) {
        res.end(`Cannot ${req.method}  ${req.url}`);
      }
    }
  ];
}

Application.prototype.get = function(path, handler) {
  this.router.push({
    path,
    method: 'get',
    handler
  });
};

Application.prototype.listen = function() {
  // 改成箭头函数，不然下面拿不到this
  let server = http.createServer((req, res) => {
    let {pathname} = url.parse(req.url);
    let requestMethod = req.method.toLowerCase();

    for (let i = 0; i < this.router.length; i++) {
      let {method, path, handler} = this.router[i];
      if (pathname === path && requestMethod === method) {
        return handler(req, res);
      }
    }
    return this.router[0].handler(req, res);
  });

  server.listen(...arguments);
};

module.exports = Application;
