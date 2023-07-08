const { fetchStreamTitle, isChannelLive, fetchStreamGame, fetchStreamLogo } = require("./api/api");
const dotenv = require("dotenv");
dotenv.config();

// commandDispatcher.js
const commandDispatcher = {


  ping: async (interaction) => {
    const ping = Math.round(interaction.client.ws.ping);
    await interaction.reply(`Pong! ${ping}ms`);
  },


  title: async (interaction) => {
    const channelName =
      interaction.options.getString("channel") ||
      process.env.DEFAULT_TWITCH_CHANNEL_NAME;
    const title = await fetchStreamTitle(channelName);
    await interaction.reply({
      content: `${title}`,
    });
  },


  game: async (interaction) => {
    const channelName =
      interaction.options.getString("channel") ||
      process.env.DEFAULT_TWITCH_CHANNEL_NAME;
    const game = await fetchStreamGame(channelName);
    await interaction.reply({
      content: `${game}`,
    });
  },


  logo: async (interaction) => {
    const channelName =
      interaction.options.getString("channel") ||
      process.env.DEFAULT_TWITCH_CHANNEL_NAME;
    const logo = await fetchStreamLogo(channelName);
    await interaction.reply({
      content: `${logo}`,
    });
  },


  islive: async (interaction) => {
    const channelName =
      interaction.options.getString("channel") ||
      process.env.DEFAULT_TWITCH_CHANNEL_NAME;
    const islive = await isChannelLive(channelName);
    if (islive) {
      await interaction.reply({
        content: `Live! :)`,
      });
    } else {
      await interaction.reply({
        content: `Not live :(`,
      });
    }
  },


};

module.exports = commandDispatcher;
