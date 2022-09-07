var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var isGameStarted = false;

//Start the game the first time the user presses "a"
$(document).keydown(function(e) {
  if (e.key === "a") {
    if (isGameStarted === false) {
      isGameStarted = true;
      nextSequence();
    }
  }

});

//Function to chose next random colour
function nextSequence() {
  //Generate a random number between 0 and 3
  var randomNumber = Math.floor((Math.random() * 4));
  //Use random number to pick a colour from colours array
  var randomChosenColour = buttonColours[randomNumber];
  //Push random colour to the game pattern array
  gamePattern.push(randomChosenColour);
  //Give a quick animation to see what random colour was chosen
  $("#" + randomChosenColour).addClass("pressed");
  setTimeout(function() {
    $("#" + randomChosenColour).removeClass("pressed");
  }, 100);
  playSound(randomChosenColour);
  //Update h1 with level number
  $("#level-title").text("Level " + level);
  //Increase level when function is called
  level++;
}


//Storing the colour the user clicked into an array
$(".btn").click(function(e) {
  userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


//Function for playing a sound based on the colour passed in
function playSound(colour) {
  var sound = new Audio(colour + ".mp3");
  sound.play();
}

//Give a quick animation for when a button has been pressed
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//Check answer function
function checkAnswer(currentLevel) {
  //If the last button clicked is equal to the last color in the game pattern array
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //Once the user has completed the pattern reset their pattern and recall funciton
    if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    //If user click is incoorect then flash screen red
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    //Change h1 to say game over
    $("#level-title").text("Game Over, Press A to Restart!")
    startOver();
  }
}

//Reset all values if user gets game over
function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  isGameStarted = false;
}
