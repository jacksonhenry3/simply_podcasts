function customPlayer(src,title,parent)
{
	this.init = function()
	{
		parent.appendChild(this.audioElement)
		parent.appendChild(this.createPlayButton(this.audioElement))
	};

	this.audioElement           = new Audio();
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

var cart = document.createElement('div');
cart.className = 'thing'
document.body.appendChild(cart)

function trackTime (audio) {
	x = audio.currentTime/audio.duration*100.
	cart.style.width = String(x)+'%'
	console.log(String(x))
	
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



google.setOnLoadCallback(initialize);





var audio = new Audio();
					audio.preload = 'none'
					audio.src = episode.audio;

					
					audio.controls = true;
					audio.autoplay = false;

test = document.getElementById('songs')
					test.appendChild(audio);

					