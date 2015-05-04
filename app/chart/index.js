var View = require('./view');

var channel = Backbone.Radio.channel('global');

var Chart = Marionette.Object.extend({
	initialize: function(){
		var collection = channel.request('get:cities');
		var view = new View({collection: collection});	
		channel.command('show:view', view);
	}
});

module.exports = Chart;
