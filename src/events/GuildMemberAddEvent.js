// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
const BaseEvent = require('../utils/structures/BaseEvent');
const {sra} = require('../../slappey.json')
module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  
  async run(client, member) {
    const channels = member.guild.channels.cache;
    //client.channels.cache.get(channelId).send(content);
    const min = Math.ceil(1);
    const max = Math.floor(8);
    let randomNumber= Math.floor(Math.random() * (max - min) + min);

    var BreakException = {};
    try
    {
      let username = member.user.username;
      let avatar = member.user.avatarURL({format:'png',size:1024})
      let discriminator = member.user.discriminator;
      let guildName = member.guild.name
      let memberCount = member.guild.memberCount
      channels.forEach((values,key) => {
        if(values.name=='general'|| values.name=='welcome')
        {
          let url = `https://some-random-api.ml/welcome/img/${randomNumber}/stars?type=join&username=${username}&discriminator=${discriminator}&avatar=${avatar}&guildName=${guildName}&memberCount=${memberCount}&textcolor=blue&key=${sra}`
          url = encodeURI(url);
          values.send({content: `Welcome ${username}⁣`, files: [
            { attachment: url }
          ]}).catch();
          
          if (values.type === 'GUILD_TEXT') throw BreakException;
        }
      });
    }
    catch(e)
    {
      if (e !== BreakException) throw e;
    }
  }
}