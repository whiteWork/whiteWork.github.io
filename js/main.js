/**
 * Created by wanjie on 2015/11/11.
 */


define(function (require, exports, module) {
    var $ = require("zQuery.js").$;
    console.log(require.resolve("zQuery.js"));
    //console.log(module.id);
    console.log(module.uri == module.id);
    var pageSwitch = require("page.js").pageSwitch;
    var oActive = $("#elastic .active").get(0);
    var speed = 0;
    var left = 0;
    var i = 0;
    var j = 1;
    var iNow = 0;
    var aCardHead = $(".nav ul li");
    var aCardBody = $(".tab_item");

    function tabSwitch() {
        aCardHead.click(function () {
            if (oActive == this) return;
            iNow = $(this).index();
            aCardBody.removeClass("cur");
            $(aCardBody.get($(this).index())).addClass("cur");
            if (iNow == 1) {
                pageSwitch();
            }

        });
    }
    exports.tabSwitch = tabSwitch;

    function move(obj, iTarget) {
        i+=2;
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

    function hover() {
        $("#elastic li").mouseover(function() {
            if (oActive == this) return;
            move(oActive, this.offsetLeft);
        });

        $("#elastic li").mouseout(function() {
            if (oActive == this) return;
            move(oActive, aCardHead.get(iNow).offsetLeft);
        });
    }

    exports.hover = hover;


    function calSize() {
        //不同屏幕尺寸自适应
        var clientW = document.documentElement.clientWidth;
        var clientH = document.documentElement.clientHeight;
        $(".jsmodule").get(0).style.marginTop = parseInt(50 / 1920 * clientW) + "px";
        $(".jsmodule").get(0).style.width = parseInt(944 / 1920 * clientW) + "px";
        var jsmoduleW = parseInt($(".jsmodule").css("width"));
        $(".jsmodule ul").get(0).style.width = parseInt(1200 / 944 * jsmoduleW) + "px";
        $(".jsmodule ul li").each(function (index, element) {
            element.style.width = parseInt(296 / 944 * jsmoduleW) + "px";
            element.style.height = parseInt(204 / 955 * clientH) + "px";
            element.style.lineHeight = parseInt(204 / 955 * clientH) + "px";
            element.style.marginRight = parseInt(28 / 944 * jsmoduleW) + "px";
            element.style.marginBottom = parseInt(40 / 944 * jsmoduleW) + "px";
            element.style.fontSize = parseInt(50 / 1920 * clientW) + "px";
        });
        var liW = parseInt($(".jsmodule ul li").css("width"));
        var liH = parseInt($(".jsmodule ul li").css("height"));
        $(".jsmodule ul li a").each(function (index, element) {
            element.style.marginTop = "1.69%";
            element.style.height = liH - 2 * 0.0169 * liW + "px";
        });
        $(".jsmodule .cardhead").css("top",parseInt(712 / 955 * clientH) + "px");;
    }

    exports.calSize = calSize;
});