// Dependencies
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var Radio = require('backbone.radio');

// App
var store = require('./store/store');
var Heatwatch = require('./components/heatwatch');
var settings = require('./settings');

var channel = Radio.channel('global');

$(function(){
	if (settings.DEBUG) {
		channel.request('location:set', {
			lat: 0,
			lon: 0
		});
	} else {
		navigator.geolocation.getCurrentPosition(function(position){
			channel.request('location:set', {
				lat: position.coords.latitude,
				lon: position.coords.longitude
			});
		 });
	}

	
	ReactDOM.render(
		<Heatwatch />,
		document.getElementById('app')
	);
});
