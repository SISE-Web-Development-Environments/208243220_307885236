var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var intervalMonsters;
var intervalAlmo;
var center;
var food_remain;
var tmpTime = 0;
var collision = false;

var pacman = new Object();
pacman.img = new Image();
pacman.img.src = "Resources/right.png";
pacman.imgDown = new Image();
pacman.imgDown.src = "Resources/down.png";
pacman.imgUp = new Image();
pacman.imgUp.src = "Resources/up.png";
pacman.imgLeft = new Image();
pacman.imgLeft.src = "Resources/left.png";
pacman.imgRight = new Image();
pacman.imgRight.src = "Resources/right.png";

var monster = new Object();
monster.img = new Image();
monster.img.src = "Resources/blue.png";
monster.blue = new Image();
monster.blue.src = "Resources/blue.png";
monster.orange = new Image();
monster.orange.src = "Resources/orange.png";
monster.green = new Image();
monster.green.src = "Resources/green.png";
monster.red = new Image();
monster.red.src = "Resources/red.png";

var potionGood = new Object();
potionGood.good = new Image();
potionGood.good.src = "Resources/goodp.png";
var potionBad = new Object();
potionBad.bad = new Image();
potionBad.bad.src = "Resources/badp.png";

var clock = new Object();
clock.img = new Image();
clock.img.src = "Resources/clock.png";

var almo = new Object();
almo.img = new Image();
almo.img.src = "Resources/almo.png";

var totalTimeOfGame;
var pacmanLife;

var audio = new Audio("Resources/eating.mp3");
var img1 = "Resources/mute.png";
var img2 = "Resources/unmute.png";
var musicOn;

var monsterBlueX;
var monsterBlueY;
var monsterRedX;
var monsterRedY;
var monsterGreenX;
var monsterGreenY;
var monsterOrangeX;
var monsterOrangeY;

var prevBlue;
var currBlue;
var prevOrange;
var currOrange;
var prevGreen;
var currGreen;
var prevRed;
var currRed;

var almoX;
var almoY;
var prevAlmo;
var currAlmo;

var obstacleBlue = false;
var lastMoveBlue;
var blockedMoveBlue;

var obstacleOrange = false;
var lastMoveOrange;
var blockedMoveOrange;

var obstacleGreen = false;
var lastMoveGreen;
var blockedMoveGreen;

var obstacleRed = false;
var lastMoveRed;
var blockedMoveRed;

$(document).ready(function () {
    $("#startGameSettings").click(function () {
        context = canvas.getContext("2d");
        Start();
        var paragraph = document.getElementById("userNameShow");
        var text = "User Name: " + document.getElementById("userNameLogIn").value;
        paragraph.innerText = text;

    });
});

function Start() {

    monster.img = null;
    musicOn = false;
    musicController();

    clearInterval(intervalMonsters);
    clearInterval(interval);
    clearInterval(intervalAlmo);

    totalTimeOfGame=0;
    prevBlue = 0;
    currBlue = 0;
    prevOrange = 0;
    currOrange = 0;
    prevGreen = 0;
    currGreen = 0;
    prevRed = 0;
    currRed = 0;

    blockedMoveBlue = 0;
    blockedMoveOrange = 0;
    blockedMoveGreen = 0;
    blockedMoveRed = 0;

    lastMoveBlue = 0;
    lastMoveOrange = 0;
    lastMoveGreen = 0;
    lastMoveRed = 0;

    prevAlmo = 0;
    currAlmo = 0;

    pacmanLife = 4;
    updateLife();

    board = new Array();
    score = 0;
    pac_color = "yellow";
    var cnt = 116;
    food_remain = document.getElementById("numberCookies").value;
    var pacman_remain = 1;
    var goodpotion_remain = 1;
    var badpotion_remain = 1;
    var clockLife_remain = 1;
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
                board[i][j] = 0;
            } else if ((i == 0 && j == 8)) {
                board[i][j] = 0;
            } else if ((i == 13 && j == 0)) {
                board[i][j] = 0;
            } else if ((i == 13 && j == 8)) {
                board[i][j] = 0;
            } else {
                var randomNum = Math.random();
                var randomPotion = Math.random();
                var randomPotion1 = Math.random();
                var randomClock = Math.random();
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
                } else if (goodpotion_remain === 1 && randomPotion < 0.1) {
                    goodpotion_remain--;
                    board[i][j] = 10;
                } else if (badpotion_remain === 1 && randomPotion1 < 0.1) {
                    badpotion_remain--;
                    board[i][j] = 11;
                } else if (clockLife_remain === 1 && randomClock < 0.1) {
                    clockLife_remain--;
                    board[i][j] = 12;
                } else {
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

    createMonsterPositions();
    setMonstersStartPoint();
    setAlmoPosition();

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


    intervalMonsters = setInterval(UpdatePositionMonsters, 750);
    interval = setInterval(UpdatePosition, 500);
    intervalAlmo = setInterval(updatePositionAlmo, 750);

}


