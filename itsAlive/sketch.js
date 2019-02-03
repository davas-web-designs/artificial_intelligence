const TOTAL = 500;
let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;


function setup() {
  createCanvas(640, 480);
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
}

function draw() {
  if (counter % 75 == 0) {
    pipes.push(new Pipe());
  }
  counter++;

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();

    for (let j = birds.length - 1; j >= 0; j--) {
      if (pipes[i].hits(birds[j])) {
        savedBirds.push(birds.splice(j, 1)[0]);
      }
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  for (let i = birds.length - 1; i >= 0; i--) {
    if (birds[i].offScreen()) {
      savedBirds.push(birds.splice(i, 1)[0]);
    }
  }

  for (let bird of birds) {
    bird.think(pipes);
    bird.update();
  }

  if (birds.length === 0) {
    counter = 0;
    nextGeneration();
    pipes = [];
  }

  // All the drawing stuff
  background(0);

  let input_nodes = birds[0].brain.input_nodes;
  let hidden_nodes = birds[0].brain.hidden_nodes;
  let output_nodes = birds[0].brain.output_nodes;

  let dimensions = [input_nodes, hidden_nodes, output_nodes];

  stroke(255);

  drawNN(dimensions);
  drawConnections(dimensions);

}

function drawConnections(dimensions){
  let xi = 50;
  let hgap = 50;
  let wgap = 200;
  let weights = [birds[0].brain.weights_ih.data, birds[0].brain.weights_ho.data];
  for(let index = 0; index < dimensions.length -1; index++){
    for (var i = 0; i < dimensions[index]; i++) {
      let x1 = xi + wgap*index;
      let y1 = (height - (hgap * (dimensions[index]- 1))) / 2;
      for(var j = 0; j < dimensions[index+1]; j++){
        stroke(abs(weights[index][j][i]) * 255, abs(weights[index][j][i]) * 255, abs(weights[index][j][i]) * 255);
        strokeWeight(abs(weights[index][j][i]) * 5)
        let x2 = xi + wgap*(index+1);
        let y2 = (height - (hgap * (dimensions[index+1]- 1))) / 2;
        line(x1, (y1 + hgap*i), x2, (y2 + hgap*j));
      }
    }
  }
}

function drawNN(dimensions){
  let w = 15;
  let xi = 50;
  let hgap = 50;
  let wgap = 200;
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
