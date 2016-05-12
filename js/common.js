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
