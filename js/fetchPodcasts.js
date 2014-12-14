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

feedURL = "http://www.npr.org/rss/podcast.php?id=510289"

function createCustomFeedArray(feedURL){
	var feed = new google.feeds.Feed(feedURL),
		feedArray = []
	feed.load(
		function(result) 
		{
			if (!result.error){
				for (var i = 0; i < result.feed.entries.length; i++){
					var entry   = result.feed.entries[i],
						episode = {
									audioURL    : getAudio(entry),
									title       : entry.title,
									link        : entry.link,
									description : entry.description
								  }
					feedArray.push(episode)	
				}
			}
		}
	);
	return(feedArray)
}



function customPlayer(src,title,parent)
{
	this.init = function()
	{
	parent.appendChild(this.audioElement)
	parent.appendChild(this.createPlayButton(this.audioElement))
	};
	this.audioElement      = new Audio();
	this.audioElement.src       = src;
	this.audioElement.className = 'player';
	this.audioElement.controls  = false;
	this.audioElement.autoplay  = false;
	this.audioElement.defaultPlaybackRate = 1;
	this.audioElement.load()
	this.createPlayButton  = function(audioElement)
	{
		var playButton = document.createElement('div');
		playButton.className = ' paused';
		playButton.onclick = function () {
			if (audioElement.paused) {
				audioElement.play(); 
				playButton.className = playButton.className.replace("paused","playing")
			}
			else if (!audioElement.paused) 
			{
				audioElement.pause(); 
				playButton.className = playButton.className.replace(" playing"," paused")
			};
		};
		return(playButton)
	};
	this.init()
	return(this.audioElement)
}

function initialize() {
  var feed = new google.feeds.Feed("http://feeds.wnyc.org/radiolab");
	feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
  feed.load(function(result) {
    if (!result.error) {
      var container = document.getElementById("feed");
      for (var i = 0; i < result.feed.entries.length; i++) {
        var entry = result.feed.entries[i];
        // console.log(getAudio(entry))

        // Create an <audio> element dynamically.
		var audio = new customPlayer(getAudio(entry),entry.title,container)
		
		if (i===0)
		{
			window.setInterval(function(){trackTime(audio)},60)
		}
      }
    }
  });
}

var cart = document.createElement('div');
cart.className = 'thing'
document.body.appendChild(cart)

function trackTime (audio) {
	x = audio.currentTime/audio.duration*100.
	cart.style.width = String(x)+'%'
	console.log(String(x))
	
}

google.setOnLoadCallback(initialize);