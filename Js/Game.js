class Game{
    constructor(){

    }

    getState(){
      var gameStateRef = database.ref('gameState');
      gameStateRef.on('value',(data)=>{
          gameState = data.val();
      }) 
    }

    update(state){
        database.ref('/').update({
            gameState: state
        })
    }

    async start(){
        if(gameState===0){
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once('value');
            
            if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();
            }

            form = new Form();
            form.display();
        }

        monkey1 = createSprite(100,10);
        monkey2 = createSprite(100,10);

        monkey1.addAnimation("monkey",monkey);
        monkey1.velocityY = 0;

        monkey2.addAnimation("monkey",monkey);
        monkey2.velocityY = 0;
        
        monkeys = [monkey1,monkey2];

        

    }

    play(){

        form.hide();
        Player.getPlayersInfo();
        player.getPlayersAtEnd();
        

        if(allPlayers!==undefined){
            var index = 0;
            var x = 175;
            var y;
            background(bg);
            ground = createSprite(displayWidth/2-650,displayHeight+170,displayWidth,30);
            ground.velocityX = -4;
            ground.shapeColor = rgb(42, 16, 0);
            drawSprites();
            
            for(var plr in allPlayers){
                index = index +1;
                x = 100;
                y = 800+ allPlayers[plr].distance;
                monkeys[index-1].x=x;
                monkeys[index-1].y=y;
                monkeys[index-1].velocityY = 0;
                monkeys[index-1].scale = 0.12;
                monkeys[index-1].visible = true;
               
                if(index===player.index){
                    camera.position.x = monkeys[index-1].x;
                    camera.position.y = displayHeight;
                    fill("orange");
                    ellipse(x,y,30,30);
                    
                    fill("white");
                    textSize(15);
                    text("Player 1 : "+allPlayers.player1.score,200,200);
                    text("Player 2 : "+allPlayers.player2.score,200,300);
                }
                
            }

            if (keyDown("space") && player.index !== null) {
                allPlayers[plr].velocityX = -14;    
                player.update();
            }

            console.log(keyDown);
    
            //allPlayers[plr].velocityY = allPlayers[plr].velocityY + 0.8;
    

        }
        
        if(player.score>250){
            gameState=2;
            Player.updateMonkeysAtEnd(player.rank);
            text("You are the first to complete the game",+player.rank,displayWidth/2-50,y-10);
            
        }

        else if(player.score>250 && player.rank===2){
            gameState=2;
            Player.updateMonkeysAtEnd(player.rank);
            text("You are the last to complete the game",+player.rank,displayWidth/2-50,y-10);   
        }

        if(player.score>=20){
            ground.velocityX = -8;
        }

        if(frameCount%90===0){
            bananas = createSprite(displayWidth/2+300,random(775,830));
            bananas.addImage(bananasIMG);
            bananas.scale = 0.06;
            bananas.velocityX = -6;
            BananasGroup.add(bananas);
        }

          

        if(frameCount%110===0){
            obstacles = createSprite(random(displayWidth/2-200,displayWidth/2),1010);
            obstacles.addImage(stoneIMG);
            obstacles.scale = 0.118;
            obstacles.velocityX = -6;
            ObstaclesGroup.add(obstacles);
        }

        

        if(player.index!==null){
            for(var i=0; i<BananasGroup.length; i++){
                var f = BananasGroup.get(i);
                
                if(f.isTouching(monkeys)){
                    f.destroy();
                    player.score = player.score+2;
                }
            }
        }

        if(ObstaclesGroup.isTouching(monkeys)){
            this.end();
        }

        

        drawSprites();

    }

    end(){
    textSize(40);
    fill("brown");
    text("Game Over",displayWidth/2-500,displayHeight-200);  
    ground.velocityX=0;
    ObstaclesGroup.destroy();
    BananasGroup.destroy();
    ObstaclesGroup.setLifetimeEach(-1);
    BananasGroup.setLifetimeEach(-1);

    ObstaclesGroup.setVelocityXEach(0);
    BananasGroup.setVelocityXEach(0);
    
    }
}