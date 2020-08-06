! function(e) {
    function n() {
        var e, n, t, r = navigator.userAgent,
            i = navigator.appName,
            o = "" + parseFloat(navigator.appVersion),
            a = parseInt(navigator.appVersion, 10);
        (n = r.indexOf("Opera")) != -1 ? (i = "Opera", o = r.substring(n + 6), (n = r.indexOf("Version")) != -1 && (o = r.substring(n + 8))) : (n = r.indexOf("MSIE")) != -1 ? (i = "Microsoft Internet Explorer", o = r.substring(n + 5)) : (n = r.indexOf("Trident")) != -1 ? (i = "Microsoft Internet Explorer", o = (n = r.indexOf("rv:")) != -1 ? r.substring(n + 3) : "0.0") : (n = r.indexOf("Chrome")) != -1 ? (i = "Chrome", o = r.substring(n + 7)) : (n = r.indexOf("Android")) != -1 ? (i = "Android", o = r.substring(n + 8)) : (n = r.indexOf("Safari")) != -1 ? (i = "Safari", o = r.substring(n + 7), (n = r.indexOf("Version")) != -1 && (o = r.substring(n + 8))) : (n = r.indexOf("Firefox")) != -1 ? (i = "Firefox", o = r.substring(n + 8)) : (e = r.lastIndexOf(" ") + 1) < (n = r.lastIndexOf("/")) && (i = r.substring(e, n), o = r.substring(n + 1), i.toLowerCase() == i.toUpperCase() && (i = navigator.appName)), (t = o.indexOf(";")) != -1 && (o = o.substring(0, t)), (t = o.indexOf(" ")) != -1 && (o = o.substring(0, t)), a = parseInt("" + o, 10), isNaN(a) && (o = "" + parseFloat(navigator.appVersion), a = parseInt(navigator.appVersion, 10));
        var s = new Object;
        return s.browserName = i, s.fullVersion = o, s.majorVersion = a, s.appName = navigator.appName, s.userAgent = navigator.userAgent, s.platform = navigator.platform, s
    }

    function t(e, n) {
        var t = document.getElementsByTagName("script")[0],
            r = document.createElement("script");
        r.onreadystatechange = function() {
            "loaded" !== r.readyState && "complete" !== r.readyState || (r.onreadystatechange = null, n())
        }, r.onload = function() {
            n()
        }, r.onerror = function() {
            j("Error: Cannot load  JavaScript file " + e)
        }, r.src = e, r.type = "text/javascript", t.parentNode.insertBefore(r, t)
    }

    function r(e) {
        if (T = Module.ccall("mid_song_read_wave", "number", ["number", "number", "number", "number"], [L, w, 2 * N, H]), 0 == T) return void f();
        for (var n = Math.pow(2, 15), t = 0; t < N; t++) t < T ? e.outputBuffer.getChannelData(0)[t] = Module.getValue(w + 2 * t, "i16") / n : e.outputBuffer.getChannelData(0)[t] = 0;
        0 == F && (F = E.currentTime)
    }

    function o(e, n, t) {
        var i = new XMLHttpRequest;
        i.open("GET", n + t, !0), i.responseType = "arraybuffer", i.onerror = function() {
            j("Error: Cannot retrieve patch file " + n + t)
        }, i.onload = function() {
            if (200 != i.status) return void j("Error: Cannot retrieve patch filee " + n + t + " : " + i.status);
            if (num_missing--, FS.createDataFile("pat/", t, new Int8Array(i.response), !0, !0), libMIDI.message_callback && num_missing > 0 && libMIDI.message_callback("Loading instruments: " + num_missing), j("Loading instruments: " + num_missing), 0 == num_missing) {
                stream = Module.ccall("mid_istream_open_mem", "number", ["number", "number", "number"], [x, midiFileArray.length, !1]);
                var o = 32784,
                    a = Module.ccall("mid_create_options", "number", ["number", "number", "number", "number"], [E.sampleRate, o, 1, 2 * N]);
                L = Module.ccall("mid_song_load", "number", ["number", "number"], [stream, a]), rval = Module.ccall("mid_istream_close", "number", ["number"], [stream]), Module.ccall("mid_song_start", "void", ["number"], [L]), P = E.createScriptProcessor(N, 0, 1), w = Module._malloc(2 * N), P.onaudioprocess = r, P.connect(E.destination), C = setInterval(s, q), libMIDI.message_callback && libMIDI.message_callback("Playing: " + e), j("Playing: " + e + " ...")
            }
        }, i.send()
    }

    function a() {
        var e = E.createBuffer(1, 44100, 44100);
        for (freq = 440, i = 0; i < 48e3; i++) e.getChannelData(0)[i] = 0;
        var n = E.createBufferSource();
        n.buffer = e, n.connect(E.destination), n.start(0)
    }

    function s() {
        var e = new Object;
        0 != F ? e.time = E.currentTime - F : e.time = 0, libMIDI.player_callback && libMIDI.player_callback(e)
    }

    function u(e) {
        b(), H = !1, N = S, l(e)
    }

    function l(e) {
        F = 0, s(), libtimidity_url = B + "libtimidity.js";
        for (var n = 0; n < document.scripts.length; n++) {
            var r = document.scripts[n].src;
            if (libtimidity_url == r) return void c(e)
        }
        j("Loading libtimidity ... "), "iPad" != navigator.platform && "iPhone" != navigator.platform && "iPod" != navigator.platform || a(), t(libtimidity_url, function() {
            c(e)
        })
    }

    function c(e) {
        j("Loading MIDI file " + e + " ..."), libMIDI.message_callback("Loading MIDI file " + e + " ...");
        var n = new XMLHttpRequest;
        n.open("GET", e, !0), n.responseType = "arraybuffer", n.onerror = function() {
            j("Error: Cannot retrieve MIDI file " + e)
        }, n.onload = function() {
            if (200 != n.status) return void j("Error: Cannot retrieve MIDI file " + e + " : " + n.status);
            j("MIDI file loaded: " + e), midiFileArray = new Int8Array(n.response), x = Module._malloc(midiFileArray.length), Module.writeArrayToMemory(midiFileArray, x), rval = Module.ccall("mid_init", "number", [], []), stream = Module.ccall("mid_istream_open_mem", "number", ["number", "number", "number"], [x, midiFileArray.length, !1]);
            var t = 32784,
                i = Module.ccall("mid_create_options", "number", ["number", "number", "number", "number"], [E.sampleRate, t, 1, 2 * N]);
            if (L = Module.ccall("mid_song_load", "number", ["number", "number"], [stream, i]), rval = Module.ccall("mid_istream_close", "number", ["number"], [stream]), num_missing = Module.ccall("mid_song_get_num_missing_instruments", "number", ["number"], [L]), 0 < num_missing)
                for (var a = 0; a < num_missing; a++) {
                    var u = Module.ccall("mid_song_get_missing_instrument", "string", ["number", "number"], [L, a]);
                    o(e, B + "pat/", u)
                } else Module.ccall("mid_song_start", "void", ["number"], [L]), P = E.createScriptProcessor(N, 0, 1), w = Module._malloc(2 * N), P.onaudioprocess = r, P.connect(E.destination), C = setInterval(s, q), libMIDI.message_callback && libMIDI.message_callback("Playing: " + e), j("Playing: " + e + " ...")
        }, n.send()
    }

    function m(e, n, t) {
        H || (H = !0, N = k, l(B + "../midi/initsynth.midi")), 0 != L && Module.ccall("mid_song_note_on", "void", ["number", "number", "number", "number"], [L, e, n, t])
    }

    function d() {
        libMIDI.noteOn(0, 60, 0)
    }

    function f() {
        P && (P.disconnect(), P.onaudioprocess = 0, P = 0), L && (Module._free(w), Module._free(x), Module.ccall("mid_song_free", "void", ["number"], [L]), Module.ccall("mid_exit", "void", [], []), L = 0)
    }

    function b() {
        f(), clearInterval(C), j(V)
    }

    function p(e) {
        return O || (O = document.createElement("a")), O.href = e, O.href
    }

    function g(e) {
        if ("http:" == location.protocol.toLowerCase()) return e;
        var n = p(e),
            t = n.replace("https:", "http:");
        return t
    }

    function I() {
        var e = new Object;
        0 == F && (F = (new Date).getTime()), e.time = ((new Date).getTime() - F) / 1e3, libMIDI.player_callback && libMIDI.player_callback(e)
    }

    function M(e) {
        v(), e = g(e);
        var n = document.getElementById("scorioMIDI");
        n ? n.lastChild.setAttribute("src", e) : (n = document.createElement("div"), n.setAttribute("id", "scorioMIDI"), n.innerHTML = '&nbsp;<bgsound src="' + e + '" volume="100"/>', document.body.appendChild(n)), C = setInterval(I, q), F = 0, P = n, j("Playing " + e + " ...")
    }

    function v() {
        if (P) {
            var e = P;
            e.lastChild.setAttribute("src", "midi/silence.mid"), clearInterval(C), P = 0
        }
        j(V)
    }

    function _(e) {
        y();
        var n = document.getElementById("scorioMIDI");
        n ? n.lastChild.setAttribute("data", e) : (n = document.createElement("div"), n.setAttribute("id", "scorioMIDI"), n.innerHTML = '<object data="' + e + '" autostart="true" volume="100" type="audio/mid"></object>', document.body && document.body.appendChild(n)), C = setInterval(I, q), F = 0, P = n, j("Playing " + e + " ...")
    }

    function y() {
        if (P) {
            var e = P;
            e.parentNode.removeChild(e), clearInterval(C), P = 0
        }
        j(V)
    }

    function h() {
        for (var e = 0; e < document.scripts.length; e++) {
            var n = document.scripts[e].src,
                t = n.lastIndexOf("midi.js");
            if (t == n.length - 7) return n.substr(0, t)
        }
        return null
    }

    function j(e) {
        R && console.log(e)
    }

    function D() {

    }
    var A, w, x, O, C, E = 0,
        P = 0,
        k = 512,
        S = 8192,
        N = S,
        T = 0,
        L = 0,
        B = "../resources/libmidi/",
        F = 0,
        V = "",
        H = !1,
        R = !1,
        q = 30;
    // B = h();
    var G = n();
    e.libMIDI = new Object;
    e.libMIDI.initAll = function(){
        try {
            ("iPhone" == G.platform || "iPod" == G.platform || "iPad" == G.platform) && G.majorVersion <= 6 ? A = "none" : (window.AudioContext = window.AudioContext || window.webkitAudioContext, E = new AudioContext, A = "WebAudioAPI")
        } catch (W) {
            A = "Microsoft Internet Explorer" == G.browserName ? "bgsound" : "Android" == G.browserName ? "none" : "object"
        };
        e.libMIDI.set_logging = function(e) {
            R = e
        }, e.libMIDI.get_loggging = function() {
            return R
        }, e.libMIDI.player_callback = function(e) {}, e.libMIDI.message_callback = function(e) {}, e.libMIDI.get_audio_status = function() {
            return V
        }, e.libMIDI.unmute_iOS_hack = a, "WebAudioAPI" == A ? (e.libMIDI.play = u, e.libMIDI.stop = b, V = "audioMethod: WebAudioAPI, sampleRate (Hz): " + E.sampleRate + ", audioBufferSize (Byte): " + N, e.libMIDI.noteOn = m, e.libMIDI.startSynth = d) : "bgsound" == A ? (e.libMIDI.play = M, e.libMIDI.stop = v, V = "audioMethod: &lt;bgsound&gt;") : "object" == A ? (e.libMIDI.play = _, e.libMIDI.stop = y, V = "audioMethod: &lt;object&gt;") : (e.libMIDI.play = function(e) {}, e.libMIDI.stop = function(e) {}, V = "audioMethod: No method found"), "Microsoft Internet Explorer" == G.browserName && "https:" == location.protocol.toLowerCase() && M("http://" + B + "midi/silence.mid")
    }
}(this);
