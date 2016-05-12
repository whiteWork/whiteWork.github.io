/**
 * Created by wenxuan on 2015/3/19.
 */
function getStyle(obj,name){
    return (obj.currentStyle || getComputedStyle(obj,false))[name];
}
function move(obj,json,options){
    options=options || {};
    options.time=options.time || 700;
    options.type=options.type || 'ease-out';

    clearInterval(obj.timer);
    var count=Math.floor(options.time/30);
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
                case 'opacity':
                    start[name]=1;
                    break;
                case 'marginLeft':
                    start[name]=0;
                    break;
                case 'fontSize':
                    start[name]=12;
                    break;
            }
        }
        dis[name]=json[name]-start[name];
    }


    var n=0;
    obj.timer=setInterval(function(){
        n++;

        for(var name in json){
            switch(options.type){
                case 'linear':
                    var a=n/count;
                    var cur=start[name]+dis[name]*a;
                    break;
                case 'ease-in':
                    var a=n/count;
                    var cur=start[name]+dis[name]*Math.pow(a,3);
                    break;
                case 'ease-out':

                    var a=1-n/count;

                    var cur=start[name]+dis[name]*(1-Math.pow(a,3));
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
            options.end && options.end();
        }
    },30);
}

function getStyle(obj, attr)
{
    if(obj.currentStyle)
    {
        return obj.currentStyle[attr];
    }
    else
    {
        return getComputedStyle(obj, false)[attr];
    }
}

function startMove(obj, attr, pos,fn)
{
    clearInterval(obj.timer);
    obj.timer=setInterval(function (){
        var sign=parseInt(getStyle(obj, attr));
        var speed=(pos-sign)/8;
        speed=speed>0?Math.ceil(speed):Math.floor(speed);
        if(sign==pos){
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
        }
        obj.style[attr]=sign+speed+'px';
    }, 30)
}