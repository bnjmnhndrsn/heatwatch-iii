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
    onShow: function(){
        var collection = this.collection;
        ReactDOM.render(
            <Chart />,
            this.$el.get(0)
        );
    }
});


var ChartController = Marionette.Object.extend({
    initialize: function(){
        var view = new View();
        channel.request('show:view', view);
    }
});

module.exports = ChartController;
