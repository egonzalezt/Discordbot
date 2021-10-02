
const { Client, Intents } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const config = require('../slappey.json');
const client = new Client({ intents: [
  Intents.FLAGS.GUILDS,
   Intents.FLAGS.GUILD_MESSAGES,
   Intents.FLAGS.GUILD_MEMBERS,
   Intents.FLAGS.GUILD_MESSAGE_TYPING,
   Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
   Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ] });

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = config.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(config.token);
})();

