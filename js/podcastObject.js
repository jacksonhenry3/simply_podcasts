google.load("feeds", "1");

function podcast(url)
{
	var self = this

	self.init = function(result)
	{

		self.feed        = result.feed
		self.xml         = result.xmlDocument
		self.description = self.feed.description
		self.link        = self.feed.link
		self.title       = self.feed.title
		self.getImageURL()
		self.getEpisodes()
	}

	self.getImageURL = function()
	{
		podcastImages = self.xml.getElementsByTagName("image")
		for (var i = podcastImages.length - 1; i >= 0; i--) {
			imageURL = podcastImages[i].getAttribute('href')
			if (imageURL.indexOf('png') != -1 || imageURL.indexOf('jpg') != -1)
			{
				self.imageURL = imageURL
			}
		}
	}

	self.getEpisodes = function() 
	{
		episodes = []
		
		for (var i = 0; i < self.feed.entries.length; i++)
		{
			var episodeXML   = self.feed.entries[i];
			ep = new episode(episodeXML)
			episodes.push(ep)	
			console.log(ep)				
		}
		self.episodes = episode
	}

	feed = new google.feeds.Feed(url);
	// feed.includeHistoricalEntries();
	feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
	// feed.setNumEntries(numEpisodes);
	feed.load(function(result){self.init(result)})
}

function episode(episodeXML)
{
	self = this

	self.init = function()
	{
		self.getAudioURL(episodeXML)
		self.title       = episodeXML.title
		self.description = episodeXML.description
		self.link        = episodeXML.link
		self.description = episodeXML.content
		self.podcast     = episodeXML.author
	}
	
	self.getAudioURL = function(episodeXML)
	{
		enclosures = episodeXML.xmlNode.getElementsByTagName("enclosure")
		for (var i in enclosures)
		{
			if (typeof(enclosures[i]) === 'object')
			{
				if (enclosures[i].getAttribute('type').indexOf('audio') != -1)
				{
					this.audioURL = enclosures[i].getAttribute("url")
				}
			}
		}
	}

	self.play = function(audioElement)
	{

	}

	self.init()
}

function podcastSearchList(arg)
{
	console.log(arg)
}

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

var xhr

$(document).keypress(function(e) {
	if(e.which == 13) {
		querry = document.getElementById("rssInput").value.replace(/ /g,"+");
		querry = querry.concat("&entity=podcast")
		querry = "http://itunes.apple.com/search?term=".concat(querry)
		querry = querry.concat("&callback=goToPodcast")
		console.log(querry)
		$.ajax({
  url: querry,
  dataType: "jsonp"
},function(){console.log(data)});
		// console.log("creating CORS request")
		// xhr = createCORSRequest("GET",querry)
		// console.log("Request loading")
		// xhr.onloadstart = function(){console.log("BUTS")}
		// xhr.onload = function()
		// {	
		// 	console.log("LOADED")
  //   		var text = xhr.responseText;
  //   		var title = getTitle(text);
  //  			alert('Response from CORS request to ' + url + ': ' + title);
  // 		};
		// $.getJSON(querry)//, function(data) {
		//window.location.href = "podcast.html#"+data.results[0].feedUrl
		//});

		// bObj = new JSONscriptRequest(querry);
		// bObj.buildScriptTag();
		// bObj.addScriptTag();
		
	}
});