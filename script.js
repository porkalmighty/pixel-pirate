jQuery(document).ready(function(){
  var playArea = jQuery("#main");
  var captain = jQuery("#captain-4");
  var keyPressed;
  var actionDelay;
  var leftPosition = 0;

  jQuery('#main').click(function(){
      captain.toggleClass("attack");
  });

  jQuery(document).keydown(function(e){
    if (!keyPressed) {
      keyPressed = e.keyCode;

      switch(e.keyCode) {
        case 88:
          //captain.toggleClass("attack");
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
      keyPressed = false;
      clearInterval(actionDelay);
      captain.stop(true,true);
    } else {
      console.log('bbbb');
      keyPressed = e.keyCode;
    }
  });

  function captainMove(action){
    captainAction(action);
    actionDelay = setInterval(function(){captainAction(action)}, 100)
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
      default:

    }
  }

});
