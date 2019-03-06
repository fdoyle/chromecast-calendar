const retriever = require("./eventsRetriever");
const imageGenerator = require("./imageGenerator");
const authenticator = require("./authenticator");

//authenticate
authenticator.authenticate((auth)=>{
    //read from google calendar
    retriever.getUpcomingEvents(auth, (eventList)=>{
        const imagePromiseList = eventList.map(async (event)=>{
            console.log(`${event.title} - ${event.date} - ${event.imageUrl}`);
            return imageGenerator.generateImage(event.title, event.date, event.imageUrl);
        });
        Promise.all(imagePromiseList).then((values)=>{
            console.log(values);
        })
    });
})


//read from google calendar




//clear existing album

//upload images to album