var Store  = require('flux/utils').Store;

// App
var settings = require('../settings');
var Dispatcher = require('../dispatcher/dispatcher');
var Cities = require('../entities/cities').Cities;
var LocationConstants = require('../constants/location-constants');

var LocationStore = new Store(Dispatcher);
var cities = new Cities(settings.defaultCities);
var isFetching = false;

cities.on('sync', function(){
    Dispatcher.dispatch({
        actionType: LocationConstants.SYNC
    });
});

LocationStore.all = function(){
    return cities.toJSON();
};

LocationStore.isFetching = function(){
    return isFetching;
};

LocationStore.__onDispatch = function(payload){
    switch (payload.actionType) {
        case LocationConstants.FETCH:
            LocationStore._fetch();
            break;
        case LocationConstants.SYNC:
            LocationStore._sync();
            break;
    }
};

LocationStore._fetch = function(){
    isFetching = true;
    this.__emitChange();
    cities.fetch();
};

LocationStore._sync = function(){
    isFetching = false;
    this.__emitChange();
};

module.exports = LocationStore;
