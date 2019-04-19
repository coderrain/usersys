var express = require('express');
var app = express();
var bodyParser =require('body-parser')

app.use(express.static('./'))

app.use(bodyParser.urlencoded({
   extended: false,                 //扩展模式
   limit:    2*1024*1024           //限制-2M
 }));

app.post('/login', function(req, res, next){
	if(req.body.username == 'admin' &&req.body.password == '123456'){
		return res.json({
			code:1, 
			data: {
				username: 'admin',
				sex: '男',
				age: 23
			}
		})
	}else{
		res.json({
			code: 0,
			data: {},
			msg: 'error'
		})
	}
})

app.get('/login', function(req, res, next){
	if(req.query.username == 'admin' &&req.query.password == '123456'){
		return res.json({
			code:1, 
			data: {
				username: 'admin',
				sex: '男',
				age: 23
			}
		})
	}else{
		res.json({
			code: 0,
			data: {},
			msg: 'error'
		})
	}
})

app.listen(8080, function(){
	console.log('服务启动');
})