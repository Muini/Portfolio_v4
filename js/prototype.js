//Portfolio Controller
var portfolio = {
    
    pages: null,
    
    canNavigate: false,
    
    init: function(){
        
        //D'abord l'audio puis la video
        audio.init();
        video.init();
        
        this.pages = document.querySelectorAll('.page');
        
        //Rooting
        if(this.getUrl() == undefined || this.getUrl() == ""){
            //FIRST_LAUNCH = true;
            this.setUrl("");
            this.canNavigate = true;
        }else{
            this.goTo(this.getUrl());
        }
        
    },
    
    resize: function(){

    },
    
    nextPage: function(){
        
        var index = 0;
        //Get the index of the current page to get the next page
        for(var i=0; i<this.pages.length; i++)
        {
            if(this.pages[i].className.match(/active_page/))
                index = i;
        }

        var nextPage;
        
        if(index == this.pages.length-1)
            nextPage = this.pages[0].getAttribute('id');
        else
            nextPage = this.pages[index+1].getAttribute('id');
        
        nextPage = nextPage.split("_")[1];
        
        this.goTo(nextPage);
        
    },
    
    previousPage: function(){

        var index = 0;
        //Get the index of the current page to get the next page
        for(var i=0; i<this.pages.length; i++)
        {
            if(this.pages[i].className.match(/active_page/))
                index = i;
        }

        var previousPage;
        
        if(index == 0)
            previousPage = this.pages[this.pages.length-1].getAttribute('id');
        else
            previousPage = this.pages[index-1].getAttribute('id');
        
        previousPage = previousPage.split("_")[1];
        
        this.goTo(previousPage);
        
    },
    
    goTo: function(name){
        
        var it = this;
        
        this.canNavigate = false;
        
        var current_page = document.querySelector('.active_page');
        if(current_page)
            current_page.className = "page hidden";
        
        var page_togo = document.getElementById('page_'+name);
        if(page_togo){
            page_togo.className = "page active_page";
        }else{
            console.log("404 - Not found");
            this.goTo('home');
            name = "";
        }
        
        this.setUrl(name);
        
        if(!page_togo.hasAttribute("data-loaded"))
        {            
            var url = window.location;
            url = url.toString().split("#/")[0];
            
            //Put Loader
            page_togo.innerHTML = "<img class='loader' src='"+url+"img/loader.gif' alt='Loading' />";            
            
            url += "/pages/"+name+".php";
            
            this.ajaxGet( url, function(data){

                page_togo.innerHTML = data;
                
                page_togo.setAttribute("data-loaded","");
                it.canNavigate = true;
            
            });

        }else{
            it.canNavigate = true;
        }
        
    },
    
    setUrl: function(str){
        
        var url = window.location;
        url = url.toString().split("#/");
        if(str == "home")
            window.location = url[0] + "#/";
        else
            window.location = url[0] + "#/" + str;
        this.setTitle(str);
        
    },
    
    getUrl: function(){
        
        var url = window.location;
        url = url.toString().split("#/");
        return url[1]; 
        
    },
    
    setTitle:function(str){
        
        if(str == "" || str == "home" ){
            document.title = "Corentin Flach - Storyteller";
        }else{
            str = str.charAt(0).toUpperCase() + str.slice(1);
            document.title = "Corentin Flach - "+str;
        }
        
    },
    
    ajaxGet:function(url, callback){
        
        var xmlhttp = window.XMLHttpRequest
          ? new XMLHttpRequest()
          : new ActiveXObject('Microsoft.XMLHTTP');

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                console.log("Ajax success");
                callback(xmlhttp.responseText);
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xmlhttp.send('');
        
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
        
        //Son
        var it = this;
        document.querySelector('.toggle_sound').onclick = function(){
            this.className = "icon-signal toggle_sound"; //Changement d'icone
            it.toggleSound(); //On toggle le son
        }
        
    },
    
    maj_bar: function(){
        
        var percent = (parseFloat(this.currentTime)/this.duration)*100;
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
    
    hover: null,
    
    init: function(){
        
        this.music = document.getElementById('music');
        this.music.pause();
//        this.music.currentTime = 0;
        this.music.volume = 0.6;
        
        this.hover = document.getElementById('hover_sound');
        this.hover.pause();
//        this.hover.currentTime = 0;
        this.hover.volume = 0.4;
        
        var btns_music = document.querySelectorAll('.btn_music');
        for(var i=0; i<btns_music.length; i++)
        {
            var it = this;
            btns_music[i].onclick = function(){
                it.playMusic(this.getAttribute('data-music'));
            }
        }
        
        var hover_sound = document.querySelectorAll('.hover_sound');
        for(var i=0; i<hover_sound.length; i++)
        {
            var it = this;
            hover_sound[i].onmouseover = function(){
                it.playHover(this.getAttribute('data-hover-sound'));
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
    
    playHover: function(src){
        
        if(!video.it.muted)
        {
            this.hover.src = src;
            this.hover.currentTime = 0;
            this.hover.play();
        }
        
    }
    
}

//Disable le scroll
//window.addEventListener('DOMMouseScroll', function(e){preventDefault(e);}, false);

window.onresize = function(){ 
    portfolio.resize(); 
};

//Initialisation du site
portfolio.init();

//Overwrite Scroll
window.onscroll = window.onmousewheel = document.onscroll = document.onmousewheel = window.ontouchmove = function(){
    return false;
};
window.addEventListener("mousewheel",scroll,false);
window.addEventListener("DOMMouseScroll",scroll,false);

function scroll(e) {
    
    if(portfolio.canNavigate)
    {
        //Magic formula
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        if(delta>0)
        {
            portfolio.previousPage();
        }else{
            portfolio.nextPage();
        }
    }
    
    return false;
}

this.onkeydown = function(e){
    
    e=e || window.event;
    var code=e.keyCode || e.which;	
    //Haut
    if (code==38){
        portfolio.previousPage();
        return false;
    }
    //Bas
    if (code==40){
        portfolio.nextPage();
        return false;
    }
}





