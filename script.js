var latitude;
var longitude;

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
  
    var img = new Image();
    img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    output.appendChild(img);
}

function getTimezone(){
var url2 = 'https://api.darksky.net/forecast/ec7ca3493d508e807cfe8300fac7ba35/'+latitude+','+longitude;
console.log(url2);
  $.ajax({
    type: 'GET',
    url: url2,
    dataType: 'jsonp',
  }).done(function(response) {
    console.log(response.timezone);
  })
}

