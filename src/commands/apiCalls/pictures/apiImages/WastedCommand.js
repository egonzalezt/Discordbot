const BaseCommand = require('../../../../utils/structures/BaseCommand');
const {GeneralCall} = require('./globalApicall')

module.exports = class ImageCommand extends BaseCommand {
  constructor() {
    super('wasted',
     'apiCalls',
      [],
      "send your discord avatar like gta v wasted style",
      "?wasted \n ?wasted <@user>"
      );
  }

  run(client, message, args) {
    var url = `https://some-random-api.ml/canvas/wasted?avatar=`;

    if(!message.mentions.users.first())
    {
        let avatarurl = message.author.avatarURL({size: 1024});
        url += `${avatarurl.replace("webp", "png")}`;
    }else
    {
        let avatarurl = message.mentions.users.first().avatarURL({size: 1024})
        url += `${avatarurl.replace("webp", "png")}`;
    }
    message.channel.send("Loading..."+ "https://media1.tenor.com/images/cee0050ee665b830cb5e56a4895a74f4/tenor.gif").then(msg => {
      GeneralCall(url,message,msg) 
    })
  }
}