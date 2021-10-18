var capture;
var index;
var macImg;

let imgList;
let videoScale = 200;
let cols, rows;
 let xOffset = 17
  let yOffset = 26

// 在多个不同显示器显示
// 在多个相同显示器显示
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0); 
  capture = createCapture(VIDEO); 
  capture.size(width/videoScale, height/videoScale);
  capture.hide(); 
  macImg = loadImage('images/mac.png');
  console.log(macImg)



  columns = windowWidth/videoScale; // Initialize columns
  rows = windowHeight/videoScale; // Initialize rows

}
 
function draw() { 

  // image(video, 0, 200, width/2, height/2); //video on canvas, position, dimensions
  translate(-width/2,-height/2); // move to far corner
  // scale(-1.0,1.0);    // flip x-axis backwards
  // image(video, 0, 200, width/2, height/2); //video on canvas, position, dimensions
  // drawCapture(width / 2, 280, 6)

  for (var i = 0; i < columns; i++) {
    for (var j = 0; j < rows; j++) {

      // defining x and y as 
      let x = i*videoScale;
      let y = j*videoScale;
      // fill(0);
      // stroke(1);
      // For every column and row, a rectangle is drawn at an (x,y) location scaled and sized by videoScale.
      // rect(x, y, videoScale, videoScale);
      // vertices(x + videoScale, y + videoScale, 60, 20);
      // fill(255, 30);
      // texture(capture)
      push();
      rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
    image(macImg, x, y, macImg.width/columns, macImg.height/columns); //video on canvas, position, dimensions

    image(capture, x+xOffset, y+yOffset, macImg.width/columns - xOffset * 2, macImg.height/columns - yOffset * 2); //video on canvas, position, dimensions
 pop();
      //noLoop();
    }
  }
}
function drawCapture(x, radius, level) {
  // 'level' is the variable that terminates the recursion once it reaches 
  // a certain value (here, 1). If a terminating condition is not 
  // specified, a recursive function keeps calling itself again and again
  // until it runs out of stack space - not a favourable outcome! 
  // const tt = (126 * level) / 4.0;
  // fill(tt);
  // ellipse(x, height / 2, radius * 2, radius * 2);
  // push();
  // texture(capture);
  let xOffset = 17
  let yOffset = 26
  image(macImg, 0, 0, macImg.width/3, macImg.height/3); //video on canvas, position, dimensions
  image(capture, xOffset, yOffset, macImg.width/3 - xOffset * 2, macImg.height/3 - yOffset * 2); //video on canvas, position, dimensions

  // scale(-1.0,1.0);    // flip x-axis backwards
  // plane(50, 50)
  // pop()


  // if (level > 1) {  
  //   // 'level' decreases by 1 at every step and thus makes the terminating condition
  //   // attainable
  //   level = level - 1;  
  //   drawCapture(x - radius / 2, radius / 2, level);
  //   drawCapture(x + radius / 2, radius / 2, level);
  // }
} 

let lapse = 0;    
function mousePressed(){
// prevents mouse press from registering twice
  if (millis() - lapse > 400){
    save('pix.jpg');
    lapse = millis();
  }
}