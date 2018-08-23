function sigmoid(x)
{
    return 1/(1+Math.pow(Math.E, -x));
}
function dsigmoid(y)
{
	return y*(1-y);
}
class hiddenLayer
{
	constructor (rows,cols)
	{
		this.weights = new Matrix(rows,cols);
		this.weights.randomize();
		this.bias= new Matrix(rows,1);
		this.bias.randomize();
		this.output_repo= new Matrix(rows,1);
		this.errors=new Matrix(rows,1);
	}
}
class NeuralNetwork
{
	constructor (input_nodes,hidden_nodes,output_nodes)
	{
		this.input_nodes=input_nodes;
		this.hidden_nodes=hidden_nodes;
		this.output_nodes=output_nodes;
		this.weights_ih=new Matrix(this.hidden_nodes,this.input_nodes);
		this.weights_ih.randomize();
		this.weights_ho= new Matrix(this.output_nodes,this.hidden_nodes);
		this.weights_ho.randomize();
		this.bias_ih= new Matrix(this.hidden_nodes,1);
		this.bias_ho= new Matrix(this.output_nodes,1);
		this.bias_ih.randomize();
		this.bias_ho.randomize();
		this.hid=[];
		this.hid[0]= new hiddenLayer(hidden_nodes,input_nodes);
		this.hid[0].weights.randomize();
		this.hid[0].bias.randomize();
		//THIS IS THE NUMBER OF HIDDEN LAYERS
		this.hidden_no=10;
		for(var i=1;i<=hidden_no;i++)
		{
				this.hid[i]= new hiddenLayer(hidden_nodes,hidden_nodes);
				//this.hid[i].weights.randomize();
				//this.hid[i].bias.randomize();
		}
		this.hid[hidden_nodes+1]= new hiddenLayer(output_nodes,hidden_nodes);
		this.hid[hidden_nodes+1].weights.randomize();
		this.hid[hidden_nodes+1].bias.randomize();
		this.learning_rate=0.1;
	}
	setLearningRate(x)
	{
		this.learning_rate=x;
	}
	feedforward(input_array)
	{
		//Generrating hidden outputs
		let inputs=Matrix.fromArray(input_array);
		this.hid[0].output_repo=Matrix.multiply(this.hid[0].weights,inputs);
		this.hid[0].output_repo.add(this.hid[0].bias);
		this.hid[0].output_repo.map(sigmoid);
		//this.hid[0].output_repo.print();
		for(let i=1;i<this.hid.length;i++)
		{
			this.hid[i].output_repo=Matrix.multiply(this.hid[i].weights,this.hid[i-1].output_repo);
			this.hid[i].output_repo.add(this.hid[i].bias);
			this.hid[i].output_repo.map(sigmoid);
			//this.hid[i].output_repo.print();
		}
		let x=(this.hid.length)-1;
		return this.hid[x].output_repo.toArray();
	}
	train(input_array,target_array)
	{
		let inputs=Matrix.fromArray(input_array);
		this.hid[0].output_repo=Matrix.multiply(this.hid[0].weights,inputs);
		this.hid[0].output_repo.add(this.hid[0].bias);
		this.hid[0].output_repo.map(sigmoid);
		for(let i=1;i<this.hid.length;i++)
		{
			this.hid[i].output_repo=Matrix.multiply(this.hid[i].weights,this.hid[i-1].output_repo);
			this.hid[i].output_repo.add(this.hid[i].bias);
			this.hid[i].output_repo.map(sigmoid);
		}
		let x=(this.hid.length)-1;
		let error;
		let who_t
		let targets=Matrix.fromArray(target_array);
		//BackPropogate
		//output layer
		this.hid[x].errors=Matrix.subtract(targets,this.hid[x].output_repo);
		let gradient=Matrix.map(this.hid[x].output_repo,dsigmoid);
		gradient.multiply(this.hid[x].errors);
		gradient.multiply(this.learning_rate);
		let deltas=Matrix.multiply(gradient,Matrix.transpose(this.hid[x-1].output_repo));
		this.hid[x].weights.add(deltas);
		//console.log("WEIGHT MATRIX ");
		//this.hid[x].weights.print();
		this.hid[x].bias.add(gradient);	
		//All Hidden Layers
		for(let i=x-1;i>0;i--)
		{
			this.hid[i].errors=Matrix.multiply(Matrix.transpose(this.hid[i+1].weights),this.hid[i+1].errors);
			let temp=Matrix.map(this.hid[i].output_repo,dsigmoid);
			temp.multiply(this.hid[i].errors);
			temp.multiply(this.learning_rate);
			let temp1=Matrix.multiply(temp,Matrix.transpose(this.hid[i-1].output_repo));
			this.hid[i].weights.add(temp1);
			//console.log("WEIGHT MATRIX ");
			//this.hid[i].weights.print();
			this.hid[i].bias.add(temp);
		}
		//Input Layer
		this.hid[0].errors=Matrix.multiply(Matrix.transpose(this.hid[1].weights),this.hid[1].errors);
		let temp=Matrix.map(this.hid[0].output_repo,dsigmoid);
		temp.multiply(this.hid[0].errors);
		temp.multiply(this.learning_rate);
		let temp1=Matrix.multiply(temp,Matrix.transpose(inputs));
		this.hid[0].weights.add(temp1);
		//console.log("WEIGHT MATRIX ");
		//this.hid[0].weights.print();
		this.hid[0].bias.add(temp);
	}
}
