<?php
if (!(array_key_exists('HTTP_X_REQUESTED_WITH', $_SERVER))){
    include('../php/header.php');
    if(strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        header('Location: ../#/contact'); 
    }
}
$filesize = filesize($_SERVER['SCRIPT_FILENAME']);
header('Content-Length: '.$filesize);
?>
<header>
    <h1 class="title_page">Contact</h1>
</header>
<h2>And it's done, then what ?</h2>
<h3 class="description">Just enjoy the result and stay in touch with people.</h3>
<p>For my study, I'm actually looking for an <span class="bold">internship</span> of six months from <span class="bold">july to december</span>.</p>
<p>Don't hesitate to hire me for only 14k€/month : <a href="mailto:hi@corentinflach.fr"><span class="bold">hi@corentinflach.fr</span></a></p>
<div class="social_bar">
    <a href="http://corentinflach.fr/cv/cv2015.pdf" target="_blank"><span class="icon-linkedin-squared"></span></a>
    <a href="http://www.linkedin.com/in/corentinflach" target="_blank"><span class="icon-linkedin-squared"></span></a>
    <a href="http://www.youtube.com/user/ActiniumStudio" target="_blank"><span class="icon-youtube"></span></a>
    <a href="http://twitter.com/CorentinFlach" target="_blank"><span class="icon-twitter-squared"></span></a>
</div>
<?php
if (!(array_key_exists('HTTP_X_REQUESTED_WITH', $_SERVER))){
    include('../php/footer.php');   
}
?>