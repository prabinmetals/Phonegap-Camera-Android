var currentLat = window.localStorage.getItem("uploadBook_latitude");
var currentLng = window.localStorage.getItem("uploadBook_longitude");
var myZoom = 19;
var myMarkerIsDraggable = true;
var map;
var myMarker;
var geocoder;

function initMap() {
	var latlng = new google.maps.LatLng(currentLat, currentLng);
	var mapOptions = {
		zoom : myZoom,
		center : latlng,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
	geocoder = new google.maps.Geocoder();

	// creates a draggable marker to the given coords
	myMarker = new google.maps.Marker({
		position : latlng,
		draggable : myMarkerIsDraggable
	});

	// adds a listener to the marker
	// gets the coords when drag event ends
	// then updates the input with the new coords
	// When marker is moved, get new latlong
	google.maps.event.addListener(myMarker, 'dragend', function(evt) {
		currentLat = evt.latLng.lat();
		currentLng = evt.latLng.lng();
		window.localStorage.setItem("uploadBook_latitude", currentLat);
		window.localStorage.setItem("uploadBook_longitude", currentLng);
		$("#uploadBook_latitude").val(currentLat);
		$("#uploadBook_longitude").val(currentLng);
		reverseGeoCode();
	});

	// centers the map on markers coords
	map.setCenter(myMarker.position);
	// adds the marker on the map
	myMarker.setMap(map);
}

function getCurrentPosition() {
	navigator.geolocation.getCurrentPosition(onSuccess, onError, {
		'enableHighAccuracy' : false,
		'timeout' : 20000
	});
	function onSuccess(position) {
		// Get current GPS Position
		currentLat = position.coords.latitude;
		currentLng = position.coords.longitude;
		// Place those values in the input box / Store
		// $("#uploadBook_latitude").val(currentLat);
		// $("#uploadBook_longitude").val(currentLng);
		window.localStorage.setItem("uploadBook_latitude", currentLat);
		window.localStorage.setItem("uploadBook_longitude", currentLng);
		initMap();
		reverseGeoCode();
	}
	// onError Callback receives a PositionError object
	function onError(error) {
		alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
	}
}

$("#gMapAddressInputField").focus(function() {
	initMap();
});

function codeAddress() {
	// Create the search box and link it to the UI element.
	var address = $('#gMapAddressInputField').val();
	geocoder.geocode({
		'address' : address
	}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			myMarker.setPosition(results[0].geometry.location);
			// adds the marker on the map
			myMarker.setMap(map);
			currentLat = results[0].geometry.location.lat();
			currentLng = results[0].geometry.location.lng();
			window.localStorage.setItem("uploadBook_latitude", currentLat);
			window.localStorage.setItem("uploadBook_longitude", currentLng);
			reverseGeoCode();
		} else {
			alert('Geocode was not successful for the following reason: '
					+ status);
		}
	});
}

function reverseGeoCode() {
	$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng="
			+ currentLat + "," + currentLng + "&sensor=false", function(
			JSON_result) {
		// Set title, author, ISBN, photo in input fields
		if (JSON_result.results[0].formatted_address) {
			// Zoom
			// map.setZoom(myZoom);
			// Address on Marker
			$("#gMapAddressInputField").val(
					JSON_result.results[0].formatted_address);
			window.localStorage.setItem("uploadBook_gMapAddressInputField",
					JSON_result.results[0].formatted_address);
		} else {
			alert("Failed to get address.");
		}
	});
}