var modal = document.getElementById('aboutSection');

// Get the button that opens the modal
var btn = document.getElementById("aboutMenu");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    document.getElementById('aboutSection').style.display='block';
  //  showPrimary();
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    document.getElementById('aboutSection').style.display='none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        alert("s");
        document.getElementById('aboutSection').style.display='none';
    }
}

window.onkeydown = function( event ){
    // ESCAPE key pressed
    if ( event.keyCode == 27) {
        document.getElementById('aboutSection').style.display='none';
    }
};

function showModal(){
    if (!$('#aboutSection').is(':visible')) {
        document.getElementById('aboutSection').style.display='none';
    }else{
        document.getElementById('aboutSection').style.display='block';
    }

}
