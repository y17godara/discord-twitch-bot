const axios = require("axios");
const { CLIENT_ID, CLIENT_SECRET } = require("../config");

// Function to fetch Twitch access token
async function getAccessToken() {
  try {
    const tokenResponse = await axios.post(
      "https://id.twitch.tv/oauth2/token",
      null,
      {
        params: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: "client_credentials",
        },
      }
    );

    return tokenResponse.data.access_token;
  } catch (error) {
    console.error("Error fetching Twitch access token:", error);
    throw new Error("Error fetching Twitch access token");
  }
}

module.exports = getAccessToken;
