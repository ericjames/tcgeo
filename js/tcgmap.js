// adapted from http://www.wolfpil.de/
// Global variables
var map;
var base = "http://www.google.com/maps/";
var kml = {
	a: {
		type: "poly",
		name: "Rebuilt",
		url: base + "ms?mpa=0&authuser=0&ctz=300&mpf=0&vps=32&ie=UTF8&msa=0&output=kml&msid=212971981154994583939.0004afee1a9006c764fbc"
	},
	b: {
		type: "poly",
		name: "Turnaround",
		url: base + "ms?mpa=0&authuser=0&ctz=300&mpf=0&vps=30&ie=UTF8&msa=0&output=kml&msid=212971981154994583939.0004affc615e9dd093118"
	},
	c: {
		type: "poly",
		name: "Aging Inner Ring",
		url: "http://www.efwjames.com/tcrd/kml/AgingInnerRing.kml"
	},
	d: {
		type: "poly",
		name: "Protected Genteel",
		url: base + "ms?mpa=0&authuser=0&ctz=300&mpf=0&vps=34&ie=UTF8&msa=0&output=kml&msid=212971981154994583939.0004afd4b1a6864d11987"
	},
	e: {
		type: "poly",
		name: "Settled Mid-City",
		url: base + "ms?mpa=0&authuser=0&ctz=300&mpf=0&vps=28&ie=UTF8&msa=0&output=kml&msid=212971981154994583939.0004affd0be58daf242f0"
	},
	f: {
		type: "poly",
		name: "Prewar Grid",
		url: base + "ms?mpa=0&authuser=0&ctz=300&mpf=0&vps=42&ie=UTF8&msa=0&output=kml&msid=212971981154994583939.0004affe4b59a3b9f4ba0"
	},
	g: {
		type: "poly",
		name: "Prewar Amenity",
		url: base + "ms?mpa=0&authuser=0&ctz=300&mpf=0&vps=16&ie=UTF8&msa=0&output=kml&msid=212971981154994583939.0004afff246d2c60ac672"
	},
	h: {
		type: "poly",
		name: "Suburban-in-City",
		url: base + "ms?mpa=0&authuser=0&ctz=300&mpf=0&vps=44&ie=UTF8&msa=0&output=kml&msid=212971981154994583939.0004afffbc3e042ebec8d"
	},
	i: {
		type: "poly",
		name: "City Boundaries",
		url: "http://www.efwjames.com/tcrd/mplsstp.kml"
	},
	j: {
		type: "poly",
		name: "All Streetcar Lines",
		url: base + "ms?mpa=0&authuser=0&vps=2&ie=UTF8&msa=0&output=kml&msid=212971981154994583939.0004b09c6a95513ebbd54"
	},
	k: {
		type: "ground",
		name: "1913 Streetcar Map",
		url: "http://www.efwjames.com/tcrd/TC1913map.jpg",
		opacity: 0.6,
		lat1: 44.8873,
		long1: -93.379,
		lat2: 45.0526,
		long2: -93.003
	},
	l: {
		type: "ground",
		name: "1906 Twin Cities Map",
		url: "http://www.efwjames.com/tcrd/TC1906map.jpg",
		opacity: 0.4,
		lat1: 44.8873,
		long1: -93.329,
		lat2: 45.022,
		long2: -93.030
	},
	m: {
		type: "ground",
		name: "1900 Minneapolis Map",
		url: "http://www.efwjames.com/tcrd/Mpls1900map.jpg",
		opacity: 0.5,
		lat1: 44.925,
		long1: -93.316,
		lat2: 45.019,
		long2: -93.211
	}

};


