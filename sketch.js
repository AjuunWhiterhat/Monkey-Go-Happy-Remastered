var database;
var gameState=0;
var playerCount;
var game,form,player;
var allPlayers;
var monkey;
var monkey1, monkey2
var monkeys = [];
var bg, ground;
var stoneIMG;
var bananas, bananasIMG;
var obstacles;
var ObstaclesGroup, BananasGroup;

function preload(){
  monkey = loadAnimation("images/Monkey_01.png","images/Monkey_02.png","images/Monkey_03.png","images/Monkey_04.png","images/Monkey_05.png","images/Monkey_06.png","images/Monkey_07.png","images/Monkey_08.png","images/Monkey_09.png","images/Monkey_10.png",)
  bg = loadImage("images/jungle.jpg")
  stoneIMG = loadImage("images/stone.png");
  bananasIMG = loadImage("images/banana.png");
}


function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(displayWidth,displayHeight);

  game = new Game();
  game.getState();
  game.start();

  ObstaclesGroup = new Group();
  BananasGroup = new Group();
}

function draw(){
  background(bg);

  if(playerCount===2){
    game.update(1);
  }

  if(gameState===1){
    game.play();
  }

  if(gameState===2){
    game.end();
  }
  
}
