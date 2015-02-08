<?php    
if(strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
    header('Location: ../#/skills'); 
}
$filesize = filesize($_SERVER['SCRIPT_FILENAME']);
header('Content-Length: '.$filesize);
?>
<header>
    <h1 class="title_page">The Tree of Skills</h1>
</header>
<section id="skills_description">
    <h2>And now, what can I use ?</h2>
    <h3 class="description">Now I need skills to produce my ideas.</h3>
    <p>Or I can buy some friends with beers to do the work for me</p>
    <p>But I need to learn to do it myself.</p>
    <p>So here are my actual skills tree, it still growing.</p>
</section>
<section id="tree_of_skills">
    <!-- Here come the tree ! -->
</section>
<section id="skills">
    <div id="s_video" class="skill hidden">
        <h2>Film Making / Video</h2>
        <img src="./img/skills/s_video.png" alt="video" />
        <p></p>
    </div>
    <div id="s_internet" class="skill hidden">
        <h2>Internet</h2>
        <img src="./img/skills/s_video.png" alt="video" />
        <p></p>
    </div>
    <div id="s_3D" class="skill hidden">
        <h2>3D</h2>
        <img src="./img/skills/s_video.png" alt="video" />
        <p></p>
    </div>
</section>