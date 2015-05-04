var ItemView = Marionette.ItemView.extend({
	tagName: 'tr',
	template: '#item-view',
	templateHelpers: {
		getTemperature: function(){
			return this.main.temp || 'N/A';
		}
	}
});

var View = Marionette.CompositeView.extend({
	childView: ItemView,
	template: '#composite-view',
	childViewContainer: 'tbody'
});


module.exports = View;