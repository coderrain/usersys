var express = require('express');
var app = express();
var bodyParser =require('body-parser')
var fs = require('fs')

app.use(express.static('./'))

app.use(bodyParser.urlencoded({
   extended: false,                 //扩展模式
   limit:    2*1024*1024           //限制-2M
 }));

app.post('/login', function(req, res, next){
	/*if(req.body.username == 'admin' &&req.body.password == '123456'){
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
	}*/
	fs.readFile('./user.json', function(err, data){
		data = JSON.parse(data);
		for(var i=0;i<data.length;i++){
			if(data[i].username == req.body.username){
				if(data[i].password == req.body.password){
					return res.json({
						code: 1,
						data: data[i]
					})
				}
			}
		}
		res.json({
			code: 0,
			data: {},
			msg: '登录失败'
		})
	})
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


app.post('/reg', function(req,res,next){
	var {username,password,sex,age,email,iphone} = req.body;
	fs.readFile('./user.json', function(err, data){
		data = JSON.parse(data);
		for(var i=0;i<data.length;i++){
			if(data[i].username == username){
				return res.json({
					code: 0,
					error: '用户名存在'
				})
			}
		}
		data.push({
			username,
			password,
			sex,
			age,
			email,
			iphone
		})
		fs.writeFile('./user.json', JSON.stringify(data), function(err,data){
			if(err){
				return res.json({
					code: 0,
					msg: '注册失败'
				})
			}
			res.json({
				code: 1,
				msg: '注册成功'
			})
		})
	})
})

app.listen(8080, function(){
	console.log('服务启动');
})