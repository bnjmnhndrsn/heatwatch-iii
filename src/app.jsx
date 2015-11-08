// Dependencies
var $ = require('jquery');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette')
require('backbone.radio');

//App
require('./entities/cities');
require('./entities/user');
var channel = Backbone.Radio.channel('global');
var Chart = require('./chart');

var app = new Marionette.Application();

app.on('start', function(){
	Backbone.history.start();

	var rm = new Marionette.RegionManager({
		regions: { "app": "#app" }
	});

	channel.reply('show:view', function(view){
		rm.get('app').show(view);
	});

	var chart = new Chart();
});

$(function(){
	app.start();
});
