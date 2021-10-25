let classifier;
let capture;
let msg = '';
let result_print;

let capX = 1,
  capY = 300;
let h = 0,
  xx = 0,
  yy = 0;


const myVoice = new p5.Speech();

function preload() {
  classifier = ml5.imageClassifier('MobileNet');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0)
  capY = height
  // capY = height / 1.5

  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide();


  classifier.classify(capture, 100, gotResult);
  // classifier.classify(video, gotResult);

}

function draw() {
  textSize(24);

  // text("I see",width / 2,(height-capY) / 4);

  fill(0, 255, 0);
  textSize(12);
  text(msg, random(width), random(height));

  h += max(xx * 10 / width, 0.5);
  while (h > width) {
    h = -2 * capX;
  }

  image(capture, h - capX / 2, (height - capY) / 2, capX, capY);

  noStroke();


}

function mouseClicked() {
  const timestamp = timestampString();
  saveCanvas("webcam_trace_sound_" + timestamp, "png");
}

function timestampString() {
  return year() + nf(month(), 2) + nf(day(), 2) + "-" + nf(hour(), 2) + nf(minute(), 2) + nf(second(), 2);
}

function gotResult(err, results) {
  result_print = results
  if (err) {
    console.error(err);
    msg = err;
  }
  msg = '';
  for (let i = 0; i < results.length; i++) {
    msg = results[i].label + '';
    myVoice.speak(`I see ${results[i].label}`);

  }
  classifier.classify(capture, 100, gotResult);
  // classifier.classify(video, gotResult);        
}