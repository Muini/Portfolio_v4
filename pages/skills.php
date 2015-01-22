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
    <h3>Now I need skills to produce my ideas.</h3>
    <p>Or I can buy some friends with beers to do the work for me</p>
    <p>But I need to learn to do it myself.</p>
    <p>So here are my actual skills tree, it still growing.</p>
</section>
<section id="tree_of_skills">
    <!-- Here come the tree ! -->
</section>