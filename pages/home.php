<?php
if (!(array_key_exists('HTTP_X_REQUESTED_WITH', $_SERVER))){
    include('../php/header.php');
    if(strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        header('Location: ../#/home'); 
    }
}
$filesize = filesize($_SERVER['SCRIPT_FILENAME']);
header('Content-Length: '.$filesize);
?>
                <p>Hi ! I'm</p>
                <h1 class="title_site">Corentin FLACH</h1>
                <h2 class="sub_title">a storyteller</h2>
                <p class="scroll_down"><span class="icon-angle-down" onclick="portfolio.nextPage();"></span></p>
<?php
if (!(array_key_exists('HTTP_X_REQUESTED_WITH', $_SERVER))){
    include('../php/footer.php');   
}
?>