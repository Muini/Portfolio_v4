//=========================================================================================
// Hey there, welcome to the dark face of my portfolio,
// You can check my code if you want, it's just some weird functions
// I'm using GSAP for animations, D3JS for the tree of skills and the rest is native javascript
// If you still have a question : corentin.flach(at)gmail.com
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
        
        //Delete gradient on Safari because it's ugly
        var isSafari = /constructor/i.test(window.HTMLElement);
        if(isSafari)
        {
            document.getElementById("header").style.background = "none";
            document.getElementById("footer").style.background = "none";
        }
        
    },
    
    resize: function(){
        //Video always need to be perfect
        video.resize();
        this.treeOfSkills.resize();
        bonhomme.scale();
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
        
        if(index == this.pages.length-1){
//            nextPage = this.pages[0].getAttribute('id');
        }else{
            nextPage = this.pages[index+1].getAttribute('id');
            
            nextPage = nextPage.split("_")[1];
        
            this.goTo(nextPage);
        }
        
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
        
        if(index == 0){
//            previousPage = this.pages[this.pages.length-1].getAttribute('id');
        }else{
            previousPage = this.pages[index-1].getAttribute('id');
                    
            previousPage = previousPage.split("_")[1];

            this.goTo(previousPage);
        }
        
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

                    url += "pages/"+name+".php";

                    it.ajaxGet( url, function(data){
                        
                        //We get our content \o/
                        page_togo.style.opacity = 0;
                        page_togo.innerHTML = data;
                        page_togo.setAttribute("data-loaded","");
                        
                        //First Launch is the when we arrived on the website
                        if(it.first_launch){
                            //Test the computer performance with counting
                            var start = new Date();
                            for (var i=0; i<10000000; i++); 
                            var end = new Date();
                            var diff = end - start;
                            //console.log(diff+"ms");
                                                                                       
                            if(diff>20){
                                //No Canvas
                                document.getElementById("canvas").parentElement.removeChild(document.getElementById("canvas"));
                            }
                            
                            //Delete de beforeLoad then draw the page then UI elements
                            setTimeout(function(){
                                
                                if( (diff>12) || (window.innerWidth<960) ){
                                    //Stop vidéo
                                    video.it.pause();
                                    video.it.src = "";
                                    document.querySelector(".toggle_sound").className = "toggle_sound mute_sound hover_sound";
                                }
                                
                                audio.playHover("sound/first_launch.mp3");
                                
                                TweenMax.to(document.getElementById('beforeLoad'),1,{opacity:0,onComplete:function(){
                                    document.getElementById('beforeLoad').style.display = "none";
                                    it.animation(page_togo,false,function(){
                                        it.canNavigate = true;
                                        it.first_launch = false;
                                        
                                        TweenMax.to(navProgress,0.6,{x:0});
                                        TweenMax.staggerTo(controls,0.6,{y:0, ease:Elastic.easeOut},0.05);
                                    });
                                    //Init THE bonhomme !
                                    bonhomme.init();
                                    //Play the eventual specific page animation
                                    it.specificPageAction(name,false);
                                }});
                                
                            },2000);
                            
                        }else{
                            //Just draw the page
                            it.animation(page_togo,false,function(){
                                it.canNavigate = true;
                            });
                            it.specificPageAction(name,true);
                        }

                    });

                }else{
                    //We already load the content, just draw it
                    it.animation(page_togo,false,function(){
                        it.canNavigate = true;
                    });
                    it.specificPageAction(name,true);
                }
            }
            
            if(current_page){
                it.animation(current_page,true,getPage);
            }else{
                getPage();
            }

        }
        
    },
    
    //Specific page script when init
    specificPageAction: function(name,firstlaunch){
        
        //Reset position of bonhomme
        bonhomme.moveTo(10);
        
        if(name == "" || name == "home"){
            
            var delay = 0;
            if(!firstlaunch){
                delay = 1700;
            }
            setTimeout(function(){
                bonhomme.play(2,23,12,false,null);
            },delay);
            
        }else if(name == "howto"){
            
            var delay = 0;
            if(!firstlaunch){
                delay = 1700;
            }
            setTimeout(function(){
                bonhomme.play(3,26,12,false,null);
            },delay);
            
        }else if(name == "skills"){
            
            var delay = 0;
            if(!firstlaunch){
                delay = 1700;
            }
            
            //Delete Tree of Skills
            document.getElementById("tree_of_skills").innerHTML = "";   
            
            setTimeout(function(){
                //Téléportation out
                bonhomme.play(1,12,12,false,function(){
                    //Goto tree
                    bonhomme.moveTo(66);
                    //Teleport In
                    audio.playHover("sound/teleport.mp3");
                    bonhomme.play(1,12,12,true,function(){
                        //Create tree
                        setTimeout(function(){ 
                            portfolio.treeOfSkills.init(); 
                            setTimeout(function(){ 
                                audio.playHover("sound/tree.mp3");
                            },700);
                        },250);
                        bonhomme.play(4,19,12,false,function(){
                            //Teleport Out
                            bonhomme.play(1,12,12,false,function(){
                                //Go to Default
                                bonhomme.moveTo(10);
                                //Teleport In
                                audio.playHover("sound/teleport.mp3");
                                bonhomme.play(1,12,12,true,null);
                            });
                        });
                    });
                });
            },delay);            
            
        }else if(name == "production"){
            
            portfolio.projectsNav.init();
            
        }else if(name == "contact"){
            
        }
        
    },
    
    animation: function(elem, out, callback){
        if(out){
            //Define Out animation
            TweenMax.to(elem,.6,{y:"5%",opacity:0,onComplete:callback});
            
            audio.playHover("sound/page_change.mp3");
        }else{
            audio.checkHoverSound();
            //Define In animation
            var tl = new TimelineMax({onComplete:callback});
            tl.add( TweenMax.to(elem,.3,{y:"0%",opacity:1}) );
            if(elem.querySelectorAll(".title_site").length>0)
                tl.add( TweenMax.from(elem.querySelectorAll(".title_site"), 1.9, {opacity:0,y:-20}) );
            else if(elem.querySelectorAll("h1").length>0){
                TweenMax.from(elem.querySelectorAll("h1"), 0.9, {opacity:0,x:-60});
            }
            if(elem.querySelectorAll(".sub_title").length>0)
                tl.add( TweenMax.from(elem.querySelectorAll(".sub_title"), 0.6, {opacity:0,y:30}) );
            else if(elem.querySelectorAll("h2").length>0)
                tl.add( TweenMax.from(elem.querySelectorAll("h2"), 0.6, {opacity:0,y:-20}) );
            if(elem.querySelectorAll("h3").length>0)
                tl.add( TweenMax.from(elem.querySelectorAll("h3"), 0.3, {opacity:0,y:-20}) );
            if(elem.querySelectorAll("span").length>0)
                tl.add( TweenMax.staggerFrom(elem.querySelectorAll("span"),0.3, {opacity:0,y:-10},0.1) );
            if(elem.querySelectorAll(".a_project").length>0)
                tl.add( TweenMax.staggerFrom(elem.querySelectorAll(".a_project"),0.6, {scale:0.8,y:"-10%",rotationY:90},0.1) );
            if(elem.querySelectorAll("hr").length>0)
                tl.add( TweenMax.from(elem.querySelectorAll("hr"), 0.3, {width:0}) );
            if(elem.querySelectorAll("p").length>0)
                tl.add( TweenMax.staggerFrom(elem.querySelectorAll("p"),0.3, {opacity:0,y:-10},0.05) );
            if(elem.querySelectorAll("img").length>0)
                tl.add( TweenMax.staggerFrom(elem.querySelectorAll("img"),0.3, {opacity:0},0.05) );
            //Special animation for SVG
            var svgs = elem.querySelectorAll("svg");
            if(svgs.length>0)
            {
                var paths = elem.querySelectorAll(".path");
                for(var i=0; i<paths.length; i++)
                {
                    var length_path = paths[i].getTotalLength();
                    paths[i].style.strokeDashoffset = length_path;
                    paths[i].style.strokeDasharray = length_path+" "+length_path;
                }
                tl.add( TweenMax.staggerFrom(svgs,0.3, {opacity:0,y:-20,onComplete:function(){
                    if(paths.length>0)
                    {
                        TweenMax.to(paths,9,{strokeDashoffset:0});
                        setTimeout(function(){
                            TweenMax.to(paths,0.6,{fill:"#000",strokeWidth:0});
                        },2000);
                    }
                }},0.1) );
            }
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
            document.title = "Corentin Flach • Storyteller / Motion Designer / Front-end developer";
        }else{
            str = str.charAt(0).toUpperCase() + str.slice(1);
            document.title = "Corentin Flach • "+str+" • Storyteller / Motion Designer / Front-end developer";
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
            //Custom add to have the state of loading to make a progress bar
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
            newStep.setAttribute('class','navProgress_step hover_sound');
            newStep.setAttribute('data-hover-sound','sound/hover.mp3');
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
                    steps[i].className = 'navProgress_step active_step hover_sound';
                    progressBar.style.height = (i*(100/steps.length))+"%";
                }else{
                    steps[i].className = 'navProgress_step hover_sound';
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
            .charge(function(d) { return -350*it.h/1000; }) //100 : -30
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
                    .attr("d", d3.svg.symbol().size(function(d) { return d.children ? d.size/30 : d.size/3; }).type("diamond"))
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
            
            var color1 = "hsla(100,0%," + ( 30 + Math.random() * 30 ) + "%, 100)"; //de 200 à 360
            
            return color1;
            
        },

        // Toggle children on click.
        hover: function(d) {
            
            audio.playHover('sound/hover.mp3');
            
            var skills = document.querySelectorAll(".skill");
            for(var i=0; i<skills.length; i++){
                skills[i].className = "skill hidden";
            }
            var skill = document.querySelector("#s_"+d.name);
            if(skill)
            {
                document.getElementById('skills_description').className = "hidden";  
                skill.className = "skill";
                TweenMax.to(skill.querySelectorAll('h2,.s_img,p'),0,{y:'20px',opacity:0});
                
                TweenMax.to(skill.querySelectorAll('h2'),0.3,{y:'0px',opacity:1});
                TweenMax.to(skill.querySelectorAll('.s_img'),0.6,{y:'0px',opacity:1});
                TweenMax.to(skill.querySelectorAll('p'),0.3,{y:'0px',opacity:1});
            }
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

    },
    
    //Project Navigation with hover
    projectsNav: {
        
        elems: null,
        
        currentIndex: 1,
        
        blockControl: false,
        
        speed: 1,
        
        init: function(){
            var it = this;
            it.elems = document.querySelectorAll('.a_project');
            it.elems[it.currentIndex].style.opacity = 1;
            for(var i=0; i<it.elems.length; i++)
            {
                (function(index){
                    it.elems[i].onmouseover = it.elems[i].onclick = function(){
                        
                        if(index != it.currentIndex && it.blockControl == false)
                        {
                            audio.playHover("sound/hover.mp3");
                            it.currentIndex = index;
                            it.blockControl = true;
                            for(var i=0; i<it.elems.length; i++){ it.elems[i].style.opacity = 0.5; }
                            this.style.opacity = 1;
                            var projects = document.getElementById('projects_3D');
                            switch(index)
                            {
                                case 0:
                                    TweenMax.to(projects,it.speed,{x:"1280px",onComplete:function(){ it.blockControl = false; }});
                                break;
                                case 1:
                                    TweenMax.to(projects,it.speed,{x:"640px",onComplete:function(){ it.blockControl = false; }});
                                break;
                                case 2:
                                    TweenMax.to(projects,it.speed,{x:"0px",onComplete:function(){ it.blockControl = false; }});
                                break;
                                case 3:
                                    TweenMax.to(projects,it.speed,{x:"-640px",onComplete:function(){ it.blockControl = false; }});
                                break;
                                case 4:
                                    TweenMax.to(projects,it.speed,{x:"-1280px",onComplete:function(){ it.blockControl = false; }});
                                break;
                                
                            }
                        }
                    };
                })(i);
            }

        },
        
    }
    
}

