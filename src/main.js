const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { handleCommands } = require('./handlers/commandHandler');
const { handleEvents } = require('./handlers/eventHandler');

const env = require('dotenv');
env.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});
client.commands = new Collection();

handleCommands(client);
handleEvents(client);

client.login(process.env.TOKEN);
