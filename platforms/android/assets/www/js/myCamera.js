/* ************* Declare Variables ************ */
var pictureSource; // picture source
var destinationType; // sets the format of returned value

/* ************* On Device Ready ************ */
// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
function onDeviceReady() {
	pictureSource = navigator.camera.PictureSourceType;
	destinationType = navigator.camera.DestinationType;
	// getImg();
}
// A button will call this function
function capturePhoto() {
	// Take picture using device camera and retrieve image as base64-encoded
	// string
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		quality : 50,
		destinationType : destinationType.DATA_URL,
		saveToPhotoAlbum : true
	});
}
/* ************* On Successfully Capturing Image ************ */
// Called when a photo is successfully retrieved
function onPhotoDataSuccess(imageData) {
	// Get the id of button pressed.
	var butId = window.localStorage.getItem("addImageButton_localStorage");
	// Last char (digit) of button id
	var num = butId.slice(-1).toString();
	// Extract corresponding <img id> from the button id
	var correspondingImageId = 'image' + num;
	// If previously deleted, visibility: hidden. So, override it.
	$('#' + correspondingImageId).css('visibility', 'none');
	// Set the new src image
	$('#' + correspondingImageId).attr('src',
			"data:image/jpeg;base64," + imageData);
	window.localStorage.setItem("photoBase64" + num, "data:image/jpeg;base64,"
			+ imageData);
	console.log(num);
	// Update button to "Delete" option
	$('#' + butId).css("background-color", "red", "color", "white");
	$('#' + butId).html("Delete");
}

// Delete Image
$("#imagesTable button").click(function() {
	// Get button id
	var butIt = this.id;
	var num = butIt.slice(-1).toString();
	// Toggle button
	if ($(this).html() != "Delete") {
		window.localStorage.setItem("addImageButton_localStorage", butIt)
		capturePhoto();
	} else {
		// Get Image id
		var correspondingImageId = "image" + num;
		// Hide Image
		$('#' + correspondingImageId).css('visibility', 'hidden');
		window.localStorage.removeItem("photoBase64" + num);
		$(this).html("Add Image");
		$(this).css("background-color", "none");
	}
});

// Called when a photo is successfully retrieved
function onPhotoURISuccess(imageURI) {
	// Uncomment to view the image file URI
	console.log(imageURI);

	// Get image handle script
	$("#atd")
			.append(
					"<img "
							+ "style='width: 150px; margin:10px; border:2px solid black; border-radius:12px;'"
							+ " id='smallImage"
							+ i
							+ "' src='' /> "
							+ "<input type='button' value='Delete"
							+ "style='width: 150px; margin:2px 10px 2px 10px; background-color:red; color: white; border-radius:12px;'"
							+ "id='deleteButton" + i + "'> </input>");

	var smallImage = document.getElementById('smallImage' + i);
	// Unhide image elements
	smallImage.style.display = 'block';

	// Show the captured photo
	// The in-line CSS rules are used to resize the image
	smallImage.src = imageURI;
	i = i + 1;
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