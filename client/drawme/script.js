function Color(a) {
	var offset = function(obj) {
		var curleft = 0,
				curtop = 0;
		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			} while ((obj = obj.offsetParent));
			return { x: curleft, y: curtop };
		}
		return undefined;
	};
	var canvas = document.getElementById("painter");
	var context = canvas.getContext("2d");
	var draw = false;
	var pos = offset(canvas);
	canvas.onmousemove = function(e) {
		if (draw == false) {
			return;
		}
		var x = e.pageX - pos.x;
		var y = e.pageY - pos.y;
		console.log(x, y);
		context.lineTo(x, y);
		context.stroke();
	};
	canvas.onmousedown = function(e) {
		draw = true;
		var x = e.pageX - pos.x;
		var y = e.pageY - pos.y;
		context.fillStyle = "red";
		context.beginPath();
		context.moveTo(x, y);
		context.lineJoin = document.getElementById("lineJoin").value;
		context.lineWidth = document.getElementById("number").value;
		context.strokeStyle = a;
	};
	canvas.onmouseup = function(e) {
		draw = false;
	};
}
function ClearCanvas() {
	var c = document.getElementById("painter");
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, 1500, 600);
}

function Preview() {
	var canvas = document.getElementById("painter");

	var dataUrl = canvas.toDataURL();

	window.open(dataUrl, "", "width=880, height=300");
}

function Save() {
	window.open("<p>Hi</p>");
}