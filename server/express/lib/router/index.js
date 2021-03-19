const url = require('url');

function Router() {
  this.statck = [];
}

Router.prototype.get = function(path, handler) {
  this.statck.push({
    path,
    method: 'get',
    handler
  });
};

Router.prototype.handle = function(req, res, out) {
  let {pathname} = url.parse(req.url);
  let requestMethod = req.method.toLowerCase();

  for (let i = 0; i < this.statck.length; i++) {
    let {method, path, handler} = this.statck[i];
    if (pathname === path && requestMethod === method) {
      return handler(req, res);
    }
  }
  out();
};

module.exports = Router;
