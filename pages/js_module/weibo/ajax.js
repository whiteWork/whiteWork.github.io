//版权 北京智能社©, 保留所有权利

/*
url, data, type, timeout, success, error
*/

function ajax(options)
{
	options=options||{};
	options.data=options.data||{};
	options.type=options.type||'get';
	options.timeout=options.timeout||0;
	
	options.data.t=Math.random();
	
	//data->'sss&ddd&xxx'
	var arr=[];
	for(var i in options.data)
	{
		//arr.push(i+'='+data[i]);
		arr.push(i+'='+encodeURIComponent(options.data[i]));
	}
	var str=arr.join('&');
	
	//1.创建
	if(window.XMLHttpRequest)
	{
		var oAjax=new XMLHttpRequest();
	}
	else
	{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	//2.连接
	//alert(url+'?'+str);
	if(options.type=='get')
	{
		oAjax.open('get', options.url+'?'+str, true);
		oAjax.send();
	}
	else
	{
		oAjax.open('post', options.url, true);
		
		oAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		//oAjax.setRequestHeader('名字', '值');
		
		oAjax.send(str);
	}
	
	//4.接收
	oAjax.onreadystatechange=function ()
	{
		if(oAjax.readyState==4)
		{
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304)
			{
				options.success && options.success(oAjax.responseText);
			}
			else
			{
				options.error && options.error();
			}
		}
	};
	
	if(options.timeout)
	{
		//超时
		setTimeout(function (){
			oAjax.abort();
		}, options.timeout);
	}
}











