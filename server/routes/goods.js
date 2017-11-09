var express = require('express');
var router = express.Router();

//1.include mongoose in project
var mongoose = require('mongoose');  
var Goods = require('../models/goods');

//2.open a collection to the DB
mongoose.connect('mongodb://127.0.0.1:27017/dumall');

let db = mongoose.connection;
db.once("open",()=>{
    console.log("connection success");
});
db.on("err",console.error.bind(console,"connection error"));

/* GET home page. */
router.get('/', (req, res, next)=>{
//   res.render('index', { title: 'Express' });
    //  res.send("数据库response");
    let page = parseInt(req.param("page"));
    let pageSize = parseInt(req.param("pageSize"));
    var sort = parseInt(req.param("sort"));

    // let page = parseInt(req.params.page);
    // let pageSize = parseInt(req.params.pageSize);
    // var sort = parseInt(req.params.sort);
    let skip = (page-1)*pageSize;
    var params = {};
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    goodsModel.sort({'salePrice':sort});
    goodsModel.exec((err,doc)=>{
        if(err){
            res.json({
                status:'1',
                msg:err.message
            });
        }else{
            res.json({
                status:'0',
                msg:'',
                result:{
                    count:doc.length,
                    list:doc
                }
            })
        }
    })
});

module.exports = router;
