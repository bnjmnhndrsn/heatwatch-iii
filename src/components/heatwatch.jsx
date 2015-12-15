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
            items: channel.request('items:get')
        }
    },
    componentDidMount: function() {
        channel.request('items:sync');
        channel.on('items:change', this._onChange)
    },
    render: function(){
        return (
            <Chart items={this.state.items} />
        )
    },
    _onChange: function(items){
        this.setState({items: items});
    }
});

module.exports = Heatwatch;
