document.addEventListener("deviceready", onMapDeviceReady, false);

function onMapDeviceReady() {
	navigator.geolocation.getCurrentPosition(onSuccess, onError, {
		'enableHighAccuracy' : false,
		'timeout' : 20000
	});
}

// GEOLOCATION
var onSuccess = function(position) {
	// MAP configuration
	var myZoom = 19;
	var myMarkerIsDraggable = true;
	var myCoordsLenght = 6;

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
	}
	// alert(myLat + " " + myLong);
	// document.getElementById('latitude').value = myLat;
	// document.getElementById('longitude').value = myLong;

	// creates the map
	// zooms
	// centers the map
	// sets the map's type
	var map = new google.maps.Map(document.getElementById('map_canvas'), {
		zoom : myZoom,
		center : new google.maps.LatLng(myLat, myLong),
		mapTypeId : google.maps.MapTypeId.ROADMAP
	});

	// creates a draggable marker to the given coords
	var myMarker = new google.maps.Marker({
		position : new google.maps.LatLng(myLat, myLong),
		draggable : myMarkerIsDraggable
	});

	// adds a listener to the marker
	// gets the coords when drag event ends
	// then updates the input with the new coords
	google.maps.event.addListener(myMarker, 'dragend', function(evt) {
		// document.getElementById('latitude').value = evt.latLng.lat();
		// document.getElementById('longitude').value = evt.latLng.lng();
		myLat = evt.latLng.lat();
		myLong = evt.latLng.lng();
		// document.getElementById('latitude').value = myLat;
		// document.getElementById('longitude').value = myLong;
		window.localStorage.setItem("uploadBook_latitude", myLat);
		window.localStorage.setItem("uploadBook_longitude", myLong);
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