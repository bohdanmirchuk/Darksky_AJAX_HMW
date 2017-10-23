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
  getTimezone();
  getLocality()
  })
  .fail(function(error) {
    console.warn('Something wrong...Error'+error.code+':'+error.message);
  });


function geoFindMe() {
  var output = document.getElementById("out");
  
   if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }
   output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
   output.insertAdjacentHTML('beforeEnd', '<p id="locality">'+locality+'</p>');
     output.insertAdjacentHTML('beforeEnd', '<p id="date">'+moment.unix(date).format('dddd Do')+'<br>'+moment.unix(date).format('HH:mm')+'</p>');

  
    var img = new Image();
    img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    output.appendChild(img);
}

function getTimezone(){
var url = 'https://api.darksky.net/forecast/ec7ca3493d508e807cfe8300fac7ba35/'+latitude+','+longitude;
console.log(url);
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'jsonp',
  }).done(function(response) {
    console.log(response.timezone);
  })
}

function getLocality(){
var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude;
console.log(url);
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
    skyconsIcon()
  })
}

function skyconsIcon(){
 var skycons = new Skycons({"color": "red"}); 
 skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
 skycons.play();
 console.log(skycons);
}