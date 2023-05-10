(function() {
  let element;
  let interval;
  let API = OPM.require('api');
  document.styleSheets[0].insertRule('.top-bar { margin-right: 15px }');
  document.styleSheets[0].insertRule('.top-bar { pointer-events: auto }');
  function install() {
    element = document.createElement("span");
    element.className = "top-bar";
    element.style.float = "left";
    OWOP.elements.topBar.appendChild(element);
    API.update()
      .then(json => {
        element.textContent = `Your Connections: ${json.yourConns} / ${json.maxConnectionsPerIp}`;
        json.yourConns === json.maxConnectionsPerIp ? element.style.color = 'yellow' : element.style.color = 'white';
        element.title = `Your IP: ${json.yourIp}`;
      });
    interval = setInterval(function() {
      API.update()
        .then(json => {
          element.textContent = `Your Connections: ${json.yourConns} / ${json.maxConnectionsPerIp}`;
          json.yourConns === json.maxConnectionsPerIp ? element.style.color = 'yellow' : element.style.color = 'white';
          element.title = `Your IP: ${json.yourIp}`;
        });
    }, 12500);
  }
  function uninstall() {
    clearInterval(interval);
    OWOP.elements.topBar.removeChild(element);
  }
  return {
    install: install,
    uninstall: uninstall
  };
})();
