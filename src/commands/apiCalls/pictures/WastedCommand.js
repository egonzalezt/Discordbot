const BaseCommand = require('../../../utils/structures/BaseCommand');
const LapisEmoji = require('../../../emoji/emoji.json')
const {apiGetCall} = require('../../../api/axios')
const {error} = require('../../../commandhandler/Commanderror')

module.exports = class WastedCommand extends BaseCommand {
  constructor() {
    super('wasted1',
     'apiCalls',
      ['gta1'],
      "send your avatar with gta v wasted style",
      "?wasted1 \n ?wasted1 <@usertag> #max 3 users"
      );
  }

  async run(client, message, args) {
    let url = "https://some-random-api.ml/canvas/wasted?avatar="
    let map = await message.mentions.users;
    if(map.length>=4)
    {
      message.channel.send("Sorry but you can do this with max 3 users").then(msg => {msg.react(LapisEmoji.Lapis13.Emoji)});
    }else if(map.length==0)
    {
      message.channel.send("Tag one or more users(max 3), or use ?wasted")
    }
    else
    {
      map.forEach((value, key) => {
        let user = url+value.avatarURL({size: 1024});
        let userend = user.replace("webp", "png");
        apiGetCall(userend).then(() =>
        {
          message.channel.send(userend)
        }
        ).catch( () => {error(message);});
      }) 
    }
  }
}