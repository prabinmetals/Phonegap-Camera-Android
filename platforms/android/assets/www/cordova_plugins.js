cordova
		.define(
				'cordova/plugin_list',
				function(require, exports, module) {
					module.exports = [
							{
								"file" : "plugins/org.apache.cordova.camera/www/CameraConstants.js",
								"id" : "org.apache.cordova.camera.Camera",
								"clobbers" : [ "Camera" ]
							},
							{
								"file" : "plugins/org.apache.cordova.camera/www/CameraPopoverOptions.js",
								"id" : "org.apache.cordova.camera.CameraPopoverOptions",
								"clobbers" : [ "CameraPopoverOptions" ]
							},
							{
								"file" : "plugins/org.apache.cordova.camera/www/Camera.js",
								"id" : "org.apache.cordova.camera.camera",
								"clobbers" : [ "navigator.camera" ]
							},
							{
								"file" : "plugins/org.apache.cordova.camera/www/CameraPopoverHandle.js",
								"id" : "org.apache.cordova.camera.CameraPopoverHandle",
								"clobbers" : [ "CameraPopoverHandle" ]
							},
							{
								"file" : "plugins/com.phonegap.plugins.barcodescanner/www/barcodescanner.js",
								"id" : "com.phonegap.plugins.barcodescanner.BarcodeScanner",
								"clobbers" : [ "cordova.plugins.barcodeScanner" ]
							},
							{
								"file" : "plugins/org.apache.cordova.geolocation/www/Coordinates.js",
								"id" : "org.apache.cordova.geolocation.Coordinates",
								"clobbers" : [ "Coordinates" ]
							},
							{
								"file" : "plugins/org.apache.cordova.geolocation/www/PositionError.js",
								"id" : "org.apache.cordova.geolocation.PositionError",
								"clobbers" : [ "PositionError" ]
							},
							{
								"file" : "plugins/org.apache.cordova.geolocation/www/Position.js",
								"id" : "org.apache.cordova.geolocation.Position",
								"clobbers" : [ "Position" ]
							},
							{
								"file" : "plugins/org.apache.cordova.geolocation/www/geolocation.js",
								"id" : "org.apache.cordova.geolocation.geolocation",
								"clobbers" : [ "navigator.geolocation" ]
							} ];
					module.exports.metadata =
					// TOP OF METADATA
					{
						"org.apache.cordova.camera" : "0.2.7",
						"com.phonegap.plugins.barcodescanner" : "1.0.1",
						"org.apache.cordova.geolocation" : "0.3.6"
					}
					// BOTTOM OF METADATA
				});