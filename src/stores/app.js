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

var location = new City();

location.on('sync', function(){
    channel.trigger('location:change', _.extend(
        location.toJSON(),
        {isLoading: false}
    ));
});

channel.reply('location:get', function(){
    return location.toJSON();
});

channel.reply('location:set', function(position){
    location.set(position).fetch();
    channel.trigger('location:change', _.extend(
        location.toJSON(),
        {isLoading: true}
    ));
});
