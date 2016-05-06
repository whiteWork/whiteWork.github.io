/**
 * Created by wanjie on 2015/11/10.
 */
define(function (require, exports, module) {
    var $ = require("zQuery.js").$;
    var oActive = $("#elastic .active").get(0);
    var speed = 0;
    var left = 0;
    var i = 0;
    var j = 1;




    function move(obj, iTarget) {
        i+=2;
        console.log("i:" +i);
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            //加速度
            speed += (iTarget - left)/5;
            //摩擦
            speed *= .7;
            //重新计算left
            left += speed;
            //document.title = iTarget.toFixed(0) + "|" + left.toFixed(0) + "|" + speed.toFixed(0);
            obj.style.left = Math.round(left) + "px";

            //判断是否需要清掉定时器
            if (obj.offsetLeft == iTarget && Math.abs(speed) < 1) {
                clearInterval(obj.timer);
            }
        }, 30);
    }

    exports.hover = function () {
        $("#elastic li").mouseover(function() {
            if (oActive == this) return;
            move(oActive, this.offsetLeft);
        });
    };
});