var View = require('./view');

var channel = Backbone.Radio.channel('global');

var Chart = Marionette.Object.extend({
	initialize: function(){
		var collection = channel.request('get:cities', 10);
		
		collection.fetch({
			success: function(){
				var view = new View({collection: collection});	
				channel.command('show:view', view);
			},
			error: function(){
				console.log(arguments);
			}
		});

	}
});

module.exports = Chart;
