const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  CLIENT_ID: process.env.TWITCH_CLIENT_ID,
  CLIENT_SECRET: process.env.TWITCH_CLIENT_SECRET,
  TWITCH_API_BASE_URL: "https://api.twitch.tv/helix",
};
