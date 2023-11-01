var size = 20;
var pos = [0, 0];
var velocity = [0, 0];
var mousePos = [0, 0];
var height;
var width;
var particles = [];
var context;
var numParticles = 100;
var maxInitalSpeed = 5;
var maxSpeed = 10;
var nConnections = 7;
var container;
var initalHeight;
heightMax = 0.5;
window.onresize = function () {
	if (canvas.width != document.body.clientWidth)
		canvas.width = document.body.clientWidth;
	if (initalHeight > window.innerHeight * heightMax)
		height = canvas.height = window.innerHeight * heightMax;
	for (var i = 0; i < particles.length; i++) {
		drawParticle(particles[i]);
		drawConnections(particles[i]);
	}
};
window.onload = function () {
	console.log("loaded");

	var canvas = document.getElementById("canvas");
	container = document.getElementsByClassName("relative-container");
	var color = "#3ea9e7";
	initalHeight = height = canvas.height = window.innerHeight * heightMax;
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
				nearest: [],
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
	mousePos[1] = e.clientY;
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
	if (Math.abs(particle.velocity[0]) > maxSpeed) {
		particle.velocity[0] =
			(maxSpeed * particle.velocity[0]) / Math.abs(particle.velocity[0]);
	}
	if (Math.abs(particle.velocity[1]) > maxSpeed) {
		particle.velocity[1] =
			(maxSpeed * particle.velocity[1]) / Math.abs(particle.velocity[1]);
	}
}
function addNNearestConnections() {
	for (var i = 0; i < particles.length; i++) {
		var tempConnections = [];
		for (var j = 0; j < particles.length; j++) {
			var distance = calcDistance(particles[i], particles[j]);
			var idex = findLoc(distance, tempConnections, tempConnections.length);
			tempConnections.splice(idex, 0, [distance, j]);
		}
		tempConnections = tempConnections.map((element) => {
			return element[1];
		});
		var j = 0;
		while (j < tempConnections.length && tempConnections > nConnections) {
			if (particles[tempConnections[j]].nearest.includes(i)) {
				tempConnections.pop(j);
				j--;
				if (tempConnections.length == 0) break;
			}
			j++;
		}
		particles[i].nearest = tempConnections.splice(0, nConnections);
	}
}
function findLoc(el, arr, en) {
	en = en || arr.length;
	for (i = 0; i < arr.length; i++) {
		if (arr[i][0] > el) return i;
	}
	return en;
}
function calcDistance(p1, p2) {
	return Math.sqrt((p1.pos[0] - p2.pos[0]) ** 2 + (p1.pos[1] - p2.pos[1]) ** 2);
}
function drawConnections(particle) {
	for (var i = 0; i < particle.nearest.length; i++) {
		context.beginPath();
		context.strokeStyle = "#3ea9e7";
		context.moveTo(particle.pos[0], particle.pos[1]);
		var tempParticle = particles[particle.nearest[i]];
		context.lineTo(tempParticle.pos[0], tempParticle.pos[1]);
		context.stroke();
	}
}
update = function () {
	context.clearRect(0, 0, canvas.width, canvas.height);
	addNNearestConnections();

	for (var i = 0; i < particles.length; i++) {
		accelerate(particles[i]);
		var newX = particles[i].pos[0] + particles[i]["velocity"][0];
		var newY = particles[i].pos[1] + particles[i]["velocity"][1];
		if (newX < 0 || newX > canvas.width) {
			particles[i].velocity[0] = -particles[i].velocity[0];
			newX = particles[i].pos[0] + particles[i]["velocity"][0];
		}
		if (newY < 0 || newY > canvas.height) {
			particles[i].velocity[1] = -particles[i].velocity[1];
			newY = particles[i].pos[1] + particles[i]["velocity"][1];
		}
		particles[i].previousPos.unshift([
			particles[i].pos[0],
			particles[i].pos[1],
		]);
		if (particles[i].previousPos.length >= 4) particles[i].previousPos.pop();
		particles[i].pos = [newX, newY];
	}
	for (var i = 0; i < particles.length; i++) {
		drawParticle(particles[i]);
		drawConnections(particles[i]);
	}
};
setInterval(update, 50);
