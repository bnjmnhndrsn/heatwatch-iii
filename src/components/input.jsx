// Dependencies
var React = require('react');

// App
var settings = require('../settings');
var LocationActions = require('../actions/location-actions');
var LocationStore = require('../stores/location-store');

var InputForm = React.createClass({
    getInitialState: function() {
        return {
            editable: true,
            isLoading: LocationStore.isFetching(),
            location: LocationStore.get()
        };
    },
    componentDidMount: function() {
        LocationStore.addListener(this._setLocationState);
    },
    _edit: function(){
        this.setState({
            editable: true
        });
    },  
    _setLocationState: function () {
        var location = LocationStore.get();
        var isLoading = LocationStore.isFetching();
        
        this.setState({
            location: location,
            editable: !!isLoading || !location.id,
            isLoading: !!isLoading
        });
    },
    render: function(){
        if (this.state.isLoading) {
            return (<div>Loading...</div>);
        } else if (!this.state.editable) {
            return (<div>
                Location Set!
                <button type="button" onClick={this._edit}>Edit</button>
            </div>);
        }
        return (
            <div>
                <ZipCodeInput />
                <LocationButton />
            </div>
        );
    },
    
});

var ZipCodeInput = React.createClass({
    getInitialState: function() {
        return {zip: ''};
    },
    _handleSubmit: function(e){
        e.preventDefault();
        var zip = this.state.zip.trim();
        LocationActions.fetchFromZip(zip);
    },
    _onChange: function(e){
        this.setState({zip: e.target.value});
    },
    render: function(){
        return (
            <form onSubmit={this._handleSubmit}>
                <input 
                    type="text" 
                    name="zip" 
                    placeholder="Enter your zipcode"
                    value={this.state.zip} 
                    onChange={this._onChange} 
                />
                <button type="sumbit">Submit</button>
            </form>
        )
    }
});

var LocationButton = React.createClass({
    _handleClick: function(e){
        e.preventDefault();
        LocationActions.fetchFromLocation();
    },
    render: function(){
        return (<button type="button" onClick={this._handleClick}>Find my location</button>);
    }
});

module.exports = InputForm;
