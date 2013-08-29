(function(exports) {
  'use strict';

  function DateTimeFormat() {
    this.mInitialized = true;
  }
  DateTimeFormat.prototype = {
    localeFormat: function mockLocaleFormat(time, strFormat) {
      return '' + (+time) + strFormat;
    }
  };

  var MockmozL10n = {
    get: function get(key, params) {
      if (params) {
        return key + JSON.stringify(params);
      }
      return key;
    },
    ready: function ready(handler) {
      setTimeout(handler);
    },
    translate: function translate(element) {},
    localize: function localize(element, id, args) {
      element.innerText = MockmozL10n.get(id, args);
    },
    DateTimeFormat: DateTimeFormat
  };

  exports.MockmozL10n = MockmozL10n;

}(this));
