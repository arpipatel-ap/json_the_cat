const needle = require('needle');
const breedName = process.argv[2];


if (!breedName) {
  console.error('Please provide a breed name.');
  process.exit(1);
}


const apiUrl = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;

needle.get(apiUrl, function(error, response) {
  if (error) {
    console.error('Error fetching data:', error);
    process.exit(1); // Exit with error
  }

  if (response.statusCode !== 200) {
    console.error('Request failed with status code:', response.statusCode);
    process.exit(1); // Exit with error
  }

  const responseBody = JSON.parse(response.body);

    
  if (responseBody.length === 0) {
    console.log(`Breed '${breedName}' not found.`);
    process.exit(0); // Exit successfully
  }

  const description = responseBody[0].description;
  console.log(description);
});
