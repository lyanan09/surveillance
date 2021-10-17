let myShader;
let noise;
let cam;

function preload() {
  myShader = loadShader("shader/cam_generative.vert", "shader/cam_generative.frag");
  // noise = loadImage("me.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);
  cam.hide();
}

function draw() {
  background(0);
  shader(myShader);
  myShader.setUniform("uFrameCount", frameCount);
  myShader.setUniform("uNoiseTexture", cam);
  // myShader.setUniform("uNoiseTexture", noise);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.005);
  sphere(height / 4, 100, 100);
}

function mouseClicked() {
  const timestamp = timestampString();
  saveCanvas("userPortrait-" + timestamp, "png");
}

function timestampString() {
  return (
    year() +
    nf(month(), 2) +
    nf(day(), 2) +
    "-" +
    nf(hour(), 2) +
    nf(minute(), 2) +
    nf(second(), 2)
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
