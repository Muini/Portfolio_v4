	
	<?php	include('php/header.php');	?>
		
	<div id="wrapper">

        <div id="wrapper_video">
            <video id="video_bg" preload="auto" autoplay loop muted>
                <source src="vid/bg_vid.mp4"type="video/mp4" />
<!--					<source src="vid/bg_vid.webm"type="video/webm" />-->
                Your browser does not support the video tag. You need to update your browser or change it :/
            </video>
        </div>

        <noscript>
            <p id="noscript">Oops ! Javascript is desactivated ! Activate it for a full fonctionnal navigation !</p>
        </noscript>

        <header id="header">

        </header>

        <div id="container">
            <section class="page">
                
                <p>Hi ! I'm</p>
                <h1 class="title_page">Corentin FLACH</h1>
                <h2 class="sub_title">a storyteller</h2>
<!--                <h3 class="description">Using the web with videos, developement and communication.</h3>-->
                <p class="scroll_down"><span class="icon-angle-down"></span></p>
                
            </section>
            
            <div class="bonhomme">
                <img src="img/bonhomme.png" />
            </div>
       
        </div>

        <div id="progressBar"></div>
        <footer id="footer">
            <div id="controls">
                <a><span class="icon-signal toggle_sound"></span></a>
                <a class="btn_music" data-music="music/music_jazz.mp3">▲</a>
                <a class="btn_music" data-music="music/music_film.mp3">▼</a>
                <a class="btn_music" data-music="music/music_street.mp3">▲</a>
                <a class="btn_music" data-music="music/music_vacances.mp3">▼</a>
                <a class="btn_music" data-music="music/music_hardrock.mp3">▲</a>
            </div>
        </footer>
        
        <audio id="music">
            <source src="" type="audio/mpeg" />
        </audio>
        
		
	</div>
	
	
	<?php	include('php/footer.php');	?>