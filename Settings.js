var randomMonster1=5;
var randomMonster2=5;
var randomMonster3=5;
var randomMonster4=5;

var monsterBlue;
var monsterOrange;
var monsterGreen;
var monsterRed;

var keyUp = null;
var keyRight = null;
var keyDown = null;
var keyLeft = null;

var listMonsters;


function playFunction(){
    showColorsChosenForCookies();
    if(isMonsterChecked() & isNumCookiesValid() & isTimeLegal() & insertKeyBoardTypes()){
        musicController();
        return showGame();
    }else{
       // alert("You did not fill all the settings!");
        //  alert("sad");
    }

}

function insertKeyBoardTypes(){
    lblUp.value= "↑";
    lblRight.value= "→";
    lblDown.value= "↓";
    lblLeft.value= "←";
    if(keyLeft === null && keyDown === null && keyRight === null && keyUp === null) {
        return true;
    } else if (keyUp !== keyDown && keyDown !== keyRight && keyRight !== keyLeft && keyUp !== keyLeft &&
            keyUp !== keyRight && keyDown !== keyLeft) {
        lblUp.value = String.fromCharCode(keyUp);
        lblRight.value = String.fromCharCode(keyRight);
        lblDown.value = String.fromCharCode(keyDown);
        lblLeft.value = String.fromCharCode(keyLeft);
        return true;
    } else {
        alert("Please choose 4 different keyboards");
        return false;
    }


}

function isTimeLegal(){
    let valid=true;
    var gameT=document.getElementById("gameTime").value;
    if(gameT<60){
        alert("The min time in seconds is 60 seconds to game");
        valid=false;
    }
    return valid;

}

function isNumCookiesValid(){
    let valid=true;
    var food=document.getElementById("numberCookies").value;
    if (food < 50 ) {
        alert("Num of cookies is less than 50");
        valid=false;
    } else if (food>90) {
        alert("Num of cookies is greater than 90");
        valid=false;
    }
    return valid;
}

function startNewGame() {
    showGame();
}

function fillFormRandom() {

    clearCheckBox();
    document.getElementById('numberCookies').value = Math.round(Math.random() * 40 + 50);
    document.getElementById('fiveCookie').value = getRandomColor();
    document.getElementById('fiveChip').value = getRandomColor();
    document.getElementById('fifthCookie').value = getRandomColor();
    document.getElementById('fifthChip').value = getRandomColor();
    document.getElementById('twentyCookie').value = getRandomColor();
    document.getElementById('twentyChip').value = getRandomColor();

    while(!isMonsterChecked()){
        randomCheckBox();
    }

    document.getElementById('gameTime').value = Math.round(Math.random() * 120 + 60);


}

function fillChoice() {

    clearCheckBox();
    document.getElementById('numberCookies').value = 70;
    document.getElementById('fiveCookie').value = "#b37700";
    document.getElementById('fiveChip').value = "#664400";
    document.getElementById('fifthCookie').value = "#ffcc99";
    document.getElementById('fifthChip').value = "#fff2e6";
    document.getElementById('twentyCookie').value = "#331a00";
    document.getElementById('twentyChip').value = "#ffffff";

    document.getElementById("monsterBlue").checked = true;
    document.getElementById("monsterGreen").checked = true;
    document.getElementById("monsterRed").checked = true;

    document.getElementById('gameTime').value = 120;

}

function clearCheckBox() {
    document.getElementById("monsterBlue").checked = false;
    document.getElementById("monsterOrange").checked = false;
    document.getElementById("monsterGreen").checked = false;
    document.getElementById("monsterRed").checked = false;
}

