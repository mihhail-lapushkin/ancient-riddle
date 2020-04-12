Event = (function() {
  var ESC = 27;
  var SPACE = 32;

  function evtBase(funcName, evts, handler, el) {
    if (el) {
      var tmp = evts;
      evts = handler;
      handler = el;
      el = tmp;
    }

    evts.split(' ').forEach(function(evt) {
      ((el ? el : document)[funcName])(evt, handler, false);
    });
  }

  function bind(evts, handler, el) {
    evtBase('addEventListener', evts, handler, el);
  }

  function bindToKey(fn, key) {
    bind(document, 'keyup', function(e) { if (e.keyCode === key) fn(); });
  }

  return {
    bind: bind,

    unbind: function(evts, handler, el) {
      evtBase('removeEventListener', evts, handler, el);
    },

    backPressed: function(fn) {
      bindToKey(fn, ESC);
    },

    menuPressed: function(fn) {
      bindToKey(fn, SPACE);
    },

    pageLoaded: function(fn) {
      bind(document, 'DOMContentLoaded', fn);
    },

    userInput: function(fn) {
      bind(document, 'click', fn);
    },

    allFired: function(config) {
      var left = config.events.length;

      var checkDone = function() {
        if (--left === 0) {
          config.callback();
        }
      };

      config.events.forEach(function(evt) {
        evt(checkDone);
      });
    }
  };
})();