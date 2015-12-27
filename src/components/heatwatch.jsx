// Dependencies
var React = require('react');
var Backbone = require('backbone');
var Radio = require('backbone.radio');

// App
var channel = Radio.channel('global');
var CityActions = require('../actions/city-actions');
var CityStore = require('../stores/city-store');
var Chart = require('./chart');
var Input = require('./input');

var Heatwatch = React.createClass({
    getInitialState: function() {
        return {
            items: CityStore.all(),
            location: channel.request('location:get')
        };
    },
    componentDidMount: function() {
        CityActions.fetch();
        CityStore.addListener(this._onItemsChange);
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
        this.setState({items: CityStore.all()});
    },
    _onLocationChange: function(location){
        this.setState({location: location});
    }
});

module.exports = Heatwatch;
