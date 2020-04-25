var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var center;
var food_remain;

//keyboards arguments
var keyUp;
var keyRight;
var keyDown;
var keyLeft;

var pacman = new Object();
pacman.img = new Image();
pacman.img.src = "right.png";
pacman.imgDown = new Image();
pacman.imgDown.src = "down.png";
pacman.imgUp = new Image();
pacman.imgUp.src = "up.png";
pacman.imgLeft = new Image();
pacman.imgLeft.src = "left.png";
pacman.imgRight = new Image();
pacman.imgRight.src = "right.png";

var monster = new Object();
monster.img = new Image();
monster.img.src = "blue.png";
monster.blue = new Image();
monster.blue.src = "blue.png";
monster.orange = new Image();
monster.orange.src = "orange.png";
monster.green = new Image();
monster.green.src = "green.png";
monster.red = new Image();
monster.red.src = "red.png";

var potionGood = new Object();
potionGood.good = new Image();
potionGood.good.src = "goodp.png";
var potionBad = new Object();
potionBad.bad = new Image();
potionBad.bad.src = "badp.png";

var clock = new Object();
clock.img = new Image();
clock.img.src = "clock.png";

var totalTimeOfGame;
var pacmanLife=5;

$(document).ready(function () {
    $("#startGameSettings").click(function () {
        context = canvas.getContext("2d");
        Start();

        var paragraph = document.getElementById("userNameShow");
        var text = "User Name: " + document.getElementById("userNameLogIn").value;
        paragraph.innerText = text;

    });
});


//var tmpTimeHilla;
function Start() {
    createMonsterPositions();
    board = new Array();
    score = 0;
    pac_color = "yellow";
    var cnt = 116;
    food_remain = document.getElementById("numberCookies").value;
    var pacman_remain = 1;
    var goodpotion_remain=1;
    var badpotion_remain=1;
    var clockLife_remain=1;
    start_time = new Date();
    totalTimeOfGame = document.getElementById('gameTime').value;

    for (var i = 0; i < 14; i++) {
        board[i] = new Array();
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
        for (var j = 0; j < 9; j++) {
            if (
                (i == 3 && j == 3) ||
                (i == 3 && j == 4) ||
                (i == 3 && j == 5) ||
                (i == 6 && j == 1) ||
                (i == 6 && j == 2) ||
                (i == 8 && j == 7) ||
                (i == 8 && j == 8) ||
                (i == 1 && j == 7) ||
                (i == 2 && j == 7) ||
                (i == 3 && j == 7) ||
                (i == 9 && j == 4) ||
                (i == 10 && j == 4) ||
                (i == 11 && j == 4) ||
                (i == 10) && (j == 2)
            ) {
                board[i][j] = 4;
            } else if ((i == 0 && j == 0)) {
                board[i][j] = 6;
            } else if ((i == 0 && j == 8)) {
                board[i][j] = 7;
            } else if ((i == 13 && j == 0)) {
                board[i][j] = 8;
            } else if ((i == 13 && j == 8)) {
                board[i][j] = 9;
            } else {
                var randomNum = Math.random();
                var randomPotion=Math.random();
                var randomPotion1=Math.random();
                var randomClock=Math.random();
                if (randomNum <= (1.0 * food_remain) / cnt) {
                    food_remain--;
                    var randomNum2 = Math.random();
                    var randomNum3 = Math.random();
                    if (randomNum2 < 0.3) { //fifth
                        board[i][j] = 3;
                    } else if (randomNum3 < 0.1) { //twenty
                        board[i][j] = 5;
                    } else {
                        board[i][j] = 1;
                    }
                } else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
                    shape.i = i;
                    shape.j = j;
                    pacman_remain--;
                    board[i][j] = 2;
                } else if (goodpotion_remain===1 && randomPotion < 0.1){
                    goodpotion_remain--;
                    board[i][j] = 10;
                } else if ( badpotion_remain===1 && randomPotion1 < 0.1){
                    badpotion_remain--;
                    board[i][j] = 11;
                } else if ( clockLife_remain===1 && randomClock < 0.1){
                    clockLife_remain--;
                    board[i][j] = 12;
                }else{
                    board[i][j] = 0;
                }
                cnt--;
            }
        }
    }
    while (food_remain > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 1;
        food_remain--;
    }
    keysDown = {};
    addEventListener(
        "keydown",
        function (e) {
            keysDown[e.keyCode] = true;
        },
        false
    );
    addEventListener(
        "keyup",
        function (e) {
            keysDown[e.keyCode] = false;
        },
        false
    );
    interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
    var i = Math.floor(Math.random() * 9 + 1);
    var j = Math.floor(Math.random() * 9 + 1);
    while (board[i][j] != 0) {
        i = Math.floor(Math.random() * 9 + 1);
        j = Math.floor(Math.random() * 9 + 1);
    }
    return [i, j];
}

