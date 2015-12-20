// Dependencies
var _ = require('underscore');
var Backbone = require('backbone');
var Radio = require('backbone.radio');
var channel = Radio.channel('global');

// App
var settings = require('../settings');
var City = require('../entities/cities').City;
var Cities = require('../entities/cities').Cities;

var cities = new Cities(settings.defaultCities);

cities.on('sync', function(){
    channel.trigger('items:change', cities.toJSON(location));
});

channel.reply('items:sync', function(){
    cities.fetch();
});

channel.reply('items:get', function(){
    return cities.toJSON();
});

var location = new City();

location.on('sync', function(){
    channel.trigger('location:change', location.toJSON());
});

channel.reply('location:get', function(){
    return location.toJSON();
});

channel.reply('location:set', function(position){
    location.set(position).fetch();
});
