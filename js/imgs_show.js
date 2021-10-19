var imgList = [];
let imgScale = 5;
let floatImgs = [];

function preload() {
  for (var i = 1; i < 7; i++) {
    let img = loadImage("./images/img-"+i+".png");
    imgList.push(img)
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  for (let i = 0; i < 80; i++){
    let x = random(width)
    let y = random(height)
    let r = random(100,200)
    // let kitten = random(kittens)
    let fi = new FloatImg(x,y,r)
    floatImgs.push(fi)
  }
}

function draw() {
  background(0);
  translate(-width/2,-height/2);
  floatImgs.map((img, index) => {
    // push();
    // rotateZ(frameCount * 0.001);
    // rotateX(frameCount * 0.001);
    // rotateY(frameCount * 0.001);
    // img.move()
    img.show()
    // image(img, numRandom[index], numRandom[index], img.width/imgScale, img.height/imgScale)
    // pop();
  })
}

function mouseClicked() {
  const timestamp = timestampString();
  saveCanvas("userPortrait-" + timestamp, "png");
}

class FloatImg {
  constructor(x,y,r,img) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.image = random(imgList) 
  }
  
  clicked(px,py) {
    //let d = dist(x,y,this.x,this.y)
    //if (d < this.r) {
    if (px > this.x && px < this.x + this.r && py > this.y && py < this.y + this.r) {
      this.image = flower//random(kittens)
    }
  }
  
  move() {
    this.x = this.x + random(-5,5);
    this.y = this.y + random(-5,5);
   }
  
  show() {
    rotateZ(frameCount * 0.0001);
    rotateX(frameCount * 0.0001);
    rotateY(frameCount * 0.0001);
    image(this.image, this.x, this.y, this.r, this.r) 
    // stroke(255);
    // strokeWeight(4);
    // fill(this.brightness,125)
    // ellipse(this.x,this.y,this.r*2);
  }
}
