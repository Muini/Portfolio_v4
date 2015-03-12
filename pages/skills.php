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
    <div id="s_internet" class="skill hidden">
        <h2>Internet</h2>
        <div class="s_img"></div>
        <p></p>
    </div>
    <div id="s_3D" class="skill hidden">
        <h2>3D</h2>
        <div class="s_img"></div>
        <p></p>
    </div>
</section>
<?php
if (!(array_key_exists('HTTP_X_REQUESTED_WITH', $_SERVER))){
    include('../php/footer.php');   
}
?>