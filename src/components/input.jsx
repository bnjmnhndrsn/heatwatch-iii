// Dependencies
var React = require('react');
var Backbone = require('backbone');
var Radio = require('backbone.radio');

// App
var channel = Radio.channel('global');
var inputChannel = Radio.channel('input');
var settings = require('../settings');

var InputForm = React.createClass({
    getInitialState: function() {
        return {
            editable: true,
            isLoading: false,
            location: channel.request('location:get')
        };
    },
    componentDidMount: function() {
        channel.on('location:change', this._setLocationState);
    },
    _edit: function(){
        this.setState({
            editable: true
        });
    },  
    _onSearch: function(){
        this.setState({
            isLoading: true
        });
    },
    _setLocationState: function(location) {
        this.setState({
            location: location,
            editable: !!location.isLoading || !location.id,
            isLoading: !!location.isLoading
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
                <ZipCodeInput onSearch={this._onSearch} />
                <LocationButton onSearch={this._onSearch} />
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
        this.props.onSearch();
        channel.request('location:set', {
            zip: zip
        });
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
        this.props.onSearch();
        if (settings.DEBUG) {
        	channel.request('location:set', {
        		lat: 0,
        		lon: 0
        	});
        } else {
        	navigator.geolocation.getCurrentPosition(function(position){
        		channel.request('location:set', {
        			lat: position.coords.latitude,
        			lon: position.coords.longitude
        		});
        	 });
        }
    },
    render: function(){
        return (<button type="button" onClick={this._handleClick}>Find my location</button>);
    }
});

module.exports = InputForm;
