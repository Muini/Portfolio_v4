<?php 
if (!(array_key_exists('HTTP_X_REQUESTED_WITH', $_SERVER))){
    include('../php/header.php'); 
    if(strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        header('Location: ../#/production');  
    }
}
$filesize = filesize($_SERVER['SCRIPT_FILENAME']);
header('Content-Length: '.$filesize);
?>
<header>
    <h1 class="title_page">The Production</h1>
</header>
<h2>What about the result ?</h2>
<h3 class="description">After production time, proudly present it.</h3>
<p>Here are my major projects and the best is coming.</p>
<div id="projects">
    <div id="projects_3D">
        <section class="a_project">
            <div>
                <header>
                    <hr>
                    <a href="http://jobshaker.fr/" target="_blank"><h2 class="p_title">JobShaker</h2></a>
                    <p class="p_status">School</p>
                    <hr>
                </header>
                <p class="p_description">Done in two weeks, JobShaker is a school project showing the employment rate in France by departement and sector. Browsing the website can therefore help you decide if you want to move somewhere for a new job.</p>
                <footer>
                    <p class="p_tools">Backbone.js | D3JS | JQuery</p>
                    <p class="p_role">Graphic developement with D3JS</p>
                </footer>
            </div>
        </section>

        <section class="a_project">
            <div>
                <header>
                    <hr>
                    <a href="http://vimeo.com/120592302" target="_blank"><h2 class="p_title">Interseltic</h2></a>
                    <p class="p_status">School</p>
                    <hr>
                </header>
                <p class="p_description">Ten days to create a short-film including all process of creation. It was a big challenge and an incredible experience. We were ten to create, recruit actors, find places, editing and promoting the film.</p>
                <footer>
                    <p class="p_tools">Avid | After Effects</p>
                    <p class="p_role">Director, Scenario, VFX</p>
                </footer>
            </div>
        </section>

        <section class="a_project">
            <div>
                <header>
                    <hr>
                    <a href="http://slashe.com/" target="_blank"><h2 class="p_title">Slashe</h2></a>
                    <p class="p_status">Internship</p>
                    <hr>
                </header>
                <p class="p_description">Slashe is a creative agency which purpose interactive content for medias. I have done a three months internship as front-end developer.</p>
                <footer>
                    <p class="p_tools">Javascript | SVG</p>
                    <p class="p_role">Part of Front-end developement</p>
                </footer>
            </div>
        </section>

        <section class="a_project">
            <div>
                <header>
                    <hr>
                    <a href="http://patcorn.fr/" target="_blank"><h2 class="p_title">PatCorn</h2></a>
                    <p class="p_status">Personal</p>
                    <hr>
                </header>
                <p class="p_description">PatCorn is a library of short film or web series found on the Internet. It purpose to promote and reference awesome creators.</p>
                <footer>
                    <p class="p_tools">Wordpress | Jquery | GSAP</p>
                    <p class="p_role">Co-founding, developement and content</p>
                </footer>
            </div>
        </section>

        <section class="a_project">
            <div>
                <header>
                    <hr>
                    <h2 class="p_title">CineQuest</h2>
                    <p class="p_status">School</p>
                    <hr>
                </header>
                <p class="p_description">CineQuest is an epic game where you need to find the name of film of the screenshot other players post. Challenge, knowledge, conquest, everything will fit to moviegoers or neophyte.</p>
                <footer>
                    <p class="p_tools">Ruby on Rails | Javascript | LESS | GSAP</p>
                    <p class="p_role">Back-end & Front-end developement.</p>
                </footer>
            </div>
        </section>
    </div>
</div>
<?php
if (!(array_key_exists('HTTP_X_REQUESTED_WITH', $_SERVER))){
    include('../php/footer.php');   
}
?>