var Dispatcher = require('../dispatcher/dispatcher');
var CityConstants = require('../constants/city-constants')

var CityActions = {
    fetch: function(){
        Dispatcher.dispatch({
            actionType: CityConstants.FETCH
        });
    }
};

module.exports = CityActions;
