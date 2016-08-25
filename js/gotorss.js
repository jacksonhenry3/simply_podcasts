$(document).keypress(function(e) {
    if(e.which == 13) {
    	querry = document.getElementById("rssInput").value.replace(/ /g,"+");
        querry = querry.concat("&entity=podcast")
        querry = "https://itunes.apple.com/search?term=".concat(querry)
        $.getJSON(querry, function(data) {
    	window.location.href = "podcast.html#"+data.results[0].feedUrl
		});
        
    }
});



