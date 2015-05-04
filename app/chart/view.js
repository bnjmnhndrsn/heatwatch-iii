var ItemView = Marionette.ItemView.extend({
	template: '#item-view',
	templateHelpers: {
		getTemperature: function(){
			return this.temperature || 'asdf';
		}
	}
});

var View = Marionette.CompositeView.extend({
	childView: ItemView,
	template: '#composite-view',
	childViewContainer: 'tbody'
});


module.exports = View;