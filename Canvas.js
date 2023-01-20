var size = 20;
var pos = [0, 0];
var velocity = [0, 0];
var mousePos = [0, 0];
var height;
var width;
var particles = [];
var context;
maxInitalSpeed = 10;
window.onload = window.onresize = function () {
	console.log("loaded");
	var canvas = document.getElementById("canvas");
	var container = document.getElementsByClassName("relative-container");
	var color = "#3ea9e7";
	height = canvas.height = window.innerHeight * 0.5;
	console.log(window.innerHeight);
	canvas.width = document.body.clientWidth;
	context = canvas.getContext("2d");
	if (context) {
		context.fillStyle = color;
		context.fillRect(pos[0], pos[1], pos[0] + size, pos[1] + size);
		for (var i = 0; i < 40; i++) {
			var tempObject = {
				pos: [
					Math.random() * document.body.clientWidth,
					Math.random() * height,
				],
				velocity: [
					Math.random() * maxInitalSpeed,
					Math.random() * maxInitalSpeed,
				],
				radius: Math.floor(Math.random() * 2 + 2),
			};

			particles.push(tempObject);
		}
		console.log(particles);
		for (var i = 0; i < particles.length; i++) {
			console.log(particles[i]);
			drawParticle(particles[i], context);
		}
	}
};
function drawParticle(particle) {
	console.log("pa", particle);
	context.beginPath();
	context.arc(
		particle["pos"][0],
		particle["pos"][1],
		particle.radius,
		0,
		2 * Math.PI,
		false
	);
	context.fillStyle = "#3ea9e7";
	context.fill();
}
onmousemove = function (e) {
	mousePos[0] = e.clientX;
	mousePos[1] = e.clientY;
};

function accelerate(pos, mousePos) {
	var gravity = calcGravity(pos, mousePos);
}
function calcGravity() {}
update = function () {
	console.log("yeet");

	for (var i = 0; i < particles.length; i++) {}
};
setInterval(update, 100);
