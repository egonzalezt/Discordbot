const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const {apiGetCall} = require('../../api/axios')
const {error} = require('../../commandhandler/Commanderror')

module.exports = class LyricsCommand extends BaseCommand {
  constructor() {
    super('lyrics', 'apiCalls', ['ly'],"Get song information","?lyrics <songname>");
  }

  async run(client, message, args) {
    if(!args[0])
    {
        message.channel.send("Sorry but i need a song title")
    }
    else
    {
        let song = args.toString();
        song = song.replace(',','')
        let url = "https://some-random-api.ml/lyrics?title="+song;
        try
        {
          await apiGetCall(url).then(body =>{
            let embed = new Discord.MessageEmbed()
            .setAuthor(body.author)
            .setTitle(body.title)
            .setColor(`RANDOM`)
            .setImage(body.thumbnail.genius)
            .addField("Lyrics",`[Song link](${body.links.genius}).`)
            message.channel.send({ embeds: [embed] })
          })
        }catch(err){
          error(message)
          //console.error(err)
        }

    }
  }
}