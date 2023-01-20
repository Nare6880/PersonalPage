var size = 20;
var pos = [0, 0];
var velocity = [0, 0];
var mousePos = [0, 0];
var height;
var width;
var particles = [];
var context;
var numParticles = 500;
maxInitalSpeed = 5;
window.onresize = function () {
	canvas.width = document.body.clientWidth;
	height = canvas.height = window.innerHeight * 0.66;
};
window.onload = function () {
	console.log("loaded");
	var canvas = document.getElementById("canvas");
	var container = document.getElementsByClassName("relative-container");
	var color = "#3ea9e7";
	height = canvas.height = window.innerHeight * 0.66;
	console.log(window.innerHeight);
	canvas.width = document.body.clientWidth;
	context = canvas.getContext("2d");
	if (context) {
		context.fillStyle = color;
		context.fillRect(pos[0], pos[1], pos[0] + size, pos[1] + size);
		for (var i = 0; i < numParticles; i++) {
			var tempObject = {
				pos: [
					Math.random() * document.body.clientWidth,
					Math.random() * height,
				],
				velocity: [
					Math.random() * maxInitalSpeed - 2.5,
					Math.random() * maxInitalSpeed - 2.5,
				],
				radius: Math.floor(Math.random() * 2 + 2),
				previousPos: [],
			};

			particles.push(tempObject);
		}
		for (var i = 0; i < particles.length; i++) {
			drawParticle(particles[i], context);
		}
	}
};
function drawParticle(particle) {
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
	mousePos[1] = e.clientY - 68;
};

function accelerate(particle) {
	var distance =
		Math.pow(particle["pos"][0] - mousePos[0], 2) +
		Math.pow(particle["pos"][1] - mousePos[1], 2);
	var acceleration = 1200 / distance;

	var component_x =
		(acceleration * (mousePos[0] - particle["pos"][0])) / Math.sqrt(distance);
	var component_y =
		(acceleration * (mousePos[1] - particle["pos"][1])) / Math.sqrt(distance);
	particle.velocity[0] += component_x;
	particle.velocity[1] += component_y;
}
update = function () {
	context.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < particles.length; i++) {
		accelerate(particles[i]);
		var newX = particles[i].pos[0] + particles[i]["velocity"][0];
		var newY = particles[i].pos[1] + particles[i]["velocity"][1];
		if (newX < 0) {
			newX += canvas.width;
		}
		if (newY < 0) {
			newY += canvas.height;
		}
		particles[i].previousPos.unshift([
			particles[i].pos[0],
			particles[i].pos[1],
		]);
		if (particles[i].previousPos.length >= 4) particles[i].previousPos.pop();
		particles[i].pos = [newX % canvas.width, newY % canvas.height];
		drawParticle(particles[i]);
	}
};
setInterval(update, 50);
