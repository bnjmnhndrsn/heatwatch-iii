// Dependencies
var React = require('react');

// App
var CityActions = require('../actions/city-actions');
var CityStore = require('../stores/city-store');
var LocationAction = require('../actions/location-actions');
var LocationStore = require('../stores/location-store');
var Chart = require('./chart');
var Input = require('./input');

var Heatwatch = React.createClass({
    getInitialState: function() {
        return {
            items: CityStore.all(),
            location: LocationStore.get()
        };
    },
    componentDidMount: function() {
        CityActions.fetch();
        CityStore.addListener(this._onCitiesChange);
        LocationStore.addListener(this._onLocationChange)
    },
    render: function(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h1>Heatwatch III</h1>
                    </div>
                </div>
                <Input />
                <Chart items={this.state.items} location={this.state.location} />
            </div>
        );
    },
    _onCitiesChange: function(){
        this.setState({items: CityStore.all()});
    },
    _onLocationChange: function(){
        this.setState({location: LocationStore.get()});
    }
});

module.exports = Heatwatch;
