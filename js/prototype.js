//=====================================================================================
// Hey there, welcome to the dark face of my portfolio,
// You can check my code if you want, it's just some function
// I'm using GSAP for animations and the rest is native js
// If you still have a question : corentin.flach(at)gmail.com
//=====================================================================================


//==========================================
// Portfolio Controller
//==========================================
var portfolio = {
    
    pages: null,
    
    first_launch: true,
    
    canNavigate: true,
    
    init: function(){
        
        //Audio then Video
        audio.init();
        video.init();
        
        //Pages init
        this.navProgress.init();
        this.pages = document.querySelectorAll('.page');
        for(var i=0; i<this.pages.length; i++)
        {
            var pageName = this.pages[i].getAttribute('id');
            pageName = pageName.split('_')[1];
            this.navProgress.addStep(pageName);
        }
        
        //Rooting
        if( this.getUrl() == undefined || this.getUrl() == "" || this.getUrl()=="home" ){
            this.goTo("home");
        }else{
            this.goTo(this.getUrl());
        }
        
    },
    
    resize: function(){
        video.resize();
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
    
    //Navigation core
    goTo: function(name){
        
        var it = this;
        
        if(this.canNavigate)
        {
            it.canNavigate = false;

            var current_page = document.querySelector('.active_page');
            var page_togo = document.getElementById('page_'+name);
            
            if(current_page){
                it.animation(current_page,true,getPage);
            }else{
                getPage();
            }

            //Function created for callback
            function getPage(){

                if(current_page)
                    current_page.className = "page hidden";

                if(page_togo){
                    page_togo.className = "page active_page";
                }else{
                    console.log("404 - Not found");
                    it.goTo('home');
                    name = "";
                }
                
                it.setUrl(name);

                it.navProgress.setCurrentStep(name);

                if(!page_togo.hasAttribute("data-loaded"))
                {            
                    var url = window.location;
                    url = url.toString().split("#/")[0];

                    //Put Loader
                    page_togo.innerHTML = "<img class='loader' src='"+url+"img/loader.gif' alt='Loading' />";            

                    url += "/pages/"+name+".php";

                    it.ajaxGet( url, function(data){

                        page_togo.style.opacity = 0;
                        page_togo.innerHTML = data;

                        page_togo.setAttribute("data-loaded","");

                        if(it.first_launch){
                            setTimeout(function(){
                                TweenMax.to(document.getElementById('beforeLoad'),2,{opacity:0,onComplete:function(){
                                    document.getElementById('beforeLoad').style.display = "none";
                                    it.animation(page_togo,false,function(){
                                        it.canNavigate = true;
                                    });
                                }});
                                it.first_launch = false;
                            },1000);
                        }else{
                            it.animation(page_togo,false,function(){
                                it.canNavigate = true;
                            });
                        }

                    });

                }else{
                    it.animation(page_togo,false,function(){
                        it.canNavigate = true;
                    });
                }
            }
        }
        
    },
    
    animation: function(elem, out, callback){
        if(out){
            TweenMax.to(elem,.3,{opacity:0,onComplete:callback});
        }else{
            TweenMax.to(elem,1,{opacity:1,onComplete:callback});
        }
    },
    
    //Rooting stuff
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
    
    //Ajax custom function, thanks to Pierre Guilhou
    ajaxGet:function(url, callback){
        
        var xmlhttp = window.XMLHttpRequest
          ? new XMLHttpRequest()
          : new ActiveXObject('Microsoft.XMLHTTP');
        
        var loader_bar = document.getElementById('loaderAjax');
        
        TweenMax.to(loader_bar,0,{opacity:1,width:0});

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                TweenMax.to(loader_bar,1,{opacity:0});
                callback(xmlhttp.responseText);
            }
        };
        xmlhttp.onprogress = function(e){
            if (xmlhttp.readyState > 2)
            {
                var totalBytes  = xmlhttp.getResponseHeader('Content-length');
                var dlBytes = xmlhttp.responseText.length;
                if(totalBytes > 0)
                {
                    var percent = (Math.round ((dlBytes / totalBytes) * 100) + "%");
                    TweenMax.to(loader_bar,0.3,{width:percent});
                }
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xmlhttp.send('');
        
    },
    
    //Little navigation progress on the bottom left
    navProgress: {
        
        it: null,
        
        nbr_steps: 0,
        
        init: function(){
            this.it = document.getElementById('navProgress');
        },
        
        addStep: function(name){
            var newStep = document.createElement('a');
            newStep.setAttribute('data-link',name);
            newStep.setAttribute('class','navProgress_step');
            newStep.innerHTML = '▼';
            newStep.onclick = function(){
                portfolio.goTo(this.getAttribute('data-link'));   
            }
            this.it.appendChild(newStep);
            this.nbr_steps ++;
        },
        
        setCurrentStep: function(str){
            var progressBar = document.getElementById('navProgress_bar');
            var steps = this.it.getElementsByTagName('a');
            for(var i=0; i<steps.length; i++)
            {
                if( steps[i].getAttribute('data-link') == str )
                {
                    steps[i].className = 'navProgress_step active_step';
                    progressBar.style.height = (i*(100/steps.length))+"%";
                }else{
                    steps[i].className = 'navProgress_step';
                }
            }
        }
        
    },
    
}

//==========================================
// Video Controller
//==========================================

var video = {
    
    it: null,
    
    init: function(){        
        this.it = document.getElementById("video_bg");
        this.it.pause();
        this.it.addEventListener('timeupdate',this.maj_bar);
        this.resize();
        
        var it = this;
        
        var loader_bar = document.getElementById('loaderVid');
        
        TweenMax.to(loader_bar,0,{opacity:1,width:0});
        
//        this.it.onprogress = function(e){
//            var buffer = it.getPercentBuffered();
//            
//            if( buffer >= 100 ){
//                TweenMax.to(loader_bar,1,{opacity:0,width:"100%"});
//            }else if(buffer > 0){
//                TweenMax.to(loader_bar,0.3,{width:buffer+"%"});
//            }
//        }
        
        this.it.oncanplay = function(){
            this.currentTime = 0;
            it.maj_bar();
            this.volume = 0.8;
            this.play();
        }
        
        //Son
        document.querySelector('.toggle_sound').onclick = function(){
            this.className = "icon-signal toggle_sound"; //Changement d'icone
            it.toggleSound(); //On toggle le son
        }
        
    },
    
    //Actual timeline on the bottom
    maj_bar: function(){
        
        var percent = (parseFloat(this.currentTime)/this.duration)*100;
        document.getElementById('progressBar').style.width = percent+"%";
        
    },
    
    //Need to fit on every screen, CSS cover isn't enough, respect the ratio (16:9)
    resize: function(){
        
        //console.log(video.it.offsetWidth+"x"+video.it.offsetHeight);
        if( (window.innerWidth/window.innerHeight)>1.77 )
        {
            //Width higher
            this.it.style.width = window.innerWidth+"px";
            this.it.style.height = window.innerWidth/1.77+"px";
        }else{
            //Height higher
            this.it.style.height = window.innerHeight+"px";
            this.it.style.width = window.innerHeight*1.77+"px";
        }

        this.it.style.marginLeft = -(this.it.offsetWidth/2)+"px";
        this.it.style.marginTop = -(this.it.offsetHeight/2)+"px";
        
    },
    
    toggleSound: function(){
        
        if(!this.it.muted){
            audio.muteMusic();
        }
        this.it.muted = !this.it.muted;
        
    },
    
    getPercentBuffered: function(){
        return parseInt((this.it.buffered.end(0) / this.it.duration)*100);
    }
    
}

//==========================================
// Audio Controller
//==========================================

var audio = {
    
    //The music you choose
    music: null,
    
    //Every hover sound is just one player
    hover: null,
    
    init: function(){
        
        this.music = document.getElementById('music');
        this.music.pause();
        this.music.volume = 0.6;
        
        this.hover = document.getElementById('hover_sound');
        this.hover.pause();
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

//==========================================
// Bonhomme Controller
//==========================================

var bonhomme = {
    
}

//==========================================
// Initialization
//==========================================

window.onresize = function(){ 
    portfolio.resize(); 
};

//Initialization of the website
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

//Keyboard command for navigation
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





