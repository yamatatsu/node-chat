console.log('start backbone tutorial!!');

import {Model} from './backbone/Model';

class Person extends Model {
    constructor(attrs) {
        var options = {
          defaults: {
            country: 'Japan',
            eyes: 'black'
          }
        };
        super(attrs, options);
        this.on('change:name', args => console.log('change name '+args.old+' to '+args.new));
        this.on('change', args => console.log('change model '+JSON.stringify(args.old)+' to '+JSON.stringify(args.new)));
    }
}

var tatsuya = new Person({name: 'tatsuya', age: 29});
tatsuya.set('country', 'Japan');
tatsuya.set('name', 'tatsuya2');
