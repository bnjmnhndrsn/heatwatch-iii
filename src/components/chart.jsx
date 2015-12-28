// Dependencies
var React = require('react');
var _ = require('underscore');

var PendingItem = React.createClass({
    render: function(){
        var temperature;
        if (_.isNumber(this.props.temperature)){
            temperature = Math.round(this.props.temperature);
        } else {
            temperature = 'N/A';
        }
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{temperature}</td>
            </tr>
        )
    }
});

var LoadedItem = React.createClass({
    _getClassName: function(difference){
        if (difference <= -30) {
            return 'temperature-colder-3';
        } else if (difference <= -15) {
            return 'temperature-colder-2';
        } else if (difference <= -2) {
            return 'temperature-colder-1'
        } else if (difference <= 2) {
            return 'temperature-same'
        } else if (difference <= 15) {
            return 'temperature-warmer-1'
        } else if (difference <= 30) {
            return 'temperature-warmer-2'
        } else {
            return 'temperature-warmer-3'
        }
    },
    render: function(){
        var difference = this.props.temperature - this.props.location.temperature;
        var className = this._getClassName(difference);
        
        return (
            <tr className={className}>
                <td>{this.props.name}</td>
                <td>{Math.round(this.props.temperature)}</td>
                <td>{Math.round(difference)}</td>
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
            <div className="chart col-md-12">
                <table className="table">
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
            </div>
        );
    }
});

module.exports = Chart;
