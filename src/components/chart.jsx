// Dependencies
var React = require('react');
var Backbone = require('backbone');

// App
var channel = Backbone.Radio.channel('global');


var ChartItem = React.createClass({
    render: function(){
        return (
            <tr>
                <td>{this.props.model.get('name')}</td>
                <td>{this.props.model.getTemperature()}</td>
            </tr>
        )
    }
});

var Chart = React.createClass({
    render: function() {
        var items = this.props.collection.map(function(model, i) {
            return (
                <ChartItem model={model} key={i} />
            )
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Current Temperature</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        );
    }
});

module.exports = Chart;
