// Dependencies
var React = require('react');

// App
var settings = require('../settings');
var LocationActions = require('../actions/location-actions');
var LocationStore = require('../stores/location-store');

var InputBlock = React.createClass({
    getInitialState: function() {
        return {
            editable: true,
            isLoading: LocationStore.isFetching(),
            location: LocationStore.get()
        };
    },
    componentDidMount: function() {
        LocationStore.addListener(this._setLocationState);
    },
    _edit: function(){
        this.setState({
            editable: true
        });
    },  
    _setLocationState: function () {
        var location = LocationStore.get();
        var isLoading = LocationStore.isFetching();
        
        this.setState({
            location: location,
            editable: !!isLoading || !location.id,
            isLoading: !!isLoading
        });
    },
    render: function(){
        var inner;
        
        if (this.state.isLoading) {
            inner = <LoadingIndicator />;
        } else if (!this.state.editable) {
            inner = <LoadedLocation location={this.state.location} startEditing={this._edit} />
        } else {
            inner = <InputForm />
        }

        return <div className="row input-section">{inner}</div>;
    }
});

var LoadedLocation = React.createClass({
    render: function(){
        return (
            <div className="form col-md-6 col-md-offset-3 location-chosen">
                <span>
                    Your Location: <strong>{this.props.location.name}</strong>
                </span>
                <button type="button" className="btn-link btn location-chosen-button" onClick={this.props.startEditing}>
                    <span className="glyphicon glyphicon-pencil"></span>    
                </button>
            </div>
        );
    }
});

var LoadingIndicator = React.createClass({
    render: function(){
        return <div className="col-md-12">Loading...</div>;
    }
});

var InputForm = React.createClass({
    getInitialState: function() {
        return {zip: ''};
    },
    _handleSubmit: function(e){
        e.preventDefault();
        var zip = this.state.zip.trim();
        LocationActions.fetchFromZip(zip);
    },
    _onChange: function(e){
        this.setState({zip: e.target.value});
    },
    _handleClick: function(e){
        e.preventDefault();
        LocationActions.fetchFromLocation();
    },
    render: function(){
        return (
            <form className="form col-md-6 col-md-offset-3" role="search" onSubmit={this._handleSubmit}>
                <div className="input-group">
                    <input 
                        className="form-control search-input"
                        type="text" 
                        name="zip" 
                        placeholder="Enter your zipcode"
                        value={this.state.zip} 
                        onChange={this._onChange} 
                    />
                    <div className="input-group-btn">
                        <button className="btn btn-link geolocate-button" type="button" onClick={this._handleClick}>
                            <span className="glyphicon glyphicon-screenshot"></span>
                        </button>
                        <button className="btn btn-primary" type="submit">Search</button>
                    </div>
                </div>
             </form>
        );
    }
});

module.exports = InputBlock;
