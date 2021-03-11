class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

// if a function has await it is asynchronous function, cannot proceed to the next line after await until await is executed
// once() is a asynchronous listener which gets the value only once 
  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      
      form = new Form()
      form.display();
    }
  }

  play(){
    form.hide();
    textSize(30);
    text("game start", 120, 100);
    // CALLING A STATIC FUNCTION WITH THE CLASS NAME
    Player.getPlayerInfo();
    // IF DETAILS OF ALL PLAYERS IS AVAILABLE DISPLAY THEM
    if (allPlayers!==undefined) {
      var displayPosition = 130;
      // EACH PLAYER IS CALLED AS plr 
       for (var plr in allPlayers){
        // DISPLAY ACTIVE PLAYER IN RED AND OTHERS IN BLACK
        if (plr === "player" + player.index) {
          fill("red")
        } else {
          fill("black")
        }

        displayPosition = displayPosition+20;
        textSize(15);
        text(allPlayers[plr].name+":" + allPlayers[plr].distance, 120, displayPosition);
       }
    }

    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.distance = player.distance + 50;
      player.update();
    }
  }
}
