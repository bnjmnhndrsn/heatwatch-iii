var Backbone = require('backbone');

var channel = Backbone.Radio.channel('global');
var data = require('../data/cities');

var apiRoot = "http://api.openweathermap.org/data/2.5/group?units=imperial&id=";

var fakeCityRoot = "fake/city.json";
var fakeCitiesRoot = "fake/sample.json";

var City = Backbone.Model.extend({
    url: function(args){
		var params;

        if (this.has('lat') && this.has('lng')) {
            params = this.pick('lat', 'lng');
        } else if (this.has('zip')) {
            params = this.pick('zip')
        }
    },
	getTemperature: function(){
		return (this.get('main') || {}).temp || 'N/A';
	}
});

var Cities = Backbone.Collection.extend({
	model: City,
	url: function(args){
        return fakeCitiesRoot;
		return apiRoot + this.pluck('id').join(',');
	},
	parse: function(response){
		if (response.list){
			return response.list;
		}

		return response;
	}
});

var cities = new Cities(data);

channel.reply('get:city', function(){
	return new City;
});

channel.reply('get:cities', function(n){
	if (n) {
		return new Cities(cities.take(n));
	}
	return cities;
});
