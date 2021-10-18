var imgList = [];
var numRandom = []
let imgScale = 5;

function preload() {
  for (var i = 1; i < 7; i++) {
    let img = loadImage("./images/img-"+i+".png");
    imgList.push(img)
    numRandom.push(random(-50, 50))
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {
  background(0);
  imgList.map((img, index) => {
    console.log(img)
    // push();
    // rotateZ(frameCount * 0.001);
    rotateX(frameCount * 0.001);
    rotateY(frameCount * 0.001);
    image(img, numRandom[index], numRandom[index], img.width/imgScale, img.height/imgScale)
    // pop();
  })
}

function mouseClicked() {
  const timestamp = timestampString();
  saveCanvas("userPortrait-" + timestamp, "png");
}
