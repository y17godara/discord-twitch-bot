const { fetchStreamInfo } = require("./fetchStreamInfo");

// Function to check if a channel is live
async function isChannelLive(channelName) {
  try {
    const streamInfo = await fetchStreamInfo(channelName);

    if (streamInfo) {
      return streamInfo.is_live;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking if channel is live:", error);
    throw new Error("Error checking if channel is live");
  }
}

module.exports = isChannelLive;
