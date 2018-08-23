function sigmoid(x) {
    return 1/(1+Math.pow(Math.E, -x));
}
function dsigmoid(y)
{
	return y*(1-y);
}
class NeuralNetwork
{
	constructor (input_nodes,hidden_nodes,output_nodes)
	{
		this.input_nodes=input_nodes;
		this.output_nodes=output_nodes;
		this.hidden_nodes=hidden_nodes;
		this.weights_ih= new Matrix(this.hidden_nodes,this.input_nodes);
		this.weights_ho= new Matrix(this.output_nodes,this.hidden_nodes);
		this.weights_ih.randomize();
		this.weights_ho.randomize();
		this.bias_h= new Matrix(this.hidden_nodes,1);
		this.bias_0= new Matrix(this.output_nodes,1);
		this.bias_h.randomize();
		this.bias_0.randomize();
		this.learning_rate=0.1;
		
	}
	feedforward(input_array)
	{
		//Generrating hidden outputs
		let inputs=Matrix.fromArray(input_array);
		let hidden= Matrix.multiply(this.weights_ih,inputs);
		hidden.add(this.bias_h);
		hidden.map(sigmoid);
		//activation

		//layer 1 done

		//Now for output layer
		let output= Matrix.multiply(this.weights_ho,hidden);
		output.add(this.bias_0);
		output.map(sigmoid);
		return output.toArray();
	}
	train(input_array,target_array)
	{
		//Generrating hidden outputs
		let inputs=Matrix.fromArray(input_array);
		let hidden= Matrix.multiply(this.weights_ih,inputs);
		hidden.add(this.bias_h);
		hidden.map(sigmoid);//  outputs of input layer
		//activation

		//layer 1 done

		//Now for output layer
		let outputs= Matrix.multiply(this.weights_ho,hidden);
		outputs.add(this.bias_0);
		outputs.map(sigmoid);
		//Array to matrix
		let targets=Matrix.fromArray(target_array);
		let output_errors =Matrix.subtract(targets,outputs);
		//This is Where I Do that gradient shit dsigmoid takes a detivative of the fucntion
		let gradients =Matrix.map(outputs,dsigmoid);//this function takes derivative
		gradients.multiply(output_errors);
		gradients.multiply(this.learning_rate);
		//delta Calculation and adjust weigts and biases
		let hidden_t=Matrix.transpose(hidden);//output of middle layer
		let weight_ho_deltas=Matrix.multiply(gradients,hidden_t)
		this.weights_ho.add(weight_ho_deltas);
		this.bias_0.add(gradients);
		//calculate hidden layer errors
		let who_t=Matrix.transpose(this.weights_ho);
		let hidden_errors=Matrix.multiply(who_t,output_errors);
		//Hidden Gradients
		let hidden_gradient=Matrix.map(hidden,dsigmoid);
		hidden_gradient.multiply(hidden_errors);
		hidden_gradient.multiply(this.learning_rate);
		//Calculate input-hidden Deltas
		let inputs_t=Matrix.transpose(inputs);
		let weight_ih_deltas=Matrix.multiply(hidden_gradient,inputs_t);
		this.weights_ih.add(weight_ih_deltas);
		this.bias_h.add(hidden_gradient);
	}
}