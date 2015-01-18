
var portfolio = {
    init: function(){
        
    },
    resize: function(){
       
    }
}
var video = {
    
    it: null,
    
    init: function(){
        this.it = document.getElementsByTagName('video')[0];
        this.it.currentTime = 0;
        this.it.addEventListener('timeupdate',this.maj_bar);
        this.maj_bar();
        this.resize();
    },
    
    video_duree:  function(){ return parseFloat(this.it.duration); },
    
    current_time: function(){ return this.it.currentTime; },
    
    maj_bar: function(){
        var percent = (parseFloat(this.currentTime)/this.video_duree)*100;
        document.getElementById('progressBar').style.width = percent+"%";
    },
    
    resize: function(){
        console.log(video.it.offsetWidth+"x"+video.it.offsetHeight);
        if( (window.innerWidth/window.innerHeight)>1.77 )
        {
            //Width plus grand
            this.it.style.width = window.innerWidth+"px";
        }else{
            //Height plus grand
            this.it.style.height = window.innerHeight+"px";
        }
        this.it.style.marginLeft = -this.it.offsetWidth/2+"px";
        this.it.style.marginTop = -this.it.offsetHeight/2+"px";
    }
    
}

//Disable le scroll
//window.addEventListener('DOMMouseScroll', function(e){preventDefault(e);}, false);

//Initialisation de la vidéo
video.init();

//Son
$('.toggle_sound').on('click',function(){ 
    $(this).toggleClass('icon-volume-up-1').toggleClass('icon-volume-off-1');
    video.it.muted=!video.it.muted; //On toggle le son
});


window.onresize = function(){ 
    portfolio.resize(); 
    video.resize();
};










