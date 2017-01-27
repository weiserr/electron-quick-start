const PouchDB = require('pouchdb-browser');
const blobUtil = require('blob-util');

// Destroy the database before doing anything, because I want 
// you to see the same thing if you reload.
// Ignore the man behind the curtain!

new PouchDB('sample').destroy().then(function () {
  return new PouchDB('sample');
}).then(function (db) {
  
  //
  // IMPORTANT CODE STARTS HERE
  //
  
  var display = document.getElementById('display');
  var catImage = document.getElementById('cat');
  
  // we're using blobUtil because it actually works cross-browser
  // blob-util is here: https://github.com/nolanlawson/blob-util
  blobUtil.imgSrcToBlob(catImage.src).then(function (blob) {
    document.getElementById('display').innerHTML = 'Read the content of the img as a blob of size ' + blob.size; 
    return db.putAttachment('meowth', 'meowth.png', blob, 'image/png');
  }).then(function () {
     return db.get('meowth', {attachments: true, binary: false});
  }).then(function (doc) {
    display.innerHTML += '\nGot our doc with an attachment! It looks like this: ' + JSON.stringify(doc);
    display.innerHTML += '\nAnd the base64-encoded content of the image is this: ' + JSON.stringify(doc._attachments['meowth.png'].data);
    return db.getAttachment('meowth', 'meowth.png');
  }).then(function (blob) {
    var url = URL.createObjectURL(blob);
    var img = document.createElement('img');
    img.src = url;
    document.body.appendChild(img);
    display.innerHTML += "\nThe second image is our stored blob, after reading it out of the database.";
  });
});