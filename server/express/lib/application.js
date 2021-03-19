const http = require('http');
const url = require('url');
const path = require('path');
const Router = require('./router');

function Application() {
  this.router = new Router();
}

Application.prototype.get = function(path, handler) {
  this.router.get(path, handler);
};

Application.prototype.listen = function() {
  // 改成箭头函数，不然下面拿不到this
  let server = http.createServer((req, res) => {
    function done() {
      res.end(`Cannot ${req.method} ${req.url}...`);
    }
    this.router.handle(req, res, done);
  });

  server.listen(...arguments);
};

module.exports = Application;
