/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/***********Challeges changes- part-1**********/
/* A player looses all his entire score ( globasl a well as round score) if he rolls two sixes in a row.
Hint: always save the previous dice roll in a seperate variable */


// declaring variables for global scores of both players(scores), current/roundscore ,& activeplayer.
var scores, roundScore, activePlayer, gamePlaying, lastDice;
init();

function init() {
    //initializing the variables
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true; // state variable , remembers the previous state.

    //set every score to 0;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    //hide the dice
    document.getElementById('dice1').style.display = 'none';
    document.getElementById('dice2').style.display = 'none';

    // after hiiting on new game button reset.
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    //make sure active class is not applied to any  player
    document.querySelector('.player-0-panel').classList.remove('active');
    // same as above
    document.querySelector('.player-1-panel').classList.remove('active');
    //add active class topanel 0 coz its defualt;
    document.querySelector('.player-0-panel').classList.add('active');
}

//event handler on roll btn
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        //step:1 generating random numbers for dice
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //step: 2 display result
        //a: selecting the dice image and displaying it
        document.getElementById('dice1').style.display = 'block';
        document.getElementById('dice2').style.display = 'block';

        //c: changing the dice image on roll btn clicks.
        document.getElementById('dice1').src = 'img/dice-' + dice1 + '.png';
        document.getElementById('dice2').src = 'img/dice-' + dice2 + '.png';

        //step:3 update the round score if number was not 1


        if (dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            //selecting the current id and putting the dice variable value into roundscore.
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else {
            nextPlayer();
        }



        /* if (dice === 6 && lastDice === 6) {
             roundScore = 0;
             scores[activePlayer] = 0;
             document.querySelector('#current-' + activePlayer).textContent = '0';
             document.querySelector('#score-' + activePlayer).textContent = '0';
             nextPlayer();
         }
         else if (dice !== 1) {
             roundScore += dice;
             //selecting the current id and putting the dice variable value into roundscore.
             document.querySelector('#current-' + activePlayer).textContent = roundScore;
         }
         else {
             nextPlayer();
         }
         
        // stores the dice value, which we can use to check if player rolls simaltanously two sixes, when player hits again roll btn. 
        lastDice = dice; 
        */
    }
});

//hold function
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add current score to Global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won the game
        // winnig score input
        var input = document.querySelector('#final_score').value;
        var winning_score;

        if (input) {
            winning_score = input;
        }
        else {
            winning_score = 100;
        }
        //check if player wons
        if (scores[activePlayer] >= winning_score) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            document.getElementById('dice1').style.display = 'none';
            document.getElementById('dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else {
            nextPlayer();
        }
    }

});

function nextPlayer() {
    // changes the player's turn
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    //set 0 on interface
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // for learning/refrence purpose
    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');

    //Toggle class automatically adds and removes classes based on the given conditions.
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice1').style.display = 'none';
    document.getElementById('dice2').style.display = 'none';
}

//new game
document.querySelector('.btn-new').addEventListener('click', function () {
    init();
});





