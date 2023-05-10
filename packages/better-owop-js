(() => {
  let isBrowser = typeof window !== "undefined";
  let OWOPUnlocked = (() => {
    if (typeof OWOP === "undefined") return false;
    return typeof OWOP.require !== "undefined";
  })();

  if (OWOPUnlocked) {
    EventEmitter = OWOP.require("events");
  } else if (isBrowser) {
    !function(e){"use strict";function t(){}function n(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function r(e){return function(){return this[e].apply(this,arguments)}}function i(e){return"function"==typeof e||e instanceof RegExp||!(!e||"object"!=typeof e)&&i(e.listener)}var s=t.prototype,o=e.EventEmitter;s.getListeners=function(e){var t,n,r=this._getEvents();if(e instanceof RegExp){t={};for(n in r)r.hasOwnProperty(n)&&e.test(n)&&(t[n]=r[n])}else t=r[e]||(r[e]=[]);return t},s.flattenListeners=function(e){var t,n=[];for(t=0;t<e.length;t+=1)n.push(e[t].listener);return n},s.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},s.addListener=function(e,t){if(!i(t))throw new TypeError("listener must be a function");var r,s=this.getListenersAsObject(e),o="object"==typeof t;for(r in s)s.hasOwnProperty(r)&&-1===n(s[r],t)&&s[r].push(o?t:{listener:t,once:!1});return this},s.on=r("addListener"),s.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},s.once=r("addOnceListener"),s.defineEvent=function(e){return this.getListeners(e),this},s.defineEvents=function(e){for(var t=0;t<e.length;t+=1)this.defineEvent(e[t]);return this},s.removeListener=function(e,t){var r,i,s=this.getListenersAsObject(e);for(i in s)s.hasOwnProperty(i)&&-1!==(r=n(s[i],t))&&s[i].splice(r,1);return this},s.off=r("removeListener"),s.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},s.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},s.manipulateListeners=function(e,t,n){var r,i,s=e?this.removeListener:this.addListener,o=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(r=n.length;r--;)s.call(this,t,n[r]);else for(r in t)t.hasOwnProperty(r)&&(i=t[r])&&("function"==typeof i?s.call(this,r,i):o.call(this,r,i));return this},s.removeEvent=function(e){var t,n=typeof e,r=this._getEvents();if("string"===n)delete r[e];else if(e instanceof RegExp)for(t in r)r.hasOwnProperty(t)&&e.test(t)&&delete r[t];else delete this._events;return this},s.removeAllListeners=r("removeEvent"),s.emitEvent=function(e,t){var n,r,i,s,o=this.getListenersAsObject(e);for(s in o)if(o.hasOwnProperty(s))for(n=o[s].slice(0),i=0;i<n.length;i++)r=n[i],!0===r.once&&this.removeListener(e,r.listener),r.listener.apply(this,t||[])===this._getOnceReturnValue()&&this.removeListener(e,r.listener);return this},s.trigger=r("emitEvent"),s.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},s.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},s._getOnceReturnValue=function(){return!this.hasOwnProperty("_onceReturnValue")||this._onceReturnValue},s._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return e.EventEmitter=o,t},"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof module&&module.exports?module.exports=t:e.EventEmitter=t}("undefined"!=typeof window?window:this||{});
    // upper thing is event emitter
  } else {
    WebSocket = require("ws");
    EventEmitter = require("events");
    Canvas = require("canvas");
  }

  if (!Object.values) Object.values = function(object) {
    return Object.keys(object).map(function(key) {
      return object[key];
    });
  }
  class Bucket {
    constructor(rate, time, infinite) {
      this.lastCheck = Date.now();
      this.allowance = rate;
      this.rate = rate;
      this.time = time;
      this.infinite = infinite;
    };
    update() {
      this.allowance += (Date.now() - this.lastCheck) / 1000 * (this.rate / this.time);
      this.lastCheck = Date.now();
      if (this.allowance > this.rate) {
        this.allowance = this.rate;
      }
    };
    canSpend(count) {
      if (this.infinite) {
        return true;
      }

      this.update();
      if (this.allowance < count) {
        return false;
      }
      this.allowance -= count;
      return true;
    };
  };

  class WeirdDataView {
    constructor(arrayBuffer = new ArrayBuffer()) {
      this.offset = 0;
      this.dv = new DataView(arrayBuffer);
    }
    get buffer() {
      return this.dv.buffer;
    }
    // set
    // 8
    setUint8(value, offset = this.offset, addToOffset = true) {
      let data = this.dv.setUint8(offset, value);
      this.offset = addToOffset ? offset + 1 : offset;
    }
    setInt8(value, offset = this.offset, addToOffset = true) {
      let data = this.dv.setInt8(offset, value);
      this.offset = addToOffset ? offset + 1 : offset;
    }
    // 16
    setUint16(value, offset = this.offset, littleEndian = true, addToOffset = true) {
      let data = this.dv.setUint16(offset, value, littleEndian);
      this.offset = addToOffset ? offset + 2 : offset;
    }
    setInt16(value, offset = this.offset, littleEndian = true, addToOffset = true) {
      let data = this.dv.setInt16(offset, value, littleEndian);
      this.offset = addToOffset ? offset + 2 : offset;
    }
    // 32
    setUint32(value, offset = this.offset, littleEndian = true, addToOffset = true) {
      let data = this.dv.setUint32(offset, value, littleEndian);
      this.offset = addToOffset ? offset + 4 : offset;
    }
    setInt32(value, offset = this.offset, littleEndian = true, addToOffset = true) {
      let data = this.dv.setInt32(offset, value, littleEndian);
      this.offset = addToOffset ? offset + 4 : offset;
    }

    // get
    // 8
    getUint8(offset = this.offset, addToOffset = true) {
      let data = this.dv.getUint8(offset);
      this.offset = addToOffset ? offset + 1 : offset;
      return data;
    }
    getInt8(offset = this.offset, addToOffset = true) {
      let data = this.dv.getInt8(offset);
      this.offset = addToOffset ? offset + 1 : offset;
      return data;
    }
    // 16
    getUint16(offset = this.offset, littleEndian = true, addToOffset = true) {
      let data = this.dv.getUint16(offset, littleEndian);
      this.offset = addToOffset ? offset + 2 : offset;
      return data;
    }
    getInt16(offset = this.offset, littleEndian = true, addToOffset = true) {
      let data = this.dv.getInt16(offset, littleEndian);
      this.offset = addToOffset ? offset + 2 : offset;
      return data;
    }
    // 32
    getUint32(offset = this.offset, littleEndian = true, addToOffset = true) {
      let data = this.dv.getUint32(offset, littleEndian);
      this.offset = addToOffset ? offset + 4 : offset;
      return data;
    }
    getInt32(offset = this.offset, littleEndian = true, addToOffset = true) {
      let data = this.dv.getInt32(offset, littleEndian);
      this.offset = addToOffset ? offset + 4 : offset;
      return data;
    }
  }

  class ChunkSystem {
    static getIbyXY(x, y, w) {
      return (y * w + x) * 3;
    }
    constructor() {
      this.chunks = {};
      this.chunkProtected = {};
    };

    setChunk(x, y, data) {
      if (!data || typeof x !== "number" || typeof y !== "number") throw new Error("x or y is not a number or no data!");

      return this.chunks[`${x},${y}`] = data;
    };
    getChunk(x, y) {
      return this.chunks[`${x},${y}`];
    };
    removeChunk(x, y) {
      return delete this.chunks[`${x},${y}`];
    };
    setPixel(x, y, rgb) {
      if (typeof rgb !== "object" || typeof x !== "number" || typeof y !== "number") throw new Error("x or y is not a number or rgb is not array!");
      const chunkX = Math.floor(x / Client.options.chunkSize);
      const chunkY = Math.floor(y / Client.options.chunkSize);

      const chunk = this.getChunk(chunkX, chunkY);
      if (!chunk) return;

      const i = ChunkSystem.getIbyXY(x & Client.options.chunkSize - 1, y & Client.options.chunkSize - 1, Client.options.chunkSize);

      chunk[i] = rgb[0];
      chunk[i + 1] = rgb[1];
      chunk[i + 2] = rgb[2];
      return true;
    };
    getPixel(x, y) {
      if (typeof x !== "number" || typeof y !== "number") throw new Error("x or y is not a number!");
      const chunkX = Math.floor(x / Client.options.chunkSize);
      const chunkY = Math.floor(y / Client.options.chunkSize);

      const chunk = this.getChunk(chunkX, chunkY);

      if (!chunk) return;

      const i = ChunkSystem.getIbyXY(x & Client.options.chunkSize - 1, y & Client.options.chunkSize - 1, Client.options.chunkSize);
      return [chunk[i], chunk[i + 1], chunk[i + 2]];
    };
    setChunkProtection(x, y, newState) {
      if (typeof x !== "number" || typeof y !== "number") throw new Error("x or y is not a number!");

      if (newState) this.chunkProtected[`${x},${y}`] = true;
      else delete this.chunkProtected[`${x},${y}`];
      return true;
    }
    isProtected(x, y) {
      if (typeof x !== "number" || typeof y !== "number") throw new Error("x or y is not a number!");
      return !!this.chunkProtected[`${x},${y}`];
    }
  };

  const canvasUtils = {
    getIbyXY(x, y, w) {
      return (y * w + x) * 4;
    },
    _lerp(color1, color2, factor = 0.5) {
      return Math.round(color1 + (color2 - color1) * factor);
    },
    lerp(color1, color2, factor = 0.5) {
      let result = Uint8ClampedArray(3); // i don't really want other values like NaN

      for (let i = 0; i < 3; i++) {
        result[i] = canvasUtils._lerp(color1[i], color2[i], factor);
      }
      return result;
    },
    imageDataToCtx(imageData) { // canvas = ctx.canvas
      let canvas = canvasUtils.createCanvas(imageData.width, imageData.height);
      let ctx = canvas.getContext("2d");

      ctx.putImageData(imageData, 0, 0);
      return ctx;
    },
    createCanvas(width, height) {
      let canvas;
      if (isBrowser) {
        canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
      } else {
        canvas = new Canvas.Canvas(width, height);
      }
      return canvas;
    },
    createImageData() {
      let imageData;

      if (isBrowser) {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        imageData = ctx.createImageData(...arguments);
      } else {
        imageData = Canvas.createImageData(...arguments);
      }

      return imageData;
    },
    dataToImageData(data, width, height, hasAlpha = true, alpha = 255) {
      let imageData = canvasUtils.createImageData(width, height);
      if (!hasAlpha) {
        data = canvasUtils.addAlphaToData(data, alpha);
      }

      for (let i = 0; i < data.length; i++) imageData.data[i] = data[i]; // WTF WHY IT CAN'T BE JUST image.data = data; WHYYYYYYYYYYYYYYYYYYYYYYYYYYY

      return imageData;
    },
    removeAlphaFromImageData(data) {
      if (data.length % 4 !== 0) throw new Error("Data is not image data");

      let newData = new Uint8ClampedArray(data.length - data.length / 4);
      for (let i = 0, i2 = 0; i < newData.length;) {
        newData[i++] = data[i2++];
        newData[i++] = data[i2++];
        newData[i++] = data[i2++];
        i2++;
      }
      return newData;
    },
    addAlphaToData(data, alpha = 255) {
      if (data.length % 3 !== 0) throw new Error("Data is not data ;-;");
      let newData = new Uint8ClampedArray(data.length + data.length / 3);

      for (let i = 0, i2 = 0; i < newData.length;) {
        newData[i++] = data[i2++];
        newData[i++] = data[i2++];
        newData[i++] = data[i2++];
        newData[i++] = alpha;
      }
      return newData;
    }/*,
    lerpImageDataWithNormalColors(imageData, imageDataWithoutAlphaChannel) { // i will delete it but i added it idk why
      let lerped = new Uint8ClampedArray(imageDataWithoutAlphaChannel.length);
      for (let i = 0, i2 = 0; i < imageData.length;) {
        let factor = imageData[i + 3];
        lerped[i2] = canvasUtils._lerp(imageDataWithoutAlphaChannel[i2], imageData[i], factor / 255);
        i++;
        i2++;
        lerped[i2] = canvasUtils._lerp(imageDataWithoutAlphaChannel[i2], imageData[i], factor / 255);
        i++;
        i2++;
        lerped[i2] = canvasUtils._lerp(imageDataWithoutAlphaChannel[i2], imageData[i], factor / 255);
        i++;
        i2++;

        i++;
      }
      return lerped;
    }*/
  };

  class Client extends EventEmitter {
    static options = {
      chunkSize: 16,
      maxChatBuffer: 256,
      maxMessageLength: {
        0: 128,
        1: 128,
        2: 512,
        3: 16384
      },
      maxWorldNameLength: 24,
      worldBorder: 0xFFFFFF, // or Math.pow(2, 24)-1
      misc: {
        chatVerification: String.fromCharCode(10),
        tokenVerification: "CaptchA",
        worldVerification: 25565
      },
      opcode: {
        setId: 0,
        worldUpdate: 1,
        chunkLoad: 2,
        teleport: 3,
        setRank: 4,
        captcha: 5,
        setPQuota: 6,
        chunkProtected: 7
      },
      chatQuota: {
        0: [4, 6],
        1: [4, 6],
        2: [10, 3],
        3: [0, 1000]
      },
      captchaState: {
        WAITING: 0,
        VERIFYING: 1,
        VERIFIED: 2,
        OK: 3,
        INVALID: 4
      },
      tools: {
        0: [1, "cursor"],
        1: [0, "move"],
        2: [0, "pippete"],
        3: [2, "eraser"],
        4: [0, "zoom"],
        5: [1, "bucket"],
        6: [2, "paste"],
        7: [0, "export"],
        8: [1, "line"],
        9: [2, "protect"],
        10: [2, "copy"]
      }
    };
    static utils = {
      shouldMove(x1, y1, x2, y2) {
        let distx = Math.trunc(x2 / Client.options.chunkSize) - Math.trunc(x1 / Client.options.chunkSize);
        distx *= distx;
        let disty = Math.trunc(y2 / Client.options.chunkSize) - Math.trunc(y1 / Client.options.chunkSize);
        disty *= disty;

        let dist = Math.sqrt(distx + disty);

        return dist >= 3;
      },
      decompress(u8arr) {
        var originalLength = u8arr[1] << 8 | u8arr[0];
        var u8decompressedarr = new Uint8ClampedArray(originalLength);
        var numOfRepeats = u8arr[3] << 8 | u8arr[2];
        var offset = numOfRepeats * 2 + 4;
        var uptr = 0;
        var cptr = offset;
        for (var i = 0; i < numOfRepeats; i++) {
          var currentRepeatLoc = (u8arr[4 + i * 2 + 1] << 8 | u8arr[4 + i * 2]) + offset;
          while (cptr < currentRepeatLoc) {
            u8decompressedarr[uptr++] = u8arr[cptr++];
          }
          var repeatedNum = u8arr[cptr + 1] << 8 | u8arr[cptr];
          var repeatedColorR = u8arr[cptr + 2];
          var repeatedColorG = u8arr[cptr + 3];
          var repeatedColorB = u8arr[cptr + 4];
          cptr += 5;
          while (repeatedNum--) {
            u8decompressedarr[uptr] = repeatedColorR;
            u8decompressedarr[uptr + 1] = repeatedColorG;
            u8decompressedarr[uptr + 2] = repeatedColorB;
            uptr += 3;
          }
        }
        while (cptr < u8arr.length) {
          u8decompressedarr[uptr++] = u8arr[cptr++];
        }
        return u8decompressedarr;
      },
      Player: class {
        constructor(id) {
          this.id = id;
          this.nick = "";
          this.x = 0;
          this.y = 0;
          this.color = [0, 0, 0];
          this.rank = 0;
        }
      },
      createChunkFromRGB(color) {
        let tile = new Uint8ClampedArray(Client.options.chunkSize * Client.options.chunkSize * 3);
        for (var i = 0; i < tile.length;) {
          tile[i++] = color[0];
          tile[i++] = color[1];
          tile[i++] = color[2];
        }
        return tile;
      },
      isArraysSame(...arrays) {
        arrays = arrays.map(array => JSON.stringify(array));

        return !arrays.filter(array => arrays[0] !== array).length;
      }
    };
    constructor(options = {}) {
      super();
      const that = this;
      this.chunkSystem = new ChunkSystem();
      this.pendingLoad = {};
      this.destroyed = false;

      if (!options.ws) options.ws = "wss://ourworldofpixels.com";
      if (!options.origin && !isBrowser) options.origin = options.ws.replace("ws", "http");
      if (typeof options.protocol === "undefined") options.protocol = 1;
      if (typeof options.autoConnectWorld === "undefined") options.autoConnectWorld = true;
      if (typeof options.log === "undefined") options.log = true;
      if (typeof options.autoMakeSocket === "undefined") options.autoMakeSocket = true;
      if (typeof options.captchaSiteKey === "undefined") options.captchaSiteKey = "6LcgvScUAAAAAARUXtwrM8MP0A0N70z4DHNJh-KI";
      if (typeof options.reconnectTime === "undefined") options.reconnectTime = 5000;
      if (typeof options.reconnectTries === "undefined") options.reconnectTries = -1; // endless
      this.reconnectTries = options.reconnectTries;

      if (options.controller && !isBrowser) {
        const stdin = process.openStdin();
        stdin.on("data", d => {
          const msg = d.toString().trim();
          try {
            return console.log(String(eval(msg)).slice(0, 1000));
          } catch (e) {
            console.log('[ERROR]: ' + e.name + ": " + e.message + "\n" + e.stack);
          }
        });
      }
      this.clientOptions = options;

      this.players = {};
      this.player = {
        id: null,
        color: [0, 0, 0],
        tool: 0,
        x: 0,
        y: 0,
        rank: 0,

        nick: options.nick,
        chatBucket: new Bucket(...Client.options.chatQuota[0]),
        pixelBucket: new Bucket(48, 4)
      };
      this.chat = {
        send(message, sendModifier = true) {
          if (!that.ws ||
            that.ws.readyState !== 1) return false;
          if (!that.clientOptions.unsafe) {
            if (!that.player.chatBucket.canSpend(1)) return false;
            message = message.slice(0, Client.options.maxMessageLength[that.player.rank]);
          }
          if (sendModifier) message = that.chat.sendModifier(message);

          that.ws.send(message + Client.options.misc.chatVerification);
        },
        recvModifier(message) {
          return message;
        },
        sendModifier(message) {
          return message;
        },
        messages: [],
        /*
        0-3 - normal owop ranks
        4 - discord
        */
        parseMessage(msg) {
          let something = msg.split(": ");

          if (msg.startsWith("DEV") ||
            msg.toLowerCase().startsWith("server:") ||
            msg[0] === "<" ||
            something.length < 2) return [null, null, null, msg];

          let before = something.shift();
          let message = something.join(": ").trim();

          let user = {
            rank: 0,
            id: null,
            nick: ""
          }
          let tell = false;

          if (before.startsWith("[D]")) {
            user.rank = 4; // rank 4 is discord
            user.nick = before.slice(4).trim(); // two ways one is spliting by space second is by just slicing 4 letters

          } else if (before.startsWith("(M)")) {
            user.nick = before.slice(4).trim();
            user.rank = 2;
          } else if (before.startsWith("(A)")) {
            user.nick = before.slice(4).trim();
            user.rank = 3;
          } else if (before.startsWith("[") || /[0-9]/g.test(before[0])) {
            if (before.startsWith("[")) {
              user.id = +before.split("]")[0].substr(1);
              user.nick = before.split("]");
              user.nick.shift();
              user.nick = user.nick.join("]").trim();
            } else {
              user.id = +before;
              user.nick = before.trim(); // trim is not needed i think
            }

            user.rank = 0; //that.players[user.id] ? that.players[user.id].rank : 0;
          } else if (before.startsWith("-> ") && /[0-9]/g.test(before[4])) {
            tell = true;
            user.id = +before.split(" ")[1];
            user.nick = user.id.toString();

            user.rank = 0 //that.players[user.id] ? that.players[user.id].rank : 0;
          } else if (before.toLowerCase().startsWith("-> you tell")) {
            user.id = that.player.id;
            user.nick = that.player.nick;
            tell = true;
          }
          return [user, message, tell, msg];
        }
      };

      this.world = {
        join(name = "main") {
          let nameCopy = name = (name.replace(/[^a-zA-Z0-9\._]/gm, "").slice(0, 24) || "main");
          nameCopy = nameCopy.split("").map(x => x.charCodeAt(0));

          let dv = new DataView(new ArrayBuffer(name.length + 2));

          for (let i = 0; i < name.length; i++) dv.setUint8(i, nameCopy[i] || 0);

          dv.setUint16(name.length, that.clientOptions.worldVerification || Client.options.misc.worldVerification, true);

          that.ws.send(dv.buffer);
          that.world.name = name;
          that.log("Joining world: " + name);
        },
        leave() {
          this.ws.close(); // bug it will reconnect if can
        },
        move(x = that.player.x, y = that.player.y) {
          if (that.ws.readyState !== 1) return false;

          that.player.x = x = +x;
          that.player.y = y = +y;

          x *= 16;
          y *= 16;

          let dv = new WeirdDataView(new ArrayBuffer(12));
          dv.setInt32(x);
          dv.setInt32(y);
          dv.setUint8(that.player.color[0]);
          dv.setUint8(that.player.color[1]);
          dv.setUint8(that.player.color[2]);
          dv.setUint8(that.player.tool);
          that.ws.send(dv.buffer);
          return true;
        },
        setPixel(x = that.player.x, y = that.player.y, color = that.player.color, wolfMove, sneaky, move = (that.player.rank < 3)) {
          if (that.ws.readyState !== 1) return false;
          let oldX = that.player.x;
          let oldY = that.player.y;

          x = +x;
          y = +y;
          if (!that.clientOptions.unsafe && (!that.player.pixelBucket.canSpend(1) || that.player.rank === 0)) return false;
          if (wolfMove) {
            if (Client.utils.shouldMove(that.player.x, that.player.x, x, y)) that.world.move(x, y);
          } else if (move) {
            that.world.move(x, y);
          }
          that.player.color = color;
          let dv = new WeirdDataView(new ArrayBuffer(11));
          dv.setInt32(x);
          dv.setInt32(y);
          dv.setUint8(that.player.color[0]);
          dv.setUint8(that.player.color[1]);
          dv.setUint8(that.player.color[2]);
          that.ws.send(dv.buffer);

          if (sneaky) that.world.move(oldX, oldY);
          return true;
        },
        pasteChunk(x, y, data) {
          if (that.ws.readyState !== 1 || !that.clientOptions.unsafe && that.player.rank < 2) return false;

          let dv = new DataView(new ArrayBuffer(8 + Client.options.chunkSize * Client.options.chunkSize * 3));
          dv.setInt32(0, x, true);
          dv.setInt32(4, y, true);
          for (let i = 0; i < data.length; i++) dv.setUint8(8 + i, data[i]);

          that.ws.send(dv.buffer);
          return true;
        },
        async pasteImageData(x, y, imageData, isImage) { // tried to do fastest as possible
          if (that.ws.readyState !== 1 || !that.clientOptions.unsafe && that.player.rank < 2) return false;

          // math
          let chunkXStart = Math.floor(x / Client.options.chunkSize);
          let chunkXEnd = Math.floor((x + imageData.width) / Client.options.chunkSize) + 1;
          let chunkYStart = Math.floor(x / Client.options.chunkSize);
          let chunkYEnd = Math.floor((x + imageData.height) / Client.options.chunkSize) + 1;

          let canvasWidthInChunks = chunkXEnd - chunkXStart;
          let canvasHeightInChunks = chunkYEnd - chunkXStart;

          let posXOnCanvas = x % Client.options.chunkSize;
          let posYOnCanvas = y % Client.options.chunkSize;

          // some shit
          let canvas = canvasUtils.createCanvas(canvasWidthInChunks * Client.options.chunkSize, canvasHeightInChunks * Client.options.chunkSize);
          let ctx = canvas.getContext("2d");
          let image = isImage ? imageData : canvasUtils.imageDataToCtx(imageData).canvas;

          // requesting chunks and setting them on canvas
          await new Promise(resolve => {
            let chunksLasted = canvasWidthInChunks * canvasHeightInChunks;

            for (let xx = chunkXStart, canvasX = 0; xx < chunkXEnd; xx++, canvasX += Client.options.chunkSize) {
              for (let yy = chunkYStart, canvasY = 0; yy < chunkYEnd; yy++, canvasY += Client.options.chunkSize) {

                that.world.requestChunk(xx, yy).then(data => {
                  let chunkImageData = canvasUtils.dataToImageData(data, Client.options.chunkSize, Client.options.chunkSize, false);

                  ctx.putImageData(chunkImageData, canvasX, canvasY);

                  chunksLasted--;
                  if (!chunksLasted) resolve();
                });
              }
            }
          });

          ctx.drawImage(image, posXOnCanvas, posYOnCanvas); // setting image

          // pasting
          for (let xx = chunkXStart, canvasX = 0; xx < chunkXEnd; xx++, canvasX += Client.options.chunkSize) {
            for (let yy = chunkYStart, canvasY = 0; yy < chunkYEnd; yy++, canvasY += Client.options.chunkSize) {
              let chunkImageData = ctx.getImageData(canvasX, canvasY, Client.options.chunkSize, Client.options.chunkSize);
              let chunkData = canvasUtils.removeAlphaFromImageData(chunkImageData.data);

              if (Client.utils.isArraysSame(chunkData, that.chunkSystem.getChunk(xx, yy))) continue;

              that.world.pasteChunk(xx, yy, chunkData);
            }
          }

          return true;
        },
        setTool(tool) {
          if (that.ws.readyState !== 1) return false;
          that.player.tool = +tool;

          let dv = new WeirdDataView(new ArrayBuffer(12));
          dv.setInt32(that.player.x * 16);
          dv.setInt32(that.player.y * 16);
          dv.setUint8(that.player.color[0]);
          dv.setUint8(that.player.color[1]);
          dv.setUint8(that.player.color[2]);
          dv.setUint8(that.player.tool);
          that.ws.send(dv.buffer);
          return true;
        },
        setColor(color) {
          if (that.ws.readyState !== 1) return false;
          that.player.color = color;

          let dv = new WeirdDataView(new ArrayBuffer(12));
          dv.setInt32(that.player.x * 16);
          dv.setInt32(that.player.y * 16);
          dv.setUint8(that.player.color[0]);
          dv.setUint8(that.player.color[1]);
          dv.setUint8(that.player.color[2]);
          dv.setUint8(that.player.tool);
          that.ws.send(dv.buffer);
          return true;
        },
        protectChunk(x, y, newState = 1) {
          if (that.ws.readyState !== 1 || that.player.rank < 2 && that.clientOptions.unsafe) return false;
          let dv = new WeirdDataView(new ArrayBuffer(10));
          dv.setInt32(x);
          dv.setInt32(y);
          dv.setUint8(newState);
          that.ws.send(dv.buffer);
          return true;
        },
        clearChunk(x, y, color) {
          if (that.ws.readyState !== 1 || that.player.rank < 2 && that.clientOptions.unsafe) return false;
          if (that.clientOptions.protocol === 0) {
            if (color[0] === 255 && color[1] === 255 && color[2] === 255) {
              let dv = new WeirdDataView(new ArrayBuffer(9));
              dv.setInt32(x);
              dv.setInt32(y);
              that.ws.send(dv.buffer);
            } else {
              that.world.pasteChunk(x, y, Client.utils.createChunkFromRGB(color));
            }
          } else {
            let dv = new WeirdDataView(new ArrayBuffer(13));
            dv.setInt32(x);
            dv.setInt32(y);
            dv.setUint8(color[0]);
            dv.setUint8(color[1]);
            dv.setUint8(color[2]);
            that.ws.send(dv.buffer);
          }
          return true;
        },
        __requestChunk(x, y) {
          let dv = new WeirdDataView(new ArrayBuffer(8));
          dv.setInt32(x);
          dv.setInt32(y);
          that.ws.send(dv.buffer);
          return true;
        },
        _requestChunk(x, y) {
          return new Promise(async (resolve, reject) => {
            if (that.pendingLoad[x + "," + y]) await that.pendingLoad[x + "," + y];

            if (that.chunkSystem.getChunk(x, y)) return resolve(that.chunkSystem.getChunk(x, y));

            let wb = Client.options.worldBorder;
            if (!that.clientOptions.unsafe && (x > wb || y > wb || x < ~wb || y < ~wb)) return reject(false);

            let func = ((cx, cy, data) => {
              if (x !== cx || y !== cy) return;
              that.off("chunk", func);
              resolve(data);
            });
            that.on("chunk", func);
            that.world.__requestChunk(x, y);
          });
        },
        requestChunk(x, y, inaccurate) { // i think that there is simplier way but i can't invent it
          if (inaccurate) {
            x = Math.floor(x / Client.options.chunkSize);
            y = Math.floor(y / Client.options.chunkSize);
          };
          let chunk = that.world._requestChunk(x, y);

          that.pendingLoad[x + "," + y] = new Promise(async resolve => {
            resolve(await chunk);
            delete that.pendingLoad[x + "," + y];
          });
          return chunk;
        },
        async getPixel(x, y) {
          if (isBrowser)
            if (that.clientOptions.simpleChunks) return OWOP.world.getPixel(x, y);
          await that.world.requestChunk(x, y, true);

          return that.chunkSystem.getPixel(x, y);
        }
      };
      this.captcha = {
        usedKeys: [],
        login(key) {
          if (!that.ws ||
            that.ws.readyState !== 1) return false;
          if (that.captcha.usedKeys.includes(key)) {
            return false
          } else if (!key.startsWith("LETMEINPLZ")) {
            that.captcha.usedKeys.push(key);
          }
          that.ws.send(Client.options.misc.tokenVerification + key);
          that.captcha.usedKeys.push(key);
          return true;
        },
        renderCaptcha(uniqueName = true) {
          // you can do it self only on browser
          if (isBrowser) {
            return new Promise(resolve => {
              OWOP.windowSys.addWindow(new OWOP.windowSys.class.window(`Verification Needed` + (uniqueName ? String.fromCharCode(Math.random() * 100) : ""), {
                closeable: true,
                moveable: true
              }, win => {
                grecaptcha.render(win.addObj(OWOP.util.mkHTML('div', {})), {
                  theme: 'dark',
                  sitekey: that.clientOptions.captchaSiteKey,
                  callback: token => {
                    win.close();
                    resolve(token);
                  }
                });
              }));
            });
          } else {
            throw new Error("Node JS can't use renderCaptcha")
          }
        },
        async renderAndLogin(unique = true) {
          that.captcha.login(await that.captcha.renderCaptcha(unique));
        }
      };
      if (options.autoMakeSocket) this.makeSocket();
    }
    log(...args) {
      if (this.clientOptions.log) console.log(...args);
    }
    destroy() {
      if (this.ws.readyState === 1) this.ws.close();
      this.destroyed = true;
      this.emit("destroy");
    }
    makeSocket() {
      let ws = new WebSocket(this.clientOptions.ws, isBrowser ? undefined : this.clientOptions);

      this.players = {};
      ws.binaryType = "arraybuffer";

      ws.onopen = () => {
        this.emit("open", ...arguments);
        this.log("Connected");
      }
      ws.onclose = () => {
        this.emit("close", ...arguments);
        this.isWorldConnected = false;
        this.log("Disconnected");
        // if someone dumb will set this.reconnectTries to 0 then it will change after \/ to -1 (endless) but will not connect
        if (!this.destroyed && this.clientOptions.reconnect) setTimeout(this.makeSocket.bind(this), this.clientOptions.reconnectTime)
      }

      ws.onmessage = e => {
        let msg = e.data;
        this.emit("rawMessage", msg);

        const isBinary = typeof msg !== "string";

        if (isBinary) {
          let dv = new WeirdDataView(msg);
          let len = dv.byteLength;
          switch (dv.getUint8()) {
            case Client.options.opcode.setId: {
              this.player.id = dv.getUint32();;
              this.isWorldConnected = true;

              this.player.rank = 0;

              this.log(`Joined world '${this.world.name}' and got id '${this.player.id}'`);

              if (this.clientOptions.adminlogin) this.chat.send("/adminlogin " + this.clientOptions.adminlogin);
              if (this.clientOptions.modlogin) this.chat.send("/modlogin " + this.clientOptions.modlogin);
              if (this.clientOptions.pass) this.chat.send("/pass " + this.clientOptions.pass);
              if (this.clientOptions.nick) this.chat.send("/nick " + this.clientOptions.nick);

              this.emit("join", this.world.name, this.player.id);
              break;
            }
            case Client.options.opcode.worldUpdate: {
              let count = dv.getUint8(); // players update size

              let updatedPlayers = {};
              let newPlayers = [];
              for (let i = 0; i < count; i++) { // player updates
                let id = dv.getUint32(); // player id
                //let isNew = false;
                if (!this.players[id]) {
                  //isNew = true;
                  this.players[id] = new Client.utils.Player(id);
                  newPlayers.push(id);
                }
                let player = updatedPlayers[id] = this.players[id];

                player.x = dv.getInt32() / 16; // x
                player.y = dv.getInt32() / 16; // y

                player.color[0] = dv.getUint8(); // r
                player.color[1] = dv.getUint8(); // g
                player.color[2] = dv.getUint8(); // b
                player.tool = dv.getUint8(); // tool
                player.tool = Client.options.tools[player.tool] ? player.tool : 0;
                player.rank = Math.max(player.rank, Client.options.tools[player.tool][0]);
              }
              if (count) {
                this.emit("updatedPlayers", updatedPlayers);
                if (newPlayers.length) this.emit("newPlayers", newPlayers);
              }

              count = dv.getUint16(); // pixels update size
              let updatedPixels = [];
              for (let i = 0; i < count; i++) { // pixel updates
                let pixel = {};
                if (this.clientOptions.protocol === 1) pixel.id = dv.getUint32(); // player which set pixel id
                pixel.x = dv.getInt32(); // pixel x
                pixel.y = dv.getInt32(); // y
                pixel.color = [dv.getUint8(), dv.getUint8(), dv.getUint8()];

                this.chunkSystem.setPixel(pixel.x, pixel.y, pixel.color);

                updatedPixels.push(pixel);
                //this.emit("pixelUpdate", pixel);
              }
              if (count) this.emit("updatedPixels", updatedPixels);

              count = dv.getUint8(); // disconnections of players update size
              let disconnectedPlayers = [];
              for (let i = 0; i < count; i++) {
                let leftId = dv.getUint32();
                disconnectedPlayers.push(leftId);
                delete this.players[leftId];
              }
              if (count) this.emit("playersLeft", disconnectedPlayers);
              break;
            }
            case Client.options.opcode.captcha: {
              let id = dv.getUint8();
              this.emit("captcha", id);
              switch (id) {
                case Client.options.captchaState.WAITING: {
                  this.log("Captcha State: 0 (WAITING)");
                  if (this.clientOptions.captchaPass) {
                    this.captcha.login("LETMEINPLZ" + this.clientOptions.captchaPass);
                    this.log("Trying to login using captcha pass");
                  } else if (this.clientOptions.captchaToken) {
                    this.log("Trying to login using captcha token");
                    if (!this.captcha.login(this.clientOptions.captchaToken)) console.log("login failed token already used");
                  }
                  break;
                }
                case Client.options.captchaState.VERIFYING: {
                  this.log("Captcha State: 1 (VERIFYING)");
                  break;
                }
                case Client.options.captchaState.VERIFIED: {
                  this.log("Captcha State: 2 (VERIFIED)");
                  break;
                }
                case Client.options.captchaState.OK: {
                  this.log("Captcha State: 3 (OK)");
                  if (this.clientOptions.autoConnectWorld) this.world.join(this.clientOptions.world);
                  break;
                }
                case Client.options.captchaState.INVALID: {
                  this.log("Captcha State: 4 (INVALID)");
                  break;
                }
              }
              break;
            }
            case Client.options.opcode.chunkLoad: {
              let chunkX = dv.getInt32();
              let chunkY = dv.getInt32();

              let locked = !!dv.getUint8();
              let chunk = new Uint8ClampedArray(msg, 10);

              chunk = Client.utils.decompress(chunk);


              let isNew = !this.chunkSystem.getChunk(chunkX, chunkY);
              this.chunkSystem.setChunk(chunkX, chunkY, chunk);
              this.chunkSystem.setChunkProtection(chunkX, chunkY, locked);

              this.emit("chunk", chunkX, chunkY, chunk, locked, isNew);
              break;
            }
            case Client.options.opcode.teleport: {
              if (!this.clientOptions.teleport) break;
              let x = dv.getInt32();
              let y = dv.getInt32();

              this.world.move(x, y); // lazy to write
              this.emit("teleport", x, y);
              break;
            }
            case Client.options.opcode.setRank: {
              let rank = dv.getUint8();
              this.player.rank = rank;
              this.player.chatBucket = new Bucket(...Client.options.chatQuota[rank]);

              this.emit("rank", rank);
              break;
            }
            case Client.options.opcode.setPQuota: {
              let rate = dv.getUint16();
              let per = dv.getUint16();
              this.player.pixelBucket = new Bucket(rate, per);

              this.emit("pquota", rate, per);

              this.log(`New pixelQuota: ${rate}x${per}`);
              break;
            }
            case Client.options.opcode.chunkProtected: {
              let chunkX = dv.getInt32();
              let chunkY = dv.getInt32();

              let locked = !!dv.getUint8();

              this.chunkSystem.setChunkProtection(chunkX, chunkY, locked);
              this.emit("chunkProtect", chunkX, chunkY, locked);
              break;
            }
          }
        } else {
          if (msg.toLowerCase().startsWith("you are banned")) {
            this.destroy();
            this.emit("ban", msg);
          }
          let parsedMessage = this.chat.parseMessage(msg);
          let userInfo = parsedMessage[0];
          if (userInfo) {
            if (userInfo.id) {
              if (this.players[userInfo.id]) {
                this.players[userInfo.id].nick = userInfo.nick;
              }
            }
          }
          msg = this.chat.recvModifier(msg);

          if (this.chat.messages.length > Client.options.maxChatBuffer) this.chat.messages.shift();
          this.chat.messages.push(msg);

          if (msg.toLowerCase().startsWith("Nickname reset")) {
            this.player.nick = "";
          } else if (msg.toLowerCase().startsWith("Nickname set to")) {
            this.player.nick = msg.slice("Nickname set to: \"".length, -1);
          }
          this.emit("message", msg, parsedMessage);
          this.log(msg);
        }
      }

      this.ws = ws;
    }
  }

  if (isBrowser) {
    return { // browser
      install: () => {},
      uninstall: () => {
        alert("Refresh page to uninstall.");
      },
      Client,
      ChunkSystem,
      WeirdDataView,
      EventEmitter, // should be defined globally
      Bucket,
      canvasUtils
    }
  } else if (!isBrowser) {
    module.exports = {
      Client,
      ChunkSystem,
      WeirdDataView,
      Bucket,
      canvasUtils
    }
  }
})();
