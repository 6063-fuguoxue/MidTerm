// Variables for cover switching
let coverIndex = 0;
let numCovers = 3; 

// Variables for cover 0
let colorR = 255, colorG = 255, colorB = 255;
let BGcolor = 0;

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

// Variables for cover 2
let numDots = 6000; // Define number of dot proposals
let dots = []; // Store non-overlapping dots
// Class of leopard dots
class leopardDot {
  constructor() {
    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.w = int(random(20,150));
    this.h = int(random(20,150));
    this.weight = random(10,20);
    this.start = 0;
    this.stop = random(PI,2*PI);
    this.overlapping = false;
    this.rotateAngle = random(0,2*PI);
  }
  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.rotateAngle);
    strokeWeight(this.weight);
    arc(0, 0, this.w, this.h, this.start, this.stop);
    pop();
  }
}
let patternIndex = 0; // Store current pattern index
let numPatterns = 2; // Need update if add more pattern later

function preload() {
  imgMouse = loadImage('./imgs/mouse.jpg'); // Mouse image for cover 1
  imgPaw = loadImage('./imgs/paw.png'); // Paw image for cover 1
  cover2font = loadFont('./assets/Pigiarniq.ttf'); // Font for cover 2
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initialize variables for cover 1
  r1 = windowWidth/20; // Change r1 to resize the cat face
  pupilD = (2 - sqrt(2))*r1;
  pupilRX0 = r1;
  pupilRX = pupilRX0;
  pupilLX0 = -r1;
  pupilLX = pupilLX0;
  pupilY0 = 0;
  pupilY = pupilY0;
  // Resize images for cover 1
  imgMouse.resize(r1*1.5,r1*1.5);
  imgPaw.resize(r1*2,r1*2);
}

// Cover 1 Functions: Draw a cat with moving pupils
// Function for moving pupils
function drawPupils() {
  // Update the pupils' x-positions
  pupilRX = map(mouseX, 0, windowWidth, pupilRX0-pupilD/2, pupilRX0+pupilD/2);
  pupilLX = map(mouseX, 0, windowWidth, pupilLX0-pupilD/2, pupilLX0+pupilD/2);
  
  // Update the pupils' y-positions
  pupilY = map(mouseY, 0, windowHeight, pupilY0-pupilD/2, pupilY0+pupilD/2);

  // Draw pupils
  ellipse(pupilRX, pupilY, pupilD);
  ellipse(pupilLX, pupilY, pupilD);
}
// Function for drawing cat face
function catFace(r) {
  let noseH = r*0.6;
  let earH1 = 1.3*r;
  let earH2 = 2.3*r;
  let earH3 = r;

  
  strokeWeight(3);
  stroke(0);
  // Draw eye boundaries
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

// Cover 2: Draw patterns
// Function for writing the animal name on canvas
function felineName(x) {
  textAlign(CENTER, CENTER);
  textSize(70);
  textFont(cover2font);
  fill(0);
  stroke(0);
  strokeWeight(1);
  text(x, windowWidth/2, windowHeight-100);
}
// Tiger pattern
function tigerStrip(x,y) {
  beginShape();
  vertex(x, 0); // x = -windowWidth/2, y = windowHeight/2
  bezierVertex(x/2, 0, x/2, y, 0, y);
  bezierVertex(x*2/3, y*4/3, x*2/3, y/3, x, y/3);
  endShape();
}
function tigerPattern() {
  background(216, 152, 72);
  // Print feline name on canvas
  felineName("Tiger");
  // Draw tiger strips to form a pattern
  push();
  translate(windowWidth/2,0);
  tigerStrip(-windowWidth/2, windowHeight/2);
  translate(0,-windowHeight/2.5);
  tigerStrip(-windowWidth/2, windowHeight/2);
  pop();
  
  push();
  translate(windowWidth/2,-windowHeight/3);
  tigerStrip(windowWidth/2, windowHeight/2);
  translate(0,windowHeight/2);
  tigerStrip(windowWidth/2, windowHeight/2);
  pop();

  push();
  translate(windowWidth/4, windowHeight/2);
  tigerStrip(-windowWidth/4, windowHeight/4);
  translate(windowWidth/2, windowHeight/4);
  tigerStrip(windowWidth/4, windowHeight/4);
  // beginShape();
  // vertex(-windowWidth/2, 0);
  // bezierVertex(windowWidth/8-windowWidth/2, 0, windowWidth/8-windowWidth/2, windowHeight/4, -windowWidth/4, windowHeight/4);
  // bezierVertex(windowWidth/12-windowWidth/2, windowHeight/3, windowWidth/12-windowWidth/2, windowHeight/12, -windowWidth/2, windowHeight/12);
  // endShape();
  pop();
}

// Amur leopard pattern
function leopardPattern() {
  background(241,242,240);

  // Draw leopard dots
  stroke(144,104,72,180);
  // strokeWeight(10);
  noFill();
  randomSeed(1100);

  for (let n=0; n<numDots; n++) { // Get n number of dot proposals
    // generate a dot at random position
    let dot = new leopardDot;
    // If this is not the first dot, we need to check it against each of the previous circles
    if (dots.length != 0){ 
      for (let i=0; i<dots.length; i++) {
        // Get a previous circle from the list
        prevDot = dots[i]; 
        // Get the distance between the current and previous dots
        let d = dist(dot.x, dot.y, prevDot.x, prevDot.y);
        if (d < (max(dot.w, dot.h) + max(prevDot.w, prevDot.h))) {
          dot.overlapping = true;
          break;
        }
      }
    }
    // If no overlapping after checking, then draw the circle and add it to the list
    if (!dot.overlapping) {
        dots.push(dot);
    }
  }
  
  for (let m=0; m<dots.length; m++){
    dots[m].draw();
  }
  print("Number of dots: ", dots.length);

  felineName("Amur Leopard");
}

// Draw the yellow boundary
function drawBoundary() {
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
  // Draw the yellow boundary
  drawBoundary();

  // Draw a mouse at the mouse position
  imageMode(CENTER);
  image(imgMouse, mouseX, mouseY);
}

// Cover 2: Different feline animals' fur patterns
function drawCover2() {
  switch (patternIndex) {
    case 0: 
      tigerPattern();
      break;
    case 1: 
      leopardPattern();
      break;
  }
  // Draw the yellow boundary
  drawBoundary();  
}

function draw() {
  switch (coverIndex) {
    case 0: 
      drawCover0();
      break;
    case 1: 
      drawCover1();
      break;
    case 2: 
      drawCover2();
      break;
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
  // print(coverIndex);
}

// Handle mouse click events
function mouseClicked() {
  switch (coverIndex) {
    case 0: break; // Do nothing
    case 1: 
      // Push a paw to the paws[] list
      pawX = mouseX;
      pawY = mouseY;
      paw = new Paw(imgPaw, pawX, pawY);
      paws.push(paw);
      break;
    case 2: 
      // Change pattern
      if (patternIndex < numPatterns - 1) {
        patternIndex += 1;
      } else {
        patternIndex = 0;
      }
      break;
  }
}