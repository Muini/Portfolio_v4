//Portfolio Controller
var portfolio = {
    
    init: function(){
        //D'abord l'audio puis la video
        audio.init();
        video.init();
    },
    
    resize: function(){
       
    }
    
}
//Video Controller
var video = {
    
    it: null,
    
    init: function(){
        this.it = document.getElementsByTagName('video')[0];
        this.it.currentTime = 0;
        this.it.addEventListener('timeupdate',this.maj_bar);
        this.maj_bar();
        this.resize();
        this.it.volume = 0.8;
        
        var it = this;
        //Son
        $('.toggle_sound').on('click',function(){ 
            $(this).toggleClass('icon-volume-up-1').toggleClass('icon-volume-off-1');
            it.toggleSound(); //On toggle le son
        });
    },
    
    video_duree:  function(){ return parseFloat(this.it.duration); },
    
    current_time: function(){ return this.it.currentTime; },
    
    maj_bar: function(){
        var percent = (parseFloat(this.currentTime)/this.video_duree)*100;
        document.getElementById('progressBar').style.width = percent+"%";
    },
    
    resize: function(){
        //console.log(video.it.offsetWidth+"x"+video.it.offsetHeight);
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
    },
    
    toggleSound: function(){
        if(!this.it.muted){
            audio.muteMusic();
        }
        this.it.muted = !this.it.muted;
    }
    
}
//Audio Controller
var audio = {
    
    music: null,
    
    init: function(){
        this.music = document.getElementById('music');
        this.music.pause();
        this.music.currentTime = 0;
        this.music.volume = 0.6;
        
        var btns_music = document.querySelectorAll('.btn_music');
        for(var i=0; i<btns_music.length; i++)
        {
            var it = this;
            btns_music[i].onclick = function(){
                it.playMusic(this.getAttribute('data-music'));
            }
        }
    },
    
    muteMusic: function(){
        this.music.pause();
        this.music.currentTime = 0;
    },
    
    playMusic: function(src){
        if(video.it.muted)
            video.it.muted = false;
        this.music.src = src;
        this.music.currentTime = 0;
        this.music.play();
    },
    
}

//Disable le scroll
//window.addEventListener('DOMMouseScroll', function(e){preventDefault(e);}, false);


window.onresize = function(){ 
    portfolio.resize(); 
};

//Initialisation du site
portfolio.init();








