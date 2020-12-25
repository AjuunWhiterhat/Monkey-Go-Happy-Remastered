class Player{
    constructor(){
        this.index = 0;
        this.name = null;
        this.score = 0;
        this.rank = 0;
        this.distance = 200;
        this.gameOver = 0;
    }

    getCount(){
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on('value',(data)=>{
            playerCount = data.val();
        })
    }

    updateCount(count){
        database.ref('/').update({
            playerCount:count
        })
    }

    update(){
        var playerIndex = "players/player"+this.index;
        database.ref(playerIndex).set({
            name: this.name,
            distance: this.distance,
            score: this.score,
        })
    }

    getPlayersAtEnd(){
        database.ref("PlayersAtEnd").on("value",(data)=>{
            this.rank = data.val();
        })
    }

    getgameOverFromPlayers(){
       database.ref("gameOver").on("value",(data)=>{
           this.gameOver = data.val();
       }) 
    }

    updategameOver(over){
        database.ref("/").update({
            gameOver:over
        })
    }

    static updatePlayersAtEnd(rank){
        database.ref("/").update({
          PlayersAtEnd:rank  
        })
    }

    static getPlayersInfo(){
        var playerInfoRef = database.ref('players');
        playerInfoRef.on('value',(data)=>{
            allPlayers = data.val();
        })
    }

    static deletePlayers(){
        database.ref('/').update({
            players:null
        })
    }




}