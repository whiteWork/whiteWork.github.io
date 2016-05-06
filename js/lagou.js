/**
 * Created by wanjie on 2015/11/8.
 */
define(function (require, exports, module) {

    var $ = require("zQuery.js").$;
    var getByClass = require("zQuery.js").getByClass;
    function show() {
        $(".jsmodule li").hover(fnMouseenter, fnMouseleave);
        function fnMouseenter(ev) {
            var oEvent = ev || event;
            var oFrom = oEvent.fromElement || oEvent.relatedTarget;
            if (oFrom && this.contains(oFrom)) {
                return;
            }
            var oCover = this.children[0].children[1];
            $(oCover).animate({
                width: 296,
                height: 204,
                marginLeft: -148,
                marginTop: -102,
                fontSize: 24,
                lineHeight: 204,
                opacity: 1
            });
        }
        function fnMouseleave(ev) {
            var oEvent = ev || event;
            var toElem = oEvent.toElement || oEvent.relatedTarget;
            if (toElem && this.contains(toElem)) return;
            var oCover = this.children[0].children[1];

            $(oCover).animate({
                width: 0,
                height: 0,
                marginLeft: 0,
                marginTop: 0,
                fontSize: 0,
                lineHeight: 0,
                opacity: 0
            });
        }
    }
    function lagou() {
        var easing = $.Tween.Sine.easeOut;
        var duration = 500;
        $(".container li").hover(function (ev) {
            var oEvent = ev || event;
            var oFrom = oEvent.fromElement || oEvent.relatedTarget;
            if (oFrom && this.contains(oFrom)) {
                return;
            }
            var pos = getDir(this, oEvent);
            //oBox.innerHTML = arc;
            /*
             * 0 左 1 下 2 右 3 上
             * */
            var oCover = getByClass(this, "cover")[0];
            switch (pos) {
                case 0 :
                    oCover.style.left = "-140px";
                    oCover.style.top = "0";
                    break;
                case 1 :
                    oCover.style.left = "0";
                    oCover.style.top = "140px";
                    break;
                case 2 :
                    oCover.style.left = "140px";
                    oCover.style.top = "0";
                    break;
                case 3 :
                    oCover.style.left = "0";
                    oCover.style.top = "-140px";
                    break;
            }
            $(oCover).animate({left: 0, top: 0}, {duration: duration, easing: easing});
        },function (ev) {
            var oEvent = ev || event;
            var oTo = oEvent.toElement || oEvent.relatedTarget;
            if (oTo && this.contains(oTo)) {
                return;
            }
            var pos = getDir(this, oEvent);
            //oBox.innerHTML = arc;
            /*
             * 0 左 1 下 2 右 3 上
             * */
            var oCover = getByClass(this, "cover")[0];
            switch (pos) {
                case 0 :
                    $(oCover).animate({left: -140, top: 0}, {duration: duration, easing: easing});
                    break;
                case 1 :
                    $(oCover).animate({left: 0, top: 140}, {duration: duration, easing: easing});
                    break;
                case 2 :
                    $(oCover).animate({left: 140, top: 0}, {duration: duration, easing: easing});
                    break;
                case 3 :
                    $(oCover).animate({left: 0, top: -140}, {duration: duration, easing: easing});
                    break;
            }
        });

        $(".h5container li").hover(function (ev) {
            var oEvent = ev || event;
            var oFrom = oEvent.fromElement || oEvent.relatedTarget;
            if (oFrom && this.contains(oFrom)) {
                return;
            }
            var pos = getDir(this, oEvent);
            //oBox.innerHTML = arc;
            /*
             * 0 左 1 下 2 右 3 上
             * */
            var oCover = getByClass(this, "cover")[0];
            switch (pos) {
                case 0 :
                    oCover.style.left = "-410px";
                    oCover.style.top = "0";
                    break;
                case 1 :
                    oCover.style.left = "0";
                    oCover.style.top = "260px";
                    break;
                case 2 :
                    oCover.style.left = "410px";
                    oCover.style.top = "0";
                    break;
                case 3 :
                    oCover.style.left = "0";
                    oCover.style.top = "-260px";
                    break;
            }
            $(oCover).animate({left: 0, top: 0}, {duration: duration, easing: easing});
        },function (ev) {
            var oEvent = ev || event;
            var oTo = oEvent.toElement || oEvent.relatedTarget;
            if (oTo && this.contains(oTo)) {
                return;
            }
            var pos = getDir(this, oEvent);
            //oBox.innerHTML = arc;
            /*
             * 0 左 1 下 2 右 3 上
             * */
            var oCover = getByClass(this, "cover")[0];
            switch (pos) {
                case 0 :
                    $(oCover).animate({left: -410, top: 0}, {duration: duration, easing: easing});
                    break;
                case 1 :
                    $(oCover).animate({left: 0, top: 260}, {duration: duration, easing: easing});
                    break;
                case 2 :
                    $(oCover).animate({left: 410, top: 0}, {duration: duration, easing: easing});
                    break;
                case 3 :
                    $(oCover).animate({left: 0, top: -260}, {duration: duration, easing: easing});
                    break;
            }
        });

        function getDir(obj, oEvent) {
            var y = obj.offsetTop + obj.offsetHeight / 2 - oEvent.clientY;
            var x = oEvent.clientX - obj.offsetLeft - obj.offsetWidth / 2;
            return Math.round((Math.atan2(y, x) * 180 / Math.PI + 180)/90) % 4;
        }
    }
    exports.lagou = lagou;
    exports.show = show;
});