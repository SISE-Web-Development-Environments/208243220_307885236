var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var intervalMonsters;
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
monster.img.src ="Resources/blue.png";
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

var prev;
var curr;



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
    prev = 0;
    curr = 0;
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
                board[i][j] =0;
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



    intervalMonsters = setInterval(UpdatePositionMonsters, 550);
    interval = setInterval(UpdatePosition, 500);


}

function findRandomEmptyCell(board) {
    var i = Math.floor(Math.random() * 13 + 1);
    var j = Math.floor(Math.random() * 8 + 1);
    while (board[i][j] != 0 || (i===0 && j===0 )||(i===13 && j===0 )||(i===13 && j===8 )||(i===0 && j===8 )) {
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

/************************************************UpdatePosition***********************************************/

function UpdatePosition() {
    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
    if (x === 1) {//up
        if (shape.j > 0) {
            if ((board[shape.i][shape.j - 1] === 6) ||
                (board[shape.i][shape.j - 1] === 7 ) ||
                (board[shape.i][shape.j - 1] === 8 ) ||
                (board[shape.i][shape.j - 1] === 9 )) {
                collision = true;
                updateScoreAfterCollision();
            } else if (board[shape.i][shape.j - 1] !== 4) {
                shape.j--;
            }
        }

    }
    if (x === 2) {
        if (shape.j < 8) {
            if ((board[shape.i][shape.j + 1] === 6 ) ||
                (board[shape.i][shape.j + 1] === 7 ) ||
                (board[shape.i][shape.j + 1] === 8 ) ||
                (board[shape.i][shape.j + 1] === 9 )) {
                collision = true;
                updateScoreAfterCollision();
            } else if (board[shape.i][shape.j + 1] !== 4) {
                shape.j++;
            }
        }
    }
    if (x === 3) { //left
        if (shape.i > 0) {
            if ((board[shape.i - 1][shape.j] === 6 ) ||
                (board[shape.i - 1][shape.j] === 7 ) ||
                (board[shape.i - 1][shape.j] === 8 ) ||
                (board[shape.i - 1][shape.j] === 9 )) {
                collision = true;
                updateScoreAfterCollision();
            } else if (board[shape.i - 1][shape.j] !== 4) {
                shape.i--;
            }
        }
    }
    if (x === 4) {
        if (shape.i < 13) {
            if ((board[shape.i + 1][shape.j] === 6 ) ||
                (board[shape.i + 1][shape.j] === 7 ) ||
                (board[shape.i + 1][shape.j] === 8 ) ||
                (board[shape.i + 1][shape.j] === 9 )) {
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

    if(score>=15){
        window.clearInterval(interval);
        win();
    }else
    if (time_elapsed.valueOf() >= parseInt(totalTimeOfGame) + parseInt(tmpTime)) {
        window.clearInterval(interval);
        if (score < 100) {
            window.alert("You are better than " + score + " points");
        } else {
            window.alert("Winner!!!");
        }

    } else if (pacmanLife === 0) {
        window.alert("Loser!");
        showMenuSettings();
    } else {
        Draw();
    }

}

function checkCollision() {

    if (collision) {
        if (pacmanLife === 0) {
            musicOn = true;
            musicController();
            window.alert("Loser!");

            showMenuSettings();
        } else {
            collision = false;

            pacman.img = null;
            var randomI = Math.floor(Math.random() * 13);
            var randomJ = Math.floor(Math.random() * 8);
            while (board[randomI][randomJ] !== 0  ||
            (randomI===0 && randomJ===0 )||
            (randomI===13 && randomJ===0 )||
            (randomI===13 && randomJ===8 )||
            (randomI===0 && randomJ===8 )) {
                randomI = Math.floor(Math.random() * 13);
                randomJ = Math.floor(Math.random() * 8);
            }
            board[shape.i][shape.j] = 0;
            shape.i = randomI;
            shape.j = randomJ;

            pacman.img = pacman.imgRight;

            createMonsterPositions();
            setMonstersStartPoint();
        }
    }
}

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
            board[0][0]=6;
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
            board[13][0]=7;
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
            board[13][8]=8;
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
            board[0][8]=9;
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

function UpdatePositionMonsters() {
    for (let monsterColor in listMonsters) {
        let monsterChosen = listMonsters[monsterColor];
        let tmpKeyColor = Object.keys(monsterChosen)[0];
        let monColor = monsterChosen[tmpKeyColor];
        let tmpKeyPos = Object.keys(monsterChosen)[1];
        let monPlaceUpdatePosition = monsterChosen[tmpKeyPos];
        monPlaceUpdatePosition += 6;

        prev = monPlaceUpdatePosition;

        let disX;
        let disY;
        if (monColor === "blue" && monsterBlueX!==-1 && monsterBlueY!==-1) {
            disX = monsterBlueX - shape.i;
            disY = monsterBlueY - shape.j;
            if ((Math.abs(disX) === 1 && Math.abs(disY) === 0) || (Math.abs(disX) === 0 && Math.abs(disY) === 1)) {
                collision = true;
                board[monsterBlueX][monsterBlueY]=curr;
                updateScoreAfterCollision();
                prev = 0;
                curr = 0;
            }
            if (Math.abs(disX) < Math.abs(disY)) {
                if (disX > 0) {//up
                    upBlue();
                } else if (disX < 0) {//down
                    downBlue();
                }
                else if (disY > 0) {//left
                    leftBlue();
                } else {//right
                    rightBlue();
                }

            } else if (Math.abs(disX) > Math.abs(disY)) {
                if (disY > 0) {//left
                    leftBlue();
                } else if (disY < 0) {//right
                    rightBlue();
                }
                else if (disX < 0) {//down
                    downBlue();
                } else {//up
                    upBlue();
                }
            }
        } else if (monColor === "orange"&& monsterOrangeX!==-1 && monsterOrangeY!==-1) {
            disX = monsterOrangeX - shape.i;
            disY = monsterOrangeY - shape.j;
            if ((Math.abs(disX) === 1 && Math.abs(disY) === 0) || (Math.abs(disX) === 0 && Math.abs(disY) === 1)) {
                collision = true;
                board[monsterOrangeX][monsterOrangeY]=curr;
                updateScoreAfterCollision();
                prev = 0;
                curr = 0;
            }
            if (Math.abs(disX) < Math.abs(disY)) {
                if (disX > 0) {//up
                    upOrange();
                } else if (disX < 0) {//down
                    downOrange();
                }
                else if (disY > 0) {//left
                    leftOrange();
                } else {//right
                    rightOrange();
                }
            } else if (Math.abs(disX) > Math.abs(disY)) {
                if (disY > 0) {//left
                    leftOrange();
                } else if (disY < 0) {//right
                    rightOrange();}
                else if (disX > 0) {//down
                    downOrange();
                } else {//up
                    upOrange();
                }
            }
        } else if (monColor === "green"&& monsterGreenX!==-1 && monsterGreenY!==-1) {
            disX = monsterGreenX - shape.i;
            disY = monsterGreenY - shape.j;
            if ((Math.abs(disX) === 1 && Math.abs(disY) === 0) || (Math.abs(disX) === 0 && Math.abs(disY) === 1)) {
                collision = true;
                board[monsterGreenX][monsterGreenY]=curr;
                updateScoreAfterCollision();
                prev = 0;
                curr = 0;
            }
            if (Math.abs(disX) < Math.abs(disY)) {
                if (disX > 0) {//up
                    upGreen();
                } else if (disX < 0) {//down
                    downGreen();
                }
                else if (disY > 0) {//left
                    leftGreen();
                } else {//right
                    rightGreen();
                }
            } else if (Math.abs(disX) > Math.abs(disY)) {
                if (disY > 0) {//left
                    leftGreen();
                } else if (disY < 0) {//right
                    rightGreen();
                }
                else if (disX > 0) {//down
                    downGreen();
                } else {//up
                    upGreen();
                }
            }
        } else if (monColor === "red"&& monsterRedX!==-1 && monsterRedY!==-1) {
            disX = monsterRedX - shape.i;
            disY = monsterRedY - shape.j;
            if ((Math.abs(disX) === 1 && Math.abs(disY) === 0) || (Math.abs(disX) === 0 && Math.abs(disY) === 1)) {
                collision = true;
                board[monsterRedX][monsterRedY]=curr;
                updateScoreAfterCollision();
                prev = 0;
                curr = 0;
            }
            if (Math.abs(disX) < Math.abs(disY)) {
                if (disX > 0) {//up
                    upRed();
                } else if (disX < 0) {//down
                    downRed();
                }
                else if (disY > 0) {//left
                    leftRed();
                } else {//right
                    rightRed();
                }
            } else if (Math.abs(disX) > Math.abs(disY)) {
                if (disY > 0) {//left
                    leftRed();
                } else if (disY < 0) {//right
                    rightRed();
                }
                else if (disX > 0) {//down
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

/************************************************BlueMonster***********************************************/
function upBlue() {
    if (curr!==2 && monsterBlueX > 0 & board[monsterBlueX - 1][monsterBlueY] !== 4) {

        board[monsterBlueX][monsterBlueY] = curr;
        curr = board[monsterBlueX - 1][monsterBlueY];
        board[monsterBlueX - 1][monsterBlueY] = prev;
        prev = curr;

        monsterBlueX--;

    } else if (curr!==2 &&board[monsterBlueX - 1][monsterBlueY] === 4) {
        if (monsterBlueY > 0 & board[monsterBlueX][monsterBlueY - 1] !== 4) {
            board[monsterBlueX][monsterBlueY] = curr;
            curr = board[monsterBlueX][monsterBlueY - 1];
            board[monsterBlueX][monsterBlueY - 1] = prev;
            prev = curr;
            monsterBlueY--;

        } else if (monsterBlueY < 9 & board[monsterBlueX][monsterBlueY + 1] !== 4) {
            board[monsterBlueX][monsterBlueY] = curr;
            curr = board[monsterBlueX][monsterBlueY + 1];
            board[monsterBlueX][monsterBlueY + 1] = prev;
            prev = curr;
            monsterBlueY++;

        } else if (monsterBlueX < 14 & board[monsterBlueX + 1][monsterBlueY] !== 4) {
            board[monsterBlueX][monsterBlueY] = curr;
            curr = board[monsterBlueX + 1][monsterBlueY];
            board[monsterBlueX + 1][monsterBlueY] = prev;
            prev = curr;

            monsterBlueX++;
        }
    }
}

function downBlue() {
    if (curr!==2 &&monsterBlueX < 14 & board[monsterBlueX + 1][monsterBlueY] !== 4) {
        board[monsterBlueX][monsterBlueY] = curr;
        curr = board[monsterBlueX + 1][monsterBlueY];
        board[monsterBlueX + 1][monsterBlueY] = prev;
        prev = curr;
        monsterBlueX++;

    } else if (curr!==2 &&board[monsterBlueX - 1][monsterBlueY] === 4) {
        if (monsterBlueY < 9 & board[monsterBlueX][monsterBlueY + 1] !== 4) {
            board[monsterBlueX][monsterBlueY] = curr;
            curr = board[monsterBlueX][monsterBlueY + 1];
            board[monsterBlueX][monsterBlueY + 1] = prev;
            prev = curr;
            monsterBlueY++;

        } else if (monsterBlueY > 0 & board[monsterBlueX][monsterBlueY - 1] !== 4) {
            board[monsterBlueX][monsterBlueY] = curr;
            curr = board[monsterBlueX][monsterBlueY - 1];
            board[monsterBlueX][monsterBlueY - 1] = prev;
            prev = curr;
            monsterBlueY--;

        } else if (monsterBlueX > 0 & board[monsterBlueX - 1][monsterBlueY] !== 4) {
            board[monsterBlueX][monsterBlueY] = curr;
            curr = board[monsterBlueX - 1][monsterBlueY];
            board[monsterBlueX - 1][monsterBlueY] = prev;
            prev = curr;
            monsterBlueX--;


        }
    }
}

function leftBlue() {
    if (curr!==2 &&monsterBlueY > 0 & board[monsterBlueX][monsterBlueY - 1] !== 4) {
        board[monsterBlueX][monsterBlueY] = curr;
        curr = board[monsterBlueX][monsterBlueY - 1];
        board[monsterBlueX][monsterBlueY - 1] = prev;
        prev = curr;
        monsterBlueY--;

    } else if (curr!==2 &&board[monsterBlueX - 1][monsterBlueY] === 4) {
        if (monsterBlueX > 0 & board[monsterBlueX - 1][monsterBlueY] !== 4) {
            board[monsterBlueX][monsterBlueY] = curr;
            curr = board[monsterBlueX - 1][monsterBlueY];
            board[monsterBlueX - 1][monsterBlueY] = prev;
            prev = curr;
            monsterBlueX--;

        } else if (monsterBlueX < 14 & board[monsterBlueX + 1][monsterBlueY] !== 4) {
            board[monsterBlueX][monsterBlueY] = curr;
            curr = board[monsterBlueX + 1][monsterBlueY];
            board[monsterBlueX + 1][monsterBlueY] = prev;
            prev = curr;
            monsterBlueX++;
        } else if (monsterBlueY < 9 & board[monsterBlueX][monsterBlueY + 1] !== 4) {
            board[monsterBlueX][monsterBlueY] = curr;
            curr = board[monsterBlueX][monsterBlueY + 1];
            board[monsterBlueX][monsterBlueY + 1] = prev;
            prev = curr;
            monsterBlueY++;

        }
    }
}

function rightBlue() {
    if (curr!==2 &&monsterBlueY < 9 & board[monsterBlueX][monsterBlueY + 1] !== 4) {
        board[monsterBlueX][monsterBlueY] = curr;
        curr = board[monsterBlueX][monsterBlueY + 1];
        board[monsterBlueX][monsterBlueY + 1] = prev;
        prev = curr;
        monsterBlueY++;
    } else if (curr!==2 &&board[monsterBlueX - 1][monsterBlueY] === 4) {
        if (monsterBlueX < 14 & board[monsterBlueX + 1][monsterBlueY] !== 4) {
            board[monsterBlueX][monsterBlueY] = curr;
            curr = board[monsterBlueX + 1][monsterBlueY];
            board[monsterBlueX + 1][monsterBlueY] = prev;
            prev = curr;
            monsterBlueX++;
        } else if (monsterBlueX > 0 & board[monsterBlueX - 1][monsterBlueY] !== 4) {
            board[monsterBlueX][monsterBlueY] = curr;
            curr = board[monsterBlueX - 1][monsterBlueY];
            board[monsterBlueX - 1][monsterBlueY] = prev;
            prev = curr;
            monsterBlueX--;
        } else if (monsterBlueY > 0 & board[monsterBlueX][monsterBlueY - 1] !== 4) {
            board[monsterBlueX][monsterBlueY] = curr;
            curr = board[monsterBlueX][monsterBlueY - 1];
            board[monsterBlueX][monsterBlueY - 1] = prev;
            prev = curr;
            monsterBlueY--;
        }
    }
}

/************************************************OrangeMonster***********************************************/
function upOrange() {
    if (curr!==2 &&monsterOrangeX > 0 & board[monsterOrangeX - 1][monsterOrangeY] !== 4) {
        board[monsterOrangeX][monsterOrangeY] = curr;
        curr = board[monsterOrangeX - 1][monsterOrangeY];
        board[monsterOrangeX - 1][monsterOrangeY] = prev;
        prev = curr;

        monsterOrangeX--;

    } else if (curr!==2 &&board[monsterOrangeX - 1][monsterOrangeY] === 4) {
        if (monsterOrangeY > 0 & board[monsterOrangeX][monsterOrangeY - 1] !== 4) {
            board[monsterOrangeX][monsterOrangeY] = curr;
            curr = board[monsterOrangeX][monsterOrangeY - 1];
            board[monsterOrangeX][monsterOrangeY - 1] = prev;
            prev = curr;
            monsterOrangeY--;

        } else if (monsterOrangeY < 9 & board[monsterOrangeX][monsterOrangeY + 1] !== 4) {
            board[monsterOrangeX][monsterOrangeY] = curr;
            curr = board[monsterOrangeX][monsterOrangeY + 1];
            board[monsterOrangeX][monsterOrangeY + 1] = prev;
            prev = curr;
            monsterOrangeY++;

        } else if (monsterOrangeX < 14 & board[monsterOrangeX + 1][monsterOrangeY] !== 4) {
            board[monsterOrangeX][monsterOrangeY] = curr;
            curr = board[monsterOrangeX + 1][monsterOrangeY];
            board[monsterOrangeX + 1][monsterOrangeY] = prev;
            prev = curr;

            monsterOrangeY++;
        }
    }
}

function downOrange() {
    if (curr!==2 &&monsterOrangeX < 14 & board[monsterOrangeX + 1][monsterOrangeY] !== 4) {
        board[monsterOrangeX][monsterOrangeY] = curr;
        curr = board[monsterOrangeX + 1][monsterOrangeY];
        board[monsterOrangeX + 1][monsterOrangeY] = prev;
        prev = curr;
        monsterOrangeX++;

    } else if (curr!==2 &&board[monsterOrangeX - 1][monsterOrangeY] === 4) {
        if (monsterOrangeY < 9 & board[monsterOrangeX][monsterOrangeY + 1] !== 4) {
            board[monsterOrangeX][monsterOrangeY] = curr;
            curr = board[monsterOrangeX][monsterOrangeY + 1];
            board[monsterOrangeX][monsterOrangeY + 1] = prev;
            prev = curr;
            monsterOrangeY++;

        } else if (monsterOrangeY > 0 & board[monsterOrangeX][monsterOrangeY - 1] !== 4) {
            board[monsterOrangeX][monsterOrangeY] = curr;
            curr = board[monsterOrangeX][monsterOrangeY - 1];
            board[monsterOrangeX][monsterOrangeY - 1] = prev;
            prev = curr;
            monsterOrangeY--;

        } else if (monsterOrangeX > 0 & board[monsterOrangeX - 1][monsterOrangeY] !== 4) {
            board[monsterOrangeX][monsterOrangeY] = curr;
            curr = board[monsterOrangeX - 1][monsterOrangeY];
            board[monsterOrangeX - 1][monsterOrangeY] = prev;
            prev = curr;
            monsterOrangeX--;
        }
    }
}

function leftOrange() {
    if (curr!==2 &&monsterOrangeY > 0 & board[monsterOrangeX][monsterOrangeY - 1] !== 4) {
        board[monsterOrangeX][monsterOrangeY] = curr;
        curr = board[monsterOrangeX][monsterOrangeY - 1];
        board[monsterOrangeX][monsterOrangeY - 1] = prev;
        prev = curr;
        monsterOrangeY--;

    } else if (curr!==2 &&board[monsterOrangeX - 1][monsterOrangeY] === 4) {
        if (monsterOrangeX > 0 & board[monsterOrangeX - 1][monsterOrangeY] !== 4) {
            board[monsterOrangeX][monsterOrangeY] = curr;
            curr = board[monsterOrangeX - 1][monsterOrangeY];
            board[monsterOrangeX - 1][monsterOrangeY] = prev;
            prev = curr;
            monsterOrangeX--;

        } else if (monsterOrangeX < 14 & board[monsterOrangeX + 1][monsterOrangeY] !== 4) {
            board[monsterOrangeX][monsterOrangeY] = curr;
            curr = board[monsterOrangeX + 1][monsterOrangeY];
            board[monsterOrangeX + 1][monsterOrangeY] = prev;
            prev = curr;
            monsterOrangeX++;
        } else if (monsterOrangeY < 9 & board[monsterOrangeX][monsterOrangeY + 1] !== 4) {
            board[monsterOrangeX][monsterOrangeY] = curr;
            curr = board[monsterOrangeX][monsterOrangeY + 1];
            board[monsterOrangeX][monsterOrangeY + 1] = prev;
            prev = curr;
            monsterOrangeY++;

        }
    }
}

function rightOrange() {
    if (curr!==2 &&monsterOrangeY < 9 & board[monsterOrangeX][monsterOrangeY + 1] !== 4) {
        board[monsterOrangeX][monsterOrangeY] = curr;
        curr = board[monsterOrangeX][monsterOrangeY + 1];
        board[monsterOrangeX][monsterOrangeY + 1] = prev;
        prev = curr;
        monsterOrangeY++;
    } else if (curr!==2 &&board[monsterOrangeX - 1][monsterOrangeY] === 4) {
        if (monsterOrangeX < 14 & board[monsterOrangeX + 1][monsterOrangeY] !== 4) {
            board[monsterOrangeX][monsterOrangeY] = curr;
            curr = board[monsterOrangeX + 1][monsterOrangeY];
            board[monsterOrangeX + 1][monsterOrangeY] = prev;
            prev = curr;
            monsterOrangeX++;
        } else if (monsterOrangeX > 0 & board[monsterOrangeX - 1][monsterOrangeY] !== 4) {
            board[monsterOrangeX][monsterOrangeY] = curr;
            curr = board[monsterOrangeX - 1][monsterOrangeY];
            board[monsterOrangeX - 1][monsterOrangeY] = prev;
            prev = curr;
            monsterOrangeX--;
        } else if (monsterOrangeY > 0 & board[monsterOrangeX][monsterOrangeY - 1] !== 4) {
            board[monsterOrangeX][monsterOrangeY] = curr;
            curr = board[monsterOrangeX][monsterOrangeY - 1];
            board[monsterOrangeX][monsterOrangeY - 1] = prev;
            prev = curr;
            monsterOrangeY--;
        }
    }
}

/************************************************GreenMonster***********************************************/
function upGreen() {
    if (curr!==2 &&monsterGreenX > 0 & board[monsterGreenX - 1][monsterGreenY] !== 4) {
        board[monsterGreenX][monsterGreenY] = curr;
        curr = board[monsterGreenX - 1][monsterGreenY];
        board[monsterGreenX - 1][monsterGreenY] = prev;
        prev = curr;

        monsterGreenX--;

    } else if (curr!==2 &&board[monsterGreenX - 1][monsterGreenY] === 4) {
        if (monsterGreenY > 0 & board[monsterGreenX][monsterGreenY - 1] !== 4) {
            board[monsterGreenX][monsterGreenY] = curr;
            curr = board[monsterGreenX][monsterGreenY - 1];
            board[monsterGreenX][monsterGreenY - 1] = prev;
            prev = curr;
            monsterGreenY--;

        } else if (monsterGreenY < 9 & board[monsterGreenX][monsterGreenY + 1] !== 4) {
            board[monsterGreenX][monsterGreenY] = curr;
            curr = board[monsterGreenX][monsterGreenY + 1];
            board[monsterGreenX][monsterGreenY + 1] = prev;
            prev = curr;
            monsterGreenY++;

        } else if (monsterGreenX < 14 & board[monsterGreenX + 1][monsterGreenY] !== 4) {
            board[monsterGreenX][monsterGreenY] = curr;
            curr = board[monsterGreenX + 1][monsterGreenY];
            board[monsterGreenX + 1][monsterGreenY] = prev;
            prev = curr;

            monsterGreenX++;
        }
    }
}

function downGreen() {
    if (curr!==2 &&monsterGreenX < 14 & board[monsterGreenX + 1][monsterGreenY] !== 4) {
        board[monsterGreenX][monsterGreenY] = curr;
        curr = board[monsterGreenX + 1][monsterGreenY];
        board[monsterGreenX + 1][monsterGreenY] = prev;
        prev = curr;
        monsterGreenX++;

    } else if (curr!==2 &&board[monsterGreenX - 1][monsterGreenY] === 4) {
        if (monsterGreenY < 9 & board[monsterGreenX][monsterGreenY + 1] !== 4) {
            board[monsterGreenX][monsterGreenY] = curr;
            curr = board[monsterGreenX][monsterGreenY + 1];
            board[monsterGreenX][monsterGreenY + 1] = prev;
            prev = curr;
            monsterGreenY++;

        } else if (monsterGreenY > 0 & board[monsterGreenX][monsterGreenY - 1] !== 4) {
            board[monsterGreenX][monsterGreenY] = curr;
            curr = board[monsterGreenX][monsterGreenY - 1];
            board[monsterGreenX][monsterGreenY - 1] = prev;
            prev = curr;
            monsterGreenY--;

        } else if (monsterGreenX > 0 & board[monsterGreenX - 1][monsterGreenY] !== 4) {
            board[monsterGreenX][monsterGreenY] = curr;
            curr = board[monsterGreenX - 1][monsterGreenY];
            board[monsterGreenX - 1][monsterGreenY] = prev;
            prev = curr;
            monsterGreenX--;
        }
    }
}

function leftGreen() {
    if (curr!==2 &&monsterGreenY > 0 & board[monsterGreenX][monsterGreenY - 1] !== 4) {
        board[monsterGreenX][monsterGreenY] = curr;
        curr = board[monsterGreenX][monsterGreenY - 1];
        board[monsterGreenX][monsterGreenY - 1] = prev;
        prev = curr;
        monsterGreenY--;

    } else if (curr!==2 &&board[monsterGreenX - 1][monsterGreenY] === 4) {
        if (monsterGreenX > 0 & board[monsterGreenX - 1][monsterGreenY] !== 4) {
            board[monsterGreenX][monsterGreenY] = curr;
            curr = board[monsterGreenX - 1][monsterGreenY];
            board[monsterGreenX - 1][monsterGreenY] = prev;
            prev = curr;
            monsterGreenX--;

        } else if (monsterGreenX < 14 & board[monsterGreenX + 1][monsterGreenY] !== 4) {
            board[monsterGreenX][monsterGreenY] = curr;
            curr = board[monsterGreenX + 1][monsterGreenY];
            board[monsterGreenX + 1][monsterGreenY] = prev;
            prev = curr;
            monsterGreenX++;
        } else if (monsterGreenY < 9 & board[monsterGreenX][monsterGreenY + 1] !== 4) {
            board[monsterGreenX][monsterGreenY] = curr;
            curr = board[monsterGreenX][monsterGreenY + 1];
            board[monsterGreenX][monsterGreenY + 1] = prev;
            prev = curr;
            monsterGreenY++;

        }
    }
}

function rightGreen() {
    if (curr!==2 &&monsterGreenY < 9 & board[monsterGreenX][monsterGreenY + 1] !== 4) {
        board[monsterGreenX][monsterGreenY] = curr;
        curr = board[monsterGreenX][monsterGreenY + 1];
        board[monsterGreenX][monsterGreenY + 1] = prev;
        prev = curr;
        monsterGreenY++;
    } else if (curr!==2 &&board[monsterGreenX - 1][monsterGreenY] === 4) {
        if (monsterGreenX < 14 & board[monsterGreenX + 1][monsterGreenY] !== 4) {
            board[monsterGreenX][monsterGreenY] = curr;
            curr = board[monsterGreenX + 1][monsterGreenY];
            board[monsterGreenX + 1][monsterGreenY] = prev;
            prev = curr;
            monsterGreenX++;
        } else if (monsterGreenX > 0 & board[monsterGreenX - 1][monsterGreenY] !== 4) {
            board[monsterGreenX][monsterGreenY] = curr;
            curr = board[monsterGreenX - 1][monsterGreenY];
            board[monsterGreenX - 1][monsterGreenY] = prev;
            prev = curr;
            monsterGreenX--;
        } else if (monsterGreenY > 0 & board[monsterGreenX][monsterGreenY - 1] !== 4) {
            board[monsterGreenX][monsterGreenY] = curr;
            curr = board[monsterGreenX][monsterGreenY - 1];
            board[monsterGreenX][monsterGreenY - 1] = prev;
            prev = curr;
            monsterGreenY--;
        }
    }
}

/************************************************RedMonster***********************************************/
function upRed() {
    if (curr!==2 &&monsterRedX > 0 & board[monsterRedX - 1][monsterRedY] !== 4) {
        board[monsterRedX][monsterRedY] = curr;
        curr = board[monsterRedX - 1][monsterRedY];
        board[monsterRedX - 1][monsterRedY] = prev;
        prev = curr;

        monsterRedX--;

    } else if (curr!==2 &&board[monsterRedX - 1][monsterRedY] === 4) {
        if (monsterRedY > 0 & board[monsterRedX][monsterRedY - 1] !== 4) {
            board[monsterRedX][monsterRedY] = curr;
            curr = board[monsterRedX][monsterRedY - 1];
            board[monsterRedX][monsterRedY - 1] = prev;
            prev = curr;
            monsterRedY--;

        } else if (monsterRedY < 9 & board[monsterRedX][monsterRedY + 1] !== 4) {
            board[monsterRedX][monsterRedY] = curr;
            curr = board[monsterRedX][monsterRedY + 1];
            board[monsterRedX][monsterRedY + 1] = prev;
            prev = curr;
            monsterRedY++;

        } else if (monsterRedX < 14 & board[monsterRedX + 1][monsterRedY] !== 4) {
            board[monsterRedX][monsterRedY] = curr;
            curr = board[monsterRedX + 1][monsterRedY];
            board[monsterRedX + 1][monsterRedY] = prev;
            prev = curr;

            monsterRedX++;
        }
    }
}

function downRed() {
    if (curr!==2 &&monsterRedX < 14 & board[monsterRedX + 1][monsterRedY] !== 4) {
        board[monsterRedX][monsterRedY] = curr;
        curr = board[monsterRedX + 1][monsterRedY];
        board[monsterRedX + 1][monsterRedY] = prev;
        prev = curr;
        monsterRedX++;

    } else if (curr!==2 &&board[monsterRedX - 1][monsterRedY] === 4) {
        if (monsterRedY < 9 & board[monsterRedX][monsterRedY + 1] !== 4) {
            board[monsterRedX][monsterRedY] = curr;
            curr = board[monsterRedX][monsterRedY + 1];
            board[monsterRedX][monsterRedY + 1] = prev;
            prev = curr;
            monsterRedY++;

        } else if (monsterRedY > 0 & board[monsterRedX][monsterRedY - 1] !== 4) {
            board[monsterRedX][monsterRedY] = curr;
            curr = board[monsterRedX][monsterRedY - 1];
            board[monsterRedX][monsterRedY - 1] = prev;
            prev = curr;
            monsterRedY--;

        } else if (monsterRedX > 0 & board[monsterRedX - 1][monsterRedY] !== 4) {
            board[monsterRedX][monsterRedY] = curr;
            curr = board[monsterRedX - 1][monsterRedY];
            board[monsterRedX - 1][monsterRedY] = prev;
            prev = curr;
            monsterRedX--;
        }
    }
}

function leftRed() {
    if (curr!==2 &&monsterRedY > 0 & board[monsterRedX][monsterRedY - 1] !== 4) {
        board[monsterRedX][monsterRedY] = curr;
        curr = board[monsterRedX][monsterRedY - 1];
        board[monsterRedX][monsterRedY - 1] = prev;
        prev = curr;
        monsterRedY--;

    } else if (curr!==2 &&board[monsterRedX - 1][monsterRedY] === 4) {
        if (monsterRedX > 0 & board[monsterRedX - 1][monsterRedY] !== 4) {
            board[monsterRedX][monsterRedY] = curr;
            curr = board[monsterRedX - 1][monsterRedY];
            board[monsterRedX - 1][monsterRedY] = prev;
            prev = curr;
            monsterRedX--;

        } else if (monsterRedX < 14 & board[monsterRedX + 1][monsterRedY] !== 4) {
            board[monsterRedX][monsterRedY] = curr;
            curr = board[monsterRedX + 1][monsterRedY];
            board[monsterRedX + 1][monsterRedY] = prev;
            prev = curr;
            monsterRedX++;
        } else if (monsterRedY < 9 & board[monsterRedX][monsterRedY + 1] !== 4) {
            board[monsterRedX][monsterRedY] = curr;
            curr = board[monsterRedX][monsterRedY + 1];
            board[monsterRedX][monsterRedY + 1] = prev;
            prev = curr;
            monsterRedY++;

        }
    }
}

function rightRed() {
    if (curr!==2 &&monsterRedY < 9 & board[monsterRedX][monsterRedY + 1] !== 4) {
        board[monsterRedX][monsterRedY] = curr;
        curr = board[monsterRedX][monsterRedY + 1];
        board[monsterRedX][monsterRedY + 1] = prev;
        prev = curr;
        monsterRedY++;
    } else if (curr!==2 &&board[monsterRedX - 1][monsterRedY] === 4) {
        if (monsterRedX < 14 & board[monsterRedX + 1][monsterRedY] !== 4) {
            board[monsterRedX][monsterRedY] = curr;
            curr = board[monsterRedX + 1][monsterRedY];
            board[monsterRedX + 1][monsterRedY] = prev;
            prev = curr;
            monsterRedX++;
        } else if (monsterRedX > 0 & board[monsterRedX - 1][monsterRedY] !== 4) {
            board[monsterRedX][monsterRedY] = curr;
            curr = board[monsterRedX - 1][monsterRedY];
            board[monsterRedX - 1][monsterRedY] = prev;
            prev = curr;
            monsterRedX--;
        } else if (monsterRedY > 0 & board[monsterRedX][monsterRedY - 1] !== 4) {
            board[monsterRedX][monsterRedY] = curr;
            curr = board[monsterRedX][monsterRedY - 1];
            board[monsterRedX][monsterRedY - 1] = prev;
            prev = curr;
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
    let points = 0;
    for (let monsterColor in listMonsters) {
        let monsterChosen = listMonsters[monsterColor];
        let tmpKeyColor = Object.keys(monsterChosen)[0];
        let monColor = monsterChosen[tmpKeyColor];
        let tmpKeyPos = Object.keys(monsterChosen)[1];
        let monPlace = monsterChosen[tmpKeyPos];
        monPlace += 6;
        if (monColor === "blue") {
            points = 10;
        } else if (monColor === "orange") {
            points = 15;
        } else if (monColor === "green") {
            points = 5;
        } else if (monColor === "red") {
            points = 20;
        }

    }
    if (score < points) {
        score = 0;
    } else {
        score -= points;
    }

    looseLife();
}

// var gifWin = new Object();
// gifWin.img = new Image();
// clock.img.src = "Resources/happy.gif";

function win(){
    document.getElementById('dialogWinner').style.display='block';

    document.getElementsByClassName("closeWin")[0].onclick = function() {
        document.getElementById('dialogWinner').style.display='none';
        document.getElementById('dialogWinner').close();
        showMenuSettings();
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
