import {Events} from './Events';

var _ = require('underscore');

export class Model extends Events {
  constructor(defaults) {
    this.attributes = {};
    this.set(defaults);
  }

  get(attr) {
    return this.attributes[attr];
  }

  set(key, val) {
    if (key == null) {
      return this;
    }
    var old = _.clone(this);
    var attrs;
    if (typeof key === 'object') {
      attrs = key;
    } else {
      attrs = {};
      attrs[key] = val;
    }
    _.each(attrs, (v, k) => {
      if (!_.isEqual(this.attributes[k], v)) {
        this.trigger('change:' + k, {new: v, old: this.attributes[k]});
      }
      this.attributes[k] = v;
    });
    this.trigger('change', {new: this, old: old});
    return this;
  }

}
