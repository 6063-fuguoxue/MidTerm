let colorR = 255, colorG = 255, colorB = 255;
let BGcolor = 0;
let coverIndex = 0;
let numCovers = 3; 

// Variables for cover 1
let imgMouse;
let r1; // radius of cat eyes
let pupilLX, pupilRX, pupilY, pupilD, pupilLX0, pupilRX0, pupilY0;
let drawPaw = false;
let pawTimer;
let pawX, pawY;
let paw;
let paws=[];

class Paw {
  constructor(_img, _x, _y) {
    this.img = _img; 
    this.x = _x;
    this.y = _y;
    this.timer = 0;
  }
  update() {
    this.timer += 1;
  }
  draw() {
    image(this.img, this.x, this.y);
  }
}

// TODO: objects of patterns for Cover 2
// let tigerPattern = {
//   pColor: 0,
//   x: 0,
//   y: 0
// }


function preload() {
  imgMouse = loadImage('./mouse.jpg');
  imgPaw = loadImage('./paw.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imgMouse.resize(windowHeight/8,windowHeight/8);
  imgPaw.resize(windowHeight/10,windowHeight/10);

  // Set up variable for cover 1
  r1 = windowWidth/40;
  pupilD = (2 - sqrt(2))*r1;
  pupilRX0 = r1;
  pupilRX = pupilRX0;
  pupilLX0 = -r1;
  pupilLX = pupilLX0;
  pupilY0 = 0;
  pupilY = pupilY0;
}

function drawPupils() {
  // Update the pupils' x-positions
  pupilRX = map(mouseX, 0, windowWidth, pupilRX0-pupilD/2, pupilRX0+pupilD/2);
  pupilLX = map(mouseX, 0, windowWidth, pupilLX0-pupilD/2, pupilLX0+pupilD/2);
  
  // Update the pupils' y-positions
  pupilY = map(mouseY, 0, windowHeight, pupilY0-pupilD/2, pupilY0+pupilD/2);

  ellipse(pupilRX, pupilY, pupilD);
  ellipse(pupilLX, pupilY, pupilD);
}

function catFace(r) {
  let noseH = r*0.6;
  let earH1 = 1.3*r;
  let earH2 = 2.3*r;
  let earH3 = r;

  // Draw eye boundaries
  strokeWeight(3);
  stroke(0);
  // noFill();
  // arc(r, -sqrt(2)/2*r, 2*r, 2*r, PI/4, PI/4*3, OPEN);
  // arc(r, sqrt(2)/2*r, 2*r, 2*r, PI/4*5, PI/4*7, OPEN);
  // arc(-r, -sqrt(2)/2*r, 2*r, 2*r, PI/4, PI/4*3, OPEN);
  // arc(-r, sqrt(2)/2*r, 2*r, 2*r, PI/4*5, PI/4*7, OPEN);
  // Draw pupils
  fill(0);
  drawPupils();

  // Draw nose
  fill('pink');
  stroke('pink');
  ellipse(0, noseH, noseH, noseH/3);

  // Draw ears
  fill(0);
  stroke(0);
  line(0.8*r, -earH1, 1.5*r, -earH2);
  line(1.5*r, -earH2, (sqrt(2)/2 + 1.2)*r, -earH3);

  line(-0.8*r, -earH1, -1.5*r, -earH2);
  line(-1.5*r, -earH2, -(sqrt(2)/2 + 1.2)*r, -earH3);


  // Draw beards
  noFill();
  stroke(0);
  bezier((sqrt(2)/2 + 1.2)*r, 0.5*noseH, (sqrt(2)/2 + 2)*r, 0, (sqrt(2)/2 + 2.8)*r, noseH*0.6, (sqrt(2)/2 + 3)*r, noseH*1);
  bezier(-(sqrt(2)/2 + 1.2)*r, 0.5*noseH, -(sqrt(2)/2 + 2)*r, 0, -(sqrt(2)/2 + 2.8)*r, noseH*0.6, -(sqrt(2)/2 + 3)*r, noseH*1);

  bezier((sqrt(2)/2 + 1.3)*r, noseH*0.9, (sqrt(2)/2 + 2)*r, 0.6*noseH, (sqrt(2)/2 + 2.8)*r, noseH*1.2, (sqrt(2)/2 + 3.2)*r, noseH*2);
  bezier(-(sqrt(2)/2 + 1.3)*r, noseH*0.9, -(sqrt(2)/2 + 2)*r, 0.6*noseH, -(sqrt(2)/2 + 2.8)*r, noseH*1.2, -(sqrt(2)/2 + 3.2)*r, noseH*2);

  bezier((sqrt(2)/2 + 1.2)*r, noseH*1.3, (sqrt(2)/2 + 2)*r, 1.2*noseH, (sqrt(2)/2 + 2.5)*r, noseH*1.8, (sqrt(2)/2 + 3)*r, noseH*3);
  bezier(-(sqrt(2)/2 + 1.2)*r, noseH*1.3, -(sqrt(2)/2 + 2)*r, 1.2*noseH, -(sqrt(2)/2 + 2.5)*r, noseH*1.8, -(sqrt(2)/2 + 3)*r, noseH*3);
}

function drawBoundary() {
  // Draw the yellow boundary
  strokeWeight(80);
  stroke(255, 206, 0);
  noFill();
  rect(0, 0, windowWidth, windowHeight);
}
// Cover 0: Cat's eyes changing with time
function drawCover0() {
  h = hour();
  m = minute();
  s = second();

  // Time controls colors on canvas
  colorR = map(h, 0, 23, 255, 0); 
  colorG = map(m, 0, 59, 255, 0); 
  colorB = map(s, 0, 59, 255, 0); 
  // Background change color based on hour
  if (h<12) {
    BGcolor = map(colorR, 0, 255, 510, 0);
  } else {
    BGcolor = map(colorR, 0, 255, 0, 510);
  }
  background(BGcolor);

  // Draw the yellow boundary
  drawBoundary();

  // Pupil width change based on hour
  let pupilWidthFactor;
  if (h<12) {
    pupilWidthFactor = map(h, 0, 11, 1, 0.2);
  } else {
    pupilWidthFactor = map(h, 12, 23, 0.2, 1);
  }
  
  strokeWeight(5);
  // Set stroke color
  stroke(colorR,colorG,colorB);
  // Fill the eye with the complementary color of the stroke's color
  fill(255 - colorR, 255 - colorG, 255 - colorB, 125); 

  // Translate the canvas
  translate(windowWidth/2, windowHeight/2);
  let r = windowWidth/5;

  // Draw eye boundaries
  arc(r, -sqrt(2)/2*r, 2*r, 2*r, PI/4, PI/4*3, OPEN);
  arc(r, sqrt(2)/2*r, 2*r, 2*r, PI/4*5, PI/4*7, OPEN);
  arc(-r, -sqrt(2)/2*r, 2*r, 2*r, PI/4, PI/4*3, OPEN);
  arc(-r, sqrt(2)/2*r, 2*r, 2*r, PI/4*5, PI/4*7, OPEN);

  // Draw pupils
  fill(colorR,colorG,colorB, 255);
  ellipse(r, 0, (2 - sqrt(2))*r*pupilWidthFactor, (2 - sqrt(2))*r);
  ellipse(-r, 0, (2 - sqrt(2))*r*pupilWidthFactor, (2 - sqrt(2))*r); 
}

// Cover 1: Cat's eyes moving with the mouse
function drawCover1() {
  background(255);
  
  imageMode(CENTER);
  image(imgMouse, mouseX, mouseY);
  // Draw the yellow boundary
  drawBoundary();

  // Draw cat face
  push();
  translate(windowWidth/2, windowHeight/2);
  catFace(r1);
  pop();

  // Draw a paw upon mouse click
  if (paws.length != 0) {
    for (let i=0; i<paws.length; i++) {
      if (paws[i].timer < 100) {
        paws[i].draw();
      }
      paws[i].update();
    }
  }  
}

function drawCover2() {
  background(255);
  // Draw the yellow boundary
  drawBoundary();
}

function draw() {
  if (coverIndex == 0) {
    drawCover0();
  }
  else if (coverIndex == 1){
    drawCover1();
  } else if (coverIndex == 2) {
    drawCover2();
  }

}

// Press left arrow key or right arrow key to change cover
function keyPressed() {
  // If left arrow key is pressed, go to previous cover in the cover list
  if (keyCode === LEFT_ARROW) {
    if (coverIndex > 0) {
      coverIndex -= 1;
    } else {
      coverIndex = numCovers - 1;
    }    
  }
  // If left arrow key is pressed, go to next cover in the cover list
  if (keyCode === RIGHT_ARROW) {
    if (coverIndex < numCovers - 1) {
      coverIndex += 1;
    } else {
      coverIndex = 0;
    }   
  }
  print(coverIndex);
}

function mouseClicked() {
  if (coverIndex == 0) {
    // Do nothing
  }
  else if (coverIndex == 1){
    // Push a paw to the paws[] list
    pawX = mouseX;
    pawY = mouseY;
    paw = new Paw(imgPaw, pawX, pawY);
    paws.push(paw);
  } else if (coverIndex == 2) {
    // Change pattern
  }
}