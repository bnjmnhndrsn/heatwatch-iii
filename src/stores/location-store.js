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
        case LocationConstants.FETCH_FROM_ZIP:
            LocationStore._fetchFromZip(payload.zip);
            break;
        case LocationConstants.FETCH_FROM_LOCATION:
            LocationStore._fetchFromLocation();
            break;
        case LocationConstants.SYNC:
            LocationStore._sync();
            break;
    }
};

LocationStore._fetchFromZip = function(zip){
    _location.set('zip', zip).fetch();
    _isFetching = true;
    this.__emitChange();
};

LocationStore._fetchFromLocation = function(){
    if (settings.DEBUG) {
        _location.set({
            lat: 0,
            lon: 0
        }).fetch();
    } else {
        navigator.geolocation.getCurrentPosition(function(position){
            _location.set({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            }).fetch();
         });
    }

    _isFetching = true;
    this.__emitChange();
};

LocationStore._sync = function(){
    _isFetching = false;
    this.__emitChange();
};

module.exports = LocationStore;
