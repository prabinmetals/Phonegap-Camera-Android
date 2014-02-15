var pictureSource; // picture source
var destinationType; // sets the format of returned value
var i = 0; // Button counter

// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
function onDeviceReady() {
	pictureSource = navigator.camera.PictureSourceType;
	destinationType = navigator.camera.DestinationType;
}
// Called when a photo is successfully retrieved
function onPhotoDataSuccess(imageData) {
	// Uncomment to view the base64-encoded image data
	// console.log(imageData);

	// Get image handle
	$("#atd")
			.append(
					"<img "
							+ "style='width: 150px; margin:10px; border:2px solid black; border-radius:12px;'"
							+ " id='smallImage"
							+ i
							+ "' src='' /> "
							+ "<input type='button' value='Delete'"
							+ "style='width: 150px; margin:2px 10px 2px 10px; background-color:red; color: white; border-radius:12px;'"
							+ "id='deleteButton" + i + "'> </input>");
	var smallImage = document.getElementById('smallImage' + i);
	// Unhide image elements
	smallImage.style.display = 'block';
	// Show the captured photo
	// The in-line CSS rules are used to resize the image
	smallImage.src = "data:image/jpeg;base64," + imageData;
	i = i + 1;
}

// Called when a photo is successfully retrieved
function onPhotoURISuccess(imageURI) {
	// Uncomment to view the image file URI
	// console.log(imageURI);

	// Get image handle
	// script
	var largeImage = document.getElementById('largeImage');
	// Unhide image elements
	largeImage.style.display = 'block';
	// Show the captured photo
	// The in-line CSS rules are used to resize the image
	largeImage.src = imageURI;
}

// A button will call this function
function capturePhoto() {
	// Take picture using device camera and retrieve image as base64-encoded
	// string
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		quality : 50,
		destinationType : destinationType.DATA_URL
	});
}

// A button will call this function
function capturePhotoEdit() {
	// Take picture using device camera, allow edit, and retrieve image as
	// base64-encoded string
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		quality : 20,
		allowEdit : true,
		destinationType : destinationType.DATA_URL
	});
}

// A button will call this function
function getPhoto(source) {
	// Retrieve image file location from specified source
	navigator.camera.getPicture(onPhotoURISuccess, onFail, {
		quality : 50,
		destinationType : destinationType.FILE_URI,
		sourceType : source
	});
}

// Called if something bad happens.
function onFail(message) {
	alert('Failed because: ' + message);
}

// Dynamic buttons use this syntax. Hide and unhide image.
$(document).on('click', '#myTable #atd input[type=button]', function() {
	var butId = $(this).attr('id'); // Get the unique button id
	var correspondingImageId = 'smallImage' + butId.slice(-1); // Get the image
	// button id

	// Toggle function to hide and unhide image
	if ($(this).val() == "Delete") {
		$('img[id*="' + correspondingImageId + '"]').hide("slow");
		$(this).val("Undelete");
		$(this).css("background-color", "green", "color", "white")
	} else {
		$('img[id*="' + correspondingImageId + '"]').show("fast");
		$(this).val("Delete");
		$(this).css("background-color", "red", "color", "white")
	}
});
