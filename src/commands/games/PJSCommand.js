const BaseCommand = require('../../utils/structures/BaseCommand');
const simplydjs = require('simply-djs')

module.exports = class PJSCommand extends BaseCommand {
  constructor() {
    super(
      'calculator',
      'games',
      ['calc'],
      "Use a calculator on discord",
      "?calculator"
    );
  }

  run(client, message, args) {
    simplydjs.calculator(message)  
  }
}