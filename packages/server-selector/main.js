(() => {
  const networking = OWOP.require("networking").net;
  const connect = OWOP.require("main").retryingConnect;
  const chat = OPM.require("core-utils").chat;
  //const protocols = OWOP.require("protocol/all").definedProtos;

  const serverLinks = [
    ["wss://owoppa.glitch.me/", "mathias377's and dimden's server"],
    ["wss://owop-server.glitch.me", "Modern nodejs owop server (died for moment?)"]
  ];
  for(let i = 0; i < OWOP.options.serverAddress.length; i++) {
    serverLinks.push([
      OWOP.options.serverAddress[i].url,
      OWOP.options.serverAddress[i].title
    ]);
  }

  /*function createServerObject(url, title, protocol = "old") { // unused anymore
    return {
      default: false,
      title,
      proto: protocols[protocol],
      url
    }
  }*/

  function openSelector() {
    OWOP.windowSys.addWindow(new OWOP.windowSys.class.window("Server selector", {
      centerOnce: true,
      closeable: true
    }, wdow => {
      let mkHTML = OWOP.util.mkHTML

      function addServers() {
        for (let i = 0; i < serverLinks.length; i++) {
          let server = serverLinks[i];

          wdow.addObj(mkHTML("button", {
            innerHTML: server[1],
            onclick: () => {
              OWOP.options.serverAddress[0].url = server[0];
              OWOP.options.serverAddress[0].title = server[1];

              networking.connection.close();
              wdow.close();
              setTimeout(function() {
                connect(() => {
                  return OWOP.options.serverAddress[0];
                }, networking.protocol.worldName);
              }, 1000)
            }
          }))
          wdow.addObj(mkHTML("br", {}));
        }
      }
      addServers();
    }))
  }

  function closeSelector() {
    if (OWOP.windowSys.windows["Server selector"]) OWOP.windowSys.windows["Server selector"].close();
  }
  return {
    install: () => {
      chat.registerCommand("openss", openSelector);
      chat.registerCommand("openserverselector", openSelector);
      OWOP.chat.local("Server selector loaded. v.2")
    },
    uninstall: () => {
      chat.deregisterCommand("openss");
      chat.deregisterCommand("openserverselector");
      closeSelector();
      OWOP.chat.local("Server selector uninstalled.")
    },
    openSelector,
    closeSelector
  }
})()
