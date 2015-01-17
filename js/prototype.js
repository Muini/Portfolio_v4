
var video_bg = $('#video_bg');
var main_pP = $('#main_playPause');

var la_video = document.getElementsByTagName('video')[0];

//Disable le scroll
//window.addEventListener('DOMMouseScroll', function(e){preventDefault(e);}, false);

//Initialisation de la vidéo
la_video.currentTime = 0;
var video_duree = parseFloat(la_video.duration);
la_video.addEventListener('timeupdate',mas_progressBar);

mas_progressBar();

//Son
$('.toggle_sound').on('click',function(){ 
                                            $(this).toggleClass('icon-volume-up-1').toggleClass('icon-volume-off-1');
                                            la_video.muted=!la_video.muted; //On toggle le son
                                        });

//Mise à jour de la barre de progression + chapitre en cours
function mas_progressBar(){
    var position = (parseFloat(la_video.currentTime)/video_duree)*100;
    $('#progressBar').width(position+'%');
}















