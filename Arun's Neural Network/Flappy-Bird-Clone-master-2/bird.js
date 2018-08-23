// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY

// Class is exported (eslint flag)
/* exported Bird */
function sig(t) {
    return 1/(1+Math.pow(Math.E, -t));
}
var pipes;
class Bird {
  constructor(brain) {
    this.y = height / 2;
    this.x = 64;

    this.gravity = 0.6;
    this.lift = -5;
    this.velocity = 0;
    this.score=0;
    this.fitness=0;
    if(brain)
    {
      this.brain=brain.copy();
    }
    else
    {
      this.brain =new NeuralNetwork(5,8,2);
    }
    this.icon = birdSprite;
    this.width = 64;
    this.height = 64;
    
  }

  show() {
    // draw the icon CENTERED around the X and Y coords of the bird object
    image(this.icon, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }
  copy() {
    return new NeuralNetwork(this);
  }
  up() {
    this.velocity = this.lift;
  }
  mutate(){
    this.brain.mutate(0.1);
  }
  offScreen()
  {
    return(this.y>height||this.y<0);
  }
  think(pipes){
    //find closest pipe
    let closest=null;
    let closestD=Infinity;
    for( let i=0; i<pipes.length ; i++)
    {
        let d=(pipes[i].x+pipes[i].w)-this.x;
        if(d<closestD && d>0)
        {
            closest=pipes[i];
            closestD=d;
        }
    }
  	//let inputs=[1.0,0.5,0.2,0.3];
 	  let inputs=[];
  	inputs[0]=this.y/height;
  	inputs[1]= closest.top/height;
  	inputs[2]= closest.bottom/height;
  	inputs[3]=closest.x/width;
    inputs[4]=sig(this.velocity);
  	let output=this.brain.predict(inputs);
  	if(output[0] > output[1])
  	{
  		this.up();
  	}
  }

  update() {
    this.score++;
    this.velocity += this.gravity;
    this.y += this.velocity;

    /*if (this.y >= height - this.height / 2) {
      this.y = height - this.height / 2;
      this.velocity = 0;
    }

    if (this.y <= this.height / 2) {
      this.y = this.height / 2;
      this.velocity = 0;
    }*/
  }
}