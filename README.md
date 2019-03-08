# chromecast-calendar
takes a series of upcoming events (movies and shows), builds an image representation, then uploads those to a google photos album for consumption by a chromecast

I currently have this running hourly on a raspberry pi. Just add to the calendar and it'll pick up new events.

fun facts:
 - puppeteer is cool. it's a headless chrome client that can take screenshots of whatever page you load. Works with both local html and from a website (though i was using the former exclusively for this project). Even provides tools to wait for events (like images being loaded, which is kinda important for this). 
 - Some images don't load. maybe a CORS thing? It's only happened for one image so far (out of 6-7), so I'm not super worried about it
 - google node apis are pretty easy to use, so that's nice
 - the provided google api auth logic works for http google photos auth too, even though that's not included as part of those apis.
 
 todo:
  fix the weird mix of promises callbacks and async/await code. it works fine as-is, but it's kinda unpleasant. 
