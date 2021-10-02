const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class RandomCommand extends BaseCommand {
  constructor() {
    super('random', 'general', ['rd'],"Get a random value","?random");
  }

  run(client, message, args) {
    const number = Math.random(); // generates a random number
    message.channel.send(number.toString()+LapisEmoji.Lapis5.Emoji);
  }
}