//var directionsDisplay;
var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();

function initialize() {
  
  var mapOptions = {
    zoom: 7,
    center: new google.maps.LatLng(41.850033, -87.6500523)
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directions-panel'));

  // var control = document.getElementById('control');
  // control.style.display = 'block';
  // map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

    // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(input);
  // var places = searchBox.getPlaces();


  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    // for (var i = 0, marker; marker = markers[i]; i++) {
    //   marker.setMap(null);
    });




  //   // Bias the SearchBox results towards places that are within the bounds of the
  // // current map's viewport.
  // google.maps.event.addListener(map, 'bounds_changed', function() {
  //   var bounds = map.getBounds();
  //   searchBox.setBounds(bounds);
  // });



}

function calcRoute() {
  // var start = document.getElementById('start').value;
  // var end = document.getElementById('end').value;
  var start = 'saratoga springs, ny';
  var end = 'clifton park, ny';
  //var end = '2189 Cook Road, Galway, NY 12074, USA';
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

//calcRoute();