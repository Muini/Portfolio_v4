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
        this.treeOfSkills.resize();
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
                                    });
                                    it.specificPageAction(name);
                                }});
                                
                            },1000);
                            
                        }else{
                            //Just draw the page
                            it.animation(page_togo,false,function(){
                                it.canNavigate = true;
                            });
                            it.specificPageAction(name);
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
    
    //Specific page script
    specificPageAction: function(name){
        
        if(name == "skills")
            portfolio.treeOfSkills.init();
        
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
            
            it.w = window.innerWidth;
            it.h = window.innerHeight;
            
            it.force = d3.layout.force()
            .on("tick", this.tick)
            .charge(function(d) { return -300*it.h/1000; }) //100 : -30
            .linkDistance(function(d) { return 30*it.h/1000; })
            .size([this.w/1.5, this.h/1.2])
            ;
            
            it.vis = d3.select("#tree_of_skills").append("svg")
            .attr("width", this.w)
            .attr("height", this.h);
            
            d3.json("data/skills.json", function(json) {
                it.root = json;
                it.root.fixed = true;
                it.root.x = it.w / 3;
                it.root.y = it.h - 40;
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

            // Update the nodes…
            it.node = it.vis.selectAll(".node")
              .data(it.nodes, function(d) { return d.id; })
              .style("fill", it.color);

            // Enter any new nodes.
            it.node.enter().append("path")
                .attr("class", "node")
                .style("fill", it.color)
                .attr("d", d3.svg.symbol().size(0).type("diamond"))
                .attr("data",function(d){ return d.name; })
                .on("mouseover", it.hover)
                .call(it.force.drag)
                .transition()
                    .delay(function(d,i){ return 600+(40*(it.nodes.length-i)); })
                    .duration(900)
                    .attr("d", d3.svg.symbol().size(function(d) { return d.children ? d.size/50 : d.size/5; }).type("diamond"))
            ;

            // Exit any old nodes.
            it.node.exit().remove();
            
            document.querySelector("#tree_of_skills>svg").lastChild.remove();
            
            var gradient = it.vis.append("svg:defs")
              .append("svg:linearGradient")
                .attr("id", "gradient_line")
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "100%")
                .attr("y2", "100%")
                .attr("spreadMethod", "pad");
            gradient.append("svg:stop")
                .attr("offset", "0%")
                .attr("stop-color", "black")
                .attr("stop-opacity", 0);
            gradient.append("svg:stop")
                .attr("offset", "50%")
                .attr("stop-color", "black")
                .attr("stop-opacity", 0.3);
            gradient.append("svg:stop")
                .attr("offset", "100%")
                .attr("stop-color", "black")
                .attr("stop-opacity", 0);
            
            // Update the links…
            it.link = it.vis.selectAll("line.link")
              .data(it.links, function(d) { return d.target.id; });

            // Enter any new links.
            it.link.enter().insert("line", ".node")
                .attr("class", "link")
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; })
                .attr("opacity", "0")
                //.attr("stroke","url(#gradient_line)")
                .transition()
                    .delay(function(d,i){ return 600+(30*(it.nodes.length-i)); })
                    .duration(600)
                    .attr("opacity", "1")
            ;

            // Exit any old links.
            it.link.exit().remove()
            
        },

        tick: function() {
            
            var it = portfolio.treeOfSkills;
            
            it.link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });
            
            it.node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
            
        },
        
        resize: function(){
            //Need to refresh :/
        },

        color: function(d) {
        
//            var color1 = "hsl(" + ( 100 + Math.random() * 100 ) + ",30%,80%)"; //de 200 à 360
//            //var color1 = "hsl(" + ( 10 + d.size/31 ) + ",60%,70%)"; //de 200 à 360
//            var color2 = "hsl(" + ( 150 + Math.random() * 100 ) + ",20%,40%)"; //de 200 à 360
//            //var color2 = "hsl(" + ( d.size/50 ) + ",60%,70%)"; //de 200 à 360
//            
//            var gradient = portfolio.treeOfSkills.vis.append("svg:defs")
//              .append("svg:linearGradient")
//                .attr("id", "gradient"+d.size)
//                .attr("x1", "0%")
//                .attr("y1", "0%")
//                .attr("x2", "50%")
//                .attr("y2", "100%")
//                .attr("spreadMethod", "pad");
//            gradient.append("svg:stop")
//                .attr("offset", "0%")
//                .attr("stop-color", color2)
//                .attr("stop-opacity", d.children ? 0.2*d.size/6000 : 0.6*d.size/2500 );
//            gradient.append("svg:stop")
//                .attr("offset", "100%")
//                .attr("stop-color", color1)
//                .attr("stop-opacity", d.children ? 0.4*d.size/6000 : 0.9*d.size/2500 );
//            
//            return "url(#gradient"+d.size+")";
            
            var color1 = "hsla(100,0%," + ( 30 + Math.random() * 30 ) + "%, 100)"; //de 200 à 360
            
            return color1;
            
        },

        // Toggle children on click.
        hover: function(d) {
            
            //Draw content            
            document.querySelector("#skills_description>h2").innerHTML = d.name;
            
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
        
        setTimeout(function(){
            it.it.currentTime = 0;
            it.maj_bar();
            it.it.volume = 0.8; //0.8 to change for launching
            it.it.play();
        }, 1000);
        
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

/* CANVAS */

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var hidefCanvasWidth;
var hidefCanvasHeight;

//Init
var settings = {};
settings.displaySizeX = hidefCanvasWidth;
settings.displaySizeY = hidefCanvasHeight;
settings.maxIncrement = 1;
settings.numAgents = 10;
//settings.colors = ["150,250,200","100,200,150","100,200,250","100,250,70"];
//settings.colors = ["50,150,250","0,100,200","0,50,100","100,200,250"];
settings.colors = ["50,150,250","0,100,200","0,50,100","100,200,250","150,250,200","100,200,150","100,200,250","100,250,70"];
//settings.colors = ["50,50,50","100,100,100","150,150,150","200,200,200"];

//settings.colors = ["115,110,116","105,77,63","228,240,228"];
//settings.colors = ["33,33,87","69,185,176","135,0,7","95,50,117"];
settings.agentAlpha = 0.2;
settings.agentSize = 4;

function canvasSizing(){
    hidefCanvasWidth = window.innerWidth;
    hidefCanvasHeight = window.innerHeight; 
    
    if (window.devicePixelRatio) {
        canvas.width = hidefCanvasWidth * window.devicePixelRatio;
        canvas.height = hidefCanvasHeight * window.devicePixelRatio;
        canvas.style.width = hidefCanvasWidth+"px";
        canvas.style.height = hidefCanvasHeight+"px";
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);    
    }else{
        canvas.width = hidefCanvasWidth;
        canvas.height = hidefCanvasHeight;   
    } 

    settings.displaySizeX = hidefCanvasWidth;
    settings.displaySizeY = hidefCanvasHeight;
}

