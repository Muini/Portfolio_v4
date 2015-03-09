<?php    
if(strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
    header('Location: ../#/howto'); 
}
$filesize = filesize($_SERVER['SCRIPT_FILENAME']);
header('Content-Length: '.$filesize);
?>
<header>
    <h1 class="title_page">How to ?</h1>
</header>
<h2>How do I tell a story ?</h2>
<h3 class="description">I'm using 3 main tools</h3>
<div class="important_words">
    <span><img src="./img/howto/dev.png" alt /><h4 class="blue">Developement</h4></span>
    <span><img src="./img/howto/videos.png" alt /><h4 class="red">Videos</h4></span>
    <span><img src="./img/howto/communication.png" alt /><h4 class="green">Communication</h4></span>
</div>