//==========================================
// Video Controller
//==========================================

var video = {
    
    it: null,
    
    init: function(){     
        
        this.it = document.getElementById("video_bg");
        this.it.src = "vid/bg_vid.mp4";
        this.it.pause();
        this.it.addEventListener('timeupdate',this.maj_bar);
        this.resize();
        
        var it = this;
        
        var loader_bar = document.getElementById('loaderVid');
        
        TweenMax.to(loader_bar,0,{opacity:1,width:0});
        
        setTimeout(function(){
            //it.it.currentTime = 0;
            it.maj_bar();
            it.it.volume = 1; //0.8 to change for launching
            it.it.play();
        }, 1000);
        
        //Son
        document.querySelector('.toggle_sound').onclick = function(){
            it.toggleSound();
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
        
        var btn_sound = document.querySelector('.toggle_sound');
        if(/mute_sound/.test(btn_sound.className)){
            btn_sound.className = "toggle_sound hover_sound";
        }else{
            btn_sound.className = "toggle_sound mute_sound hover_sound";
        }
        
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
    hover2: null,
    altHover: false,
    
    init: function(){
        
        this.music = document.getElementById('music');
        this.music.pause();
        this.music.volume = 0.8;
        
        this.hover = document.getElementById('hover_sound');
        this.hover.pause();
        this.hover.volume = 0.4;
        this.hover2 = document.getElementById('hover_sound2');
        this.hover2.pause();
        this.hover2.volume = 0.4;
        
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
        //this.music.currentTime = 0;
        
    },
    
    playMusic: function(src){
        
        if(video.it.muted)
            video.it.muted = false;
        if(this.music.src != src)
            this.music.src = src;
        //this.music.currentTime = 0;
        this.music.play();
        
        document.querySelector('.toggle_sound').className = "toggle_sound hover_sound";
    },
    
    checkHoverSound: function(){
        var hover_sound = document.querySelectorAll('.hover_sound');
        for(var i=0; i<hover_sound.length; i++)
        {
            var it = this;
            hover_sound[i].onmouseover = function(){
                it.playHover(this.getAttribute('data-hover-sound'));
            }
        }
    },
    
    playHover: function(src){
        if(!video.it.muted)
        {
            if(this.altHover){
                this.hover2.pause();
                if(this.hover2.src != src)
                    this.hover2.src = src;
                //this.hover2.currentTime = 0;
                this.hover2.play();
                this.altHover = false;
            }else{
                this.hover.pause();
                if(this.hover.src != src)
                    this.hover.src = src;
                //this.hover.currentTime = 0;
                this.hover.play();
                this.altHover = true;
            }
        }
        
    }
    
}

//==========================================
// Bonhomme Controller
//==========================================

var bonhomme = {
    
    timer: null,
    currentbgx: 0,
    elem: null,
    
    width: 320,
    height: 320,
    
    //Initialization the div where the bonhomme is, the current anim (in then idle) and the position on the screen.
    init: function(){
        var it = this;
        //Init the bonhomme only on big screen
        if(window.innerWidth>640 && window.innerHeight>480)
        {
            it.elem = document.getElementById('bonhomme_anim');
            it.elem.parentNode.style.display = 'block';
            it.elem.style.backgroundPosition = it.width + "px " + it.height +"px";
            it.scale();
            setTimeout(function(){
                audio.playHover("sound/teleport.mp3");
                it.play(1,12,12,true,null);
            },500);
        }
    },
    
    // The play function can play any animation of the bonhomme at any time cutting the current animation.
    // line = line number of the animation, start at 0
    // length = line length in image
    // fps = frame per second
    // reverse = boolean that play reverse animation
    // callback = callback function when the animation is finished. Always play Idle animation in case callback is nothing. (so it's idle is looping)
    play: function(line,length,fps,reverse,callback){
        
        var it = this;
        
        it.stop();
        if(reverse)
            it.currentbgx = - length * it.width;
        else
            it.currentbgx = 0;
        it.elem.style.backgroundPosition = it.currentbgx + "px "+( line * -it.height )+"px";
        if(it.timer == null)
        {
            it.timer = setInterval(function(){
                it.startAnim(line,length,reverse,callback);
            }, (1000/fps));
        }
        
    },
    
    startAnim: function(line,length,reverse,callback){
                  
        var it = this;
        
        it.elem.style.backgroundPosition = it.currentbgx + "px "+( line * -it.height )+"px";
        if(reverse)
        {
            it.currentbgx += it.width;
        }else{
            it.currentbgx -= it.width;
        }
        
        if (it.currentbgx < -(it.width*length) || it.currentbgx >= 0) {
            it.play(0,15,6,false,null); //If the animation is finished, it return on idle state. The callback will still be executed.
            if(callback)
                callback();
        } 
    },
    
    // Stop the animation
    stop: function(){
        clearInterval(this.timer);
        this.timer = null;
    },
    
    //Can move the bonhomme at x and y (in percent of the screen)
    moveTo: function(x){
        this.elem.parentNode.style.right = x+'%';
    },
    
    scale: function(){
        var scale = (window.innerHeight * 0.8 / 1200) + 0.1;
        var bottom = -14 + Math.exp((document.getElementById("bonhomme").offsetHeight*scale*2.3) / (320*0.7));
        if(scale>0.9)
            scale = 0.9;
        else if(scale<0.5)
            scale = 0.5;
        document.getElementById("bonhomme").style.bottom = bottom+"%";
        TweenMax.to(document.querySelector(".animContainer"),0.3,{scale:scale});   
    }
}

//==========================================
// Initialization
//==========================================

window.onresize = function(){ 
    portfolio.resize(); 
    canvasSizing();
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

var borderAgent = false;

var hidefCanvasWidth;
var hidefCanvasHeight;

//Init
var settings = {};
settings.displaySizeX = hidefCanvasWidth;
settings.displaySizeY = hidefCanvasHeight;
settings.maxIncrement = 1;
settings.numAgents = 20;
//settings.colors = ["150,250,200","100,200,150","100,200,250","100,250,70"];
//settings.colors = ["50,150,250","0,100,200","0,50,100","100,200,250"];
//settings.colors = ["50,150,250","0,100,200","0,50,100","100,200,250","150,250,200","100,200,150","100,200,250","100,250,70"];
//settings.colors = ["50,50,50","100,100,100","150,150,150","200,200,200"];
settings.colors = ["115,110,116","105,77,63","228,240,228"]; //Good
//settings.colors = ["33,33,87","69,185,176","135,0,7","95,50,117"];
settings.agentAlpha = 0.2;
settings.agentSize = 4;
settings.maxAgent = 80;

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

function createAgent(m){

    var agent = {};
    
    if(m)
    {
        agent.x = m.clientX;
        agent.y = m.clientY;
        agent.xIncrement = (Math.random() * 0.4 - 0.2) * settings.maxIncrement;
        agent.yIncrement = (Math.random() * 0.4 - 0.2) * settings.maxIncrement;
    }else{
        if(borderAgent)
        {
            switch(Math.floor(Math.random()*4)){
                case 0:
                    agent.x = Math.random() * settings.displaySizeX;
                    agent.y = 0;
                    break;
                case 1:
                    agent.x = Math.random() * settings.displaySizeX;
                    agent.y = settings.displaySizeY;   
                    break;
                case 2:
                    agent.y = Math.random() * settings.displaySizeY;
                    agent.x = 0;
                    break;
                case 3:
                    agent.y = Math.random() * settings.displaySizeY;
                    agent.x = settings.displaySizeX;
                    break;
            }
            agent.xIncrement = 0;
            agent.yIncrement = 0;
        }else{
            agent.x = Math.random() * settings.displaySizeX;
            agent.y = Math.random() * settings.displaySizeY;
            agent.xIncrement = (Math.random() * 0.4 - 0.2) * settings.maxIncrement;
            agent.yIncrement = (Math.random() * 0.4 - 0.2) * settings.maxIncrement;
        }
    }
    agent.color = settings.colors[Math.floor(Math.random() * settings.colors.length)];
    
    agent.draw = function(){

        //Rectangle
        //ctx.fillStyle = "rgba(255,255,255,1)";
        //ctx.fillRect(agent.x, agent.y, 2, 2);
        agent.x += agent.xIncrement ;
        agent.y += agent.yIncrement ;

        if(agent.x < 0){
            agent.x = settings.displaySizeX;
        }else if(agent.y < 0){
            agent.y = settings.displaySizeY;
        }else if(agent.x > settings.displaySizeX){
            agent.x = 0;
        }else if(agent.y > settings.displaySizeY){
            agent.y = 0;
        }
    };
    
    borderAgent = !borderAgent;
    
    return agent;
};

var myAgent = [];

for(var i=0; i<settings.numAgents; i++)
{
    myAgent.push(createAgent(null));
}           

document.body.onclick = function(e){
    if(myAgent.length<settings.maxAgent)
    {
        var mouse_e = e;
        myAgent.push(createAgent(mouse_e));
    }
};

function step(){
    //Effacer l'écran
    ctx.clearRect(0,0, settings.displaySizeX, settings.displaySizeY);
    
    // Get Delaunay triangles
    var triangles = Delaunay.triangulate(myAgent);
   
    // Draw triangles
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1 )";
    for(i = 0; i < triangles.length; i += 3) {
        
        var a1 = myAgent[triangles[i]];
        var a2 = myAgent[triangles[i + 1]];
        var a3 = myAgent[triangles[i + 2]];
        ctx.beginPath();


        var grad = ctx.createLinearGradient(a1.x,a1.y,a2.x,a2.y);
        grad.addColorStop(1,"rgba("+a1.color+",0.05)");
        grad.addColorStop(0.5,"rgba("+a2.color+",0)");
        grad.addColorStop(0,"rgba("+a3.color+",0.1)");
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

requestAnimationFrame(step);

