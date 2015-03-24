<?php
if (!(array_key_exists('HTTP_X_REQUESTED_WITH', $_SERVER))){
    include('../php/header.php');
    if(strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        header('Location: ../#/skills');
    }
}
$filesize = "";
?>
<header>
    <h1 class="title_page">The Tree of Skills</h1>
</header>
<section id="skills_description">
    <h2>My growing skills tree</h2>
    <h3 class="description">The more I upgrade my skills, the less I'll be limited</h3>
    <p>I can also buy some friends with beers to do the work for me…</p>
    <p>…but I like learning to do it myself.</p>
</section>
<section id="tree_of_skills">
    <!-- Here come the tree ! -->
</section>
<section id="skills">
   
    <div id="s_video" class="skill hidden">
        <h2>Film Making / Video</h2>
        <div class="s_img"></div>
        <p>Film making is one of my oldest hobby. I've started with Lego stop motion and now I'm trying to create <a href="http://www.youtube.com/user/ActiniumStudio" target="_blank" class="hover_sound" data-hover-sound="sound/hover.mp3">short films</a> with friends.</p>
    </div>
        <div id="s_pre-production" class="skill hidden">
            <h2>Pre-Production</h2>
            <div class="s_img"></div>
            <p>Any project need preparation, a good preproduction makes a good production.</p>
        </div>
            <div id="s_ideation" class="skill hidden">
                <h2>Ideation</h2>
                <div class="s_img"></div>
                <p>Telling a story is basicaly sharing a message with people.</p>
            </div>
            <div id="s_scenario" class="skill hidden">
                <h2>Scenario</h2>
                <div class="s_img"></div>
                <p>How will I tell my idea, how can I make the audiance feel the emotion, which character will make the difference ?</p>
            </div>
            <div id="s_storyboard" class="skill hidden">
                <h2>Storyboard</h2>
                <div class="s_img"></div>
                <p>Technical approach for cutting the scenario into single shots. Here I'm using magic & drawing !</p>
            </div>
            <div id="s_planning" class="skill hidden">
                <h2>Planning</h2>
                <div class="s_img"></div>
                <p>Damn the actor can't be here at 6am. Damn the white house is closed on friday.</p>
            </div>
        <div id="s_production" class="skill hidden">
            <h2>Production</h2>
            <div class="s_img"></div>
            <p>Yay ! Finally we can do it !</p>
        </div>
            <div id="s_directing" class="skill hidden">
                <h2>Directing</h2>
                <div class="s_img"></div>
                <p>A coffee please ! Right now ! You ! In place ! Ready ? Action ! Can anyone bring me a damn coffee ?! I'm just kidding, I'm not like this... or maybe a little.</p>
            </div>
            <div id="s_lighting" class="skill hidden">
                <h2>Lighting</h2>
                <div class="s_img"></div>
                <p>I'm just a beginner in lighting, but it can give the shot all its ambiance, its feeling.</p>
            </div>
            <div id="s_shooting" class="skill hidden">
                <h2>Shooting</h2>
                <div class="s_img"></div>
                <p>Setting up the shot perfectly to get the most effective and beautiful image as possible. It's like photography with movements. Good bye arm.</p>
            </div>
            <div id="s_sound_taking" class="skill hidden">
                <h2>Sound Taking</h2>
                <div class="s_img"></div>
                <p>Capture the sound without having a fly noise is hard. Good bye arm again.</p>
            </div>
            <div id="s_acting" class="skill hidden">
                <h2>Acting</h2>
                <div class="s_img"></div>
                <p>Yup, I'm acting. Okay it's terrible… but I'm trying. It's a good experience to know how to speak with actors. If you're <a href="http://www.youtube.com/watch?v=wLeDSSw8DYA" target="_blank" class="hover_sound" data-hover-sound="sound/hover.mp3">curious</a>.</p>
            </div>
            <div id="s_fun" class="skill hidden">
                <h2>Fun</h2>
                <div class="s_img"></div>
                <p>Yeah, Filming is a lot of fun. Hard to do, not always like we want, but this is an amazing moment.</p>
            </div>
        <div id="s_post-production" class="skill hidden">
            <h2>Post-production</h2>
            <div class="s_img"></div>
            <p>Time to edit the film. A long moment in a cave without seeing the sunlight.</p>
        </div>
        <div id="s_editing" class="skill hidden">
            <h2>Editing</h2>
            <div class="s_img"></div>
            <p>Derush, synchronize and, finally, put your shot on the timeline and see the first render of all this work.</p>
        </div>
        <div id="s_vfx" class="skill hidden">
            <h2>VFX</h2>
            <div class="s_img"></div>
            <p>A robot in the scene ? Easy ! A space opera ? Too easy for me. The next time, we will shot everything on greenscreen ! 349 years of render ? Owh...</p>
        </div>
        <div id="s_motion_design" class="skill hidden">
            <h2>Motion Design</h2>
            <div class="s_img"></div>
            <p>Not exactly the same as VFX but it's linked. Motion title, intro video etc... Motion Design is very usefull. It can be used to communicate and advertise.</p>
        </div>
        <div id="s_sound_design" class="skill hidden">
            <h2>Sound Design</h2>
            <div class="s_img"></div>
            <p>Audio is as important as image. Close your eyes and feel the sequence. I love great sound design.</p>
        </div>
        <div id="s_publication" class="skill hidden">
            <h2>Publication</h2>
            <div class="s_img"></div>
            <p>It's part of the process, teasing the film, adding it on every social networks and creating a communication campaign.</p>
        </div>
    
    
    <div id="s_internet" class="skill hidden">
        <h2>Internet</h2>
        <div class="s_img"></div>
        <p></p>
    </div>
        <div id="s_web_ideation" class="skill hidden">
            <h2>Ideation</h2>
            <div class="s_img"></div>
            <p>As video, an internet website or experience is an idea to express a message.</p>
        </div>
            <div id="s_technology_watch" class="skill hidden">
                <h2>Technology Watch</h2>
                <div class="s_img"></div>
                <p>Be aware of the new high-tech product enhanced the possibilities of creation. It's fascinating to see how fast we progress.</p>
            </div>
            <div id="s_graphical_watch" class="skill hidden">
                <h2>Graphical Watch</h2>
                <div class="s_img"></div>
                <p>Even if I'm not a graphist, known what can be done is always good for imagination.</p>
            </div>
        <div id="s_conception" class="skill hidden">
            <h2>Conception</h2>
            <div class="s_img"></div>
            <p>Creating the product need organisation, step by step, it will give </p>
        </div>
            <div id="s_ux_design" class="skill hidden">
                <h2>UX Design</h2>
                <div class="s_img"></div>
                <p>Thinking how it will be the best for user where to place a button. UX is a hard reflexion to give the best user experience.</p>
            </div>
            <div id="s_ui_design" class="skill hidden">
                <h2>UI Design</h2>
                <div class="s_img"></div>
                <p>I like to be aware of good & new design and how there are done.</p>
            </div>
        <div id="s_developement" class="skill hidden">
            <h2>Developement</h2>
            <div class="s_img"></div>
            <p>Programming ! Algorithmic provides endless possibilities.</p>
        </div>
            <div id="s_front_end" class="skill hidden">
                <h2>Front-End</h2>
                <div class="s_img"></div>
                <p>The visible part of the website. I like creating innovative and unique way of navigations.</p>
            </div>
                <div id="s_html5_css3" class="skill hidden">
                    <h2>HTML5 / CSS3</h2>
                    <div class="s_img"></div>
                    <p>The foundation of every website. In constant evolution, I'm very familiar with them.</p>
                </div>
                <div id="s_javascript" class="skill hidden">
                    <h2>Javascript</h2>
                    <div class="s_img"></div>
                    <p>This language is really great ! Easy to learn and such powerful. I like creating from scratch in native javascript. But libraries such as D3JS, GSAP, Videojs and much more are very usefull when you're running out of time.</p>
                </div>
                <div id="s_responsiv" class="skill hidden">
                    <h2>Responsive</h2>
                    <div class="s_img"></div>
                    <p>It's a way of thinking and coding the website. Responsive means you have to "make the project works on every devices". It's a big challenge.</p>
                </div>
            <div id="s_back_end" class="skill hidden">
                <h2>Back-End</h2>
                <div class="s_img"></div>
                <p>The structure of the website. Not my field of expertise but I need to know how it works.</p>
            </div>
                <div id="s_ruby_on_rails" class="skill hidden">
                    <h2>Ruby on Rails</h2>
                    <div class="s_img"></div>
                    <p>It's the best back-end language I've tried. Very fast and powerful.</p>
                </div>
                <div id="s_wordpress" class="skill hidden">
                    <h2>Wordpress</h2>
                    <div class="s_img"></div>
                    <p>A well known CMS. Good to create simple or advanced back-office, but very heavy and restricted.</p>
                </div>
    
    
    <div id="s_3D" class="skill hidden">
        <h2>3D</h2>
        <div class="s_img"></div>
        <p>Animation film, video games, vfx… 3D is just one of the best way to unleash imagination today. It’s an unlimited power that can be used for many applications.</p>
    </div>
        <div id="s_drawing" class="skill hidden">
            <h2>Drawing</h2>
            <div class="s_img"></div>
            <p>Drawing was a big part of my childhood, I draw to create universe where I can do whatever I want. I'm trying to keep this aptitude and it's actually usefull for 3D templates and 2D animations like the little guy in the corner.</p>
        </div>
        <div id="s_modelisation" class="skill hidden">
            <h2>Modelisation</h2>
            <div class="s_img"></div>
            <p>It's the step of creation where you go from drawings to volumes. Thinking of good shapes for unwrapping and optimisation.</p>
        </div>
        <div id="s_texturing" class="skill hidden">
            <h2>Texture</h2>
            <div class="s_img"></div>
            <p>First, I create a pattern of the entire model. Then, I fill it using existing textures or handpainted ones. Finally, I create a specular, bump and other layers.</p>
        </div>
        <div id="s_animation" class="skill hidden">
            <h2>Animation</h2>
            <div class="s_img"></div>
            <p>Hardest part from my point of view. Whether it's in 3D or in 2D, animation is a real challenge. You need to reproduce movements and makes them feel natural.</p>
        </div>
        <div id="s_render" class="skill hidden">
            <h2>Render</h2>
            <div class="s_img"></div>
            <p>Make the scene, place objects, set lighting, then render the view.</p>
        </div>
            <div id="s_pre-rendered" class="skill hidden">
                <h2>Pre-rendered</h2>
                <div class="s_img"></div>
                <p>I'm using Blender to create precalculated render scenes, you can check <a href="http://www.youtube.com/watch?v=WZgPWUAQbys" title="Le Herisson Glouton" target="_blank" class="hover_sound" data-hover-sound="sound/hover.mp3">my latest 3D Animation</a>.</p>
            </div>
            <div id="s_real_time" class="skill hidden">
                <h2>Real Time</h2>
                <div class="s_img"></div>
                <p>I'm using Source engine to build a game called <a href="http://www.indiedb.com/games/nag" title="See Nag" target="_blank" class="hover_sound" data-hover-sound="sound/hover.mp3">Nag</a>. I'm doing every part of the developement.</p>
            </div>
    
    
</section>
<?php
if (!(array_key_exists('HTTP_X_REQUESTED_WITH', $_SERVER))){
    include('../php/footer.php');
}
?>