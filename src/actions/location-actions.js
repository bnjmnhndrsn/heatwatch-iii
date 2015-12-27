var Dispatcher = require('../dispatcher/dispatcher');
var LocationConstants = require('../constants/location-constants')

var LocationActions = {
    fetch: function(){
        Dispatcher.dispatch({
            actionType: LocationConstants.FETCH
        });
    }
};

module.exports = LocationActions;
