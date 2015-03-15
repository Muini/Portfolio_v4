<?php
if (!(array_key_exists('HTTP_X_REQUESTED_WITH', $_SERVER))){
    include('../php/header.php');
    if(strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        header('Location: ../#/skills');
    }
}
$filesize = filesize($_SERVER['SCRIPT_FILENAME']);
header('Content-Length: '.$filesize);
?>
<header>
    <h1 class="title_page">The Tree of Skills</h1>
</header>
<section id="skills_description">
    <h2>Well, what can I use ?</h2>
    <h3 class="description">Everything, I need skills to produce my ideas.</h3>
    <p>Or I can buy some friends with beers to do the work for me</p>
    <p>But I like to learn to do it myself.</p>
    <p>So here are my actual skills tree, it still growing.</p>
</section>
<section id="tree_of_skills">
    <!-- Here come the tree ! -->
</section>
<section id="skills">
   
    <div id="s_video" class="skill hidden">
        <h2>Film Making / Video</h2>
        <div class="s_img"></div>
        <p>Film making is one of my oldest hobby's. I've started with Lego stop motion and now i'm trying to create real short film with friends.</p>
    </div>
        <div id="s_pre-production" class="skill hidden">
            <h2>Pre-Production</h2>
            <div class="s_img"></div>
            <p>Any project need preparation, a good preproduction makes a good production.</p>
        </div>
            <div id="s_ideation" class="skill hidden">
                <h2>Ideation</h2>
                <div class="s_img"></div>
                <p>Telling a story is basicaly telling something to someone. It's a message you want to pass to other people.</p>
            </div>
            <div id="s_scenario" class="skill hidden">
                <h2>Scenario</h2>
                <div class="s_img"></div>
                <p>How will I tell my idea, how can I make the audiance feel the emotion, what character will makes the difference.</p>
            </div>
            <div id="s_storyboard" class="skill hidden">
                <h2>Storyboard</h2>
                <div class="s_img"></div>
                <p>Technical approach for cutting the scenario into single shot. Here I'm using magic & drawing !</p>
            </div>
            <div id="s_planning" class="skill hidden">
                <h2>Planning</h2>
                <div class="s_img"></div>
                <p>Damn the actor can't be here at 6am. Damn the white house is not open the friday.</p>
            </div>
        <div id="s_production" class="skill hidden">
            <h2>Production</h2>
            <div class="s_img"></div>
            <p>Yay ! Finally we can do it !</p>
        </div>
    
    
    <div id="s_internet" class="skill hidden">
        <h2>Internet</h2>
        <div class="s_img"></div>
        <p></p>
    </div>
    
    
    <div id="s_3D" class="skill hidden">
        <h2>3D</h2>
        <div class="s_img"></div>
        <p>Animation film, video games, vfx... 3D is just one of the best way to deploy imagination today. It’s an illimited power that can be used for so many applications.</p>
    </div>
        <div id="s_drawing" class="skill hidden">
            <h2>Drawing</h2>
            <div class="s_img"></div>
            <p>Drawing is a big part of my childhood, I draw for creating universe where I can do whatever I want. I'm trying to not loose this aptitude and it's actually usefull for 3D templates and 2D animations like the little guy is the corner.</p>
        </div>
        <div id="s_modelisation" class="skill hidden">
            <h2>Modelisation</h2>
            <div class="s_img"></div>
            <p>It's the step of creation where you change your drawing into volume. Thinking of the good shape for unwrapping and optimisation for future application.</p>
        </div>
        <div id="s_texturing" class="skill hidden">
            <h2>Texture</h2>
            <div class="s_img"></div>
            <p>First you need to create a pattern of your entire model. Second the colorating of your texture using existing texture or handpainted. Third, creating a specular, bump and other layers.</p>
        </div>
        <div id="s_animation" class="skill hidden">
            <h2>Animation</h2>
            <div class="s_img"></div>
            <p>Hardest part from my point of view, animating whatever in 3D or even in 2D is a challenge. You need to reproduce movement that you see and makes it feel natural.</p>
        </div>
        <div id="s_render" class="skill hidden">
            <h2>Render</h2>
            <div class="s_img"></div>
            <p>Make the scene, place objects, set lighting, then render the view.</p>
        </div>
            <div id="s_pre-rendered" class="skill hidden">
                <h2>Pre-rendered</h2>
                <div class="s_img"></div>
                <p>I'm using Blender to create precalculated render scene, you can check <a href="http://www.youtube.com/watch?v=WZgPWUAQbys" title="Le Herisson Glouton" target="_blank">my latest 3D Animation</a>.</p>
            </div>
            <div id="s_real_time" class="skill hidden">
                <h2>Real Time</h2>
                <div class="s_img"></div>
                <p>A good part is real time rendering. I'm using Source engine to build a game called <a href="http://www.indiedb.com/games/nag" title="See Nag" target="_blank">Nag</a>. I'm doing every part of the developement.</p>
            </div>
    
    
</section>
<?php
if (!(array_key_exists('HTTP_X_REQUESTED_WITH', $_SERVER))){
    include('../php/footer.php');   
}
?>