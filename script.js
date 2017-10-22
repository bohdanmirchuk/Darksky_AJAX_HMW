var Coords;

function getPosition(){
  navigator.geolocation.getCurrentPosition(function (position) {
    Coords = [position.coords.latitude, position.coords.longitude];
    console.log(Coords);
  };, 
  function (error) {
    console.warn('Something wrong...Error'+error.code+':'+error.message);
  }
}
getPosition();

// (function(){

//   function init(){
//     getLocation();
//   };

//   function getLocation(){
//     var deffered = $.Deferred();
//     if (navigator.getLocation){
//       navigator.getLocation.getCurrentPosition(function(data){
//         console.log(data);
//         deferred.resolve(data);
//       },
//       function(error){
//         console.log(error);
//         deferred.reject (data);
//       });
//     }

//     return deffered.promise();
//   };

//   init();
// })()


// var url1 = "https://randomuser.me/api/?result=2";
// var url2 =  "https://api.darksky.net/forecast/ec7ca3493d508e807cfe8300fac7ba35/37.8267,-122.4233";
// var url3 = "https://www.where-am-i.net/";
// $.ajax({
//     type: 'GET',
//     url: url3,
//     dataType: 'jsonp',
//   }).done(function(response) {
//     console.log(response);
//   })

//   fetch('https://api.darksky.net/forecast/ec7ca3493d508e807cfe8300fac7ba35/37.8267,-122.4233')
//   .then(function(response) {
// return response.json();

//    })
//   .then(function(response){
//     response.results.forEach(function(result){
//       console.log(result.currently.time);
//     })
//     console.log(response.results[0].name.first);
//   })
//   // .catch( alert("shit") );