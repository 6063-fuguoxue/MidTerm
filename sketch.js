let colorR = 255, colorG = 255, colorB = 255;
let BGcolor = 0;
let coverIndex = 0;
let numCovers = 3; 
let img;

function preload() {
  img = loadImage('./mouse.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img.resize(100,100);
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
  arc(windowWidth/5, -sqrt(2)/2*r, 2*r, 2*r, PI/4, PI/4*3, OPEN);
  arc(windowWidth/5, sqrt(2)/2*r, 2*r, 2*r, PI/4*5, PI/4*7, OPEN);
  arc(-windowWidth/5, -sqrt(2)/2*r, 2*r, 2*r, PI/4, PI/4*3, OPEN);
  arc(-windowWidth/5, sqrt(2)/2*r, 2*r, 2*r, PI/4*5, PI/4*7, OPEN);

  // Draw pupils
  fill(colorR,colorG,colorB, 255);
  ellipse(windowWidth/5, 0, (2 - sqrt(2))*r*pupilWidthFactor, (2 - sqrt(2))*r);
  ellipse(-windowWidth/5, 0, (2 - sqrt(2))*r*pupilWidthFactor, (2 - sqrt(2))*r);
}

// Cover 1: Cat's eyes moving with the mouse
function drawCover1() {
  background(255);
  image(img, mouseX, mouseY);
}

function draw() {
  if (coverIndex == 0) {
    drawCover0();
  }
  else if (coverIndex == 1){
    drawCover1();
  } else if (coverIndex == 2) {
    background(255);
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
