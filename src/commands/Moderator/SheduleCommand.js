const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SheduleCommand extends BaseCommand {
  constructor() {
    super(
      'schedule',
      'Moderator',
      ['s','save','nota'],
      "Save notes for a specific channel to send a message",
      "?save <#channel> <YYYY-MM-DD HH-MM> <AM/PM> <TIMEZONE>"
      );
  }

  run(client, message, args) {
    message.channel.send('Shedule command in develop');
  }
}