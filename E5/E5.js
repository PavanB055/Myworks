let box1 = document.getElementById('box1');

// Text Input
let textInput = document.getElementById('textInput1');
function displayTextValue() {
    box1.innerText = textInput.value;
}

// Number Input
let numInput = document.getElementById('numberInput1');
function numberValue() {
    box1.style.border = numInput.value + "px solid black";
}

// Radio Buttons
let serif = document.getElementById('radioSerif');
function changeFontSerif() {
    box1.style.fontFamily = serif.value;
}

let sans = document.getElementById('radioSans');
function changeFontSans() {
    box1.style.fontFamily = sans.value;
}

let mono = document.getElementById('radioMono');
function changeFontMono() {
    box1.style.fontFamily = mono.value;
}

// Slider Text Size
let sizeSlider = document.getElementById('slider');
function adjustSize() {
    box1.style.fontSize = sizeSlider.value + "px";
}

// Slider RGB
function adjustColor() {
    let R = document.getElementById('R').value;
    let G = document.getElementById('G').value;
    let B = document.getElementById('B').value;
    box1.style.backgroundColor = "rgb(" + R + "," + G + "," + B + ")";
}

// Dropdown Colours
function chooseColor() {
    let dropdown = document.getElementById('dropdown');
    box1.style.backgroundColor = dropdown.value;
}

// Initialize on page load
window.onload = function() {
    displayTextValue();
    numberValue();
    adjustSize();
    adjustColor();
};
