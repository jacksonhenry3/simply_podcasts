google.load("feeds", "1");

function podcast(url,callback)
{
	var self = this

	self.init = function(result)
	{

		self.feed        = result.feed
		self.xml         = result.xmlDocument
		self.description = self.feed.description
		self.link        = self.feed.link
		self.title       = self.feed.title
		self.feedUrl     = self.feed.feedUrl
		// self.getImageURL()
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
			// console.log(ep)				
		}
		self.episodes = episode
	}

	feed = new google.feeds.Feed(url);
	// feed.includeHistoricalEntries();
	feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
	// feed.setNumEntries(numEpisodes);
	feed.load(function(result){self.init(result)

		typeof callback === 'function' && callback(self);
		})
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

$(document).keypress(function(e)
{
	if(e.which == 13)
	{
		querry = document.getElementById("rssInput").value.replace(/ /g,"+");
		querry = querry.concat("&entity=podcast")
		querry = "http://itunes.apple.com/search?term=".concat(querry)
		querry = querry.concat("&callback=goToPodcast")

		request = $.ajax({url: querry, dataType: "jsonp"});

		var list = document.createElement('ol');
		list.id = 'songs'

		request.done(function(data)
		{
			// console.log(data)
			results = data.results
			for (var i = 0; i <= results.length-1; i++)
			{
				p = new podcast(results[i].feedUrl,function(p){
				

				var item       = document.createElement('li'),
				link           = document.createElement('a');

				link.setAttribute("href","podcast.html#"+p.feedUrl);

				link.innerHTML = p.title
				item.append(link)
				// item.appendChild(document.createTextNode(results[i].trackName));
				list.appendChild(item);
				// };
				})
			}

			// $("#searchContainer").html('')
			$("#searchContainer").find('ol').remove();
			$("#searchContainer").append(list)
		})
	}
});
