// Dependencies
var React = require('react');
var Backbone = require('backbone');
var Radio = require('backbone.radio');

// App
var channel = Radio.channel('global');
var Chart = require('./chart');

var Heatwatch = React.createClass({
    getInitialState: function() {
        return {
            items: channel.request('items:get'),
            location: channel.request('location:get')
        };
    },
    componentDidMount: function() {
        channel.request('items:sync');
        channel.on('items:change', this._onItemsChange);
        channel.on('location:change', this._onLocationChange);
    },
    render: function(){
        return (
            <Chart items={this.state.items} location={this.state.location} />
        )
    },
    _onItemsChange: function(items){
        this.setState({items: items});
    },
    _onLocationChange: function(location){
        this.setState({location: location});
    }
});

module.exports = Heatwatch;
