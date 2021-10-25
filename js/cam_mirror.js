let capture, bgImg, sound, cols, rows, xOffset, yOffset, imgRatio, pg;
let videoScale = 200;

function preload() {
  bgImg = loadImage('assets/mac_1.jpg');
  sound = loadSound('assets/beep.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  capture = createCapture(VIDEO);
  capture.size(width / videoScale, height / videoScale);
  capture.hide();

  imgRatio = bgImg.width / bgImg.height
  xOffset = bgImg.width * 0.018
  yOffset = bgImg.height * 0.016

  cols = int(windowWidth / videoScale);
  rows = int(windowHeight * cols * imgRatio / windowWidth);

  pg = createGraphics(windowWidth / cols, windowHeight / rows);
  pg.noStroke();
}

function draw() {
  background(0);
  noStroke();
  translate(-windowWidth / 2, -windowHeight / 2);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      let x = i ? width / cols * i : 0;
      let y = j ? height / rows * j : 0;

      push();

      pg.image(bgImg, 0, 0, bgImg.width / cols, bgImg.height / cols);
      pg.image(capture, xOffset, yOffset, bgImg.width / cols - xOffset * 2, bgImg.height / cols - yOffset * 2);

      if (frameCount % 100 < 50) {
        pg.fill("#00ff00");
        pg.ellipse(bgImg.width / cols / 2, 4, 4, 4);
      }

      image(pg, x, y);

      pop();
    }
  }

  if (frameCount % 100 == 0) {
    // sound.play();
  }
}

function mouseClicked() {
  const timestamp = timestampString();
  saveCanvas("cam_mirror" + timestamp, "png");
}

function timestampString() {
  return (
    year() + nf(month(), 2) + nf(day(), 2) + "-" + nf(hour(), 2) + nf(minute(), 2) + nf(second(), 2)
  );
}