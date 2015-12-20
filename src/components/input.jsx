// Dependencies
var React = require('react');
var Backbone = require('backbone');

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
    _onSubmit: function(){

    },
    render: function(){
        return (
            <form onSubmit={this._onSubmit}>
                <input type="text" placeholder="Enter your zipcode" />
                <button type="sumbit">Submit</button>
            </form>
        )
    }
});

var LocationButton = React.createClass({
    _onClick: function(){
        
    },
    render: function(){
        return (<button type="button" onClick={this._onClick}>Find my location</button>);
    }
})

module.exports = InputForm;
