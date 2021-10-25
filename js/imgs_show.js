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
  
  for (let i = 0; i < 100; i++){
    let vector = createVector(random(0, width/4), random(0, height/4), random(-frameCount * 0.01,frameCount * 0.01));

    let fi = new FloatImg(vector, random(imgList))
    floatImgs.push(fi)
  }
}

function draw() {
  background(0);
  orbitControl();
  // translate(-width/2,-height/2);
  floatImgs.map((img, index) => {
    // push();
    // rotateZ(frameCount * 0.001);
    // rotateX(frameCount * 0.001);
    // rotateY(frameCount * 0.001);
    // img.show()
    img.move()

    // image(img, numRandom[index], numRandom[index], img.width/imgScale, img.height/imgScale)
    // pop();
  })
}

function mouseClicked() {
  const timestamp = timestampString();
  saveCanvas("userPortrait-" + timestamp, "png");
}

class FloatImg {
  constructor(vector,img) {
    this.x = vector.x;
    this.y = vector.y;
    this.z = vector.z;
    this.image = img 
  }

  show() {
    // rotateX(random(-1, 1));
    // rotateY(random(-1, 1));
    // rotateZ(random(-1, 1));
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
    image(this.image, this.x, this.y, this.image.width/5, this.image.height/5) 
    // image(this.image, this.x, this.y) 

   }
  
  // show() {
    
  //   // stroke(255);
  //   // strokeWeight(4);
  //   // fill(this.brightness,125)
  //   // ellipse(this.x,this.y,this.r*2);
  // }
}
