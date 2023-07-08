// commands.js
const { SlashCommandBuilder } = require("@discordjs/builders");

const ping = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

const title = new SlashCommandBuilder()
  .setName("title")
  .setDescription("Replies with Twitch Stream title!")
  .addStringOption((option) =>
    option
      .setName("channel")
      .setDescription("Twitch channel name (optional)")
  );

const game = new SlashCommandBuilder()
  .setName("game")
  .setDescription("Replies with Twitch Stream Game!")
  .addStringOption((option) =>
    option.setName("channel").setDescription("Twitch channel name (optional)")
  );

const islive = new SlashCommandBuilder()
  .setName("islive")
  .setDescription("Replies with Twitch Stream live status!")
  .addStringOption((option) =>
    option
      .setName("channel")
      .setDescription("Twitch channel name (optional)")
  );

const logo = new SlashCommandBuilder()
  .setName("logo")
  .setDescription("Replies with Twitch channel logo!")
  .addStringOption((option) =>
    option
      .setName("channel")
      .setDescription("Twitch channel name (optional)")
  );


const commands = [ ping, title, game, islive, logo ];

module.exports = commands;
