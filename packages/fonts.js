(function() {
  const EE = OWOP.require('events');
  const pack = new EE();
  pack.fonts = {};
  pack.load = function(name, url, callback) {
    if(pack.fonts[name]) {
      callback(true);
      return;
    }
    pack.fonts[name] = true;
    let font = new FontFace(name, `url(${url})`);
    pack.emit('loading', name, url);
    font.load()
      .then(loadedFace => {
        document.fonts.add(loadedFace);
        pack.fonts[name] = loadedFace;
        callback(loadedFace);
        pack.emit('load', name, loadedFace);
      })
      .catch(error => {
        delete pack.fonts[name];
        callback(false, error);
        pack.emit('error', name, error);
      });
    };
  pack.unload = function(name) {
    if(pack.fonts[name] === true) return false;
    if(!pack.fonts[name]) return true;
    let font = pack.fonts[name];
    document.fonts.delete(font);
    delete pack.fonts[name];
    pack.emit('unload', name, font);
    return font;
  };
  pack.isLoaded = function(name) {
    if(!pack.fonts[name] || pack.fonts[name] === true) return false;
    return true;
  };
  pack.isLoading = function(name) {
    if(pack.fonts[name] && pack.fonts[name] === true) return true;
    return false;
  };
  pack.install = pack.uninstall = function() {};
  return pack;
})();
