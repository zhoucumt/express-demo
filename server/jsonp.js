var express = require('express');
var router = express.Router();
var app = express();
router.get('/say',function(req,res,next) {
 //要响应回去的数据
  let data = {
    username : 'zs',
    password : 123456
  }

  let {wd , callback} = req.query;
  console.log(wd);
  console.log(callback);
  // 调用回调函数 , 并响应
  res.end(`${callback}(${JSON.stringify(data)})`);
})
app.use(router);
app.listen(3005);
