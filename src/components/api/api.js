// api.js
const axios = require("axios");
const { CLIENT_SECRET, CLIENT_ID } = require("./config");

let twitchOAuthToken = null;
let tokenExpiration = 0;

const streamDataCache = new Map();
const cacheDuration = 2 * 60 * 1000; // 2 minutes

const getTwitchOAuthToken = async () => {
  if (twitchOAuthToken && Date.now() < tokenExpiration) {
    return twitchOAuthToken;
  }

  const url = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`;

  try {
    const response = await axios.post(url);
    twitchOAuthToken = response.data.access_token;
    tokenExpiration = Date.now() + response.data.expires_in * 1000;
    return twitchOAuthToken;
  } catch (error) {
    console.error("Failed to retrieve Twitch OAuth token:", error);
    throw new Error("Failed to retrieve Twitch OAuth token");
  }
};

const fetchStreamData = async (channelName) => {
  if (streamDataCache.has(channelName)) {
    return streamDataCache.get(channelName);
  }

  try {
    const token = await getTwitchOAuthToken();
    const url = `https://api.twitch.tv/helix/search/channels?query=${channelName}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Client-Id": CLIENT_ID,
      },
    });

    const streamData = response.data.data[0];
    streamDataCache.set(channelName, streamData);
    setTimeout(() => {
      streamDataCache.delete(channelName);
    }, cacheDuration);

    return streamData;
  } catch (error) {
    console.error("Failed to fetch stream data:", error);
    throw new Error("Failed to fetch stream data");
  }
};

const fetchStreamTitle = async (channelName) => {
  try {
    const { title } = await fetchStreamData(channelName);
    return title;
  } catch (error) {
    console.error("Failed to fetch stream title:", error);
    throw new Error("Failed to fetch stream title");
  }
};

const fetchStreamGame = async (channelName) => {
  try {
    const { game_name } = await fetchStreamData(channelName);
    return game_name;
  } catch (error) {
    console.error("Failed to fetch stream game:", error);
    throw new Error("Failed to fetch stream game");
  }
};

const isChannelLive = async (channelName) => {
  try {
    const { is_live } = await fetchStreamData(channelName);
    return is_live;
  } catch (error) {
    console.error("Failed to check if channel is live:", error);
    throw new Error("Failed to check if channel is live");
  }
};

module.exports = {
  fetchStreamTitle,
  fetchStreamGame,
  isChannelLive,
};
