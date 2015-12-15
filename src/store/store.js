var Backbone = require('backbone');
var Radio = require('backbone.radio');
var channel = Radio.channel('global');

var City = require('../entities/cities').City;
var Cities = require('../entities/cities').Cities;

var defaults = [{
    name: 'New York',
    id: 5128581
},
{
    name: 'Los Angeles',
    id: 5368361
},
{
    name: 'San Francisco',
    id: 5391959
},
{
    name: 'Chicago',
    id: 4887398
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
    name: 'Saint Louis',
    id:  4407066
},
{
    name: 'Washington, DC',
    id: 4140963
},
{
    name: 'Anchorage',
    id: 5879400
},
{
    name: 'Miami',
    id: 4164138
}];

var cities = new Cities(defaults);

cities.on('sync', function(){
    channel.trigger('items:change', cities.toJSON(location));
});

channel.reply('items:sync', function(){
    cities.fetch({
        jsonp: "callback",
        dataType: "jsonp"
    });
});

channel.reply('items:get', function(){
	return cities.toJSON(location);
});

var location = new City();

location.on('change', function(){
    location.fetch({
        jsonp: "callback",
        dataType: "jsonp"
    }).done(function(){
        channel.trigger('items:change', cities.toJSON(location));
    });
});

channel.reply('location:set', function(position){
    location.set(position);
});
