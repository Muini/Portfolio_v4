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