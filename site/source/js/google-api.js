



// google.maps.event.addDomListener(window, 'load', initialize);

// //calcRoute();
var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();


function initialize() {

  var endLocation = new google.maps.LatLng(42.9763400,-73.9925190);


  var mapOptions = {
    center: endLocation,
    zoom: 14
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);


  var marker = new google.maps.Marker({
    position: endLocation,
    map: map,
    title: 'Active Solar'
  });
  // var infowindow = new google.maps.InfoWindow({
  //   content: 'Testing'
  // });

  // google.maps.event.addListener(marker, 'click', function() {
  //   infowindow.open(map,marker);
  // });


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

    // If the place has a geometry, then present it on a map.
    // if (place.geometry.viewport) {
    //   map.fitBounds(place.geometry.viewport);
    // } else {
    //   map.setCenter(place.geometry.location);
    //   map.setZoom(17);  // Why 17? Because it looks good.
    // }



    // marker.setIcon(/** @type {google.maps.Icon} */({
    //   url: place.icon,
    //   size: new google.maps.Size(71, 71),
    //   origin: new google.maps.Point(0, 0),
    //   anchor: new google.maps.Point(17, 34),
    //   scaledSize: new google.maps.Size(35, 35)
    // }));
    // marker.setPosition(place.geometry.location);
    // marker.setVisible(true);

    // var address = '';
    // if (place.address_components) {
    //   address = [
    //     (place.address_components[0] && place.address_components[0].short_name || ''),
    //     (place.address_components[1] && place.address_components[1].short_name || ''),
    //     (place.address_components[2] && place.address_components[2].short_name || '')
    //   ].join(' ');
    // }

    // infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    // infowindow.open(map, marker);
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
