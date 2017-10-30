// 演示commonjs规范
// module.exports = {
//     userName:'Jack',
//     sayHello(){
//         return 'hello'
//     }
// }

//上下两种方式的功能都是一样的，
//module.exports 返回的是一个对象，exports. 暴露一个key
exports.userName = 'Tom';
exports.sayHello = function(){
    return 'words';
}