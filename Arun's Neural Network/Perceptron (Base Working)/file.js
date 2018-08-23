var points=[];
function preload()
{
	dotSprite = loadImage('dot.png');
	hollowSprite=loadImage('dot1.png');
	greenSprite=loadImage('green.png');
}
function setup()
{

	var height=700;
	var width=700;
	createCanvas(width,height);
	for(var i=0;i<100;i++)
	{
		points[i]= new Point(width,height);
		points[i].show();
	}
	line(0,0,width,height);
	var inputs=[];
	inputs[0]=-1;
	inputs[1]=0.5;
	var p= new Perceptron(inputs);
	for(var i=0;i<points.length;i++)
	{
		inputs[0]=points[i].x;
		inputs[1]=points[i].y;
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