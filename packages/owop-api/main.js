(function() {
  let API = OPM.require('api');
  let chat = OPM.require('core-utils').chat;
  let container, wnd;
  
  function install() {
    let refresh = () => {
      API.update()
        .then(json => document.querySelector('pre').innerHTML = JSON.stringify(json, null, 2));
    };
    let disconnect = () => {
      confirm('Are you sure you want to disconnect?') ? API.disconnect().then(effect => effect ? document.querySelector('pre').innerHTML = 'You were disconnected' : document.querySelector('pre').innerHTML = 'You were not even connected') : void(null);
    };
    let colapse = () => {
      let oa = document.getElementById('oa');
      let col = document.getElementById('c');
      if(oa) {
        if(oa.style.display === 'none' || '') {
          oa.style.display = 'block';
          col.innerHTML = "&#8722;";
          localStorage.setItem('collapsed', false);
        } else {
          oa.style.display = 'none';
          col.innerHTML = "&#43;";
          localStorage.setItem('collapsed', true);
        }
      }
    };
    let open = () => {
      OWOP.windowSys.addWindow(new OWOP.windowSys.class.window("OWOP API", {
          closeable: true,
          moveable: true
      }, w => {
        wnd = w;
        container = w.container;
        container.style.width = "500px";
      }).move(window.innerWidth - 400, 300));
      container.insertAdjacentHTML("beforeend", `<span style="font-weight:bold;color:white">API</span><button id="c" style="float:right">&#8722;</button><button id="d" style="float:right">Disconnect</button><button id="r" style="float:right">Refresh</button><br><div id="oa" style="margin-top:16px"><pre style="color:white"></pre></div>`);
      document.getElementById('r').onclick = refresh;
      document.getElementById('d').onclick = disconnect;
      document.getElementById('c').onclick = colapse;
      refresh();
      if(localStorage.getItem('collapsed') !== "false") colapse();
    };
    chat.registerCommand('api', open);
    if(localStorage.getItem('messageShown') !== "true") {
      OWOP.chat.local('Use /api to open API window once closed');
      localStorage.setItem('messageShown', true);
    }
    open();
  }
  
  function uninstall() {
    chat.deregisterCommand('api');
    OWOP.windowSys.delWindow(wnd);
  }
  
  return {
    install: install,
    uninstall: uninstall
  };
})();
