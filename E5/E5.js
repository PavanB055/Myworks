document.getElementById("textInput").addEventListener("input", function() {
  document.getElementById("styledDiv").textContent = this.value || "Hello!";
});

document.getElementById("borderInput").addEventListener("input", function() {
  document.getElementById("styledDiv").style.borderWidth = this.value + "px";
});

document.getElementById("widthSlider").addEventListener("input", function() {
  document.getElementById("styledDiv").style.width = this.value + "px";
});

document.getElementById("fontSelect").addEventListener("change", function() {
  document.getElementById("styledDiv").style.fontFamily = this.value;
});