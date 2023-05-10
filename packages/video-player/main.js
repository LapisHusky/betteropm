const {windowSys, GUIWindow} = OWOP.require("windowsys");
const chat = OPM.require("core-utils").chat;
(function() {
	function install() {
OWOP.chat.local("❤️ Thanks for Installing Video Player ❤️")
let urll = "https://www.youtube.com/embed/";
let video_code = "";
makeDimder()
function makeDimder() {
    let options = {
      closeable: false
    }
    let mkHTML = OWOP.util.mkHTML
    function windowFunc(wdow) {
      let video_player = document.createElement("iframe");
      video_player.src = urll + video_code;
      video_player.height = 250;
      video_player.width = 450;
      video_player.frameBorder  = "7px";

      let videocodespan = mkHTML("span", {
        innerHTML: `𝗩𝗶𝗱𝗲𝗼 𝗖𝗼𝗱𝗲: `
      })
      let urltextarea = mkHTML("input", {
        value: "oHg5SJYRHA0",
        type: "text",
      })
      videocodespan.style.color = 'white';
      let urltextarea1 = mkHTML("span", {
        innerHTML: "𝗨𝗥𝗟 ->",
      })
      let urltextarea2 = mkHTML("span", {
        innerHTML: "𝘄𝘄𝘄.𝘆𝗼𝘂𝘁𝘂𝗯𝗲.𝗰𝗼𝗺/𝘄𝗮𝘁𝗰𝗵?𝘃=",
      })
      let urltextarea3 = mkHTML("span", {
        innerHTML: "𝗼𝗛𝗴𝟱𝗦𝗝𝗬𝗥𝗛𝗔𝟬",
      })
      let urltextarea4 = mkHTML("span", {
        innerHTML: "<- 𝗖𝗼𝗱𝗲",
      })
      urltextarea1.style.color = 'white';
      urltextarea2.style.color = 'red';
      urltextarea3.style.color = 'lime';
      urltextarea4.style.color = 'white';
      let loadbutton = mkHTML("button", {
        innerHTML: "𝗟𝗼𝗮𝗱",
        onclick: function() {
            OWOP.chat.local(`<b style='color: lime;'>𝗩𝗶𝗱𝗲𝗼 𝗟𝗼𝗮𝗱𝗲𝗱!</b>`)
            video_code = urltextarea.value;
            video_player.src = urll + video_code;
            if (video_code.length < 11) {
            OWOP.chat.local(`<b style='color: red;'>𝗙𝗮𝗶𝗹𝗲𝗱 𝗟𝗼𝗮𝗱𝗶𝗻𝗴 𝗩𝗶𝗱𝗲𝗼, 𝗠𝗮𝘆𝗯𝗲 𝘆𝗼𝘂𝗿 𝗩𝗶𝗱𝗲𝗼 𝗖𝗼𝗱𝗲 𝗱𝗼𝗻'𝘁 𝗵𝗮𝘃𝗲 𝟭𝟭 𝗼𝗳 𝗹𝗲𝗻𝗴𝘁𝗵!</b>`)
            urltextarea.value = "𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗖𝗼𝗱𝗲."
            video_player.src = urll + "error";
          }
        }
      })

      let heightspan = mkHTML("span", {
        innerHTML: `𝗩𝗶𝗱𝗲𝗼 𝗛𝗲𝗶𝗴𝗵𝘁: `
      })
      let heightarea = mkHTML("input", {
        value: "150",
        type: "number",
      })

      let widthspan = mkHTML("span", {
        innerHTML: `𝗩𝗶𝗱𝗲𝗼 𝗪𝗶𝗱𝘁𝗵: `
      })
      widthspan.style.color = 'white';
      heightspan.style.color = 'white';
      let widtharea = mkHTML("input", {
        value: "350",
        type: "number",
      })
      let setbutton = mkHTML("button", {
        innerHTML: "𝗦𝗲𝘁",
        onclick: function() {
            OWOP.chat.local(`<b style='color: lime;'>𝗛𝗲𝗶𝗴𝗵𝘁 𝗮𝗻𝗱 𝗪𝗶𝗱𝘁𝗵 𝗦𝗲𝘁 𝗦𝘂𝗰𝗲𝘀𝗳𝘂𝗹𝗹𝘆!</b>`)
            video_player.height = heightarea.value;
            video_player.width = widtharea.value;
        }
      })

      wdow.addObj(video_player);
      wdow.addObj(mkHTML("br"))
      wdow.addObj(videocodespan)
      wdow.addObj(urltextarea);
      wdow.addObj(loadbutton);
      wdow.addObj(mkHTML("br"))
      wdow.addObj(urltextarea1)
      wdow.addObj(urltextarea2)
      wdow.addObj(urltextarea3)
      wdow.addObj(urltextarea4)
      wdow.addObj(mkHTML("br"))
      wdow.addObj(mkHTML("br"))
      wdow.addObj(heightspan);
      wdow.addObj(heightarea);
      wdow.addObj(mkHTML("br"))
      wdow.addObj(widthspan);
      wdow.addObj(widtharea);
      wdow.addObj(setbutton);
    }
    let wclass = new OWOP.windowSys.class.window("𝗩𝗶𝗱𝗲𝗼 𝗣𝗹𝗮𝘆𝗲𝗿", options, windowFunc);
    OWOP.windowSys.addWindow(wclass).move(window.innerHeight / 3, 30)
    OWOP.windowSys.windows["𝗩𝗶𝗱𝗲𝗼 𝗣𝗹𝗮𝘆𝗲𝗿"].move(480, 50);
  }
  hide();
  function hide() {
    OWOP.windowSys.windows["𝗩𝗶𝗱𝗲𝗼 𝗣𝗹𝗮𝘆𝗲𝗿"].move(10000, 10000);
}
  show();
  function show() {
    OWOP.windowSys.windows["𝗩𝗶𝗱𝗲𝗼 𝗣𝗹𝗮𝘆𝗲𝗿"].move(480, 50);
  }
  OWOP.chat.local("(𝗧𝗶𝗽) 𝗧𝘆𝗽𝗲 /𝗵𝘃𝗽 𝘁𝗼 𝗛𝗶𝗱𝗲 𝗮𝗻𝗱 /𝘀𝘃𝗽 𝘁𝗼 𝗦𝗵𝗼𝘄.")
  chat.registerCommand("hvp", hide); 
  chat.registerCommand("svp", show);
      }
      
      function uninstall() {
      chat.deregisterCommand("hvp")
      chat.deregisterCommand("svp")
      OWOP.chat.local("❤️ Thanks for Using Video Player ❤️")
      OWOP.windowSys.windows["𝗩𝗶𝗱𝗲𝗼 𝗣𝗹𝗮𝘆𝗲𝗿"].close();
      }
      
      return {
          install: install,
          uninstall: uninstall
      };
  })()
