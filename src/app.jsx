// Dependencies
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var Radio = require('backbone.radio');

// App
var appStore = require('./stores/app');
var Heatwatch = require('./components/heatwatch');
var settings = require('./settings');

var channel = Radio.channel('global');

$(function(){
	ReactDOM.render(
		<Heatwatch />,
		document.getElementById('app')
	);
});
