var Dispatcher = require('../dispatcher/dispatcher');
var LocationConstants = require('../constants/location-constants')

var LocationActions = {
    fetchFromZip: function(zip){
        Dispatcher.dispatch({
            actionType: LocationConstants.FETCH_FROM_ZIP,
            zip: zip
        });
    },
    fetchFromLocation: function(){
        Dispatcher.dispatch({
            actionType: LocationConstants.FETCH_FROM_LOCATION
        });
    }
};

module.exports = LocationActions;
