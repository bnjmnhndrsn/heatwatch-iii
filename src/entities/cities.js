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

var defaults = [{
    name: 'New York',
    id: 5128581
},
{
    name: 'Los Angeles',
    id: 5352423
},
{
    name: 'San Francisco',
    id: 5391959
},
{
    name: 'Chicago',
    id: 4904381
},
{
    name: 'Houston',
    id: 4699066
},
{
    name: 'Phoenix',
    id: 5308655
},
{
    name: 'Detroit',
    id:  5007247
},
{
    name: 'Washington, DC',
    id: 4138106
},
{
    name: 'Anchorage',
    id: 5876855
},
{
    name: 'Miami',
    id: 4164138
}];

var cities = new Cities(defaults);

channel.reply('get:city', function(){
	return new City;
});

channel.reply('get:cities', function(){
	return cities;
});
