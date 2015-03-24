console.log('start backbone tutorial!!');

import {Model} from './backbone/Model';

class Person extends Model {
    constructor(attrs) {
        super(attrs);
    }
}

var tatsuya = new Person({name: 'tatsuya', age: 29});
tatsuya.set('country', 'japan');

console.log(tatsuya.get('name'));
console.log(tatsuya.get('age'));
console.log(tatsuya.get('country'));