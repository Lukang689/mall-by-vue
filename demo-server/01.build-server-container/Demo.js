// 演示commonjs规范
let user = require('./User');

console.log(`I am ${user.userName},I say ${user.sayHello()}`);

let http = require('http');
let url = require('url');
let util = require('util')

let server = http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader("Content-Type","text/plain;charset=utf-8");
    console.log(`url:${req.url}`);  //demo.html?a=123
    console.log(`parse:${url.parse(req.url)}`); //[object]
    let p = url.parse(req.url);
    console.log(`inspect:${util.inspect(p)}`) //会把键值对打印出来
    res.end("hello node.js")
})

server.listen(3300,'127.0.0.1',()=>{
    console.log("服务器已经运行！输入端口3000进行访问")
})