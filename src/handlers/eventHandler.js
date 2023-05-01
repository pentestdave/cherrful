const path = require('node:path');
const fs = require('node:fs');

function handleEvents(client) {
  const eventsDir = path.join(__dirname, '..', 'events');
  const eventFile = fs
    .readdirSync(eventsDir)
    .filter((file) => file.endsWith('.js'));

  for (const file of eventFile) {
    const eventPath = path.join(eventsDir, file);
    const event = require(eventPath);

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
}

module.exports = { handleEvents };
