# chromecast-calendar
takes a series of upcoming events (movies and shows), builds an image representation, then uploads those to a google photos album for consumption by a chromecast

fun facts:
 - puppeteer is cool. it's a headless chrome client that can take screenshots of whatever page you load. Works with both local html and from a website (though i was using the former exclusively for this project). Even provides tools to wait for events (like images being loaded, which is kinda important for this). 
 - Some images don't load. maybe a CORS thing? It's only happened once so far, so I'm not super worried about it
 - google node apis are pretty easy to use, so that's nice
 - the provided google api auth logic appears to work for http google photos auth too, even though that's not included as part of those apis. Can't confirm it works end to end, since I stopped exploring google photos once i realized it couldn't meet my needs, but the permissions request dialog definitely showed that it was asking for the photos permissions, so i assume it was actually granting them. 
