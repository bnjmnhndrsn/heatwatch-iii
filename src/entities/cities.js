var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var channel = Backbone.Radio.channel('global');
var data = require('../data/cities');

var fakeCityRoot = "fake/city.json";
var fakeCitiesRoot = "fake/sample.json";

var data = {
	units: 'imperial',
	appid: 'd73f855b0258663c804c24680fe8b248'
};

var Location = Backbone.Model.extend({
	fetch: function(options){
		options = options || {};
		options.data = _.extend(data, options.data);
		return Backbone.Model.prototype.fetch.call(this, options);
	},
	url: 'http://api.openweathermap.org/data/2.5/weather',
	getTemperature: function(){
		return (this.get('main') || {}).temp;
	},
	toJSON: function(){
		return {
			temperature: this.getTemperature(),
			name: this.get('name')
		};
	}
});

var Locations = Backbone.Collection.extend({
	model: Location,
	url: 'http://api.openweathermap.org/data/2.5/group',
	fetch: function(options){
		options = options || {};
		options.data = _.extend(data, {
			id: this.pluck('id').join(',')
		}, options.data);
		return Backbone.Collection.prototype.fetch.call(this, options);
	},
	parse: function(response){
		if (response.list){
			return response.list;
		}
		return response;
	}
});

module.exports = {
	City: Location,
	Cities: Locations
};
