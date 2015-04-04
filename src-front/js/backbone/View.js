var _ = require('underscore');
var $ = require('jquery-browserify');

export class View {
  constructor(el) {
    this.$el = $(el);
    this.el = el;
  }

  on(eventName, selector, listener) {
    if (_.isFunction(selector)) {
      listener = selector;
      this.$el.on(eventName, listener);
    } else {
      this.$el.on(eventName, selector, listener);
    }
    return this;
  }
}
