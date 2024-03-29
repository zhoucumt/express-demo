// let express = require('express');
// let app = express();
// app.use(express.static(__dirname))
// app.listen(3000)

// 后端代码
let express = require('express')
let app = express()
let whitList = ['http://127.0.0.1:5501', 'http://127.0.0.1:4000'] //设置白名单
app.use(function(req, res, next) {
  let origin = req.headers.origin
  if (whitList.includes(origin)) {
    // 设置哪个源可以访问我
    res.setHeader('Access-Control-Allow-Origin', origin)
    // 允许携带哪个头访问我
    res.setHeader('Access-Control-Allow-Headers', 'name')
    // 允许哪个方法访问我
    res.setHeader('Access-Control-Allow-Methods', 'PUT')
    // 允许携带cookie
    res.setHeader('Access-Control-Allow-Credentials', true)
    // 预检的存活时间
    res.setHeader('Access-Control-Max-Age', 6)
    // 允许返回的头
    res.setHeader('Access-Control-Expose-Headers', 'name')
    if (req.method === 'OPTIONS') {
      res.end() // OPTIONS请求不做任何处理
    }
  }
  next()
})
app.put('/getData', function(req, res) {
  let data = {
      username : 'zs',
      password : 123456
  }
  console.log('===req.headers====')
  console.log(req.headers)
  res.setHeader('name', 'jw') //返回一个响应头，后台需设置
  res.end(JSON.stringify(data))
})
app.get('/getData', function(req, res) {
  // console.log(req.headers)
  res.end('he')
})
app.listen(4000)
