var pipeSpeed = 3;

class Pipe{
  constructor(){
    this.x = 640;
    this.width = random(10,25);
    this.height = random(25,50);
    this.y;
  }

  generate(){
    stroke(255);
    fill(255);
    this.y = height-this.height
    rect(this.x, this.y, this.width, this.height)
  }
  move(){
    this.x-= pipeSpeed;
  }
  offscreen(){
    return(this.x < 0);
  }
}
