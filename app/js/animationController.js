
var modal = document.getElementById('firstLaunchModal');

var openModalBtn = document.getElementById("openModalBtn");

var closeModalBtn = document.getElementById("closeModalBtn");

closeModalBtn.onclick = function() {
	modal.style.display = "none";
}

openModalBtn.onclick = function() {
	modal.style.display = "block";
}
