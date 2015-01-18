        <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
        <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
		<script type="text/javascript">
		if( document.innerWidth<960 )
        {
            console.log("Version Mobile");
        }
		</script>
		<script type="text/javascript" src="js/prototype.js"></script>
		<script type="text/javascript">
			//Konami Code Powa !
			$(function(){
			var kKeys = [];
			function Kpress(e){
				kKeys.push(e.keyCode);
				if (kKeys.toString().indexOf("38,38,40,40,37,39,37,39,66,65") >= 0) {
					//$(this).unbind('keydown', Kpress);
					kKeys = [];
					zboub();
				}
			}
			$(document).keydown(Kpress);
			});
			function zboub(){
				$('#wrapper').toggleClass('yolo');
			}
		</script>
	</body>
</html>