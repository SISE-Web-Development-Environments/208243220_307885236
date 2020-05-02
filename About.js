var modal = document.getElementById('aboutSection');

// Get the button that opens the modal
var btn = document.getElementById("aboutMenu");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display='block';
}

span.onclick = function() {
    modal.style.display='none';
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

window.onkeydown = function( event ){
    // ESCAPE key pressed
    if ( event.keyCode === 27) {
        modal.style.display='none';
    }
};

function showModal(){
    if (!$('#aboutSection').is(':visible')) {
        modal.style.display='none';
    }else{
        modal.style.display='block';
    }

}
