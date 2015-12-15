var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var channel = Backbone.Radio.channel('global');
var data = require('../data/cities');

var apiRoot = "http://api.openweathermap.org/data/2.5/";
var apiKey = 'd73f855b0258663c804c24680fe8b248';
var fakeCityRoot = "fake/city.json";
var fakeCitiesRoot = "fake/sample.json";

var City = Backbone.Model.extend({
    url: function(args){
		var params;

        if (this.has('lat') && this.has('lon')) {
            params = this.pick('lat', 'lon');
        } else if (this.has('zip')) {
            params = this.pick('zip')
        }
		
		return apiRoot + 'weather?units=imperial&' + $.param(params) + '&APPID=' + apiKey;
    },
	getTemperature: function(){
		return (this.get('main') || {}).temp;
	},
	toJSON: function(location){
		var attrs = _.clone(this.attributes);
		attrs.temperature = this.getTemperature();
		attrs.difference = !_.isNull(attrs.temperature) && !!location ? attrs.temperature - location.getTemperature() : null;
		return attrs;
	}
});

var Cities = Backbone.Collection.extend({
	model: City,
	url: function(args){
        //return fakeCitiesRoot;
		return apiRoot + 'group?units=imperial&id=' + this.pluck('id').join(',') + '&APPID=' + apiKey;
	},
	parse: function(response){
		if (response.list){
			return response.list;
		}

		return response;
	},
	toJSON: function(location){
		return this.invoke('toJSON', location);
	}
});

module.exports = {
	City: City,
	Cities: Cities
};
