	
	<?php	include('php/header.php');	?>
		
	<div id="wrapper">

        <div id="wrapper_video">
            <video id="video_bg" preload="auto" loop muted>
<!--                <source src="vid/bg_vid.mp4" type="video/mp4" />-->
<!--			<source src="vid/bg_vid.webm"type="video/webm" />-->
                Your browser does not support the video tag. You need to update your browser or change it :/
            </video>
        </div>

        <noscript>
            <p id="noscript">Oops ! Javascript is desactivated ! Activate it for a full fonctionnal navigation !</p>
        </noscript>
        
        <div id="beforeLoad">
            <div>
                <img class='loader' src='img/loader.gif' alt='Loading' />
            </div>
        </div>

        <header id="header">
            <div id="loaderVid" class="loader_bar"></div>
            <div id="loaderAjax" class="loader_bar"></div>
        </header>

        <section id="container">
            <canvas id="canvas"></canvas>
           
            <section id="page_home" class="page hidden"></section>
            
            <section id="page_howto" class="page hidden"></section>
            
            <section id="page_skills" class="page hidden"></section>
            
            <section id="page_production" class="page hidden"></section>
            
            <section id="page_contact" class="page hidden"></section>
            
            <nav id="navProgress">
                <span id="navProgress_bar"></span>
            </nav>
            
            <div id="bonhomme" class="animContainer">
                <div id="bonhomme_anim"></div>
            </div>
       
        </section>

        <footer id="footer">
            <nav id="controls">
                <a><span class="icon-signal toggle_sound"></span></a>
                <a class="btn_music" data-music="music/music_jazz.mp3">▲</a>
                <a class="btn_music" data-music="music/music_film.mp3">▼</a>
                <a class="btn_music" data-music="music/music_street.mp3">▲</a>
                <a class="btn_music" data-music="music/music_vacances.mp3">▼</a>
                <a class="btn_music" data-music="music/music_hardrock.mp3">▲</a>
            </nav>
            <div id="progressBar"></div>
        </footer>
        
        <audio id="music">
            <source src="" type="audio/mpeg" />
            <source src="" type="audio/ogg" />
        </audio>
        <audio id="hover_sound">
            <source src="" type="audio/mpeg" />
            <source src="" type="audio/ogg" />
        </audio>
        
		
	</div>
	
	
	<?php	include('php/footer.php');	?>