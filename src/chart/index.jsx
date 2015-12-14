// Dependencies
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

// App
var Chart = require('../components/chart');
var channel = Backbone.Radio.channel('global');


var View = Marionette.ItemView.extend({
    template: false,
    collectionEvents: {
        'sync': 'renderChart'
    },
    onShow: function(){
        this.collection.fetch({
            jsonp: "callback",
            dataType: "jsonp"
        });
        this.renderChart();
    },
    renderChart: function(){
        var collection = this.collection;
        ReactDOM.render(
            <Chart collection={this.collection} />,
            this.$el.get(0)
        );
    }
});


var ChartController = Marionette.Object.extend({
    initialize: function(){
        var view = new View({
            collection: channel.request('get:cities')
        });
        channel.request('show:view', view);
    }
});

module.exports = ChartController;
