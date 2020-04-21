var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var tempFoodSize;
var food_remain;
// $("#startGameSettings").click(function() {
// 	$(document).ready(function() {
// 		context = canvas.getContext("2d");
// 		Start();
// 	});
// });

$(document).ready(function () {
    $("#startGameSettings").click(function () {
        context = canvas.getContext("2d");
        Start();
        //$('#p.userNameShow').body.appendChild('#userNameLogIn');
        //document.body.appendChild(btn);

        var paragraph = document.getElementById("userNameShow");
        var textFromUser=document.getElementById("userNameLogIn").value;
        var text = document.createTextNode(textFromUser);

        paragraph.appendChild(text);
    });
});

function Start() {

    board = new Array();
    score = 0;
    pac_color = "yellow";
    var cnt = 100;
    var food_remain = document.getElementById("numberCookies").value;
    if (food_remain < 50) {
        food_remain = 50;
    } else if (food_remain > 90) {
        food_remain = 90;
    }

    var pacman_remain = 1;
    start_time = new Date();
    for (var i = 0; i < 10; i++) {
        board[i] = new Array();
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
        for (var j = 0; j < 10; j++) {
            if (
                (i == 3 && j == 3) ||
                (i == 3 && j == 4) ||
                (i == 3 && j == 5) ||
                (i == 6 && j == 1) ||
                (i == 6 && j == 2)
            ) {
                board[i][j] = 4;
            } else {
                var randomNum = Math.random();
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
    if (keysDown[38]) {//up
        return 1;
    }
    if (keysDown[40]) {//down
        return 2;
    }
    if (keysDown[37]) {//left
        return 3;
    }
    if (keysDown[39]) {//right
        return 4;
    }
}

function Draw() {
    canvas.width = canvas.width; //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var center = new Object();
            center.x = i * 50 + 25;
            center.y = j * 50 + 25;
            if (board[i][j] == 2) {
                context.beginPath();
                context.arc(center.x, center.y, 20, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = "#406CB2"; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = "white"; //color //eye
                context.fill();
                context.beginPath();
                context.arc(center.x + 5, center.y - 16, 3, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color //eye
                context.fill();
                context.beginPath();
                context.arc(center.x + 12, center.y - 20, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = "white"; //color //eye
                context.fill();
                context.beginPath();
                context.arc(center.x + 10, center.y - 20, 3, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color //eye
                context.fill();
            } else if (board[i][j] == 1) {
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle =  document.getElementById("fiveCookie").value; //color //dots-food
                context.fill();
                context.beginPath();
                context.arc(center.x + 4, center.y - 8, 4, 0, 2 * Math.PI); // circle
                context.fillStyle = document.getElementById("fiveChip").value; //color
                context.fill();
                context.beginPath();
                context.arc(center.x - 6, center.y + 2, 4, 0, 2 * Math.PI); // circle
                context.fillStyle =  document.getElementById("fiveChip").value; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 7, center.y + 6, 4, 0, 2 * Math.PI); // circle
                context.fillStyle = document.getElementById("fiveChip").value; //color
                context.fill();
            } else if (board[i][j] == 4) {
                context.beginPath();
                context.rect(center.x - 30, center.y - 30, 60, 60);
                context.fillStyle = "grey"; //color //walls
                context.fill();
            } else if (board[i][j] == 3) {
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = document.getElementById("fifthCookie").value; //color //dots-food
                context.fill();
                context.beginPath();
                context.arc(center.x + 4, center.y - 8, 4, 0, 2 * Math.PI); // circle
                context.fillStyle = document.getElementById("fifthChip").value; //color
                context.fill();
                context.beginPath();
                context.arc(center.x - 6, center.y + 2, 4, 0, 2 * Math.PI); // circle
                context.fillStyle = document.getElementById("fifthChip").value; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 7, center.y + 6, 4, 0, 2 * Math.PI); // circle
                context.fillStyle = document.getElementById("fifthChip").value; //color
                context.fill();
            } else if (board[i][j] == 5) {
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
    }
}

function UpdatePosition() {
    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
    if (x == 1) {//up
        if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
            shape.j--;
        }
    }
    if (x == 2) {
        if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
            shape.j++;
        }
    }
    if (x == 3) { //left
        if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
            shape.i--;
        }
    }
    if (x == 4) {
        if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
            shape.i++;
        }
    }
    if (board[shape.i][shape.j] == 1) {
        score+=5;
    }
    if (board[shape.i][shape.j] == 3) {
        score+=15;
    }
    if (board[shape.i][shape.j] == 5) {
        score+=25;
    }
    board[shape.i][shape.j] = 2;
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    if (score >= 20 && time_elapsed <= 10) {
        pac_color = "green";
    }
    //todo!
    if (score===50) {
        window.clearInterval(interval);
        window.alert("Game completed");
    } else {
        Draw();
    }
}


function doSometing() {
    document.getElementById("fivePointsCook").style.background = document.getElementById("fiveCookie").value;
    document.getElementById("fivePointsChip").style.background = document.getElementById("fiveChip").value;

    document.getElementById("fifthPointsCook").style.background = document.getElementById("fifthCookie").value;
    document.getElementById("fifthPointsChip").style.background = document.getElementById("fifthChip").value;

    document.getElementById("twentyPointsCook").style.background = document.getElementById("twentyCookie").value;
    document.getElementById("twentyPointsChip").style.background = document.getElementById("twentyChip").value;

}

// $( document ).ready(function() {
//     $('#p.userNameShow').append('#userNameLogIn');
// });