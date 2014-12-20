google.load("feeds", "1");

function init()
{
	feed = getFeed(feedURL,100)
}

function getFeed(feedUrl,numEpisodes)
{
	var feed = new google.feeds.Feed(feedURL);
	feed.includeHistoricalEntries();
	feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
	feed.setNumEntries(numEpisodes);

	var myFeed;

	feed.load(function(result){
		myFeed = new customFeed(result);

		// code that works with the feed goes here



	})
};


var feedURL = "https://philosophynow.org/podcasts/rss",
	feedURL = "http://www.npr.org/rss/podcast.php?id=510289",
	feedURL = "http://feeds.wnyc.org/radiolab",
	feedURL = 'http://superbestfriendsplay.com/?feed=podcast',
	feedURL = "http://feeds.themoth.org/themothpodcast",
	feedURL = 'http://feeds.podtrac.com/m2lTaLRx8AWb',
	feedURL = "http://downloads.bbc.co.uk/podcasts/radio4/timc/rss.xml";


google.setOnLoadCallback(init);