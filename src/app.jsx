// Dependencies
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');

// App
var Heatwatch = require('./components/heatwatch');
var settings = require('./settings');

$(function(){
	ReactDOM.render(
		<Heatwatch />,
		document.getElementById('app')
	);
});
