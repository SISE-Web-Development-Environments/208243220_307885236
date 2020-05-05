var modalWin = document.getElementById('dialogWinner');

var spanWin = document.getElementsByClassName("closeWin")[0];

var spanStartOverGame = document.getElementsByClassName("closeWinStartGame")[0];


spanWin.onclick = function() {
    modalWin.style.display='none';
    showMenuWelcome();
}

spanStartOverGame.onclick = function() {
    modalWin.style.display='none';
    showGame();
}
