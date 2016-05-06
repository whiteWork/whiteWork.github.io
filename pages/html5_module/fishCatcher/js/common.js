//版权 北京智能社©, 保留所有权利

function loadImgs(json, fn){
	var count=0;	//加载完成
	var len=0;		//总数——替代“json.length”
	
	var result={};
	
	for(var name in json){
		len++;
		//name			名字	'fish1'、'bottom'
		//json[name]	地址	'img/fish1.png'
		
		var oImg=new Image();
		result[name]=oImg;
		
		oImg.src=json[name];
		
		oImg.onload=function (){
			count++;
			
			if(count==len)
			{
				fn(result);
			}
		};
	}
}

function d2a(n){
	return n*Math.PI/180;
}

function a2d(n){
	return n*180/Math.PI;
}

function rnd(n, m){
	return Math.floor(Math.random()*(m-n)+n);
}