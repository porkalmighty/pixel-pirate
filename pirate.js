jQuery(document).ready(function(){
  var $playButton = jQuery("button[name='play_button']");
  var $stopButton = jQuery("button[name='stop_button']");
  var $muteButton = jQuery("button[name='mute_button']");
  var $turntable = jQuery("#lp-outer");
  var $woofer = jQuery(".woofer");
  var $musicBox = jQuery("#music-box");
  var music = jQuery("#track_1")[0];

  $playButton.click(function(){
    var bpm = jQuery("#track_1").attr("data-bpm"),
    bpm = Number(bpm),
    pulse = (60/bpm) * 1000;

    if(music.paused === false){
      $playButton.html("<i class=\"fas fa-play\"></i>");
      music.pause();
      $turntable.removeClass("play");
      $musicBox.removeClass("play");
      clearInterval(interval);
    } else {
      $turntable.addClass("play");
      $musicBox.addClass("play");
      $playButton.html("<i class=\"fas fa-pause\"></i>");
      pulseAnimation();
      interval = setInterval(function(){
        pulseAnimation();
      },pulse);
      music.play();
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

  if(music.currentTime === music.duration){
    music.pause();
    $turntable.removeClass("play");
    $musicBox.removeClass("play");
    clearInterval(interval);
  }

});
