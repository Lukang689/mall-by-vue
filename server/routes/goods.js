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
    let priceLevel = req.param("priceLevel");
    let sort = parseInt(req.param("sort"));

    // let page = parseInt(req.params.page);
    // let pageSize = parseInt(req.params.pageSize);
    // var sort = parseInt(req.params.sort);
    let skip = (page-1)*pageSize;
    var priceGt="",priceLte="";
    var params = {};
    if(priceLevel!='all'){
        switch(priceLevel){
            case '0':priceGt = 0;priceLte = 100;break;
            case '1':priceGt = 100;priceLte = 500;break;
            case '2':priceGt = 500;priceLte = 1000;break;
            case '3':priceGt = 1000;priceLte = 5000;break;
        }
        params = {
            salePrice:{
                $gt:priceGt,
                $lte:priceLte
            }
        }
    };
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    goodsModel.sort({ 'salePrice': sort });
    goodsModel.exec((err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
});

module.exports = router;
