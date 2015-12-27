var Store = require('flux/utils').Store;

// App
var settings = require('../settings');
var Dispatcher = require('../dispatcher/dispatcher');
var Cities = require('../entities/cities').Cities;
var CityConstants = require('../constants/city-constants');

var CityStore = new Store(Dispatcher);
var _cities = new Cities(settings.defaultCities);
var _isFetching = false;

_cities.on('sync', function(){
    Dispatcher.dispatch({
        actionType: CityConstants.SYNC
    });
});

CityStore.all = function(){
    return _cities.toJSON();
};

CityStore.isFetching = function(){
    return _isFetching;
};

CityStore.__onDispatch = function(payload){
    switch (payload.actionType) {
        case CityConstants.FETCH:
            CityStore._fetch();
            break;
        case CityConstants.SYNC:
            CityStore._sync();
            break;
    }
};

CityStore._fetch = function(){
    _isFetching = true;
    this.__emitChange();
    _cities.fetch();
};

CityStore._sync = function(){
    _isFetching = false;
    this.__emitChange();
};

module.exports = CityStore;
