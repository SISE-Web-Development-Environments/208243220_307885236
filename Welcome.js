var listOfPlayers;
var player = {userName: "p", password: "p", fullName: "ppp ppp", email: "pp@gmail.com", birthDate: "12-04-2020"};

listOfPlayers = [player];

/****************************************validation*********************************************/
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

                return showMenuSettings();
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
            keyMail = Object.keys(details)[3];
            valueMail = details[keyMail];


            if (!exist & (valueUserName === $('#userNameReg').val())) {
                alert("This user name already exist");
                exist = true;
            }
            if (!exist & valueMail === $('#emailReg').val()) {
                alert("This mail already exist");
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


            return showMenuWelcome();
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
    // if ($('#birthDate').getFullYear()>2020 || $('#birthDate').getDate()<1920 ) {
    //     alert("Your year of birthday is not valid");
    //     return false;
    // }
    // alert("birthYes");
    return true;
}

/****************************************ShowAllMenus*********************************************/
function showMenuWelcome() {
    if (document.getElementById("game").style.display === 'block') {
        if (confirm("Do you sure you want to quit?")) {
            document.getElementById("game").style.display = 'none';
            document.getElementById('welcome').style.display = 'block';
        }
    } else {
        document.getElementById('welcome').style.display = 'block';
        hide('settings','register','login','aboutSection');
        document.getElementById("formReg").reset();
        document.getElementById("formLogIn").reset();
    }

}

function showMenuRegister() {
    if (document.getElementById("game").style.display === 'block') {
        if (confirm("Do you sure you want to quit?")) {
            document.getElementById("game").style.display = 'none';
            document.getElementById('register').style.display = 'block';
        }
    } else {
        document.getElementById('register').style.display = 'block';
        hide('welcome','settings','login','aboutSection');
        document.getElementById("formReg").reset();
        document.getElementById("formLogIn").reset();
    }
}

function showMenuLogin() {
    if (document.getElementById("game").style.display === 'block') {
        if (confirm("Do you sure you want to quit?")) {
            document.getElementById("game").style.display = 'none';
            document.getElementById('login').style.display = 'block';
        }
    } else {
        document.getElementById('login').style.display = 'block';
        hide('welcome','register','settings','aboutSection');
        document.getElementById("formReg").reset();
        document.getElementById("formLogIn").reset();
    }
}

function showMenuAbout() {
    if (document.getElementById("game").style.display === 'block') {
        if (confirm("Do you sure you want to quit?")) {
            document.getElementById("game").style.display = 'none';
            document.getElementById('aboutSection').style.display = 'block';
        }
    } else {
        document.getElementById('aboutSection').style.display = 'block';
        hide('welcome','register','settings','login');
        document.getElementById("formReg").reset();
        document.getElementById("formLogIn").reset();
    }
    showModal();
}

function showPrimary() {
    if (document.getElementById("game").style.display === 'block') {
        if (confirm("Do you sure you want to quit?")) {
            document.getElementById("game").style.display = 'none';
            document.getElementById('aboutSection').style.display = 'block';
        }
    } else {
        document.getElementById('aboutSection').style.display = 'none';
        hide('welcome','register','settings','login');
        document.getElementById("formReg").reset();
        document.getElementById("formLogIn").reset();
    }

}

function showMenuSettings() {
    if (document.getElementById("game").style.display === 'block') {
        if (confirm("Do you sure you want to start new game?")) {
            document.getElementById("game").style.display = 'none';
            document.getElementById('settings').style.display = 'block';
        }
    } else {
        document.getElementById('settings').style.display = 'block';
        hide('welcome','register','login','aboutSection');
    }
}

function showGame() {
    if (document.getElementById("game").style.display === 'block') {
        if (confirm("Do you sure you want to start over?")) {
            document.getElementById("game").style.display = 'none';
            document.getElementById('settings').style.display = 'block';
        }
    } else {
        document.getElementById('game').style.display = 'block';
        hide('welcome','register','login','aboutSection');
        document.getElementById('settings').style.display = 'none';
    }

}

function hide(hidden1,hidden2,hidden3,hidden4){
    document.getElementById(hidden1).style.display = 'none';
    document.getElementById(hidden2).style.display = 'none';
    document.getElementById(hidden3).style.display = 'none';
    document.getElementById(hidden4).style.display = 'none';
}

/****************************************PasswordHelp********************************************/
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

