
function setup()
{
	blah=[0,1];
	let nn= new NeuralNetwork(3,4,3);
	a=[];
	b=[];
	for(let j=0;j<20000;j++)
	{
		for(let i=0;i<3;i++)
		{
			a[i]=random(blah);
			if(a[i]==0)
			{
				b[i]=1;
			}
			else
			{
				b[i]=0;
			}
		}
		nn.train(a,b);
	}
	
	console.log("OUTPUT:");
	console.log(nn.feedforward([0,1,0]));
	
	
	
}

function draw()
{
	
}