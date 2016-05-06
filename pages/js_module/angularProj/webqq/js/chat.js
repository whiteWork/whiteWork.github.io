/**
 * Created by wanjie on 2015/10/29.
 */
var app = angular.module("chat", ["ngCookies"]);
app.controller("main", function($scope, $http, $cookieStore) {
    var maxId = 0;
    $scope.messages = [];
    $scope.userList = [];
    var token = $cookieStore.get("token");
    var username = $cookieStore.get("username");
    var url = "http://zhinengshe.com/exercise/im/api.php";
    var oReadArea = document.getElementsByClassName("readarea")[0];
    getUserList();
    getMessageList();
    setInterval(update, 1000);
    $scope.send = function() {
        //3.发言
        //    ?a=snd_msg&content=内容&token=&cb=xxx
        //{err: 0, time: 发布时间, ID: 消息ID}

        $http.jsonp(url, {params: {
            a: "snd_msg",
            content: $scope.message,
            token: token,
            cb: "sendMsg"
        }});
    };
    $scope.$on("ngRepeatFinished", function() {
        oReadArea.scrollTop = oReadArea.scrollHeight;
    });


    window.sendMsg = function (json) {
        maxId = json.ID;
        json.content = $scope.message;
        json.username = username;
        json.post_time = formatTime(json.time);
        $scope.messages.push(json);
    };
    window.updateMsg = function (json) {
        if (json.data.length != 0) {
            for (var i = 0; i < json.data.length; i++) {
                if (json.data[i].ID > maxId) {
                    maxId = json.data[i].ID;
                }
                json.data[i].post_time = formatTime(json.data[i].post_time);
                $scope.messages.push(json.data[i]);
            }
        }
    };
    window.getUsers = function (json) {
        //alert(JSON.stringify(json));
        for (var i = 0; i < json.data.length; i++) {
            if (json.data[i].face < 1) {
                json.data[i].face = 1;
            }
            if (json.data[i].face > 8) {
                json.data[i].face = 8;
            }
        }
        $scope.userList = json.data;
    };

    function formatTime(time) {
        //alert(json.post_time);
        var oDate = new Date(time * 1000);
        var year = oDate.getFullYear();
        var month = oDate.getMonth() + 1;
        var day = oDate.getDate();
        var hour = oDate.getHours();
        var minute = oDate.getMinutes();
        var second = oDate.getSeconds();
        var str = year + "-" + fillZero(month) + "-" + fillZero(day)
            + " " + fillZero(hour) + ":" + fillZero(minute) + ":" + fillZero(second);
        return str;
    }

    function update() {
        //?a=get_msg_n&n=消息ID&token=&cb=xxx
        //{err: 0, data: [{ID:'1',post_time:'1364873875',content:'asdfsdf',face:'1',username:'test',to:'发给谁'},...]}
        $http.jsonp(url, {params: {
            a: "get_msg_n",
            n: maxId,
            token: token,
            cb: "updateMsg"
        }});
    }

    function getUserList() {
        //6.获取用户列表
        //    ?a=get_user_list&token=&cb=xxx
        //{err: 0, data: [{ID: 用户ID,username: 用户名,face: 用户头像}]}
        $http.jsonp(url,{params: {
            a: "get_user_list",
            token: token,
            cb: "getUsers"
        }});
    }

    function getMessageList() {
        //4.完整获取
        //    ?a=get_msg&token=&cb=xxx
        //{err: 0, data: [{ID: 消息ID, post_time: 消息时间,content: 消息内容,username: 发言用户},...]}

        $http.jsonp(url, {params: {
            a: "get_msg",
            token: token,
            cb: "updateMsg"
        }});
    }

    function fillZero(n) {
        return n < 10 ? "0" + n : "" + n;
    }
});
app.directive("onFinishRender", function ($timeout) {
    return {
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit("ngRepeatFinished");
                });
            }
        }
    }
});

