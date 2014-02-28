var geocoder = new google.maps.Geocoder();
var infowindow = new google.maps.InfoWindow();
var myZoom = 19;
var myMarkerIsDraggable = true;
var map;
var myMarker;
var bounds;
var currentLat;
var currentLng;

function initMap() {

}
// GEOLOCATION
// creates the map
// zooms
// centers the map
// sets the map's type

function gMapMarker() {
	currentLat = window.localStorage.getItem("uploadBook_latitude");
	currentLng = window.localStorage.getItem("uploadBook_longitude");

	map = new google.maps.Map(document.getElementById('map_canvas'), {
		zoom : myZoom,
		center : new google.maps.LatLng(currentLat, currentLng),
		mapTypeId : google.maps.MapTypeId.ROADMAP
	});

	// creates a draggable marker to the given coords
	myMarker = new google.maps.Marker({
		position : new google.maps.LatLng(currentLat, currentLng),
		draggable : myMarkerIsDraggable,
	});

	// Create the search box and link it to the UI element.
	var input = /** @type {HTMLInputElement} */
	(document.getElementById('gMapAddressInputField'));
	// map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	var searchBox = new google.maps.places.SearchBox(
	/** @type {HTMLInputElement} */
	(input));

	// When new address is entered in search field, go there.
	google.maps.event.addListener(searchBox, 'places_changed', function() {
		alert(0);
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
		currentLat = place.geometry.location.lat();
		currentLng = place.geometry.location.lng();
		// Store Latitude, Longitude, Address
		window.localStorage.setItem("uploadBook_gMapAddressInputField", $(
				"#gMapAddressInputField").val());
		$("#gMapAddressInputField").val()
		window.localStorage.setItem("uploadBook_latitude", currentLat);
		window.localStorage.setItem("uploadBook_longitude", currentLng);
		// $("#uploadBook_latitude").val(currentLat);
		// $("#uploadBook_longitude").val(currentLng);
	});
	// When bounds are changed, the search box will display results close to
	// the current place.
	google.maps.event.addListener(map, 'bounds_changed', function() {
		var bounds = map.getBounds();
		searchBox.setBounds(bounds);
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
		// reverseGeoCode();
		reverseGeoCode();
	});

	// centers the map on markers coords
	map.setCenter(myMarker.position);

	// adds the marker on the map
	myMarker.setMap(map)

}

// $("#gMapAddressInputField").focus(function() {
// gMapMarker();
// });

function getSavedPosition() {
	// Get the saved position
	var previousLat = window.localStorage.getItem("uploadBook_latitude");
	var previousLng = window.localStorage.getItem("uploadBook_longitude");
	// Put them in the input box
	// $("#uploadBook_latitude").val(currentLat);
	// $("#uploadBook_longitude").val(currentLng);
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
		gMapMarker();
		// reverseGeoCode();
	}
	// onError Callback receives a PositionError object
	function onError(error) {
		alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
	}
}

function reverseGeoCode() {
	$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng="
			+ currentLat + "," + currentLng + "&sensor=false", function(
			JSON_result) {
		// Set title, author, ISBN, photo in input fields
		if (JSON_result.results[0].formatted_address) {
			// Zoom
			map.setZoom(myZoom);
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