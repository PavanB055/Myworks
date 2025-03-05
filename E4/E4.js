// Toggle function for Div 1 (Button 1 - using inline onclick attribute)
function toggleDiv1() {
  let div1 = document.getElementById("div1");
  div1.classList.toggle("hidden");
}

// Toggle function for Div 2 (Button 2 - using event listener)
document.getElementById("btn2").addEventListener("click", function () {
  let div2 = document.getElementById("div2");
  div2.classList.toggle("hidden");
});

