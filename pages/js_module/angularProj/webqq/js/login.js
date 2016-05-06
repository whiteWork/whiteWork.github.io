/**
 * Created by wanjie on 2015/10/29.
 */
var app = angular.module("index", ["ngCookies"]);

app.controller("main", function ($scope, $http, $cookieStore) {
    $scope.user = "";
    $scope.pass = "";
    $scope.arr = [];
    for (var i = 1; i <= 8; i++) {
        $scope.arr.push("images/" + i + ".jpg");
    }
    var url = "http://zhinengshe.com/exercise/im/api.php";

    $scope.register = function () {
        //1.注册
        //    ?a=reg&user=用户名&pass=密码&face=头像ID&cb=xxx
        //{err: 0, msg: "注册成功"}
        $http.jsonp(url, {params: {
            a: "reg",
            user: $scope.user,
            pass: $scope.pass,
            face: iNow + 1,
            cb: "registerMsg"
        }});
    };

    $scope.login = function () {
        //2.登录
        //    ?a=lgn&user=用户名&pass=密码&cb=xxx
        //{err: 0, msg: "登录成功", face: 头像ID, login_time: 上次登录时间, token: "token"}
        $http.jsonp(url, {params: {
            a: "lgn",
            user: $scope.user,
            pass: $scope.pass,
            face: iNow + 1,
            cb: "loginMsg"
        }});
    };

    window.loginMsg = function (json) {
        alert(json.msg);
        if (json.err == 0) {
            $cookieStore.put("token", json.token);
            $cookieStore.put("username", $scope.user);
            window.location = "chat.html";
        }
    };

    window.registerMsg = function (json) {
        alert(json.msg);
    };
});

var iNow = 0;

window.onload = function () {
    var oUl = document.getElementsByTagName("ul")[0];
    var aLi = oUl.children;
    oUl.style.width = aLi[0].offsetWidth * aLi.length + "px";
    var oNext = document.getElementsByClassName("next")[0];
    var oPrev = document.getElementsByClassName("prev")[0];

    oNext.onclick = next;
    oPrev.onclick = prev;

    function next() {
        iNow++;
        iNow %= aLi.length;
        oUl.style.left = - iNow * aLi[0].offsetWidth + "px";
    }

    function prev() {
        iNow--;
        if (iNow == -1) {
            iNow = aLi.length - 1;
        }
        oUl.style.left = - iNow * aLi[0].offsetWidth + "px";
    }
};