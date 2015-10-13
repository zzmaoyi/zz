// JavaScript source code
//jeact.js
//1.1
(function (win, doc, _) {
    var moduleMap = {};
    var fileMap = {};
    var readyFunctions = [];

    var noop = function () {
    };

    var uuid = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    var thin = function () {
    };

    var addListener = doc.addEventListener || doc.attachEvent,
		removeListener = doc.removeEventListener || doc.detachEvent;

    var eventName = doc.addEventListener ? "DOMContentLoaded" : "onreadystatechange";

    addListener.call(doc, eventName, function () {
        for (var i = readyFunctions.length - 1; i >= 0; i--) {
            if (readyFunctions[i]) {
                for (var j = 0; j < readyFunctions[i].length; j++) {
                    readyFunctions[i][j]();
                }
            }
        }
    }, false);

    var Events = {
        on: function (eventType, handler) {
            if (!this.eventMap) {
                this.eventMap = {};
            }

            //multiple event listener
            if (!this.eventMap[eventType]) {
                this.eventMap[eventType] = [];
            }
            this.eventMap[eventType].push(handler);
        },

        off: function (eventType, handler) {
            for (var i = 0; i < this.eventMap[eventType].length; i++) {
                if (this.eventMap[eventType][i] === handler) {
                    this.eventMap[eventType].splice(i, 1);
                    break;
                }
            }
        },

        fire: function (event) {
            var eventType = event.type;
            if (this.eventMap && this.eventMap[eventType]) {
                for (var i = 0; i < this.eventMap[eventType].length; i++) {
                    this.eventMap[eventType][i](event);
                }
            }
        }
    };

    _.extend(thin, {
        base: "../js/modules/",

        define: function (name, dependencies, factory) {
            if (!moduleMap[name]) {
                var module = {
                    name: name,
                    dependencies: dependencies,
                    factory: factory
                };

                moduleMap[name] = module;
            }

            return moduleMap[name];
        },

        use: function (name) {
            var module = moduleMap[name];

            if (!module.entity) {
                var args = [];
                for (var i = 0; i < module.dependencies.length; i++) {
                    if (moduleMap[module.dependencies[i]].entity) {
                        args.push(moduleMap[module.dependencies[i]].entity);
                    }
                    else {
                        args.push(this.use(module.dependencies[i]));
                    }
                }

                module.entity = module.factory.apply(noop, args);
            }

            return module.entity;
        },

        require: function (pathArr, callback) {
            var base = this.base;
            for (var i = 0; i < pathArr.length; i++) {
                loadFile(pathArr[i]);
            }

            function loadFile(file) {
                var head = doc.getElementsByTagName('head')[0];
                var script = doc.createElement('script');
                script.setAttribute('type', 'text/javascript');
                script.setAttribute('src', base + file + '.js');
                script.onload = script.onreadystatechange = function () {
                    if ((!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                        fileMap[file] = true;
                        //head.removeChild(script);
                        checkAllFiles();
                    }
                };
                head.appendChild(script);
            }

            function checkAllFiles() {
                var allLoaded = true;
                for (var i = 0; i < pathArr.length; i++) {
                    if (!fileMap[pathArr[i]]) {
                        allLoaded = false;
                        break;
                    }
                }

                if (allLoaded && callback) {
                    callback();
                }
            }
        },

        ready: function (handler, priority) {
            priority = (priority === null) ? 1 : priority;

            if (!readyFunctions[priority]) {
                readyFunctions[priority] = [];
            }
            readyFunctions[priority].push(handler);
        },

        error: function () {

        },

        log: function (obj) {
            try {
                console.log(obj);
            }
            catch (ex) {

            }
        }
    });

    _.extend(thin, Events);

    win.thin = thin;

    thin.define("_", [], function () {
        return _;
    });

    //Events
    thin.define("Events", [], function () {
        return Events;
    });

    thin.on("ready", function () {
        thin.require(["core/binding"], function () {
            var binding = thin.use("DOMBinding");
            binding.parse(doc.body);
        });
    });
})(window, document, _);

    function Dictionary() {
        this.data = new Array();
        this.key = 0;
        this.add = function (value) {
            this.key++;
            this.data[this.key] = value;
            return this.key;
            };
        this.get = function (key) {
            return this.data[key];
            };
                this.del = function (key) {
            delete this.data[key];
            };
                this.run = function (id, json) {
            var fun=this.data[id];
            this.del(id);
            if (typeof (fun) == "function")
                return fun(json);
                };
                }



    var jc = {};
    jc.noconnect = true;
          jc.getMachine = function ()
          {
          if (!JcArt || !JcArt.ClipbpardTxT)
            return "";
        return JcArt.getMachine()

          }
      jc.ClipbpardTxT=function(txt)
          {
        if (!JcArt || !JcArt.ClipbpardTxT)
            return false;
        return JcArt.ClipbpardTxT(txt)
        }
    jc.GetDate=function() {
        var time = new Date();
        var hh = time.getHours();
        var mm = time.getMinutes();
        var ss = time.getSeconds();
        var yy = time.getFullYear();
        var MM = time.getMonth() + 1;
        var rr = time.getDate();
        var ww = time.getDay();
        var days = ["日", "一", "二", "三", "四", "五", "六"]
        var n = yy + "年" + M > 9 ? MM : ("0" + MM) + "月" + rr > 9 ? rr : ("0" + rr) + "日" + "星期" + days[ww];
        var d = hh + "时" + mm + "分" + ss + "秒";
        return n + " " + d;
        }
    jc.WsConnection=function() {
        if (jc.WsState() && jc.noconnect) {
            jc.noconnect = false;
            var ip = "192.168.1.111";
            var domain = document.domain;
            if (domain == ip || !domain)
                domain = ip + ":88";
                else
                domain += ":1118";
                    //domain="192.168.1.114:88";
                //domain = "fzzhongzu.oicp.net:1118";
            ws = new WebSocket("ws:" + domain);//连接服务器
            bootbox.hideAll();
            try {
                bootbox.alert({
                    buttons: {
                            ok: {
                                label: '关闭',
                                    className: 'btn-myStyle btn-primary'
                        }
                                },
                                message: "<div class='info'>正在连接服务器，请稍后</div>",
                                title: "连接服务器",
                        });
                
                ws.onopen = function (event) {
                    bootbox.hideAll();
                    $("#macConn").html("已连接服务器");
                    $("#macConn").attr("class", "text-success");
                    jc.send("client", { "Dep": userlogin.data.Dep || "", "username": userlogin.data.username || "", "mac": jc.getMachine() });
                    
                    };
                ws.onmessage = function (event) {
                    var json = event.data || "{}";
                    try {
                        json = angular.fromJson(json);
                    } catch (e) { }
                    if (json.MsgId) { Sev.data.run(json.MsgId, json); }
                    else
                        {
                        alert("自定义消息" + event.data);
                    }
                    };
                ws.onclose = function (event) {
                    jc.noconnect = true;
                    bootbox.hideAll();
                    $("#macConn").html("服务器断开连接");
                    $("#macConn").attr("class", "text-error");
                    bootbox.alert({
                        buttons: {
                                ok: {
                                    label: '关闭',
                                            className: 'btn-myStyle btn-primary'
                            }
                                    },
                                    message: "<div class='warning'>服务器连接失败，请  <a class='btn btn-danger' onclick='jc.WsConnection()'>重新连接</a></div>",
                                    title: "服务器断开连接",
                            });
                            }
                ws.onerror = function (event) {
                    jc.noconnect = true;
                        /*document.getElementById("msg").innerHTML += "<br/>WebSocket异常！"; */
                    };
                    }
            catch (ex) {
                bootbox.alert({
                    buttons: {
                            ok: {
                                label: '关闭',
                                    className: 'btn-myStyle btn-primary'
                        }
                                },
                                message: ex.message,
                            title: "连接错误",
                        });
            }
                        }
                        }
    jc.WsState = function ()
            { return (typeof (ws) == "undefined" || ws.readyState != 1); }
            jc.send = function (dll, data, id) {
        if(id)
            data = JSON.stringify({ "DllName": dll, "MsgId": id, "Data": data, State: false, Reason: "Untreated" });
        else
            data = JSON.stringify({ "DllName": dll, "Data": data });
        if (jc.WsState()) 
            {
            jc.WsConnection();
            setTimeout(function () {

                if (jc.WsState()) {
                    jc.WsConnection();
                    setTimeout(function () {
                        if (jc.WsState()) { ws.send(data); }
                        else { ws.send(data); }
                        }, 800);
                        }
                        else {ws.send(data);}
                    }, 800);
        }
                else
                {
            ws.send(data);
            }
            }
    var Sev = {
                data: new Dictionary(),
                Get: function (dll, json, callback) {
            if (typeof (callback) == "function") {
                var id = this.data.add(callback);
                setTimeout(function () { Sev.data.run(id, { State: false, "Reason": "连接超时" }); }, 5000);
                jc.send(dll, json, id);
                }
        }
        }

