var ajax = function(dataStr){
	var xhr = new XMLHttpRequest();
	xhr.open('get','/login?'+ dataStr, false);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			success(xhr.responseText);
		}else{
			error('请求失败')
		}
	}
	xhr.send(null);
}


var ajax = (function(){
	return function(options){
		var url = options.url;
		var type = options.type || 'get';
		var sync = options.sync || false;
		var data = options.data || {};
		var success = options.success || function(){};
		var error = options.error || function(){};

		var dataStr = '?';
		for(var key in data){
			dataStr += key + '=' + data[key] + '&';
		}

		var xhr = new XMLHttpRequest();
		if(type=='get'){
			xhr.open(type, url + dataStr, sync);
		}else{
			xhr.open(type, url, sync);
		}
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				success(xhr.responseText);
			}else{
				error('请求失败')
			}
		}

		if(type=='get'){
			xhr.send(null);
		}else{
			xhr.send(dataStr.slice(1));
		}
	}
})()

/*ajax({
	url: '/login',
	type: 'get',
	sync: false,
	data: '?username=admin',
	success: function(){
		alert(1)
	},
	error: function(){
		alert(2)
	}
})*/


/*ajax({
	url: '/reg',
	type: 'get',
	sync: false,
	data: '?username=admin',
	success: function(){

	},
	error: function(){

	}
})
*/

