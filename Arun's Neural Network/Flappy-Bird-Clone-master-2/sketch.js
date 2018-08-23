
var bird;
const TOTAL=500;
let birds=[];
let savedBirds=[];
var pipes;
var counter=0;
var parallax = 0.8;
var score = 0;
var gen=0;
var maxScore = 0;
var birdSprite;
var pipeBodySprite;
var pipePeakSprite;
var bgImg;
var bgX;
var gameoverFrame = 0;
var isOver = false;
var cycles=100;
var slider;
var topscore;
var pointer;
var flag=0;
var brainJSON;

var touched = false;
var prevTouched = touched;
function luckyOne()
{
   var fit=savedBirds[0].fitness;
   for(pointer=1;pointer<savedBirds.length;pointer++)
   {
      if(savedBirds[pointer].fitness>fit)
      {
        topscore=savedBirds[pointer];
        
      }
      else
      {
        topscore=savedBirds[0].fitness;
      }
   }
   console.log("hightest fitness is"+topscore.fitness);
   
}
function keyPressed()
{
  if(key ==='S')
  {
    let bird= savedBirds[0];
    //let json=JSON.stringify(bird.brain);
    //console.log(json);
    saveJSON(bird.brain,'bird.json');
  }
}


function preload() {
  pipeBodySprite = loadImage('graphics/pipe_marshmallow_fix.png');
  pipePeakSprite = loadImage('graphics/pipe_marshmallow_fix.png');
  birdSprite = loadImage('graphics/train.png');
  bgImg = loadImage('graphics/background.png');
}

function setup() {
  createCanvas(800, 600);
  slider=createSlider(1,100,1);
  for(let i=0;i<TOTAL;i++)
  {
  	birds[i] = new Bird();
  }
  reset();
}

function draw() {
  for( let n=0;n<slider.value();n++)
  {
  	background(0);
  if (counter % 100 == 0) {
    pipes.push(new Pipe());
  }
  counter++;
  // Draw our background image, then move it at the same speed as the pipes
  image(bgImg, bgX, 0, bgImg.width, height);
  bgX -= pipes[0].speed * parallax;

  // this handles the "infinite loop" by checking if the right
  // edge of the image would be on the screen, if it is draw a
  // second copy of the image right next to it
  // once the second image gets to the 0 point, we can reset bgX to
  // 0 and go back to drawing just one image.
  if (bgX <= -bgImg.width + width) {
    image(bgImg, bgX + bgImg.width, 0, bgImg.width, height);
    if (bgX <= -bgImg.width) {
      bgX = 0;
    }
  }

  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].update();
    

    if (pipes[i].pass(bird)) {
      score++;
      maxScore = max(score, maxScore);
    }
    for(let j= birds.length-1; j>=0; j--)
    {
    	if (pipes[i].hits(birds[j])) {
      	savedBirds.push(birds.splice(j,1)[0]);
    }

    }
    /*if (pipes[i].hits(bird)) {
      gameover();
    }*/

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }
   for(let inr= birds.length-1; inr>=0; inr--)
    {
      if(birds[inr].offScreen()) {
        savedBirds.push(birds.splice(inr,1)[0]);
    }

    }
  for(let bird of birds){
 	 bird.think(pipes);
    bird.update();
 
   }
   if(birds.length ===0)
   {
      luckyOne();
      counter=0;
      score=0;
      flag=0;
      
      nextGeneration();
      gen++;
      pipes=[];
      /*for(let i=0;i<TOTAL;i++)
      {
        birds[i] = new Bird();
      }*/
   }
	}
   
   for(let bird of birds)
   {
   		bird.show(); 
   }
   for(let pipe of pipes)
   {
   		pipe.show();
   }

  

  showScores();

  // touches is an list that contains the positions of all
  // current touch points positions and IDs
  // here we check if touches' length is bigger than one
  // and set it to the touched var
  touched = (touches.length > 0);

  // if user has touched then make bird jump
  // also checks if not touched before
  if (touched && !prevTouched) {
    bird.up();
  }

  // updates prevTouched
  prevTouched = touched;


}

function showScores() {
  textSize(32);
  text('score: ' + score, 1, 32);
  text('record: ' + maxScore, 1, 64);
  text('Birds Alive: ' + birds.length, 1, 96);
  text('Generation: ' + gen, 1, 128);

}

function gameover() {
  textSize(64);
  textAlign(CENTER, CENTER);
  text('GAMEOVER', width / 2, height / 2);
  textAlign(LEFT, BASELINE);
  maxScore = max(score, maxScore);
  isOver = true;
  noLoop();
}

function reset() {
  isOver = false;
  score = 0;
  bgX = 0;
  pipes = [];
  bird = new Bird();
  //pipes.push(new Pipe());
  gameoverFrame = frameCount - 1;
  loop();
}

/*function keyPressed() {
  if (key === ' ') {
    bird.up();
    if (isOver) reset(); //you can just call reset() in Machinelearning if you die, because you cant simulate keyPress with code.
  }
}*/

function touchStarted() {
  if (isOver) reset();
}