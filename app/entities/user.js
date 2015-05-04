var channel = Backbone.Radio.channel('global');

var apiRoot = "http://api.openweathermap.org/data/2.5/group?units=imperial";
 
 
channel.reply('get:cities', function(n){
	if (n) {
		return new Cities(cities.take(n));
	}
	return cities;
});
