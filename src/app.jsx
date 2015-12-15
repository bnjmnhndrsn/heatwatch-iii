// Dependencies
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');

var store = require('./store/store');
var Heatwatch = require('./components/heatwatch');

$(function(){
	ReactDOM.render(
		<Heatwatch />,
		document.getElementById('app')
	);
});
