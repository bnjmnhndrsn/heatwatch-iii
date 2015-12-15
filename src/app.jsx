// Dependencies
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var Radio = require('backbone.radio');
var channel = Radio.channel('global');
var store = require('./store/store');
var Heatwatch = require('./components/heatwatch');

$(function(){
	navigator.geolocation.getCurrentPosition(function(position){
		channel.request('location:set', {
	        lat: position.coords.latitude,
	        lon: position.coords.longitude
	    });
	 });
	
	ReactDOM.render(
		<Heatwatch />,
		document.getElementById('app')
	);
});
