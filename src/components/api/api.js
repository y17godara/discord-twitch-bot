// api.js
const axios = require("axios");
const { CLIENT_SECRET, CLIENT_ID } = require("./config");


const getTwitchOAuthToken = async () => {

  const url = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`;

  try {
    const response = await axios.post(url);
    const twitchOAuthToken = response.data.access_token;
    return twitchOAuthToken;
  } catch (error) {
    console.error("Failed to retrieve Twitch OAuth token:", error);
    throw new Error("Failed to retrieve Twitch OAuth token");
  }
};

const fetchStreamData = async (channelName) => {

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

const fetchStreamLogo = async (channelName) => {
  try {
    const { thumbnail_url } = await fetchStreamData(channelName);
    return thumbnail_url;
  } catch (error) {
    console.error("Failed to fetch stream thumbnail:", error);
    throw new Error("Failed to fetch stream thumbnail");
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
  fetchStreamLogo,
  isChannelLive,
};
