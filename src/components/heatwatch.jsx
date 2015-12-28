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
            <div className="container-fluid hero-container">
                <div className="jumbotron main-hero">
                    <h1>Heatwatch III</h1>
                    <p>Unseasonably warm? Unbearably cold? See who else in the country is getting off easy and who is suffering worse than you.</p>
                    <Input />
                </div>
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
