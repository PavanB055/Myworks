function setup() {
  const canvas = createCanvas(400, 150);
  canvas.parent("canvas-container");
}

function draw() {
  background(20);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Live Data Feed (p5.js)", width / 2, height / 2);
}
