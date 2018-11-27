jQuery(document).ready(function(){
  var playArea = jQuery("#playAreaWrapper");
  var captain = jQuery("#captain-4");
  var crew = jQuery(".pirate");
  var keyPressed;
  var actionPerformed;
  var leftPosition = 0;
  var enemyArray;

  jQuery('#main').click(function(){
      captain.toggleClass("attack");
      var isCollide = collision(captain,crew);
      if(isCollide){ console.log('captain hit the crew');}
  });

  jQuery('#main').dblclick(function(){
      crew.toggleClass("attack");
      var isCollide1 = collision(crew,captain);
      if(isCollide1){ console.log('crew hit the captain');}
  });
  jQuery(document).keydown(function(e){
    if (!keyPressed) {
      keyPressed = e.keyCode;

      switch(e.keyCode) {
        case 88:
          captainMove("attack");
        break;
        case 90:
        break;
        case 37:
        case 65:
          captainMove("left");
        break;
        case 39:
        case 68:
          captainMove("right")
          break;
        case 32:
        case 38:
        case 87:
          captainMove("jump");
        break;
      }
    }
  });

  jQuery(document).keyup(function(e){
    if(e.keyCode === keyPressed){
      console.log('aaaaaa');
      clearInterval(actionPerformed);
      captain.stop(true,true);
      keyPressed = false;
    }
  });

  function captainMove(action){
    captainAction(action);
    actionPerformed = setInterval(function(){captainAction(action)}, 100)
  }

  function captainAction(action){
    //reset class
    captain.removeAttr("class");
    switch (action) {
      case "left":
        captain.addClass("captain left");
        leftPosition -= 50;
        if(leftPosition <= 0){
          leftPosition = 0;
        }
        captain.animate({'left':leftPosition + "px"}, 100);
        break;
      case "right":
        captain.addClass("captain right");
        leftPosition += 50;
        if(leftPosition > (playArea.width() - 100)){
          leftPosition = playArea.width() - 100;
        }
        captain.animate({'left':leftPosition + "px"}, 100);
        break;
      case "jump":
        captain.addClass("captain jump");
        setTimeout(function(){captain.removeClass("jump");}, 800)
        break;
      case "attack":
        captain.addClass("captain attack");
        setTimeout(function(){captain.removeClass("attack");}, 300)
        break;
    }
  }

  //add enemies
  function CreatePirate(){
    this.pirateClass = "pirate_n" + Math.floor(Math.random() * 1000) + 3;
    this.position = parseInt(playArea.width()) - parseInt(Math.random() * 100) + 1;
    this.character = "<div class=\"pirate " + this.pirateClass + "\" ></div>";
  }

  var pirate1 = new CreatePirate();
  //playArea.append(pirate1.character);
  function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}
});
