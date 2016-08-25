$(document).keypress(function(e) {
    if(e.which == 13) {
        window.location.href = "podcast.html#"+document.getElementById("rssInput").value
    }
});