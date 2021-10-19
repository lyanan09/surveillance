let myShader;
let noiseList=[];
let cam;
var sphereList = []
var s_size = 60
var s_count = 3


function preload() {
  myShader = loadShader("shader/cam_generative.vert", "shader/cam_generative.frag");
  // noise = loadImage("images/img-6.png");
  for (var i = 1; i < 7; i++) {
    let noise = loadImage("./images/img-"+i+".png");
    noiseList.push(noise)
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);
  cam.hide();

  for (let i = 0; i < s_count; i++){
    let x = s_size * i * 3
    // let x = random(width)
    let y = 0
    // let y = random(height)
    let z = 0
    // let z = random(-500,500)
    let si = new SingleSphere(x, y, z, random(noiseList))
    sphereList.push(si)
  }
}

function draw() {
  background(0);
  shader(myShader);
  // myShader.setUniform("uFrameCount", frameCount);
  // myShader.setUniform("uNoiseTexture", cam);
  // myShader.setUniform("uNoiseTexture", noise);
  // rotateX(frameCount * 0.01);
  // rotateY(frameCount * 0.005);
  // sphere(height / 4, 100, 100);
  sphereList.map((item, index) => {
    // rotateZ(frameCount * 0.001);
    // rotateX(frameCount * 0.001);
    // rotateY(frameCount * 0.001);
    // img.move()
    

    item.getShader()
    push();
    item.show()
    pop();
    push();
    item.invert()
    pop();
    
    

    // image(img, numRandom[index], numRandom[index], img.width/imgScale, img.height/imgScale)
  })
}

class SingleSphere {
  constructor(x,y,z,img) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.noise = img
  }

  getShader() {
    myShader.setUniform("uFrameCount", frameCount * 0.1);
    // myShader.setUniform("uNoiseTexture", cam);
    myShader.setUniform("uNoiseTexture", this.noise);
    // rotateX(frameCount * 0.01);
    // rotateY(frameCount * 0.005);
  }
  
  show() {
    // push();

    translate(this.x, this.y, this.z)
    
    // rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.005);
    sphere(s_size, 160, 10);
    // pop();

  }

  invert() {
    // push();

    translate(this.x, this.y + s_size * 4, this.z)
    // rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.005);
    // rotate(PI);
    scale(1, -1)
    sphere(s_size, 160, 10);
    // filter(BLUR, 3);
    // pop();

  }
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
