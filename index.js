const fs = require('fs');
const process = require('process');
const request = require('request');

const searchTerm = process.argv[2];

if (!searchTerm) {
  console.log('Please provide a search term."programming"');
  process.exit(1);
}

const apiUrl = `http://icanhazdadjoke.com/search?term=${encodeURIComponent(searchTerm)}`;

request({ url: apiUrl, headers: { Accept: 'application/json' } }, (error, response, body) => {
  if (error) {
    console.error('Error connecting to the joke API:', error);
    process.exit(1);
  }

  const jokeData = JSON.parse(body);

  if (jokeData.total_jokes > 0) {
    const randomJoke = jokeData.results[Math.floor(Math.random() * jokeData.results.length)].joke;
    console.log('Here is a joke for you:\n', randomJoke);

    fs.appendFile('jokes.txt', `\n${randomJoke}\n`, (err) => {
      if (err) {
        console.error('Error saving joke to file:', err);
      } else {
        console.log('Joke saved to jokes.txt!');
      }
    });
  } else {
    console.log('joke gods are taking a day off!');
  }
});


