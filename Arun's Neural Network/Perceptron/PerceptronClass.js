//var weights=[];
function sigmoid(t) {
    return 1/(1+Math.pow(Math.E, -t));
}
function sign(n)
{
	if(n>=0)
	{
		return 1;
	}
	else
	{
		return -1;
	}
}
class Perceptron
{
	
	 constructor(inputs)
	{
		this.weights=[];
		this.lr=0.1;
		//initilaize weights randomly 
		for( var i=0;i<inputs.length;i++)
		{
			this.weights.push(random(-1,1));
			//this.weights=random(-1,1);
		}
	}
	guess(inputs)
	{
		var sum=0;
		for( var i=0;i<this.weights.length;i++)
		{
			sum+=(inputs[i]*this.weights[i]);
		}
		return sign(sum);
	}
	train(inputs,target)
	{
		var guess=this.guess(inputs);
		var error =target-guess;
		for(var i=0;i<this.weights.length;i++)
		{
			this.weights[i]=this.weights[i]+(error*inputs[i]+this.lr);
		}
	}

}


