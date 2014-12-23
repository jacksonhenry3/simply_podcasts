// add space bar pause

google.load("feeds", "1");

function init()
{
	feed = getFeed(feedURL,50)
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

		a = document.getElementById('coverArt')
		a.style.backgroundImage = "url('"+myFeed.image+"')"

		b = document.getElementById('description')

		writeArrayToList(myFeed.episodes)
		// b.style.textAlign = 'center';

		// add click to view full description
		//add way to cut off at nearest sentance
		//add way to not have ... if full description included
		b.innerHTML = "<h3 style = 'text-align:center;margin:0px;margin-bottom:5px;'>"+myFeed.title+"</h3><p>"+myFeed.description.slice(0,200)+"...</p>"

		// code that works with the feed goes here



	})
};


// var feedURL = "https://philosophynow.org/podcasts/rss",
	feedURL = "http://www.npr.org/rss/podcast.php?id=510289";
	// feedURL = "http://feeds.wnyc.org/radiolab";
	// feedURL = 'http://superbestfriendsplay.com/?feed=podcast';
	// feedURL = "http://feeds.themoth.org/themothpodcast";
	feedURL = 'http://feeds.podtrac.com/m2lTaLRx8AWb';
	// feedURL = "http://downloads.bbc.co.uk/podcasts/radio4/timc/rss.xml";

// feedURL = "http://www.sciencefriday.com/audio/scifriaudio.xml"
google.setOnLoadCallback(init);

function writeArrayToList(array){
    var items = document.getElementById("songs");

    for (var i = 0; i < array.length; i++ ) {
        var item = document.createElement("li");
        item.innerHTML = array[i].title;
        function setSrc()
        {
        	console.log(this)
        	p.src = array[this.dataset.number].audio;
        	p.play();
        }
        item.onclick = setSrc
        item.dataset.number = i
        items.appendChild(item);
    }
    // return items
}


window.onload = function()
{
player = document.getElementById('player')

p = new Audio();
p.controls = true
player.appendChild(p)
	window.onscroll = function () { 
	b = document.getElementById('row1')

  	a = document.getElementById('coverArt')
  	a.style.top = (window.scrollY/2)+"px"

   }; 

}

