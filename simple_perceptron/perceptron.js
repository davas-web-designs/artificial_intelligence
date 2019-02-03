var p;
let training = new Array(2000);
let count = 0;
function setup(){
	createCanvas(400, 400);
	p = new Perceptron(3);
	for (var i = 0; i < training.length; i++) {
		let x = random(-width/2, width/2);
		let y = random(-height/2, height/2);
		let answer = 1;
		if(y < f(x)) answer = -1;
		training[i] = new Trainer(x, y, answer);
	}
}

function draw(){
	background(255);
	translate(width/2, height/2);
	p.train(training[count].inputs, training[count].answer);
	count = (count + 1) % training.length;
	let x1 = -width/2;
	let y1 = (-p.weights[2] - p.weights[0]*x1) / p.weights[1]
	let x2 = width/2;
	let y2 = (-p.weights[2] - p.weights[0]*x2) / p.weights[1]
	line(x1, y1, x2, y2);
	for(let i = 0; i < count; i++){
		stroke(0);
		let guess = p.feedforward(training[i].inputs);
		if(guess > 0) noFill();
		else fill(0);
		ellipse(training[i].inputs[0], training[i].inputs[1], 8)
	}
}


class Perceptron{
	constructor(n){
		 	this.weights = new Array(n);
			this.c = 0.01;
			for(let i = 0; i < this.weights.length; i++){
				this.weights[i] = random(-1, 1);
			}
	}
	feedforward(inputs){
		let sum = 0;
		for(let i = 0; i < this.weights.length; i++){
			sum += inputs[i] * this.weights[i];
		}
		return activate(sum);
	}
	train(inputs, desired){
		var guess = this.feedforward(inputs);
		var error = desired - guess;
		for(let i = 0; i < this.weights.length; i++){
			this.weights[i] += this.c * error * inputs[i];
		}
	}
}

class Trainer{
	constructor(x, y, a){
		this.inputs = [x, y, 1];
		this.answer = a;
	}
}
function f(x){
	return x / 3;
}

function activate(sum){
	if(sum > 0) return 1;
	else return -1;
}
