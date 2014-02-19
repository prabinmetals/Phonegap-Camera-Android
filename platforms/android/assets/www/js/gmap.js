document.addEventListener("deviceready", onMapDeviceReady, false);

function onMapDeviceReady() {
	navigator.geolocation.getCurrentPosition(onSuccess, onError, {
		'enableHighAccuracy' : false,
		'timeout' : 20000
	});
}

// GEOLOCATION
function onSuccess(position) {
	// MAP configuration
	var myZoom = 19;
	var myMarkerIsDraggable = true;
	var geocoder;
	var map;
	var myMarker;
	var bounds;

	// Previous position
	var myLat = window.localStorage.getItem("uploadBook_latitude");
	var myLong = window.localStorage.getItem("uploadBook_longitude");
	if (myLat == "null" || myLong == null) {
		// alert("isNull");
		// Current Position
		myLat = position.coords.latitude;
		myLong = position.coords.longitude;
		window.localStorage.setItem("uploadBook_latitude", myLat);
		window.localStorage.setItem("uploadBook_longitude", myLong);
		document.getElementById('latitude').value = myLat;
		document.getElementById('longitude').value = myLong;
	}
	// alert(myLat + " " + myLong);
	// document.getElementById('latitude').value = myLat;
	// document.getElementById('longitude').value = myLong;

	// creates the map
	// zooms
	// centers the map
	// sets the map's type
	map = new google.maps.Map(document.getElementById('map_canvas'), {
		zoom : myZoom,
		center : new google.maps.LatLng(myLat, myLong),
		mapTypeId : google.maps.MapTypeId.ROADMAP
	});

	// creates a draggable marker to the given coords
	myMarker = new google.maps.Marker({
		position : new google.maps.LatLng(myLat, myLong),
		draggable : myMarkerIsDraggable
	});

	// Create the search box and link it to the UI element.
	var input = /** @type {HTMLInputElement} */
	(document.getElementById('pac-input'));
	// map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	var searchBox = new google.maps.places.SearchBox(
	/** @type {HTMLInputElement} */
	(input));

	// When new address is entered in search field, go there.
	google.maps.event.addListener(searchBox, 'places_changed', function() {
		var places = searchBox.getPlaces();
		place = places[0];
		// Update Marker
		myMarker.setPosition(place.geometry.location);
		// Get new bounds
		var bounds = new google.maps.LatLngBounds();
		bounds.extend(place.geometry.location);
		map.fitBounds(bounds);
		map.setZoom(myZoom);

		// Get new position and update variables
		myLat = place.geometry.location.lat();
		myLong = place.geometry.location.lng()
		window.localStorage.setItem("uploadBook_latitude", myLat);
		window.localStorage.setItem("uploadBook_longitude", myLong);
		document.getElementById('latitude').value = myLat;
		document.getElementById('longitude').value = myLong;
	});
	// When bounds are changed, the search box will display results close to the
	// current place.
	google.maps.event.addListener(map, 'bounds_changed', function() {
		var bounds = map.getBounds();
		searchBox.setBounds(bounds);
	});

	// adds a listener to the marker
	// gets the coords when drag event ends
	// then updates the input with the new coords
	// When marker is moved, get new latlong
	google.maps.event.addListener(myMarker, 'dragend', function(evt) {
		myLat = evt.latLng.lat();
		myLong = evt.latLng.lng();
		window.localStorage.setItem("uploadBook_latitude", myLat);
		window.localStorage.setItem("uploadBook_longitude", myLong);
		document.getElementById('latitude').value = myLat;
		document.getElementById('longitude').value = myLong;
	});

	// centers the map on markers coords
	map.setCenter(myMarker.position);

	// adds the marker on the map
	myMarker.setMap(map);
}

// onError Callback receives a PositionError object
function onError(error) {
	alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}
