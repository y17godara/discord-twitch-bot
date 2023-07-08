const axios = require("axios");
const { getAccessToken } = require("./getAccessToken");
const { TWITCH_API_BASE_URL, CLIENT_ID } = require("../config");

// Function to fetch stream information from Twitch API
async function fetchStreamInfo(channelName) {
  try {
    const accessToken = await getAccessToken();

    const streamResponse = await axios.get(
      `${TWITCH_API_BASE_URL}/search/channels`,
      {
        params: {
          query: channelName,
        },
        headers: {
          "Client-ID": CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return streamResponse.data.data[0];
  } catch (error) {
    console.error("Error fetching stream information from Twitch API:", error);
    throw new Error("Error fetching stream information");
  }
}

module.exports = fetchStreamInfo;
