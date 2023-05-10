(function() {
  let pkg = {
    install(){},
    uninstall(){},
  };
  pkg.update = function() {
    return fetch('/api')
      .then(raw => {return raw.json()})
      .then(json => {
        pkg.banned = json.banned;
        pkg.captchaEnabled = json.captchaEnabled;
        pkg.maxConnectionsPerIp = json.maxConnectionsPerIp;
        pkg.motd = json.motd;
        pkg.numSelfBans = json.numSelfBans;
        pkg.totalConnections = json.totalConnections;
        pkg.uptime = json.uptime;
        pkg.users = json.users;
        pkg.yourConns = json.yourConns;
        pkg.yourIp = json.yourIp;
        return pkg.json = json;
      });
  };
  
  pkg.disconnect = function() {
    return fetch('/api/disconnectme')
      .then(raw => {return raw.json()})
      .then(json => {return pkg.hadEffect = json.hadEffect});
  };
  pkg.update();
  setInterval(pkg.update, 6e4);
  return pkg;
})();
