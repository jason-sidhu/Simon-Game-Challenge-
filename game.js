//-----Array for the button colors ---
var buttonColors = ["red", "blue", "green", "yellow"];

//----empty array to push random colors
var gamePattern = [];

//empty array for users clicked pattern
var userClickedPattern = [];

// level
var level = 0;

$(document).keydown(function(event){
  if (level === 0){
    setTimeout(nextSequence, 500);
  }
});


// -----New Pattern for Game ------
function nextSequence(){
  $("h1").text("Level " + level);
  level++;
  //random number between 0 and 3
  var randomNumber = Math.floor((Math.random() * 4));

  //random color picker
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //fading of button
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  //play sound
  playSound(randomChosenColor);
}

//button that user clicked
$(".btn").click(function(event){

  //storing id of button
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  //call sound
  playSound(userChosenColor);

  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);

});


//check answer
function checkAnswer(currentLevel){
  var matchAnswer = false;


  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    matchAnswer = true;
  } else if(matchAnswer === false) {
    gameOver();
  }

if ( (matchAnswer === true) && (userClickedPattern.length === gamePattern.length)){
    userClickedPattern = [];
    setTimeout(nextSequence, 1500);
  }
}


//game over
function gameOver(){
  userClickedPattern = [];
  gamePattern = [];
  var gameOver = new Audio("sounds/wrong.mp3");
  gameOver.play();

  $("body").addClass("game-over");

  setTimeout(function () {
    $("body").removeClass('game-over');
}, 200);

  $("h1").text("Game over, you got to level " + level + ". Press any key to restart.");
  level = 0;
}



//playing button sound
function playSound(name){
  var buttonSound = new Audio("sounds/"+name + '.mp3');
  buttonSound.play();

}

//animating Press
function animatePress(currentcolor){
  $("#"+currentcolor).addClass("pressed");

  setTimeout(function () {
    $('#'+ currentcolor).removeClass('pressed');
}, 100);}
