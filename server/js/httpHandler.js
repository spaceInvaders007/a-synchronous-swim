const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');


// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

var moves = ['up', 'down', 'left', 'right'];

module.exports.router = (req, res, next = ()=>{}) => {
  if (req.method === 'GET') {
    // var commandToSend = moves[Math.floor(Math.random()*moves.length).toString()];
    // res.writeHead(200, headers);
    // res.end(commandToSend);

  }
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);
  res.end();
};

// module.exports.get = ('/', function (req, res) {
//   res.send(
//     console.log('you just did a get request')
//     // var commands = ['up','down', 'left', 'right]
//     //create a function that sends a random command between ('up', 'down', 'left', 'right')
//   )
// })
// module.exports.get = ('/', (req, res) => {
//   res.on('end', () => {
//     console.log('No more data in response.');
//   });
// });