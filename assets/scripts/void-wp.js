window.addEventListener("load", startup, false);

function startup() {
	var in_res_x = document.querySelector("input[name=x]");
	var in_res_y = document.querySelector("input[name=y]");
	var in_background = document.querySelector("input[name=background]");
	var in_lower_outer = document.querySelector("input[name=lower-outer]");
	var in_higher_outer = document.querySelector("input[name=higher-outer]");
	var in_inner = document.querySelector("input[name=inner]");
	var in_logo = document.querySelector("input[name=logo]");
	var in_logo_switch = document.querySelector("input[name=logo-switch]");
	var in_p_text = document.querySelector("input[name=p-text]");
	var in_up_text = document.querySelector("input[name=up-text]");
	var in_down_text = document.querySelector("input[name=down-text]");
	var up_text = document.querySelector("#upper-text");
	var down_text = document.querySelector("#lower-text");

	var canvas = document.querySelector("canvas");

	in_res_x.value = window.screen.width;
	in_res_y.value = window.screen.height;
	in_up_text.value = up_text.textContent;
	in_down_text.value = down_text.textContent;

	in_background.addEventListener("input", function(event) {
		document.querySelector("#logo > rect").style.fill = event.target.value;
		document.querySelector("#separator-rect").style.fill = event.target.value;
		document.querySelector("#separator-circle").style.fill = event.target.value;
	}, false);
	in_background.addEventListener("change", function(event) {
		document.querySelector("#logo > rect").style.fill = event.target.value;
		document.querySelector("#separator-rect").style.fill = event.target.value;
		document.querySelector("#separator-circle").style.fill = event.target.value;
	}, false);
	in_lower_outer.addEventListener("input", function(event) { document.querySelector("#lower-outer").style.stopColor = event.target.value; }, false);
	in_lower_outer.addEventListener("change", function(event) { document.querySelector("#lower-outer").style.stopColor = event.target.value; }, false);
	in_higher_outer.addEventListener("input", function(event) { document.querySelector("#higher-outer").style.stopColor = event.target.value; }, false);
	in_higher_outer.addEventListener("change", function(event) { document.querySelector("#higher-outer").style.stopColor = event.target.value; }, false);
	in_inner.addEventListener("input", function(event) { document.querySelector("#inner").style.fill = event.target.value; }, false);
	in_inner.addEventListener("change", function(event) { document.querySelector("#inner").style.fill = event.target.value; }, false);
	in_logo.addEventListener("input", function(event) { document.querySelector("#logo-text").style.fill = event.target.value; }, false);
	in_logo.addEventListener("change", function(event) { document.querySelector("#logo-text").style.fill = event.target.value; }, false);
	in_logo_switch.addEventListener("change", function(event) {
		if (event.target.checked) {
			document.querySelector("#logo-text").style.display = "block";
		} else {
			document.querySelector("#logo-text").style.display = "none";
		}
	}, false);
	in_p_text.addEventListener("input", function(event) { up_text.style.fill = event.target.value; down_text.style.fill = event.target.value; }, false);
	in_p_text.addEventListener("change", function(event) { up_text.style.fill = event.target.value; down_text.style.fill = event.target.value; }, false);
	document.querySelector("button").addEventListener("click", function() {
		up_text.textContent = in_up_text.value;
		down_text.textContent = in_down_text.value;
		makePic(canvas, document.querySelector("#logo"), in_res_x.value, in_res_y.value);
	}, false);
}

//Insanity allowing to convert svg to png
function makePic(canvas, pic, x, y) {
	canvas.width = x;
	canvas.height = y;
	var data = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width="' + x + '" height="' + y + '">' + pic.innerHTML + '</svg>';
	var DOMURL = window.URL || window.webkitURL || window;
	var img = new Image();
	var svg = new Blob([data], {type: 'image/svg+xml'});
	var url = DOMURL.createObjectURL(svg);
	img.onload = function() {
		canvas.getContext('2d').drawImage(img, 0, 0);
		DOMURL.revokeObjectURL(url);
		//Only works in this place. I write it 'cause I spent a LOT of time figuring this out
		var dlnk = document.createElement("a");
		dlnk.download = "void-" + Date.now() + ".png";
		dlnk.href = canvas.toDataURL("image/png");
		dlnk.textContent = "Get PNG!";
		var lnkPlace = document.querySelector("#control p");
		while (lnkPlace.firstChild) {
			lnkPlace.removeChild(lnkPlace.firstChild);
		}
		document.querySelector("#control p").appendChild(dlnk);

	}
	img.src = url;
}

