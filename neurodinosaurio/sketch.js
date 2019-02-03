var total = 100;
var players = [];
var hiScore = 0;
var savedPlayers = [];
var counter = 0;
var pipes = [];
var generacion = 1;

function setup(){
  for(let i = 0; i < total; i++){
    players[i] = new Player();
  }
  pipes.push(new Pipe())

  createCanvas(640,300)
  createDiv('Slider para controlar la velocidad de la animación: (en tiempo real)')
  slider = createSlider(1, 10, 1);
  createDiv('Control de la población: ')
  inputPoblacion = createInput();
  inputPoblacion.elt.value = total;
  createDiv('Control de la altura del salto: ')
  inputSalto = createInput();
  inputSalto.elt.value = players[0].salto;
  createDiv('Clickea para aplicar los cambios: ')
  botonCambios = createButton('aplicar cambios');
  botonCambios.mousePressed(cambia)
}

function draw(){
  for(let n = 0; n < slider.value(); n++){

    // if(counter % 100 == 0){
    //   pipes.push(new Pipe());
    //   // TODO: Fallo al aumentar la velocidad por que llega un momento que no hay pipes en la pantalla :/
    //   pipeSpeed += 0.1;
    // }
    if(counter % 100 == 0){
      pipes.push(new Pipe())
    }
    counter++;
    for (pipe of pipes) {
      pipe.generate();
      pipe.move();
    }
    for(player of players){
      player.jump();
      player.score++;
      player.think(pipes);
    }


    for(let i = 0; i < pipes.length; i++){
      if(pipes[i].offscreen()){
        pipes.splice(i, 1)

      }
      for(let j = 0; j < players.length; j++){
        if(players[j].collision(pipes[i])){
          savedPlayers.push(players[j])
          players.splice(j,1)
        }
      }
    }
    if(players.length == 0){
      if(savedPlayers[savedPlayers.length -1].score > hiScore){
        hiScore = savedPlayers[savedPlayers.length -1].score;
      }
      counter = 0;
      nextGeneration();
      pipes = [];
      pipeSpeed = 3;
    }
  }
  background(0);
  noStroke();
  fill(255)
  text('hiScore: ' + hiScore, 30, 30)
  text('actual: '+ players[players.length-1].score, 30, 50)
  text('generación '+ generacion, 30, 70)
  text('población: ' + total, 30, 90)
  for(let player of players){
    player.show();
  }

  for (pipe of pipes) {
    pipe.generate();
  }

}

function cambia(){
  total = inputPoblacion.value();
  for(player of players){
    player.salto = inputSalto.value();
  }
  counter = 0;
  pipes = [];
  hiScore = 0;
  generacion = 1;
}
