let webhook = "https://discord.com/api/webhooks/1280025701730484225/SirTQY8jTMhTfQv8KPKQgcP3gjDebpVCCRR3MLe734o1wV9a1TDw5W4jRbD8GU6dCedB";

let games = [9677242733, 14206387098, 9150789014, 9304358188, 8540168650];
let universeIds = [];
let totalVisits = 0;

let apiUrl = "https://apis.roblox.com/universes/v1/places/";

let fetchPromises = games.map(function (value) {
  let newUrl = apiUrl + value.toString() + "/universe";
  return fetch(newUrl)
    .then(response => response.json())
    .then(data => universeIds.push(data.universeId))
    .catch(error => console.error(error));
});

exports.handler = async (event, context) => {
  // Ensure the request method is POST
  if (event.httpMethod === 'POST') {
    // Parse the body of the POST request
    var message = {
      content: "This nigga got jumpscared @everyone"
    };

    fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
      .then(response => {
        if (response.ok) {
          console.log('Message sent to Discord!');
        } else {
          console.error('Failed to send message to Discord.');
        }
      });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Hello!`
      }),
    };
  }

  if (event.httpMethod == 'GET') {
    Promise.all(fetchPromises)
      .then(function () {
        let joinedIds = universeIds.join(',');
        let realApi = "https://games.roblox.com/v1/games?universeIds=" + joinedIds;
        return fetch(realApi);
      })
      .then(response => response.json())
      .then(data => {
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: data.data.reduce((acc, game) => acc + game.visits, 0),
          }),
        };
      })
      .catch(error => console.error(error));
  }

  // If not a POST request, return an error message
  return {
    statusCode: 405, // Method Not Allowed
    body: JSON.stringify({ message: 'Only POST and GET requests allowed' }),
  };
};