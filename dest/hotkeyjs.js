(function() {
  'use strict';
  var HotKey;

  HotKey = (function() {
    function HotKey(key1, params, cb) {
      var body, index, val;
      this.key = key1;
      this.cb = cb;

      /*
      			throw err if the first argument is not a string val
       */
      if (typeof this.key !== 'string') {
        throw Error('The first params mush be a string.');
      }

      /*
      			set callback if there is no second val
       */
      if (typeof params === 'function') {
        this.cb = params;
      } else {
        for (index in params) {
          val = params[index];
          this[index] = val;
        }
      }

      /* 
      			Store special keys like cmd, shift etc...
      			and mark them as bool val.
      			Do callback only if these are pressed.
       */
      this.tmp = {};
      body = document.body;

      /*
      			remove space, tab etc..
       */
      this.key = this.key.replace(/\s/gi, '');
      if (!this.isSingleKey(this.key)) {
        this.isMulti = true;
        this.getSpecialKey(this.key);
      }
      body.addEventListener('keydown', this.keydown.bind(this));
    }


    /* return true if the first argument do not contain '+' */

    HotKey.prototype.isSingleKey = function(key) {
      return !/\+/gi.test(key);
    };


    /* key down */

    HotKey.prototype.keydown = function($event) {
      var i, key;
      $event = $event || window.event;

      /*
      			prevent default if has to
       */
      if (this.preventDefault) {
        $event.preventDefault();
      }
      if (this.isMulti) {
        for (i in this.tmp) {
          if (!$event[i]) {
            return;
          }
        }
      }
      key = ($event.key || (String.fromCharCode($event.keyCode))).toLowerCase();
      if (key === this.key) {
        return this.cb();
      }
    };

    HotKey.prototype.getSpecialKey = function(key) {
      var i, j, keyarray, len, ref;
      keyarray = key.split('+');
      for (j = 0, len = keyarray.length; j < len; j++) {
        i = keyarray[j];
        i = i.toLowerCase();
        if (i === 'meta' || i === 'command' || i === 'cmd') {
          this.tmp['metaKey'] = true;
        } else if (i === 'control' || i === 'ctrl') {
          this.tmp['ctrlKey'] = true;
        } else if (i === 'shift') {
          this.tmp['shiftKey'] = true;
        } else if (i === 'alt' || i === 'option') {
          this.tmp['altKey'] = true;
        }
      }
      return this.key = (ref = this.key.split(/ctrl|control|shift|meta|command|alt|option|cmd|\+/gi)) != null ? ref.join('').toLowerCase() : void 0;
    };

    return HotKey;

  })();

  if (typeof window !== "undefined" && window !== null) {
    window.HotKey = HotKey;
  }

}).call(this);
