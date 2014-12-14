google.load("feeds", "1");

function getAudio(feedEpisodeObj){
	test = feedEpisodeObj.xmlNode.getElementsByTagName("enclosure")
	for (var i in test)
	{
		if (test[i].getAttribute('type').indexOf('audio') != -1)
		{
			audioUrl = test[i].getAttribute("url")
			return(audioUrl)
		}
	}
}

function getFeedImage(feedEpisodeObj){
	test = feedEpisodeObj.xmlDocument.getElementsByTagName("image")
	console.log(feedEpisodeObj.xmlDocument)
	for (var i in test)
	{
		l = test.length
		imageUrl = test[l-i-1].getAttribute('href')
		if (imageUrl.indexOf('png') != -1 || imageUrl.indexOf('jpg') != -1)
		{
			return(imageUrl)
		}
	}
}


function customFeed(feed){
	this.image = 'images/space.jpg'
	this.image = getFeedImage(feed)
	this.description = feed.feed.description
	this.link = feed.feed.link
	
	this.getEpisodes = function() 
		{
			episodes = []
			if (!feed.error){
				for (var i = 0; i < feed.feed.entries.length; i++){
					var entry   = feed.feed.entries[i],
						episode = {
									audio       : getAudio(entry),
									title       : entry.title,
									author      : entry.author,
									link        : entry.link,
									description : entry.content
								  }						
					episodes.push(episode)	
					var audio = new Audio();
					audio.preload = 'none'
					audio.src = episode.audio;

					
					audio.controls = true;
					audio.autoplay = false;


					document.body.appendChild(audio);
				}
			}
			return(episodes)
		}

	this.episodes = this.getEpisodes(feed)

	console.log(this.image)
	document.body.style.backgroundImage="url('"+this.image+"')"
	document.body.style.backgroundSize = "100%"
	document.body.style.backgroundRepeat = "no-repeat"

	
}


google.setOnLoadCallback(function(){

function getFeed(feedUrl,numEpisodes)
{
	var feed = new google.feeds.Feed(feedURL);
	feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
	feed.setNumEntries(numEpisodes);
	var a;

	feed.load(function(result){
		a = new customFeed(result)
		console.log(a)
	})
    
}
feedURL = "https://philosophynow.org/podcasts/rss"
feedURL = "http://www.npr.org/rss/podcast.php?id=510289"
feedURL = "http://feeds.wnyc.org/radiolab";
feedURL = 'http://superbestfriendsplay.com/?feed=podcast'
feedURL = "http://feeds.themoth.org/themothpodcast"
feedURL = 'http://feeds.podtrac.com/m2lTaLRx8AWb'


feed = getFeed(feedURL,10)


});