var modal = document.getElementById("aboutSection");

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
    document.getElementById("aboutSection").close();
   // showMenuWelcome();
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("aboutSection").close();
      //  showMenuWelcome();
    }
}


function showModal(){
    if (!$('#aboutSection').is(':visible')) {
        document.getElementById("aboutSection").close();
    }else{
        document.getElementById("aboutSection").showModal();
    }

}


function closeAbout(){
   // $('#aboutSection').dialog("close");
     document.getElementById("aboutSection").close();
    showMenuWelcome();
}
