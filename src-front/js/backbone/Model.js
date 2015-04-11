import {Events} from './Events';

var $ = require('jquery-browserify');
var _ = require('underscore');

export class Model extends Events {
  constructor(options) {
    this.attributes = {};
    if (options.defaults) {
      this.set(options.defaults);
    }
    this.idAttribute = options.idAttribute || 'id';
    this.urlRoot = options.urlRoot;
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

  save(options) {
    var type = !this.getId() ? 'POST' : 'PUT';
    this._sync(type, options.success);
  }

  destroy(options) {
    this._sync('DELETE', options.success);
  }

  _sync(type, success) {
    if (!this.urlRoot) {
      return false;
    }

    var url = this.urlRoot;
    var id = this.getId();
    if (id) {
      url += '/' + id;
    }

    $.ajax({
      url: url,
      type: type,
      data: this.attributes,
      dataType: 'json',
      success: (data) => success(data)
    });
  }

  getId() {
    return this.attributes[this.idAttribute];
  }

}