function GetKeyPressed() {
    if (keysDown[38] || keysDown[keyUp]) {//up
        pacman.img = pacman.imgUp;
        return 1;
    }
    if (keysDown[40] || keysDown[keyDown]) {//down
        pacman.img = pacman.imgDown;
        return 2;
    }
    if (keysDown[37] || keysDown[keyLeft]) {//left
        pacman.img = pacman.imgLeft;
        return 3;
    }
    if (keysDown[39] || keysDown[keyRight]) {//right
        pacman.img = pacman.imgRight;
        return 4;
    }
}


function Draw() {
    canvas.width = canvas.width; //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;
    lblLive.value= pacmanLife;
    for (var i = 0; i < 14; i++) {
        for (var j = 0; j < 9; j++) {
            center = new Object();
            center.x = i * 50 + 17;
            center.y = j * 50 + 17;
            if (board[i][j] === 2) {
                context.drawImage(pacman.img, center.x - 18, center.y - 18, 40, 40);
            } else if (board[i][j] === 1) {
                context.beginPath();
                context.arc(center.x, center.y, 8, 0, 2 * Math.PI); // circle
                context.fillStyle = document.getElementById("fiveCookie").value; //color //dots-food
                context.fill();
                context.beginPath();
                context.arc(center.x + 3, center.y - 3, 2, 0, 2 * Math.PI); // circle
                context.fillStyle = document.getElementById("fiveChip").value; //color
                context.fill();
                context.beginPath();
                context.arc(center.x - 4, center.y + 1, 2, 0, 2 * Math.PI); // circle
                context.fillStyle = document.getElementById("fiveChip").value; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 3, center.y + 4, 2, 0, 2 * Math.PI); // circle
                context.fillStyle = document.getElementById("fiveChip").value; //color
                context.fill();
            } else if (board[i][j] === 4) {//walls

//                 var grd = context.createRadialGradient(center.x - 25, center.y - 25,5,90,60,100);
//                 context.addColorStop(0,"#406CB2");
//                 context.addColorStop(1,"white");
//
// // Fill with gradient
//                 context.fillStyle = grd;
//                 context.fillRect(10,10,150,80);
//

                context.beginPath();
                context.rect(center.x - 25, center.y - 25, 50, 50);
                context.fillStyle = "white"; //color
                context.fill();
            } else if (board[i][j] === 3) {
                context.beginPath();
                context.arc(center.x, center.y, 12, 0, 2 * Math.PI); // circle
                context.fillStyle = document.getElementById("fifthCookie").value; //color //dots-food
                context.fill();
                context.beginPath();
                context.arc(center.x + 4, center.y - 5, 3, 0, 2 * Math.PI); // circle
                context.fillStyle = document.getElementById("fifthChip").value; //color
                context.fill();
                context.beginPath();
                context.arc(center.x - 6, center.y + 2, 3, 0, 2 * Math.PI); // circle
                context.fillStyle = document.getElementById("fifthChip").value; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 5, center.y + 6, 3, 0, 2 * Math.PI); // circle
                context.fillStyle = document.getElementById("fifthChip").value; //color
                context.fill();
            } else if (board[i][j] === 5) {
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = document.getElementById("twentyCookie").value; //color //dots-food
                context.fill();
                context.beginPath();
                context.arc(center.x + 4, center.y - 8, 4, 0, 2 * Math.PI); // circle
                context.fillStyle = document.getElementById("twentyChip").value; //color
                context.fill();
                context.beginPath();
                context.arc(center.x - 6, center.y + 2, 4, 0, 2 * Math.PI); // circle
                context.fillStyle = document.getElementById("twentyChip").value; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 7, center.y + 6, 4, 0, 2 * Math.PI); // circle
                context.fillStyle = document.getElementById("twentyChip").value; //color
                context.fill();
            } else if (board[i][j] === 6) {
                if (randomMonster1 === 0) {
                    context.drawImage(monster.blue, center.x - 10, center.y - 18, 32, 34);
                } else if (randomMonster2 === 0) {
                    context.drawImage(monster.orange, center.x - 10, center.y - 18, 32, 34);
                } else if (randomMonster3 === 0) {
                    context.drawImage(monster.green, center.x - 10, center.y - 18, 32, 34);
                } else if (randomMonster4 === 0) {
                    context.drawImage(monster.red, center.x - 10, center.y - 18, 32, 34);
                }
            } else if (board[i][j] === 7) {
                if (randomMonster1 === 1) {
                    context.drawImage(monster.blue, center.x - 10, center.y - 18, 32, 34);
                } else if (randomMonster2 === 1) {
                    context.drawImage(monster.orange, center.x - 10, center.y - 18, 32, 34);
                } else if (randomMonster3 === 1) {
                    context.drawImage(monster.green, center.x - 10, center.y - 18, 32, 34);
                } else if (randomMonster4 === 1) {
                    context.drawImage(monster.red, center.x - 10, center.y - 18, 32, 34);
                }
            } else if (board[i][j] === 8) {
                if (randomMonster1 === 2) {
                    context.drawImage(monster.blue, center.x - 10, center.y - 18, 32, 34);
                } else if (randomMonster2 === 2) {
                    context.drawImage(monster.orange, center.x - 10, center.y - 18, 32, 34);
                } else if (randomMonster3 === 2) {
                    context.drawImage(monster.green, center.x - 10, center.y - 18, 32, 34);
                } else if (randomMonster4 === 2) {
                    context.drawImage(monster.red, center.x - 10, center.y - 18, 32, 34);
                }
            } else if (board[i][j] === 9) {
                if (randomMonster1 === 3) {
                    context.drawImage(monster.blue, center.x - 10, center.y - 18, 32, 34);
                } else if (randomMonster2 === 3) {
                    context.drawImage(monster.orange, center.x - 10, center.y - 18, 32, 34);
                } else if (randomMonster3 === 3) {
                    context.drawImage(monster.green, center.x - 10, center.y - 18, 32, 34);
                } else if (randomMonster4 === 3) {
                    context.drawImage(monster.red, center.x - 10, center.y - 18, 32, 34);
                }
            }else if(board[i][j]===10){
                context.drawImage(potionGood.good, center.x - 18, center.y - 18, 40, 40);
            }else if(board[i][j]===11){
                context.drawImage(potionBad.bad, center.x - 18, center.y - 18, 40, 40);
            }else if(board[i][j]===12){
                context.drawImage(clock.img, center.x - 18, center.y - 18, 35, 35);
            }
        }
    }
}

