class Player {
  constructor(){
    this.name = null;
    this.distance = 0;
    this.index = null;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",function(data){
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }
// writes the player details to the database
  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name, 
      distance:this.distance
    });
  }

// static functions are common to all the objects of a class
// gets the data of all the players from the database
// called with the class name and not with object
  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
}
