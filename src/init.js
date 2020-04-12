(function() {
  if (localStorage.getItem('ancientRiddle.clearDb')) {
    DAO.clearDb();
  }

  ImageLoader.isXDPI(function() {
    return UI.getDimensions().width > DPI.H.width && UI.getDimensions().height > DPI.H.height;
  });

  if (!DAO.isIntroNeeded()) {
    delete Config.resources.images.files.common.png.text.intro;
  }

  var loaders = {
    splash: new ImageLoader(Config.resources.images.path, Config.resources.images.files.splash),
    image: new ImageLoader(Config.resources.images.path, Config.resources.images.files.common),
    audio: new AudioLoader(Config.resources.audio.path, Config.resources.audio.files)
  };

  loaders.image.progress(UI.trackLoading);
  loaders.image.loaded(UI.endLoading);

  Event.backPressed(function() { return false; });

  Event.allFired({
    events: [ Event.pageLoaded, loaders.splash.loaded ],
    callback: UI.showLoading
  });

  Event.allFired({
    events: [ Event.pageLoaded, Event.userInput, loaders.image.loaded, loaders.audio.loaded ],
    callback: Controller.initAll
  });

  loaders = undefined;
})();