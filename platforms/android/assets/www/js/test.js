function onLoad() { // Executed at the beginning from <body onload="onLoad();">
	document.addEventListener("deviceready", function() {
		try {
			FB.init({
				appId : '662089223854879', // unique app id
				nativeInterface : CDV.FB,
				useCachedDialogs : false,
				status : true, // check login status
				cookie : true, // enable cookies to allow the server to
				// access the session
				xfbml : true
			});
		} catch (e) {
			alert(e); 
		}
	}, false);
}

function login() { // Login facebook
	FB.login(function(response) {
		if (response.authResponse) {
			FB.api('/me', function(response) {
				// Need to store username in localstorage BECAUSE username
				// cannot be returned from this function. It is async function.
				// Try 'return response.username;' and call it from index.html
				// file. Won't work.

				$("#LoginDialog").dialog("close"); // Close the dialog box that
				// popped out from index.html to prompted to login Facebook. We
				// were navigated to this login() from that dialog box.
				window.localStorage.setItem("LS_FB_Username", response.name);
				getUserID();
				window.location.href = "profile.html"; // Goto profile.html
				// page
			});
		} else {
			alert("Oops! Failed to Login using Facebook."); // Obvious step
		}
	}, {
		scope : "email"
	/*
	 * By default, calling FB.login will attempt to authenticate the user with
	 * only the basic permissions. If you want one or more additional
	 * permissions, call FB.login with an option object, and set the scope
	 * parameter with a comma-separated list of the permissions you wish to
	 * request from the user.
	 * 
	 * FB.login(function(response) { // handle the response }, {scope:
	 * 'email,user_likes'});
	 */
	});
}

function getUserID() { // Get facebook userId
	var result = null;
	FB.getLoginStatus(function(response) {
		if (response.status == 'connected') { // Simply, if connected
			result = response.authResponse.userId;
			window.localStorage.setItem("LS_FB_UserID", result);
			// Must use authResponse.userId. But, we use response.name for
			// getting Username. See login().
		}
	});
	return result; // return works for userId but not username!
}

function logout() {
	FB.logout(function(response) {
		window.localStorage.clear(); // Clear window.localStorage
		alert('Logout successful. See you soon!'); // Alert logged out message
		window.location.href = "index.html"; // Go back to Menu page
	});
}

/*
 * In index.html: When user clicks 'My Profile' button in index.html, if already
 * facebook logged in, then goto profile.html page, else the dialog with
 * id="LoginDialog" in index.html pops up.
 */
$("#btnDialogProfile").click(function() {
	if (getUserID() == null)
		$.mobile.changePage('#LoginDialog', {
			transition : 'pop',
			role : 'dialog'
		});
	else {
		window.location.href = "profile.html";
	}
});