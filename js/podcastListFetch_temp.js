google.setOnLoadCallback(

	function(){
var feeds = ["https://philosophynow.org/podcasts/rss",	"http://www.npr.org/rss/podcast.php?id=510289",	"http://feeds.wnyc.org/radiolab",	'http://superbestfriendsplay.com/?feed=podcast',	"http://feeds.themoth.org/themothpodcast",	'http://feeds.podtrac.com/m2lTaLRx8AWb',	"http://downloads.bbc.co.uk/podcasts/radio4/timc/rss.xml",	"http://www.sciencefriday.com/audio/scifriaudio.xml"]

for (var i = feeds.length - 1; i >= 0; i--) {
	feed = getFeed(feeds[i],50)
	
};
}
);