// style map
var styleArray = [

{
	featureType: "all",
	stylers: [{
		saturation: -93
	}, {
		gamma: 2.12
	}]
}, {
	featureType: "road.local",
	elementType: "geometry",
	stylers: [{
		lightness: -15
	}]
}, {
	featureType: "road.arterial",
	elementType: "geometry",
	stylers: [{
		lightness: -10
	}]
}, {
	featureType: "water",
	elementType: "geometry",
	stylers: [{
		saturation: 55
	}, {
		hue: "#00bbff"
	}, {
		lightness: -2
	}]
}, {
	featureType: "administrative.neighborhood",
	elementType: "labels",
	stylers: [{
		hue: "#0077ff"
	}, {
		saturation: 100
	}]
}, {
	featureType: "administrative.locality",
	elementType: "labels",
	stylers: [{
		hue: "#00ff6f"
	}, {
		saturation: 97
	}]
}, {
	featureType: "poi.park",
	elementType: "geometry",
	stylers: [{
		saturation: 55
	}, {
		hue: "#08ff00"
	}, {
		lightness: -10
	}]
}];

// load map


function loadMap() {

	var g = google.maps;

	var mpls = "44.9812, -93.2687";
	var tc = "44.975, -93.15";

	var opts_map = {
		center: new g.LatLng(44.9812, -93.2687),
		zoom: 13,
		mapTypeId: g.MapTypeId.ROADMAP,
		streetViewControl: true,
		styles: styleArray,
		panControl: false,
		streetViewControl: true,
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			position: google.maps.ControlPosition.BOTTOM_RIGHT,
			mapTypeIds: [g.MapTypeId.ROADMAP, g.MapTypeId.SATELLITE, g.MapTypeId.TERRAIN, g.MapTypeId.HYBRID]
		},
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL,
			position: google.maps.ControlPosition.LEFT_BOTTOM
		},
	}

	map = new g.Map(document.getElementById("map_canvas"), opts_map);

	createSidebar();




	// jquery street view

	var div = document.getElementById('panorama_canvas');
	var svOptions = {
		panControlOptions: {
			position: google.maps.ControlPosition.LEFT_BOTTOM,
		},
		zoomControlOptions: {
			position: google.maps.ControlPosition.LEFT_BOTTOM,
		}
	};
	var panorama = new google.maps.StreetViewPanorama(div, svOptions);
	map.setStreetView(panorama);
	$("#panorama_canvas").hide();

	$("#streetview_close").appendTo("#panorama_canvas");
	$("#streetview_close").click(function() {
		var panorama = map.getStreetView();
		if (panorama) {
			panorama.setVisible(false);
		}
		$("#panorama_canvas").hide();
		$("#map_canvas").removeClass("push");
		google.maps.event.trigger(map, "resize");
		var zoombig = {
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.LARGE,
				position: google.maps.ControlPosition.LEFT_BOTTOM,
			}
		};
		map.setOptions(zoombig);
	});

	google.maps.event.addListener(panorama, 'pano_changed', function() {
		$("#map_canvas").addClass("push");
		google.maps.event.trigger(map, "resize");
		$("#panorama_canvas").show();
		google.maps.event.trigger(panorama, "resize");
	});

	google.maps.event.addListener(panorama, 'position_changed', function() {
		var currentpos = panorama.getPosition();
		map.setCenter(currentpos);
		map.setZoom(14);
		var zoomsmall = {
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL
			}
		};
		map.setOptions(zoomsmall);
	});

} //done loading
// toggler
var placeholderArray = [];


