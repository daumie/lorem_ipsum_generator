const fs = require("fs");
const loremIpsum = require('lorem-ipsum');

const generateWord = (value, fileContents) => {
  let output = loremIpsum({
    count: value,
    units: 'words'
  });
  return fileContents.replace('{{lorem}}', output);
};

const generateSentence = (value, fileContents) => {
  let output = loremIpsum({
    count: value,
    units: 'sentences',
  });
  return fileContents.replace('{{lorem}}', output);
};

const generateParagraph = (value, fileContents) => {
  let output = loremIpsum({
    count: value,
    units: 'paragraphs',
    format: 'plain'
  });
  return fileContents.replace('{{lorem}}', output);
};


const view = (templateName, values, request, response) => {
	const fileContents = fs.readFileSync('./views/' + templateName + '.html', { encoding: 'utf-8' });
  response.write(fileContents);
};


module.exports.generateWord = generateWord;
module.exports.generateSentence = generateSentence;
module.exports.generateParagraph = generateParagraph;
module.exports.view = view;