const needle = require('needle');
const breedName = process.argv[2];


const fetchBreedDescription = function(breedName, callback) {
  // Check if breed name is provided
  if (!breedName) {
    return callback('Please provide a breed name.', null);
  }



  const apiUrl = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;

  needle.get(apiUrl, function(error, response) {
    if (error) {
      return callback('Error fetching data:' + error, null);
   
    }

    if (response.statusCode !== 200) {
      return callback('Request failed with status code:' + response.statusCode, null);
    }

    const responseBody = JSON.parse(response.body);
    
    if (responseBody.length === 0) {
      return callback(`Breed '${breedName}' not found.`, null);
    }

    const description = responseBody[0].description;
    callback(description);
  });
};
module.exports = { fetchBreedDescription };