
//title字体动起来

function scroll() { 
	//获取title信息。 
	var titleInfo = document.title; 
	//获取title第一个汉字（数字、字母）
	var firstInfo = titleInfo.charAt(0);
	//获取第二位到最后的信息。
	var lastInfo = titleInfo.substring(1, titleInfo.length);
	//拼接输出信息
	document.title = lastInfo + firstInfo;
}

	setInterval("scroll()", 500);

//welcome 字体逐一显示
function show_font(){
	var num=0;
    var oWel=document.getElementById('welcome');
    var str="welcome to my website!"
    setInterval(function(){

        if(num==120){
            num=0
        }else{
        	oWel.innerHTML=str.substring(0,num+1);
            num=num+1;
        }
    },40);
}

window.onload=function(){
	show_font();
}




