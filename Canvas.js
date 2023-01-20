window.onload = window.onresize = function () {
	console.log("loaded");
	var canvas = document.getElementById("canvas");
	var container = document.getElementsByClassName("relative-container");

	canvas.height = window.innerHeight * 0.5;
	console.log(window.innerHeight);
	canvas.width = document.body.clientWidth;
	var context = canvas.getContext("2d");
	if (context) {
		context.fillStyle = "#a5d8d7";
		context.fillRect(0, 0, 20, 20);
	}
};
