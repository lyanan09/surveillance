let co;
var ran=0;
// let myFont;
var bands = 128;
var r_width;
var val =0, val1 = 255, val2 = 255, val3 = 120;
var xx=0,yy=0;

var XOffset=40,YOffset=40;
var vospeed1=1, vospeed2=100, vospeed3=200, vospeed4=300, moment=2;

var smooth_factor = 0.0;
var amp = 0.25;
var playRate=1;
var ov;
var sc =1;
var mov = 0,vol = 0;
var sh;
var h = 0, f=-0.5,ff=0.5;
let txt=[];
let txtJoin,txtRec;

// textSize(12);
//     textAlign(CENTER,CENTER);
//     // textFont(myFont);
//     fill(255);
//     text("GO TO ORIGINAL URL TO ACTIVATE YOUR CAMERA",width/2,height/2);

let capX= 1, capY= 300;
let capture;
// let img = [];
let fr = 60;
// let interval = 0.1;
let interval = 0.5;
// let saveInterval = 60; 
let saveInterval = 3600; 


function preload() {
  // img[0] = loadImage('webcam.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(10);
    capY = height / 1.5
    fr = width / saveInterval / interval
  // console.log(fr)
    frameRate(fr)
  
    setInterval(mouseClicked, 1000 * saveInterval);

  capture = createCapture(VIDEO);
    capture.size(capX, capY);
    capture.hide();
  }

function draw() {
    // interval = round(width / saveInterval / fr, 1)
  h+= max(xx*10/width,interval ? interval : 0);
  // console.log( interval)
  while(h>width){
    h=-2*capX;
      txtRec = txtJoin;
    f+=0.01;
  }
  
    let x = round(h-capX / 20, 2)
  image(capture, x, (height-capY)/2, capX, capY);
  
  noStroke();
}

function mouseClicked() {
  const timestamp = timestampString();
  saveCanvas("webcamTrace-" + timestamp, "png");
}

function timestampString() {
  return year() + nf(month(), 2) + nf(day(), 2) + "-" + nf(hour(), 2) + nf(minute(), 2) + nf(second(), 2);
}