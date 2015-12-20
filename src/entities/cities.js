// Dependencies
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var settings = require('../settings');
var channel = Backbone.Radio.channel('global');


var defaultData = {
	units: 'imperial',
	appid: 'd73f855b0258663c804c24680fe8b248'
};

var defaultOptions = settings.DEBUG ? {} : {
    jsonp: "callback",
    dataType: "jsonp"
};

var Location = Backbone.Model.extend({
	fetch: function(options){
		options = _.extend({}, defaultOptions, options);
		var data; 
		if (this.has('lat') && this.has('lon')) {
			data = this.pick('lat', 'lon');
		} else if (this.has('zip')) {
			data = this.pick('zip');
		}
		options.data = _.extend({}, defaultData, data, options.data);
		return Backbone.Model.prototype.fetch.call(this, options);
	},
	url: function(){
		if (settings.DEBUG) {
			return '/fake/location.json';
		}
		return 'http://api.openweathermap.org/data/2.5/weather';
	},
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
	url: function(){
		if (settings.DEBUG) {
			return '/fake/cities.json';
		}
		return 'http://api.openweathermap.org/data/2.5/group';
	},
	fetch: function(options){
		options = _.extend({}, defaultOptions, options);
		options.data = _.extend({}, defaultData, {
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
