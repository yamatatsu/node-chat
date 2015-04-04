import {Model} from './backbone/Model';
import {View} from './backbone/View';

class Person extends Model {
  constructor(attrs) {
    this.defaults = {
      country: 'Japan',
      eyes: 'black'
    };
    super(attrs);
    this.on('change:name', args => console.log('change name '+args.old+' to '+args.new));
    this.on('change', args => console.log('change model '+JSON.stringify(args.old)+' to '+JSON.stringify(args.new)));
  }
}

var tatsuya = new Person({name: 'tatsuya', age: 29});
tatsuya.set('country', 'Japan');
tatsuya.set('name', 'tatsuya2');

class SearchView extends View {
  constructor(el) {
    super(el);
    super
      .on('click', 'input[type=button]', this.doSearch);
    this.render();
  }

  render() {
    var template = `
      <label>Search</label>
      <input type="text" id="search_input" />
      <input type="button" id="search_button" value="Search" />
    `;
    this.$el.html(template);
  }

  doSearch(e) {
    console.log('Search for '+$('#searchInput').val());
  }
}

var searchView = new SearchView($('#searchContainer'));
