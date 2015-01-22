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
<h3 class="description">I'm using 3 main tools : <span class="important_word">Videos</span>, <span class="important_word">Developement</span> and <span class="important_word">Communication</span>.</h3>