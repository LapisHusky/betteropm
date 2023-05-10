(function() {
  let players = OPM.require('core-utils').players.list;
  let interval;
  return {
    install() {
      let nicks = localStorage.getItem(`nicks-${OWOP.world.name}`) ? JSON.parse(localStorage.getItem(`nicks-${OWOP.world.name}`)) : {};
      let restored = 0;
      Object.keys(nicks).forEach(player => {
        if(players[player] && players[player].nick === null) {
          players[player].nick = nicks[player];
          restored++;
        }
      });
      OWOP.chat.local(`${restored} / ${Object.keys(nicks).length} nicks restored`);
      interval = setInterval(() => {
        let nicks = {};
        Object.keys(players).forEach(player => {
          if(players[player].nick !== null) nicks[player] = players[player].nick;
        });
      localStorage.setItem(`nicks-${OWOP.world.name}`, JSON.stringify(nicks));
      }, 2000);
    },
    uninstall() {}
  };
})();
