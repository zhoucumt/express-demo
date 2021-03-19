const http = require('http');
const url = require('url');
const path = require('path');

function createApplication() {
  const router = [
    {
      path: '*',
      method: '*',
      handler(req, res) {
        res.end(`Cannot ${req.method}  ${req.url}`);
      }
    }
  ];

  return {
    get(path, handler) {
      router.push({
        path,
        method: 'get',
        handler
      });
    },

    listen() {
      let server = http.createServer(function(req, res) {
        let {pathname} = url.parse(req.url);
        let requestMethod = req.method.toLowerCase();

        for (let i = 0; i < router.length; i++) {
          let {method, path, handler} = router[i];
          if (pathname === path && requestMethod === method) {
            return handler(req, res);
          }
        }
        return router[0].handler(req, res);
      });

      server.listen(...arguments);
    }
  };
}

module.exports = createApplication;
