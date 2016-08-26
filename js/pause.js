// Allows pausing and unpausing of the current source iwht space

$(document).keypress(function(e) {
	if(e.which == 32) {
		if (!p.paused)
		{
			p.pause()
		}
		else
		{
			p.play()
		};
		// stops the webpage from scrolling when space is hit
		e.preventDefault();
	}
});
