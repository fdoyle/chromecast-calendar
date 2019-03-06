
const {
    google
} = require('googleapis');

const {
    parse
} = require('node-html-parser');


exports.getUpcomingEvents = function (auth, callback) {
    const calendar = google.calendar({
        version: 'v3',
        auth
    });
    calendar.events.list({
        calendarId: 'qpjbtr5216iard3pecokps24h4@group.calendar.google.com',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
    }, (err, res) => {
        if (err) return console.log("The api returned an error: " + err)
        const events = res.data.items;
        console.log("upcoming events");
        const eventList = events.map((event, i) => {
            const start = event.start.dateTime || event.start.date;
            const root = parse(event.description); // google calendar autoformats this to html, so all urls become anchors
            imageUrl = root.querySelector('a').text; //take the first anchor, assume it's our image
            console.log(JSON.stringify(event));
            return {
                date: start,
                title: event.summary,
                imageUrl: imageUrl,
            }
        });
        callback(eventList)
    });
}