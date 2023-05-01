const path = require('node:path');
const fs = require('node:fs');
const { registerCommands } = require('../utils/regCommands');

const commands = [];

function handleCommands(client) {
  const commandsDir = path.join(__dirname, '..', 'commands');
  const commandsSubDir = fs.readdirSync(commandsDir);

  for (const subDir of commandsSubDir) {
    const commandDir = path.join(commandsDir, subDir);
    const commandFile = fs.readdirSync(commandDir);

    for (file of commandFile) {
      const fullPath = path.join(commandDir, file);
      const command = require(fullPath);

      if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
      } else if (!('data' in command)) {
        console.log(
          `[WARNING] The command at ${fullPath} is missing a required "data" property.`
        );
      } else if (!('execute' in command)) {
        console.log(
          `[WARNING] The command at ${fullPath} is missing a required "execute" property.`
        );
      }
    }
  }

  registerCommands(commands);
}

module.exports = { handleCommands };
