var authenticator = require("./authenticator");
const request = require('request');
const fs = require('fs');

const chromecastAlbumId = "AA8Wy_NP2yPIgxTTu-rH4OXn8qO-LKw-oF6Y7DYBqXtdY1iGo-o8x5psSRoS04JYvNVJuCE90p1x";


// authenticator.authenticate(function (auth) {
//     // console.log(JSON.stringify(auth, null, 2));
//     uploadPhoto(auth);
//     // listAlbums(auth);
//     // createAlbum(auth);
// })

function getDefaultHeadersForAuth(auth) {
    return {
        'Authorization': `Bearer ${auth.credentials.access_token}`,
    }
}

function createAlbum(auth) {
    request.post({
        url: "https://photoslibrary.googleapis.com/v1/albums?title='Auto Chromecast Events'",
        headers: getDefaultHeadersForAuth(auth),
        json: {
            "album": {
                "title": "Auto Chromecast Events"
            }
        }
    }, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('failed:', err);
        }
        console.log('Success!', body);
    })
}

exports.uploadPhoto = uploadPhoto;

function uploadPhoto(auth, filename, path) {
    console.log(`preparing to upload ${filename}`)
    request.post({
        url: "https://photoslibrary.googleapis.com/v1/uploads",
        body: fs.createReadStream(__dirname + "/" + path),
        headers: {
            'Authorization': `Bearer ${auth.credentials.access_token}`,
            'Content-type': 'application/octet-stream',
            'X-Goog-Upload-File-Name': filename,
            'X-Goog-Upload-Protocol': 'raw',

        }
    }, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  id: ', body);
        setPhotoAsMediaObject(auth, body);
    })
}

function listAlbums(auth) {
    request({
        url: 'https://photoslibrary.googleapis.com/v1/albums',
        headers: {
            'Authorization': `Bearer ${auth.credentials.access_token}`,

        }
    }, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('response: ', JSON.stringify(JSON.parse(body), null, 2));
    })
}

function setPhotoAsMediaObject(auth, id) {


    request.post({
        url: "https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate",
        headers: {
            'Authorization': `Bearer ${auth.credentials.access_token}`,
            'Content-type': 'application/json',
        },
        json: {
            'albumId': chromecastAlbumId,
            'newMediaItems': [{
                'description': "lemongrab",
                'simpleMediaItem': {
                    'uploadToken': id
                }
            }]
        }

    }, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('media item set successfully!  body: ', JSON.stringify(body, null, 2));

    })
}