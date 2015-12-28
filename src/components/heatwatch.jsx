// Dependencies
var React = require('react');

// App
var Hero = require('./hero');
var Header = require('./header');

var Heatwatch = React.createClass({
    render: function(){
        return (<Hero />);
    }
});

module.exports = Heatwatch;
