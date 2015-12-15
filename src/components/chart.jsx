// Dependencies
var React = require('react');
var Backbone = require('backbone');

var ChartItem = React.createClass({
    render: function(){
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.temperature}</td>
            </tr>
        )
    }
});

var Chart = React.createClass({
    render: function() {
        var items = this.props.items.map(function(item, i) {
            return (
                <ChartItem {...item} key={i} />
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
