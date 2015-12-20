// Dependencies
var React = require('react');
var Backbone = require('backbone');
var Radio = require('backbone.radio');

// App
var channel = Radio.channel('global');
var inputChannel = Radio.channel('input');
var settings = require('../settings');

var InputForm = React.createClass({
    render: function(){
        return (
            <div>
                <ZipCodeInput />
                <LocationButton />
            </div>
        );
    }
});

var ZipCodeInput = React.createClass({
    getInitialState: function() {
        return {zip: ''};
    },
    _onSubmit: function(e){
        e.preventDefault();
        var zip = this.state.zip.trim();
        channel.request('location:set', {
            zip: zip
        });
    },
    _onChange: function(e){
        this.setState({zip: e.target.value});
    },
    render: function(){
        return (
            <form onSubmit={this._onSubmit}>
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
    _onClick: function(e){
        e.preventDefault();
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
        return (<button type="button" onClick={this._onClick}>Find my location</button>);
    }
});

module.exports = InputForm;
