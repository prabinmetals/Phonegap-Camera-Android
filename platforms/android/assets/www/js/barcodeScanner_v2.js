function scan() {

	var scanner = cordova
			.require("com.phonegap.plugins.barcodescanner.BarcodeScanner");
	scanner
			.scan(function(result) {
				// console.log("Scanner result: \n" + "text: " + result.text
				// + "\n" + "format: " + result.format + "\n"
				// + "cancelled: " + result.cancelled + "\n");
				// console.log(result);
				/*
				 * if (args.format == "QR_CODE") {
				 * window.plugins.childBrowser.showWebPage(args.text, {
				 * showLocationBar: false }); }
				 */
				if (result.format == "EAN_13") {
					alert("Successful!\n"
							+ "Make sure you are connected to the Internet to fill in the information automatically.");
					window.localStorage.setItem("uploadBook_isbn", result.text);
					$("#isbn").val(result.text);
					JSON_GoogleBooks();
				} else {
					alert("Sorry. Could not determine the ISBN code.");
				}
			});

}

function encode() {
	var scanner = cordova
			.require("com.phonegap.plugins.barcodescanner.BarcodeScanner");
	scanner.encode(scanner.Encode.TEXT_TYPE, "http://www.nhl.com", function(
			success) {
		alert("encode success: " + success);
	}, function(fail) {
		alert("encoding failed: " + fail);
	});
}

function JSON_GoogleBooks() {
	var resultingISBN = window.localStorage.getItem("uploadBook_isbn");
	var errorMsg = "";
	$.getJSON("https://www.googleapis.com/books/v1/volumes?q=isbn:"
			+ resultingISBN, function(JSON_result) {
		// If title found
		if (JSON_result.items[0].volumeInfo.title) {
			$("#title").val(JSON_result.items[0].volumeInfo.title);
			window.localStorage.setItem("uploadBook_title", $("#title").val());
		} else {
			errorMsg += "Title not found.\n";
		}
		// If Author found
		if (JSON_result.items[0].volumeInfo.authors[0]) {
			$("#author").val(JSON_result.items[0].volumeInfo.authors[0]);
			window.localStorage
					.setItem("uploadBook_author", $("#author").val());
		} else {
			errorMsg += "Authors not found. \n";
		}
		// If image found
		if (JSON_result.items[0].volumeInfo.imageLinks) {
			$('#image1').attr('src',
					JSON_result.items[0].volumeInfo.imageLinks.thumbnail);
			// Update button to "Delete" option
			$('#addImageButton1').css("background-color", "red", "color",
					"white");
			$('#addImageButton1').html("Delete");
			window.localStorage.setItem("photoBase641",
					JSON_result.items[0].volumeInfo.imageLinks.thumbnail);
		}
		if (errorMsg != "")
			alert(errorMsg);
	});
}