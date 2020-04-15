
function showModal(){
    document.getElementById("aboutSection").showModal();
}

function closeModal(){
    document.getElementById("aboutSection").close();


    $(document).keypress(function(e) {
        if (e.keyCode === 27) {
           //closeModal();
           window.close();
           showMenu('primary');
        }
    });


    // $(document).keyup(function (e) {
    //     if (e.keyCode == 27) {
    //
    //         $('#aboutSection').dialog('close')
    //     }
    // });
    // $(document).on('aboutSection', function(ev) {
    //     if (ev.keyCode === 27) {
    //         document.getElementById('aboutSection').remove();
    //     }
    // });



    // $(document).on('aboutSection', function(ev) {
    //     if ($(this).hasClass('you outside box class')) {
    //         ev.preventDefault();
    //     }
    // });
}

function aboutFunction(shown){
    showModal();
    showMenu(shown);
}

function closeAbout(){
    closeModal();
    show('primary','aboutSection');
}