// Dependencies
var React = require('react');
var Backbone = require('backbone');

var PendingItem = React.createClass({
    render: function(){
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.temperature ? this.props.temperature : 'N/A'}</td>
            </tr>
        )
    }
});

var LoadedItem = React.createClass({
    render: function(){
        var difference = this.props.temperature - this.props.location.temperature;
        
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.temperature}</td>
                <td>{difference}</td>
            </tr>
        )
    }
})

var Chart = React.createClass({
    render: function() {
        var location = this.props.location;
        
        var items = this.props.items.map(function(item, i) {
            if (item.temperature && !!location.temperature) {
                return (<LoadedItem  {...item} location={location} key={i} />);
            } else {
                return (<PendingItem {...item} key={i} />)
            }
        });
        
        var differenceHeader = !!location.temperature ? (<th>Difference</th>) : undefined;

        return (
            <table>
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Current Temperature</th>
                        {differenceHeader}
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