function findRandomEmptyCell(board) {
    var i = Math.floor(Math.random() * 13 + 1);
    var j = Math.floor(Math.random() * 8 + 1);
    while (board[i][j] != 0 || (i === 0 && j === 0) || (i === 13 && j === 0) || (i === 13 && j === 8) || (i === 0 && j === 8)) {
        i = Math.floor(Math.random() * 13 + 1);
        j = Math.floor(Math.random() * 8 + 1);
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

/************************************************Draw***********************************************/

function Draw() {
    canvas.width = canvas.width; //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;

    for (var i = 0; i < 14; i++) {
        for (var j = 0; j < 9; j++) {
            center = new Object();
            center.x = i * 50 + 17;
            center.y = j * 50 + 17;
            if (board[i][j] === 2) {
                DrawPacman(i, j);
            } else if (board[i][j] === 1 || board[i][j] === 3 || board[i][j] === 5) {
                DrawCookies(i, j);
            } else if (board[i][j] === 4) {//walls
                DrawWalls();
            } else if (board[i][j] === 6) {
                DrawMonsters(6);
            } else if (board[i][j] === 7) {
                DrawMonsters(7);
            } else if (board[i][j] === 8) {
                DrawMonsters(8);
            } else if (board[i][j] === 9) {
                DrawMonsters(9);
            } else if (board[i][j] === 10) {
                DrawGoodPotion();
            } else if (board[i][j] === 11) {
                DrawBadPotion();
            } else if (board[i][j] === 12) {
                DrawClock();
            } else if (board[i][j] === 13) {
                DrawAlmo();
            }
        }
    }
}

function DrawPacman(i, j) {
    center.x = i * 50 + 17;
    center.y = j * 50 + 17;
    context.drawImage(pacman.img, center.x - 18, center.y - 18, 40, 40);
}

function DrawCookies(i, j) {
    center.x = i * 50 + 17;
    center.y = j * 50 + 17;
    if (board[i][j] === 1) {
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
    }
}

function DrawWalls() {
    context.beginPath();
    context.rect(center.x - 25, center.y - 25, 50, 50);
    context.fillStyle = "white"; //color
    context.fill();
}

function DrawMonsters(choose) {
    if (choose === 6) {
        monster.img = null;
        if (randomMonster1 === 0) {
            monster.img = monster.blue;
        } else if (randomMonster2 === 0) {
            monster.img = monster.orange;
        } else if (randomMonster3 === 0) {
            monster.img = monster.green;
        } else if (randomMonster4 === 0) {
            monster.img = monster.red;
        }
        context.drawImage(monster.img, center.x - 10, center.y - 18, 32, 34);
    } else if (choose === 7) {
        monster.img = null;
        if (randomMonster1 === 1) {
            monster.img = monster.blue;
        } else if (randomMonster2 === 1) {
            monster.img = monster.orange;
        } else if (randomMonster3 === 1) {
            monster.img = monster.green;
        } else if (randomMonster4 === 1) {
            monster.img = monster.red;
        }
        context.drawImage(monster.img, center.x - 10, center.y - 18, 32, 34);
    } else if (choose === 8) {
        monster.img = null;
        if (randomMonster1 === 2) {
            monster.img = monster.blue;
        } else if (randomMonster2 === 2) {
            monster.img = monster.orange;
        } else if (randomMonster3 === 2) {
            monster.img = monster.green;
        } else if (randomMonster4 === 2) {
            monster.img = monster.red;
        }
        context.drawImage(monster.img, center.x - 10, center.y - 18, 32, 34);
    } else if (choose === 9) {
        monster.img = null;
        if (randomMonster1 === 3) {
            monster.img = monster.blue;
        } else if (randomMonster2 === 3) {
            monster.img = monster.orange;
        } else if (randomMonster3 === 3) {
            monster.img = monster.green;
        } else if (randomMonster4 === 3) {
            monster.img = monster.red;
        }
        context.drawImage(monster.img, center.x - 10, center.y - 18, 32, 34);
    }
}

function DrawGoodPotion() {
    context.drawImage(potionGood.good, center.x - 18, center.y - 18, 40, 40);
}

function DrawBadPotion() {
    context.drawImage(potionBad.bad, center.x - 18, center.y - 18, 40, 40);
}

function DrawClock() {
    context.drawImage(clock.img, center.x - 18, center.y - 18, 35, 35);
}

function DrawAlmo() {
    context.drawImage(almo.img, center.x - 18, center.y - 18, 35, 35);
}

/************************************************UpdatePosition***********************************************/

function UpdatePosition() {
    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
    if (x === 1) {//up
        if (shape.j > 0) {
            if ((board[shape.i][shape.j - 1] === 6) ||
                (board[shape.i][shape.j - 1] === 7) ||
                (board[shape.i][shape.j - 1] === 8) ||
                (board[shape.i][shape.j - 1] === 9)) {
                collision = true;
                updateScoreAfterCollision();
            } else if (board[shape.i][shape.j - 1] !== 4) {
                shape.j--;
            }
        }

    }
    if (x === 2) {
        if (shape.j < 8) {
            if ((board[shape.i][shape.j + 1] === 6) ||
                (board[shape.i][shape.j + 1] === 7) ||
                (board[shape.i][shape.j + 1] === 8) ||
                (board[shape.i][shape.j + 1] === 9)) {
                collision = true;
                updateScoreAfterCollision();
            } else if (board[shape.i][shape.j + 1] !== 4) {
                shape.j++;
            }
        }
    }
    if (x === 3) { //left
        if (shape.i > 0) {
            if ((board[shape.i - 1][shape.j] === 6) ||
                (board[shape.i - 1][shape.j] === 7) ||
                (board[shape.i - 1][shape.j] === 8) ||
                (board[shape.i - 1][shape.j] === 9)) {
                collision = true;
                updateScoreAfterCollision();
            } else if (board[shape.i - 1][shape.j] !== 4) {
                shape.i--;
            }
        }
    }
    if (x === 4) {
        if (shape.i < 13) {
            if ((board[shape.i + 1][shape.j] === 6) ||
                (board[shape.i + 1][shape.j] === 7) ||
                (board[shape.i + 1][shape.j] === 8) ||
                (board[shape.i + 1][shape.j] === 9)) {
                collision = true;
                updateScoreAfterCollision();
            } else if (board[shape.i + 1][shape.j] !== 4) {
                shape.i++;
            }
        }

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
    if (board[shape.i][shape.j] === 13) {
        score += 50;
        almo.img = null;
        currAlmo = -1;
        prevAlmo = -1;
        clearInterval(intervalAlmo);
    }
    if (board[shape.i][shape.j] === 10) {
        updateLife();
    }
    if (board[shape.i][shape.j] === 11) {
        looseLife();
    }

    if (board[shape.i][shape.j] === 12) {
        tmpTime = 20;
    }
    board[shape.i][shape.j] = 2;
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;

    checkCollision();

    // if (score >14) {
    //     win();
    // }else
    if (time_elapsed.valueOf() >= parseInt(totalTimeOfGame) + parseInt(tmpTime)) {
        window.clearInterval(interval);
        window.clearInterval(intervalMonsters);
        window.clearInterval(intervalAlmo);
        monsterBlue.checked=false;
        monsterOrange.checked=false;
        monsterGreen.checked=false;
        monsterRed.checked=false;
        board[0][0]=0;
        board[13][0]=0;
        board[13][8]=0;
        board[0][8]=0;
        if (score < 100) {
            window.alert("You are better than " + score + " points");
            showMenuSettings();
        } else {
            win();
        }

    } else if (pacmanLife === 0) {
        window.clearInterval(interval);
        window.clearInterval(intervalMonsters);
        window.clearInterval(intervalAlmo);
        monsterBlue.checked=false;
        monsterOrange.checked=false;
        monsterGreen.checked=false;
        monsterRed.checked=false;
        board[0][0]=0;
        board[13][0]=0;
        board[13][8]=0;
        board[0][8]=0;
        window.alert("Loser!");
        showMenuSettings();
    } else {
        Draw();
    }

}

function UpdatePositionMonsters() {
    for (let monsterColor in listMonsters) {
        let monsterChosen = listMonsters[monsterColor];
        let tmpKeyColor = Object.keys(monsterChosen)[0];
        let monColor = monsterChosen[tmpKeyColor];
        let tmpKeyPos = Object.keys(monsterChosen)[1];
        let monPlaceUpdatePosition = monsterChosen[tmpKeyPos];
        monPlaceUpdatePosition += 6;

        let disX;
        let disY;
        if (monColor === "blue" && monsterBlueX !== -1 && monsterBlueY !== -1) {
            currBlue = monPlaceUpdatePosition;
            disX = monsterBlueX - shape.i;
            disY = monsterBlueY - shape.j;
            if ((Math.abs(disX) === 1 && Math.abs(disY) === 0) || (Math.abs(disX) === 0 && Math.abs(disY) === 1)) {
                collision = true;
                updateScoreAfterCollision();
            } else if (obstacleBlue) {
                if (blockedMoveBlue === 1) {
                    if (monsterBlueX > 0 & board[monsterBlueX - 1][monsterBlueY] !== 4 &
                        board[monsterBlueX - 1][monsterBlueY] !== 6 & board[monsterBlueX - 1][monsterBlueY] !== 7 &
                        board[monsterBlueX - 1][monsterBlueY] !== 8 & board[monsterBlueX - 1][monsterBlueY] !== 9) {//up
                        board[monsterBlueX][monsterBlueY] = prevBlue;
                        prevBlue = board[monsterBlueX - 1][monsterBlueY];
                        board[monsterBlueX - 1][monsterBlueY] = currBlue;
                        currBlue = prevBlue;
                        monsterBlueX--;
                        obstacleBlue = false;
                    } else {
                        goToLastMoveBlue();
                    }
                } else if (blockedMoveBlue === 2) {
                    if (monsterBlueY < 8 & board[monsterBlueX][monsterBlueY + 1] !== 4 &
                        board[monsterBlueX][monsterBlueY + 1] !== 6 & board[monsterBlueX][monsterBlueY + 1] !== 7 &
                        board[monsterBlueX][monsterBlueY + 1] !== 8 & board[monsterBlueX][monsterBlueY + 1] !== 9) {//right
                        board[monsterBlueX][monsterBlueY] = prevBlue;
                        prevBlue = board[monsterBlueX][monsterBlueY + 1];
                        board[monsterBlueX][monsterBlueY + 1] = currBlue;
                        currBlue = prevBlue;
                        monsterBlueY++;
                        obstacleBlue = false;
                    } else {
                        goToLastMoveBlue();
                    }
                } else if (blockedMoveBlue === 3) {
                    if (monsterBlueX < 13 & board[monsterBlueX + 1][monsterBlueY] !== 4 &
                        board[monsterBlueX + 1][monsterBlueY] !== 6 & board[monsterBlueX + 1][monsterBlueY] !== 7 &
                        board[monsterBlueX + 1][monsterBlueY] !== 8 & board[monsterBlueX + 1][monsterBlueY] !== 9) {//down
                        board[monsterBlueX][monsterBlueY] = prevBlue;
                        prevBlue = board[monsterBlueX + 1][monsterBlueY];
                        board[monsterBlueX + 1][monsterBlueY] = currBlue;
                        currBlue = prevBlue;
                        monsterBlueX++;
                        obstacleBlue = false;
                    } else {
                        goToLastMoveBlue();
                    }
                } else if (blockedMoveBlue === 4) {
                    if (monsterBlueY > 0 & board[monsterBlueX][monsterBlueY - 1] !== 4 & board[monsterBlueX][monsterBlueY - 1] !== 6 &
                        board[monsterBlueX][monsterBlueY - 1] !== 7 & board[monsterBlueX][monsterBlueY - 1] !== 8 &
                        board[monsterBlueX][monsterBlueY - 1] !== 9) {//left
                        board[monsterBlueX][monsterBlueY] = prevBlue;
                        prevBlue = board[monsterBlueX][monsterBlueY - 1];
                        board[monsterBlueX][monsterBlueY - 1] = currBlue;
                        currBlue = prevBlue;
                        monsterBlueY--;
                        obstacleBlue = false;
                    } else {
                        goToLastMoveBlue();
                    }
                }

            } else if (Math.abs(disX) < Math.abs(disY)) {
                if (disX > 0) {//up
                    upBlue();
                } else if (disX < 0) {//down
                    downBlue();
                } else if (disY > 0) {//left
                    leftBlue();
                } else {//right
                    rightBlue();
                }


            } else if (Math.abs(disX) > Math.abs(disY)) {
                if (disY > 0) {//left
                    leftBlue();
                } else if (disY < 0) {//right
                    rightBlue();
                } else if (disX < 0) {//down
                    downBlue();
                } else {//up
                    upBlue();
                }
            }
        }else if (monColor === "orange" && monsterOrangeX !== -1 && monsterOrangeY !== -1) {
            currOrange = monPlaceUpdatePosition;
            disX = monsterOrangeX - shape.i;
            disY = monsterOrangeY - shape.j;
            if ((Math.abs(disX) === 1 && Math.abs(disY) === 0) || (Math.abs(disX) === 0 && Math.abs(disY) === 1)) {
                collision = true;
                updateScoreAfterCollision();
            } else if (obstacleOrange) {
                if (blockedMoveOrange === 1) {
                    if (monsterOrangeX > 0 & board[monsterOrangeX - 1][monsterOrangeY] !== 4 &
                        board[monsterOrangeX - 1][monsterOrangeY] !== 6 & board[monsterOrangeX - 1][monsterOrangeY] !== 7 &
                        board[monsterOrangeX - 1][monsterOrangeY] !== 8 & board[monsterOrangeX - 1][monsterOrangeY] !== 9) {//up
                        board[monsterOrangeX][monsterOrangeY] = prevOrange;
                        prevOrange = board[monsterOrangeX - 1][monsterOrangeY];
                        board[monsterOrangeX - 1][monsterOrangeY] = currOrange;
                        currOrange = prevOrange;
                        monsterOrangeX--;
                        obstacleOrange = false;
                    } else {
                        goToLastMoveOrange();
                    }
                } else if (blockedMoveOrange === 2) {
                    if (monsterOrangeY < 8 & board[monsterOrangeX][monsterOrangeY + 1] !== 4 &
                        board[monsterOrangeX][monsterOrangeY + 1] !== 6 & board[monsterOrangeX][monsterOrangeY + 1] !== 7 &
                        board[monsterOrangeX][monsterOrangeY + 1] !== 8 & board[monsterOrangeX][monsterOrangeY + 1] !== 9) {//right
                        board[monsterOrangeX][monsterOrangeY] = prevOrange;
                        prevOrange = board[monsterOrangeX][monsterOrangeY + 1];
                        board[monsterOrangeX][monsterOrangeY + 1] = currOrange;
                        currOrange = prevOrange;
                        monsterOrangeY++;
                        obstacleOrange = false;
                    } else {
                        goToLastMoveOrange();
                    }
                } else if (blockedMoveOrange === 3) {
                    if (monsterOrangeX < 13 & board[monsterOrangeX + 1][monsterOrangeY] !== 4 &
                        board[monsterOrangeX + 1][monsterOrangeY] !== 6 & board[monsterOrangeX + 1][monsterOrangeY] !== 7 &
                        board[monsterOrangeX + 1][monsterOrangeY] !== 8 & board[monsterOrangeX + 1][monsterOrangeY] !== 9) {//down
                        board[monsterOrangeX][monsterOrangeY] = prevOrange;
                        prevOrange = board[monsterOrangeX + 1][monsterOrangeY];
                        board[monsterOrangeX + 1][monsterOrangeY] = currOrange;
                        currOrange = prevOrange;
                        monsterOrangeX++;
                        obstacleOrange = false;
                    } else {
                        goToLastMoveOrange();
                    }
                } else if (blockedMoveOrange === 4) {
                    if (monsterOrangeY > 0 & board[monsterOrangeX][monsterOrangeY - 1] !== 4 &
                        board[monsterOrangeX][monsterOrangeY - 1] !== 6 & board[monsterOrangeX][monsterOrangeY - 1] !== 7 &
                        board[monsterOrangeX][monsterOrangeY - 1] !== 8 & board[monsterOrangeX][monsterOrangeY - 1] !== 9) {//left
                        board[monsterOrangeX][monsterOrangeY] = prevOrange;
                        prevOrange = board[monsterOrangeX][monsterOrangeY - 1];
                        board[monsterOrangeX][monsterOrangeY - 1] = currOrange;
                        currOrange = prevOrange;
                        monsterOrangeY--;
                        obstacleOrange = false;
                    } else {
                        goToLastMoveOrange();
                    }
                }

            } else if (Math.abs(disX) < Math.abs(disY)) {
                if (disX > 0) {//up
                    upOrange();
                } else if (disX < 0) {//down
                    downOrange();
                } else if (disY > 0) {//left
                    leftOrange();
                } else {//right
                    rightOrange();
                }
            } else if (Math.abs(disX) > Math.abs(disY)) {
                if (disY > 0) {//left
                    leftOrange();
                } else if (disY < 0) {//right
                    rightOrange();
                } else if (disX < 0) {//down
                    downOrange();
                } else {//up
                    upOrange();
                }
            }
        }else  if (monColor === "green" && monsterGreenX !== -1 && monsterGreenY !== -1) {
            currGreen = monPlaceUpdatePosition;
            disX = monsterGreenX - shape.i;
            disY = monsterGreenY - shape.j;
            if ((Math.abs(disX) === 1 && Math.abs(disY) === 0) || (Math.abs(disX) === 0 && Math.abs(disY) === 1)) {
                collision = true;
                updateScoreAfterCollision();
            } else if (obstacleGreen) {
                if (blockedMoveGreen === 1) {
                    if (monsterGreenX > 0 & board[monsterGreenX - 1][monsterGreenY] !== 4 &
                        board[monsterGreenX - 1][monsterGreenY] !== 6 & board[monsterGreenX - 1][monsterGreenY] !== 7 &
                        board[monsterGreenX - 1][monsterGreenY] !== 8 & board[monsterGreenX - 1][monsterGreenY] !== 9) {//up
                        board[monsterGreenX][monsterGreenY] = prevGreen;
                        prevGreen = board[monsterGreenX - 1][monsterGreenY];
                        board[monsterGreenX - 1][monsterGreenY] = currGreen;
                        currGreen = prevGreen;
                        monsterGreenX--;
                        obstacleGreen = false;
                    } else {
                        goToLastMoveGreen();
                    }
                } else if (blockedMoveGreen === 2) {
                    if (monsterGreenY < 8 & board[monsterGreenX][monsterGreenY + 1] !== 4 &
                        board[monsterGreenX][monsterGreenY + 1] !== 6 & board[monsterGreenX][monsterGreenY + 1] !== 7 &
                        board[monsterGreenX][monsterGreenY + 1] !== 8 & board[monsterGreenX][monsterGreenY + 1] !== 9) {//right
                        board[monsterGreenX][monsterGreenY] = prevGreen;
                        prevGreen = board[monsterGreenX][monsterGreenY + 1];
                        board[monsterGreenX][monsterGreenY + 1] = currGreen;
                        currGreen = prevGreen;
                        monsterGreenY++;
                        obstacleGreen = false;
                    } else {
                        goToLastMoveGreen();
                    }
                } else if (blockedMoveGreen === 3) {
                    if (monsterGreenX < 13 & board[monsterGreenX + 1][monsterGreenY] !== 4 &
                        board[monsterGreenX + 1][monsterGreenY] !== 6 & board[monsterGreenX + 1][monsterGreenY] !== 7 &
                        board[monsterGreenX + 1][monsterGreenY] !== 8 & board[monsterGreenX + 1][monsterGreenY] !== 9) {//down
                        board[monsterGreenX][monsterGreenY] = prevGreen;
                        prevGreen = board[monsterGreenX + 1][monsterGreenY];
                        board[monsterGreenX + 1][monsterGreenY] = currGreen;
                        currGreen = prevGreen;
                        monsterGreenX++;
                        obstacleGreen = false;
                    } else {
                        goToLastMoveGreen();
                    }
                } else if (blockedMoveGreen === 4) {
                    if (monsterGreenY > 0 & board[monsterGreenX][monsterGreenY - 1] !== 4 &
                        board[monsterGreenX][monsterGreenY - 1] !== 6 & board[monsterGreenX][monsterGreenY - 1] !== 7 &
                        board[monsterGreenX][monsterGreenY - 1] !== 8 & board[monsterGreenX][monsterGreenY - 1] !== 9) {//left
                        board[monsterGreenX][monsterGreenY] = prevGreen;
                        prevGreen = board[monsterGreenX][monsterGreenY - 1];
                        board[monsterGreenX][monsterGreenY - 1] = currGreen;
                        currGreen = prevGreen;
                        monsterGreenY--;
                        obstacleGreen = false;
                    } else {
                        goToLastMoveGreen();
                    }
                }

            } else if (Math.abs(disX) < Math.abs(disY)) {
                if (disX > 0) {//up
                    upGreen();
                } else if (disX < 0) {//down
                    downGreen();
                } else if (disY > 0) {//left
                    leftGreen();
                } else {//right
                    rightGreen();
                }
            } else if (Math.abs(disX) > Math.abs(disY)) {
                if (disY > 0) {//left
                    leftGreen();
                } else if (disY < 0) {//right
                    rightGreen();
                } else if (disX < 0) {//down
                    downGreen();
                } else {//up
                    upGreen();
                }
            }
        }else if (monColor === "red" && monsterRedX !== -1 && monsterRedY !== -1) {
            currRed = monPlaceUpdatePosition;
            disX = monsterRedX - shape.i;
            disY = monsterRedY - shape.j;
            if ((Math.abs(disX) === 1 && Math.abs(disY) === 0) || (Math.abs(disX) === 0 && Math.abs(disY) === 1)) {
                collision = true;
                updateScoreAfterCollision();
            } else if (obstacleRed) {
                if (blockedMoveRed === 1) {
                    if (monsterRedX > 0 & board[monsterRedX - 1][monsterRedY] !== 4 &
                        board[monsterRedX - 1][monsterRedY] !== 6 & board[monsterRedX - 1][monsterRedY] !== 7 &
                        board[monsterRedX - 1][monsterRedY] !== 8 & board[monsterRedX - 1][monsterRedY] !== 9) {//up
                        board[monsterRedX][monsterRedY] = prevRed;
                        prevRed = board[monsterRedX - 1][monsterRedY];
                        board[monsterRedX - 1][monsterRedY] = currRed;
                        currRed = prevRed;
                        monsterRedX--;
                        obstacleRed = false;
                    } else {
                        goToLastMoveRed();
                    }
                } else if (blockedMoveRed === 2) {
                    if (monsterRedY < 8 & board[monsterRedX][monsterRedY + 1] !== 4 &
                        board[monsterRedX][monsterRedY + 1] !== 6 & board[monsterRedX][monsterRedY + 1] !== 7 &
                        board[monsterRedX][monsterRedY + 1] !== 8 & board[monsterRedX][monsterRedY + 1] !== 9) {//right
                        board[monsterRedX][monsterRedY] = prevRed;
                        prevRed = board[monsterRedX][monsterRedY + 1];
                        board[monsterRedX][monsterRedY + 1] = currRed;
                        currRed = prevRed;
                        monsterRedY++;
                        obstacleRed = false;
                    } else {
                        goToLastMoveRed();
                    }
                } else if (blockedMoveRed === 3) {
                    if (monsterRedX < 13 & board[monsterRedX + 1][monsterRedY] !== 4 &
                        board[monsterRedX + 1][monsterRedY] !== 6 & board[monsterRedX + 1][monsterRedY] !== 7 &
                        board[monsterRedX + 1][monsterRedY] !== 8 & board[monsterRedX + 1][monsterRedY] !== 9) {//down
                        board[monsterRedX][monsterRedY] = prevRed;
                        prevRed = board[monsterRedX + 1][monsterRedY];
                        board[monsterRedX + 1][monsterRedY] = currRed;
                        currRed = prevRed;
                        monsterRedX++;
                        obstacleRed = false;
                    } else {
                        goToLastMoveRed();
                    }
                } else if (blockedMoveRed === 4) {
                    if (monsterRedY > 0 & board[monsterRedX][monsterRedY - 1] !== 4 &
                        board[monsterRedX][monsterRedY - 1] !== 6 & board[monsterRedX][monsterRedY - 1] !== 7 &
                        board[monsterRedX][monsterRedY - 1] !== 8 & board[monsterRedX][monsterRedY - 1] !== 9) {//left
                        board[monsterRedX][monsterRedY] = prevRed;
                        prevRed = board[monsterRedX][monsterRedY - 1];
                        board[monsterRedX][monsterRedY - 1] = currRed;
                        currRed = prevRed;
                        monsterRedY--;
                        obstacleRed = false;
                    } else {
                        goToLastMoveRed();
                    }
                }

            } else if (Math.abs(disX) < Math.abs(disY)) {
                if (disX > 0) {//up
                    upRed();
                } else if (disX < 0) {//down
                    downRed();
                } else if (disY > 0) {//left
                    leftRed();
                } else {//right
                    rightRed();
                }
            } else if (Math.abs(disX) > Math.abs(disY)) {
                if (disY > 0) {//left
                    leftRed();
                } else if (disY < 0) {//right
                    rightRed();
                } else if (disX < 0) {//down
                    downRed();
                } else {//up
                    upRed();
                }
            }
        }
        checkCollision();
        Draw();
    }
}

function updatePositionAlmo() {
    let randomMove;
    currAlmo = 13;
    if (almoX > 0 && almoX < 13 && almoY > 0 && almoY < 8 && board[almoX + 1][almoY] !== 4 &&
        board[almoX - 1][almoY] !== 4 && board[almoX][almoY + 1] !== 4 && board[almoX][almoY - 1] !== 4) {
        randomMove = Math.floor(Math.random() * 3);
        if (randomMove == 0) {
            downAlmo();
        } else if (randomMove == 1) {
            upAlmo();
        } else if (randomMove == 2) {
            rightAlmo();
        } else if (randomMove == 3) {
            leftAlmo();
        }
    } else if (almoX > 0 && board[almoX - 1][almoY] !== 4 && almoX < 13 && board[almoX + 1][almoY] !== 4 && almoY > 0 && board[almoX][almoY - 1] !== 4) {
        //up down left
        randomMove = Math.floor(Math.random() * 2);
        if (randomMove == 0) {
            upAlmo();
        } else if (randomMove == 1) {
            downAlmo();
        } else if (randomMove == 2) {
            leftAlmo();
        }
    } else if (almoX > 0 && board[almoX - 1][almoY] !== 4 && almoX < 13 && board[almoX + 1][almoY] !== 4 && almoY < 8 && board[almoX][almoY + 1] !== 4) {
        //up down right
        randomMove = Math.floor(Math.random() * 2);
        if (randomMove == 0) {
            upAlmo();
        } else if (randomMove == 1) {
            downAlmo();
        } else if (randomMove == 2) {
            rightAlmo();
        }
    } else if (almoY > 0 && board[almoX][almoY - 1] !== 4 && almoX < 13 && board[almoX + 1][almoY] !== 4 && almoY < 8 && board[almoX][almoY + 1] !== 4) {
        //down right left
        randomMove = Math.floor(Math.random() * 2);
        if (randomMove == 0) {
            leftAlmo();
        } else if (randomMove == 1) {
            downAlmo();
        } else if (randomMove == 2) {
            rightAlmo();
        }
    } else if (almoY > 0 && board[almoX][almoY - 1] !== 4 && almoX > 0 && board[almoX - 1][almoY] !== 4 && almoY < 8 && board[almoX][almoY + 1] !== 4) {
        //up left right
        randomMove = Math.floor(Math.random() * 2);
        if (randomMove == 0) {
            leftAlmo();
        } else if (randomMove == 1) {
            upAlmo();
        } else if (randomMove == 2) {
            rightAlmo();
        }
    } else if (almoX > 0 && board[almoX - 1][almoY] !== 4 && almoX < 13 && board[almoX + 1][almoY] !== 4) {
        //up down
        randomMove = Math.floor(Math.random() * 2);
        if (randomMove == 0) {
            upAlmo();
        } else if (randomMove == 1) {
            downAlmo();
        }
    } else if (almoX > 0 && board[almoX - 1][almoY] !== 4 && almoY > 0 && board[almoX][almoY - 1] !== 4) {
        //up left
        randomMove = Math.floor(Math.random() * 2);
        if (randomMove == 0) {
            upAlmo();
        } else if (randomMove == 1) {
            leftAlmo();
        }
    } else if (almoX > 0 && board[almoX - 1][almoY] !== 4 && almoY < 8 && board[almoX][almoY + 1] !== 4) {
        //up right
        randomMove = Math.floor(Math.random() * 2);
        if (randomMove == 0) {
            upAlmo();
        } else if (randomMove == 1) {
            rightAlmo();
        }
    } else if (almoX < 13 && board[almoX + 1][almoY] !== 4 && almoY > 0 && board[almoX][almoY - 1] !== 4) {
        //down left
        randomMove = Math.floor(Math.random() * 2);
        if (randomMove == 0) {
            downAlmo();
        } else if (randomMove == 1) {
            leftAlmo();
        }
    } else if (almoY > 0 && board[almoX][almoY - 1] !== 4 && almoY < 8 && board[almoX][almoY + 1] !== 4) {
        //left right
        randomMove = Math.floor(Math.random() * 2);
        if (randomMove == 0) {
            leftAlmo();
        } else if (randomMove == 1) {
            rightAlmo();
        }
    } else if (almoX < 13 && board[almoX + 1][almoY] !== 4 && almoY < 8 && board[almoX][almoY + 1] !== 4) {
        //down  right
        randomMove = Math.floor(Math.random() * 2);
        if (randomMove == 0) {
            downAlmo();
        } else if (randomMove == 1) {
            rightAlmo();
        }
    } else if (almoX < 13 && board[almoX + 1][almoY] !== 4) {
        downAlmo();
    } else if (almoX > 0 && board[almoX - 1][almoY] !== 4) {
        upAlmo();
    } else if (almoY < 8 && board[almoX][almoY + 1] !== 4) {
        rightAlmo();
    } else if (almoY > 0 && board[almoX][almoY - 1] !== 4) {
        leftAlmo();
    }
    Draw();
}

/********************lastMove****************************/

function goToLastMoveBlue() {
    if (lastMoveBlue === 1) {
        if (monsterBlueX > 0 & board[monsterBlueX - 1][monsterBlueY] !== 4) {//up
            board[monsterBlueX][monsterBlueY] = prevBlue;
            prevBlue = board[monsterBlueX - 1][monsterBlueY];
            board[monsterBlueX - 1][monsterBlueY] = currBlue;
            currBlue = prevBlue;
            monsterBlueX--;
        }
    }
    if (lastMoveBlue === 2) {
        if (monsterBlueY < 8 & board[monsterBlueX][monsterBlueY + 1] !== 4) {//right
            board[monsterBlueX][monsterBlueY] = prevBlue;
            prevBlue = board[monsterBlueX][monsterBlueY + 1];
            board[monsterBlueX][monsterBlueY + 1] = currBlue;
            currBlue = prevBlue;
            monsterBlueY++;
        }
    }
    if (lastMoveBlue === 3) {
        if (monsterBlueX < 13 & board[monsterBlueX + 1][monsterBlueY] !== 4) {//down
            board[monsterBlueX][monsterBlueY] = prevBlue;
            prevBlue = board[monsterBlueX + 1][monsterBlueY];
            board[monsterBlueX + 1][monsterBlueY] = currBlue;
            currBlue = prevBlue;
            monsterBlueX++;
        }
    }
    if (lastMoveBlue === 4) {
        if (monsterBlueY > 0 & board[monsterBlueX][monsterBlueY - 1] !== 4) {//left
            board[monsterBlueX][monsterBlueY] = prevBlue;
            prevBlue = board[monsterBlueX][monsterBlueY - 1];
            board[monsterBlueX][monsterBlueY - 1] = currBlue;
            currBlue = prevBlue;
            monsterBlueY--;
        }
    }
}

function goToLastMoveOrange() {
    if (lastMoveOrange === 1) {
        if (monsterOrangeX > 0 & board[monsterOrangeX - 1][monsterOrangeY] !== 4) {//up
            board[monsterOrangeX][monsterOrangeY] = prevOrange;
            prevOrange = board[monsterOrangeX - 1][monsterOrangeY];
            board[monsterOrangeX - 1][monsterOrangeY] = currOrange;
            currOrange = prevOrange;
            monsterOrangeX--;
        }
    }
    if (lastMoveOrange === 2) {
        if (monsterOrangeY < 8 & board[monsterOrangeX][monsterOrangeY + 1] !== 4) {//right
            board[monsterOrangeX][monsterOrangeY] = prevOrange;
            prevOrange = board[monsterOrangeX][monsterOrangeY + 1];
            board[monsterOrangeX][monsterOrangeY + 1] = currOrange;
            currOrange = prevOrange;
            monsterOrangeY++;
        }
    }
    if (lastMoveOrange === 3) {
        if (monsterOrangeX < 13 & board[monsterOrangeX + 1][monsterOrangeY] !== 4) {//down
            board[monsterOrangeX][monsterOrangeY] = prevOrange;
            prevOrange = board[monsterOrangeX + 1][monsterOrangeY];
            board[monsterOrangeX + 1][monsterOrangeY] = currOrange;
            currOrange = prevOrange;
            monsterOrangeX++;
        }
    }
    if (lastMoveOrange === 4) {
        if (monsterOrangeY > 0 & board[monsterOrangeX][monsterOrangeY - 1] !== 4) {//left
            board[monsterOrangeX][monsterOrangeY] = prevOrange;
            prevOrange = board[monsterOrangeX][monsterOrangeY - 1];
            board[monsterOrangeX][monsterOrangeY - 1] = currOrange;
            currOrange = prevOrange;
            monsterOrangeY--;
        }
    }
}

function goToLastMoveGreen() {
    if (lastMoveGreen === 1) {
        if (monsterGreenX > 0 & board[monsterGreenX - 1][monsterGreenY] !== 4) {//up
            board[monsterGreenX][monsterGreenY] = prevGreen;
            prevGreen = board[monsterGreenX - 1][monsterGreenY];
            board[monsterGreenX - 1][monsterGreenY] = currGreen;
            currGreen = prevGreen;
            monsterGreenX--;
        }
    }
    if (lastMoveGreen === 2) {
        if (monsterGreenY < 8 & board[monsterGreenX][monsterGreenY + 1] !== 4) {//right
            board[monsterGreenX][monsterGreenY] = prevGreen;
            prevGreen = board[monsterGreenX][monsterGreenY + 1];
            board[monsterGreenX][monsterGreenY + 1] = currGreen;
            currGreen = prevGreen;
            monsterGreenY++;
        }
    }
    if (lastMoveGreen === 3) {
        if (monsterGreenX < 13 & board[monsterGreenX + 1][monsterGreenY] !== 4) {//down
            board[monsterGreenX][monsterGreenY] = prevGreen;
            prevGreen = board[monsterGreenX + 1][monsterGreenY];
            board[monsterGreenX + 1][monsterGreenY] = currGreen;
            currGreen = prevGreen;
            monsterGreenX++;
        }
    }
    if (lastMoveGreen === 4) {
        if (monsterGreenY > 0 & board[monsterGreenX][monsterGreenY - 1] !== 4) {//left
            board[monsterGreenX][monsterGreenY] = prevGreen;
            prevGreen = board[monsterGreenX][monsterGreenY - 1];
            board[monsterGreenX][monsterGreenY - 1] = currGreen;
            currGreen = prevGreen;
            monsterGreenY--;
        }
    }
}

function goToLastMoveRed() {
    if (lastMoveRed === 1) {
        if (monsterRedX > 0 & board[monsterRedX - 1][monsterRedY] !== 4) {//up
            board[monsterRedX][monsterRedY] = prevRed;
            prevRed = board[monsterRedX - 1][monsterRedY];
            board[monsterRedX - 1][monsterRedY] = currRed;
            currRed = prevRed;
            monsterRedX--;
        }
    }
    if (lastMoveRed === 2) {
        if (monsterRedY < 8 & board[monsterRedX][monsterRedY + 1] !== 4) {//right
            board[monsterRedX][monsterRedY] = prevRed;
            prevRed = board[monsterRedX][monsterRedY + 1];
            board[monsterRedX][monsterRedY + 1] = currRed;
            currRed = prevRed;
            monsterRedY++;
        }
    }
    if (lastMoveRed === 3) {
        if (monsterRedX < 13 & board[monsterRedX + 1][monsterRedY] !== 4) {//down
            board[monsterRedX][monsterRedY] = prevRed;
            prevRed = board[monsterRedX + 1][monsterRedY];
            board[monsterRedX + 1][monsterRedY] = currRed;
            currRed = prevRed;
            monsterRedX++;
        }
    }
    if (lastMoveRed === 4) {
        if (monsterRedY > 0 & board[monsterRedX][monsterRedY - 1] !== 4) {//left
            board[monsterRedX][monsterRedY] = prevRed;
            prevRed = board[monsterRedX][monsterRedY - 1];
            board[monsterRedX][monsterRedY - 1] = currRed;
            currRed = prevRed;
            monsterRedY--;
        }
    }
}

/************************************************SetPosition***********************************************/

function setMonstersStartPoint() {
    monsterBlueX = -1;
    monsterBlueY = -1;
    monsterRedX = -1;
    monsterRedY = -1;
    monsterGreenX = -1;
    monsterGreenY = -1;
    monsterOrangeX = -1;
    monsterOrangeY = -1;


    for (let monsterColor in listMonsters) {
        let monsterChosen = listMonsters[monsterColor];
        let tmpKeyColor = Object.keys(monsterChosen)[0];
        let monColor = monsterChosen[tmpKeyColor];
        let tmpKeyPos = Object.keys(monsterChosen)[1];
        let monPlace = monsterChosen[tmpKeyPos];
        monPlace += 6;

        if (monPlace === 6) {
            board[0][0] = 6;
            if (monColor === "blue") {
                monsterBlueX = 0;
                monsterBlueY = 0;
            } else if (monColor === "orange") {
                monsterOrangeX = 0;
                monsterOrangeY = 0;
            } else if (monColor === "green") {
                monsterGreenX = 0;
                monsterGreenY = 0;
            } else if (monColor === "red") {
                monsterRedX = 0;
                monsterRedY = 0;
            }
        } else if (monPlace === 7) {
            board[13][0] = 7;
            if (monColor === "blue") {
                monsterBlueX = 13;
                monsterBlueY = 0;
            } else if (monColor === "orange") {
                monsterOrangeX = 13;
                monsterOrangeY = 0;
            } else if (monColor === "green") {
                monsterGreenX = 13;
                monsterGreenY = 0;
            } else if (monColor === "red") {
                monsterRedX = 13;
                monsterRedY = 0;
            }
        } else if (monPlace === 8) {
            board[13][8] = 8;
            if (monColor === "blue") {
                monsterBlueX = 13;
                monsterBlueY = 8;
            } else if (monColor === "orange") {
                monsterOrangeX = 13;
                monsterOrangeY = 8;
            } else if (monColor === "green") {
                monsterGreenX = 13;
                monsterGreenY = 8;
            } else if (monColor === "red") {
                monsterRedX = 13;
                monsterRedY = 8;
            }
        } else if (monPlace === 9) {
            board[0][8] = 9;
            if (monColor === "blue") {
                monsterBlueX = 0;
                monsterBlueY = 8;
            } else if (monColor === "orange") {
                monsterOrangeX = 0;
                monsterOrangeY = 8;
            } else if (monColor === "green") {
                monsterGreenX = 0;
                monsterGreenY = 8;
            } else if (monColor === "red") {
                monsterRedX = 0;
                monsterRedY = 8;
            }
        }
    }
}

function setAlmoPosition() {
    almoX = -1;
    almoY = -1;

    let exist6 = false;
    let exist7 = false;
    let exist8 = false;
    let exist9 = false;
    let randomAlmo;
    //4 monsters
    if (listMonsters.length === 4) {
        var emptyCellAlmo = findRandomEmptyCell(board);
        board[emptyCellAlmo[0]][emptyCellAlmo[1]] = 13;
        almoX = emptyCellAlmo[0];
        almoY = emptyCellAlmo[1];
    } else if (listMonsters.length === 3) {//3 monsters
        if (board[0][0] === 0) {
            board[0][0] = 13;
            almoX = 0;
            almoY = 0;
        } else if (board[0][8] === 0) {
            board[0][8] = 13;
            almoX = 0;
            almoY = 8;
        } else if (board[13][8] === 0) {
            board[13][8] = 13;
            almoX = 13;
            almoY = 8;
        } else if (board[13][0] === 0) {
            board[13][0] = 13;
            almoX = 13;
            almoY = 0;
        }
    } else if (listMonsters.length <= 2) { //two monster
        if (board[0][0] === 6) {
            exist6 = true;
        }
        if (board[13][0] === 7) {
            exist7 = true;
        }
        if (board[13][8] === 8) {
            exist8 = true;
        }
        if (board[0][8] === 9) {
            exist9 = true;
        }
        if (listMonsters.length === 2) {
            randomAlmo = Math.floor(Math.random());
            if (exist6 && exist7) {
                if (randomAlmo == 0) {
                    board[13][8] = 13;
                    almoX = 13;
                    almoY = 8;
                } else {
                    board[13][0] = 13;
                    almoX = 13;
                    almoY = 0;
                }
            } else if (exist6 && exist8) {
                if (randomAlmo == 0) {
                    board[0][8] = 13;
                    almoX = 0;
                    almoY = 8;
                } else {
                    board[13][0] = 13;
                    almoX = 13;
                    almoY = 0;
                }
            } else if (exist6 && exist9) {
                if (randomAlmo == 0) {
                    board[0][8] = 13;
                    almoX = 0;
                    almoY = 8;
                } else {
                    board[13][8] = 13;
                    almoX = 13;
                    almoY = 8;
                }
            } else if (exist7 && exist8) {
                if (randomAlmo == 0) {
                    board[0][0] = 13;
                    almoX = 0;
                    almoY = 0;
                } else {
                    board[13][0] = 13;
                    almoX = 13;
                    almoY = 0;
                }
            } else if (exist7 && exist9) {
                if (randomAlmo == 0) {
                    board[0][0] = 13;
                    almoX = 0;
                    almoY = 0;
                } else {
                    board[13][8] = 13;
                    almoX = 13;
                    almoY = 8;
                }
            } else if (exist8 && exist9) {
                if (randomAlmo == 0) {
                    board[0][8] = 13;
                    almoX = 0;
                    almoY = 8;
                } else {
                    board[0][0] = 13;
                    almoX = 0;
                    almoY = 0;
                }
            }
        } else if (listMonsters.length === 1) {
            randomAlmo = Math.floor(Math.random() * 2);
            if (exist6) {
                if (randomAlmo == 0) {
                    board[0][8] = 13;
                    almoX = 0;
                    almoY = 8;
                } else if (randomAlmo == 1) {
                    board[13][8] = 13;
                    almoX = 13;
                    almoY = 8;
                } else {
                    board[13][0] = 13;
                    almoX = 13;
                    almoY = 0;
                }
            } else if (exist7) {
                if (randomAlmo == 0) {
                    board[0][0] = 13;
                    almoX = 0;
                    almoY = 0;
                } else if (randomAlmo == 1) {
                    board[13][8] = 13;
                    almoX = 13;
                    almoY = 8;
                } else {
                    board[13][0] = 13;
                    almoX = 13;
                    almoY = 0;
                }
            } else if (exist8) {
                if (randomAlmo == 0) {
                    board[0][0] = 13;
                    almoX = 0;
                    almoY = 0;
                } else if (randomAlmo == 1) {
                    board[0][8] = 13;
                    almoX = 0;
                    almoY = 8;
                } else {
                    board[13][0] = 13;
                    almoX = 13;
                    almoY = 0;
                }
            } else if (exist9) {
                if (randomAlmo == 0) {
                    board[0][0] = 13;
                    almoX = 0;
                    almoY = 0;
                } else if (randomAlmo == 1) {
                    board[13][8] = 13;
                    almoX = 13;
                    almoY = 8;
                } else {
                    board[0][8] = 13;
                    almoX = 0;
                    almoY = 8;
                }
            }
        }
    }
}

function checkCollision() {

    if (collision) {
        if (pacmanLife !== 0) {
            collision = false;

            pacman.img = null;
            var randomI = Math.floor(Math.random() * 13);
            var randomJ = Math.floor(Math.random() * 8);
            while (board[randomI][randomJ] !== 0 ||
            (randomI === 0 && randomJ === 0) ||
            (randomI === 13 && randomJ === 0) ||
            (randomI === 13 && randomJ === 8) ||
            (randomI === 0 && randomJ === 8)) {
                randomI = Math.floor(Math.random() * 13);
                randomJ = Math.floor(Math.random() * 8);
            }
            board[shape.i][shape.j] = 0;
            shape.i = randomI;
            shape.j = randomJ;

            pacman.img = pacman.imgRight;

            monster.img=null;
            createMonsterPositions();
            setMonstersStartPoint();
        }
    }
}

/************************************************Almo***********************************************/

function upAlmo() {
    if (almoX > 0 & board[almoX - 1][almoY] !== 4 &
        board[almoX - 1][almoY] !== 6 & board[almoX - 1][almoY] !== 7 &
        board[almoX - 1][almoY] !== 8 & board[almoX - 1][almoY] !== 9) {
        board[almoX][almoY] = prevAlmo;
        prevAlmo = board[almoX - 1][almoY];
        board[almoX - 1][almoY] = currAlmo;
        currAlmo = prevAlmo;
        almoX--;
    }
}

function downAlmo() {
    if (almoX < 13 & board[almoX + 1][almoY] !== 4 &
        board[almoX + 1][almoY] !== 6 & board[almoX + 1][almoY] !== 7 &
        board[almoX + 1][almoY] !== 8 & board[almoX + 1][almoY] !== 9) {
        board[almoX][almoY] = prevAlmo;
        prevAlmo = board[almoX + 1][almoY];
        board[almoX + 1][almoY] = currAlmo;
        currAlmo = prevAlmo;
        almoX++;
    }
}

function leftAlmo() {
    if (almoY > 0 & board[almoX][almoY - 1] !== 4 &
        board[almoX][almoY - 1] !== 6 & board[almoX][almoY - 1] !== 7 &
        board[almoX][almoY - 1] !== 8 & board[almoX][almoY - 1] !== 9) {
        board[almoX][almoY] = prevAlmo;
        prevAlmo = board[almoX][almoY - 1];
        board[almoX][almoY - 1] = currAlmo;
        currAlmo = prevAlmo;
        almoY--;
    }
}

function rightAlmo() {
    if (almoY < 8 & board[almoX][almoY + 1] !== 4 &
        board[almoX][almoY + 1] !== 6 & board[almoX][almoY + 1] !== 7 &
        board[almoX][almoY + 1] !== 8 & board[almoX][almoY + 1] !== 9) {
        board[almoX][almoY] = prevAlmo;
        prevAlmo = board[almoX][almoY + 1];
        board[almoX][almoY + 1] = currAlmo;
        currAlmo = prevAlmo;
        almoY++;
    }
}

/************************************************BlueMonster***********************************************/

function upBlue() {
    if (monsterBlueX > 0 & board[monsterBlueX - 1][monsterBlueY] !== 4 &
        board[monsterBlueX - 1][monsterBlueY] !== 6 & board[monsterBlueX - 1][monsterBlueY] !== 7 &
        board[monsterBlueX - 1][monsterBlueY] !== 8 & board[monsterBlueX - 1][monsterBlueY] !== 9& board[monsterBlueX - 1][monsterBlueY] !== 13) {
        board[monsterBlueX][monsterBlueY] = prevBlue;
        prevBlue = board[monsterBlueX - 1][monsterBlueY];
        board[monsterBlueX - 1][monsterBlueY] = currBlue;
        currBlue = prevBlue;
        monsterBlueX--;
    } else if (board[monsterBlueX - 1][monsterBlueY] === 4) {
        obstacleBlue = true;
        blockedMoveBlue = 1;
        if (monsterBlueY < 8 & board[monsterBlueX][monsterBlueY + 1] !== 4 &
            board[monsterBlueX][monsterBlueY + 1] !== 6 & board[monsterBlueX][monsterBlueY + 1] !== 7 &
            board[monsterBlueX][monsterBlueY + 1] !== 8 & board[monsterBlueX][monsterBlueY + 1] !== 9& board[monsterBlueX][monsterBlueY + 1] !== 13) {//right
            lastMoveBlue = 2;
            board[monsterBlueX][monsterBlueY] = prevBlue;
            prevBlue = board[monsterBlueX][monsterBlueY + 1];
            board[monsterBlueX][monsterBlueY + 1] = currBlue;
            currBlue = prevBlue;
            monsterBlueY++;

        } else if (monsterBlueY > 0 & board[monsterBlueX][monsterBlueY - 1] !== 4 &
            board[monsterBlueX][monsterBlueY - 1] !== 6 & board[monsterBlueX][monsterBlueY - 1] !== 7 &
            board[monsterBlueX][monsterBlueY - 1] !== 8 & board[monsterBlueX][monsterBlueY - 1] !== 9 & board[monsterBlueX][monsterBlueY - 1] !== 13) {//left
            lastMoveBlue = 4;
            board[monsterBlueX][monsterBlueY] = prevBlue;
            prevBlue = board[monsterBlueX][monsterBlueY - 1];
            board[monsterBlueX][monsterBlueY - 1] = currBlue;
            currBlue = prevBlue;
            monsterBlueY--;

        } else if (monsterBlueX < 13 & board[monsterBlueX + 1][monsterBlueY] !== 4 &
            board[monsterBlueX + 1][monsterBlueY] !== 6 & board[monsterBlueX + 1][monsterBlueY] !== 7 &
            board[monsterBlueX + 1][monsterBlueY] !== 8 & board[monsterBlueX + 1][monsterBlueY] !== 9& board[monsterBlueX + 1][monsterBlueY] !== 13) {//down
            lastMoveBlue = 3;
            board[monsterBlueX][monsterBlueY] = prevBlue;
            prevBlue = board[monsterBlueX + 1][monsterBlueY];
            board[monsterBlueX + 1][monsterBlueY] = currBlue;
            currBlue = prevBlue;
            monsterBlueX++;

        }
    }

}

function downBlue() {
    if (monsterBlueX < 13 & board[monsterBlueX + 1][monsterBlueY] !== 4 &
        board[monsterBlueX + 1][monsterBlueY] !== 6 & board[monsterBlueX + 1][monsterBlueY] !== 7 &
        board[monsterBlueX + 1][monsterBlueY] !== 8 & board[monsterBlueX + 1][monsterBlueY] !== 9& board[monsterBlueX + 1][monsterBlueY] !== 13) {
        board[monsterBlueX][monsterBlueY] = prevBlue;
        prevBlue = board[monsterBlueX + 1][monsterBlueY];
        board[monsterBlueX + 1][monsterBlueY] = currBlue;
        currBlue = prevBlue;
        monsterBlueX++;

    } else if (board[monsterBlueX + 1][monsterBlueY] === 4) {
        obstacleBlue = true;
        blockedMoveBlue = 3;
        if (monsterBlueY < 8 & board[monsterBlueX][monsterBlueY + 1] !== 4 &
            board[monsterBlueX][monsterBlueY + 1] !== 6 & board[monsterBlueX][monsterBlueY + 1] !== 7 &
            board[monsterBlueX][monsterBlueY + 1] !== 8 & board[monsterBlueX][monsterBlueY + 1] !== 9& board[monsterBlueX][monsterBlueY + 1] !== 13) {//right
            lastMoveBlue = 2;
            board[monsterBlueX][monsterBlueY] = prevBlue;
            prevBlue = board[monsterBlueX][monsterBlueY + 1];
            board[monsterBlueX][monsterBlueY + 1] = currBlue;
            currBlue = prevBlue;
            monsterBlueY++;

        } else if (monsterBlueY > 0 & board[monsterBlueX][monsterBlueY - 1] !== 4 &
            board[monsterBlueX][monsterBlueY - 1] !== 6 & board[monsterBlueX][monsterBlueY - 1] !== 7 &
            board[monsterBlueX][monsterBlueY - 1] !== 8 & board[monsterBlueX][monsterBlueY - 1] !== 9& board[monsterBlueX][monsterBlueY - 1] !== 13) {//left
            lastMoveBlue = 4;
            board[monsterBlueX][monsterBlueY] = prevBlue;
            prevBlue = board[monsterBlueX][monsterBlueY - 1];
            board[monsterBlueX][monsterBlueY - 1] = currBlue;
            currBlue = prevBlue;
            monsterBlueY--;


        } else if (monsterBlueX > 0 & board[monsterBlueX - 1][monsterBlueY] !== 4 &
            board[monsterBlueX - 1][monsterBlueY] !== 6 & board[monsterBlueX - 1][monsterBlueY] !== 7 &
            board[monsterBlueX - 1][monsterBlueY] !== 8 & board[monsterBlueX - 1][monsterBlueY] !== 9 & board[monsterBlueX - 1][monsterBlueY] !== 13) {//up
            lastMoveBlue = 1;
            board[monsterBlueX][monsterBlueY] = prevBlue;
            prevBlue = board[monsterBlueX - 1][monsterBlueY];
            board[monsterBlueX - 1][monsterBlueY] = currBlue;
            currBlue = prevBlue;
            monsterBlueX--;


        }
    }
}

function leftBlue() {
    if (monsterBlueY > 0 & board[monsterBlueX][monsterBlueY - 1] !== 4 &
        board[monsterBlueX][monsterBlueY - 1] !== 6 & board[monsterBlueX][monsterBlueY - 1] !== 7 &
        board[monsterBlueX][monsterBlueY - 1] !== 8 & board[monsterBlueX][monsterBlueY - 1] !== 9& board[monsterBlueX][monsterBlueY - 1] !== 13) {
        board[monsterBlueX][monsterBlueY] = prevBlue;
        prevBlue = board[monsterBlueX][monsterBlueY - 1];
        board[monsterBlueX][monsterBlueY - 1] = currBlue;
        currBlue = prevBlue;
        monsterBlueY--;

    } else if (board[monsterBlueX][monsterBlueY - 1] === 4) {
        obstacleBlue = true;
        blockedMoveBlue = 4;
        if (monsterBlueX < 13 & board[monsterBlueX + 1][monsterBlueY] !== 4 &
            board[monsterBlueX + 1][monsterBlueY] !== 6 & board[monsterBlueX + 1][monsterBlueY] !== 7 &
            board[monsterBlueX + 1][monsterBlueY] !== 8 & board[monsterBlueX + 1][monsterBlueY] !== 9& board[monsterBlueX + 1][monsterBlueY] !== 13) {//down
            lastMoveBlue = 3;
            board[monsterBlueX][monsterBlueY] = prevBlue;
            prevBlue = board[monsterBlueX + 1][monsterBlueY];
            board[monsterBlueX + 1][monsterBlueY] = currBlue;
            currBlue = prevBlue;
            monsterBlueX++;

        } else if (monsterBlueX > 0 & board[monsterBlueX - 1][monsterBlueY] !== 4 &
            board[monsterBlueX - 1][monsterBlueY] !== 6 & board[monsterBlueX - 1][monsterBlueY] !== 7 &
            board[monsterBlueX - 1][monsterBlueY] !== 8 & board[monsterBlueX - 1][monsterBlueY] !== 9& board[monsterBlueX - 1][monsterBlueY] !== 13) {//up
            lastMoveBlue = 1;
            board[monsterBlueX][monsterBlueY] = prevBlue;
            prevBlue = board[monsterBlueX - 1][monsterBlueY];
            board[monsterBlueX - 1][monsterBlueY] = currBlue;
            currBlue = prevBlue;
            monsterBlueX--;

        } else if (monsterBlueY < 8 & board[monsterBlueX][monsterBlueY + 1] !== 4 &
            board[monsterBlueX][monsterBlueY + 1] !== 6 & board[monsterBlueX][monsterBlueY + 1] !== 7 &
            board[monsterBlueX][monsterBlueY + 1] !== 8 & board[monsterBlueX][monsterBlueY + 1] !== 9& board[monsterBlueX][monsterBlueY + 1] !== 13) {//right
            lastMoveBlue = 2;
            board[monsterBlueX][monsterBlueY] = prevBlue;
            prevBlue = board[monsterBlueX][monsterBlueY + 1];
            board[monsterBlueX][monsterBlueY + 1] = currBlue;
            currBlue = prevBlue;
            monsterBlueY++;


        }
    }
}

function rightBlue() {
    if (monsterBlueY < 8 & board[monsterBlueX][monsterBlueY + 1] !== 4 &
        board[monsterBlueX][monsterBlueY + 1] !== 6 & board[monsterBlueX][monsterBlueY + 1] !== 7 &
        board[monsterBlueX][monsterBlueY + 1] !== 8 & board[monsterBlueX][monsterBlueY + 1] !== 9& board[monsterBlueX][monsterBlueY + 1] !== 13) {
        board[monsterBlueX][monsterBlueY] = prevBlue;
        prevBlue = board[monsterBlueX][monsterBlueY + 1];
        board[monsterBlueX][monsterBlueY + 1] = currBlue;
        currBlue = prevBlue;
        monsterBlueY++;
    } else if (board[monsterBlueX][monsterBlueY + 1] === 4) {
        obstacleBlue = true;
        blockedMoveBlue = 2;
        if (monsterBlueX > 0 & board[monsterBlueX - 1][monsterBlueY] !== 4 &
            board[monsterBlueX - 1][monsterBlueY] !== 6 & board[monsterBlueX - 1][monsterBlueY] !== 7 &
            board[monsterBlueX - 1][monsterBlueY] !== 8 & board[monsterBlueX - 1][monsterBlueY] !== 9& board[monsterBlueX - 1][monsterBlueY] !== 13) {//up
            lastMoveBlue = 1;
            board[monsterBlueX][monsterBlueY] = prevBlue;
            prevBlue = board[monsterBlueX - 1][monsterBlueY];
            board[monsterBlueX - 1][monsterBlueY] = currBlue;
            currBlue = prevBlue;
            monsterBlueX--;

        } else if (monsterBlueX < 13 & board[monsterBlueX + 1][monsterBlueY] !== 4 &
            board[monsterBlueX + 1][monsterBlueY] !== 6 & board[monsterBlueX + 1][monsterBlueY] !== 7 &
            board[monsterBlueX + 1][monsterBlueY] !== 8 & board[monsterBlueX + 1][monsterBlueY] !== 9 & board[monsterBlueX + 1][monsterBlueY] !== 13) {//down
            lastMoveBlue = 3;
            board[monsterBlueX][monsterBlueY] = prevBlue;
            prevBlue = board[monsterBlueX + 1][monsterBlueY];
            board[monsterBlueX + 1][monsterBlueY] = currBlue;
            currBlue = prevBlue;
            monsterBlueX++;

        } else if (monsterBlueY > 0 & board[monsterBlueX][monsterBlueY - 1] !== 4 &
            board[monsterBlueX][monsterBlueY - 1] !== 6 & board[monsterBlueX][monsterBlueY - 1] !== 7 &
            board[monsterBlueX][monsterBlueY - 1] !== 8 & board[monsterBlueX][monsterBlueY - 1] !== 9& board[monsterBlueX][monsterBlueY - 1] !== 13) {//left
            lastMoveBlue = 4;
            board[monsterBlueX][monsterBlueY] = prevBlue;
            prevBlue = board[monsterBlueX][monsterBlueY - 1];
            board[monsterBlueX][monsterBlueY - 1] = currBlue;
            currBlue = prevBlue;
            monsterBlueY--;

        }
    }
}

/************************************************OrangeMonster***********************************************/
function upOrange() {
    if (monsterOrangeX > 0 & board[monsterOrangeX - 1][monsterOrangeY] !== 4 &
        board[monsterOrangeX - 1][monsterOrangeY] !== 6 & board[monsterOrangeX - 1][monsterOrangeY] !== 7 &
        board[monsterOrangeX - 1][monsterOrangeY] !== 8 & board[monsterOrangeX - 1][monsterOrangeY] !== 9& board[monsterOrangeX - 1][monsterOrangeY] !== 13) {
        board[monsterOrangeX][monsterOrangeY] = prevOrange;
        prevOrange = board[monsterOrangeX - 1][monsterOrangeY];
        board[monsterOrangeX - 1][monsterOrangeY] = currOrange;
        currOrange = prevOrange;
        monsterOrangeX--;
    } else if (board[monsterOrangeX - 1][monsterOrangeY] === 4) {
        obstacleOrange = true;
        blockedMoveOrange = 1;
        if (monsterOrangeY < 8 & board[monsterOrangeX][monsterOrangeY + 1] !== 4 &
            board[monsterOrangeX][monsterOrangeY + 1] !== 6 & board[monsterOrangeX][monsterOrangeY + 1] !== 7 &
            board[monsterOrangeX][monsterOrangeY + 1] !== 8 & board[monsterOrangeX][monsterOrangeY + 1] !== 9& board[monsterOrangeX][monsterOrangeY + 1] !== 13) {//right
            lastMoveOrange = 2;
            board[monsterOrangeX][monsterOrangeY] = prevOrange;
            prevOrange = board[monsterOrangeX][monsterOrangeY + 1];
            board[monsterOrangeX][monsterOrangeY + 1] = currOrange;
            currOrange = prevOrange;
            monsterOrangeY++;

        } else if (monsterOrangeY > 0 & board[monsterOrangeX][monsterOrangeY - 1] !== 4 &
            board[monsterOrangeX][monsterOrangeY - 1] !== 6 & board[monsterOrangeX][monsterOrangeY - 1] !== 7 &
            board[monsterOrangeX][monsterOrangeY - 1] !== 8 & board[monsterOrangeX][monsterOrangeY - 1] !== 9& board[monsterOrangeX][monsterOrangeY - 1] !== 13) {//left
            lastMoveOrange = 4;
            board[monsterOrangeX][monsterOrangeY] = prevOrange;
            prevOrange = board[monsterOrangeX][monsterOrangeY - 1];
            board[monsterOrangeX][monsterOrangeY - 1] = currOrange;
            currOrange = prevOrange;
            monsterOrangeY--;

        } else if (monsterOrangeX < 13 & board[monsterOrangeX + 1][monsterOrangeY] !== 4 &
            board[monsterOrangeX + 1][monsterOrangeY] !== 6 & board[monsterOrangeX + 1][monsterOrangeY] !== 7 &
            board[monsterOrangeX + 1][monsterOrangeY] !== 8 & board[monsterOrangeX + 1][monsterOrangeY] !== 9& board[monsterOrangeX + 1][monsterOrangeY] !== 13) {//down
            lastMoveOrange = 3;
            board[monsterOrangeX][monsterOrangeY] = prevOrange;
            prevOrange = board[monsterOrangeX + 1][monsterOrangeY];
            board[monsterOrangeX + 1][monsterOrangeY] = currOrange;
            currOrange = prevOrange;
            monsterOrangeX++;

        }
    }
}

function downOrange() {
    if (monsterOrangeX < 13 & board[monsterOrangeX + 1][monsterOrangeY] !== 4 &
        board[monsterOrangeX + 1][monsterOrangeY] !== 6 & board[monsterOrangeX + 1][monsterOrangeY] !== 7 &
        board[monsterOrangeX + 1][monsterOrangeY] !== 8 & board[monsterOrangeX + 1][monsterOrangeY] !== 9& board[monsterOrangeX + 1][monsterOrangeY] !== 13) {
        board[monsterOrangeX][monsterOrangeY] = prevOrange;
        prevOrange = board[monsterOrangeX + 1][monsterOrangeY];
        board[monsterOrangeX + 1][monsterOrangeY] = currOrange;
        currOrange = prevOrange;
        monsterOrangeX++;

    } else if (board[monsterOrangeX + 1][monsterOrangeY] === 4) {
        obstacleOrange = true;
        blockedMoveOrange = 3;
        if (monsterOrangeY < 8 & board[monsterOrangeX][monsterOrangeY + 1] !== 4 &
            board[monsterOrangeX][monsterOrangeY + 1] !== 6 & board[monsterOrangeX][monsterOrangeY + 1] !== 7 &
            board[monsterOrangeX][monsterOrangeY + 1] !== 8 & board[monsterOrangeX][monsterOrangeY + 1] !== 9& board[monsterOrangeX][monsterOrangeY + 1] !== 13) {//right
            lastMoveOrange = 2;
            board[monsterOrangeX][monsterOrangeY] = prevOrange;
            prevOrange = board[monsterOrangeX][monsterOrangeY + 1];
            board[monsterOrangeX][monsterOrangeY + 1] = currOrange;
            currOrange = prevOrange;
            monsterOrangeY++;

        } else if (monsterOrangeY > 0 & board[monsterOrangeX][monsterOrangeY - 1] !== 4 &
            board[monsterOrangeX][monsterOrangeY - 1] !== 6 & board[monsterOrangeX][monsterOrangeY - 1] !== 7 &
            board[monsterOrangeX][monsterOrangeY - 1] !== 8 & board[monsterOrangeX][monsterOrangeY - 1] !== 9& board[monsterOrangeX][monsterOrangeY - 1] !== 13) {//left
            lastMoveOrange = 4;
            board[monsterOrangeX][monsterOrangeY] = prevOrange;
            prevOrange = board[monsterOrangeX][monsterOrangeY - 1];
            board[monsterOrangeX][monsterOrangeY - 1] = currOrange;
            currOrange = prevOrange;
            monsterOrangeY--;


        } else if (monsterOrangeX > 0 & board[monsterOrangeX - 1][monsterOrangeY] !== 4 &
            board[monsterOrangeX - 1][monsterOrangeY] !== 6 & board[monsterOrangeX - 1][monsterOrangeY] !== 7 &
            board[monsterOrangeX - 1][monsterOrangeY] !== 8 & board[monsterOrangeX - 1][monsterOrangeY] !== 9& board[monsterOrangeX - 1][monsterOrangeY] !== 13) {//up
            lastMoveOrange = 1;
            board[monsterOrangeX][monsterOrangeY] = prevOrange;
            prevOrange = board[monsterOrangeX - 1][monsterOrangeY];
            board[monsterOrangeX - 1][monsterOrangeY] = currOrange;
            currOrange = prevOrange;
            monsterOrangeX--;


        }
    }
}

function leftOrange() {
    if (monsterOrangeY > 0 & board[monsterOrangeX][monsterOrangeY - 1] !== 4 &
        board[monsterOrangeX][monsterOrangeY - 1] !== 6 & board[monsterOrangeX][monsterOrangeY - 1] !== 7 &
        board[monsterOrangeX][monsterOrangeY - 1] !== 8 & board[monsterOrangeX][monsterOrangeY - 1] !== 9& board[monsterOrangeX][monsterOrangeY - 1] !== 13) {
        board[monsterOrangeX][monsterOrangeY] = prevOrange;
        prevOrange = board[monsterOrangeX][monsterOrangeY - 1];
        board[monsterOrangeX][monsterOrangeY - 1] = currOrange;
        currOrange = prevOrange;
        monsterOrangeY--;

    } else if (board[monsterOrangeX][monsterOrangeY - 1] === 4) {
        obstacleOrange = true;
        blockedMoveOrange = 4;
        if (monsterOrangeX < 13 & board[monsterOrangeX + 1][monsterOrangeY] !== 4 &
            board[monsterOrangeX + 1][monsterOrangeY] !== 6 & board[monsterOrangeX + 1][monsterOrangeY] !== 7 &
            board[monsterOrangeX + 1][monsterOrangeY] !== 8 & board[monsterOrangeX + 1][monsterOrangeY] !== 9& board[monsterOrangeX + 1][monsterOrangeY] !== 13) {//down
            lastMoveOrange = 3;
            board[monsterOrangeX][monsterOrangeY] = prevOrange;
            prevOrange = board[monsterOrangeX + 1][monsterOrangeY];
            board[monsterOrangeX + 1][monsterOrangeY] = currOrange;
            currOrange = prevOrange;
            monsterOrangeX++;

        } else if (monsterOrangeX > 0 & board[monsterOrangeX - 1][monsterOrangeY] !== 4 &
            board[monsterOrangeX - 1][monsterOrangeY] !== 6 & board[monsterOrangeX - 1][monsterOrangeY] !== 7 &
            board[monsterOrangeX - 1][monsterOrangeY] !== 8 & board[monsterOrangeX - 1][monsterOrangeY] !== 9& board[monsterOrangeX - 1][monsterOrangeY] !== 13) {//up
            lastMoveOrange = 1;
            board[monsterOrangeX][monsterOrangeY] = prevOrange;
            prevOrange = board[monsterOrangeX - 1][monsterOrangeY];
            board[monsterOrangeX - 1][monsterOrangeY] = currOrange;
            currOrange = prevOrange;
            monsterOrangeX--;

        } else if (monsterOrangeY < 8 & board[monsterOrangeX][monsterOrangeY + 1] !== 4 &
            board[monsterOrangeX][monsterOrangeY + 1] !== 6 & board[monsterOrangeX][monsterOrangeY + 1] !== 7 &
            board[monsterOrangeX][monsterOrangeY + 1] !== 8 & board[monsterOrangeX][monsterOrangeY + 1] !== 9& board[monsterOrangeX][monsterOrangeY + 1] !== 13) {//right
            lastMoveOrange = 2;
            board[monsterOrangeX][monsterOrangeY] = prevOrange;
            prevOrange = board[monsterOrangeX][monsterOrangeY + 1];
            board[monsterOrangeX][monsterOrangeY + 1] = currOrange;
            currOrange = prevOrange;
            monsterOrangeY++;


        }
    }
}

function rightOrange() {
    if (monsterOrangeY < 8 & board[monsterOrangeX][monsterOrangeY + 1] !== 4 &
        board[monsterOrangeX][monsterOrangeY + 1] !== 6 & board[monsterOrangeX][monsterOrangeY + 1] !== 7 &
        board[monsterOrangeX][monsterOrangeY + 1] !== 8 & board[monsterOrangeX][monsterOrangeY + 1] !== 9 & board[monsterOrangeX][monsterOrangeY + 1] !== 13) {
        board[monsterOrangeX][monsterOrangeY] = prevOrange;
        prevOrange = board[monsterOrangeX][monsterOrangeY + 1];
        board[monsterOrangeX][monsterOrangeY + 1] = currOrange;
        currOrange = prevOrange;
        monsterOrangeY++;
    } else if (board[monsterOrangeX][monsterOrangeY + 1] === 4) {
        obstacleOrange = true;
        blockedMoveOrange = 2;
        if (monsterOrangeX > 0 & board[monsterOrangeX - 1][monsterOrangeY] !== 4 &
            board[monsterOrangeX - 1][monsterOrangeY] !== 6 & board[monsterOrangeX - 1][monsterOrangeY] !== 7 &
            board[monsterOrangeX - 1][monsterOrangeY] !== 8 & board[monsterOrangeX - 1][monsterOrangeY] !== 9& board[monsterOrangeX - 1][monsterOrangeY] !== 13) {//up
            lastMoveOrange = 1;
            board[monsterOrangeX][monsterOrangeY] = prevOrange;
            prevOrange = board[monsterOrangeX - 1][monsterOrangeY];
            board[monsterOrangeX - 1][monsterOrangeY] = currOrange;
            currOrange = prevOrange;
            monsterOrangeX--;

        } else if (monsterOrangeX < 13 & board[monsterOrangeX + 1][monsterOrangeY] !== 4 &
            board[monsterOrangeX + 1][monsterOrangeY] !== 6 & board[monsterOrangeX + 1][monsterOrangeY] !== 7 &
            board[monsterOrangeX + 1][monsterOrangeY] !== 8 & board[monsterOrangeX + 1][monsterOrangeY] !== 9& board[monsterOrangeX + 1][monsterOrangeY] !== 13) {//down
            lastMoveOrange = 3;
            board[monsterOrangeX][monsterOrangeY] = prevOrange;
            prevOrange = board[monsterOrangeX + 1][monsterOrangeY];
            board[monsterOrangeX + 1][monsterOrangeY] = currOrange;
            currOrange = prevOrange;
            monsterOrangeX++;

        } else if (monsterOrangeY > 0 & board[monsterOrangeX][monsterOrangeY - 1] !== 4 &
            board[monsterOrangeX][monsterOrangeY - 1] !== 6 & board[monsterOrangeX][monsterOrangeY - 1] !== 7 &
            board[monsterOrangeX][monsterOrangeY - 1] !== 8 & board[monsterOrangeX][monsterOrangeY - 1] !== 9& board[monsterOrangeX][monsterOrangeY - 1] !== 13) {//left
            lastMoveOrange = 4;
            board[monsterOrangeX][monsterOrangeY] = prevOrange;
            prevOrange = board[monsterOrangeX][monsterOrangeY - 1];
            board[monsterOrangeX][monsterOrangeY - 1] = currOrange;
            currOrange = prevOrange;
            monsterOrangeY--;

        }
    }
}

/************************************************GreenMonster***********************************************/
function upGreen() {
    if (monsterGreenX > 0 & board[monsterGreenX - 1][monsterGreenY] !== 4 &
        board[monsterGreenX - 1][monsterGreenY] !== 6 & board[monsterGreenX - 1][monsterGreenY] !== 7 &
        board[monsterGreenX - 1][monsterGreenY] !== 8 & board[monsterGreenX - 1][monsterGreenY] !== 9 & board[monsterGreenX - 1][monsterGreenY] !== 13) {
        board[monsterGreenX][monsterGreenY] = prevGreen;
        prevGreen = board[monsterGreenX - 1][monsterGreenY];
        board[monsterGreenX - 1][monsterGreenY] = currGreen;
        currGreen = prevGreen;
        monsterGreenX--;
    } else if (board[monsterGreenX - 1][monsterGreenY] === 4) {
        obstacleGreen = true;
        blockedMoveGreen = 1;
        if (monsterGreenY < 8 & board[monsterGreenX][monsterGreenY + 1] !== 4 &
            board[monsterGreenX][monsterGreenY + 1] !== 6 & board[monsterGreenX][monsterGreenY + 1] !== 7 &
            board[monsterGreenX][monsterGreenY + 1] !== 8 & board[monsterGreenX][monsterGreenY + 1] !== 9& board[monsterGreenX][monsterGreenY + 1] !== 13) {//right
            lastMoveGreen = 2;
            board[monsterGreenX][monsterGreenY] = prevGreen;
            prevGreen = board[monsterGreenX][monsterGreenY + 1];
            board[monsterGreenX][monsterGreenY + 1] = currGreen;
            currGreen = prevGreen;
            monsterGreenY++;

        } else if (monsterGreenY > 0 & board[monsterGreenX][monsterGreenY - 1] !== 4 &
            board[monsterGreenX][monsterGreenY - 1] !== 6 & board[monsterGreenX][monsterGreenY - 1] !== 7 &
            board[monsterGreenX][monsterGreenY - 1] !== 8 & board[monsterGreenX][monsterGreenY - 1] !== 9& board[monsterGreenX][monsterGreenY - 1] !== 13) {//left
            lastMoveGreen = 4;
            board[monsterGreenX][monsterGreenY] = prevGreen;
            prevGreen = board[monsterGreenX][monsterGreenY - 1];
            board[monsterGreenX][monsterGreenY - 1] = currGreen;
            currGreen = prevGreen;
            monsterGreenY--;

        } else if (monsterGreenX < 13 & board[monsterGreenX + 1][monsterGreenY] !== 4 &
            board[monsterGreenX + 1][monsterGreenY] !== 6 & board[monsterGreenX + 1][monsterGreenY] !== 7 &
            board[monsterGreenX + 1][monsterGreenY] !== 8 & board[monsterGreenX + 1][monsterGreenY] !== 9& board[monsterGreenX + 1][monsterGreenY] !== 13) {//down
            lastMoveGreen = 3;
            board[monsterGreenX][monsterGreenY] = prevGreen;
            prevGreen = board[monsterGreenX + 1][monsterGreenY];
            board[monsterGreenX + 1][monsterGreenY] = currGreen;
            currGreen = prevGreen;
            monsterGreenX++;

        }
    }
}

function downGreen() {
    if (monsterGreenX < 13 & board[monsterGreenX + 1][monsterGreenY] !== 4 &
        board[monsterGreenX + 1][monsterGreenY] !== 6 & board[monsterGreenX + 1][monsterGreenY] !== 7 &
        board[monsterGreenX + 1][monsterGreenY] !== 8 & board[monsterGreenX + 1][monsterGreenY] !== 9& board[monsterGreenX + 1][monsterGreenY] !== 13) {
        board[monsterGreenX][monsterGreenY] = prevGreen;
        prevGreen = board[monsterGreenX + 1][monsterGreenY];
        board[monsterGreenX + 1][monsterGreenY] = currGreen;
        currGreen = prevGreen;
        monsterGreenX++;

    } else if (board[monsterGreenX + 1][monsterGreenY] === 4) {
        obstacleGreen = true;
        blockedMoveGreen = 3;
        if (monsterGreenY < 8 & board[monsterGreenX][monsterGreenY + 1] !== 4 &
            board[monsterGreenX][monsterGreenY + 1] !== 6 & board[monsterGreenX][monsterGreenY + 1] !== 7 &
            board[monsterGreenX][monsterGreenY + 1] !== 8 & board[monsterGreenX][monsterGreenY + 1] !== 9& board[monsterGreenX][monsterGreenY + 1] !== 13) {//right
            lastMoveGreen = 2;
            board[monsterGreenX][monsterGreenY] = prevGreen;
            prevGreen = board[monsterGreenX][monsterGreenY + 1];
            board[monsterGreenX][monsterGreenY + 1] = currGreen;
            currGreen = prevGreen;
            monsterGreenY++;

        } else if (monsterGreenY > 0 & board[monsterGreenX][monsterGreenY - 1] !== 4 &
            board[monsterGreenX][monsterGreenY - 1] !== 6 & board[monsterGreenX][monsterGreenY - 1] !== 7 &
            board[monsterGreenX][monsterGreenY - 1] !== 8 & board[monsterGreenX][monsterGreenY - 1] !== 9& board[monsterGreenX][monsterGreenY - 1] !== 13) {//left
            lastMoveGreen = 4;
            board[monsterGreenX][monsterGreenY] = prevGreen;
            prevGreen = board[monsterGreenX][monsterGreenY - 1];
            board[monsterGreenX][monsterGreenY - 1] = currGreen;
            currGreen = prevGreen;
            monsterGreenY--;


        } else if (monsterGreenX > 0 & board[monsterGreenX - 1][monsterGreenY] !== 4 &
            board[monsterGreenX - 1][monsterGreenY] !== 6 & board[monsterGreenX - 1][monsterGreenY] !== 7 &
            board[monsterGreenX - 1][monsterGreenY] !== 8 & board[monsterGreenX - 1][monsterGreenY] !== 9& board[monsterGreenX - 1][monsterGreenY] !== 13) {//up
            lastMoveGreen = 1;
            board[monsterGreenX][monsterGreenY] = prevGreen;
            prevGreen = board[monsterGreenX - 1][monsterGreenY];
            board[monsterGreenX - 1][monsterGreenY] = currGreen;
            currGreen = prevGreen;
            monsterGreenX--;


        }
    }
}

function leftGreen() {
    if (monsterGreenY > 0 & board[monsterGreenX][monsterGreenY - 1] !== 4 &
        board[monsterGreenX][monsterGreenY - 1] !== 6 & board[monsterGreenX][monsterGreenY - 1] !== 7 &
        board[monsterGreenX][monsterGreenY - 1] !== 8 & board[monsterGreenX][monsterGreenY - 1] !== 9 & board[monsterGreenX][monsterGreenY - 1] !== 13) {
        board[monsterGreenX][monsterGreenY] = prevGreen;
        prevGreen = board[monsterGreenX][monsterGreenY - 1];
        board[monsterGreenX][monsterGreenY - 1] = currGreen;
        currGreen = prevGreen;
        monsterGreenY--;

    } else if (board[monsterGreenX][monsterGreenY - 1] === 4) {
        obstacleGreen = true;
        blockedMoveGreen = 4;
        if (monsterGreenX < 13 & board[monsterGreenX + 1][monsterGreenY] !== 4 &
            board[monsterGreenX + 1][monsterGreenY] !== 6 & board[monsterGreenX + 1][monsterGreenY] !== 7 &
            board[monsterGreenX + 1][monsterGreenY] !== 8 & board[monsterGreenX + 1][monsterGreenY] !== 9& board[monsterGreenX + 1][monsterGreenY] !== 13) {//down
            lastMoveGreen = 3;
            board[monsterGreenX][monsterGreenY] = prevGreen;
            prevGreen = board[monsterGreenX + 1][monsterGreenY];
            board[monsterGreenX + 1][monsterGreenY] = currGreen;
            currGreen = prevGreen;
            monsterGreenX++;

        } else if (monsterGreenX > 0 & board[monsterGreenX - 1][monsterGreenY] !== 4 &
            board[monsterGreenX - 1][monsterGreenY] !== 6 & board[monsterGreenX - 1][monsterGreenY] !== 7 &
            board[monsterGreenX - 1][monsterGreenY] !== 8 & board[monsterGreenX - 1][monsterGreenY] !== 9& board[monsterGreenX - 1][monsterGreenY] !== 13) {//up
            lastMoveGreen = 1;
            board[monsterGreenX][monsterGreenY] = prevGreen;
            prevGreen = board[monsterGreenX - 1][monsterGreenY];
            board[monsterGreenX - 1][monsterGreenY] = currGreen;
            currGreen = prevGreen;
            monsterGreenX--;

        } else if (monsterGreenY < 8 & board[monsterGreenX][monsterGreenY + 1] !== 4 &
            board[monsterGreenX][monsterGreenY + 1] !== 6 & board[monsterGreenX][monsterGreenY + 1] !== 7 &
            board[monsterGreenX][monsterGreenY + 1] !== 8 & board[monsterGreenX][monsterGreenY + 1] !== 9& board[monsterGreenX][monsterGreenY + 1] !== 13) {//right
            lastMoveGreen = 2;
            board[monsterGreenX][monsterGreenY] = prevGreen;
            prevGreen = board[monsterGreenX][monsterGreenY + 1];
            board[monsterGreenX][monsterGreenY + 1] = currGreen;
            currGreen = prevGreen;
            monsterGreenY++;


        }
    }
}

function rightGreen() {
    if (monsterGreenY < 8 & board[monsterGreenX][monsterGreenY + 1] !== 4 &
        board[monsterGreenX][monsterGreenY + 1] !== 6 & board[monsterGreenX][monsterGreenY + 1] !== 7 &
        board[monsterGreenX][monsterGreenY + 1] !== 8 & board[monsterGreenX][monsterGreenY + 1] !== 9& board[monsterGreenX][monsterGreenY + 1] !== 13) {
        board[monsterGreenX][monsterGreenY] = prevGreen;
        prevGreen = board[monsterGreenX][monsterGreenY + 1];
        board[monsterGreenX][monsterGreenY + 1] = currGreen;
        currGreen = prevGreen;
        monsterGreenY++;
    } else if (board[monsterGreenX][monsterGreenY + 1] === 4) {
        obstacleGreen = true;
        blockedMoveGreen = 2;
        if (monsterGreenX > 0 & board[monsterGreenX - 1][monsterGreenY] !== 4 &
            board[monsterGreenX - 1][monsterGreenY] !== 6 & board[monsterGreenX - 1][monsterGreenY] !== 7 &
            board[monsterGreenX - 1][monsterGreenY] !== 8 & board[monsterGreenX - 1][monsterGreenY] !== 9& board[monsterGreenX - 1][monsterGreenY] !== 13) {//up
            lastMoveGreen = 1;
            board[monsterGreenX][monsterGreenY] = prevGreen;
            prevGreen = board[monsterGreenX - 1][monsterGreenY];
            board[monsterGreenX - 1][monsterGreenY] = currGreen;
            currGreen = prevGreen;
            monsterGreenX--;

        } else if (monsterGreenX < 13 & board[monsterGreenX + 1][monsterGreenY] !== 4 &
            board[monsterGreenX + 1][monsterGreenY] !== 6 & board[monsterGreenX + 1][monsterGreenY] !== 7 &
            board[monsterGreenX + 1][monsterGreenY] !== 8 & board[monsterGreenX + 1][monsterGreenY] !== 9& board[monsterGreenX + 1][monsterGreenY] !== 13) {//down
            lastMoveGreen = 3;
            board[monsterGreenX][monsterGreenY] = prevGreen;
            prevGreen = board[monsterGreenX + 1][monsterGreenY];
            board[monsterGreenX + 1][monsterGreenY] = currGreen;
            currGreen = prevGreen;
            monsterGreenX++;

        } else if (monsterGreenY > 0 & board[monsterGreenX][monsterGreenY - 1] !== 4 &
            board[monsterGreenX][monsterGreenY - 1] !== 6 & board[monsterGreenX][monsterGreenY - 1] !== 7 &
            board[monsterGreenX][monsterGreenY - 1] !== 8 & board[monsterGreenX][monsterGreenY - 1] !== 9 & board[monsterGreenX][monsterGreenY - 1] !== 13) {//left
            lastMoveGreen = 4;
            board[monsterGreenX][monsterGreenY] = prevGreen;
            prevGreen = board[monsterGreenX][monsterGreenY - 1];
            board[monsterGreenX][monsterGreenY - 1] = currGreen;
            currGreen = prevGreen;
            monsterGreenY--;

        }
    }
}

/************************************************RedMonster***********************************************/
function upRed() {
    if (monsterRedX > 0 & board[monsterRedX - 1][monsterRedY] !== 4 &
        board[monsterRedX - 1][monsterRedY] !== 6 & board[monsterRedX - 1][monsterRedY] !== 7 &
        board[monsterRedX - 1][monsterRedY] !== 8 & board[monsterRedX - 1][monsterRedY] !== 9& board[monsterRedX - 1][monsterRedY] !== 13) {
        board[monsterRedX][monsterRedY] = prevRed;
        prevRed = board[monsterRedX - 1][monsterRedY];
        board[monsterRedX - 1][monsterRedY] = currRed;
        currRed = prevRed;
        monsterRedX--;
    } else if (board[monsterRedX - 1][monsterRedY] === 4) {
        obstacleRed = true;
        blockedMoveRed = 1;
        if (monsterRedY < 8 & board[monsterRedX][monsterRedY + 1] !== 4 &
            board[monsterRedX][monsterRedY + 1] !== 6 & board[monsterRedX][monsterRedY + 1] !== 7 &
            board[monsterRedX][monsterRedY + 1] !== 8 & board[monsterRedX][monsterRedY + 1] !== 9& board[monsterRedX][monsterRedY + 1] !== 13) {//right
            lastMoveRed = 2;
            board[monsterRedX][monsterRedY] = prevRed;
            prevRed = board[monsterRedX][monsterRedY + 1];
            board[monsterRedX][monsterRedY + 1] = currRed;
            currRed = prevRed;
            monsterRedY++;

        } else if (monsterRedY > 0 & board[monsterRedX][monsterRedY - 1] !== 4 &
            board[monsterRedX][monsterRedY - 1] !== 6 & board[monsterRedX][monsterRedY - 1] !== 7 &
            board[monsterRedX][monsterRedY - 1] !== 8 & board[monsterRedX][monsterRedY - 1] !== 9& board[monsterRedX][monsterRedY - 1] !== 13) {//left
            lastMoveRed = 4;
            board[monsterRedX][monsterRedY] = prevRed;
            prevRed = board[monsterRedX][monsterRedY - 1];
            board[monsterRedX][monsterRedY - 1] = currRed;
            currRed = prevRed;
            monsterRedY--;

        } else if (monsterRedX < 13 & board[monsterRedX + 1][monsterRedY] !== 4 &
            board[monsterRedX + 1][monsterRedY] !== 6 & board[monsterRedX + 1][monsterRedY] !== 7 &
            board[monsterRedX + 1][monsterRedY] !== 8 & board[monsterRedX + 1][monsterRedY] !== 9& board[monsterRedX + 1][monsterRedY] !== 13) {//down
            lastMoveRed = 3;
            board[monsterRedX][monsterRedY] = prevRed;
            prevRed = board[monsterRedX + 1][monsterRedY];
            board[monsterRedX + 1][monsterRedY] = currRed;
            currRed = prevRed;
            monsterRedX++;

        }
    }
}

function downRed() {
    if (monsterRedX < 13 & board[monsterRedX + 1][monsterRedY] !== 4 &
        board[monsterRedX + 1][monsterRedY] !== 6 & board[monsterRedX + 1][monsterRedY] !== 7 &
        board[monsterRedX + 1][monsterRedY] !== 8 & board[monsterRedX + 1][monsterRedY] !== 9& board[monsterRedX + 1][monsterRedY] !== 13) {
        board[monsterRedX][monsterRedY] = prevRed;
        prevRed = board[monsterRedX + 1][monsterRedY];
        board[monsterRedX + 1][monsterRedY] = currRed;
        currRed = prevRed;
        monsterRedX++;

    } else if (board[monsterRedX + 1][monsterRedY] === 4) {
        obstacleRed = true;
        blockedMoveRed = 3;
        if (monsterRedY < 8 & board[monsterRedX][monsterRedY + 1] !== 4 &
            board[monsterRedX][monsterRedY + 1] !== 6 & board[monsterRedX][monsterRedY + 1] !== 7 &
            board[monsterRedX][monsterRedY + 1] !== 8 & board[monsterRedX][monsterRedY + 1] !== 9& board[monsterRedX][monsterRedY + 1] !== 13) {//right
            lastMoveRed = 2;
            board[monsterRedX][monsterRedY] = prevRed;
            prevRed = board[monsterRedX][monsterRedY + 1];
            board[monsterRedX][monsterRedY + 1] = currRed;
            currRed = prevRed;
            monsterRedY++;

        } else if (monsterRedY > 0 & board[monsterRedX][monsterRedY - 1] !== 4 &
            board[monsterRedX][monsterRedY - 1] !== 6 & board[monsterRedX][monsterRedY - 1] !== 7 &
            board[monsterRedX][monsterRedY - 1] !== 8 & board[monsterRedX][monsterRedY - 1] !== 9& board[monsterRedX][monsterRedY - 1] !== 13) {//left
            lastMoveRed = 4;
            board[monsterRedX][monsterRedY] = prevRed;
            prevRed = board[monsterRedX][monsterRedY - 1];
            board[monsterRedX][monsterRedY - 1] = currRed;
            currRed = prevRed;
            monsterRedY--;


        } else if (monsterRedX > 0 & board[monsterRedX - 1][monsterRedY] !== 4 &
            board[monsterRedX - 1][monsterRedY] !== 6 & board[monsterRedX - 1][monsterRedY] !== 7 &
            board[monsterRedX - 1][monsterRedY] !== 8 & board[monsterRedX - 1][monsterRedY] !== 9& board[monsterRedX - 1][monsterRedY] !== 13) {//up
            lastMoveRed = 1;
            board[monsterRedX][monsterRedY] = prevRed;
            prevRed = board[monsterRedX - 1][monsterRedY];
            board[monsterRedX - 1][monsterRedY] = currRed;
            currRed = prevRed;
            monsterRedX--;


        }
    }
}

function leftRed() {
    if (monsterRedY > 0 & board[monsterRedX][monsterRedY - 1] !== 4 &
        board[monsterRedX][monsterRedY - 1] !== 6 & board[monsterRedX][monsterRedY - 1] !== 7 &
        board[monsterRedX][monsterRedY - 1] !== 8 & board[monsterRedX][monsterRedY - 1] !== 9 & board[monsterRedX][monsterRedY - 1] !== 13) {
        board[monsterRedX][monsterRedY] = prevRed;
        prevRed = board[monsterRedX][monsterRedY - 1];
        board[monsterRedX][monsterRedY - 1] = currRed;
        currRed = prevRed;
        monsterRedY--;

    } else if (board[monsterRedX][monsterRedY - 1] === 4) {
        obstacleRed = true;
        blockedMoveRed = 4;
        if (monsterRedX < 13 & board[monsterRedX + 1][monsterRedY] !== 4 &
            board[monsterRedX + 1][monsterRedY] !== 6 & board[monsterRedX + 1][monsterRedY] !== 7 &
            board[monsterRedX + 1][monsterRedY] !== 8 & board[monsterRedX + 1][monsterRedY] !== 9& board[monsterRedX + 1][monsterRedY] !== 13) {//down
            lastMoveRed = 3;
            board[monsterRedX][monsterRedY] = prevRed;
            prevRed = board[monsterRedX + 1][monsterRedY];
            board[monsterRedX + 1][monsterRedY] = currRed;
            currRed = prevRed;
            monsterRedX++;

        } else if (monsterRedX > 0 & board[monsterRedX - 1][monsterRedY] !== 4 &
            board[monsterRedX - 1][monsterRedY] !== 6 & board[monsterRedX - 1][monsterRedY] !== 7 &
            board[monsterRedX - 1][monsterRedY] !== 8 & board[monsterRedX - 1][monsterRedY] !== 9& board[monsterRedX - 1][monsterRedY] !== 13) {//up
            lastMoveRed = 1;
            board[monsterRedX][monsterRedY] = prevRed;
            prevRed = board[monsterRedX - 1][monsterRedY];
            board[monsterRedX - 1][monsterRedY] = currRed;
            currRed = prevRed;
            monsterRedX--;

        } else if (monsterRedY < 8 & board[monsterRedX][monsterRedY + 1] !== 4 &
            board[monsterRedX][monsterRedY + 1] !== 6 & board[monsterRedX][monsterRedY + 1] !== 7 &
            board[monsterRedX][monsterRedY + 1] !== 8 & board[monsterRedX][monsterRedY + 1] !== 9& board[monsterRedX][monsterRedY + 1] !== 13) {//right
            lastMoveRed = 2;
            board[monsterRedX][monsterRedY] = prevRed;
            prevRed = board[monsterRedX][monsterRedY + 1];
            board[monsterRedX][monsterRedY + 1] = currRed;
            currRed = prevRed;
            monsterRedY++;


        }
    }
}

function rightRed() {
    if (monsterRedY < 8 & board[monsterRedX][monsterRedY + 1] !== 4 &
        board[monsterRedX][monsterRedY + 1] !== 6 & board[monsterRedX][monsterRedY + 1] !== 7 &
        board[monsterRedX][monsterRedY + 1] !== 8 & board[monsterRedX][monsterRedY + 1] !== 9& board[monsterRedX][monsterRedY + 1] !== 13) {
        board[monsterRedX][monsterRedY] = prevRed;
        prevRed = board[monsterRedX][monsterRedY + 1];
        board[monsterRedX][monsterRedY + 1] = currRed;
        currRed = prevRed;
        monsterRedY++;
    } else if (board[monsterRedX][monsterRedY + 1] === 4) {
        obstacleRed = true;
        blockedMoveRed = 2;
        if (monsterRedX > 0 & board[monsterRedX - 1][monsterRedY] !== 4 &
            board[monsterRedX - 1][monsterRedY] !== 6 & board[monsterRedX - 1][monsterRedY] !== 7 &
            board[monsterRedX - 1][monsterRedY] !== 8 & board[monsterRedX - 1][monsterRedY] !== 9 & board[monsterRedX - 1][monsterRedY] !== 13) {//up
            lastMoveRed = 1;
            board[monsterRedX][monsterRedY] = prevRed;
            prevRed = board[monsterRedX - 1][monsterRedY];
            board[monsterRedX - 1][monsterRedY] = currRed;
            currRed = prevRed;
            monsterRedX--;

        } else if (monsterRedX < 13 & board[monsterRedX + 1][monsterRedY] !== 4 &
            board[monsterRedX + 1][monsterRedY] !== 6 & board[monsterRedX + 1][monsterRedY] !== 7 &
            board[monsterRedX + 1][monsterRedY] !== 8 & board[monsterRedX + 1][monsterRedY] !== 9& board[monsterRedX + 1][monsterRedY] !== 13) {//down
            lastMoveRed = 3;
            board[monsterRedX][monsterRedY] = prevRed;
            prevRed = board[monsterRedX + 1][monsterRedY];
            board[monsterRedX + 1][monsterRedY] = currRed;
            currRed = prevRed;
            monsterRedX++;

        } else if (monsterRedY > 0 & board[monsterRedX][monsterRedY - 1] !== 4 &
            board[monsterRedX][monsterRedY - 1] !== 6 & board[monsterRedX][monsterRedY - 1] !== 7 &
            board[monsterRedX][monsterRedY - 1] !== 8 & board[monsterRedX][monsterRedY - 1] !== 9& board[monsterRedX][monsterRedY - 1] !== 13) {//left
            lastMoveRed = 4;
            board[monsterRedX][monsterRedY] = prevRed;
            prevRed = board[monsterRedX][monsterRedY - 1];
            board[monsterRedX][monsterRedY - 1] = currRed;
            currRed = prevRed;
            monsterRedY--;

        }
    }
}

/************************************************updateScoreAndLife**********************************************/
function updateLife() {
    if (pacmanLife == 4) {
        pacmanLife++;
        document.getElementById("lblLive").style.visibility = "visible";
        document.getElementById("lblLive1").style.visibility = "visible";
        document.getElementById("lblLive2").style.visibility = "visible";
        document.getElementById("lblLive3").style.visibility = "visible";
        document.getElementById("lblLive4").style.visibility = "visible";
    } else if (pacmanLife == 3) {
        pacmanLife++;
        document.getElementById("lblLive").style.visibility = "visible";
        document.getElementById("lblLive1").style.visibility = "visible";
        document.getElementById("lblLive2").style.visibility = "visible";
        document.getElementById("lblLive3").style.visibility = "visible";
        document.getElementById("lblLive4").style.visibility = "hidden";
    } else if (pacmanLife == 2) {
        pacmanLife++;
        document.getElementById("lblLive").style.visibility = "visible";
        document.getElementById("lblLive1").style.visibility = "visible";
        document.getElementById("lblLive2").style.visibility = "visible";
        document.getElementById("lblLive3").style.visibility = "hidden";
        document.getElementById("lblLive4").style.visibility = "hidden";
    } else if (pacmanLife == 1) {
        pacmanLife++;
        document.getElementById("lblLive").style.visibility = "visible";
        document.getElementById("lblLive1").style.visibility = "visible";
        document.getElementById("lblLive2").style.visibility = "hidden";
        document.getElementById("lblLive3").style.visibility = "hidden";
        document.getElementById("lblLive4").style.visibility = "hidden";
    }
}

function looseLife() {
    if (pacmanLife == 5) {
        document.getElementById("lblLive").style.visibility = "visible";
        document.getElementById("lblLive1").style.visibility = "visible";
        document.getElementById("lblLive2").style.visibility = "visible";
        document.getElementById("lblLive3").style.visibility = "visible";
        document.getElementById("lblLive4").style.visibility = "hidden";
    } else if (pacmanLife == 4) {
        document.getElementById("lblLive").style.visibility = "visible";
        document.getElementById("lblLive1").style.visibility = "visible";
        document.getElementById("lblLive2").style.visibility = "visible";
        document.getElementById("lblLive3").style.visibility = "hidden";
        document.getElementById("lblLive4").style.visibility = "hidden";
    } else if (pacmanLife == 3) {
        document.getElementById("lblLive").style.visibility = "visible";
        document.getElementById("lblLive1").style.visibility = "visible";
        document.getElementById("lblLive2").style.visibility = "hidden";
        document.getElementById("lblLive3").style.visibility = "hidden";
        document.getElementById("lblLive4").style.visibility = "hidden";
    } else if (pacmanLife == 2) {
        document.getElementById("lblLive").style.visibility = "visible";
        document.getElementById("lblLive1").style.visibility = "hidden";
        document.getElementById("lblLive2").style.visibility = "hidden";
        document.getElementById("lblLive3").style.visibility = "hidden";
        document.getElementById("lblLive4").style.visibility = "hidden";
    } else if (pacmanLife == 1) {
        document.getElementById("lblLive").style.visibility = "hidden";
        document.getElementById("lblLive1").style.visibility = "hidden";
        document.getElementById("lblLive2").style.visibility = "hidden";
        document.getElementById("lblLive3").style.visibility = "hidden";
        document.getElementById("lblLive4").style.visibility = "hidden";
    }
    pacmanLife--;
}

function updateScoreAfterCollision() {
    if (monsterBlueX !== -1) {
        board[monsterBlueX][monsterBlueY] = prevBlue;
        prevBlue = 0;
        currBlue = 0;
    }
    if (monsterOrangeX !== -1) {
        board[monsterOrangeX][monsterOrangeY] = prevOrange;
        prevOrange = 0;
        currOrange = 0;
    }
    if (monsterGreenX !== -1) {
        board[monsterGreenX][monsterGreenY] = prevGreen;
        prevGreen = 0;
        currGreen = 0;
    }
    if (monsterRedX !== -1) {
        board[monsterRedX][monsterRedY] = prevRed;
        prevRed = 0;
        currRed = 0;
    }


    let points = 0;
    for (let monsterColor in listMonsters) {
        let monsterChosen = listMonsters[monsterColor];
        let tmpKeyColor = Object.keys(monsterChosen)[0];
        let monColor = monsterChosen[tmpKeyColor];
        let tmpKeyPos = Object.keys(monsterChosen)[1];
        let monPlace = monsterChosen[tmpKeyPos];
        monPlace += 6;
        if (monColor === "blue") {
            points = 15;
        } else if (monColor === "orange") {
            points = 20;
        } else if (monColor === "green") {
            points = 10;
        } else if (monColor === "red") {
            points = 25;
        }

    }
    if (score < points) {
        score = 0;
    } else {
        score -= points;
    }

    looseLife();
}

function win() {
    document.getElementById('dialogWinner').style.display = 'block';

    document.getElementsByClassName("closeWin")[0].onclick = function () {
         document.getElementById('dialogWinner').style.display = 'none';
         document.getElementById('dialogWinner').close();
        showMenuSettings();
    }

    window.onkeydown = function( event ){
        // ESCAPE key pressed
        if ( event.keyCode === 27) {
            document.getElementById('dialogWinner').style.display = 'none';
            document.getElementById('dialogWinner').close();
            showMenuSettings();
        }
    };
    window.onclick = function(event) {
        if (event.target === modal) {
            document.getElementById('dialogWinner').style.display = 'none';
            document.getElementById('dialogWinner').close();
            showMenuSettings();
        }
    }

}

/************************************************Others**********************************************/
//stop scrolling
window.addEventListener("keydown", function (e) {
    // arrow keys
    if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

function musicController() {
    // var imgElement = document.getElementById('imageMusic');
    // if (musicOn) {
    //     imgElement.src = img1;
    //     audio.pause();
    //     musicOn = false;
    // } else {
    //     imgElement.src = img2;
    //     audio.play();
    //     audio.loop=true;
    //     musicOn = true;
    // }
}
