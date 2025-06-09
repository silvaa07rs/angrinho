et jogador;
let alimentos = [];
let pontos = 0;
let vidas = 3;function setup() {
2
  createCanvas(400, 400);
3
}l
4

5
function draw() {
6
  background(220);
7
}
let gameOver = false;

function setup() {
  createCanvas(600, 400);
  jogador = new Jogador();
  for (let i = 0; i < 5; i++) {
    alimentos.push(new Alimento());
  }
}

function draw() {
  background(200, 255, 200);

  if (gameOver) {
    textSize(32);
    fill(0);
    textAlign(CENTER);
    text("FIM DE JOGO!", width / 2, height / 2 - 20);
    text("Pontos: " + pontos, width / 2, height / 2 + 20);
    return;
  }

  jogador.mostrar();
  jogador.mover();

  for (let a of alimentos) {
    a.mover();
    a.mostrar();
    if (a.pego(jogador)) {
      if (a.bom) {
        pontos++;
      } else {
        vidas--;
        if (vidas <= 0) {
          gameOver = true;
        }
      }
      a.reiniciar();
    }
  }

  fill(0);
  textSize(16);
  text("Pontos: " + pontos, 10, 20);
  text("Vidas: " + vidas, 10, 40);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    jogador.direcao = -1;
  } else if (keyCode === RIGHT_ARROW) {
    jogador.direcao = 1;
  }
}

function keyReleased() {
  jogador.direcao = 0;
}

class Jogador {
  constructor() {
    this.x = width / 2;
    this.y = height - 20;
    this.direcao = 0;
  }

  mostrar() {
    fill(139, 69, 19);
    rect(this.x, this.y, 50, 20);
  }

  mover() {
    this.x += this.direcao * 5;
    this.x = constrain(this.x, 0, width - 50);
  }
}

class Alimento {
  constructor() {
    this.reiniciar();
  }

  reiniciar() {
    this.x = random(width);
    this.y = 0;
    this.vel = random(2, 4);
    this.bom = random(1) < 0.7; // 70% chance de ser bom
  }

  mostrar() {
    if (this.bom) {
      fill(255, 165, 0); // Alimento bom - laranja
    } else {
      fill(255, 0, 0); // Alimento ruim - vermelho
    }
    ellipse(this.x, this.y, 20, 20);
  }

  mover() {
    this.y += this.vel;
    if (this.y > height) {
      this.reiniciar();
    }
  }

  pego(jogador) {
    return dist(this.x, this.y, jogador.x + 25, jogador.y) < 25;
  }
}
