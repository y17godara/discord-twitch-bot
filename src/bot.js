// index.js
const { Client, GatewayIntentBits } = require("discord.js");
const dotenv = require("dotenv");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { commandDispatcher, commands } = require("./components/index");
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
  ],
});

// Interaction event handling
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (Object.prototype.hasOwnProperty.call(commandDispatcher, commandName)) {
    try {
      await commandDispatcher[commandName](interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply("An error occurred while executing the command.");
    }
  }
});

// Main function for registering slash commands
async function registerCommands() {
  try {
    console.log(`Starting registration of slash commands...`);
    const rest = new REST({ version: "10" }).setToken(
      process.env.DISCORD_TOKEN
    );

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID,
        process.env.DISCORD_GUILD_ID
      ),
      {
        body: commands,
      }
    );

    console.log("Slash commands registered successfully!");
  } catch (error) {
    console.error(error);
  }
}

// Client "ready" event
client.once("ready", () => {
  console.log(`Bot is ready! Logged in as ${client.user.tag}`);
  client.user.setActivity("Follow twitch.tv/shafabeats");

  registerCommands(); // Register slash commands on startup
});

// Start the bot
client.login(process.env.DISCORD_TOKEN);
