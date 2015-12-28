// Dependencies
var React = require('react');

// App
var Input = require('./input');

var Hero = React.createClass({
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
    }
});

module.exports = Hero;
