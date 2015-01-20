<?php    
if(strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
    header('Location: ../#/home'); 
}
$filesize = filesize($_SERVER['SCRIPT_FILENAME']);
header('Content-Length: '.$filesize);
?>
                <p>Hi ! I'm</p>
                <h1 class="title_page">Corentin FLACH</h1>
                <h2 class="sub_title">a storyteller</h2>
                <p class="scroll_down"><span class="icon-angle-down"></span></p>