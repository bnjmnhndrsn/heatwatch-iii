// Dependencies
var React = require('react');

// App
var Chart = require('./chart');
var Input = require('./input');

var Header = React.createClass({
    render: function(){
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">                    
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Heatwatch III</a>
                    </div>
                    <div className="navbar-form navbar-right" role="search">
                        <Input />
                    </div>
                </div>
            </nav>
        );
    }
});

module.exports = Header;
