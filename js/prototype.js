//=========================================================================================
// Hey there, welcome to the dark face of my portfolio,
// You can check my code if you want, it's just some weird functions
// I'm using GSAP for animations, D3JS for the tree of skills and the rest is native javascript
// If you still have a question : corentin.flach(at)gmail.com I doesn't bite... or maybe
//=========================================================================================


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
        
        //Routing
        if( this.getUrl() == undefined || this.getUrl() == "" || this.getUrl()=="home" ){
            this.goTo("home");
        }else{
            this.goTo(this.getUrl());
        }
        
    },
    
    resize: function(){
        //Video always need to be perfect
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
            
            //If first launch init first animations
            if( it.first_launch )
            {
                var navProgress = document.getElementById('navProgress');
                var controls = document.querySelectorAll('#controls>a');

                TweenMax.to(navProgress,0,{x:"-90px"});
                TweenMax.to(controls,0,{y:"60px"});
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
                //Change route
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
                        
                        //We get our content \o/
                        page_togo.style.opacity = 0;
                        page_togo.innerHTML = data;
                        page_togo.setAttribute("data-loaded","");

                        if(it.first_launch){
                            //Delete de beforeLoad then draw the page then UI elements
                            setTimeout(function(){
                                
                                TweenMax.to(document.getElementById('beforeLoad'),1,{opacity:0,onComplete:function(){
                                    document.getElementById('beforeLoad').style.display = "none";
                                    it.animation(page_togo,false,function(){
                                        it.canNavigate = true;
                                        it.first_launch = false;
                                        
                                        TweenMax.to(navProgress,0.6,{x:0});
                                        TweenMax.staggerTo(controls,0.6,{y:0, ease:Elastic.easeOut},0.05);
                                        
                                        //Specific page script
                                        if(name == "skills")
                                            portfolio.treeOfSkills.init();
                                    });
                                }});
                                
                            },1000);
                            
                        }else{
                            //Just draw the page
                            it.animation(page_togo,false,function(){
                                it.canNavigate = true;
                            });
                        }

                    });

                }else{
                    //We already load the content, just draw it
                    it.animation(page_togo,false,function(){
                        it.canNavigate = true;
                    });
                }
            }
            
            if(current_page){
                it.animation(current_page,true,getPage);
            }else{
                getPage();
            }

        }
        
    },
    
    animation: function(elem, out, callback){
        
        if(out){
            //Define Out animation
            TweenMax.to(elem,.3,{opacity:0,onComplete:callback});
        }else{
            //Define In animation
            TweenMax.to(elem,1,{opacity:1,onComplete:callback});
        }
        
    },
    
    //Routing stuff
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
        
        //It's important to get a correct page title
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
                //We get it ? Callback !
                TweenMax.to(loader_bar,1,{opacity:0});
                callback(xmlhttp.responseText);
            }
        };
        xmlhttp.onprogress = function(e){
            //Custom add for having the state of loading for making a progress bar
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
    
    //Little (menu) navigation progress on the bottom left
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
    
    treeOfSkills: {

        //Tree of Skills with D3JS
        w: 0,
        h: 0,
        node: null,
        link: null,
        root: null,
        force: null,
        vis: null,
        nodes: null,
        links: null,

        init: function(){
            
            var it = this;
            
            it.w = document.getElementById('tree_of_skills').offsetWidth;
            it.h = window.innerHeight/2;
            
            it.force = d3.layout.force()
            .on("tick", this.tick)
            .charge(function(d) { return d._children ? -d.size / 100 : -30; })
            .linkDistance(function(d) { return d.target._children ? 80 : 30; })
            .size([this.w, this.h - 160]);
            
            it.vis = d3.select("#tree_of_skills").append("svg:svg")
            .attr("width", this.w)
            .attr("height", this.h);
            
            d3.json("data/skills.json", function(json) {
              it.root = json;
              it.root.fixed = true;
              it.root.x = it.w / 2;
              it.root.y = it.h / 2 - 80;
              it.update();
            });
            
        },

        update: function() {
            
            var it = this;
            
            it.nodes = it.flatten(it.root);
            it.links = d3.layout.tree().links(it.nodes);

            // Restart the force layout.
            it.force
              .nodes(it.nodes)
              .links(it.links)
              .start();

            // Update the links…
            it.link = it.vis.selectAll("line.link")
              .data(it.links, function(d) { return d.target.id; });

            // Enter any new links.
            it.link.enter().insert("svg:line", ".node")
              .attr("class", "link")
              .attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

            // Exit any old links.
            it.link.exit().remove();

            // Update the nodes…
            it.node = it.vis.selectAll("circle.node")
              .data(it.nodes, function(d) { return d.id; })
              .style("fill", it.color);

            it.node.transition()
              .attr("r", function(d) { return d.children ? 4.5 : Math.sqrt(d.size) / 10; });

            // Enter any new nodes.
            it.node.enter().append("path")
              .attr("class", "node")
              .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
              //.attr("r", function(d) { return d.children ? 4.5 : Math.sqrt(d.size) / 10; })
              .attr("d", d3.svg.symbol().size(function(d) { return d.size/100; }).type("triangle-up"))
              //.style("fill", color)
              .on("click", it.click)
              .call(it.force.drag);

            // Exit any old nodes.
            it.node.exit().remove();
            
        },

        tick: function() {
            
            var it = portfolio.treeOfSkills;
            
            it.link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });
            
            it.node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
            
        },

        color: function(d) {
            
            return d._children ? "#333333" : d.children ? "#111111" : "#333333";
            
        },

        // Toggle children on click.
        click: function(d) {
            
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            //portfolio.treeOfSkills.update();
        },

        // Returns a list of all nodes under the root.
        flatten: function(root) {
            
            var nodes = [], i = 0;

            function recurse(node) {
                if (node.children) node.size = node.children.reduce(function(p, v) { return p + recurse(v); }, 0);
                if (!node.id) node.id = ++i;
                nodes.push(node);
                return node.size;
            }

            root.size = recurse(root);
            return nodes;
            
        }

    }
    
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
        
        var ratio = 1.77;
        //console.log(video.it.offsetWidth+"x"+video.it.offsetHeight);
        if( (window.innerWidth/window.innerHeight)>ratio )
        {
            //Width higher
            this.it.style.width = window.innerWidth+"px";
            this.it.style.height = window.innerWidth/ratio+"px";
        }else{
            //Height higher
            this.it.style.height = window.innerHeight+"px";
            this.it.style.width = window.innerHeight*ratio+"px";
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





