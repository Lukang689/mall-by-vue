//通过一个 http server容器来访问index.html

let http = require('http');
let url = require('url');
let util = require('util');
let fs = require('fs');


let server = http.createServer((req,res)=>{
    // res.statusCode = 200;
    // res.setHeader("Content-Type","text/plain;charset=utf-8");
    //这里主要实现通过fs模块来读取index.html文件
    let pathname = url.parse(req.url).pathname;
    console.log("pathname:"+pathname);
    console.log("substring:"+pathname.substring(1))
    //substring()参数为左闭右开，参数2可省略即到最后一个字符
    fs.readFile(pathname.substring(1),(err,data)=>{  
        if(err){
            res.writeHead(404,{
                'Context-Type':'text/html'
            });
        }else{
            res.writeHead(200,{
                'Context-Type':'text/html'
            });
            res.write(data.toString())
        }
        res.end();
    });  
  
})

server.listen(3000,'127.0.0.1',()=>{
    console.log("服务器已经运行！输入端口3000进行访问")
})