function toggleKML(checked, id) {

	if (checked) {

		// ground overlay?
		if (kml[id].type == "ground") {

			var imageBounds = new google.maps.LatLngBounds(
			new google.maps.LatLng(kml[id].lat1, kml[id].long1), new google.maps.LatLng(kml[id].lat2, kml[id].long2));

			var overlayOpts = {
				opacity: kml[id].opacity
			}
			var layer = new google.maps.GroundOverlay(kml[id].url, imageBounds, overlayOpts);

		}; // end ground

		// kml layer?
		if (kml[id].type == "poly") {

			var layer = new google.maps.KmlLayer(kml[id].url, {
				preserveViewport: true,
				suppressInfoWindows: true
			});


			// listener for polygon content
			google.maps.event.addListener(layer, 'click', function(kmlEvent) {
				clearOverlays();
				var polypos = kmlEvent.latLng;
				var image = 'img/point.png';
				var placeholder = new google.maps.Marker({
					map: map,
					icon: image,
					position: polypos,
					animation: google.maps.Animation.BOUNCE,
				});
				placeholderArray.push(placeholder);

				setTimeout(function() {
					placeholder.setAnimation(null);
				}, 750);
				var text = "<h3>" + kmlEvent.featureData.name + "</h3>" + kmlEvent.featureData.description;
				showContentWindow(text);


				// current address 
				var geocoder = new google.maps.Geocoder();

				function showAddress(val) {
					geocoder.geocode({
						'address': val
					}, function(results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							marker.setPosition(results[0].geometry.location);
							geocode(results[0].geometry.location);
						} else {
							alert("Sorry but Google Maps could not find this location.");
						}
					});
				}

				function geocode(position) {
					geocoder.geocode({
						latLng: position
					}, function(responses) {
						var html = '';
						if (responses && responses.length > 0) {
							html += '<strong>Postal Address:</strong> ' + responses[0].formatted_address;
						} else {
							html += '---';
						}
						var rlat = Math.round(placeholder.getPosition().lat() * 1000) / 1000;
						var rlong = Math.round(placeholder.getPosition().lng() * 1000) / 1000;

						html += ' (' + rlat + ', ' + rlong + ') ';

						$("#infobar").html(html);

					});
				}
				var point = placeholder.getPosition();
				map.panTo(point);
				geocode(point);


			});

			function clearOverlays() {
				if (placeholderArray) {
					for (i in placeholderArray) {
						placeholderArray[i].setMap(null);
					}

				}

			}

			function showContentWindow(text) {
				$("#content_window").show(500);
				var sidediv = document.getElementById('content_window');
				sidediv.innerHTML = text;
			}

		};

		kml[id].obj = layer;
		kml[id].obj.setMap(map);


	} // end checked test
	else {
		kml[id].obj.setMap(null);
		delete kml[id].obj;
	}

}


function zoomToOverlay(nr, id) {

	if (document.forms["f"].elements["box"][nr].checked) {
		map.fitBounds(kml[id].bounds);
	} else {
		document.forms["f"].elements["box"][nr].click();
	}

}


// Append Class on Select


function highlight(box, listitem) {
	var selected = 'selected';
	var normal = '';
	document.getElementById(listitem).className = (box.checked ? selected : normal);
};


function removeAll() {

	for (var prop in kml) {
		if (kml[prop].obj) {
			kml[prop].obj.setMap(null);
			delete kml[prop].obj;
		}

	}

	var boxes = document.getElementsByName("box");
	for (var i = 0, m; m = boxes[i]; i++) {
		m.checked = false;
	}

	for (var i = 0, m; m = 'selector' + i; i++) {
		if (document.getElementById(m).className != null) {
			document.getElementById(m).className = document.getElementById(m).className.replace(/(?:^|\s)selected(?!\S)/, '');
		}

	}

}


function createSidebar() {

	var i = -1;
	var html = "<form action='' name='f'><ul>";
	for (var prop in kml) {
		i++;
		html += "<li id=\"selector" + i + "\"><input name='box' type='checkbox' id='" + prop + "'" + " onclick='highlight(this,\"selector" + i + "\"); toggleKML(this.checked, this.id)' \/>" + "&nbsp;<a href='#' onclick=\"zoomToOverlay(" + i + ", '" + prop + "'); return false;\">" + kml[prop].name + "<\/a><\/li>";
	}
	html += "<li class='control'><a href='#' onclick='removeAll();return false;'>" + "Remove all layers<\/a><\/li>" + "<\/ul><\/form>";

	document.getElementById("mapcontrolbox").innerHTML = html;
}

// Startup!


function startup() {
	var checkit = document.getElementById('b');
	checkit.checked = true;
	toggleKML(checkit, 'b');
	highlight(checkit, 'selector1');

	var checkit2 = document.getElementById('i');
	checkit2.checked = true;
	toggleKML(checkit2, 'i');
	highlight(checkit2, 'selector8');

	var checkit3 = document.getElementById('c');
	checkit3.checked = true;
	toggleKML(checkit3, 'c');
	highlight(checkit3, 'selector8');

	var checkit4 = document.getElementById('k');
	checkit4.checked = true;
	toggleKML(checkit4, 'k');
	highlight(checkit4, 'selector10');

};
