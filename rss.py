import feedparser

python_wiki_rss_url = "http://www.python.org/cgi-bin/moinmoin/RecentChanges?action=rss_rc"
 
feed = feedparser.parse( python_wiki_rss_url )