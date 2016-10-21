/*window.onload = function(){
	//回到顶部
	(function(){
		if($(window).scrollTop()>200){
			$('#go_top').show()
		}else{
			$('#go_top').hide()
		}
		$(window).scroll(function(){
			if($(window).scrollTop()>200){
				$('#go_top').show()
			}else{
				$('#go_top').hide()
			}
		});
		$('#go_top').on('click',function(){
			$('body,html').animate({scrollTop:0},600); 
			return false;
		});
	})();


}*/


//回到顶部
function goTop(obj){

	if($(window).scrollTop()>200){
		$(obj).show()
	}else{
		$(obj).hide()
	}
	$(window).scroll(function(){
		if($(window).scrollTop()>200){
			$(obj).show()
		}else{
			$(obj).hide()
		}
	});
	$(obj).on('click',function(){
		$('body,html').animate({scrollTop:0},600); 
		return false;
	});
}
addEvent(window,'load',function(){
	document.body.addEventListener('touchstart', function () { });
})

/*获取class*/
function getByClass(oParent,sClass){
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);
	}else{
		var arr=[];
		//var reg=//bsClass/b/;
		var reg=new RegExp('//b'+sClass+'//b');
		var aEle=oParent.getElementsByTagName('*');
		for(var i=0; i<aEle.length; i++){
			if(reg.test(aEle[i].className)){
				arr.push(aEle[i]);	
			}
		}
		return arr;
	}
}

/*查看class*/
function hasClass(obj,sClass){
	var reg=new RegExp('\\b'+sClass+'\\b');
	return reg.test(obj.className);
}

/*添加class*/
function addClass(obj,sClass){
	if(obj.className){
		if(!hasClass(obj,sClass)){
			obj.className+=' '+sClass;
		}	
	}else{
		obj.className=sClass;	
	}
}

/*移除class*/
function removeClass(obj,sClass){
	var reg=new RegExp('\\b'+sClass+'\\b','g');
	if(hasClass(obj,sClass)){
		obj.className=obj.className.replace(reg,'').replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
	}
}


/*绝对位置*/
function getPos(obj){
	var top = 0;
	var left = 0;
	while(obj){
		top+=obj.offsetTop;
		left+=obj.offsetLeft;
		obj=obj.offsetParent;
	}
	return {l:left,t:top}
}

/*事件绑定*/
function addEvent(obj,sEvent,fn){
	if(obj.addEventListener){
		//高级
		obj.addEventListener(sEvent,fn,false);
	}else{
		//ie
		obj.attachEvent('on'+sEvent,fn);
	}
}

//补零
function toDou(iNum){
	if(iNum<10){
		return '0'+iNum;
	}else{
		return iNum;
	}
}

//提示弹窗
function tishi(txt,time,fn){
	var oDiv = document.createElement('div');
	time = time||3000;
	oDiv.id='alertBox';
	document.body.appendChild(oDiv);
	$(oDiv).html(txt).css({
        'bottom':'100px',
        'opacity':1,
    })
    setTimeout(function(){
    	move(oDiv,{bottom:60,opacity:0},{duration:600,complete:function(){
    		document.body.removeChild(oDiv);
    		fn&&fn();
    	}})
    }, time);
}



//运动开始
function getStyle(obj,name){
	return (obj.currentStyle || getComputedStyle(obj,false))[name];
}
function move(obj,json,options){
	//考虑默认值
	options=options || {};
	options.duration=options.duration || 300;
	options.easing=options.easing || 'ease-out';
	
	var count=Math.round(options.duration/30);
	var start={};
	var dis={};
	for(var name in json){
		start[name]=parseFloat(getStyle(obj,name));
		if(isNaN(start[name])){
			switch(name){
				case 'left':
					start[name]=obj.offsetLeft;
					break;
				case 'top':
					start[name]=obj.offsetTop;
					break;
				case 'width':
					start[name]=obj.offsetWidth;
					break;
				case 'height':
					start[name]=obj.offsetHeight;
					break;
				case 'marginLeft':
					start[name]=obj.offsetLeft;
					break;
				case 'borderWidth':
					start[name]=0;
					break;
				//...
			}
		}
		dis[name]=json[name]-start[name];
	}
	
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		
		for(var name in json){
			switch(options.easing){
				case 'linear':
					var a=n/count;
					var cur=start[name]+dis[name]*a;
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[name]+dis[name]*a*a*a;
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[name]+dis[name]*(1-a*a*a);
					break;
			}
			
			if(name=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}else{
				obj.style[name]=cur+'px';
			}
		}
		
		if(n==count){
			clearInterval(obj.timer);
			options.complete && options.complete.call(obj);
		}
	},30);
}
//运动结束