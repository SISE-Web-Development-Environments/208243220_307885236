var listOfPlayers;
var player = {userName: "p", password: "p", fullName: "ppp ppp", email: "pp@gmail.com", birthDate: "12-04-2020"};

listOfPlayers = [player];


function validationLogIn() {
    //userNameLogIn, passwordLogIn
    let keyUserName;//userName
    let valueUserName;
    let keyPassword;//password
    let valuePassword;


    for (var playerToPush in listOfPlayers) {
        let details = listOfPlayers[playerToPush];
        keyUserName = Object.keys(details)[0];
        valueUserName = details[keyUserName];
        keyPassword = Object.keys(details)[1];//password
        valuePassword = details[keyPassword];

        if (valueUserName === $('#userNameLogIn').val() & valuePassword === $('#passwordLogIn').val()) {
            // alert("yes");
            return show('settings', 'login');
        }
    }

    alert("Wrong user name or password, try again!");
    return false;

}

function validation() {

    if (required() & checkpassword() & checkFullName() & checkEmail() & checkDate()) {

        var exist = false;
        for (var playerToPush in listOfPlayers) {
            let details = listOfPlayers[playerToPush];
            keyUserName = Object.keys(details)[0];
            valueUserName = details[keyUserName];
            keyPassword = Object.keys(details)[1];//password
            valuePassword = details[keyPassword];

            if (!exist && valueUserName === $('#userNameReg').val()) {
                alert("This user name already exist");
                exist = true;
            }

        }
        if (!exist) {
            //adding new player to system
            let newPlayer = {};
            newPlayer.userName = $('#userNameReg').val();
            newPlayer.password = $('#passwordReg').val();
            newPlayer.fullName = $('#fullNameReg').val();
            newPlayer.email = $('#emailReg').val();
            newPlayer.birthDate = $('#birthDate').val();
            listOfPlayers.push(newPlayer);
            alert("Your register complete successfully");
            //  $('#submitReg').reset();


            return show('welcome', 'register');
        }

    } else {
        return false;

    }
}

//check password
function checkpassword() {
    let number = /([0-9])/;
    let alphabets = /([a-zA-Z])/;
    if ($('#passwordReg').val().length > 5 && $('#passwordReg').val().match(number) && $('#passwordReg').val().match(alphabets)) {
        // alert("yay");
        return true;
    } else {
        alert("Your password is not valid- you need to enter at least 6 characters include one number and one letter");
        return false;
    }
}

//check email
function checkEmail() {
    {
        var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if ($('#emailReg').val().match(mailFormat)) {
            //alert("YesMail");
            return true;
        } else {
            alert("Your email is not valid");
            return false;
        }
    }
}

//check full name
function checkFullName() {
    //fullNameReg
    let name = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
    if ($('#fullNameReg').val().match(name)) {
        // alert("YesFullName");
        return true;
    } else {
        alert("Your Full Name not contains two words");
        return false;
    }
}

//check user name
function required() {
    if ($('#userNameReg').val().length === 0) {
        alert("Your username is not valid");
        return false;
    } else {
        //alert("yesUser");
        return true;
    }

}

//check birthdate
function checkDate() {
    // if ($('#birthDate').val().length === 0) {
    //     alert("birthNo");
    //     return false;
    // }
    // // alert("birthYes");
    return true;
}

function show(shown, hidden) {
    // $('#form-popUp').reset();

    document.getElementById(shown).style.display = 'block';
    document.getElementById(hidden).style.display = 'none';

    if (!shown.toString().anchor('game')) {
        document.getElementById("formReg").reset();
        document.getElementById("formLogIn").reset();
    }

}

function showMenu(shown) {
    document.getElementById(shown).style.display = 'block';
}

function showMenus(shown, hidden1, hidden2, hidden3) {
    showMenu(shown);
    document.getElementById(hidden1).style.display = 'none';
    document.getElementById(hidden2).style.display = 'none';
    document.getElementById(hidden3).style.display = 'none';
    document.getElementById("settings").style.display = 'none';

    if (shown.toString().anchor('primary')) {
        document.getElementById('primary').style.display = 'none';
    }
}


function mouseoverPassLogIn() {
    var obj = document.getElementById('passwordLogIn');
    obj.type = "text";
}

function mouseoutPassLogIn() {
    var obj = document.getElementById('passwordLogIn');
    obj.type = "password";
}

function mouseoverPassReg() {
    var obj = document.getElementById('passwordReg');
    obj.type = "text";
}

function mouseoutPassReg() {
    var obj = document.getElementById('passwordReg');
    obj.type = "password";
}

