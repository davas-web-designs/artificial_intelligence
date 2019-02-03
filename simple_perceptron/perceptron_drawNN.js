
var p;
let training = new Array(2000);
let count = 0;
var button;
function setup(){
	createCanvas(800, 400);
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
	background(0);

	let input_nodes = 2;
	let hidden_nodes = 1;
	let output_nodes = 1;

	let dimensions = [input_nodes, hidden_nodes, output_nodes];

	drawNN(dimensions);
	drawConnections(dimensions);

// painting text:
	noStroke();
	noFill();
	stroke(255);
	strokeWeight(1);
	fill(255);
	text('x: ' + training[count].x, 500, 50)
	text('y: ' + training[count].y, 500, 75)
	text('w1: ' + p.weights[0], 500, 100)
	text('w2: ' + p.weights[1], 500, 125)
	text('guess: ' + p.guess, 500, 150)
	text('correct answer: ' + training[count].answer, 500, 175)
	text('error: ' + (training[count].answer - p.guess), 500, 200)
}

function keyTyped(){
	if(key == 'a'){
		p.train(training[count].inputs, training[count].answer);
		p.feedforward(training[count]);
		count++;
	}

}


class Perceptron{
	constructor(n){
		 	this.weights = new Array(n);
			this.c = 0.01;
			this.guess;
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
		this.guess = this.feedforward(inputs);
		var error = desired - this.guess;
		for(let i = 0; i < this.weights.length; i++){
			this.weights[i] += this.c * error * inputs[i];
		}
	}
}

class Trainer{
	constructor(x, y, a){
		this.x = x;
		this.y = y;
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

function drawConnections(dimensions){
  let xi = 50;
  let hgap = 100;
  let wgap = 150;
  let weights = p.weights;
  for(let index = 0; index < dimensions.length -1; index++){
    for (var i = 0; i < dimensions[index]; i++) {
      let x1 = xi + wgap*index;
      let y1 = (height - (hgap * (dimensions[index]- 1))) / 2;
      for(var j = 0; j < dimensions[index+1]; j++){
        stroke(abs(weights[index]) * 255, abs(weights[index]) * 255, abs(weights[index]) * 255);
        strokeWeight(abs(weights[index]))
        let x2 = xi + wgap*(index+1);
        let y2 = (height - (hgap * (dimensions[index+1]- 1))) / 2;
        line(x1, (y1 + hgap*i), x2, (y2 + hgap*j));
      }
    }
  }
}

function drawNN(dimensions){
	strokeWeight(4);
  let w = 50;
  let xi = 50;
  let hgap = 100;
  let wgap = 150;
  var x = xi;
  for(d of dimensions){
    var y = height - (hgap * (d-1)) ;
    y /= 2;
    for(let i = 0; i < d; i++){
      ellipse(x, y, w);
      y += hgap;
    }
    y = 100;
    x += wgap;
  }
}
