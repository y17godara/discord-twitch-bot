const { fetchStreamInfo } = require("./fetchStreamInfo");

// Function to fetch stream title
async function fetchStreamTitle(channelName) {
  try {
    const streamInfo = await fetchStreamInfo(channelName);

    if (streamInfo) {
      return streamInfo.title;
    } else {
      return "Stream not found";
    }
  } catch (error) {
    console.error("Error fetching stream title:", error);
    throw new Error("Error fetching stream title");
  }
}

module.exports = fetchStreamTitle;
