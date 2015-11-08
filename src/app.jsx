var channel = Backbone.Radio.channel('global');

//entities
require('./entities/cities');
require('./entities/user');

//apps
var Chart = require('./chart');

var app = new Marionette.Application();

app.on('start', function(){
	Backbone.history.start();

	var rm = new Marionette.RegionManager({
		regions: { "app": "#app" }
	});

	channel.comply('show:view', function(view){
		rm.get('app').show(view);
	});

	var chart = new Chart();
});

$(function(){
	app.start();
});
