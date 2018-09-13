const querystring = require('querystring');
const fs = require('fs');
const render = require('./render.js');

const header = (request, response) => {
  if (request.url === '/') {
    if (request.method === "GET") {
      response.writeHead(200, { 'content-Type': 'text/html' });
      render.view('index', {}, request, response);
      response.end();
    } else {
      let requestBody = '';
      // Receive data from the form
      request.on('data', (data) => {
        requestBody += data;
      });
      request.on('end', () => {

        let formData = querystring.parse(requestBody);
        let fileContents = fs.readFileSync('./views/index.html', { encoding: 'utf-8' });

        if (formData.selected === '1') {
          fileContents = render.generateWord(formData.number, fileContents);
        }else if (formData.selected === '2') {
          fileContents = render.generateSentence(formData.number, fileContents);
        }else if (formData.selected === '3') {
          fileContents = render.generateParagraph(formData.number, fileContents);
        }

        response.writeHead(200, { 'content-Type': 'text/html' });
        render.view('index', {}, request, response);
        response.write(fileContents);
        response.end();
      });

    }
  }
};

module.exports.header = header;