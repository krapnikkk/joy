var start_time = (new Date).getTime(), _jdfp_canvas_md5 = "", _jdfp_webgl_md5 = "", _fingerprint_step = 1, _JdEid = "", _eidFlag = !1, risk_jd_local_fingerprint = "", _jd_e_joint_;
(function(u, t, v) {
    "undefined" !== typeof module && module.exports ? module.exports = v() : t[u] = v()
}
)("JdJrTdRiskFinger", this, function() {
    function u(a) {
        if (null == a || void 0 == a || "" == a)
            return "NA";
        if (null == a || void 0 == a || "" == a)
            var b = "";
        else {
            b = [];
            for (var c = 0; c < 8 * a.length; c += 8)
                b[c >> 5] |= (a.charCodeAt(c / 8) & 255) << c % 32
        }
        a = 8 * a.length;
        b[a >> 5] |= 128 << a % 32;
        b[(a + 64 >>> 9 << 4) + 14] = a;
        a = 1732584193;
        c = -271733879;
        for (var m = -1732584194, g = 271733878, n = 0; n < b.length; n += 16) {
            var z = a
              , C = c
              , D = m
              , B = g;
            a = v(a, c, m, g, b[n + 0], 7, -680876936);
            g = v(g, a, c, m, b[n + 1], 12, -389564586);
            m = v(m, g, a, c, b[n + 2], 17, 606105819);
            c = v(c, m, g, a, b[n + 3], 22, -1044525330);
            a = v(a, c, m, g, b[n + 4], 7, -176418897);
            g = v(g, a, c, m, b[n + 5], 12, 1200080426);
            m = v(m, g, a, c, b[n + 6], 17, -1473231341);
            c = v(c, m, g, a, b[n + 7], 22, -45705983);
            a = v(a, c, m, g, b[n + 8], 7, 1770035416);
            g = v(g, a, c, m, b[n + 9], 12, -1958414417);
            m = v(m, g, a, c, b[n + 10], 17, -42063);
            c = v(c, m, g, a, b[n + 11], 22, -1990404162);
            a = v(a, c, m, g, b[n + 12], 7, 1804603682);
            g = v(g, a, c, m, b[n + 13], 12, -40341101);
            m = v(m, g, a, c, b[n + 14], 17, -1502002290);
            c = v(c, m, g, a, b[n + 15], 22, 1236535329);
            a = x(a, c, m, g, b[n + 1], 5, -165796510);
            g = x(g, a, c, m, b[n + 6], 9, -1069501632);
            m = x(m, g, a, c, b[n + 11], 14, 643717713);
            c = x(c, m, g, a, b[n + 0], 20, -373897302);
            a = x(a, c, m, g, b[n + 5], 5, -701558691);
            g = x(g, a, c, m, b[n + 10], 9, 38016083);
            m = x(m, g, a, c, b[n + 15], 14, -660478335);
            c = x(c, m, g, a, b[n + 4], 20, -405537848);
            a = x(a, c, m, g, b[n + 9], 5, 568446438);
            g = x(g, a, c, m, b[n + 14], 9, -1019803690);
            m = x(m, g, a, c, b[n + 3], 14, -187363961);
            c = x(c, m, g, a, b[n + 8], 20, 1163531501);
            a = x(a, c, m, g, b[n + 13], 5, -1444681467);
            g = x(g, a, c, m, b[n + 2], 9, -51403784);
            m = x(m, g, a, c, b[n + 7], 14, 1735328473);
            c = x(c, m, g, a, b[n + 12], 20, -1926607734);
            a = t(c ^ m ^ g, a, c, b[n + 5], 4, -378558);
            g = t(a ^ c ^ m, g, a, b[n + 8], 11, -2022574463);
            m = t(g ^ a ^ c, m, g, b[n + 11], 16, 1839030562);
            c = t(m ^ g ^ a, c, m, b[n + 14], 23, -35309556);
            a = t(c ^ m ^ g, a, c, b[n + 1], 4, -1530992060);
            g = t(a ^ c ^ m, g, a, b[n + 4], 11, 1272893353);
            m = t(g ^ a ^ c, m, g, b[n + 7], 16, -155497632);
            c = t(m ^ g ^ a, c, m, b[n + 10], 23, -1094730640);
            a = t(c ^ m ^ g, a, c, b[n + 13], 4, 681279174);
            g = t(a ^ c ^ m, g, a, b[n + 0], 11, -358537222);
            m = t(g ^ a ^ c, m, g, b[n + 3], 16, -722521979);
            c = t(m ^ g ^ a, c, m, b[n + 6], 23, 76029189);
            a = t(c ^ m ^ g, a, c, b[n + 9], 4, -640364487);
            g = t(a ^ c ^ m, g, a, b[n + 12], 11, -421815835);
            m = t(g ^ a ^ c, m, g, b[n + 15], 16, 530742520);
            c = t(m ^ g ^ a, c, m, b[n + 2], 23, -995338651);
            a = w(a, c, m, g, b[n + 0], 6, -198630844);
            g = w(g, a, c, m, b[n + 7], 10, 1126891415);
            m = w(m, g, a, c, b[n + 14], 15, -1416354905);
            c = w(c, m, g, a, b[n + 5], 21, -57434055);
            a = w(a, c, m, g, b[n + 12], 6, 1700485571);
            g = w(g, a, c, m, b[n + 3], 10, -1894986606);
            m = w(m, g, a, c, b[n + 10], 15, -1051523);
            c = w(c, m, g, a, b[n + 1], 21, -2054922799);
            a = w(a, c, m, g, b[n + 8], 6, 1873313359);
            g = w(g, a, c, m, b[n + 15], 10, -30611744);
            m = w(m, g, a, c, b[n + 6], 15, -1560198380);
            c = w(c, m, g, a, b[n + 13], 21, 1309151649);
            a = w(a, c, m, g, b[n + 4], 6, -145523070);
            g = w(g, a, c, m, b[n + 11], 10, -1120210379);
            m = w(m, g, a, c, b[n + 2], 15, 718787259);
            c = w(c, m, g, a, b[n + 9], 21, -343485551);
            a = A(a, z);
            c = A(c, C);
            m = A(m, D);
            g = A(g, B)
        }
        b = [a, c, m, g];
        a = "";
        for (c = 0; c < 4 * b.length; c++)
            a += "0123456789abcdef".charAt(b[c >> 2] >> c % 4 * 8 + 4 & 15) + "0123456789abcdef".charAt(b[c >> 2] >> c % 4 * 8 & 15);
        return a
    }
    function t(a, b, c, m, g, n) {
        a = A(A(b, a), A(m, n));
        return A(a << g | a >>> 32 - g, c)
    }
    function v(a, b, c, m, g, n, z) {
        return t(b & c | ~b & m, a, b, g, n, z)
    }
    function x(a, b, c, m, g, n, z) {
        return t(b & m | c & ~m, a, b, g, n, z)
    }
    function w(a, b, c, m, g, n, z) {
        return t(c ^ (b | ~m), a, b, g, n, z)
    }
    function A(a, b) {
        var c = (a & 65535) + (b & 65535);
        return (a >> 16) + (b >> 16) + (c >> 16) << 16 | c & 65535
    }
    _fingerprint_step = 2;
    var l = ""
      , e = navigator.userAgent.toLowerCase();
    e.indexOf("jdapp") && (e = e.substring(0, 90));
    var r = navigator.language
      , f = e;
    -1 != f.indexOf("ipad") || -1 != f.indexOf("iphone os") || -1 != f.indexOf("midp") || -1 != f.indexOf("rv:1.2.3.4") || -1 != f.indexOf("ucweb") || -1 != f.indexOf("android") || -1 != f.indexOf("windows ce") || f.indexOf("windows mobile");
    var k = "NA"
      , y = "NA";
    try {
        -1 != f.indexOf("win") && -1 != f.indexOf("95") && (k = "windows",
        y = "95"),
        -1 != f.indexOf("win") && -1 != f.indexOf("98") && (k = "windows",
        y = "98"),
        -1 != f.indexOf("win 9x") && -1 != f.indexOf("4.90") && (k = "windows",
        y = "me"),
        -1 != f.indexOf("win") && -1 != f.indexOf("nt 5.0") && (k = "windows",
        y = "2000"),
        -1 != f.indexOf("win") && -1 != f.indexOf("nt") && (k = "windows",
        y = "NT"),
        -1 != f.indexOf("win") && -1 != f.indexOf("nt 5.1") && (k = "windows",
        y = "xp"),
        -1 != f.indexOf("win") && -1 != f.indexOf("32") && (k = "windows",
        y = "32"),
        -1 != f.indexOf("win") && -1 != f.indexOf("nt 5.1") && (k = "windows",
        y = "7"),
        -1 != f.indexOf("win") && -1 != f.indexOf("6.0") && (k = "windows",
        y = "8"),
        -1 == f.indexOf("win") || -1 == f.indexOf("nt 6.0") && -1 == f.indexOf("nt 6.1") || (k = "windows",
        y = "9"),
        -1 != f.indexOf("win") && -1 != f.indexOf("nt 6.2") && (k = "windows",
        y = "10"),
        -1 != f.indexOf("linux") && (k = "linux"),
        -1 != f.indexOf("unix") && (k = "unix"),
        -1 != f.indexOf("sun") && -1 != f.indexOf("os") && (k = "sun os"),
        -1 != f.indexOf("ibm") && -1 != f.indexOf("os") && (k = "ibm os/2"),
        -1 != f.indexOf("mac") && -1 != f.indexOf("pc") && (k = "mac"),
        -1 != f.indexOf("aix") && (k = "aix"),
        -1 != f.indexOf("powerpc") && (k = "powerPC"),
        -1 != f.indexOf("hpux") && (k = "hpux"),
        -1 != f.indexOf("netbsd") && (k = "NetBSD"),
        -1 != f.indexOf("bsd") && (k = "BSD"),
        -1 != f.indexOf("osf1") && (k = "OSF1"),
        -1 != f.indexOf("irix") && (k = "IRIX",
        y = ""),
        -1 != f.indexOf("freebsd") && (k = "FreeBSD"),
        -1 != f.indexOf("symbianos") && (k = "SymbianOS",
        y = f.substring(f.indexOf("SymbianOS/") + 10, 3))
    } catch (a) {}
    _fingerprint_step = 3;
    var h = "NA"
      , q = "NA";
    try {
        -1 != f.indexOf("msie") && (h = "ie",
        q = f.substring(f.indexOf("msie ") + 5),
        q.indexOf(";") && (q = q.substring(0, q.indexOf(";"))));
        -1 != f.indexOf("firefox") && (h = "Firefox",
        q = f.substring(f.indexOf("firefox/") + 8));
        -1 != f.indexOf("opera") && (h = "Opera",
        q = f.substring(f.indexOf("opera/") + 6, 4));
        -1 != f.indexOf("safari") && (h = "safari",
        q = f.substring(f.indexOf("safari/") + 7));
        -1 != f.indexOf("chrome") && (h = "chrome",
        q = f.substring(f.indexOf("chrome/") + 7),
        q.indexOf(" ") && (q = q.substring(0, q.indexOf(" "))));
        -1 != f.indexOf("navigator") && (h = "navigator",
        q = f.substring(f.indexOf("navigator/") + 10));
        -1 != f.indexOf("applewebkit") && (h = "applewebkit_chrome",
        q = f.substring(f.indexOf("applewebkit/") + 12),
        q.indexOf(" ") && (q = q.substring(0, q.indexOf(" "))));
        -1 != f.indexOf("sogoumobilebrowser") && (h = "\u641c\u72d7\u624b\u673a\u6d4f\u89c8\u5668");
        if (-1 != f.indexOf("ucbrowser") || -1 != f.indexOf("ucweb"))
            h = "UC\u6d4f\u89c8\u5668";
        if (-1 != f.indexOf("qqbrowser") || -1 != f.indexOf("tencenttraveler"))
            h = "QQ\u6d4f\u89c8\u5668";
        -1 != f.indexOf("metasr") && (h = "\u641c\u72d7\u6d4f\u89c8\u5668");
        -1 != f.indexOf("360se") && (h = "360\u6d4f\u89c8\u5668");
        -1 != f.indexOf("the world") && (h = "\u4e16\u754c\u4e4b\u7a97\u6d4f\u89c8\u5668");
        -1 != f.indexOf("maxthon") && (h = "\u9068\u6e38\u6d4f\u89c8\u5668")
    } catch (a) {}
    f = function(a) {
        this.options = this.extend(a, {});
        this.nativeForEach = Array.prototype.forEach;
        this.nativeMap = Array.prototype.map
    }
    ;
    f.prototype = {
        extend: function(a, b) {
            if (null == a)
                return b;
            for (var c in a)
                null != a[c] && b[c] !== a[c] && (b[c] = a[c]);
            return b
        },
        getData: function() {
            return l
        },
        get: function(a) {
            var b = 1 * q
              , c = [];
            "ie" == h && 7 <= b ? (c.push(e),
            c.push(r),
            l = l + ",'userAgent':'" + u(e) + "','language':'" + r + "'",
            this.browserRedirect(e)) : (c = this.userAgentKey(c),
            c = this.languageKey(c));
            c.push(h);
            c.push(q);
            c.push(k);
            c.push(y);
            l = l + ",'os':'" + k + "','osVersion':'" + y + "','browser':'" + h + "','browserVersion':'" + q + "'";
            c = this.colorDepthKey(c);
            c = this.screenResolutionKey(c);
            c = this.timezoneOffsetKey(c);
            c = this.sessionStorageKey(c);
            c = this.localStorageKey(c);
            c = this.indexedDbKey(c);
            c = this.addBehaviorKey(c);
            c = this.openDatabaseKey(c);
            c = this.cpuClassKey(c);
            c = this.platformKey(c);
            c = this.hardwareConcurrencyKey(c);
            c = this.doNotTrackKey(c);
            c = this.pluginsKey(c);
            c = this.canvasKey(c);
            c = this.webglKey(c);
            b = this.x64hash128(c.join("~~~"), 31);
            return a(b)
        },
        userAgentKey: function(a) {
            this.options.excludeUserAgent || (a.push(navigator.userAgent),
            l = l + ",'userAgent':'" + u(navigator.userAgent) + "'",
            this.browserRedirect(navigator.userAgent));
            return a
        },
        replaceAll: function(a, b, c) {
            for (; 0 <= a.indexOf(b); )
                a = a.replace(b, c);
            return a
        },
        browserRedirect: function(a) {
            var b = a.toLowerCase();
            a = "ipad" == b.match(/ipad/i);
            var c = "iphone os" == b.match(/iphone os/i)
              , m = "midp" == b.match(/midp/i)
              , g = "rv:1.2.3.4" == b.match(/rv:1.2.3.4/i)
              , n = "ucweb" == b.match(/ucweb/i)
              , z = "android" == b.match(/android/i)
              , C = "windows ce" == b.match(/windows ce/i);
            b = "windows mobile" == b.match(/windows mobile/i);
            l = a || c || m || g || n || z || C || b ? l + ",'origin':'mobile'" : l + ",'origin':'pc'"
        },
        languageKey: function(a) {
            this.options.excludeLanguage || (a.push(navigator.language),
            l = l + ",'language':'" + this.replaceAll(navigator.language, " ", "_") + "'");
            return a
        },
        colorDepthKey: function(a) {
            this.options.excludeColorDepth || (a.push(screen.colorDepth),
            l = l + ",'colorDepth':'" + screen.colorDepth + "'");
            return a
        },
        screenResolutionKey: function(a) {
            if (!this.options.excludeScreenResolution) {
                var b = this.getScreenResolution();
                "undefined" !== typeof b && (a.push(b.join("x")),
                l = l + ",'screenResolution':'" + b.join("x") + "'")
            }
            return a
        },
        getScreenResolution: function() {
            return this.options.detectScreenOrientation ? screen.height > screen.width ? [screen.height, screen.width] : [screen.width, screen.height] : [screen.height, screen.width]
        },
        timezoneOffsetKey: function(a) {
            this.options.excludeTimezoneOffset || (a.push((new Date).getTimezoneOffset()),
            l = l + ",'timezoneOffset':'" + (new Date).getTimezoneOffset() / 60 + "'");
            return a
        },
        sessionStorageKey: function(a) {
            !this.options.excludeSessionStorage && this.hasSessionStorage() && (a.push("sessionStorageKey"),
            l += ",'sessionStorage':true");
            return a
        },
        localStorageKey: function(a) {
            !this.options.excludeSessionStorage && this.hasLocalStorage() && (a.push("localStorageKey"),
            l += ",'localStorage':true");
            return a
        },
        indexedDbKey: function(a) {
            !this.options.excludeIndexedDB && this.hasIndexedDB() && (a.push("indexedDbKey"),
            l += ",'indexedDb':true");
            return a
        },
        addBehaviorKey: function(a) {
            document.body && !this.options.excludeAddBehavior && document.body.addBehavior ? (a.push("addBehaviorKey"),
            l += ",'addBehavior':true") : l += ",'addBehavior':false";
            return a
        },
        openDatabaseKey: function(a) {
            !this.options.excludeOpenDatabase && window.openDatabase ? (a.push("openDatabase"),
            l += ",'openDatabase':true") : l += ",'openDatabase':false";
            return a
        },
        cpuClassKey: function(a) {
            this.options.excludeCpuClass || (a.push(this.getNavigatorCpuClass()),
            l = l + ",'cpu':'" + this.getNavigatorCpuClass() + "'");
            return a
        },
        platformKey: function(a) {
            this.options.excludePlatform || (a.push(this.getNavigatorPlatform()),
            l = l + ",'platform':'" + this.getNavigatorPlatform() + "'");
            return a
        },
        hardwareConcurrencyKey: function(a) {
            var b = this.getHardwareConcurrency();
            a.push(b);
            l = l + ",'ccn':'" + b + "'";
            return a
        },
        doNotTrackKey: function(a) {
            this.options.excludeDoNotTrack || (a.push(this.getDoNotTrack()),
            l = l + ",'track':'" + this.getDoNotTrack() + "'");
            return a
        },
        canvasKey: function(a) {
            if (!this.options.excludeCanvas && this.isCanvasSupported()) {
                var b = this.getCanvasFp();
                a.push(b);
                _jdfp_canvas_md5 = u(b);
                l = l + ",'canvas':'" + _jdfp_canvas_md5 + "'"
            }
            return a
        },
        webglKey: function(a) {
            if (!this.options.excludeWebGL && this.isCanvasSupported()) {
                var b = this.getWebglFp();
                _jdfp_webgl_md5 = u(b);
                a.push(b);
                l = l + ",'webglFp':'" + _jdfp_webgl_md5 + "'"
            }
            return a
        },
        pluginsKey: function(a) {
            this.isIE() ? (a.push(this.getIEPluginsString()),
            l = l + ",'plugins':'" + u(this.getIEPluginsString()) + "'") : (a.push(this.getRegularPluginsString()),
            l = l + ",'plugins':'" + u(this.getRegularPluginsString()) + "'");
            return a
        },
        getRegularPluginsString: function() {
            return this.map(navigator.plugins, function(a) {
                var b = this.map(a, function(c) {
                    return [c.type, c.suffixes].join("~")
                }).join(",");
                return [a.name, a.description, b].join("::")
            }, this).join(";")
        },
        getIEPluginsString: function() {
            return window.ActiveXObject ? this.map("AcroPDF.PDF;Adodb.Stream;AgControl.AgControl;DevalVRXCtrl.DevalVRXCtrl.1;MacromediaFlashPaper.MacromediaFlashPaper;Msxml2.DOMDocument;Msxml2.XMLHTTP;PDF.PdfCtrl;QuickTime.QuickTime;QuickTimeCheckObject.QuickTimeCheck.1;RealPlayer;RealPlayer.RealPlayer(tm) ActiveX Control (32-bit);RealVideo.RealVideo(tm) ActiveX Control (32-bit);Scripting.Dictionary;SWCtl.SWCtl;Shell.UIHelper;ShockwaveFlash.ShockwaveFlash;Skype.Detection;TDCCtl.TDCCtl;WMPlayer.OCX;rmocx.RealPlayer G2 Control;rmocx.RealPlayer G2 Control.1".split(";"), function(a) {
                try {
                    return new ActiveXObject(a),
                    a
                } catch (b) {
                    return null
                }
            }).join(";") : ""
        },
        hasSessionStorage: function() {
            try {
                return !!window.sessionStorage
            } catch (a) {
                return !0
            }
        },
        hasLocalStorage: function() {
            try {
                return !!window.localStorage
            } catch (a) {
                return !0
            }
        },
        hasIndexedDB: function() {
            return !!window.indexedDB
        },
        getNavigatorCpuClass: function() {
            return navigator.cpuClass ? navigator.cpuClass : "NA"
        },
        getNavigatorPlatform: function() {
            return navigator.platform ? navigator.platform : "NA"
        },
        getHardwareConcurrency: function() {
            return navigator.hardwareConcurrency ? navigator.hardwareConcurrency : "NA"
        },
        getDoNotTrack: function() {
            return navigator.doNotTrack ? navigator.doNotTrack : "NA"
        },
        getCanvasFp: function() {
            var a = navigator.userAgent.toLowerCase();
            if ((0 < a.indexOf("jdjr-app") || 0 <= a.indexOf("jdapp")) && (0 < a.indexOf("iphone") || 0 < a.indexOf("ipad")))
                return null;
            a = document.createElement("canvas");
            var b = a.getContext("2d");
            b.fillStyle = "red";
            b.fillRect(30, 10, 200, 100);
            b.strokeStyle = "#1a3bc1";
            b.lineWidth = 6;
            b.lineCap = "round";
            b.arc(50, 50, 20, 0, Math.PI, !1);
            b.stroke();
            b.fillStyle = "#42e1a2";
            b.font = "15.4px 'Arial'";
            b.textBaseline = "alphabetic";
            b.fillText("PR flacks quiz gym: TV DJ box when? \u2620", 15, 60);
            b.shadowOffsetX = 1;
            b.shadowOffsetY = 2;
            b.shadowColor = "white";
            b.fillStyle = "rgba(0, 0, 200, 0.5)";
            b.font = "60px 'Not a real font'";
            b.fillText("No\u9a97", 40, 80);
            return a.toDataURL()
        },
        getWebglFp: function() {
            var a = navigator.userAgent;
            a = a.toLowerCase();
            if ((0 < a.indexOf("jdjr-app") || 0 <= a.indexOf("jdapp")) && (0 < a.indexOf("iphone") || 0 < a.indexOf("ipad")))
                return null;
            a = function(D) {
                b.clearColor(0, 0, 0, 1);
                b.enable(b.DEPTH_TEST);
                b.depthFunc(b.LEQUAL);
                b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
                return "[" + D[0] + ", " + D[1] + "]"
            }
            ;
            var b = this.getWebglCanvas();
            if (!b)
                return null;
            var c = []
              , m = b.createBuffer();
            b.bindBuffer(b.ARRAY_BUFFER, m);
            var g = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
            b.bufferData(b.ARRAY_BUFFER, g, b.STATIC_DRAW);
            m.itemSize = 3;
            m.numItems = 3;
            g = b.createProgram();
            var n = b.createShader(b.VERTEX_SHADER);
            b.shaderSource(n, "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}");
            b.compileShader(n);
            var z = b.createShader(b.FRAGMENT_SHADER);
            b.shaderSource(z, "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}");
            b.compileShader(z);
            b.attachShader(g, n);
            b.attachShader(g, z);
            b.linkProgram(g);
            b.useProgram(g);
            g.vertexPosAttrib = b.getAttribLocation(g, "attrVertex");
            g.offsetUniform = b.getUniformLocation(g, "uniformOffset");
            b.enableVertexAttribArray(g.vertexPosArray);
            b.vertexAttribPointer(g.vertexPosAttrib, m.itemSize, b.FLOAT, !1, 0, 0);
            b.uniform2f(g.offsetUniform, 1, 1);
            b.drawArrays(b.TRIANGLE_STRIP, 0, m.numItems);
            null != b.canvas && c.push(b.canvas.toDataURL());
            c.push("extensions:" + b.getSupportedExtensions().join(";"));
            c.push("extensions:" + b.getSupportedExtensions().join(";"));
            c.push("w1" + a(b.getParameter(b.ALIASED_LINE_WIDTH_RANGE)));
            c.push("w2" + a(b.getParameter(b.ALIASED_POINT_SIZE_RANGE)));
            c.push("w3" + b.getParameter(b.ALPHA_BITS));
            c.push("w4" + (b.getContextAttributes().antialias ? "yes" : "no"));
            c.push("w5" + b.getParameter(b.BLUE_BITS));
            c.push("w6" + b.getParameter(b.DEPTH_BITS));
            c.push("w7" + b.getParameter(b.GREEN_BITS));
            c.push("w8" + function(D) {
                var B, F = D.getExtension("EXT_texture_filter_anisotropic") || D.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || D.getExtension("MOZ_EXT_texture_filter_anisotropic");
                return F ? (B = D.getParameter(F.MAX_TEXTURE_MAX_ANISOTROPY_EXT),
                0 === B && (B = 2),
                B) : null
            }(b));
            c.push("w9" + b.getParameter(b.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
            c.push("w10" + b.getParameter(b.MAX_CUBE_MAP_TEXTURE_SIZE));
            c.push("w11" + b.getParameter(b.MAX_FRAGMENT_UNIFORM_VECTORS));
            c.push("w12" + b.getParameter(b.MAX_RENDERBUFFER_SIZE));
            c.push("w13" + b.getParameter(b.MAX_TEXTURE_IMAGE_UNITS));
            c.push("w14" + b.getParameter(b.MAX_TEXTURE_SIZE));
            c.push("w15" + b.getParameter(b.MAX_VARYING_VECTORS));
            c.push("w16" + b.getParameter(b.MAX_VERTEX_ATTRIBS));
            c.push("w17" + b.getParameter(b.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
            c.push("w18" + b.getParameter(b.MAX_VERTEX_UNIFORM_VECTORS));
            c.push("w19" + a(b.getParameter(b.MAX_VIEWPORT_DIMS)));
            c.push("w20" + b.getParameter(b.RED_BITS));
            c.push("w21" + b.getParameter(b.RENDERER));
            c.push("w22" + b.getParameter(b.SHADING_LANGUAGE_VERSION));
            c.push("w23" + b.getParameter(b.STENCIL_BITS));
            c.push("w24" + b.getParameter(b.VENDOR));
            c.push("w25" + b.getParameter(b.VERSION));
            try {
                var C = b.getExtension("WEBGL_debug_renderer_info");
                C && (c.push("wuv:" + b.getParameter(C.UNMASKED_VENDOR_WEBGL)),
                c.push("wur:" + b.getParameter(C.UNMASKED_RENDERER_WEBGL)))
            } catch (D) {}
            return c.join("\u00a7")
        },
        isCanvasSupported: function() {
            var a = document.createElement("canvas");
            return !(!a.getContext || !a.getContext("2d"))
        },
        isIE: function() {
            return "Microsoft Internet Explorer" === navigator.appName || "Netscape" === navigator.appName && /Trident/.test(navigator.userAgent) ? !0 : !1
        },
        getWebglCanvas: function() {
            var a = document.createElement("canvas")
              , b = null;
            try {
                var c = navigator.userAgent;
                c = c.toLowerCase();
                (0 < c.indexOf("jdjr-app") || 0 <= c.indexOf("jdapp")) && (0 < c.indexOf("iphone") || 0 < c.indexOf("ipad")) || (b = a.getContext("webgl") || a.getContext("experimental-webgl"))
            } catch (m) {}
            b || (b = null);
            return b
        },
        each: function(a, b, c) {
            if (null !== a)
                if (this.nativeForEach && a.forEach === this.nativeForEach)
                    a.forEach(b, c);
                else if (a.length === +a.length)
                    for (var m = 0, g = a.length; m < g && b.call(c, a[m], m, a) !== {}; m++)
                        ;
                else
                    for (m in a)
                        if (a.hasOwnProperty(m) && b.call(c, a[m], m, a) === {})
                            break
        },
        map: function(a, b, c) {
            var m = [];
            if (null == a)
                return m;
            if (this.nativeMap && a.map === this.nativeMap)
                return a.map(b, c);
            this.each(a, function(g, n, z) {
                m[m.length] = b.call(c, g, n, z)
            });
            return m
        },
        x64Add: function(a, b) {
            a = [a[0] >>> 16, a[0] & 65535, a[1] >>> 16, a[1] & 65535];
            b = [b[0] >>> 16, b[0] & 65535, b[1] >>> 16, b[1] & 65535];
            var c = [0, 0, 0, 0];
            c[3] += a[3] + b[3];
            c[2] += c[3] >>> 16;
            c[3] &= 65535;
            c[2] += a[2] + b[2];
            c[1] += c[2] >>> 16;
            c[2] &= 65535;
            c[1] += a[1] + b[1];
            c[0] += c[1] >>> 16;
            c[1] &= 65535;
            c[0] += a[0] + b[0];
            c[0] &= 65535;
            return [c[0] << 16 | c[1], c[2] << 16 | c[3]]
        },
        x64Multiply: function(a, b) {
            a = [a[0] >>> 16, a[0] & 65535, a[1] >>> 16, a[1] & 65535];
            b = [b[0] >>> 16, b[0] & 65535, b[1] >>> 16, b[1] & 65535];
            var c = [0, 0, 0, 0];
            c[3] += a[3] * b[3];
            c[2] += c[3] >>> 16;
            c[3] &= 65535;
            c[2] += a[2] * b[3];
            c[1] += c[2] >>> 16;
            c[2] &= 65535;
            c[2] += a[3] * b[2];
            c[1] += c[2] >>> 16;
            c[2] &= 65535;
            c[1] += a[1] * b[3];
            c[0] += c[1] >>> 16;
            c[1] &= 65535;
            c[1] += a[2] * b[2];
            c[0] += c[1] >>> 16;
            c[1] &= 65535;
            c[1] += a[3] * b[1];
            c[0] += c[1] >>> 16;
            c[1] &= 65535;
            c[0] += a[0] * b[3] + a[1] * b[2] + a[2] * b[1] + a[3] * b[0];
            c[0] &= 65535;
            return [c[0] << 16 | c[1], c[2] << 16 | c[3]]
        },
        x64Rotl: function(a, b) {
            b %= 64;
            if (32 === b)
                return [a[1], a[0]];
            if (32 > b)
                return [a[0] << b | a[1] >>> 32 - b, a[1] << b | a[0] >>> 32 - b];
            b -= 32;
            return [a[1] << b | a[0] >>> 32 - b, a[0] << b | a[1] >>> 32 - b]
        },
        x64LeftShift: function(a, b) {
            b %= 64;
            return 0 === b ? a : 32 > b ? [a[0] << b | a[1] >>> 32 - b, a[1] << b] : [a[1] << b - 32, 0]
        },
        x64Xor: function(a, b) {
            return [a[0] ^ b[0], a[1] ^ b[1]]
        },
        x64Fmix: function(a) {
            a = this.x64Xor(a, [0, a[0] >>> 1]);
            a = this.x64Multiply(a, [4283543511, 3981806797]);
            a = this.x64Xor(a, [0, a[0] >>> 1]);
            a = this.x64Multiply(a, [3301882366, 444984403]);
            return a = this.x64Xor(a, [0, a[0] >>> 1])
        },
        x64hash128: function(a, b) {
            a = a || "";
            b = b || 0;
            var c = a.length % 16
              , m = a.length - c
              , g = [0, b];
            b = [0, b];
            for (var n, z, C = [2277735313, 289559509], D = [1291169091, 658871167], B = 0; B < m; B += 16)
                n = [a.charCodeAt(B + 4) & 255 | (a.charCodeAt(B + 5) & 255) << 8 | (a.charCodeAt(B + 6) & 255) << 16 | (a.charCodeAt(B + 7) & 255) << 24, a.charCodeAt(B) & 255 | (a.charCodeAt(B + 1) & 255) << 8 | (a.charCodeAt(B + 2) & 255) << 16 | (a.charCodeAt(B + 3) & 255) << 24],
                z = [a.charCodeAt(B + 12) & 255 | (a.charCodeAt(B + 13) & 255) << 8 | (a.charCodeAt(B + 14) & 255) << 16 | (a.charCodeAt(B + 15) & 255) << 24, a.charCodeAt(B + 8) & 255 | (a.charCodeAt(B + 9) & 255) << 8 | (a.charCodeAt(B + 10) & 255) << 16 | (a.charCodeAt(B + 11) & 255) << 24],
                n = this.x64Multiply(n, C),
                n = this.x64Rotl(n, 31),
                n = this.x64Multiply(n, D),
                g = this.x64Xor(g, n),
                g = this.x64Rotl(g, 27),
                g = this.x64Add(g, b),
                g = this.x64Add(this.x64Multiply(g, [0, 5]), [0, 1390208809]),
                z = this.x64Multiply(z, D),
                z = this.x64Rotl(z, 33),
                z = this.x64Multiply(z, C),
                b = this.x64Xor(b, z),
                b = this.x64Rotl(b, 31),
                b = this.x64Add(b, g),
                b = this.x64Add(this.x64Multiply(b, [0, 5]), [0, 944331445]);
            n = [0, 0];
            z = [0, 0];
            switch (c) {
            case 15:
                z = this.x64Xor(z, this.x64LeftShift([0, a.charCodeAt(B + 14)], 48));
            case 14:
                z = this.x64Xor(z, this.x64LeftShift([0, a.charCodeAt(B + 13)], 40));
            case 13:
                z = this.x64Xor(z, this.x64LeftShift([0, a.charCodeAt(B + 12)], 32));
            case 12:
                z = this.x64Xor(z, this.x64LeftShift([0, a.charCodeAt(B + 11)], 24));
            case 11:
                z = this.x64Xor(z, this.x64LeftShift([0, a.charCodeAt(B + 10)], 16));
            case 10:
                z = this.x64Xor(z, this.x64LeftShift([0, a.charCodeAt(B + 9)], 8));
            case 9:
                z = this.x64Xor(z, [0, a.charCodeAt(B + 8)]),
                z = this.x64Multiply(z, D),
                z = this.x64Rotl(z, 33),
                z = this.x64Multiply(z, C),
                b = this.x64Xor(b, z);
            case 8:
                n = this.x64Xor(n, this.x64LeftShift([0, a.charCodeAt(B + 7)], 56));
            case 7:
                n = this.x64Xor(n, this.x64LeftShift([0, a.charCodeAt(B + 6)], 48));
            case 6:
                n = this.x64Xor(n, this.x64LeftShift([0, a.charCodeAt(B + 5)], 40));
            case 5:
                n = this.x64Xor(n, this.x64LeftShift([0, a.charCodeAt(B + 4)], 32));
            case 4:
                n = this.x64Xor(n, this.x64LeftShift([0, a.charCodeAt(B + 3)], 24));
            case 3:
                n = this.x64Xor(n, this.x64LeftShift([0, a.charCodeAt(B + 2)], 16));
            case 2:
                n = this.x64Xor(n, this.x64LeftShift([0, a.charCodeAt(B + 1)], 8));
            case 1:
                n = this.x64Xor(n, [0, a.charCodeAt(B)]),
                n = this.x64Multiply(n, C),
                n = this.x64Rotl(n, 31),
                n = this.x64Multiply(n, D),
                g = this.x64Xor(g, n)
            }
            g = this.x64Xor(g, [0, a.length]);
            b = this.x64Xor(b, [0, a.length]);
            g = this.x64Add(g, b);
            b = this.x64Add(b, g);
            g = this.x64Fmix(g);
            b = this.x64Fmix(b);
            g = this.x64Add(g, b);
            b = this.x64Add(b, g);
            return ("00000000" + (g[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (g[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (b[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (b[1] >>> 0).toString(16)).slice(-8)
        }
    };
    return f
});
var JDDSecCryptoJS = JDDSecCryptoJS || function(u, t) {
    var v = {}
      , x = v.lib = {}
      , w = x.Base = function() {
        function h() {}
        return {
            extend: function(q) {
                h.prototype = this;
                var a = new h;
                q && a.mixIn(q);
                a.hasOwnProperty("init") || (a.init = function() {
                    a.$super.init.apply(this, arguments)
                }
                );
                a.init.prototype = a;
                a.$super = this;
                return a
            },
            create: function() {
                var q = this.extend();
                q.init.apply(q, arguments);
                return q
            },
            init: function() {},
            mixIn: function(q) {
                for (var a in q)
                    q.hasOwnProperty(a) && (this[a] = q[a]);
                q.hasOwnProperty("toString") && (this.toString = q.toString)
            },
            clone: function() {
                return this.init.prototype.extend(this)
            }
        }
    }()
      , A = x.WordArray = w.extend({
        init: function(h, q) {
            h = this.words = h || [];
            this.sigBytes = q != t ? q : 4 * h.length
        },
        toString: function(h) {
            return (h || e).stringify(this)
        },
        concat: function(h) {
            var q = this.words
              , a = h.words
              , b = this.sigBytes;
            h = h.sigBytes;
            this.clamp();
            if (b % 4)
                for (var c = 0; c < h; c++)
                    q[b + c >>> 2] |= (a[c >>> 2] >>> 24 - c % 4 * 8 & 255) << 24 - (b + c) % 4 * 8;
            else if (65535 < a.length)
                for (c = 0; c < h; c += 4)
                    q[b + c >>> 2] = a[c >>> 2];
            else
                q.push.apply(q, a);
            this.sigBytes += h;
            return this
        },
        clamp: function() {
            var h = this.words
              , q = this.sigBytes;
            h[q >>> 2] &= 4294967295 << 32 - q % 4 * 8;
            h.length = u.ceil(q / 4)
        },
        clone: function() {
            var h = w.clone.call(this);
            h.words = this.words.slice(0);
            return h
        },
        random: function(h) {
            for (var q = [], a = 0; a < h; a += 4)
                q.push(4294967296 * u.random() | 0);
            return new A.init(q,h)
        }
    });
    x.UUID = w.extend({
        generateUuid: function() {
            for (var h = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split(""), q = 0, a = h.length; q < a; q++)
                switch (h[q]) {
                case "x":
                    h[q] = u.floor(16 * u.random()).toString(16);
                    break;
                case "y":
                    h[q] = (u.floor(4 * u.random()) + 8).toString(16)
                }
            return h.join("")
        }
    });
    var l = v.enc = {}
      , e = l.Hex = {
        stringify: function(h) {
            var q = h.words;
            h = h.sigBytes;
            var a = [];
            for (var b = 0; b < h; b++) {
                var c = q[b >>> 2] >>> 24 - b % 4 * 8 & 255;
                a.push((c >>> 4).toString(16));
                a.push((c & 15).toString(16))
            }
            return a.join("")
        },
        parse: function(h) {
            for (var q = h.length, a = [], b = 0; b < q; b += 2)
                a[b >>> 3] |= parseInt(h.substr(b, 2), 16) << 24 - b % 8 * 4;
            return new A.init(a,q / 2)
        }
    }
      , r = l.Latin1 = {
        stringify: function(h) {
            var q = h.words;
            h = h.sigBytes;
            for (var a = [], b = 0; b < h; b++)
                a.push(String.fromCharCode(q[b >>> 2] >>> 24 - b % 4 * 8 & 255));
            return a.join("")
        },
        parse: function(h) {
            for (var q = h.length, a = [], b = 0; b < q; b++)
                a[b >>> 2] |= (h.charCodeAt(b) & 255) << 24 - b % 4 * 8;
            return new A.init(a,q)
        }
    }
      , f = l.Utf8 = {
        stringify: function(h) {
            try {
                return decodeURIComponent(escape(r.stringify(h)))
            } catch (q) {
                throw Error("Malformed UTF-8 data");
            }
        },
        parse: function(h) {
            return r.parse(unescape(encodeURIComponent(h)))
        }
    }
      , k = x.BufferedBlockAlgorithm = w.extend({
        reset: function() {
            this._data = new A.init;
            this._nDataBytes = 0
        },
        _append: function(h) {
            "string" == typeof h && (h = f.parse(h));
            this._data.concat(h);
            this._nDataBytes += h.sigBytes
        },
        _process: function(h) {
            var q = this._data
              , a = q.words
              , b = q.sigBytes
              , c = this.blockSize
              , m = b / (4 * c);
            m = h ? u.ceil(m) : u.max((m | 0) - this._minBufferSize, 0);
            h = m * c;
            b = u.min(4 * h, b);
            if (h) {
                for (var g = 0; g < h; g += c)
                    this._doProcessBlock(a, g);
                g = a.splice(0, h);
                q.sigBytes -= b
            }
            return new A.init(g,b)
        },
        clone: function() {
            var h = w.clone.call(this);
            h._data = this._data.clone();
            return h
        },
        _minBufferSize: 0
    });
    x.Hasher = k.extend({
        cfg: w.extend(),
        init: function(h) {
            this.cfg = this.cfg.extend(h);
            this.reset()
        },
        reset: function() {
            k.reset.call(this);
            this._doReset()
        },
        update: function(h) {
            this._append(h);
            this._process();
            return this
        },
        finalize: function(h) {
            h && this._append(h);
            return this._doFinalize()
        },
        blockSize: 16,
        _createHelper: function(h) {
            return function(q, a) {
                return (new h.init(a)).finalize(q)
            }
        },
        _createHmacHelper: function(h) {
            return function(q, a) {
                return (new y.HMAC.init(h,a)).finalize(q)
            }
        }
    });
    var y = v.algo = {};
    v.channel = {};
    return v
}(Math);
JDDSecCryptoJS.lib.Cipher || function(u) {
    var t = JDDSecCryptoJS
      , v = t.lib
      , x = v.Base
      , w = v.WordArray
      , A = v.BufferedBlockAlgorithm
      , l = v.Cipher = A.extend({
        cfg: x.extend(),
        createEncryptor: function(h, q) {
            return this.create(this._ENC_XFORM_MODE, h, q)
        },
        createDecryptor: function(h, q) {
            return this.create(this._DEC_XFORM_MODE, h, q)
        },
        init: function(h, q, a) {
            this.cfg = this.cfg.extend(a);
            this._xformMode = h;
            this._key = q;
            this.reset()
        },
        reset: function() {
            A.reset.call(this);
            this._doReset()
        },
        process: function(h) {
            this._append(h);
            return this._process()
        },
        finalize: function(h) {
            h && this._append(h);
            return this._doFinalize()
        },
        keySize: 4,
        ivSize: 4,
        _ENC_XFORM_MODE: 1,
        _DEC_XFORM_MODE: 2,
        _createHelper: function() {
            function h(q) {
                if ("string" != typeof q)
                    return y
            }
            return function(q) {
                return {
                    encrypt: function(a, b, c) {
                        return h(b).encrypt(q, a, b, c)
                    },
                    decrypt: function(a, b, c) {
                        return h(b).decrypt(q, a, b, c)
                    }
                }
            }
        }()
    });
    v.StreamCipher = l.extend({
        _doFinalize: function() {
            return this._process(!0)
        },
        blockSize: 1
    });
    var e = t.mode = {}
      , r = v.BlockCipherMode = x.extend({
        createEncryptor: function(h, q) {
            return this.Encryptor.create(h, q)
        },
        createDecryptor: function(h, q) {
            return this.Decryptor.create(h, q)
        },
        init: function(h, q) {
            this._cipher = h;
            this._iv = q
        }
    });
    e = e.CBC = function() {
        function h(a, b, c) {
            var m = this._iv;
            m ? this._iv = u : m = this._prevBlock;
            for (var g = 0; g < c; g++)
                a[b + g] ^= m[g]
        }
        var q = r.extend();
        q.Encryptor = q.extend({
            processBlock: function(a, b) {
                var c = this._cipher
                  , m = c.blockSize;
                h.call(this, a, b, m);
                c.encryptBlock(a, b);
                this._prevBlock = a.slice(b, b + m)
            }
        });
        q.Decryptor = q.extend({
            processBlock: function(a, b) {
                var c = this._cipher
                  , m = c.blockSize
                  , g = a.slice(b, b + m);
                c.decryptBlock(a, b);
                h.call(this, a, b, m);
                this._prevBlock = g
            }
        });
        return q
    }();
    var f = (t.pad = {}).Pkcs7 = {
        pad: function(h, q) {
            q *= 4;
            q -= h.sigBytes % q;
            for (var a = q << 24 | q << 16 | q << 8 | q, b = [], c = 0; c < q; c += 4)
                b.push(a);
            q = w.create(b, q);
            h.concat(q)
        },
        unpad: function(h) {
            h.sigBytes -= h.words[h.sigBytes - 1 >>> 2] & 255
        }
    };
    v.BlockCipher = l.extend({
        cfg: l.cfg.extend({
            mode: e,
            padding: f
        }),
        reset: function() {
            l.reset.call(this);
            var h = this.cfg
              , q = h.iv;
            h = h.mode;
            if (this._xformMode == this._ENC_XFORM_MODE)
                var a = h.createEncryptor;
            else
                a = h.createDecryptor,
                this._minBufferSize = 1;
            this._mode = a.call(h, this, q && q.words)
        },
        _doProcessBlock: function(h, q) {
            this._mode.processBlock(h, q)
        },
        _doFinalize: function() {
            var h = this.cfg.padding;
            if (this._xformMode == this._ENC_XFORM_MODE) {
                h.pad(this._data, this.blockSize);
                var q = this._process(!0)
            } else
                q = this._process(!0),
                h.unpad(q);
            return q
        },
        blockSize: 4
    });
    var k = v.CipherParams = x.extend({
        init: function(h) {
            this.mixIn(h)
        },
        toString: function(h) {
            return (h || this.formatter).stringify(this)
        }
    });
    t.format = {};
    var y = v.SerializableCipher = x.extend({
        cfg: x.extend({}),
        encrypt: function(h, q, a, b) {
            b = this.cfg.extend(b);
            var c = h.createEncryptor(a, b);
            q = c.finalize(q);
            c = c.cfg;
            return k.create({
                ciphertext: q,
                key: a,
                iv: c.iv,
                algorithm: h,
                mode: c.mode,
                padding: c.padding,
                blockSize: h.blockSize,
                formatter: b.format
            })
        },
        decrypt: function(h, q, a, b) {
            b = this.cfg.extend(b);
            q = this._parse(q, b.format);
            return h.createDecryptor(a, b).finalize(q.ciphertext)
        },
        _parse: function(h, q) {
            return "string" == typeof h ? q.parse(h, this) : h
        }
    })
}();
(function() {
    var u = JDDSecCryptoJS
      , t = u.lib.BlockCipher
      , v = u.algo
      , x = []
      , w = []
      , A = []
      , l = []
      , e = []
      , r = []
      , f = []
      , k = []
      , y = []
      , h = [];
    (function() {
        for (var a = [], b = 0; 256 > b; b++)
            a[b] = 128 > b ? b << 1 : b << 1 ^ 283;
        var c = 0
          , m = 0;
        for (b = 0; 256 > b; b++) {
            var g = m ^ m << 1 ^ m << 2 ^ m << 3 ^ m << 4;
            g = g >>> 8 ^ g & 255 ^ 99;
            x[c] = g;
            w[g] = c;
            var n = a[c]
              , z = a[n]
              , C = a[z]
              , D = 257 * a[g] ^ 16843008 * g;
            A[c] = D << 24 | D >>> 8;
            l[c] = D << 16 | D >>> 16;
            e[c] = D << 8 | D >>> 24;
            r[c] = D;
            D = 16843009 * C ^ 65537 * z ^ 257 * n ^ 16843008 * c;
            f[g] = D << 24 | D >>> 8;
            k[g] = D << 16 | D >>> 16;
            y[g] = D << 8 | D >>> 24;
            h[g] = D;
            c ? (c = n ^ a[a[a[C ^ n]]],
            m ^= a[a[m]]) : c = m = 1
        }
    }
    )();
    var q = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
    v = v.AES = t.extend({
        _doReset: function() {
            var a = this._key
              , b = a.words
              , c = a.sigBytes / 4;
            a = 4 * ((this._nRounds = c + 6) + 1);
            for (var m = this._keySchedule = [], g = 0; g < a; g++)
                if (g < c)
                    m[g] = b[g];
                else {
                    var n = m[g - 1];
                    g % c ? 6 < c && 4 == g % c && (n = x[n >>> 24] << 24 | x[n >>> 16 & 255] << 16 | x[n >>> 8 & 255] << 8 | x[n & 255]) : (n = n << 8 | n >>> 24,
                    n = x[n >>> 24] << 24 | x[n >>> 16 & 255] << 16 | x[n >>> 8 & 255] << 8 | x[n & 255],
                    n ^= q[g / c | 0] << 24);
                    m[g] = m[g - c] ^ n
                }
            b = this._invKeySchedule = [];
            for (c = 0; c < a; c++)
                g = a - c,
                n = c % 4 ? m[g] : m[g - 4],
                b[c] = 4 > c || 4 >= g ? n : f[x[n >>> 24]] ^ k[x[n >>> 16 & 255]] ^ y[x[n >>> 8 & 255]] ^ h[x[n & 255]]
        },
        encryptBlock: function(a, b) {
            this._doCryptBlock(a, b, this._keySchedule, A, l, e, r, x)
        },
        decryptBlock: function(a, b) {
            var c = a[b + 1];
            a[b + 1] = a[b + 3];
            a[b + 3] = c;
            this._doCryptBlock(a, b, this._invKeySchedule, f, k, y, h, w);
            c = a[b + 1];
            a[b + 1] = a[b + 3];
            a[b + 3] = c
        },
        _doCryptBlock: function(a, b, c, m, g, n, z, C) {
            for (var D = this._nRounds, B = a[b] ^ c[0], F = a[b + 1] ^ c[1], H = a[b + 2] ^ c[2], G = a[b + 3] ^ c[3], I = 4, M = 1; M < D; M++) {
                var J = m[B >>> 24] ^ g[F >>> 16 & 255] ^ n[H >>> 8 & 255] ^ z[G & 255] ^ c[I++]
                  , K = m[F >>> 24] ^ g[H >>> 16 & 255] ^ n[G >>> 8 & 255] ^ z[B & 255] ^ c[I++]
                  , L = m[H >>> 24] ^ g[G >>> 16 & 255] ^ n[B >>> 8 & 255] ^ z[F & 255] ^ c[I++];
                G = m[G >>> 24] ^ g[B >>> 16 & 255] ^ n[F >>> 8 & 255] ^ z[H & 255] ^ c[I++];
                B = J;
                F = K;
                H = L
            }
            J = (C[B >>> 24] << 24 | C[F >>> 16 & 255] << 16 | C[H >>> 8 & 255] << 8 | C[G & 255]) ^ c[I++];
            K = (C[F >>> 24] << 24 | C[H >>> 16 & 255] << 16 | C[G >>> 8 & 255] << 8 | C[B & 255]) ^ c[I++];
            L = (C[H >>> 24] << 24 | C[G >>> 16 & 255] << 16 | C[B >>> 8 & 255] << 8 | C[F & 255]) ^ c[I++];
            G = (C[G >>> 24] << 24 | C[B >>> 16 & 255] << 16 | C[F >>> 8 & 255] << 8 | C[H & 255]) ^ c[I++];
            a[b] = J;
            a[b + 1] = K;
            a[b + 2] = L;
            a[b + 3] = G
        },
        keySize: 8
    });
    u.AES = t._createHelper(v)
}
)();
(function() {
    var u = JDDSecCryptoJS
      , t = u.lib
      , v = t.WordArray
      , x = t.Hasher
      , w = [];
    t = u.algo.SHA1 = x.extend({
        _doReset: function() {
            this._hash = new v.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
        },
        _doProcessBlock: function(A, l) {
            for (var e = this._hash.words, r = e[0], f = e[1], k = e[2], y = e[3], h = e[4], q = 0; 80 > q; q++) {
                if (16 > q)
                    w[q] = A[l + q] | 0;
                else {
                    var a = w[q - 3] ^ w[q - 8] ^ w[q - 14] ^ w[q - 16];
                    w[q] = a << 1 | a >>> 31
                }
                a = (r << 5 | r >>> 27) + h + w[q];
                a = 20 > q ? a + ((f & k | ~f & y) + 1518500249) : 40 > q ? a + ((f ^ k ^ y) + 1859775393) : 60 > q ? a + ((f & k | f & y | k & y) - 1894007588) : a + ((f ^ k ^ y) - 899497514);
                h = y;
                y = k;
                k = f << 30 | f >>> 2;
                f = r;
                r = a
            }
            e[0] = e[0] + r | 0;
            e[1] = e[1] + f | 0;
            e[2] = e[2] + k | 0;
            e[3] = e[3] + y | 0;
            e[4] = e[4] + h | 0
        },
        _doFinalize: function() {
            var A = this._data
              , l = A.words
              , e = 8 * this._nDataBytes
              , r = 8 * A.sigBytes;
            l[r >>> 5] |= 128 << 24 - r % 32;
            l[(r + 64 >>> 9 << 4) + 14] = Math.floor(e / 4294967296);
            l[(r + 64 >>> 9 << 4) + 15] = e;
            A.sigBytes = 4 * l.length;
            this._process();
            return this._hash
        },
        clone: function() {
            var A = x.clone.call(this);
            A._hash = this._hash.clone();
            return A
        }
    });
    u.SHA1 = x._createHelper(t);
    u.HmacSHA1 = x._createHmacHelper(t)
}
)();
(function() {
    var u = JDDSecCryptoJS
      , t = u.channel;
    t.Downlink = {
        deBase32: function(v) {
            if (void 0 == v || "" == v || null == v)
                return "";
            var x = u.enc.Hex.parse("30313233343536373839616263646566")
              , w = u.enc.Hex.parse("724e5428476f307361374d3233784a6c");
            return u.AES.decrypt({
                ciphertext: u.enc.Base32.parse(v)
            }, w, {
                mode: u.mode.CBC,
                padding: u.pad.Pkcs7,
                iv: x
            }).toString(u.enc.Utf8)
        },
        deBase64: function(v) {
            return ""
        }
    };
    t.Uplink = {
        enAsBase32: function(v) {
            return ""
        },
        enAsBase64: function(v) {
            return ""
        }
    }
}
)();
(function() {
    var u = JDDSecCryptoJS
      , t = u.lib.WordArray;
    u.enc.Base32 = {
        stringify: function(v) {
            var x = v.words
              , w = v.sigBytes
              , A = this._map;
            v.clamp();
            v = [];
            for (var l = 0; l < w; l += 5) {
                for (var e = [], r = 0; 5 > r; r++)
                    e[r] = x[l + r >>> 2] >>> 24 - (l + r) % 4 * 8 & 255;
                e = [e[0] >>> 3 & 31, (e[0] & 7) << 2 | e[1] >>> 6 & 3, e[1] >>> 1 & 31, (e[1] & 1) << 4 | e[2] >>> 4 & 15, (e[2] & 15) << 1 | e[3] >>> 7 & 1, e[3] >>> 2 & 31, (e[3] & 3) << 3 | e[4] >>> 5 & 7, e[4] & 31];
                for (r = 0; 8 > r && l + .625 * r < w; r++)
                    v.push(A.charAt(e[r]))
            }
            if (x = A.charAt(32))
                for (; v.length % 8; )
                    v.push(x);
            return v.join("")
        },
        parse: function(v) {
            var x = v.length
              , w = this._map
              , A = w.charAt(32);
            A && (A = v.indexOf(A),
            -1 != A && (x = A));
            A = [];
            for (var l = 0, e = 0; e < x; e++) {
                var r = e % 8;
                if (0 != r && 2 != r && 5 != r) {
                    var f = 255 & w.indexOf(v.charAt(e - 1)) << (40 - 5 * r) % 8
                      , k = 255 & w.indexOf(v.charAt(e)) >>> (5 * r - 3) % 8;
                    r = r % 3 ? 0 : 255 & w.indexOf(v.charAt(e - 2)) << (3 == r ? 6 : 7);
                    A[l >>> 2] |= (f | k | r) << 24 - l % 4 * 8;
                    l++
                }
            }
            return t.create(A, l)
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
    }
}
)();
(function(u, t, v) {
    "undefined" !== typeof module && module.exports ? module.exports = v() : t[u] = v()
}
)("JDDMAC", this, function() {
    var u = function() {
        return "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D".split(" ").map(function(v) {
            return parseInt(v, 16)
        })
    }()
      , t = function() {};
    t.prototype = {
        mac: function(v) {
            for (var x = -1, w = 0, A = v.length; w < A; w++)
                x = x >>> 8 ^ u[(x ^ v.charCodeAt(w)) & 255];
            return (x ^ -1) >>> 0
        }
    };
    return t
});
var _CurrentPageProtocol = "https:" == document.location.protocol ? "https://" : "http://"
  , _JdJrTdRiskDomainName = window.__fp_domain || "gia.jd.com"
  , _url_query_str = ""
  , _root_domain = ""
  , _CurrentPageUrl = function() {
    var u = document.location.href.toString();
    try {
        _root_domain = /^https?:\/\/(?:\w+\.)*?(\w*\.(?:com\.cn|cn|com|net|id))[\\\/]*/.exec(u)[1]
    } catch (v) {}
    var t = u.indexOf("?");
    0 < t && (_url_query_str = u.substring(t + 1),
    500 < _url_query_str.length && (_url_query_str = _url_query_str.substring(0, 499)),
    u = u.substring(0, t));
    return u = u.substring(_CurrentPageProtocol.length)
}()
  , jd_shadow__ = function() {
    try {
        var u = JDDSecCryptoJS
          , t = [];
        t.push(_CurrentPageUrl);
        var v = u.lib.UUID.generateUuid();
        t.push(v);
        var x = (new Date).getTime();
        t.push(x);
        var w = u.SHA1(t.join("")).toString().toUpperCase();
        t = [];
        t.push("JD3");
        t.push(w);
        var A = (new JDDMAC).mac(t.join(""));
        t.push(A);
        var l = u.enc.Hex.parse("30313233343536373839616263646566")
          , e = u.enc.Hex.parse("4c5751554935255042304e6458323365")
          , r = t.join("");
        return u.AES.encrypt(u.enc.Utf8.parse(r), e, {
            mode: u.mode.CBC,
            padding: u.pad.Pkcs7,
            iv: l
        }).ciphertext.toString(u.enc.Base32)
    } catch (f) {}
}()
  , td_collect = new function() {
    function u(l) {
        var e;
        return (e = document.cookie.match(new RegExp("(^| )" + l + "=([^;]*)(;|$)"))) ? e[2] : ""
    }
    function t() {
        function l(y) {
            var h = {};
            f.style.fontFamily = y;
            document.body.appendChild(f);
            h.height = f.offsetHeight;
            h.width = f.offsetWidth;
            document.body.removeChild(f);
            return h
        }
        var e = ["monospace", "sans-serif", "serif"]
          , r = []
          , f = document.createElement("span");
        f.style.fontSize = "72px";
        f.style.visibility = "hidden";
        f.innerHTML = "mmmmmmmmmmlli";
        for (var k = 0; k < e.length; k++)
            r[k] = l(e[k]);
        this.checkSupportFont = function(y) {
            for (var h = 0; h < r.length; h++) {
                var q = l(y + "," + e[h])
                  , a = r[h];
                if (q.height !== a.height || q.width !== a.width)
                    return !0
            }
            return !1
        }
    }
    function v(l) {
        var e = {};
        e.name = l.name;
        e.filename = l.filename.toLowerCase();
        e.description = l.description;
        void 0 !== l.version && (e.version = l.version);
        e.mimeTypes = [];
        for (var r = 0; r < l.length; r++) {
            var f = l[r]
              , k = {};
            k.description = f.description;
            k.suffixes = f.suffixes;
            k.type = f.type;
            e.mimeTypes.push(k)
        }
        return e
    }
    this.bizId = "";
    this.bioConfig = {
        type: "42",
        operation: 1,
        duraTime: 2,
        interval: 50
    };
    this.worder = null;
    this.deviceInfo = {
        userAgent: "",
        isJdApp: !1,
        isJrApp: !1,
        sdkToken: "",
        fp: "",
        eid: ""
    };
    this.isRpTok = !1;
    this.obtainLocal = function(l) {
        l = "undefined" !== typeof l && l ? !0 : !1;
        var e = {};
        try {
            var r = document.cookie.replace(/(?:(?:^|.*;\s*)3AB9D23F7A4B3C9B\s*=\s*([^;]*).*$)|^.*$/, "$1");
            0 !== r.length && (e.cookie = r)
        } catch (k) {}
        try {
            window.localStorage && null !== window.localStorage && 0 !== window.localStorage.length && (e.localStorage = window.localStorage.getItem("3AB9D23F7A4B3C9B"))
        } catch (k) {}
        try {
            window.sessionStorage && null !== window.sessionStorage && (e.sessionStorage = window.sessionStorage["3AB9D23F7A4B3C9B"])
        } catch (k) {}
        try {
            p.globalStorage && (e.globalStorage = window.globalStorage[".localdomain"]["3AB9D23F7A4B3C9B"])
        } catch (k) {}
        try {
            d && "function" == typeof d.load && "function" == typeof d.getAttribute && (d.load("jdgia_user_data"),
            e.userData = d.getAttribute("3AB9D23F7A4B3C9B"))
        } catch (k) {}
        try {
            E.indexedDbId && (e.indexedDb = E.indexedDbId)
        } catch (k) {}
        try {
            E.webDbId && (e.webDb = E.webDbId)
        } catch (k) {}
        try {
            for (var f in e)
                if (32 < e[f].length) {
                    _JdEid = e[f];
                    l || (_eidFlag = !0);
                    break
                }
        } catch (k) {}
        try {
            ("undefined" === typeof _JdEid || 0 >= _JdEid.length) && this.db("3AB9D23F7A4B3C9B");
            if ("undefined" === typeof _JdEid || 0 >= _JdEid.length)
                _JdEid = u("3AB9D23F7A4B3C9B");
            if ("undefined" === typeof _JdEid || 0 >= _JdEid.length)
                _eidFlag = !0
        } catch (k) {}
        return _JdEid
    }
    ;
    var x = []
      , w = "Abadi MT Condensed Light;Adobe Fangsong Std;Adobe Hebrew;Adobe Ming Std;Agency FB;Arab;Arabic Typesetting;Arial Black;Batang;Bauhaus 93;Bell MT;Bitstream Vera Serif;Bodoni MT;Bookman Old Style;Braggadocio;Broadway;Calibri;Californian FB;Castellar;Casual;Centaur;Century Gothic;Chalkduster;Colonna MT;Copperplate Gothic Light;DejaVu LGC Sans Mono;Desdemona;DFKai-SB;Dotum;Engravers MT;Eras Bold ITC;Eurostile;FangSong;Forte;Franklin Gothic Heavy;French Script MT;Gabriola;Gigi;Gisha;Goudy Old Style;Gulim;GungSeo;Haettenschweiler;Harrington;Hiragino Sans GB;Impact;Informal Roman;KacstOne;Kino MT;Kozuka Gothic Pr6N;Lohit Gujarati;Loma;Lucida Bright;Lucida Fax;Magneto;Malgun Gothic;Matura MT Script Capitals;Menlo;MingLiU-ExtB;MoolBoran;MS PMincho;MS Reference Sans Serif;News Gothic MT;Niagara Solid;Nyala;Palace Script MT;Papyrus;Perpetua;Playbill;PMingLiU;Rachana;Rockwell;Sawasdee;Script MT Bold;Segoe Print;Showcard Gothic;SimHei;Snap ITC;TlwgMono;Tw Cen MT Condensed Extra Bold;Ubuntu;Umpush;Univers;Utopia;Vladimir Script;Wide Latin".split(";")
      , A = "4game;AdblockPlugin;AdobeExManCCDetect;AdobeExManDetect;Alawar NPAPI utils;Aliedit Plug-In;Alipay Security Control 3;AliSSOLogin plugin;AmazonMP3DownloaderPlugin;AOL Media Playback Plugin;AppUp;ArchiCAD;AVG SiteSafety plugin;Babylon ToolBar;Battlelog Game Launcher;BitCometAgent;Bitdefender QuickScan;BlueStacks Install Detector;CatalinaGroup Update;Citrix ICA Client;Citrix online plug-in;Citrix Receiver Plug-in;Coowon Update;DealPlyLive Update;Default Browser Helper;DivX Browser Plug-In;DivX Plus Web Player;DivX VOD Helper Plug-in;doubleTwist Web Plugin;Downloaders plugin;downloadUpdater;eMusicPlugin DLM6;ESN Launch Mozilla Plugin;ESN Sonar API;Exif Everywhere;Facebook Plugin;File Downloader Plug-in;FileLab plugin;FlyOrDie Games Plugin;Folx 3 Browser Plugin;FUZEShare;GDL Object Web Plug-in 16.00;GFACE Plugin;Ginger;Gnome Shell Integration;Google Earth Plugin;Google Earth Plug-in;Google Gears 0.5.33.0;Google Talk Effects Plugin;Google Update;Harmony Firefox Plugin;Harmony Plug-In;Heroes & Generals live;HPDetect;Html5 location provider;IE Tab plugin;iGetterScriptablePlugin;iMesh plugin;Kaspersky Password Manager;LastPass;LogMeIn Plugin 1.0.0.935;LogMeIn Plugin 1.0.0.961;Ma-Config.com plugin;Microsoft Office 2013;MinibarPlugin;Native Client;Nitro PDF Plug-In;Nokia Suite Enabler Plugin;Norton Identity Safe;npAPI Plugin;NPLastPass;NPPlayerShell;npTongbuAddin;NyxLauncher;Octoshape Streaming Services;Online Storage plug-in;Orbit Downloader;Pando Web Plugin;Parom.TV player plugin;PDF integrado do WebKit;PDF-XChange Viewer;PhotoCenterPlugin1.1.2.2;Picasa;PlayOn Plug-in;QQ2013 Firefox Plugin;QQDownload Plugin;QQMiniDL Plugin;QQMusic;RealDownloader Plugin;Roblox Launcher Plugin;RockMelt Update;Safer Update;SafeSearch;Scripting.Dictionary;SefClient Plugin;Shell.UIHelper;Silverlight Plug-In;Simple Pass;Skype Web Plugin;SumatraPDF Browser Plugin;Symantec PKI Client;Tencent FTN plug-in;Thunder DapCtrl NPAPI Plugin;TorchHelper;Unity Player;Uplay PC;VDownloader;Veetle TV Core;VLC Multimedia Plugin;Web Components;WebKit-integrierte PDF;WEBZEN Browser Extension;Wolfram Mathematica;WordCaptureX;WPI Detector 1.4;Yandex Media Plugin;Yandex PDF Viewer;YouTube Plug-in;zako".split(";");
    this.toJson = "object" === typeof JSON && JSON.stringify;
    this.init = function() {
        _fingerprint_step = 6;
        _fingerprint_step = 7;
        "function" !== typeof this.toJson && (this.toJson = function(l) {
            var e = typeof l;
            if ("undefined" === e || null === l)
                return "null";
            if ("number" === e || "boolean" === e)
                return l + "";
            if ("object" === e && l && l.constructor === Array) {
                e = [];
                for (var r = 0; l.length > r; r++)
                    e.push(this.toJson(l[r]));
                return "[" + (e + "]")
            }
            if ("object" === e) {
                e = [];
                for (r in l)
                    l.hasOwnProperty(r) && e.push('"' + r + '":' + this.toJson(l[r]));
                return "{" + (e + "}")
            }
        }
        );
        this.sdkCollectInit()
    }
    ;
    this.sdkCollectInit = function() {
        try {
            try {
                bp_bizid && (this.bizId = bp_bizid)
            } catch (r) {
                this.bizId = "jsDefault"
            }
            var l = navigator.userAgent.toLowerCase()
              , e = !l.match(/(iphone|ipad|ipod)/i) && (-1 < l.indexOf("android") || -1 < l.indexOf("adr"));
            this.deviceInfo.isJdApp = -1 < l.indexOf("jdapp");
            this.deviceInfo.isJrApp = -1 < l.indexOf("jdjr");
            this.deviceInfo.userAgent = navigator.userAgent;
            this.deviceInfo.isAndroid = e;
            this.createWorker()
        } catch (r) {}
    }
    ;
    this.db = function(l, e) {
        try {
            _fingerprint_step = "m";
            if (window.openDatabase) {
                var r = window.openDatabase("sqlite_jdtdstorage", "", "jdtdstorage", 1048576);
                void 0 !== e && "" != e ? r.transaction(function(f) {
                    f.executeSql("CREATE TABLE IF NOT EXISTS cache(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, value TEXT NOT NULL, UNIQUE (name))", [], function(k, y) {}, function(k, y) {});
                    f.executeSql("INSERT OR REPLACE INTO cache(name, value) VALUES(?, ?)", [l, e], function(k, y) {}, function(k, y) {})
                }) : r.transaction(function(f) {
                    f.executeSql("SELECT value FROM cache WHERE name=?", [l], function(k, y) {
                        1 <= y.rows.length && (_JdEid = y.rows.item(0).value)
                    }, function(k, y) {})
                })
            }
            _fingerprint_step = "n"
        } catch (f) {}
    }
    ;
    this.setCookie = function(l, e) {
        void 0 !== e && "" != e && (document.cookie = l + "=" + e + "; expires=Tue, 31 Dec 2030 00:00:00 UTC; path=/; domain=" + _root_domain)
    }
    ;
    this.tdencrypt = function(l) {
        l = this.toJson(l);
        l = encodeURIComponent(l);
        var e = ""
          , r = 0;
        do {
            var f = l.charCodeAt(r++);
            var k = l.charCodeAt(r++);
            var y = l.charCodeAt(r++);
            var h = f >> 2;
            f = (f & 3) << 4 | k >> 4;
            var q = (k & 15) << 2 | y >> 6;
            var a = y & 63;
            isNaN(k) ? q = a = 64 : isNaN(y) && (a = 64);
            e = e + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(h) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(f) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(q) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(a)
        } while (r < l.length);
        return e + "/"
    }
    ;
    this.collect = function() {
        var l = new Date;
        try {
            var e = document.createElement("div")
              , r = {}
              , f = "ActiveBorder ActiveCaption AppWorkspace Background ButtonFace ButtonHighlight ButtonShadow ButtonText CaptionText GrayText Highlight HighlightText InactiveBorder InactiveCaption InactiveCaptionText InfoBackground InfoText Menu MenuText Scrollbar ThreeDDarkShadow ThreeDFace ThreeDHighlight ThreeDLightShadow ThreeDShadow Window WindowFrame WindowText".split(" ");
            if (window.getComputedStyle)
                for (var k = 0; k < f.length; k++)
                    document.body.appendChild(e),
                    e.style.color = f[k],
                    r[f[k]] = window.getComputedStyle(e).getPropertyValue("color"),
                    document.body.removeChild(e)
        } catch (C) {}
        e = {
            ca: {},
            ts: {},
            m: {}
        };
        f = e.ca;
        f.tdHash = _jdfp_canvas_md5;
        var y = !1;
        if (k = window.WebGLRenderingContext)
            k = navigator.userAgent,
            k = k.toLowerCase(),
            k = (0 < k.indexOf("jdjr-app") || 0 <= k.indexOf("jdapp")) && (0 < k.indexOf("iphone") || 0 < k.indexOf("ipad")) ? !0 : !1,
            k = !k;
        if (k) {
            var h = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"], q = [], a;
            for (k = 0; k < h.length; k++)
                try {
                    var b = !1;
                    (b = document.createElement("canvas").getContext(h[k], {
                        stencil: !0
                    })) && b && (a = b,
                    q.push(h[k]))
                } catch (C) {}
            q.length && (y = {
                name: q,
                gl: a
            })
        }
        if (y) {
            k = y.gl;
            f.contextName = y.name.join();
            f.webglversion = k.getParameter(k.VERSION);
            f.shadingLV = k.getParameter(k.SHADING_LANGUAGE_VERSION);
            f.vendor = k.getParameter(k.VENDOR);
            f.renderer = k.getParameter(k.RENDERER);
            a = [];
            try {
                a = k.getSupportedExtensions(),
                f.extensions = a
            } catch (C) {}
            try {
                var c = k.getExtension("WEBGL_debug_renderer_info");
                c && (f.wuv = k.getParameter(c.UNMASKED_VENDOR_WEBGL),
                f.wur = k.getParameter(c.UNMASKED_RENDERER_WEBGL))
            } catch (C) {}
        }
        e.m.documentMode = document.documentMode;
        e.m.compatMode = document.compatMode;
        c = [];
        f = new t;
        for (k = 0; k < w.length; k++)
            a = w[k],
            f.checkSupportFont(a) && c.push(a);
        e.fo = c;
        k = {};
        c = [];
        for (var m in navigator)
            "object" != typeof navigator[m] && (k[m] = navigator[m]),
            c.push(m);
        k.enumerationOrder = c;
        k.javaEnabled = navigator.javaEnabled();
        try {
            k.taintEnabled = navigator.taintEnabled()
        } catch (C) {}
        e.n = k;
        k = navigator.userAgent.toLowerCase();
        if (m = k.match(/rv:([\d.]+)\) like gecko/))
            var g = m[1];
        if (m = k.match(/msie ([\d.]+)/))
            g = m[1];
        m = [];
        if (g)
            for (g = "AcroPDF.PDF;Adodb.Stream;AgControl.AgControl;DevalVRXCtrl.DevalVRXCtrl.1;MacromediaFlashPaper.MacromediaFlashPaper;Msxml2.DOMDocument;Msxml2.XMLHTTP;PDF.PdfCtrl;QuickTime.QuickTime;QuickTimeCheckObject.QuickTimeCheck.1;RealPlayer;RealPlayer.RealPlayer(tm) ActiveX Control (32-bit);RealVideo.RealVideo(tm) ActiveX Control (32-bit);rmocx.RealPlayer G2 Control;Scripting.Dictionary;Shell.UIHelper;ShockwaveFlash.ShockwaveFlash;SWCtl.SWCtl;TDCCtl.TDCCtl;WMPlayer.OCX".split(";"),
            k = 0; k < g.length; k++) {
                var n = g[k];
                try {
                    var z = new ActiveXObject(n);
                    c = {};
                    c.name = n;
                    try {
                        c.version = z.GetVariable("$version")
                    } catch (C) {}
                    try {
                        c.version = z.GetVersions()
                    } catch (C) {}
                    c.version && 0 < c.version.length || (c.version = "");
                    m.push(c)
                } catch (C) {}
            }
        else {
            g = navigator.plugins;
            c = {};
            for (k = 0; k < g.length; k++)
                n = g[k],
                c[n.name] = 1,
                m.push(v(n));
            for (k = 0; k < A.length; k++)
                z = A[k],
                c[z] || (n = g[z],
                n && m.push(v(n)))
        }
        g = "availHeight availWidth colorDepth bufferDepth deviceXDPI deviceYDPI height width logicalXDPI logicalYDPI pixelDepth updateInterval".split(" ");
        n = {};
        for (k = 0; g.length > k; k++)
            z = g[k],
            void 0 !== screen[z] && (n[z] = screen[z]);
        g = ["devicePixelRatio", "screenTop", "screenLeft"];
        c = {};
        for (k = 0; g.length > k; k++)
            z = g[k],
            void 0 !== window[z] && (c[z] = window[z]);
        e.p = m;
        e.w = c;
        e.s = n;
        e.sc = r;
        e.tz = l.getTimezoneOffset();
        e.lil = x.sort().join("|");
        e.wil = "";
        r = {};
        try {
            r.cookie = navigator.cookieEnabled,
            r.localStorage = !!window.localStorage,
            r.sessionStorage = !!window.sessionStorage,
            r.globalStorage = !!window.globalStorage,
            r.indexedDB = !!window.indexedDB
        } catch (C) {}
        e.ss = r;
        e.ts.deviceTime = l.getTime();
        e.ts.deviceEndTime = (new Date).getTime();
        return this.tdencrypt(e)
    }
    ;
    this.collectSdk = function(l) {
        try {
            var e = this
              , r = !1
              , f = e.getLocal("BATQW722QTLYVCRD");
            if (null != f && void 0 != f && "" != f)
                try {
                    var k = JSON.parse(f)
                      , y = (new Date).getTime();
                    null != k && void 0 != k.t && "number" == typeof k.t && (12E5 >= y - k.t && void 0 != k.tk && null != k.tk && "" != k.tk && k.tk.startsWith("jdd") ? (e.deviceInfo.sdkToken = k.tk,
                    r = !0) : void 0 != k.tk && null != k.tk && "" != k.tk && (e.deviceInfo.sdkToken = k.tk))
                } catch (h) {}
            f = !1;
            e.deviceInfo.isJdApp ? (e.deviceInfo.clientVersion = navigator.userAgent.split(";")[2],
            (f = 0 < e.compareVersion(e.deviceInfo.clientVersion, "7.0.2")) && !r && e.getJdSdkCacheToken(function(h) {
                e.deviceInfo.sdkToken = h;
                null != h && "" != h && h.startsWith("jdd") || e.getJdBioToken(l)
            })) : e.deviceInfo.isJrApp && (e.deviceInfo.clientVersion = navigator.userAgent.match(/clientVersion=([^&]*)(&|$)/)[1],
            (f = 0 < e.compareVersion(e.deviceInfo.clientVersion, "4.6.0")) && !r && e.getJdJrSdkCacheToken(function(h) {
                e.deviceInfo.sdkToken = h;
                null != h && "" != h && h.startsWith("jdd") || e.getJdJrBioToken(l)
            }));
            "function" == typeof l && l(e.deviceInfo)
        } catch (h) {}
    }
    ;
    this.compareVersion = function(l, e) {
        try {
            if (l === e)
                return 0;
            var r = l.split(".");
            var f = e.split(".");
            for (l = 0; l < r.length; l++) {
                var k = parseInt(r[l]);
                if (!f[l])
                    return 1;
                var y = parseInt(f[l]);
                if (k < y)
                    break;
                if (k > y)
                    return 1
            }
        } catch (h) {}
        return -1
    }
    ;
    this.isWKWebView = function() {
        return this.deviceInfo.userAgent.match(/supportJDSHWK/i) || 1 == window._is_jdsh_wkwebview ? !0 : !1
    }
    ;
    this.getErrorToken = function(l) {
        try {
            if (l) {
                var e = (l + "").match(/"token":"(.*?)"/);
                if (e && 1 < e.length)
                    return e[1]
            }
        } catch (r) {}
        return ""
    }
    ;
    this.getJdJrBioToken = function(l) {
        var e = this;
        "undefined" != typeof JrBridge && null != JrBridge && "undefined" != typeof JrBridge._version && (0 > e.compareVersion(JrBridge._version, "2.0.0") ? console.error("\u6865\u7248\u672c\u4f4e\u4e8e2.0\u4e0d\u652f\u6301bio") : JrBridge.callNative({
            type: e.bioConfig.type,
            operation: e.bioConfig.operation,
            biometricData: {
                bizId: e.bizId,
                duraTime: e.bioConfig.duraTime,
                interval: e.bioConfig.interval
            }
        }, function(r) {
            try {
                "object" != typeof r && (r = JSON.parse(r)),
                e.deviceInfo.sdkToken = r.token
            } catch (f) {
                console.error(f)
            }
            null != e.deviceInfo.sdkToken && "" != e.deviceInfo.sdkToken && (r = {
                tk: e.deviceInfo.sdkToken,
                t: (new Date).getTime()
            },
            e.store("BATQW722QTLYVCRD", JSON.stringify(r)))
        }))
    }
    ;
    this.getJdJrSdkCacheToken = function(l) {
        var e = this;
        try {
            "undefined" == typeof JrBridge || null == JrBridge || "undefined" == typeof JrBridge._version || 0 > e.compareVersion(JrBridge._version, "2.0.0") || JrBridge.callNative({
                type: e.bioConfig.type,
                operation: 5,
                biometricData: {
                    bizId: e.bizId,
                    duraTime: e.bioConfig.duraTime,
                    interval: e.bioConfig.interval
                }
            }, function(r) {
                var f = "";
                try {
                    "object" != typeof r && (r = JSON.parse(r)),
                    f = r.token
                } catch (k) {
                    console.error(k)
                }
                null != f && "" != f && "function" == typeof l && (l(f),
                f.startsWith("jdd") && (r = {
                    tk: f,
                    t: (new Date).getTime()
                },
                e.store("BATQW722QTLYVCRD", JSON.stringify(r))))
            })
        } catch (r) {}
    }
    ;
    this.getJdBioToken = function(l) {
        var e = this;
        l = JSON.stringify({
            businessType: "bridgeBiologicalProbe",
            callBackName: "_bioDeviceCb",
            params: {
                pin: "",
                jsonData: {
                    type: e.bioConfig.type,
                    operation: e.bioConfig.operation,
                    data: {
                        bizId: e.bizId,
                        duraTime: e.bioConfig.duraTime,
                        interval: e.bioConfig.interval
                    },
                    biometricData: {
                        bizId: e.bizId,
                        duraTime: e.bioConfig.duraTime,
                        interval: e.bioConfig.interval
                    }
                }
            }
        });
        e.isWKWebView() ? window.webkit.messageHandlers.JDAppUnite.postMessage({
            method: "notifyMessageToNative",
            params: l
        }) : window.JDAppUnite && window.JDAppUnite.notifyMessageToNative(l);
        window._bioDeviceCb = function(r) {
            try {
                var f = "object" == typeof r ? r : JSON.parse(r);
                if (void 0 != f && null != f && "0" != f.status)
                    return;
                null != f.data.token && void 0 != f.data.token && "" != f.data.token && (e.deviceInfo.sdkToken = f.data.token)
            } catch (k) {
                r = e.getErrorToken(r),
                null != r && "" != r && (e.deviceInfo.sdkToken = r)
            }
            null != e.deviceInfo.sdkToken && "" != e.deviceInfo.sdkToken && (r = {
                tk: e.deviceInfo.sdkToken,
                t: (new Date).getTime()
            },
            e.store("BATQW722QTLYVCRD", JSON.stringify(r)))
        }
    }
    ;
    this.getJdSdkCacheToken = function(l) {
        try {
            var e = this
              , r = JSON.stringify({
                businessType: "bridgeBiologicalProbe",
                callBackName: "_bioDeviceSdkCacheCb",
                params: {
                    pin: "",
                    jsonData: {
                        type: e.bioConfig.type,
                        operation: 5,
                        data: {
                            bizId: e.bizId,
                            duraTime: e.bioConfig.duraTime,
                            interval: e.bioConfig.interval
                        },
                        biometricData: {
                            bizId: e.bizId,
                            duraTime: e.bioConfig.duraTime,
                            interval: e.bioConfig.interval
                        }
                    }
                }
            });
            e.isWKWebView() ? window.webkit.messageHandlers.JDAppUnite.postMessage({
                method: "notifyMessageToNative",
                params: r
            }) : window.JDAppUnite && window.JDAppUnite.notifyMessageToNative(r);
            window._bioDeviceSdkCacheCb = function(f) {
                var k = "";
                try {
                    var y = "object" == typeof f ? f : JSON.parse(f);
                    if (void 0 != y && null != y && "0" != y.status)
                        return;
                    k = y.data.token
                } catch (h) {
                    k = e.getErrorToken(f)
                }
                null != k && "" != k && "function" == typeof l && (l(k),
                k.startsWith("jdd") && (f = {
                    tk: k,
                    t: (new Date).getTime()
                },
                e.store("BATQW722QTLYVCRD", JSON.stringify(f))))
            }
        } catch (f) {}
    }
    ;
    this.store = function(l, e) {
        try {
            this.setCookie(l, e)
        } catch (r) {}
        try {
            window.localStorage && window.localStorage.setItem(l, e)
        } catch (r) {}
        try {
            window.sessionStorage && window.sessionStorage.setItem(l, e)
        } catch (r) {}
        try {
            window.globalStorage && window.globalStorage[".localdomain"].setItem(l, e)
        } catch (r) {}
        try {
            this.db(l, _JdEid)
        } catch (r) {}
    }
    ;
    this.getLocal = function(l) {
        var e = {}
          , r = null;
        try {
            var f = document.cookie.replace(new RegExp("(?:(?:^|.*;\\s*)" + l + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1");
            0 !== f.length && (e.cookie = f)
        } catch (y) {}
        try {
            window.localStorage && null !== window.localStorage && 0 !== window.localStorage.length && (e.localStorage = window.localStorage.getItem(l))
        } catch (y) {}
        try {
            window.sessionStorage && null !== window.sessionStorage && (e.sessionStorage = window.sessionStorage[l])
        } catch (y) {}
        try {
            p.globalStorage && (e.globalStorage = window.globalStorage[".localdomain"][l])
        } catch (y) {}
        try {
            d && "function" == typeof d.load && "function" == typeof d.getAttribute && (d.load("jdgia_user_data"),
            e.userData = d.getAttribute(l))
        } catch (y) {}
        try {
            E.indexedDbId && (e.indexedDb = E.indexedDbId)
        } catch (y) {}
        try {
            E.webDbId && (e.webDb = E.webDbId)
        } catch (y) {}
        try {
            for (var k in e)
                if (32 < e[k].length) {
                    r = e[k];
                    break
                }
        } catch (y) {}
        try {
            if (null == r || "undefined" === typeof r || 0 >= r.length)
                r = u(l)
        } catch (y) {}
        return r
    }
    ;
    this.createWorker = function() {
        if (window.Worker) {
            try {
                var l = new Blob(["onmessage = function (event) {\n    var data = JSON.parse(event.data);\n    try {\n        var httpRequest;\n        try {\n            httpRequest = new XMLHttpRequest();\n        } catch (h) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Microsoft.XMLHTTP')\n            } catch (l) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml2.XMLHTTP')\n            } catch (r) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml3.XMLHTTP')\n            } catch (n) {}\n\n        if(data){\n            httpRequest['open']('POST', data.url, false);\n            httpRequest['setRequestHeader']('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');\n            httpRequest['onreadystatechange'] = function () {\n                if (4 === httpRequest['readyState'] && 200 === httpRequest['status']) {\n                    postMessage(httpRequest.responseText);\n                }\n            };\n            httpRequest['send'](data.data);\n        }\n\n    }catch (e){console.error(e);}\n};"],{
                    type: "application/javascript"
                })
            } catch (e) {
                window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder,
                l = new BlobBuilder,
                l.append("onmessage = function (event) {\n    var data = JSON.parse(event.data);\n    try {\n        var httpRequest;\n        try {\n            httpRequest = new XMLHttpRequest();\n        } catch (h) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Microsoft.XMLHTTP')\n            } catch (l) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml2.XMLHTTP')\n            } catch (r) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml3.XMLHTTP')\n            } catch (n) {}\n\n        if(data){\n            httpRequest['open']('POST', data.url, false);\n            httpRequest['setRequestHeader']('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');\n            httpRequest['onreadystatechange'] = function () {\n                if (4 === httpRequest['readyState'] && 200 === httpRequest['status']) {\n                    postMessage(httpRequest.responseText);\n                }\n            };\n            httpRequest['send'](data.data);\n        }\n\n    }catch (e){console.error(e);}\n};"),
                l = l.getBlob()
            }
            try {
                this.worker = new Worker(URL.createObjectURL(l))
            } catch (e) {}
        }
    }
    ;
    this.reportWorker = function(l, e, r, f) {
        try {
            null != this.worker && (this.worker.postMessage(JSON.stringify({
                url: l,
                data: e,
                success: !1,
                async: !1
            })),
            this.worker.onmessage = function(k) {}
            )
        } catch (k) {}
    }
}
;
function td_collect_exe() {
    _fingerprint_step = 8;
    var u = td_collect.collect();
    td_collect.collectSdk();
    var t = "string" === typeof orderId ? orderId : ""
      , v = "undefined" !== typeof jdfp_pinenp_ext && jdfp_pinenp_ext ? 2 : 1;
    t = {
        pin: _jdJrTdCommonsObtainPin(v),
        oid: t,
        p: "https:" == document.location.protocol ? "s" : "h",
        fp: risk_jd_local_fingerprint,
        ctype: v,
        v: "2.8.2.3",
        f: "3"
    };
    try {
        t.o = _CurrentPageUrl,
        t.qs = _url_query_str
    } catch (w) {}
    _fingerprint_step = 9;
    0 >= _JdEid.length && (_JdEid = td_collect.obtainLocal(),
    0 < _JdEid.length && (_eidFlag = !0));
    t.fc = _JdEid;
    try {
        t.t = jd_risk_token_id
    } catch (w) {}
    try {
        if ("undefined" != typeof gia_fp_qd_uuid && 0 <= gia_fp_qd_uuid.length)
            t.qi = gia_fp_qd_uuid;
        else {
            var x = _JdJrRiskClientStorage.jdtdstorage_cookie("qd_uid");
            t.qi = void 0 == x ? "" : x
        }
    } catch (w) {}
    "undefined" != typeof jd_shadow__ && 0 < jd_shadow__.length && (t.jtb = jd_shadow__);
    try {
        td_collect.deviceInfo && void 0 != td_collect.deviceInfo && null != td_collect.deviceInfo.sdkToken && "" != td_collect.deviceInfo.sdkToken ? (t.stk = td_collect.deviceInfo.sdkToken,
        td_collect.isRpTok = !0) : td_collect.isRpTok = !1
    } catch (w) {
        td_collect.isRpTok = !1
    }
    x = td_collect.tdencrypt(t);
    _fingerprint_step = "a";
    jdJrTdsendCorsRequest(_CurrentPageProtocol + _JdJrTdRiskDomainName + "/fcf.html?a=" + x, "d=" + u, function(w) {
        function A(f, k) {
            _fingerprint_step = "f";
            try {
                _jdJrTdRelationEidPin(k),
                _fingerprint_step = "g",
                r || (td_collect.setCookie(f, k),
                _fingerprint_step = "h")
            } catch (y) {}
            try {
                window.localStorage && (window.localStorage.setItem(f, k),
                _fingerprint_step = "i")
            } catch (y) {}
            try {
                window.sessionStorage && (window.sessionStorage.setItem(f, k),
                _fingerprint_step = "j")
            } catch (y) {}
            try {
                window.globalStorage && (window.globalStorage[".localdomain"].setItem(f, k),
                _fingerprint_step = "k")
            } catch (y) {}
            try {
                td_collect.db(f, _JdEid)
            } catch (y) {}
        }
        function l(f) {
            try {
                if (f && null != f) {
                    var k = JDDSecCryptoJS.channel.Downlink;
                    f.sim && null != f.sim && (f.im = k.deBase32(f.sim));
                    f.sma && null != f.sma && (f.ma = k.deBase32(f.sma))
                }
            } catch (y) {}
            return f
        }
        _fingerprint_step = "e";
        var e = w;
        0 < w.indexOf("*_*") && (e = w.split("*_*", 2),
        w = JSON.parse(e[1]),
        e = w.eid,
        _jd_e_joint_ = l(w),
        td_collect.store("_gia_s_e_joint", JSON.stringify(_jd_e_joint_)));
        if (32 < e.length && 91 >= e.length) {
            var r = 0 < e.indexOf("jd_risk_");
            r || (_JdEid = e);
            _eidFlag = !0;
            w = new Date;
            w.setFullYear(w.getFullYear() + 1E3);
            A("3AB9D23F7A4B3C9B", e)
        }
    }, !1)
}
function getJdEid() {
    _JdEid = !_JdEid || 120 < _JdEid.length ? "" : _JdEid;
    var u = {
        eid: _JdEid,
        fp: risk_jd_local_fingerprint,
        sdkToken: ""
    }
      , t = "";
    try {
        "" == _JdEid && (t = "a",
        u.eid = td_collect.obtainLocal(!0),
        t = "b"),
        u.token = jd_risk_token_id,
        u.jstub = jd_shadow__
    } catch (x) {} finally {
        td_collect.deviceInfo.eid = u.eid,
        td_collect.deviceInfo.fp = u.fp
    }
    if (void 0 === u.eid || "" == u.eid)
        u.fpstep = _fingerprint_step + t + "" + start_time;
    try {
        if (u.sdkToken = td_collect.deviceInfo.sdkToken,
        null != td_collect.deviceInfo && void 0 != td_collect.deviceInfo && !td_collect.isRpTok && null != td_collect.deviceInfo.sdkToken && "" != td_collect.deviceInfo.sdkToken && ("undefined" == typeof _gia_r || 1 == _gia_r)) {
            var v = td_collect.tdencrypt({
                fc: u.eid,
                stk: td_collect.deviceInfo.sdkToken
            });
            td_collect.reportWorker(_CurrentPageProtocol + _JdJrTdRiskDomainName + "/ek.html", "a=" + v);
            td_collect.isRpTok = !0
        }
    } catch (x) {}
    return u
}
function getEidJoint() {
    var u = void 0;
    try {
        if (void 0 == _jd_e_joint_) {
            var t = getJdEid();
            t && (u = {
                eid: t.eid ? t.eid : "",
                fp: t.fp ? t.fp : "",
                token: t.token ? t.token : "",
                sto: t.sdkToken ? t.sdkToken : ""
            })
        } else
            u = _jd_e_joint_,
            _jd_e_joint_.fp = risk_jd_local_fingerprint,
            _jd_e_joint_.token = jd_risk_token_id,
            _jd_e_joint_.sto = td_collect.deviceInfo.sdkToken
    } catch (v) {}
    return u
}
(function() {
    try {
        if ("undefined" != typeof _gia_r && 0 == _gia_r) {
            var u = td_collect.obtainLocal(!0);
            risk_jd_local_fingerprint = td_collect.getLocal("_gia_s_local_fingerprint");
            var t = td_collect.getLocal("_gia_s_e_joint");
            _jd_e_joint_ = JSON.parse(t);
            if (u && risk_jd_local_fingerprint && _jd_e_joint_) {
                try {
                    var v = td_collect.getLocal("BATQW722QTLYVCRD");
                    if (v) {
                        var x = JSON.parse(v);
                        td_collect.deviceInfo.sdkToken = x.tk;
                        isLocalTk = !0
                    }
                } catch (w) {}
                return
            }
        }
    } catch (w) {}
    (new JdJrTdRiskFinger).get(function(w) {
        risk_jd_local_fingerprint = w;
        td_collect.store("_gia_s_local_fingerprint", risk_jd_local_fingerprint);
        if (0 >= _JdEid.length || !_eidFlag)
            _JdEid = td_collect.obtainLocal(),
            0 >= _JdEid.length && (_eidFlag = !0)
    });
    _fingerprint_step = 5;
    td_collect.init();
    try {
        td_collect_exe()
    } catch (w) {}
}
)();
function jdJrTdsendCorsRequest(u, t, v, x) {
    try {
        _fingerprint_step = "b";
        try {
            var w = new window.XMLHttpRequest
        } catch (A) {}
        if (!w)
            try {
                w = new window.ActiveXObject("Microsoft.XMLHTTP")
            } catch (A) {}
        if (!w)
            try {
                w = new window.ActiveXObject("Msxml2.XMLHTTP")
            } catch (A) {}
        if (!w)
            try {
                w = new window.ActiveXObject("Msxml3.XMLHTTP")
            } catch (A) {}
        _fingerprint_step = "c";
        w.open("POST", u, !0);
        w.timeout = 1500;
        w.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        w.onreadystatechange = function() {
            4 === w.readyState && 200 === w.status && v && v(w.responseText)
        }
        ;
        w.send(t);
        _fingerprint_step = "d"
    } catch (A) {}
}
function JdJrTdFingerDataStream(u, t, v) {
    if ("undefined" !== typeof u && 0 != u)
        if (void 0 === t && (t = 1),
        void 0 === v && (v = 15),
        0 >= _JdEid.length && t < v)
            setTimeout(function() {
                JdJrTdFingerDataStream(u, t, v)
            }, 20 * t),
            t++;
        else {
            if ("undefined" !== typeof jd_risk_token_id && 0 < _JdEid.length && 0 < risk_jd_local_fingerprint.length) {
                var x = _jdJrTdCommonsObtainPin("undefined" !== typeof jdfp_pinenp_ext && jdfp_pinenp_ext ? 2 : 1);
                0 < x.length && (x = {
                    p: x,
                    fp: risk_jd_local_fingerprint,
                    e: _JdEid,
                    ct: (new Date).getTime(),
                    t: jd_risk_token_id,
                    opt: u
                },
                jdJrTdsendCorsRequest(_CurrentPageProtocol + _JdJrTdRiskDomainName + "/stream.html", "c=" + td_collect.tdencrypt(x)))
            }
        }
    else
        throw Error("sourceCode can not be null.");
}
function _jdJrTdRelationEidPin(u) {
    try {
        if (32 <= u.length) {
            var t = _jdJrTdCommonsObtainPin("undefined" !== typeof jdfp_pinenp_ext && jdfp_pinenp_ext ? 2 : 1);
            if (0 < t.length) {
                u = {
                    o: _CurrentPageUrl,
                    p: t,
                    e: u,
                    f: risk_jd_local_fingerprint
                };
                try {
                    u.bizId = _jdtdparam.bizId,
                    u.pvId = _jdtdparam.pvId,
                    u.uvId = _jdtdparam.uvId
                } catch (x) {}
                var v = td_collect.tdencrypt(u);
                jdJrTdsendCorsRequest(_CurrentPageProtocol + _JdJrTdRiskDomainName + "/r.html?v=" + Math.random(), "&d=" + v)
            }
        }
    } catch (x) {}
}
function _jdJrTdCommonsObtainPin(u) {
    var t = "";
    "string" === typeof jd_jr_td_risk_pin && 1 == u ? t = jd_jr_td_risk_pin : "string" === typeof pin ? t = pin : "object" === typeof pin && "string" === typeof jd_jr_td_risk_pin && (t = jd_jr_td_risk_pin);
    return t
}
;