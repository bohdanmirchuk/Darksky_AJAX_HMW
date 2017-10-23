var latitude;
var longitude;
var locality;
var date = moment().format('X');
console.log(moment.unix(date).format('dddd Do HH:mm'));

var getCurrentPosition = function() {
  var deferred = $.Deferred();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(deferred.resolve, deferred.reject);
  } else {
    deferred.reject({
      error: 'Browser doesn\'t support geolocation'
    });
  }

  return deferred.promise();
};

var userPositionPromise = getCurrentPosition();

userPositionPromise
  .then(function(data) {
   latitude = data.coords.latitude;
   longitude = data.coords.longitude;
   console.log('latitude', latitude, 'longitude', longitude);
  getLocality();
  getWeather();
  })
  .fail(function(error) {
    console.warn('Something wrong...Error'+error.code+':'+error.message);
  });


function geoFindMe() {  
    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=10&size=100x100&key=AIzaSyDGrTQNh1fmVkol36vbLQQppvqRwAExpDE";
    $('#map').append(img);
}

function getWeather(){
var url = 'https://api.darksky.net/forecast/ec7ca3493d508e807cfe8300fac7ba35/'+latitude+','+longitude;
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'jsonp',
  }).done(function(response) {
    console.log(response.currently.icon);
    var icon = response.currently.icon;
    $('#locality').text(locality);
    $('#date').text(moment.unix(date).format("dddd Do"));
    geoFindMe();
    skyconsIcon(icon);
    $('#summary').text(response.currently.summary);
    var temp = response.currently.temperature;
    var feeltemp = response.currently.apparentTemperature;
    $('#temperature').text(Math.floor((temp-32)*5/9)+'°C');
    $('#feelslike').text('Feels like '+Math.floor((feeltemp-32)*5/9)+'°C');
    $('#keepcalm').css('opacity', 0);
    $('.weather').css('opacity', 1);
  })
}

function getLocality(){
var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude;
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
  }).done(function(response) {
    $.each(response.results[0].address_components, function(){
      if(this.types[0] == 'locality'){
        locality = this.long_name;
      }
    });
    console.log(locality);
  })
}

function skyconsIcon(icon){
 var skycons = new Skycons({"color": "white"}); 
 skycons.add("icon", icon);
 skycons.play();
}