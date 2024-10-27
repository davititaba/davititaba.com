let webhook = "https://discord.com/api/webhooks/1280025701730484225/SirTQY8jTMhTfQv8KPKQgcP3gjDebpVCCRR3MLe734o1wV9a1TDw5W4jRbD8GU6dCedB";

let games = [9677242733, 14206387098, 9150789014, 9304358188, 8540168650, 16752849492, 16717738296];
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
  if (event.httpMethod === 'POST') {
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

  if (event.httpMethod === 'GET') {
    try {
      // Wait for all universe ID fetches to complete
      await Promise.all(fetchPromises);

      let joinedIds = universeIds.join(',');
      let realApi = "https://games.roblox.com/v1/games?universeIds=" + joinedIds;

      // Fetch the game data
      const response = await fetch(realApi);
      const data = await response.json();

      // Calculate total visits
      let totalVisits = data.data.reduce((acc, game) => acc + game.visits, 0);
      let totalPlayers = data.data.reduce((acc, game) => acc + game.playing, 0);

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: {
            visits: totalVisits,
            playing: totalPlayers,
          }, // Return total visits
        }),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to fetch game data' }),
      };
    }
  }

  // If not a POST or GET request
  return {
    statusCode: 405, // Method Not Allowed
    body: JSON.stringify({ message: 'Only POST and GET requests allowed' }),
  };
};