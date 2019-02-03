
function nextGeneration() {
  console.log('next generation');
  generacion++;
  calculateFitness();
  for (let i = 0; i < total; i++) {
    players[i] = pickOne();
  }
  savedPlayers = [];
}

function pickOne() {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r = r - savedPlayers[index].fitness;
    index++;
  }
  index--;
  let player = savedPlayers[index];
  let child = new Player(player.brain);
  child.mutate();
  return child;
}

function calculateFitness() {
  let sum = 0;
  for (let player of savedPlayers) {
    sum += player.score;
  }
  for (let player of savedPlayers) {
    player.fitness = player.score / sum;
  }
}
