// Function to toggle div1 visibility
function toggleDiv1() {
    var div1 = document.getElementById("div1");
    if (div1.style.display === "none") {
        div1.style.display = "block"; // Show div1
    } else {
        div1.style.display = "none"; // Hide div1
    }
}

// Function to toggle div2 visibility
function toggleDiv2() {
    var div2 = document.getElementById("div2");
    if (div2.style.display === "none") {
        div2.style.display = "block"; // Show div2
    } else {
        div2.style.display = "none"; // Hide div2
    }
}

// Ensure div1 and div2 are visible by default when the page loads
window.onload = function() {
    document.getElementById("div1").style.display = "block";
    document.getElementById("div2").style.display = "block";
};
