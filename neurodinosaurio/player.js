class Player{
  constructor(brain){
    this.height = 30;
    this.width = 30;
    this.speed = 0;
    this.gravity = 8;
    this.y = this.initialY = 267;
    this.speed;
    this.x = 50;
    this.score = 0;
    this.fitness = 0;
    this.salto = 100;
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(6, 10, 2);
    }
  }

  show(){
    // fill('rgba(0,255,0, 0.5)')
    noFill();
    strokeWeight(3)
    stroke('rgba(0,0,255,0.5)')
    rect(this.x, this.y, this.width, this.height);
    // fill(255);
    // noStroke();
    // text('score: '+this.score, 30, 30);
  }

  jump(){
    if(this.y < (this.initialY-this.salto)){
      this.speed = 5
    }
    if(this.y == this.initialY && this.speed == 5){
      this.speed = 0;
    }
    this.y += this.speed;
  }
  collision(pipe){
    if(this.x < pipe.x + pipe.width &&
       this.x + this.width > pipe.x &&
       this.y < pipe.y + pipe.height &&
       this.height + this.y > pipe.y){
         return true;
       }else{
         return false;
       }
  }
  mutate(){
    this.brain.mutate(0.1)
  }
  think(pipes){

    let closest = null;
    let d = 0;
    let closestD = Infinity;
    for(let i = 0; i < pipes.length; i++){
      d = pipes[i].x - this.x;
      if(d < closestD && d > 0){
        closest = pipes[i];
        closestD = d;
      }
    }

    let inputs = [];
    inputs[0] = closest.x / width;
    inputs[1] = closest.height / height;
    inputs[2] = pipeSpeed / 10;
    inputs[3] = this.y / height;
    inputs[4] = this.height / height;
    inputs[5] = closest.width / width;
    let output = this.brain.predict(inputs);
    //if (output[0] > output[1] && this.velocity >= 0) {
    if (output[0] > output[1]) {
      if(this.y == this.initialY){
          this.speed = -5;
      }
    }
  }
}
