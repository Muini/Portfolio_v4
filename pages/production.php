<?php    
if(strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
    header('Location: ../#/production'); 
}
$filesize = filesize($_SERVER['SCRIPT_FILENAME']);
header('Content-Length: '.$filesize);
?>
                <h2>What about the result ?</h2>
                <h3 class="description">After production time.</h3>
                <p>I can buy some friends with beers to do the work for me but I need to learn to do it myself.</p>
                <p>So here are my actual skills tree, it still growing.</p>