/**
 * Created by wanjie on 2015/9/30.
 */
function move(obj, attr, iTarget, time) {
    var start = parseFloat(getStyle(obj, attr));
    var dis = iTarget - start;
    var count = Math.round(time / 30);
    var n = 0;

    clearInterval(obj[attr + "timer"]);
    obj[attr + "timer"] = setInterval(function () {
        n++;

        if (attr == 'opacity') {
            var opacity = start + n * dis / count;
            obj.style.opacity = opacity;
            obj.style.filter = "alpha(opacity=" + (opacity * 100) + ")";
        } else {
            obj.style[attr] = start + n * dis / count + 'px';
        }

        if (n == count) clearInterval(obj[attr + "timer"]);
    }, 30);
}

function getStyle(obj, attr) {
    return obj.currentStyle
            ? obj.currentStyle[attr]
            : getComputedStyle(obj, false)[attr];
}