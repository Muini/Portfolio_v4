<?php    
if(strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
    header('Location: ../#/production'); 
}
$filesize = filesize($_SERVER['SCRIPT_FILENAME']);
header('Content-Length: '.$filesize);
?>
<header>
    <h1 class="title_page">The Production</h1>
</header>
<h2>What about the result ?</h2>
<h3 class="description">After production time.</h3>
<p>I can buy some friends with beers to do the work for me but I need to learn to do it myself.</p>
<section class="a_project">
    <div>
        <a href="http://jobshaker.fr/" target="_blank"><h2 class="p_title">JobShaker</h2></a>
        <p class="p_description">Done in two weeks, JobShaker is a school project showing the employment rate in France by departement and sector. Browsing the website can therefore help you decide if you want to move somewhere for a new job.</p>
        <p class="technology">Backbone.js | Handlebars | D3JS | JQuery</p>
        <p class="p_role">Graph developement with D3JS</p>
        <p class=""></p>
    </div>
</section>
<section class="a_project">
    <div>
        <h2 class="p_title">CineQuest</h2>
        <p class="p_description">Done in two weeks, JobShaker is a school project showing the employment rate in France by departement and sector. Browsing the website can therefore help you decide if you want to move somewhere for a new job.</p>
    </div>
</section>
<section class="a_project">
    <div>
        <a href="http://patcorn.fr/" target="_blank"><h2 class="p_title">PatCorn</h2></a>
        <p class="p_description">Done in two weeks, JobShaker is a school project showing the employment rate in France by departement and sector. Browsing the website can therefore help you decide if you want to move somewhere for a new job.</p>
    </div>
</section>
<section class="a_project">
    <div>
        <a href="http://vimeo.com/120592302" target="_blank"><h2 class="p_title">Interseltic</h2></a>
        <p class="p_description">Done in two weeks, JobShaker is a school project showing the employment rate in France by departement and sector. Browsing the website can therefore help you decide if you want to move somewhere for a new job.</p>
    </div>
</section>