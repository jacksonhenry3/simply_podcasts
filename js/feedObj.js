function getAudio(feedEpisodeObj){
	test = feedEpisodeObj.xmlNode.getElementsByTagName("enclosure")
	for (var i in test)
	{
		if (typeof(test[i]) === 'object')
		{
			if (test[i].getAttribute('type').indexOf('audio') != -1)
			{
				audioUrl = test[i].getAttribute("url")
				return(audioUrl)
			}
		}
	}
}

function getFeedImage(feed){
	test = feed.xmlDocument.getElementsByTagName("image")
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
	this.getEpisodes = function() 
		{
			episodes = []
			if (!feed.error){
				for (var i = 0; i < feed.feed.entries.length; i++){
					var entry   = feed.feed.entries[i];
						episode = {
									audio       : getAudio(entry),
									title       : entry.title,
									author      : entry.author,
									link        : entry.link,
									description : entry.content
								  }
					episodes.push(episode)					
				}
			}
			return(episodes)
		}

	this.image = getFeedImage(feed)
	this.description = feed.feed.description
	this.link = feed.feed.link
	this.episodes = this.getEpisodes(feed)	
}