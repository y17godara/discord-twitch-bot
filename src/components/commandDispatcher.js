const { fetchStreamTitle, isChannelLive, fetchStreamGame } = require("./api/api");

// commandDispatcher.js
const commandDispatcher = {
  ping: async (interaction) => {
    await interaction.reply("Pong!");
  },
  title: async (interaction) => {
    const channelName = "shafabeats";
    const title = await fetchStreamTitle(channelName);
    await interaction.reply({
      content: `${title}`,
    });
  },
  game: async (interaction) => {
    const channelName = "shafabeats";
    const game = await fetchStreamGame(channelName);
    await interaction.reply({
      content: `${game}`,
    });
  },
  islive: async (interaction) => {
    const channelName = "shafabeats";
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
