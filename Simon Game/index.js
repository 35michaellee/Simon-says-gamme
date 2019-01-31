var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;



$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Creating a new sequence
function nextSequence() {

  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  //flash animation
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
  level++;
};

function animatePress(currentColor) {

  //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");

  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


// adding evnt listeners
$(".btn").click(function(event) {

  userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor)
  console.log("user " + userClickedPattern);
  console.log("game " + gamePattern);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);

  // if statement for game over
  /*for (var i = 0;i<userChosenColor.length; i++)
    if (userChosenColor[i] !== gamePattern[i]) {

      $("#level-title").text("Game over");
    };*/
  /*if (userClickedPattern.length===gamePattern.length){
    for (var i = 0;i<userChosenColor.length; i++)
      if (userChosenColor[i] !== gamePattern[i]) {

        $("#level-title").text("Game over");
        console.log("game over");
        userClickedPattern.length=0;
        gamePattern.length=0;
      };
      userClickedPattern.length=0;
      nextSequence();

  };*/ //this clears the user array to be buuilt again for the next challenge

});



function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");
    //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
    playSound("wrong");

    //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }


}


function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}




function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};
