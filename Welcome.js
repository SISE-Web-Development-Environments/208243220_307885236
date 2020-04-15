//var script;
var listOfPlayers;
listOfPlayers = {};

listOfPlayers['p'] = {password: 'p', fullName: "pp pp", email: "pp@gmail.com", birthDate: "12-04-2020"};

// function submit(){
//     script="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js";
//
//     // $("submit").prop('required',true);
//     // document.getElementById("submit").onsubmit=checkpassword("password");
//
// }

function validationLogIn(userNameLogIn, passwordLogIn) {
    if (listOfPlayers.contains(userNameLogIn.value)) {
        if (listOfPlayers.getElementById('password').value === passwordLogIn.value) {
            return true;
        }

    }
    return false;
}

function validation(userNameReg, passwordReg, fullNameReg, emailReg, birthDateReg) {

    if (required(userNameReg) && checkpassword(passwordReg) && checkFullName(fullNameReg) && checkEmail(emailReg) && checkDate(birthDateReg)) {
        //insert into list of players
        listOfPlayers[userNameReg.value] = {
            password: passwordReg.value,
            fullName: fullNameReg.value,
            email: emailReg.value,
            birthDate: birthDateReg.value
        };
        // for (var x in listOfPlayers)
        // {
        //     alert('key ' + x);
        //     alert('Values: ');
        //     var value = listOfPlayers[x];
        //     for (var y in value)
        //     {
        //         alert('—- ' + y + ':' + value[y]);
        //     }
        //     alert('\n');
        // }
        return true;
    }
    return false;
}

//check password
function checkpassword(passwordReg) {
    var pass = /^[0-9A-Za-z]\w{5}$/;
    var passNoBigLetters = /^[0-9a-z]\w{5}$/;
    var passNoSmallLetters = /^[0-9A-Z]\w{5}$/;

    if (passwordReg.value.match(pass) || passwordReg.value.match(passNoBigLetters) || passwordReg.value.match(passNoSmallLetters)) {
        //    alert("YesPass");
        return true;
    } else {
        alert("NoPass");
        return false;
    }
}

//check email
function checkEmail(emailReg) {
    {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailReg.value.match(mailformat)) {
            //    alert("YesMail");
            return true;
        } else {
            alert("NoMail");
            return false;
        }
    }
}

//check full name
function checkFullName(fullNameReg) {
    var name = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
    if (fullNameReg.value.match(name)) {
        //  alert("YesFullName");
        return true;
    } else {
        alert("NoFullName");
        return false;
    }
}

//check user name
function required(userNameReg) {
    if (userNameReg.value.length == 0) {
        alert("noUser");
        return false;
    }
    // alert("yesUser");
    return true;
}

//check birthdate
function checkDate(birthDate) {
    if (birthDate.value.length == 0) {
        alert("birthNo");
        return false;
    }
    // alert("birthYes");
    return true;
}

function show(shown, hidden) {
    document.getElementById(shown).style.display='block';
    document.getElementById(hidden).style.display='none';
 //   return true;
}

function showMenu(shown) {
    document.getElementById(shown).style.display='block';
  //  return true;

}

function showMenus(shown,hidden1,hidden2,hidden3){
    showMenu(shown);
    document.getElementById(hidden1).style.display='none';
    document.getElementById(hidden2).style.display='none';
    document.getElementById(hidden3).style.display='none';

    if(shown.toString().anchor('primary')){
        document.getElementById('primary').style.display='none';
    }
}
