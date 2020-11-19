let micInput;
let mic;
let micLevel;
let angleEyebrow1 = 10;
let angleEyebrow2 = -10;
let bamYes = false;
let sketchStarted = false;

function setup() {

  var cnv = createCanvas(600, 600);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  angleMode(DEGREES);


  createButton("CLICK HERE TO INITIATE THE AI").mousePressed(startSketch);




}

function startSketch() {

  mic = new p5.AudioIn()
  mic.start();

  sketchStarted = true;
}

function draw() {

  if(sketchStarted) {

    micLevel = mic.getLevel(0.9);

    micInput = map(micLevel, 0, .01, 0, 2.5);

    background(225);

    drawBasicShape();
    drawMask(micInput); // parameter = vertical movement
    drawEyebrow1(angleEyebrow1);
    drawEyebrow2(angleEyebrow2);
    drawEyes();
    drawPupils();

  }



}

function mousePressed() { //tap between eyebrows to change expression


  if (mouseX > width * 0.3 && mouseX < width * 0.7 && mouseY > height * 0.1 && mouseY < height * 0.3) {
    console.log("mouse beep in here");
    angleEyebrow1 = -angleEyebrow1;

  }
  if (mouseX > width * 0.3 && mouseX < width * 0.7 && mouseY > height * 0.1 && mouseY < height * 0.3) {
    console.log("mouse beep in here");
    angleEyebrow2 = -angleEyebrow2;

  }
}

function drawBasicShape() {

  fill(100);
  beginShape();
  vertex(width * .2, height * .15);
  vertex(width * .8, height * .15);
  vertex(width * .2, height * .15);
  vertex(width * .2, height * .7);
  vertex(width * .5, height * .9);
  vertex(width * .8, height * .7);
  vertex(width * .8, height * .15);
  endShape(CLOSE);

  //TOP
  fill(150);
  rect(width * .2, height * .15, width * .6, width * .2);

}

function drawMask(positionShift) {

  push();
  fill(150);
  translate(width * .5, height * .7 + positionShift)
  // rotate(rotation);
  beginShape();
  vertex(width * -.3, height * -.2);
  vertex(width * -.15, height * -.15);
  vertex(width * 0, height * -.2);
  vertex(width * .15, height * -.15);
  vertex(width * .3, height * -.2);
  vertex(width * .3, height * 0);
  vertex(width * 0, height * .2);
  vertex(width * -.3, height * 0);
  endShape(CLOSE);
  pop();
}

function drawEyebrow1(rotation) {
  //EYEBROWS
  fill(100);

  push();
  translate(width * .35, height * .3);
  rotate(rotation);
  rectMode(CENTER);
  rect(0, 0, width * .15, width * .05);
  pop();


}

function drawEyebrow2(rotation) {

  fill(100)

  push();
  translate(width * .65, height * .3);
  rotate(rotation);
  rectMode(CENTER);
  rect(0, 0, width * .15, width * .05);
  pop();

}

function drawEyes() {

  //EYES
  fill(130, 224, 239);
  ellipse(width * .35, width * .45, width * .15);
  ellipse(width * .65, width * .45, width * .15);

}

function drawPupils() {

  //PUPILS
  fill(0);
  ellipse(width * .35, width * .45, width * .1);
  ellipse(width * .65, width * .45, width * .1);
}
