/**
 * Created by wanjie on 2015/10/1.
 */
function addMouseWheel(obj, fn) {
    //�ж������
    if (navigator.userAgent.toLowerCase().indexOf("firefox") != -1) {
        obj.addEventListener('DOMMouseScroll',fnWheel,false);
    } else {
        obj.onmousewheel = fnWheel;
    }

    function fnWheel(ev) {
        var oEvt = ev || event;
        var down = true;
        //ȷ������
        if (oEvt.wheelDelta) {
            down = oEvt.wheelDelta < 0 ? true : false;
        } else {
            down = oEvt.detail > 0 ? true : false;
        }
        //�ص�����,��obj��down����fn
        fn(obj,down);

        oEvt.preventDefault && oEvt.preventDefault();
        return false;
    }
}