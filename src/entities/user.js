var channel = Backbone.Radio.channel('global');
 
var User = Backbone.Model.extend({
	getCity: function(){
		if (!this.has('city')){
			this._city();
		} 
		
		return this.get('city');
	},
	_city: function(){
		var city = channel.request('get:city');
		city.set(this.pick('lat', 'lng', 'zip'));
		this.set('city', city);
		city.fetch();
	}
});

var user = new User;

channel.reply('get:user', function(){
	return user;
});
