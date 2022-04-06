window.onload = (event) => {
    var win = localStorage.getItem("win"); //bool if player won last game
    var won = document.getElementById('won');
    var played = document.getElementById('played');
    var wonPersent = document.getElementById('won%');

    var counterNumOfPlayed = localStorage.getItem("numberOfPlayed");
    played.value = counterNumOfPlayed; //set num of game played

    if (win == 1) {
        localStorage.setItem("win", 0);
        var counterNumOfWins = localStorage.getItem("score"); //number of wins

        if (!counterNumOfWins) {
            localStorage.setItem("score", 0); //number of wins
        }

        counterNumOfWins = localStorage.getItem("score");
        counterNumOfWins++;
        localStorage.setItem("score", counterNumOfWins);
    }
    setGuessStatistics();

    var counterNumOfWins = localStorage.getItem("score");
    won.value = counterNumOfWins;
    wonPersent.value = counterNumOfWins / played.value;
};

function setGuessStatistics() {
    for (var i = 0; i < 7; i++) {
        var value = localStorage.getItem("" + (i));
        if (value) {
            var guessElement = document.getElementById("" + (i));
            guessElement.value = value;
        }
    }
}

function clear() {
    localStorage.clear();
    console.log(localStorage);
}
