var Dispatcher = require('../dispatcher/dispatcher');
var LocationConstants = require('../constants/location-constants')

var LocationActions = {
    fetch: function(data){
        Dispatcher.dispatch({
            actionType: LocationConstants.FETCH,
            data: data
        });
    }
};

module.exports = LocationActions;
