// Dependencies
var React = require('react');
var Backbone = require('backbone');
var Radio = require('backbone.radio');

// App
var channel = Radio.channel('global');
var LocationActions = require('../actions/location-actions');
var LocationStore = require('../stores/location');
var Chart = require('./chart');
var Input = require('./input');

var Heatwatch = React.createClass({
    getInitialState: function() {
        return {
            items: LocationStore.all(),
            location: channel.request('location:get')
        };
    },
    componentDidMount: function() {
        LocationActions.fetch();
        LocationStore.addListener(this._onItemsChange);
        channel.on('location:change', this._onLocationChange);
    },
    render: function(){
        return (
            <div>
                <Input />
                <Chart items={this.state.items} location={this.state.location} />
            </div>
        );
    },
    _onItemsChange: function(){
        this.setState({items: LocationStore.all()});
    },
    _onLocationChange: function(location){
        this.setState({location: location});
    }
});

module.exports = Heatwatch;
