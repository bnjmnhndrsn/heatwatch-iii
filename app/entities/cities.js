var channel = Backbone.Radio.channel('global');
var data = require('../data/cities');

var apiRoot = "http://api.openweathermap.org/data/2.5/group?id=";

var Cities = Backbone.Collection.extend({
	url: function(args){
		return apiRoot + this.pluck('id').join(',');
	},
	parse: function(response){
		if (reponse.list){
			return response.list;
		}
		
		return response;
	}
});

var cities = new Cities(data);

channel.reply('get:cities', function(){
	return cities;
});
