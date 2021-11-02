let capture, bgImg, sound, cols, rows, xOffset, yOffset, imgRatio, pg, sw, sh;
let screenScale = 180;
// let videoScale = 10;
const filterType = ['THRESHOLD', 'GRAY', 'OPAQUE', 'INVERT', 'POSTERIZE', 'ERODE', 'DILATE', 'BLUR']

function preload() {
  bgImg = loadImage('assets/mac_1.jpg');
  // bgImg = loadImage('assets/screen.png');
  sound = loadSound('assets/beep.mp3');
  camShader = loadShader('shader/mosaic.vert', 'shader/mosaic.frag');

}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  capture = createCapture(VIDEO);
  capture.size(windowWidth, windowHeight);
  capture.hide();

  imgRatio = bgImg.width / bgImg.height
  xOffset = bgImg.width * 0.013
  yOffset = bgImg.height * 0.008

  cols = int(windowWidth / screenScale);
  rows = int(windowHeight * cols * imgRatio / windowWidth);
  sw = windowWidth / cols
  sh = windowWidth / rows
  pg = createGraphics(sw, sh);
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

      pg.image(bgImg, 0, 0, windowWidth / cols, windowWidth / cols / imgRatio);

      let n = (mouseX && (mouseX / 50) > 1) ? (mouseX / 50) : 3
      let sx = map(x, 0, windowWidth / cols * (cols - 1), 0, capture.width / n * (n - 1))
      let sy = map(y, 0, windowHeight/ rows * (rows - 1), 0, capture.height / n * (n - 1))
      let c = capture.get(sx, sy, capture.width / n, capture.height / n);
      pg.image(c, xOffset, yOffset, windowWidth / cols - xOffset * 2, windowWidth / cols / imgRatio - yOffset * 2.2);

      // if (frameCount % 20 < 10) {
        pg.fill("#00ff00");
        pg.ellipse(windowWidth / cols / 2, 4, 3, 3);
      // }

      image(pg, x, y);

      pop();
    }
  }
  if (frameCount % 20 == 0) {
    sound.play();
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}