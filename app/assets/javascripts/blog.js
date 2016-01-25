  
// ============================================================================

//==========================  Techie Images ====================//
var imagesPhotography = ['images/alligator.jpg','images/turtles.jpg','images/canoe.jpg'];
document.getElementById('photoPost2img').src  =  imagesPhotography[0]
var i=0;

$('#photoPost2Next').click(function(){
	i++;
	if(i==imagesPhotography.length){
		i=0;
	}
	document.getElementById('photoPost2img').src  =  imagesPhotography[i];
});

$('#photoPost2Previous').click(function(){
	i--;
	if(i<0){
		i=2;
	}
	document.getElementById('photoPost2img').src  =  imagesPhotography[i];
});

