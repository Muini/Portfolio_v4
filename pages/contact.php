<?php    
if(strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
    header('Location: ../#/contact'); 
}
$filesize = filesize($_SERVER['SCRIPT_FILENAME']);
header('Content-Length: '.$filesize);
?>
<header>
    <h1 class="title_page">Contact</h1>
</header>
<h2>Wow, it's done, then what ?</h2>
<h3 class="description">When it’s done, you will have to stay in touch with people. It’s the best moment of the project </h3>
<p>I'm actually looking for an internship of six months from july to december.</p>
<div class="social_bar">
    <p>corentinflach@gmail.com</p>
    <a href="http://twitter.com/CorentinFlach" target="_blank"><span class="icon-twitter-squared"></span></a>
    <a href="http://www.youtube.com/user/ActiniumStudio" target="_blank"><span class="icon-youtube"></span></a>
    <a href="http://www.linkedin.com/in/corentinflach" target="_blank"><span class="icon-linkedin-squared"></span></a>
    <a href="http://plus.google.com/+CorentinFlach" rel="author" target="_blank"><span class="icon-gplus-squared"></span></a>
</div>