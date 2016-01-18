var express = require("./server/node_modules/express/index");
var session=require("./server/node_modules/express-session/index");
var cookieParser = require('./server/node_modules/cookie-parser/index');
var ejs =require("./server/node_modules/ejs/lib/ejs");
var partials = require("./server/node_modules/express-partials/index");
var userDao = require("./server/Dao/userDao.js");
var app = express();
app.set("port",8888);
app.configure(function(){
    app.use(cookieParser());
    app.use(session({
        secret:"1234",
        name:"testmysession",
        cookie:{maxAge:6000000}
    }));
    app.set("views", __dirname + "/client/views");// 视图目录
    app.engine('html',ejs.__express);
    app.set("view engine", "html");//启动视图引擎
    app.use(express.logger("dev"));
    app.use(express.bodyParser());   //post请求的数据
    app.use(express.methodOverride());  //get.post请求转换
    app.use(app.router);    //路由分发
    app.use(express.static(__dirname+'/client/webapp'))    //根目录
    //app.use(express.favicon (__dirname+'/client/image/logogreen.png'));
    app.use(express.errorHandler());    //提示错误的
    app.use(partials());
});
app.listen(app.get('port'),function(req,resp){
    console.log(req)
});
//app.get('/client1.0.0/coupon/coupon_index.html',function(req,resp){
//    console.log(req)
//    resp.sendfile('./client1.0.0/coupon/coupon_index.html');
//});
//app.get('/client1.0.0/sts',function(req,resp){
//    resp.sendfile('./client/sts/sts_index.html');
//});
//app.get('/client1.0.0/common',function(req,resp){
//    resp.sendfile('./client/common/common_head.html');
//});
//app.get('/client1.0.0/drag',function(req,resp){
//    resp.sendfile('./client/common/drag.html');
//});