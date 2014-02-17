/* ************* Declare Variables ************ */
var pictureSource; // picture source
var destinationType; // sets the format of returned value
// Every time user goes back and forth between this page, we want to retain the
// data in 'i' and 'imgStore array'.
var i = window.localStorage.getItem("myCamera_i");
if (i == null || i == "NaN") {
	i = 0;
} else {
	i = window.localStorage.getItem("myCamera_i");
}
var imgStore = window.localStorage.getItem("imgCount");
if (imgStore == "" || imgStore == null) {
	imgStore = new Array();
} else {
	var x = imgStore.split(',');
	imgStore = x;
}

/* ************* On Device Ready ************ */

// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
function onDeviceReady() {
	pictureSource = navigator.camera.PictureSourceType;
	destinationType = navigator.camera.DestinationType;
	getImg();
}

/* ************* On Successfully Capturing Image ************ */

// Called when a photo is successfully retrieved
function onPhotoDataSuccess(imageData) {
	i = Number(i);
	i = i + 1;
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
	smallImage = document.getElementById('smallImage' + i);
	// Unhide image elements
	smallImage.style.display = 'block';
	// Show the captured photo
	// The in-line CSS rules are used to resize the image
	smallImage.src = "data:image/jpeg;base64," + imageData;
	// Store current 'i' in array imgStore
	// Very important to use toString().
	// Else, imgStore.indexOf(myVal) confuses with str or num
	imgStore.push(i.toString());
	// localStorage value of i
	window.localStorage.setItem("imgCount", imgStore);
	// localStorage base64 format with unique key
	window.localStorage.setItem("photoBase64" + i, smallImage.src);
	// localStorage current value of i
	window.localStorage.setItem("myCamera_i", i);
}

/* ************* Deleting an image ************ */
// Dynamic buttons use this syntax.
$(document).on('click', '#myTable #atd input[type=button]', function() {
	// Get Button and image id
	var butId = $(this).attr('id');
	// alert("Button Id: " + butId);
	// Get the image src
	var correspondingImageId = 'smallImage' + butId.slice(-1);

	// Remove imgStore data
	// Gets the last char (e.g Button5 -> 5)
	var myVal = (butId.slice(-1));
	// alert("myVal: " + myVal);
	// Get index of '5' from imgStore array
	var myIndex = imgStore.indexOf(myVal);
	// alert("Before deleting item from imgStore Array: " + imgStore);
	// If element present (has proper index)
	if (myIndex !== -1)
		// Remove that element from array
		imgStore.splice(myIndex, 1);
	// alert("myIndex: " + myIndex);
	// Update new array imgStore in localStorage
	window.localStorage.setItem("imgCount", imgStore);
	// alert("After deleting item from imgStore Array: "
	// Remove localStorage base64 image code that links to src
	window.localStorage.removeItem("photoBase64" + myVal);
	// Remove image and button
	$('img[id*="' + correspondingImageId + '"]').remove();
	$(this).remove();
});
/* ******* Display images if user navigates without actually saving *** */

// This function displays the locally stores images (in Base64 format) in
// uploadBook.html > #atd. Switching back and forth between images won't erase
// the images.
function getImg() {
	// Key "imgCount" comes from onPhotoDataSuccess(). "imgCount' is an array
	// called imgStore. It contains image number such as [1,2,4,5] etc.
	var tempArray = window.localStorage.getItem("imgCount");
	// alert(tempArray);
	if (tempArray != "") { // if array is not empty
		// Loop until all the images in localStorage are displayed in
		// uploadProfile.html -> "#atd"
		for ( var i = 0; i <= tempArray.length - 1; i++) {
			// Each photo is stored in base64 format. Each image is stored in
			// localStorage with key "photoBase64X", where X is the number from
			// key "imgCount" (or imgStore array).
			var tempPhotoBase64 = "photoBase64" + tempArray[i];
			// "tempPhotoSrc" will store the base64 format for current image
			var tempPhotoSrc = window.localStorage.getItem(tempPhotoBase64);
			// Unwanted "photoBase64", is also in array. So skip it.
			if (tempPhotoBase64 != 'photoBase64,') {
				// Phew! Now add that image + button to "#atd"
				console.log(tempPhotoBase64);
				$("#atd")
						.append(
								"<img "
										+ "style='width: 150px; margin:10px; border:2px solid black; border-radius:12px;'"
										+ " id='smallImage"
										+ tempArray[i].toString()
										+ "' src='"
										+ tempPhotoSrc
										+ "' /> "
										+ "<input type='button' value='Delete"
										+ "'"
										+ "style='width: 150px; margin:2px 10px 2px 10px; background-color:red; color: white; border-radius:12px;'"
										+ "id='deleteButton"
										+ tempArray[i].toString()
										+ "'> </input>");
			}
		}
	}
}

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