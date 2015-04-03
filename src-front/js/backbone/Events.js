var _ = require('underscore');

export class Events {
    constructor() {
    }

    on(name, callback) {
        this._events || (this._events = {});
        var events = this._events[name] || (this._events[name] = []);
        events.push(callback);
    }

    trigger(name, args) {
        if (!this._events) {
            return this;
        }
        var events = this._events[name];
        if (events) {
            _.each(events, event => event(args));
        }
        return this;
    }

}
