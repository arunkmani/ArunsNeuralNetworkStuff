let r,g,b;
let brain;
let which="black";
function setup()
{
	createCanvas(900,900);
	noLoop();
	brain= new NeuralNetwork(3,3,2);
	for(let i=0;i<10000;i++)
	{
		let r=random(255);
		let g=random(255);
		let b=random(255);
		let targets=trainColor(r,g,b); 
		let inputs=[r/255,g/255,b/255];
		brain.train(inputs,targets);
	}
	pickColor();
	
}
function pickColor()
{
	r=random(255);
	g=random(255);
	b=random(255);
	redraw();
}

function mousePressed()
{
	/*let targets;
	if(mouseX>width/2)
	{
		targets=[0,1];
	}
	else
	{
		targets=[1,0];
	}
	let inputs=[r/255,g/255,b/255];
	brain.train(inputs,targets);*/
	pickColor();
}
function trainColor(r,g,b)
{
	if(r+g+b>300)
	{
		return [1,0];
	}
	else
	{
		return [0,1];
	}
}
function colorPredictor(r,g,b)
{
	console.log(floor(r+g+b));
	let inputs=[r/255,g/255,b/255];
	let output= brain.feedforward(inputs);
	//console.log(output);
	if(output[0]>output[1])
	{
		return "black";
	}
	else
	{
		return "white";
	}
}
function draw()
{
	background(r,g,b);
	strokeWeight(4);
	stroke(0);
	line(width/2,0,width/2,height);
	textSize(64);
	noStroke();
	fill(0);
	textAlign(CENTER,CENTER);
	text("Black",150,400);
	fill(255);
	text("White",650,400);
	//line()
	let which=colorPredictor(r,g,b);
	if(which==="black")
	{
		fill(0);
		ellipse(150,330,60);
	}
	else
	{
		fill(255);
		ellipse(650,330,60);
	}
}