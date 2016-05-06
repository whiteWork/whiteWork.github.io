/**
 * Created by wanjie on 2015/10/1.
 */
function addMouseWheel(obj, fn) {
    //判断浏览器
    if (navigator.userAgent.toLowerCase().indexOf("firefox") != -1) {
        obj.addEventListener('DOMMouseScroll',fnWheel,false);
    } else {
        obj.onmousewheel = fnWheel;
    }

    function fnWheel(ev) {
        var oEvt = ev || event;
        var down = true;
        //确定方向
        if (oEvt.wheelDelta) {
            down = oEvt.wheelDelta < 0 ? true : false;
        } else {
            down = oEvt.detail > 0 ? true : false;
        }
        //回调函数,将obj和down传给fn
        fn(obj,down);

        oEvt.preventDefault && oEvt.preventDefault();
        return false;
    }
}