function randomCheckBox(){
    let randomCheckBox=Math.round(Math.random());
    if(randomCheckBox==1){
        document.getElementById("monsterBlue").checked = true;
    }
    randomCheckBox=Math.round(Math.random());
    if(randomCheckBox==1){
        document.getElementById("monsterOrange").checked = true;
    }
    randomCheckBox=Math.round(Math.random());
    if(randomCheckBox==1){
        document.getElementById("monsterGreen").checked = true;
    }
    randomCheckBox=Math.round(Math.random());
    if(randomCheckBox==1){
        document.getElementById("monsterRed").checked = true;
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function showColorsChosenForCookies() {
    document.getElementById("fivePointsCook").style.background = document.getElementById("fiveCookie").value;
    document.getElementById("fivePointsChip").style.background = document.getElementById("fiveChip").value;

    document.getElementById("fifthPointsCook").style.background = document.getElementById("fifthCookie").value;
    document.getElementById("fifthPointsChip").style.background = document.getElementById("fifthChip").value;

    document.getElementById("twentyPointsCook").style.background = document.getElementById("twentyCookie").value;
    document.getElementById("twentyPointsChip").style.background = document.getElementById("twentyChip").value;
}

function isMonsterChecked() {
    let chx = document.getElementsByTagName('input');
    for (let i=0; i<chx.length; i++) {
        if (chx[i].type === 'checkbox' && chx[i].checked) {
            return true;
        }
    }
    return false;
}

function createMonsterPositions(){
    listMonsters=[];
    monsterBlue = document.getElementById('monsterBlue');
    monsterOrange = document.getElementById('monsterOrange');
    monsterGreen = document.getElementById('monsterGreen');
    monsterRed = document.getElementById('monsterRed');
    if(monsterBlue.checked){
        randomMonster1= Math.round(Math.random()*3);
        let newMonsterBlue = {};
        newMonsterBlue.color = "blue";
        newMonsterBlue.pos = randomMonster1;
        listMonsters.push(newMonsterBlue);

    }
    if(monsterOrange.checked){
        randomMonster2= Math.round(Math.random()*3);
        if(monsterBlue.checked){
            while(randomMonster2===randomMonster1){
                randomMonster2= Math.round(Math.random()*3);
            }
        }
        let newMonsterOrange = {};
        newMonsterOrange.color = "orange";
        newMonsterOrange.pos = randomMonster2;
        listMonsters.push(newMonsterOrange);
    }
    if(monsterGreen.checked){
        randomMonster3= Math.round(Math.random()*3);
        if(monsterBlue.checked & monsterOrange.checked){
            while(randomMonster3===randomMonster1 || randomMonster3===randomMonster2){
                randomMonster3= Math.round(Math.random()*3);
            }
        }else if(monsterBlue.checked){
            while(randomMonster3===randomMonster1){
                randomMonster3= Math.round(Math.random()*3);
            }
        }else if(monsterOrange.checked){
            while(randomMonster3===randomMonster2){
                randomMonster3= Math.round(Math.random()*3);
            }
        }
        let newMonsterGreen = {};
        newMonsterGreen.color = "green";
        newMonsterGreen.pos = randomMonster3;
        listMonsters.push(newMonsterGreen);
    }
    if(monsterRed.checked){
        randomMonster4= Math.round(Math.random()*3);
        if(monsterBlue.checked & monsterOrange.checked & monsterGreen.checked){
            while(randomMonster4===randomMonster1 || randomMonster4===randomMonster2|| randomMonster4===randomMonster3){
                randomMonster4= Math.round(Math.random()*3);
            }
        }else if(monsterBlue.checked & monsterOrange.checked){
            while(randomMonster4===randomMonster1 || randomMonster4===randomMonster2){
                randomMonster4= Math.round(Math.random()*3);
            }
        }else if(monsterGreen.checked & monsterOrange.checked){
            while(randomMonster4===randomMonster3 || randomMonster4===randomMonster2){
                randomMonster4= Math.round(Math.random()*3);
            }
        }else if(monsterBlue.checked & monsterGreen.checked){
            while(randomMonster4===randomMonster1 || randomMonster4===randomMonster3){
                randomMonster4= Math.round(Math.random()*3);
            }
        }else if(monsterBlue.checked){
            while(randomMonster4===randomMonster1){
                randomMonster4= Math.round(Math.random()*3);
            }
        }else if(monsterOrange.checked){
            while(randomMonster4===randomMonster2){
                randomMonster4= Math.round(Math.random()*3);
            }
        }else if(monsterGreen.checked){
            while(randomMonster4===randomMonster3){
                randomMonster4= Math.round(Math.random()*3);
            }
        }
        let newMonsterRed = {};
        newMonsterRed.color ="red";
        newMonsterRed.pos = randomMonster4;
        listMonsters.push(newMonsterRed);
    }
}

function upPress(event) {
    keyUp=event.keyCode;
}

function rightPress(event) {
    keyRight = event.keyCode;
}

function downPress(event) {
    keyDown = event.keyCode;
}

function leftPress(event) {
    keyLeft =event.keyCode;
}