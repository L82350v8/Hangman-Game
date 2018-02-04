//  ======================================< variables >============================================= //

var userGuess          = "";
var userWins           = 0;
var userLosses         = 0;
var userWonGame        = "false";
var userLostGame       = "false";
var ltrMatchFnd        = "false";
var ltrValid           = "false";
var firstGame          = "true";
var userTriesRemaining = 0;
var usedLetterArray    = [];
var computerChoices    = ["CAMARO",
                          "MUSTANG",
                          "CORVETTE",
                          "FIREBIRD",
                          "COBRA",
                          "CHARGER",
                          "CHEVELLE",
                          "NOVA",
                          "BARRACUDA"];
var computerPick       = "";
var gameWord           = "";
var gWordLength        = 0;
var gWordDisplay       = "";
var gWordDisplayArray  = [];
var matchedLtrsCnt     = 0;
var uScore             = "_ ";
var alphabet           = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var pressKeyMsg        = "Press any key to start a game.";
var userWonMsg         = "You've Won the game! Press any key to play another game.";
var userLostMsg        = "You Lose! - Game over - Press any key to play another game.";

//  ======================================< functions >============================================== //

function newGame() {
    document.getElementById("user-wins").innerHTML = userWins;
    document.getElementById("user-losses").innerHTML = userLosses;
    userTriesRemaining = 10;
    document.getElementById("user-tries-remaining").innerHTML = userTriesRemaining;
    usedLetterArray = [];
    document.getElementById("used-letters").innerHTML = usedLetterArray;
    gWordDisplayArray = [];
    document.getElementById("game-word").innerHTML = gWordDisplay;
    matchedLtrsCnt = 0;
    document.getElementById("user-msg").innerHTML = "";
}

function letterValidation(typedLetter) {
    ltrValid = "false";
    var keyIdx = alphabet.indexOf(typedLetter);
    if (keyIdx === -1) {
        alert("Invalid character entered.\nPlease enter an alphabetic letter to play the game.");
    }
    else {
        ltrValid = "true";
    }
    return ltrValid;
}

function pickGameWord() {
    // Randomly chooses a choice from the options array. This is the Computer's guess.
    computerPick = computerChoices[Math.floor(Math.random() * computerChoices.length)];
    
    gameWord = computerPick;
    gWordLength = gameWord.length;
    
    gWordDisplay = uScore.repeat(gameWord.length);
    document.getElementById("game-word").innerHTML = gWordDisplay;
    
    gWordArray = computerPick.split('');

    for (var b = 0; b < gameWord.length; b++) {
        gWordDisplayArray[b] = "_";
    }
}

function findLetterMatches(letterGuess) {
    ltrMatchFnd = "false";
    var gWordLtr = "";

    var gWordDisplayTxt = gWordDisplayArray.toString();
    var gWordDisplayIdx = gWordDisplayTxt.indexOf(letterGuess);
    if (gWordDisplayIdx === -1) {
        for (var a = 0; a < gameWord.length; a++) {
            gWordLtr = gameWord.charAt(a);
            if (gWordLtr === letterGuess) {
                gWordDisplayArray[a] = letterGuess;
                ltrMatchFnd = "true";
                matchedLtrsCnt++
            }
        }
        document.getElementById("game-word").innerHTML = gWordDisplayArray.join(" ");
        if (matchedLtrsCnt >= gWordLength) {
            gameWon();
        }
    }
    else {
        alert("The letter " + letterGuess +
            " was already found in the Current Word.\nPlease choose an different letter.");

        ltrMatchFnd = "true";
    }
    return ltrMatchFnd;
}

function collectLettersUsed(uLetter) {
    var usedLetterFound = "false";
    for (var c = 0; c < usedLetterArray.length; c++) {
        if (usedLetterArray[c] === uLetter) {
            usedLetterFound = "true";
            alert("You have already guessed the letter " + usedLetterArray[c] +
                "\nPlease enter a letter that has not been already guessed.");
            break;
        }
    }
    if (usedLetterFound === "false") {
        if (ltrValid === "true") {
            usedLetterArray[usedLetterArray.length] = uLetter;
            document.getElementById("used-letters").innerHTML = usedLetterArray.join(" ");
            userTriesRemaining--;
            document.getElementById("user-tries-remaining").innerHTML = userTriesRemaining;
            if (userTriesRemaining === 0) {
                gameLost();
            }
        }
    }
}

function gameWon() {
    userWonGame = "true";
    document.getElementById("user-msg").innerHTML = userWonMsg;
    userWins++;
    document.getElementById("user-wins").innerHTML = userWins;
}

function gameLost() {
    userLostGame = "true";
    document.getElementById("user-msg").innerHTML = userLostMsg;
    userLosses++;
    document.getElementById("user-losses").innerHTML = userLosses;
}

// ####################################< main process >############################################# //

document.getElementById("user-msg").innerHTML = pressKeyMsg;

document.onkeyup = function (event) {
    userGuess = event.key.toUpperCase();

    if (firstGame === "true") {
        firstGame = "false";
        newGame();                            /* initialize counters for new game. */
        pickGameWord();                       /* app picks a new word for user to guess. */
    }
    else if (userWonGame === "true" || userLostGame === "true") {
        if (userWonGame === "true") {
            userWonGame = "false";
        }
        else {
            userLostGame = "false";
        }
        document.getElementById("user-guess").innerHTML = "";
        newGame();
        pickGameWord();
    }
    else {
        document.getElementById("user-guess").innerHTML = userGuess;      /* display key.*/
        letterValidation(userGuess);          /* validate user typed an alphabetic key. */
        findLetterMatches(userGuess);
        if (ltrMatchFnd === "false") {
            collectLettersUsed(userGuess);
        }
    }
}
