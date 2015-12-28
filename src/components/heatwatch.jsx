// Dependencies
var React = require('react');

// App
var Hero = require('./hero');
var Header = require('./header');
var Chart = require('./chart');
var LocationAction = require('../actions/location-actions');
var LocationStore = require('../stores/location-store');
var CityActions = require('../actions/city-actions');
var CityStore = require('../stores/city-store');


var Heatwatch = React.createClass({
    getInitialState: function(){
        return {
            location: LocationStore.get(),
            cities: CityStore.all()
        };
    },
    componentDidMount: function(){
        CityActions.fetch();
        LocationStore.addListener(this._onLocationChange);
        CityStore.addListener(this._onCitiesChange);
    },
    _onLocationChange: function(){
        this.setState({
            location: LocationStore.get()
        });
    },
    _onCitiesChange: function(){
        this.setState({
            cities: CityStore.all()
        });
    },
    render: function(){
        if (!!this.state.location.id) {
            return (
                <div>
                    <Header />
                    <div className="container">
                        <Chart location={this.state.location} items={this.state.cities} />
                    </div>
                </div>
            );
        } else {
            return <Hero />;
        }
        
    }
});

module.exports = Heatwatch;
