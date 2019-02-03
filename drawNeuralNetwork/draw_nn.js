
var i = 4;
var h = 7;
var o = 2;
var hgap = 50;
var wgap = 100;
var w = 15;
var dimensions = [i, h, h, h, o];
var xi = 50;
let button;
let i_nodes, h_layers, h_nodes, o_nodes, hgap_control, wgap_control;

function setup(){
  createCanvas(640, 480);
  createDiv('Input nodes: ')
  i_nodes = createSlider(1, 10, 1);
  createDiv('Hidden layers: ')
  h_layers = createSlider(1, 5, 1);
  createDiv('Hidden nodes: ')
  h_nodes = createSlider(1, 10, 1);
  createDiv('Outout nodes: ')
  o_nodes = createSlider(1, 10, 1);
  createDiv('height gap: ')
  hgap_control = createSlider(1, 100, 1);
  createDiv('width gap: ')
  wgap_control = createSlider(50, 200, 50);
  button = createButton("go go go go");
  button.mousePressed(applyChanges);
}

function draw(){
  background(0);
  strokeWeight(2);
  stroke(255);
  drawNN();
  drawConnections();
}

function applyChanges(){
  i = i_nodes.value();
  let h_l = h_layers.value();
  h = h_nodes.value();
  o = o_nodes.value();
  dimensions = [];
  dimensions.push(i);
  for(let x = 0; x < h_l; x++){
    dimensions.push(h);
  }
  dimensions.push(o);
  wgap = wgap_control.value();
  hgap = hgap_control.value();
}

function drawConnections(){
  for(let index = 0; index < dimensions.length -1; index++){
    for (var i = 0; i < dimensions[index]; i++) {
      let x1 = xi + wgap*index;
      let y1 = (height - (hgap * (dimensions[index]- 1))) / 2;
      for(var j = 0; j < dimensions[index+1]; j++){
        let x2 = xi + wgap*(index+1);
        let y2 = (height - (hgap * (dimensions[index+1]- 1))) / 2;
        line(x1, (y1 + hgap*i), x2, (y2 + hgap*j));
      }
    }
  }


}

function drawNN(){
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
