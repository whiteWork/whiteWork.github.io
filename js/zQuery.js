/**
 * Created by 万劫 on 2015/11/2.
 */


//zQuery(str||function||oDiv||创建元素)
define(function (require, exports, module) {
    (function (window, undefined) {
        function zQuery(arg) {
            this.elements = [];
            if (typeof arg == "string") {
                if (arg.indexOf("<") != -1) {
                    this.domString = arg;
                } else {
                    this.elements = getElems(arg);
                }
            } else if (typeof arg == "function") {
                domReady(arg);
            } else if (typeof arg == "object") {
                if ("length" in arg) {
                    for (var i = 0; i < arg.length; i++) {
                        this.elements.push(arg[i]);
                    }
                } else {
                    this.elements.push(arg);
                }
            }
        }

        function $(arg) {
            return new zQuery(arg);
        }


        //css(name) 获取
        //css(name, value) 设置
        //css(object) 批量设置
        zQuery.prototype.css = function(name, value) {
            if (arguments.length == 2) {//设置
                for (var i = 0; i < this.elements.length; i++) {
                    this.elements[i].style[name] = value;
                }
            } else if (typeof name == "string") {//获取
                return getStyle(this.elements[0], name);
            } else {//批量设置
                for (var i = 0; i < this.elements.length; i++) {
                    for (var key in name) {
                        this.elements[i].style[key] = name[key];
                    }
                }
            }
        };

        //attr(name) 获取
        //attr(name, value) 设置
        //attr(object) 批量设置
        zQuery.prototype.attr = function(name, value) {
            if (arguments.length == 2) {//设置
                for (var i = 0; i < this.elements.length; i++) {
                    this.elements[i].setAttribute(name, value);
                }
            } else if (typeof name == "string") {//获取
                return this.elements[0].getAttribute(name);
            } else {//批量设置
                for (var i = 0; i < this.elements.length; i++) {
                    for (var key in name) {
                        this.elements[i].setAttribute(key, name[key]);
                    }
                }
            }
        };

        //get(index)
        zQuery.prototype.get = function (index) {
            return this.elements[index];
        };
        //eq
        zQuery.prototype.eq = function (index) {
            return $(this.elements[index]);
        };

        //index()
        zQuery.prototype.index = function () {
            var oParent = this.elements[0].parentNode;
            var aChild = oParent.children;
            for (var i = 0; i < aChild.length; i++) {
                if (aChild[i] == this.elements[0]) {
                    return i;
                }
            }
        };

        //show()
        zQuery.prototype.show = function () {
            for (var i = 0; i < this.elements; i++) {
                this.elements[i].style.display = "block";
            }
        };

        //hide()
        zQuery.prototype.hide = function () {
            for (var i = 0; i < this.elements; i++) {
                this.elements[i].style.display = "none";
            }
        };

        //addClass(sClass)
        zQuery.prototype.addClass = function (sClass) {
            var reg = new RegExp("\\b" + sClass + "\\b");
            for (var i = 0; i < this.elements.length; i++) {
                if (!reg.test(this.elements[i].className)) {
                    if (this.elements[i].className) {
                        this.elements[i].className += " " + sClass;
                    } else {
                        this.elements[i].className = sClass;
                    }
                }
            }
        };
        //removeClass(sClass)
        zQuery.prototype.removeClass = function (sClass) {
            var reg = new RegExp("\\b" + sClass +"\\b", "g");
            for (var i = 0; i < this.elements.length; i++) {
                this.elements[i].className = this.elements[i].className
                    .replace(reg, "")
                    .replace(/^\s+|\s+$/g, "")
                    .replace(/\s+/g, " ");
                if (!this.elements[i].className) {
                    this.elements[i].removeAttribute("class");
                }
            }

        };
        //hasClass(sClass)
        zQuery.prototype.hasClass = function (sClass) {
            var reg = new RegExp("\\b" + sClass + "\\b","g");
            for (var i = 0; i < this.elements.length; i++) {
                if (reg.test(this.elements[i].className)) {
                    return true;
                }
            }
            return false;
        };
        //toggleClass
        zQuery.prototype.toggleClass = function (sClass) {
            if (this.hasClass(sClass)) {
                this.removeClass(sClass);
            } else {
                this.addClass(sClass);
            }
        };

        //find(str)
        zQuery.prototype.find = function (str) {
            var aParent = this.elements;
            var aChild = getElems(str, aParent);
            return $(aChild);
        };

        //事件
        var events = "click|mouseover|mouseout|mousemove|mousedown"
            + "|mouseup|change|readystatechange|scroll|resize"
            + "|contextmenu|keydown|keyup|focus|blur|submit|load";
        events.replace(/\w+/g, function(sEvt) {
            zQuery.prototype[sEvt] = function (fn) {
                for (var i = 0; i < this.elements.length; i++) {
                    addEvent(this.elements[i], sEvt, fn);
                }
            };
        });

        //bind(sEvt, fnHandler)
        zQuery.prototype.bind = function (sEvt, fnHandler) {
            for (var i = 0; i < this.elements.length; i++) {
                addEvent(this.elements[i], sEvt, fnHandler);
            }
        };

        //each(fn(index, element))
        zQuery.prototype.each = function (fn) {
            for (var i = 0; i < this.elements.length; i++) {
                fn.call(this.elements[i], i, this.elements[i]);
            }
        };
        //组件
        $.fn = zQuery.prototype;

        $.fn.extend = function (json) {
            for (var key in json) {
                $.fn[key] = json[key];
            }
        };

        //appendTo $().appendTo()
        //$("aa<div>创建div</div>").appendTo("#div1");
        $.fn.appendTo = function (str) {
            //找到要插入的位置
            var aParent = getElems(str);
            for (var i = 0; i < aParent.length; i++) {
                appendStr(aParent[i], this.domString);
            }
        };
        //去除首尾空格
        $.trim = function (str) {
            return str.replace(/^\s+|\s+$/g);
        };
        //ajax
        $.ajax = function(options) {
            if (options.dataType == "jsonp") {
                jsonp(options);
            } else {
                ajax(options);
            }
        };
        //animate
        $.fn.animate = function (targets, options) {
            for (var i = 0; i < this.elements.length; i++) {
                move(this.elements[i], targets, options);
            }
        };

        function move(obj, targets, options) {
            options = options || {};
            options.duration = options.duration || 600;
            options.easing = options.easing || $.Tween.Sine.easeOut;

            var start = {};
            var dis = {};
            var count = Math.round(options.duration / 30);
            var n = 0;

            for (var name in targets) {
                start[name] = parseFloat(getStyle(obj, name));
                dis[name] = targets[name] - start[name];
            }

            clearInterval(obj.timer);

            obj.timer = setInterval(function () {
                n++;

                for (var name in targets) {
                    /*
                     * easing函数的4个参数
                     * t: current time（当前时间）；
                     b: beginning value（初始值）；
                     c: change in value（变化量）；
                     d: duration（持续时间）。
                     * */
                    var cur = options.easing(n / count * options.duration, start[name], dis[name], options.duration);

                    if (name == "opacity") {
                        obj.style.opacity = cur;
                        obj.style.filter = "alpha(opacity:" + 100 * cur + ")";
                    } else {
                        obj.style[name] = cur + "px";
                    }
                }

                if (n == count) {
                    clearInterval(obj.timer);
                    options.complete && options.complete();
                }
            }, 30);
        }

        $.Tween = {
            Linear: function(t,b,c,d){ return c*t/d + b; },
            Quad: {
                easeIn: function(t,b,c,d){
                    return c*(t/=d)*t + b;
                },
                easeOut: function(t,b,c,d){
                    return -c *(t/=d)*(t-2) + b;
                },
                easeInOut: function(t,b,c,d){
                    if ((t/=d/2) < 1) return c/2*t*t + b;
                    return -c/2 * ((--t)*(t-2) - 1) + b;
                }
            },
            Cubic: {
                easeIn: function(t,b,c,d){
                    return c*(t/=d)*t*t + b;
                },
                easeOut: function(t,b,c,d){
                    return c*((t=t/d-1)*t*t + 1) + b;
                },
                easeInOut: function(t,b,c,d){
                    if ((t/=d/2) < 1) return c/2*t*t*t + b;
                    return c/2*((t-=2)*t*t + 2) + b;
                }
            },
            Quart: {
                easeIn: function(t,b,c,d){
                    return c*(t/=d)*t*t*t + b;
                },
                easeOut: function(t,b,c,d){
                    return -c * ((t=t/d-1)*t*t*t - 1) + b;
                },
                easeInOut: function(t,b,c,d){
                    if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
                    return -c/2 * ((t-=2)*t*t*t - 2) + b;
                }
            },
            Quint: {
                easeIn: function(t,b,c,d){
                    return c*(t/=d)*t*t*t*t + b;
                },
                easeOut: function(t,b,c,d){
                    return c*((t=t/d-1)*t*t*t*t + 1) + b;
                },
                easeInOut: function(t,b,c,d){
                    if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
                    return c/2*((t-=2)*t*t*t*t + 2) + b;
                }
            },
            Sine: {
                easeIn: function(t,b,c,d){
                    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
                },
                easeOut: function(t,b,c,d){
                    return c * Math.sin(t/d * (Math.PI/2)) + b;
                },
                easeInOut: function(t,b,c,d){
                    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
                }
            },
            Expo: {
                easeIn: function(t,b,c,d){
                    return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
                },
                easeOut: function(t,b,c,d){
                    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
                },
                easeInOut: function(t,b,c,d){
                    if (t==0) return b;
                    if (t==d) return b+c;
                    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
                    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
                }
            },
            Circ: {
                easeIn: function(t,b,c,d){
                    return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
                },
                easeOut: function(t,b,c,d){
                    return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
                },
                easeInOut: function(t,b,c,d){
                    if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
                    return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
                }
            },
            Elastic: {
                easeIn: function(t,b,c,d,a,p){
                    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                    if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
                    else var s = p/(2*Math.PI) * Math.asin (c/a);
                    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                },
                easeOut: function(t,b,c,d,a,p){
                    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                    if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
                    else var s = p/(2*Math.PI) * Math.asin (c/a);
                    return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
                },
                easeInOut: function(t,b,c,d,a,p){
                    if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
                    if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
                    else var s = p/(2*Math.PI) * Math.asin (c/a);
                    if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                    return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
                }
            },
            Back: {
                easeIn: function(t,b,c,d,s){
                    if (s == undefined) s = 1.70158;
                    return c*(t/=d)*t*((s+1)*t - s) + b;
                },
                easeOut: function(t,b,c,d,s){
                    if (s == undefined) s = 1.70158;
                    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
                },
                easeInOut: function(t,b,c,d,s){
                    if (s == undefined) s = 1.70158;
                    if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
                    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
                }
            },
            Bounce: {
                easeIn: function(t,b,c,d){
                    return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
                },
                easeOut: function(t,b,c,d){
                    if ((t/=d) < (1/2.75)) {
                        return c*(7.5625*t*t) + b;
                    } else if (t < (2/2.75)) {
                        return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
                    } else if (t < (2.5/2.75)) {
                        return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
                    } else {
                        return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
                    }
                },
                easeInOut: function(t,b,c,d){
                    if (t < d/2) return Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
                    else return Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
                }
            }
        };
        // toggle click
        $.fn.toggle = function () {
            var len = arguments.length;
            var args = arguments;
            var _self = this;
            for (var i = 0; i < this.elements.length; i++) {
                (function (count) {
                    addEvent(_self.elements[i], "click", function () {
                        args[count++ % len].apply(this, arguments);
                    });
                })(0);
            }
        };
        // mouseenter
        $.fn.mouseenter = function (fnHandler) {
            for (var i = 0; i < this.elements.length; i++) {
                addEvent(this.elements[i], "mouseover", function (ev) {
                    var oFrom = ev.fromElement || ev.relatedTarget;
                    if (oFrom && this.contains(oFrom)) return;
                    fnHandler && fnHandler.call(this, ev);
                });
            }
        };
        // mouseleave
        $.fn.mouseleave = function (fnHandler) {
            for (var i = 0; i < this.elements.length; i++) {
                addEvent(this.elements[i], "mouseleave", function (ev) {
                    var oTo = ev.toElement || ev.relatedTarget;
                    if (oTo && this.contains(oTo)) return;
                    fnHandler && fnHandler.call(this, ev);
                });
            }
        };
        // hover
        $.fn.hover = function (fnOver, fnOut) {
            this.mouseenter(fnOver);
            this.mouseleave(fnOut|| fnOver);
        };

        function jsonp(options) {
            //url, data, cbName, success, error, timeout
            options = options || {};
            if (!options.url) return;
            options.data = options.data || {};
            options.cbName = options.cbName || "cb";
            options.timeout = options.timeout || 0;

            var fnName = ("jsonp_" + Math.random()).replace(".", "");
            options.data[options.cbName] = fnName;
            var str = json2url(options.data);
            options.url += "?" + str;

            var oScript = document.createElement("script");

            window[fnName] = function (json) {
                clearTimeout(timer);
                options.success && options.success(json);
                oScript.parentNode.removeChild(oScript);
                delete window[fnName];
            };

            oScript.src = options.url;
            document.body.appendChild(oScript);

            if (options.timeout) {
                var timer = setTimeout(function () {
                    options.error && options.error();
                    oScript.parentNode.removeChild(oScript);
                    window[fnName] = function () {
                        delete window[fnName];
                    };
                }, options.timeout);
            }
        }

        function ajax(options) {
            //url,data,type,success,error,timeout
            options = options || {};
            if (!options.url) return;
            options.data = options.data || {};
            options.type = options.type || "get";
            options.timeout = options.timeout || 0;

            //data转url编码
            var str = json2url(options.data);

            if (window.XMLHttpRequest) {
                var xhr = new XMLHttpRequest();
            } else {
                var xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            if (options.type.toLowerCase() == "get") {
                xhr.open("get", options.url + "?" + str, true);
                xhr.send(null);
            } else if (options.type.toLowerCase() == "post") {
                xhr.open("post", options.url, true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send(str);
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    clearTimeout(timer);
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                        options.success && options.success(xhr.responseText);
                    } else {
                        options.error && options.error(xhr.status);
                    }

                }
            }

            if (options.timeout) {
                var timer = setTimeout(function () {
                    xhr.abort();
                }, options.timeout);
            }
        }

        function json2url(json) {
            var str
            var arr = [];
            json.t = Math.random();
            for (var key in json) {
                arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(json[key]));
            }
            return arr.join("&");
        }

        function appendStr(oParent, str) {
            //将字符串转换为dom
            var oDiv = document.createElement("div");
            oDiv.innerHTML = str;
            var aChild = oDiv.childNodes;
            while (aChild.length > 0) {
                oParent.appendChild(aChild[0]);
            }
        }

        function addEvent(obj, sEvt, fnHandler) {
            if (obj.addEventListener) {
                obj.addEventListener(sEvt, function (ev) {
                    if (fnHandler.call(obj,ev) === false) {
                        ev.cancelBubble = true;
                        ev.preventDefault();
                    }
                }, false);
            } else {
                obj.attachEvent("on" + sEvt, function () {
                    if (fnHandler.call(obj, event) === false) {
                        event.cancelBubble = true;
                        return false;
                    };
                });
            }
        }

        function getStyle(obj, attr) {
            return (obj.currentStyle || getComputedStyle(obj, false))[attr];
        }

        function getElems(str, aParent) {
            //先将str头尾空格去掉，然后再根据空格切
            var arr = str.replace(/^\s+|\s+$/g, "").split(/\s+/);
            var arr = str.match(/\S+/g);
            var aChild = [];
            aParent = aParent || [document];
            for (var i = 0; i < arr.length; i++) {
                aChild = getByStr(aParent, arr[i]);
                aParent = aChild;
            }
            return aChild;
        }

        function getByStr(aParent, str) {
            var aChild = [];
            //arr: [#div1, ul, .box]
            switch (str.charAt(0)) {
                case "#" ://id
                    aChild.push(document.getElementById(str.substring(1)));
                    break;
                case "." ://class
                    for (var i = 0; i < aParent.length; i++) {
                        var aElems = getByClass(aParent[i], str.substring(1));
                        for (var j = 0; j < aElems.length; j++) {
                            aChild.push(aElems[j]);
                        }
                    }
                    break;
                default ://tagName
                    //li li#li1 li.box li:first input[type=button]
                    if (/\w+#\w+/.test(str)) {//li#li1
                        var arr2 = str.split("#");
                        //console.log(arr2);
                        for (var i = 0; i < aParent.length; i++) {
                            var aElems = aParent[i].getElementsByTagName(arr2[0]);
                            for (var j = 0; j < aElems.length; j++) {
                                if (aElems[j].id == arr2[1])
                                    aChild.push(aElems[j]);
                            }
                        }
                    } else if (/\w+\.\w+/.test(str)) {//li.box
                        var arr2 = str.split(".");
                        //console.log(arr2);
                        for (var i = 0; i < aParent.length; i++) {
                            var aElems = aParent[i].getElementsByTagName(arr2[0]);
                            var reg = new RegExp("\\b" + arr2[1] + "\\b");
                            for (var j = 0; j < aElems.length; j++) {
                                if (reg.test(aElems[j].className)) {
                                    aChild.push(aElems[j]);
                                }
                            }
                        }
                    } else if (/\w+:\w+(\(.+\))/i.test(str)) {//li:first li:last li:odd li:even
                        // li:eq(2) li:lt(2) li:gt(2)
                        var str = "li:eq(2)";
                        var arr2 = str.split(/:|\(|\)/);
                        console.log(arr2);
                        //arr2: [li,eq,2,]
                        //console.log("why:" + arr2);
                        for (var i = 0; i < aParent.length; i++) {
                            switch (arr2[1]) {
                                case "first" :
                                    var aElems = aParent[i].getElementsByTagName(arr2[0]);
                                    aChild.push(aElems[0]);
                                    break;
                                case "last" :
                                    var aElems = aParent[i].getElementsByTagName(arr2[0]);
                                    aChild.push(aElems[aElems.length - 1]);
                                    break;
                                case "odd" :
                                    var aElems = aParent[i].getElementsByTagName(arr2[0]);
                                    for (var j = 1; j < aElems.length; j += 2) {
                                        aChild.push(aElems[j]);
                                    }
                                    break;
                                case "even" :
                                    var aElems = aParent[i].getElementsByTagName(arr2[0]);
                                    for (var j = 0; j < aElems.length; j += 2) {
                                        aChild.push(aElems[j]);
                                    }
                                    break;
                                case "eq" :
                                    var aElems = aParent[i].getElementsByTagName(arr2[0]);
                                    aChild.push(aElems[arr2[2]]);
                                    break;
                                case "lt" :
                                    var aElems = aParent[i].getElementsByTagName(arr2[0]);
                                    for (var j = 0; j < parseInt(arr2[2]); j++) {
                                        aChild.push(aElems[j]);
                                    }
                                    break;
                                case "gt" :
                                    var aElems = aParent[i].getElementsByTagName(arr2[0]);
                                    for (var j = parseInt(arr2[2]) + 1; j < aElems.length; j++) {
                                        aChild.push(aElems[j]);
                                    }
                                    break;
                            }
                        }

                    } else if (/\w+\[\w+=\w+\]/.test(str)) {//input[type=button]
                        var arr2 = str.split(/\[|=|\]/);
                        //console.log(arr2);
                        //arr2: [input, type, button]
                        for (var i = 0; i < aParent.length; i++) {
                            var aElems = aParent[i].getElementsByTagName(arr2[0]);
                            for (var j = 0; j < aElems.length; j++) {
                                if (aElems[j].getAttribute(arr2[1]) == arr2[2]) {
                                    aChild.push(aElems[j]);
                                }
                            }
                        }
                    } else {//li
                        for (var i = 0; i < aParent.length; i++) {
                            var aElems = aParent[i].getElementsByTagName(str);
                            for (var j = 0; j < aElems.length; j++) {
                                aChild.push(aElems[j]);
                            }
                        }
                    }
            }
            return aChild;
        }

        function getByClass(oParent, sClass) {
            if (document.getElementsByClassName) {
                return oParent.getElementsByClassName(sClass);
            }
            var results = [];
            var allElems = oParent.getElementsByTagName("*");
            var reg = new RegExp("\\b" + sClass + "\\b")
            for (var i = 0; i < allElems.length; i++) {
                if (reg.test(allElems[i].className)) {
                    results.push(allElems[i]);
                }
            }
            return results;
        }

        function domReady(fn) {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", fn, false);
            } else {
                document.attachEvent("onreadystatechange", function () {
                    if (document.readyState == "complete") {
                        fn && fn();
                    }
                })
            }
        }

        exports.$ = exports.zQuery = $;
        exports.getByClass = getByClass;
    })(window);
});