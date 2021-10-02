const BaseCommand = require('../../utils/structures/BaseCommand');
const simplydjs = require('simply-djs')
module.exports = class TictactoeCommand extends BaseCommand {
  constructor() {
    super(
      'tictactoe',
      'games',
      ['triqui'],
      "Play TicTacToe with a friend",
      "?tictactoe <usertochallenge>"
    );
  }

  run(client, message, args) {
    simplydjs.tictactoe(message);
    //message.channel.send('tictactoe command works');
  }
}