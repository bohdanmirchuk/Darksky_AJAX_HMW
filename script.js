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
var url1 = "https://randomuser.me/api/?result=2";
var url2 =  "https://api.darksky.net/forecast/ec7ca3493d508e807cfe8300fac7ba35/37.8267,-122.4233";

// $.ajax({
//     type: 'GET',
//     url: url2,
//     dataType: 'jsonp',
//   }).done(function(response) {
//     console.log(response);
//   })
fetch(url1,  {mode: 'no-cors',
             method: 'GET',
             headers: 'Access-Control-Allow-Origin: *'})
  .then(function(response) {
return response.json();
   })
  .then(function(response){
    response.results.forEach(function(result){
      console.log(response.headers);
      console.log(result.currently.time);
    })
    console.log(response.results[0].name.first);
    console.log(response);
  })
  // .catch( alert("shit") );

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