let idex = 0;
const groups = document.getElementsByClassName("card-Group");

function handleRight() {
	const nextIdex = idex + 1 <= groups.length - 1 ? idex + 1 : 0;
	const currentGroup = document.querySelector(`[data-index="${idex}"]`),
		nextGroup = document.querySelector(`[data-index="${nextIdex}"]`);
	currentGroup.dataset.status = "after";
	nextGroup.dataset.status = "activatingLeft";
	setTimeout(() => {
		nextGroup.dataset.status = "active";
		idex = nextIdex;
	});
}
function handleLeft() {
	const nextIdex = idex - 1 >= 0 ? idex - 1 : groups.length - 1;
	const currentGroup = document.querySelector(`[data-index="${idex}"]`),
		nextGroup = document.querySelector(`[data-index="${nextIdex}"]`);
	currentGroup.dataset.status = "before";
	nextGroup.dataset.status = "activatingRight";
	setTimeout(() => {
		nextGroup.dataset.status = "active";
		idex = nextIdex;
	});
}
function maximize() {
	const currentGroup = document.querySelector(`[data-index="${idex}"]`);
	document.body.className = "stopScroll";
	currentGroup.dataset.status = "maximized";
	console.log("maximized");
}
function minimize(event) {
	const currentGroup = document.querySelector(`[data-index="${idex}"]`);
	currentGroup.dataset.status = "active";
	document.body.className = "";
	console.log("minimized");
	event.stopPropagation();
}
