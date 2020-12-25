class Form{
    constructor(){
        this.title = createElement("H2");
        this.input = createInput().attribute("placeholder","Enter Name");
        this.button = createButton("Play");
        this.greeting = createElement("H3");
        this.notice = createElement("H4");
        this.reset = createButton("Reset");

    }

    display(){
        this.title.html("Monkey Go Happy Form");
        this.title.style('font-size', '50px');
        this.title.style('color', 'yellow');
        this.title.position(displayWidth/2-150,0);
        this.input.position(displayWidth/2-40,displayHeight/2-80);
        this.input.style('height', '20px');
        this.input.style('background', 'lavender');
        this.button.position(displayWidth/2-50,displayHeight/2+50);
        this.button.style('width', '200px');
        this.button.style('height', '40px');
        this.button.style('background', 'lightgreen');
        this.reset.position(displayWidth-450,630);
        this.reset.style('width', '100px');
        this.reset.style('height', '30px');
        this.reset.style('background', 'green');

        this.button.mousePressed(()=>{
            this.input.hide();
            this.button.hide();
            player.name = this.input.value();
            playerCount= playerCount+1;
            player.index = playerCount;
            player.updateCount(playerCount);
            player.update();
            this.greeting.html("Hello "+player.name);
            this.greeting.style('font-size', '30px');
            this.greeting.style('color', rgb(42, 16, 0));
            this.greeting.position(displayWidth/2-70,displayHeight/4);
            this.notice.html("Waiting for other player to join");
            this.notice.position(displayWidth/2-100,displayHeight/3);
            this.notice.style('font-size', '30px');
            this.notice.style('color', rgb(24, 123, 205));
            this.title.hide();


        })

        this.reset.mousePressed(()=>{
           game.update(0);
           player.updateCount(0); 
           Player.deletePlayers();
           Player.updateMonkeysAtEnd(0);
           player.getgameOverFromPlayers(0);
        })
    }

    hide(){

        this.title.hide();
        this.input.hide();
        this.button.hide();
        this.greeting.hide();
        this.notice.hide();

    }
}