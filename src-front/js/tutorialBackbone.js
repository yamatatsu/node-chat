import {Model} from './backbone/Model';
import {View} from './backbone/View';

var $ = require('jquery-browserify');

/////////////
// Model
class User extends Model {
  constructor(attrs) {
    super({
      defaults: {userName: ''},
      idAttribute: 'userId',
      urlRoot: '/api/user'
    });
    super
      .on('change', args => console.log('change model '+JSON.stringify(args.old)+' to '+JSON.stringify(args.new)))
      .set(attrs);
  }
}

//////////////
// View
class SearchView extends View {
  constructor(el) {
    super(el);
    super
      .on('click', '#save_button', this.save)
      .on('click', '#delete_button', this.delete);
    this.render();
  }

  render() {
    var template = `
      <label>EDIT USER</label>
      <input type="text" id="user_id" />
      <input type="text" id="user_name" />
      <input type="button" id="save_button" value="save" />
      <input type="button" id="delete_button" value="delete" />
    `;
    this.$el.html(template);
  }

  save() {
    console.log('save');

    var user = new User({
      userId: $('#user_id').val(),
      userName: $('#user_name').val()
    });
    user.save({success: data => console.log(JSON.stringify(data))});
  }

  delete() {
    var user = new User({
      userId: $('#user_id').val()
    });
    user.destroy({success: data => console.log(JSON.stringify(data))});
  }

}

var searchView = new SearchView($('#searchContainer'));
