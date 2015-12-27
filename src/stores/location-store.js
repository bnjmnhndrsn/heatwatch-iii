// Dependencies
var Store = require('flux/utils').Store;

// App
var settings = require('../settings');
var City = require('../entities/cities').City;
var Dispatcher = require('../dispatcher/dispatcher');
var LocationConstants = require('../constants/location-constants');

var _location = new City();
var _isFetching = false;

var LocationStore = new Store(Dispatcher);


_location.on('sync', function(){
    Dispatcher.dispatch({
        actionType: LocationConstants.SYNC
    });
});

LocationStore.get = function(){
    return _location.toJSON();
};

LocationStore.isFetching = function(){
    return _isFetching;
};

LocationStore.__onDispatch = function(payload){
    switch (payload.actionType) {
        case LocationConstants.FETCH:
            LocationStore._fetch(payload.data);
            break;
        case LocationConstants.SYNC:
            LocationStore._sync();
            break;
    }
};

LocationStore._fetch = function(data){
    _location.set(data).fetch();
    _isFetching = true;
    this.__emitChange();
};

LocationStore._sync = function(){
    _isFetching = false;
    this.__emitChange();
};

module.exports = LocationStore;
