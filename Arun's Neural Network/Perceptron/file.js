var points=[];
function preload()
{
	dotSprite = loadImage('dot.png');
	hollowSprite=loadImage('dot1.png');
	greenSprite=loadImage('green.png');
}
function setup()
{

	var height=1000;
	var width=1000;
	createCanvas(width,height);
	for(var i=0;i<100;i++)
	{
		points[i]= new Point(width,height);
		points[i].show();
	}
	line(0,0,width,height);
	line(height/2,height,height/2,0);
	line(0,height/2,height,height/2);
	//l//ine(500,500,1000,0);
	var inputs=[];
	inputs[0]=-1;
	inputs[1]=0.5;
	var p= new Perceptron(inputs);
	for(var i=0;i<points.length;i++)
	{
		inputs[0]=points[i].x+height/2;
		inputs[1]=points[i].y+height/2;
		p.train(inputs,points[i].label);
		if(p.guess(inputs)===points[i].label)
		{
			//console.log("Guessed Correctly")
			image(greenSprite, points[i].x - 8, points[i].y - 8, 16, 16);
		}
		else
		{
			console.log('Youre Off');
		}

	}
	console.log("trained");
	
}