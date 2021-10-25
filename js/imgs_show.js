let imgList = [];
let imgScale = 5;
let floatImgs = [];

function preload() {
  for (var i = 1; i < 17; i++) {
    let img = loadImage("./assets/img-" + i + ".jpg");
    imgList.push(img)
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  for (let i = 0; i < 100; i++) {
    let vector = createVector(random(-width, width), random(-height, height), random(-frameCount * 0.01, frameCount * 0.01));

    let fi = new FloatImg(vector, random(imgList))
    floatImgs.push(fi)
  }
}

function draw() {
  background(0);
  orbitControl();
  floatImgs.map((img, index) => {
    img.move()
  })
}

function mouseClicked() {
  const timestamp = timestampString();
  saveCanvas("userPortrait-" + timestamp, "png");
}

class FloatImg {
  constructor(vector, img) {
    this.x = vector.x;
    this.y = vector.y;
    this.z = vector.z;
    this.image = img
  }

  show() {
    image(this.image, this.x, this.y, this.r, this.r)

  }

  move() {
    rotateX(this.x + frameCount * 0.0001);
    rotateY(this.y + frameCount * 0.0001);
    // rotateX(this.x + frameCount * 0.0001 + mouseY* 0.001);
    // rotateY(this.y + frameCount * 0.0001 + mouseX* 0.001);
    rotateZ(this.z + frameCount * 0.0001);
    // this.x = this.x + frameCount * 0.001;
    // this.y = this.y + frameCount * 0.001;
    // if(this.image.width > 1000) {
    image(this.image, this.x, this.y, 200, 150)
    // } else {
    // image(this.image, this.x, this.y, this.image.width/5, this.image.height/5) 

    // }
    // image(this.image, this.x, this.y) 

  }
}

function mouseClicked() {
  const timestamp = timestampString();
  saveCanvas("imgs_show_" + timestamp, "png");
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