var tmpTime=0;

function UpdatePosition() {
    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
    if (x === 1) {//up
        if (shape.j > 0 && board[shape.i][shape.j - 1] !== 4) {
            shape.j--;
        }

        }
    if (x === 2) {
        if (shape.j < 8 && board[shape.i][shape.j + 1] !== 4) {
            shape.j++;
        }
    }
    if (x === 3) { //left
        if (shape.i > 0 && board[shape.i - 1][shape.j] !== 4) {
            shape.i--;
        }
    }
    if (x === 4) {
        if (shape.i < 13 && board[shape.i + 1][shape.j] !== 4) {
            shape.i++;
        }
    }
    if (board[shape.i][shape.j] === 6 || board[shape.i][shape.j] === 7 || board[shape.i][shape.j] === 8 || board[shape.i][shape.j] === 9) {
        if (score < 10) {
            score = 0;
        } else {
            score -= 10;
        }
        pacmanLife--;
    }
    if (board[shape.i][shape.j] === 1) {
        score += 5;
    }
    if (board[shape.i][shape.j] === 3) {
        score += 15;
    }
    if (board[shape.i][shape.j] === 5) {
        score += 25;
    }
    if (board[shape.i][shape.j] === 10) {
        pacmanLife += 1;
    }
    if (board[shape.i][shape.j] === 11) {
        pacmanLife -= 1;
    }

    if (board[shape.i][shape.j] === 12) {
       tmpTime=20;
      // alert(parseInt(totalTimeOfGame)+parseInt(tmpTime));
       // totalTimeOfGame=totalTimeOfGame+tmpTime;
    }
    board[shape.i][shape.j] = 2;
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;

    //todo!
    if (time_elapsed.valueOf() >= parseInt(totalTimeOfGame)+parseInt(tmpTime)) {
        window.clearInterval(interval);
        if (score < 100) {
            window.alert("You are better than " + score + " points");
        } else {
            window.alert("Winner!!!");
        }

    } else if (pacmanLife === 0) {
        window.alert("Loser!");
        if (confirm("do you want to start new game?")) {
            showMenu('settings');
        } else {
            showMenu('welcome');
        }
    } else {
        Draw();
    }
}


//stop scrolling
window.addEventListener("keydown", function (e) {
    // arrow keys
    if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);


function upPress(event) {
    keyUp = parseInt(event.keyCode);
}

function rightPress(event) {
    keyRight = parseInt(event.keyCode);
}

function downPress(event) {
    keyDown = parseInt(event.keyCode);
}

function leftPress(event) {
    keyLeft = parseInt(event.keyCode);
}

var audio=new Audio("music.mp3");
var img1 = "mute.png";
var img2 = "unmute.png";
var musicOn = false;

function musicController(){
    var imgElement = document.getElementById('imageMusic');

    //imgElement.src = (imgElement.src === img1)? img2 : img1;
    if(musicOn){
        imgElement.src = img1;
        audio.pause();
        musicOn = false;
    }else{
        imgElement.src = img2;
        audio.play();
        musicOn = true;
    }
}


