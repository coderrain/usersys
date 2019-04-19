var express = require('express');
var app = express();

app.use(express.static('./'))

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