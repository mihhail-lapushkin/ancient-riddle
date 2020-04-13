Kinetic.Loading = (function() {
  var TEXT_HEIGHT = 6;
  var BAR_Y = 0.8;
  var BAR_WIDTH = 0.7;
  var BAR_HEIGHT = 2.2;
  
  var CONTENT_FADE_IN_TIME = 1.5;

  var Class = $.Class({
    _init_: function(config) {
      config.listening = false;

      Kinetic.Group.call(this, config);

      this._build();
      this.on('percentChange', this._percentChanged);
    },

    _build: function() {
      var w = this.getWidth();
      var h = this.getHeight();
      var unit = this.attrs.unit;

      this.add(this.bg = new Kinetic.Rect({
        width: w,
        height: h,
        fill: 'black'
      }));
      
      this.add(this.content = new Kinetic.Group({
        width: w,
        height: h,
        opacity: 0
      }));

      this.content.add(this.content.text = new Kinetic.ProportionalImage({
        height: unit * TEXT_HEIGHT,
        image: Image.text.loading
      }));

      this.content.add(this.content.clickToStartText = new Kinetic.Text({
        text: 'TOUCH TO START',
        fill: 'white',
        fontSize: 40,
        fontFamily: 'Arial',
        opacity: 0
      }));

      this.content.add(this.content.bar = new Kinetic.ProgressBar({
        y: h * BAR_Y,
        width: w * BAR_WIDTH,
        height: unit * BAR_HEIGHT,
        reversed: true
      }));

      this.content.center(this.content.text);
      this.content.center(this.content.clickToStartText);
      this.content.centerHorizontally(this.content.bar);
    },

    _percentChanged: function(evt) {
      this.content.text.setOpacity(1 - evt.newVal);
      this.content.bar.setPercent(1 - evt.newVal);

      this.getParent().draw();
    },

    done: function() {
      this.content.text.setOpacity(0);
      this.content.bar.setOpacity(0);
      this.content.clickToStartText.setOpacity(1);

      this.getParent().draw();
    },

    fadeIn: function() {
      this.content.to({
        duration: CONTENT_FADE_IN_TIME,
        easing: 'EaseOut',
        opacity: 1
      });
    },

    destroy: function() {
      Kinetic.Group.prototype.destroy.call(this);
      delete Image.text.loading;
    }
  });

  Kinetic.Util.extend(Class, Kinetic.Group);
  Kinetic.Factory.addGetterSetter(Class, 'percent');

  return Class;
})();