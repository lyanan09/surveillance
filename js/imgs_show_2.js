var imgList = [];
let imgScale = 5;
let floatImgs = [];

function preload() {
  for (var i = 1; i < 14; i++) {
    let img = loadImage("./assets/img-"+i+".jpg");
    imgList.push(img)
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0);
  // frameRate(10)
}

function draw(){
  translate(-width/2, -height/2)
  for(let i = 0; i < 6; i++){
    let center = createVector(random(width), random(height));
    let numPetal = int(random(100, 250));
    let img = imgList[i]
    showImg(center, numPetal, img);
  }
}

function showImg(center, numPetal, img){
  for(let i = 0; i < numPetal; i++){
    push();
    // rotate(2 * PI/numPetal * i);
    // image(img, center.x, center.y) 
    image(img, center.x, center.y, img.width/3, img.height/3) 
    pop();
  }
}

function mouseClicked() {
  const timestamp = timestampString();
  saveCanvas("userPortrait-" + timestamp, "png");
}
