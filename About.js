
function showModal(){
    document.getElementById("aboutSection").showModal();
}

function closeModal(){
    $(document).keyup(function (e) {
        if (e.keyCode === 27) {
            $("#aboutSection").hide();
            //document.getElementById("aboutSection").close();
        }
    });

   // $("#aboutSection").hide();
   document.getElementById("aboutSection").close();
}



function aboutFunction(shown){
    showModal();
    showMenu(shown);
}

function closeAbout(){
    closeModal();
    show('primary','aboutSection');
}
