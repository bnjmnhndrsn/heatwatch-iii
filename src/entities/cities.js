var _ = require('underscore');
var Backbone = require('backbone');

var channel = Backbone.Radio.channel('global');
var data = require('../data/cities');

var apiRoot = "http://api.openweathermap.org/data/2.5/group?units=imperial&id=";
var apiKey = 'd73f855b0258663c804c24680fe8b248';
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
	},
	toJSON: function(){
		var attrs = _.clone(this.attributes);
		attrs.temperature = this.getTemperature();
		return attrs;
	}
});

var Cities = Backbone.Collection.extend({
	model: City,
	url: function(args){
        //return fakeCitiesRoot;
		return apiRoot + this.pluck('id').join(',') + '&APPID=' + apiKey;
	},
	parse: function(response){
		if (response.list){
			return response.list;
		}

		return response;
	}
});

module.exports = {
	City: City,
	Cities: Cities
};
