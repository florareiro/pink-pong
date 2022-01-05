// variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2 ;

//variáveis da velocidade da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//variáveis da raquete 
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

// variáveis oponente 
let xOponente = 585;
let yOponente =150;
let velocidadeYOponente; 

//variáveis placar
let meusPontos = 0;
let pontosOponente = 0;

//variáveis sons do jogo
let raquetada;
let ponto;
let trilha;

// variável chance do oponente errar
let chanceDeErrar = 0;

function preload(){
  trilha = loadSound ("trilha.mp3");
  ponto = loadSound ("ponto.mp3");
  raquetada = loadSound ("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(255,20,147);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostrarRaquete(xRaquete, yRaquete);
  mostrarRaquete(xOponente, yOponente);
  movimentaMinhaRaquete();
  movimentaOponente();
  verificaColisaoRaquete();
  verificaColisaoOponente();
  incluiPlacar();
  marcaPonto();
  
}

function mostraBolinha (){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha () {
  xBolinha = xBolinha + velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda (){
   
  if (xBolinha + raio > width || xBolinha - raio < 0) {
  velocidadeXBolinha *= -1;
}
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1
  }
}

function mostrarRaquete (x,y){
  rect(x, y, comprimentoRaquete, alturaRaquete);
}

function movimentaMinhaRaquete (){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
}
}

function movimentaOponente(){
   velocidadeYOponente = yBolinha -yOponente - comprimentoRaquete / 2 - 30; 
  yOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
    }

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 45
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}


function verificaColisaoRaquete(){
 if (xBolinha - raio < xRaquete + comprimentoRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
   raquetada.play();
  }
}

function verificaColisaoOponente(){
  if (xBolinha + raio > xOponente &&  yBolinha - raio < yOponente + alturaRaquete  && yBolinha + raio > yOponente){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function incluiPlacar (){
  stroke (255);
  textAlign (CENTER);
  textSize (16);
  fill (255,20,147)
  rect (130, 10, 40, 20)
  fill (255);
  text (meusPontos, 150 , 26)
  fill (color(255,20,147))
  rect(430, 10, 40, 20)
  fill (255);
  text (pontosOponente, 450, 26)
}

function marcaPonto (){
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10) {
    pontosOponente +=1;
    ponto.play();
 }
}
