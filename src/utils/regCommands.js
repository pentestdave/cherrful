const { REST, Routes } = require('discord.js');
const env = require('dotenv');
env.config();

const rest = new REST().setToken(process.env.TOKEN);

async function registerCommands(commands) {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
}

module.exports = { registerCommands };
