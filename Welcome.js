//var script;
var listOfPlayers;
var player;
//listOfPlayers = {};
//
// var map = new Map();
// //map.set('userName', 'p');
// map.set('password', 'p');
// map.set('fullName', 'ppp ppp');
// map.set('email', 'pp@gmail.com');
// map.set('birthDate', '12-04-2020');

var player = {userName:"p",password:"p",fullName:"ppp ppp",email:"pp@gmail.com",birthDate:"12-04-2020"};


// Disable the button on initial page load

function validationLogIn(userNameLogIn, passwordLogIn) {




    // for (var x in listOfPlayers) {
    //     alert('key ' + x);
    //     alert('Values: ');
    //     var value = listOfPlayers[x];
    //     for (var y in value) {
    //         alert('—- ' + y + ':' + value[y]);
    //     }
    //     alert('\n');
    // }
    // if(userNameLogIn.toString().localeCompare("p")){
    //     alert("ssdfsdf");
    // }else{
    //     alert("banana");
    // }

    return false;

}

// $(function () {
//     $('#submitReg').onkeyup(function () {
//         if ($(this).val() === '') {
//             $('.submitClassReg').prop('disabled', true);
//         } else {
//             $('.submitClassReg').prop('disabled', false);
//         }
//     });
// });

function validation() {
    //$("input[type=submit]").attr("disabled", "disabled");



    // $("#submitReg").validate({
    //     rules: {
    //         userNameReg: {
    //             required: true,
    //             minLength:1
    //         },
    //         passwordReg: {
    //             required: true,
    //             minLength:6
    //         },
    //         fullNameReg: {
    //             required: true,
    //             minLength:1
    //         },
    //         emailReg: {
    //             required: true,
    //             email: true
    //         },
    //         birthDateReg: {
    //             required: true,
    //             minLength:1
    //         },
    //     },});



        $( "#submitReg" ).prop("disabled", true);
        if (required() & checkpassword() & checkFullName() & checkEmail() & checkDate()) {

            $(document).ready(function () {

                $("#formReg").submit(function (e) {

                    //stop submitting the form to see the disabled button effect
                    e.preventDefault();

                    //disable the submit button
                    $("#submitReg").attr("disabled", false);

                    return true;

                })});


            alert("yay");
            return true;
        }else{
            $("#submitReg").attr("disabled", true);
            alert("sad");
            return false;
        }

   // $( "#submitReg" ).onclick( "disabled", false );
  //  document.getElementById("#submitReg").disable=false;
  //   $( "#submitReg" ).prop("disabled", true);
  //   if (required() & checkpassword() & checkFullName() & checkEmail() & checkDate()) {
  //     //  document.getElementById("#submitReg").disable=false;
  //       $( "#submitReg" ).prop("disabled", false);
  //       alert("yay");
  //       return true;
  //   }else{
  //      // document.getElementById("#submitReg").disable=true;
  //       $( "#submitReg" ).prop("disabled", true);
  //       alert("sad");
  //       return false;
  //   }
    //

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
    document.getElementById(shown).style.display = 'block';
    document.getElementById(hidden).style.display = 'none';

    //   return true;
}

function showMenu(shown) {
    document.getElementById(shown).style.display = 'block';
    //  return true;

}

function showMenus(shown, hidden1, hidden2, hidden3) {
    showMenu(shown);
    document.getElementById(hidden1).style.display = 'none';
    document.getElementById(hidden2).style.display = 'none';
    document.getElementById(hidden3).style.display = 'none';

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