/**
 * Created by wanjie on 2015/11/11.
 */
define(function (require, exports, module) {
    var $ = require("zQuery.js").$;
    /*
    * 1.布局转换
    * 2.点击时设定定时器分步收缩幻灯片，从最底下开始收
    * 3.准备好数据
    * 4.设定定时器分步放出幻灯片，从最底下开始放
    * */
    var aHref = ["tab","angularProj/webqq/login","gravity","drag","nowTV","zoom","distance","apple","chromeApps","circle","wph","live", "weibo/weibo", "wish/index","lagou","mynav", "comment/star","collTest"];
    var aSrc = ["tab.png","webqq.png","chrome-logo.jpg","drag.png","nowtv.png","zoom.png","distance.png","apple.png","chromeapps.png", "circle.png","wph.png","live.png","weibo.png","wish.png","lagou.png","mynav.png","star.png","collTest.png"];
    var aText = ["无缝轮播图","仿webQQ","自由落体运动","拖拽改变大小","自定义滚动条","商品放大镜","距离感应","仿苹果菜单","仿谷歌商店","圆形菜单","吸顶条","事件委托/代理","微博评论","许愿墙","拉钩导航","收藏网址","星星评分","碰撞检测"];
    var ready = true;

    function pageSwitch() {
        var aLi = $(".jsmodule ul li");
        var iNow = 1;
        //1.布局转换
        var aPos = [];

        aLi.each(function (index, element) {
            aPos.push({
                left: element.offsetLeft,
                top: element.offsetTop,
                width: element.offsetWidth,
                height: element.offsetHeight,
                opacity: 1
            });
            element.style.left = aPos[index].left + "px";
            element.style.top = aPos[index].top + "px";
        });

        aLi.each(function (index,element) {
            element.style.position = "absolute";
            element.style.margin = "0";
            //element.innerHTML = arr[index];
            element.children[0].href = "pages/js_module/" + aHref[index] + ".html";
            element.children[0].children[0].src = "images/" + aSrc[index];
            element.children[0].children[1].innerHTML = aText[index];
        });


        //2.点击时设定定时器分步收缩幻灯片，从最底下开始收
        var aBtn = $(".jsmodule .cardhead a");
        var oBox = $(".jsmodule");
        var oDiv = $(".jsmodule .cardhead");
        aBtn.click(function () {
            if (!ready) return;
            ready = false;
            //点到不同按钮，分步的效果都一样，只是准备的数据不一样
            if (this == aBtn.get(0)) {
                //上一页
                if (iNow == 1) {
                    ready = true;
                    return;
                }
                iNow--;
                aBtn.removeClass("active");
                $(aBtn.get(iNow)).addClass("active");
                autoPage();

            } else if (this == aBtn.get(aBtn.elements.length - 1)) {
                //下一页
                if (iNow == 2) {
                    ready = true;
                    return;
                }
                iNow++;
                aBtn.removeClass("active");
                $(aBtn.get(iNow)).addClass("active");
                autoPage();

            } else if ($(this).index() == iNow) {
                //点的是自己，直接return
                ready = true;
                return;
            } else {
                //点的是具体某一页
                //修改按钮样式
                aBtn.removeClass("active");
                $(this).addClass("active");
                iNow = $(this).index();
                autoPage();
            }
        });

        function autoPage(n) {
            var i = aLi.elements.length - 1;
            var timer = setInterval(function () {
                (function (index) {
                    $(aLi.get(index)).animate({
                        left: oBox.get(0).offsetWidth / 2,
                        top: oDiv.get(0).offsetTop,
                        width: 0,
                        height: 0,
                        opacity: 0
                    }, {easing: $.Tween.Sine.easeOut,complete: function () {
                        if (index == 0) {
                            //3.准备数据
                            aLi.each(function (index,element) {
                                element.children[0].href = "pages/js_module/" + aHref[(iNow - 1) * 9 + index] + ".html";
                                element.children[0].children[0].src = "images/" + aSrc[(iNow - 1) * 9 + index];
                                element.children[0].children[1].innerHTML = aText[(iNow - 1) * 9 + index];
                            });
                            //4.设定定时器分步放出幻灯片，从最底下开始放
                            show();
                        }
                    }});
                })(i);
                i--;
                if (i == -1) {
                    clearInterval(timer);
                }
            }, 150);
        }

        function show() {
            var i = aLi.elements.length - 1;
            var timer = setInterval(function () {
                $(aLi.get(i)).animate(aPos[i], {easing: $.Tween.Sine.easeOut});
                i--;
                if (i == -1) {
                    clearInterval(timer);
                    ready = true;
                }
            }, 150);
        }
    }

    exports.pageSwitch = pageSwitch;
});