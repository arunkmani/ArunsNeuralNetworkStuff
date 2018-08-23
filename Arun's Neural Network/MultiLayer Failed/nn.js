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
		this.weights = new Matrix(no,no);
		this.weights.randomize();
		this.bias= new Matrix(no,1);
		this.bias.randomize();
		this.output_repo= new Matrix(no,1);
		this.errors=new Matrix(no,1);
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
		console.log("hey Asshole");
		this.hid[0].weights.print();
		/*for(var i=0;i<hidden_nodes;i++)
		{
			this.hid[i]= new hiddenLayer(hidden_nodes);
		}*/
		this.learning_rate=0.1;
	}
	feedforward(input_array)
	{
		//Generrating hidden outputs
		let inputs=Matrix.fromArray(input_array);
		let hidden=Matrix.multiply(this.weights_ih,inputs);
		hidden.add(this.bias_ih);
		hidden.map(sigmoid);
		// Now next layer
		this.hid[0].output_repo=Matrix.multiply(this.hid[0].weights,hidden);
		this.hid[0].output_repo.add(this.hid[0].bias);
		this.hid[0].output_repo.map(sigmoid);
		for(let i=1;i<=(this.hid.length)-2;i++)
		{
			this.hid[i].output_repo=Matrix.multiply(this.hid[i].weights,this.hid[i-1].output_repo);
			this.hid[i].output_repo.add(this.hid[i].bias);
			this.hid[i].output_repo.map(sigmoid);

		}
		let x=this.hid.length
		let output=Matrix.multiply(this.weights_ho,this.hid[x-1].output_repo);
		output.add(this.bias_ho);
		output.map(sigmoid);
		return output.toArray();
	}
	train(input_array,target_array)
	{
		//Generrating hidden outputs
		let inputs=Matrix.fromArray(input_array);
		let hidden=Matrix.multiply(this.weights_ih,inputs);
		hidden.add(this.bias_ih);
		hidden.map(sigmoid);
		// Now next layer
		this.hid[0].output_repo=Matrix.multiply(this.hid[0].weights,hidden);
		this.hid[0].output_repo.add(this.hid[0].bias);
		this.hid[0].output_repo.map(sigmoid);
		for(let i=1;i<=(this.hid.length)-2;i++)
		{
			this.hid[i].output_repo=Matrix.multiply(this.hid[i].weights,this.hid[i-1].output_repo);
			this.hid[i].output_repo.add(this.hid[i].bias);
			this.hid[i].output_repo.map(sigmoid);

		}
		let x=this.hid.length
		let output=Matrix.multiply(this.weights_ho,this.hid[x-1].output_repo);
		output.add(this.bias_ho);
		output.map(sigmoid);
		//BACK PROPOGATE
		
		let targets= Matrix.fromArray(target_array);

		let output_errors=Matrix.subtract(targets,output);
		// let gradient = outputs * (1 - outputs);
  		//OUTPUT LAYER
    	let gradients=Matrix.map(output,dsigmoid);
    	gradients=Matrix.multiply(output_errors);
    	gradients=Matrix.multiply(this.learning_rate);
    	let who_t=Matrix.transpose(this.weights_ho);
    	let deltas=Matrix.multiply(gradients,who_t);
    	this.weights_ho.add(deltas);
    	this.bias_ho.add(gradients);

    	//NEXT LAYER
    	who_t=Matrix.transpose(this.weights_ho);
    	this.hid[x-1].errors=Matrix.multiply(who_t,output_errors);
    	let gra=Matrix.map(this.hid[x-1].output_repo,dsigmoid);
    	gra.multiply(this.hid[x-1].errors);
    	gra.multiply(this.learning_rate);
    	deltas=Matrix.multiply(gra,Matrix.transpose(this.hid[x-2].output_repo));
    	this.hid[x-2].weights.add(deltas);
    	this.hid[x-2].bias.add(gra);
    	for(let i=(this.hid.length)-2;i>=1;i--)
    	{
    		who_t=Matrix.transpose(this.hid[i+1].weights);
	    	this.hid[i].errors=Matrix.multiply(who_t,this.hid[i+1].errors);
	    	let gra=Matrix.map(this.hid[i-1].output_repo,dsigmoid);
	    	gra.multiply(this.hid[i].errors);
	    	gra.multiply(this.learning_rate);
	    	deltas=Matrix.multiply(gra,Matrix.transpose(this.hid[i-1].output_repo));
	    	this.hid[].weights.add(deltas);
	    	this.hid[x-2].bias.add(gra);
    	}

       	//console.table(this.hid[4].output_repo.print());
    }
}