 /*
  *  define varibales:
  *    cards: list that holds all cards
  *    openCards: list that holds all open cards
  *    moves: used to increase number of moves
  *    movesValue: total moves number
  *    rating: current performance rate
  *    time: total time until now
  *    timer: used to decrease the time value
  *    cardsRemain: number of unfinished cards
  *    restart: holds restart icon
  *    ratingStar: holds list of star rating to be modified through the game
  *    startTimer: varibale used to call the timer function every 1 sec
  */
 let cards = document.querySelectorAll('li.card');
 let openCards = new Array();
 let moves = 0;
 let movesValue = document.getElementById("moves");
 let rating = 0;
 let time = 0;
 let timer = 30;
 let cardsRemain = 16 ;
 let restart = document.getElementById("restart");
 let ratingStar = document.querySelectorAll('li.star');
 var startTimer;
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex].innerHTML;
        array[currentIndex].innerHTML = array[randomIndex].innerHTML;
        array[randomIndex].innerHTML = temporaryValue;
    }

    return array;
}

// // add event listener that reload the page whenever the restart icon clicked
// restart.addEventListener('click',reset);

// flip the card by showing the symbol and make some CSS changes
function flip(e) {
    e.classList.add("open","show");
}

// add the clicked card to openCards array and call match function if the opend cards more than one
function AddToOpenCards(e) {
    openCards.push(e);
    e.removeEventListener('click',listenerFunction);
    if(openCards.length>=2)
    {
      if(openCards[0].innerHTML==openCards[1].innerHTML)
      {
        match(e);
        match(openCards[0]);
        openCards.length = 0;
      }
      else {
        unmatch();
      }
    }
}

// check for matchability between tow opend cards
function match(e) {
    e.classList.remove("open","show","unmatch");
    e.classList.add("match");
    cardsRemain--;
    //romve listener function for the two matched cards
    e.removeEventListener('click',listenerFunction);
}

// add umatch CSS effect then call unflip function
function unmatch() {
  for (var i = 0; i < openCards.length; i++) {
    if(openCards[i].classList.toggle("unmatch")){
      openCards[i].classList.add("unmatch");
    }
    openCards[i].addEventListener('click',listenerFunction);
  }
  setTimeout(unflip , 700);
}

// flip the unmatched card by hidding the symbol and make some CSS changes
function unflip() {
  for (var i = 0; i < openCards.length; i++) {
    openCards[i].classList.remove("open","show");
  }
  openCards.length = 0;
}

// hide all cards symbol to start the game
function unflipAll() {
  for (var i = 0; i < cards.length; i++) {
    cards[i].classList.remove("open","show");
  }

  // start timer by update the count down every 1 second
  startTimer = setInterval(setTime, 1000);
}

// function that calculate moves number as well as update the rating star by change the class of the icons
function movesCounter() {
  moves++;
  movesValue.textContent=moves;
  if (moves <= 16)
  {
    rating = 3;
  }else if (moves <= 25) {
    rating = 2;
    ratingStar[2].classList.remove("fa","fa-star");
    ratingStar[2].classList.add("fa","fa-star-o");
  }else {
    rating = 1;
    ratingStar[1].classList.remove("fa","fa-star");
    ratingStar[1].classList.add("fa","fa-star-o");
  }
}

// time count time function
function setTime() {

  // Time calculations for seconds
  time = timer--;

  // Display the result in the element with id="demo"
  document.getElementById("time").innerHTML = time + " s ";

  // If the count down is finished, stop the game and call game over function
  if (time === -1) {
    clearInterval(startTimer);
    document.getElementById("time").innerHTML =  "0 s ";
    gameOver();
  }

  // If the user win, call game end function
  if (cardsRemain === 0){
    clearInterval(startTimer);
    document.getElementById("time").innerHTML =  time + " s ";
    gameEnd();
  }
};

// popup window when the user is win and display the rating and time took to finish the game
function gameEnd() {
  time = 30 - time;
  if(confirm('Congratulations 🎉🎉! You did it with \ntotal moves:'+ moves +'\nStar rating: '+ rating +' \nDuration: ' + time + ' Sec.\n Do you want to play again?'))
  {
    window.location.reload();
  }
}

// popup window when the time is over
function gameOver() {
  if(confirm('Game Over :(!!\nDo you want to try again?'))
  {
    window.location.reload();
  }else{
    // if the user press cancel then disable all the unflip cards to froze the boerd
    for (var i = 0; i < cards.length; i++ ) {
        cards[i].removeEventListener('click', listenerFunction);
    }
  }
}

// Restart the boerd, time, rating star and moves by refresh the page
function reset(){
  window.location.reload();
}

/*
 * listener function that will be excuted if any card is clicked,
 *     1- flip the card
 *     2- add it to the opened cards
 *     3- increase the moves counter
 */
function listenerFunction() {
    flip(this);
    AddToOpenCards(this);
    movesCounter();
}

// add listener event for every card a
function createEventListener() {
  for (var i = 0; i < cards.length; i++ ) {
      cards[i].addEventListener('click', listenerFunction);
  }
}

// game render when the page is loaded
var start = gameRender();

// render function to set up all the functionality
function gameRender(){

  // add event listener that reload the page whenever the restart icon clicked
  restart.addEventListener('click',reset);

  // shuffles the cards randomly, create an event listener for each card and then start the game
  cards = shuffle(cards);

  // add event listener for each card
  createEventListener();

  // show the cards for 1300 milisecond then hide it and start the game
  for (var i = 0; i < cards.length; i++ ) {
      flip(cards[i]);
  }

  // hide cards content and start the game timer
  setTimeout(unflipAll , 1300);

};
