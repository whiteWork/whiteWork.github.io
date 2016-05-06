/**
 * Created by wanjie on 2015/11/8.
 */
seajs.use(["lagou.js","main.js", "page.js"], function(lagouMod, mainMod, pageMod) {
    mainMod.calSize();
    mainMod.hover();
    mainMod.tabSwitch();
    lagouMod.lagou();
    lagouMod.show();

});
