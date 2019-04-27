const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const queue = require('./messageQueue');


// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

module.exports.router = (req, res, next = ()=>{}) => {
//  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }
  if (req.method === 'GET') {
    if (req.url === '/') {
      res.writeHead(200, headers);
      res.write(queue.dequeue() || '');
      res.end();
      }

    if (req.url === '/background.jpg') {
      let { backgroundImageFile } = module.exports.backgroundImageFile;
      fs.readFile(backgroundImageFile, (err, fileData) => {
        if(err) {
          res.writeHead(404, headers);
          } else {
            res.writeHead(200, {
              'Content-Type': 'image/jpg',
              'Conent-Length': fileData.length
            });
          }
        })
      }
    }

  if(req.method === 'POST' && req.url === '/background.jpg'){
    var imageData = Buffer.alloc(0);

    req.on('data', (chunk) => {
      imageData = Buffer.concat([imageData, chunk]);
    });

    req.on('end', () => {
      var file = multipart.getFile(imageData);
      fs.writeFile(module.exports.backgroundImageFile, file.data, (err) => {
        res.writeHead(err ? 400 : 201, headers);
        res.end();
        next();
      });
    });
  }

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