canvasSizing();

window.onresize = function(){
    canvasSizing();
}

function createAgent(){

    var agent = {};

    agent.x = Math.random() * settings.displaySizeX;
    agent.y = Math.random() * settings.displaySizeY;
    agent.xIncrement = (Math.random() * 0.4 - 0.2) * settings.maxIncrement;
    agent.yIncrement = (Math.random() * 0.4 - 0.2) * settings.maxIncrement;
    agent.color = settings.colors[Math.floor(Math.random() * settings.colors.length)];
    
    agent.draw = function(){

        //Rectangle
        //ctx.fillStyle = "rgba(255,255,255,1)";
        //ctx.fillRect(agent.x, agent.y, 2, 2);
        agent.x += agent.xIncrement ;
        agent.y += agent.yIncrement ;

        if(agent.x <= 0){
//          agent.x += 10;
            agent.x = settings.displaySizeX;
            //agent.y *= -1;
        }else if(agent.y <= 0){
//          agent.y += 10;
            agent.y = settings.displaySizeY;
            //agent.x *= -1;
        }else if(agent.x >= settings.displaySizeX){
//          agent.x -= 10;
            agent.x = 0;
            //agent.y *= -1;
        }else if(agent.y >= settings.displaySizeY){
//          agent.y -= 10;
            agent.y = 0;
            //agent.x *= -1;
        }
    };
    return agent;
};

var myAgent = [];

for(var i=0; i<settings.numAgents; i++)
{
    myAgent.push(createAgent());
}           

function step(){
    //Effacer l'écran
    //ou clearRect
    ctx.clearRect(0,0, settings.displaySizeX, settings.displaySizeY);
    
    // Get Delaunay triangles
    var triangles = Delaunay.triangulate(myAgent);
   
    // Draw triangles
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2 )";
    for(i = 0; i < triangles.length; i += 3) {
        
        var a1 = myAgent[triangles[i]];
        var a2 = myAgent[triangles[i + 1]];
        var a3 = myAgent[triangles[i + 2]];
        ctx.beginPath();


        var grad = ctx.createLinearGradient(a1.x,a1.y,a2.x,a2.y);
        grad.addColorStop(1,"rgba("+a1.color+",0.15)");
        grad.addColorStop(0.5,"rgba("+a2.color+",0)");
        grad.addColorStop(0,"rgba("+a3.color+",0.25)");
        ctx.fillStyle = grad;

        ctx.moveTo(a1.x, a1.y);
        ctx.lineTo(a2.x, a2.y);
        ctx.lineTo(a3.x, a3.y);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }
    myAgent.forEach(function(a){
        a.draw();
    });

    requestAnimationFrame(step);
};

//var timer = setInterval(step, 1000/60); //60 fps

requestAnimationFrame(step);

