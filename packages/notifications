(function () {
  function install() {
    const players = OPM.require("core-utils").players;
    const chat = OPM.require("core-utils").chat;

    players.on("join", (player) => {
      let content = `${player.nick}:${player.id} joined`;
      if (player.nick == null) {
        content = `${player.id} joined`;
      }
      callNotification(content, "auto", "250px", "Player joined", 3000);
    });

    players.on("leave", (player) => {
      let content = `${player.nick}:${player.id} left`;
      if (player.nick == null) {
        content = `${player.id} left`;
      }
      callNotification(content, "auto", "250px", "Player left", 2000);
    });

    chat.on("message", (msg) => {
      if (msg.type != "dm") return;
      let content = `New DM from ${msg.from}`;
      callNotification(content, "auto", "250px", "New DM", 2000);
    });
  }

  function uninstall() {}

  let notifications = 0;

  function callNotification(content, height, width, title, time) {
    let notificationWindow = new OWOP.windowSys.class.window(`Notification ${notifications}`, {},
      function (win) {
        notifications++;
        win.container.title = title;
        win.container.style.height = height;
        win.container.style.width = width;
        win.container.style.overflow = "hidden";

        win.addObj(document.createTextNode(content));
        setTimeout(function () {
          notifications--;
          win.close();
        }, time);
      }
    );
    notificationWindow.move(window.innerWidth - 300, 32 * (notifications * 2.5))
    OWOP.windowSys.addWindow(notificationWindow);
  }

  return {
    install: install,
    uninstall: uninstall,
  };
})()
