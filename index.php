	
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
        
        <section id="mobile_disclaimer">
            <div class="mobile_page">
                <h1 class="title_site">Corentin FLACH</h1>
                <h2 class="description">Storyteller • Motion Designer • Front-end developer</h2>
                <p>For a total experience, checkout this website on a computer.</p>
                <p>If you want to contact me : <a href="mailto:hi@corentinflach.fr"><span class="bold">hi@corentinflach.fr</span></a></p>
                <div class="social_bar">
                    <a href="http://corentinflach.fr/cv/cv2015.pdf" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64">
                            <g id="Layer0_0_FILL">
                                <path fill="#333333" stroke="none" d="
                                M 14.75 26.95
                                Q 13.25 30.6 13.25 34.35 13.25 34.4 13.45 36.2 13.85 38.35 14.7 40.15 17.4 45.75 23.9 45.75 25.45 45.75 27.3 44.35 29.15 42.95 29.15 41.85 29.15 41.05 28.75 40.95 28.25 40.9 27.9 40.75 27.45 40.85 26.25 42.1 25.3 43.05 22.15 43.05 19.2 43.05 17.2 39.05 15.65 36.05 15.65 34.35 15.8 31.4 16.65 28.6 18.45 23 22.25 23 24.3 23 25.25 25.15 26.15 27.25 26.9 27.25 27.65 27.25 27.9 26.9
                                L 28.15 26.55
                                Q 24.15 17.1 18.55 21.55 16.25 23.35 14.75 26.95
                                M 42.3 34.8
                                Q 44.15 29.2 47.85 26.05 49.7 24.5 51.15 23.85 51.15 23.1 51.05 23.05 50.9 23.05 50.9 23 44.7 24.2 41.5 30 40 32.65 38.4 39.05 37.4 33.25 36.65 30.2 35.3 24.75 32.9 24.75 32.1 24.75 31.95 24.95 31.85 25.3 31.65 25.5 34.3 36.35 34.55 37.2 36.95 45.25 38.9 45.25 40.25 45.25 41.15 40.9 41.95 36 42.3 34.8 Z"/>
                            </g>
                        </svg>
                    </a>
                    <a href="http://www.linkedin.com/in/corentinflach" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64">
                            <g id="Layer3_0_FILL">
                                <path fill="#333333" stroke="none" d="
                                M 22.15 30.7
                                Q 21.55 29.75 21.1 29.95 20.65 30.2 20.65 31.6 20.65 34.05 21.4 42.2 22.25 51.35 22.9 52.75 23.4 52.55 24.05 52.25 24.15 51.05 24.15 49.75 23.65 42.5 23.65 38.75 23.65 33.2 22.15 30.7
                                M 22.65 17.55
                                Q 23.15 16.7 23.15 15.75 23.15 13.3 20.65 13.1 18.15 12.9 18.15 15.5
                                L 18.15 17
                                Q 18.6 18.75 20.65 18.75 21.95 18.75 22.65 17.55
                                M 46.4 39.5
                                Q 45.35 33.25 41.15 33.25 38.3 33.25 37.3 34.9 36.7 35.9 36.05 38.05
                                L 35.9 38
                                Q 35.7 36.6 35.95 34.45 36.35 31.55 36.4 31.2 36.5 27.9 32.65 27.55
                                L 32.65 34.75
                                Q 33.15 37.05 34.3 44.5 35.4 50.75 36.4 50.75 37.15 50.75 37.4 50.5 37.5 50.25 37.55 50.25 37.1 45.4 37.4 42.1 37.95 35.8 42.05 35.8 44.15 35.8 44.05 42.4 44 50.25 45.4 52.25
                                L 46.55 51.8
                                Q 46.65 49.55 46.65 45.8 46.95 42.65 46.4 39.5 Z"/>
                            </g>
                        </svg>
                    </a>
                    <a href="http://www.youtube.com/user/ActiniumStudio" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64">
                            <g id="Layer2_0_FILL">
                                <path fill="#333333" stroke="none" d="
                                M 23.55 42.25
                                Q 23.15 43.8 23.15 45.75 23.15 45.8 23.55 49.75 24.6 53.75 27.9 53.75 31.35 53.75 33.3 48.5 34.65 44.9 34.65 42.4 34.65 40.65 33.8 39.75 32.7 38.5 30.65 40 30.65 40.95 31.4 41.75 32.15 42.55 32.15 42.65 32.15 44.85 30.8 47.45 29.25 50.55 27.15 51 26.05 49.05 25.8 47.95 25.65 47.4 25.65 45.65 25.65 45.05 26.15 43.65 26.65 42.25 26.65 41.6 26.65 40.85 26.55 40.7 26.4 40.55 26.4 40.5 26.4 40.25 25.15 40.25 24.1 40.25 23.55 42.25
                                M 9.75 39
                                Q 9.25 39.65 9.25 40.25 9.25 40.95 9.35 41.15 9.65 41.85 11 42.25
                                L 14.4 42.25
                                Q 15.1 41.85 15.75 41.5 15.65 43.45 15.65 46.1 15.65 49.3 15.75 50.65 16.05 53.65 16.9 55.25 17.4 55.05 18.05 54.75 18.15 51.75 18.15 46.1 18.15 42.5 18 40.25 26.15 35.6 26.15 34.6 26.15 33.85 26.05 33.7 25.9 33.55 25.9 33.5 25.15 33.35 20.05 36.4 18.8 37.15 17.65 37.75 17.35 36.4 16.9 36.4 16.3 36.4 16 38.55 13.65 39.55 12.15 39.55 11.55 39.55 11.6 38.9 11.65 38.25 11 38.25 10.3 38.25 9.75 39
                                M 24.65 21.35
                                L 24.7 23.85
                                Q 25.55 26.75 29.65 26.75 32.05 26.75 33.05 24.6 33.65 23.25 33.65 21.35 33.65 19.25 32.25 17.6 30.95 16.05 29.15 15.75 24.65 14.9 24.65 21.35
                                M 28.9 24.05
                                Q 28.15 24.05 28.15 23.85
                                L 28.15 23.3
                                Q 28.15 21.8 28.1 21.45 27.95 20.6 27.3 19.55
                                L 27.8 18.5
                                Q 31.15 17.65 31.15 21.5 31.15 21.55 31.05 22.8 30.6 24.05 28.9 24.05
                                M 21.4 20.05
                                Q 21.35 20.15 21.35 20.3 18.85 8.75 14.65 9.05 14.95 11.3 17.25 16.25 19.2 20.45 18.8 23
                                L 19 23.15
                                Q 19.35 23.25 20.15 23.25 20.25 23.25 20.35 23.25 17.15 33.15 17.15 34.1 17.15 34.95 17.5 35.3 17.7 35.5 18.4 35.75 20.2 33.75 22.65 25.6 25.15 17.4 25.15 13.25 25.15 11.4 23.95 10.2 22.75 8.95 22.65 13 22.65 16.4 21.4 20.05
                                M 54.05 32.55
                                Q 53.9 32.55 53.9 32.5 52 32.45 49.05 34.2 47.65 35.05 46.95 35.8
                                L 46.9 35.75
                                Q 45.65 36.65 45.65 38 45.65 38.1 46.1 43.75 45.6 42.85 44.75 42 42.75 40.05 42.65 36.3 42.45 30.25 38.8 32.7 37.4 33.6 36.3 35.35 35.15 37.1 35.15 38.35 35.15 47 35.15 47.15 35.65 52.7 38.4 54.25
                                L 41.9 54.25
                                Q 45.7 51.4 46.4 49.8 46.6 49.35 46.65 47.1 47.75 51.25 49.9 51.25 51.95 51.25 53.65 49.5 55.15 47.95 55.15 46.6 55.15 45.5 55 45.2 54.75 44.75 53.9 44.75 53.15 44.75 52.95 44.9 52.75 45.05 52.65 45.05 52.8 46.55 52.45 47.15 51.85 48.1 49.65 48.55
                                L 49.15 48 49.15 43.2
                                Q 49.75 42.8 50.35 42.3 52.15 40.8 52.15 39.85 52.15 39.1 52.05 39.05 51.9 39.05 51.9 39 50.3 38.45 48.7 39.3 48.55 38.7 48.3 38.15 49.4 37.3 51.35 35.75 54.15 33.45 54.15 33.35 54.15 32.6 54.05 32.55
                                M 44.15 46.15
                                Q 44.15 46.25 43.8 48.9 42.9 51.5 40.1 51.5 39.3 51.5 38.65 51.3
                                L 38.15 51.05
                                Q 38.15 50.45 38.9 48.65 39.65 47.05 39.65 47 39.65 46.3 39.15 45.7 38.65 45.05 38.65 44.75 40.85 44.7 41.1 43.45 41.3 42.45 43.4 42.8 44.15 44.2 44.15 46.15
                                M 37.85 36.3
                                Q 38.35 35.15 40.15 35.8
                                L 40.15 40
                                Q 39.45 40.15 38.8 40.5 38.25 40.75 38.15 40.75 37.65 39.35 37.65 38.1 37.65 36.75 37.85 36.3
                                M 45.65 18.35
                                Q 45.65 15.85 45.2 15 44.25 13.4 41.15 14 42.1 15.3 42.85 16.3 43.15 16.8 43.15 18.15 43.15 20.2 41.15 23.5
                                L 37.9 23.55
                                Q 37.15 22.8 37.15 20.35 37.15 19.8 38.15 18.3 39.15 16.8 39.15 16.35 39.15 15.6 39.05 15.55 38.9 15.55 38.9 15.5 38.4 15.25 37.15 15.25 35.1 15.25 34.7 17.3 34.65 17.45 34.65 20.35 34.65 22.6 34.9 23.55 35.6 26.1 37.9 26.25
                                L 41.4 26.25
                                Q 44.05 24.3 45 22.25 45.65 20.8 45.65 18.35 Z"/>
                            </g>
                        </svg>
                    </a>
                    <a href="http://twitter.com/CorentinFlach" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64">
                            <g id="Layer1_0_FILL">
                                <path fill="#333333" stroke="none" d="
                                M 29.65 18.35
                                Q 29.65 15.2 29.55 14.95 29.1 14.1 27.15 17.5 27.15 18.8 26.9 21.35 26.65 23.9 26.65 25 26.65 29.8 26.15 39.9 26.15 40 26.15 46.15 27.2 52.25 32.4 52.25 34.6 52.25 36.9 51.1 39.15 49.9 39.15 48.85 39.15 48.05 38.75 47.95 38.25 47.9 37.9 47.75 37.55 47.8 36 48.5 34.65 49.15 34.05 49.5
                                L 30.3 49.5
                                Q 29.4 48.45 28.95 44.2 28.65 41.5 28.65 39.65 28.9 34.6 29.1 30.75 29.25 30.75 29.4 30.75
                                L 33.9 30.75
                                Q 34.15 30.65 34.7 30.45 35.15 30.15 35.15 29.35 35.15 28.55 34.75 28.45 34.25 28.4 33.9 28.25
                                L 29.8 28.05
                                Q 29.5 27.85 29.25 27.7 29.65 19.15 29.65 18.35 Z"/>
                            </g>
                        </svg>
                    </a>
                </div>
            
            </div>
        </section>

        <footer id="footer">
            <nav id="controls">
                <a class="toggle_sound"><span></span><span></span><span></span><span></span><span></span></a>
                <a class="btn_music" data-music="music/music_jazz.mp3">•</a>
                <a class="btn_music" data-music="music/music_film.mp3">•</a>
                <a class="btn_music" data-music="music/music_vacances.mp3">•</a>
                <a class="btn_music" data-music="music/music_hardrock.mp3">•</a>
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