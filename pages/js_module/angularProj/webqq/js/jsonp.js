/**
 * Created by wanjie on 2015/10/29.
 */
function jsonp(options) {
    //url,data,cbName,success,error,timeout
    options = options || {};
    if (!options.url) {
        return;
    }
    options.data = options.data || {};
    options.cbName = options.cbName || "cb";
    options.timeout = options.timeout || 0;

    var fnName = ("jsonp_" + Math.random()).replace(".", "");
    options.data[options.cbName] = fnName;
    var arr = [];
    for (var key in options.data) {
        arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(options.data[key]));
    }
    options.url += "?" + arr.join("&");
    //alert(options.url);

    var oScript = document.createElement("script");

    window[fnName] = function (json) {
        clearTimeout(timer);
        options.success && options.success(json);
        delete window[fnName];
        oScript.parentNode.removeChild(oScript);
    };

    oScript.src = options.url;
    //alert(1);
    document.body.appendChild(oScript);
    //alert(2);

    if (options.timeout) {
        var timer = setTimeout(function () {
            options.error && options.error();
            window[fnName] = function () {
                delete window[fnName];
            };
            oScript.parentNode.removeChild(oScript);
        }, options.timeout);
    }
}