window.onload = function(){
	    $.getJSON('https://itunes.apple.com/search?term=hello+internet&entity=podcast', function(data) {
    console.log(data)
});

feedURLList = [
["https://philosophynow.org/podcasts/rss", 'philosophy now'],
["http://www.npr.org/rss/podcast.php?id=510289",'planet money'],
["http://feeds.wnyc.org/radiolab", 'radiolab'],
['http://feeds.podtrac.com/m2lTaLRx8AWb','hello internet'],
["http://downloads.bbc.co.uk/podcasts/radio4/timc/rss.xml",'timc'],
["http://nightvale.libsyn.com/rss",'nightvale'],
["http://www.sciencefriday.com/audio/scifriaudio.xml",'science firday'],
["http://dataskeptic.com/feed.rss","Data Skeptic"]]

list = document.getElementById('podcasts')

for (var i = feedURLList.length - 1; i >= 0; i--) {
	l = document.createElement("li");
	b = document.createElement("a")
	b.href = 'podcast.html'+"#"+feedURLList[i][0]
	b.innerHTML = feedURLList[i][1]
	l.appendChild(b)
	list.appendChild(l)
};}