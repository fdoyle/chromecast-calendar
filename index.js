const retriever = require("./eventsRetriever");
const imageGenerator = require("./imageGenerator");
const authenticator = require("./authenticator");
const photoUploader = require("./photoUploader");

//authenticate
authenticator.authenticate((auth)=>{
    //read from google calendar
    retriever.getUpcomingEvents(auth, (eventList)=>{
        const imagePromiseList = eventList.map(async (event)=>{
            console.log(`${event.title} - ${event.date} - ${event.imageUrl}`);
            return imageGenerator.generateImage(event.title, event.date, event.imageUrl);
        });
        Promise.all(imagePromiseList).then((items)=>{
            items.forEach((item)=>{
                photoUploader.uploadPhoto(auth, item.filename, item.path);
            })
        })
    });
})