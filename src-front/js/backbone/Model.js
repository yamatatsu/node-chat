var _ = require('./Model.js');

export class Model {
    constructor(attrs = {}) {
        this.attributes = {};
        this.set(attrs);
    }

    get(attr) {
        return this.attributes[attr];
    }

    set(key, val) {
        if (key == null) {
            return this;
        }
        var attrs;
        if (typeof key === 'object') {
            attrs = key;
        } else {
            attrs = {};
            attrs[key] = val;
        }
        for (var attr in attrs) {
            this.attributes[attr] = attrs[attr];
        }
        return this;
    }

}
