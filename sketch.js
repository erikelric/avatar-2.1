let micInput;
let mic;
let micLevel;
let angleEyebrow1 = 10;
let angleEyebrow2 = -10;
let bamYes = false;
let sketchStarted = false;
let mySound = [];
let drawButton = [];
let speech = new p5.Speech();
//This section is part of the chatbot

// mySound = [1, ,2]

function preload() {
  soundFormats("wav")
  mySound[0] = loadSound("assets/1");
  mySound[1] = loadSound("assets/2");
  mySound[2] = loadSound("assets/3");
}

function setup() {

  var cnv = createCanvas(600, 600);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  angleMode(DEGREES);

  let div = createDiv('').size(10, 10);
  div.center();

  //This section stores the elements for the chatbot


  speech.setVoice('');
  console.log(speech.listVoices());

  let bot = new RiveScript();
  bot.loadFile('brain.rive', brainReady, brainError);

  function brainReady() {
    console.log('Chatbot ready!');
    bot.sortReplies();
    let num = floor(random(10)) + 1;
    console.log(num);
    let reply = bot.reply('local-user', 'set ' + num);
  }

  function brainError() {
    console.log('Chatbot error!');
  }

  let button = select('#submit');
  let user_input = select('#user_input');
  let output = select('#output');

  button.mousePressed(chat);

  function chat() {
    let input = user_input.value();
    let reply = bot.reply('local-user', input);
    speech.setRate();
    speech.setPitch(.02);
    speech.speak(reply);
    // output.html(reply);
  }

  //This section is meant to activate the voice recordings
  // drawButton[0] = createButton("Activate Phase 1")
  // drawButton[0].mousePressed(voiceLine1);
  // drawButton[0].position(350, 300);
  //
  // drawButton[1] = createButton("Activate Phase 2")
  // drawButton[1].mousePressed(voiceLine2);
  // drawButton[1].position(350, 350);
  //
  // drawButton[2] = createButton("Activate Phase 3")
  // drawButton[2].mousePressed(voiceLine3);
  // drawButton[2].position(350, 400);

  //This section allows the canvas to initialize
  drawButton[10] = createButton("CLICK HERE TO INITIATE THE AI")
  drawButton[10].mousePressed(startSketch);
  drawButton[10].position(300, 650);

}

function startSketch() {


  mic = new p5.AudioIn()
  mic.start();

  sketchStarted = true;

  if (!mySound[0].isPlaying()) {
    mySound[0].play();
    drawButton[0].html("Deactivate")
  } else {
    mySound[0].pause();
    drawButton[0].html("Activate Phase 1")
  }
}

function draw() {

  if (sketchStarted) {

    micLevel = mic.getLevel(0.9);

    micInput = map(micLevel, 0, .01, 0, 2.5);

    background(222, 222, 222);

    drawBasicShape();
    drawMask(micInput); // parameter = vertical movement
    drawEyebrow1(angleEyebrow1);
    drawEyebrow2(angleEyebrow2);
    drawEyes();
    drawPupils();

  }



}

//This section is where the voice lines are stored as functions
function voiceLine1() {

  if (!mySound[0].isPlaying()) {
    mySound[0].play();
    drawButton[0].html("Deactivate")
  } else {
    mySound[0].pause();
    drawButton[0].html("Activate Phase 1")
  }

}

function voiceLine2() {

  // for (let i = 0; i <mySound.length; i++) {
  //   if (mySound[i].isPLaying()){
  //     mySound[i].stop();
  //   }
  // }

  if (!mySound[1].isPlaying()) {
    mySound[1].play();
    drawButton[1].html("Deactivate")
  } else {
    mySound[1].pause();
    drawButton[1].html("Activate Phase 2")
  }
}

function voiceLine3() {

  if (!mySound[2].isPlaying()) {
    mySound[2].play();
    drawButton[2].html("Deactivate")
  } else {
    mySound[2].pause();
    drawButton[2].html("Activate Phase 3")
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
  fill(
    191, 255, 255
  );
  ellipse(width * .35, width * .45, width * .15);
  ellipse(width * .65, width * .45, width * .15);

}

function drawPupils() {

  //PUPILS
  fill(230, 255, 255);
  ellipse(width * .35, width * .45, width * .1);
  ellipse(width * .65, width * .45, width * .1);
}
