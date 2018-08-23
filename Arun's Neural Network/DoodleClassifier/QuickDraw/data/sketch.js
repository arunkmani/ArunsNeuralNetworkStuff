let planes_data;
let carriers_data;
let fires_data;
let trucks_data;

const len=784;

const total_data=10000;

const CAT=0;
const TRAIN=1;
const RAINBOW=2;
let cats={};
let trains={};
let rainbows={};
let nn;
function draw()
{
	strokeWeight(8);
	stroke(255);
	if(mouseIsPressed)
	{
		line(pmouseX,pmouseY,mouseX,mouseY);//P5 functions pmouse is previous mouse
	}
}
function preload()
{
	cats_data= loadBytes("cat1000.bin");
	trains_data= loadBytes("train1000.bin");
	rainbows_data= loadBytes("rainbow1000.bin");
}
function prepareData(category,data,label)
{
	category.training=[];
	category.testing=[];
	for(let i=0;i<total_data;i++)
	{
		let offset=i*len;
		let threshold=floor(0.8*total_data)
		if(i<threshold)
		{
			category.training[i]=data.bytes.subarray(offset,offset+len);
			category.training[i].label=label;
		}
		else
		{
			category.testing[i-threshold]=data.bytes.subarray(offset,offset+len);
			category.testing[i-threshold].label=label;
		}
	}
}
function trainEpoch(training)
{
	for( let i=0;i<training.length;i++)
	{
		let data=training[i];
		let inputs=data.map(x=>x/255);
		let label=training[i].label;
		let targets=[0,0,0];
		targets[label]=1;
		nn.train(inputs,targets);
	}
}
function testAll(testing)
{
	let correct=0;
	let percentage;
	for( let i=0;i<testing.length;i++)
	{
		let data=testing[i];
		let inputs=[];
		console.log("DATA LENGTH IS"+data.length);
		for(let h=0;h<data.length;h++)
		{
			inputs[h]=data[h]/255;
		}
		//let inputs=data.map(x=>x/255);
		let label=testing[i].label;
		let targets=[0,0,0];
		targets[label]=1;
		let guess=nn.feedforward(inputs);
		//console.log(guess);
		//console.log(label);
		let classification=guess.indexOf(max(guess)); 
		//console.log(classification);
		if(classification===label)
		{
			correct++;
		}
		percentage=correct/testing.length;

	}
	return percentage;
}
function setup()
{
	createCanvas(280,280);
	background(0);
	prepareData(cats,cats_data,CAT);
	prepareData(trains,trains_data,TRAIN);
	prepareData(rainbows,rainbows_data,RAINBOW);
	nn= new NeuralNetwork(784,64,3);
	//console.log("HERES THE LENGTH:"+planes.training.length);
	//Train to learn
	let training=[];
	training=training.concat(cats.training);
	training=training.concat(trains.training);
	training=training.concat(rainbows.training);
	//randomize()
	shuffle(training,true);
	let testing=[];
	testing=testing.concat(cats.testing);
	testing=testing.concat(rainbows.testing);
	testing=testing.concat(trains.testing);

	let trainButton=select('#train');//P5 function
	let epochCounter=0;
	trainButton.mousePressed(function()
		{
			trainEpoch(training);
			epochCounter++;
			console.log("Epoch:"+epochCounter);
		});
	let testButton=select('#test');//P5 function
	testButton.mousePressed(function()
		{
			let percent=testAll(testing);
			console.log("Percent"+percent+"%");
		});
	let clearButton=select('#clear');
	clearButton.mousePressed(function()
	{
		background(0);
	});
	let guessButton=select('#guess');
	guessButton.mousePressed(function()
	{
		let inputs=[];
		let img=get();//grabs all pixels of canvas and makes it a p5 image object
		img.resize(28,28);
		img.loadPixels();
		for(let i=0;i<len;i++)
		{
			let bright=img.pixels[i*4];
			inputs[i]=(bright)/255.0;
		}
		console.log(inputs);
		let guess=nn.feedforward(inputs);
		let m=max(guess);
		let classification=guess.indexOf(m);
		if(classification===CAT)
		{
			console.log("CAT");
		}
		else if(classification===TRAIN)
		{
			console.log("TRAIN");
		}
		else if(classification===RAINBOW)
		{
			console.log("RAINBOW");
		}

	});
	//train
	for(let t=0;t<3;t++)
	{
		shuffle(training,true);
		trainEpoch(training);
	}
	let total=100;
	for(let n=0;n<100;n++)
	{
		let img=createImage(28,28);
		img.loadPixels();
		let offset=n*784;
		for( let i=0;i<784;i++)
		{
			let val=rainbows.testing[n][i];
			img.pixels[i*4+0]=val;
			img.pixels[i*4+1]=val;
			img.pixels[i*4+2]=val;
			img.pixels[i*4+3]=255;
		}
		img.updatePixels()
		let x=n%10*28;
		let y=floor(n/10)*28;
		//let x=0;
		//let y=0
		image(img,x,y);

	}
}