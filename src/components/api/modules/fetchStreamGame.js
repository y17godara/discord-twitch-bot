const { fetchStreamInfo } = require("./fetchStreamInfo");

// Function to fetch stream Game
async function fetchStreamGame(channelName) {
  try {
    const streamInfo = await fetchStreamInfo(channelName);

    if (streamInfo) {
      return streamInfo.game_name;
    } else {
      return "Stream not found";
    }
  } catch (error) {
    console.error("Error fetching stream Game:", error);
    throw new Error("Error fetching stream Game");
  }
}

module.exports = fetchStreamGame;
