var selectedWord = "";
var selectedHint = "";
var board = [];
var checked = false;
var won = false;
var remainingGuesses = 6;
var words = [{ word: "snake", hint: "It's an reptile" },
    { word: "monkey", hint: "It's an mammal" },
    { word: "beetle", hint: "It's an insect" }
];

var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];



window.onload = startGame();


$("#hint").click(function() {
    $("#hint").hide();
    if (checked === false) {
        $("#word").append("<span class='hint'>Hint:" + selectedHint + "</span>");
        checkLetters($(this).attr("id"));
    }
    checked = true;
});


$(".letter").click(function() {
    checkLetters($(this).attr("id"));
    disableButton($(this));
});

$(".replayBtn").on("click", function() {

    location.reload();
});

//functions

function guessedWords(win) {
    var word = sessionStorage.getItem("rightGuess") == null ? " " : sessionStorage.getItem("rightGuess");
    if (win) {
        word += selectedWord + "<br>";
    }
    sessionStorage.setItem("rightGuess", word);
}

document.getElementById("guesses").innerHTML = sessionStorage.getItem("rightGuess");

function startGame() {

    if (sessionStorage.getItem("rightGuess") != null) {
        document.getElementById("label").innerHTML = "Your Previous Guesses";
    }

    pickWord();
    createLetters();
    initBoard();
    updateBoard();

}

function pickWord() {
    var randomInt = Math.floor(Math.random() * words.length);
    selectedWord = words[randomInt].word.toUpperCase();
    selectedHint = words[randomInt].hint;
}

function updateWord(positions, letter) {
    for (var pos of positions) {
        board[pos] = letter;
    }
    updateBoard();
}

function checkLetters(letter) {
    var positions = new Array();

    for (var i = 0; i < selectedWord.length; i++) {
        console.log(selectedWord);
        if (letter == selectedWord[i]) {
            positions.push(i);
        }

    }

    if (positions.length > 0) {
        updateWord(positions, letter);

        if (!board.includes('_')) {
            endGame(true);
            guessedWords(true);
        }

    }
    else {
        remainingGuesses -= 1;
        if (remainingGuesses >= -1) {
            updateMan();
        }
    }
    if (remainingGuesses <= 0) {
        endGame(false);
    }
}

function endGame(win) {
    $("#letters").hide();

    if (win) {
        $("#won").show();
        $("#hint").hide();
    }
    else {
        $("#lost").show();
    }

}


function updateBoard() {
    $("#word").empty();

    for (var i = 0; i < board.length; i++) {
        $("#word").append(board[i] + " ");
    }
    $("#word").append("<br>");

}

function updateMan() {

    if (remainingGuesses === -1) {
        $("#hangImg").attr("src", "img/gameOver.png");
    }
    else {
        $("#hangImg").attr("src", "img/stick_" + (6 - remainingGuesses) + ".png");

    }
}

function createLetters() {
    for (var letter of alphabet) {
        $("#letters").append("<button class='letter' id='" + letter + "'>" + letter + "</button>");
    }
}


function initBoard() {
    for (var letter in selectedWord) {
        board.push("_");
    }
}

function disableButton(btn) {
    btn.prop("disabled", true);
    btn.attr("class", "btn btn-danger");
}
