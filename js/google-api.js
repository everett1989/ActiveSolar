



// google.maps.event.addDomListener(window, 'load', initialize);

// //calcRoute();
var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();


function initialize() {

  var endLocation = new google.maps.LatLng(42.9763400,-73.9925190);


  var mapOptions = {
    center: endLocation,
    zoom: 11
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  map.panBy(0, -100);


  var solarMarker = new google.maps.Marker({
    position: endLocation,
    map: map,
    title: 'Active Solar'
  });

  var solarAddress = "<div><strong>Active Solar</strong><br><br>2189 Cook Road,<br> Galway, NY 12074, USA</div>"
  var solarInfowindow = new google.maps.InfoWindow({
    content: solarAddress
  });

  solarInfowindow.open(map,solarMarker);

   

  


  // google.maps.event.addListener(marker, 'click', function() {
  //   infowindow.open(map,marker);
  // });
 google.maps.event.addListener(solarMarker, 'click', function() {
    solarInfowindow.open(map,solarMarker);
  });


  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directions-panel'));

  var autoCompleteOptions = {
    bounds: endLocation
  };

  var input = (document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input, autoCompleteOptions);


  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    
    if (!place.geometry) {
      return;
    }
    //alert(place.formatted_address);
    // calcRoute(place.geometry.location);
     calcRoute(place.formatted_address);
     solarInfowindow.close();
     solarMarker.setMap(null);

  });

}

google.maps.event.addDomListener(window, 'load', initialize);

function calcRoute(customerBegin) {

  
  // var start = document.getElementById('start').value;
  // var end = document.getElementById('end').value;
  var start = customerBegin; //'saratoga springs, ny';
  // var end = "42.9763400,-73.9925190";
  var end = '2189 Cook Road, Galway, NY 12074, USA';
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
