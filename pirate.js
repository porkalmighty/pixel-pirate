jQuery(document).ready(function(){
  /* Music Box */
  var $playButton = jQuery("button[name='play_button']");
  var $stopButton = jQuery("button[name='stop_button']");
  var $muteButton = jQuery("button[name='mute_button']");
  var $turntable = jQuery("#lp-outer");
  var $tonearm = jQuery("#tone-arm");
  var $woofer = jQuery(".woofer");
  var $musicBox = jQuery("#music-box");
  var music = jQuery("#track_1")[0];

  /* Demo */
  var playArea = jQuery("#playArena");
  var captain = jQuery(".captain");
  var keyPressed;
  var actionPerformed;
  var leftPosition = 0;

  $playButton.click(function(){
    var bpm = jQuery("#track_1").attr("data-bpm"),
    bpm = Number(bpm),
    pulse = (60/bpm) * 1000;

    if(music.paused === false){
      $playButton.html("<i class=\"fas fa-play\"></i>");
      music.pause();
      $turntable.removeClass("play");
      $tonearm.removeClass("play");
      $musicBox.removeClass("play");
      clearInterval(interval);
    } else {
      $turntable.addClass("play");
      $musicBox.addClass("play");
      $tonearm.addClass("play");
      $playButton.html("<i class=\"fas fa-pause\"></i>");
      // add deley to match tonearm animation
      setTimeout(function(){
      music.play();
      }, 1000);

      setTimeout(function(){
        pulseAnimation();
        interval = setInterval(function(){
          pulseAnimation();
        },pulse);
      }, 1500);
    }

    function pulseAnimation() {
      $woofer.addClass("pulse");
      setTimeout(function(){
        $woofer.removeClass("pulse");
      }, pulse - 100);
    }
  });

  $stopButton.click(function(){
      music.pause();
      music.currentTime = 0;
      $turntable.removeClass("play");
      $musicBox.removeClass("play");
      $tonearm.removeClass("play");
      $playButton.html("<i class=\"fas fa-play\"></i>");
      clearInterval(interval);
  });

  $muteButton.click(function(){
    if(music.muted === false) {
      music.muted = true;
      $muteButton.html("<i class=\"fas fa-volume-up\"></i>");
      $muteButton.addClass("muted");
    } else {
      music.muted = false;
      $muteButton.html("<i class=\"fas fa-volume-mute\"></i>");
    }
  });

  jQuery("#track_1").on("ended", function(){
    music.pause();
    $playButton.html("<i class=\"fas fa-play\"></i>");
    $tonearm.removeClass("play");
    $turntable.removeClass("play");
    $musicBox.removeClass("play");
    clearInterval(interval);
  });

  /* Demo Controls */
  jQuery('#demo').click(function(){
      captain.toggleClass("attack");
  });

  jQuery(document).keydown(function(e){
    if (!keyPressed) {
      keyPressed = e.keyCode;
      console.log(e.keyCode);
      switch(e.keyCode) {
        case 88:
          captainMove("attack");
        break;
        case 65:
          captainMove("left");
        break;
        case 68:
          captainMove("right")
          break;
        case 87:
          captainMove("jump");
        break;
      }
    }
  });

  jQuery(document).keyup(function(e){
    if(e.keyCode === keyPressed){
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


  // animating the scroll so when a user clicks a link, the transition would be smooth insteead of just jumping
  jQuery("#menu li a").click(function(e) {
    e.preventDefault();
    var scrollTo = jQuery(this).attr('href');
    var offset;

    if(scrollTo.length) {
      // switch ID
      switch(scrollTo) {
        case "#home":
          offset = 0;
          break;
        default:
          offset = jQuery(scrollTo).offset().top - 90;
          break;
      }

      //apply offset
      jQuery("html, body").stop().animate({ scrollTop: offset }, 800);
      }
  });

  //apply the scroll effect function
  jQuery(window).scroll(scrollEvents);

  function scrollEvents(){
    var scrollValue = jQuery(window).scrollTop();
    if(scrollValue === 0) {
      jQuery('#header').removeClass('sticky');
    } else {
      jQuery('#header').addClass('sticky');
    }
  }

  /*
   * code references fpr scroll to top and link animation
   * https://www.abeautifulsite.net/smoothly-scroll-to-an-element-without-a-jquery-plugin-2
   * https://www.templatemonster.com/blog/back-to-top-button-css-jquery/
  **/

});
