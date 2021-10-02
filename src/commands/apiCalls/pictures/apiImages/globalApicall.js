const {apiGetCall} = require('../../../../api/axios');
const LapisEmoji = require('../../../../emoji/emoji.json');
const { MessageAttachment } = require('discord.js')
const {error} = require('../../../../commandhandler/Commanderror');
async function GeneralCall(url,message,msg)
{
  try {
    await apiGetCall(url).then(res =>
      {
          msg.delete();
          //const attach = new Discord.MessageAttachment(attachment, name, data);
          //const attachment = new MessageAttachment(res, 'triggered.gif');
          //https://discord.js.org/#/docs/main/stable/class/MessageAttachment
          let attachment = new MessageAttachment(url, 'image.png');
          message.reply({content: `Image`, files: [
            { attachment: url }
          ]}).catch( () => {
            error(message).then(msg => {msg.react(LapisEmoji.Lapis6.Emoji)});
          });  
      }).catch( () => {
          msg.delete();
          error(message).then(msg => {msg.react(LapisEmoji.Lapis6.Emoji)});
      })    
  } catch (error) 
  {
    console.error(error);
  }
}

module.exports = {GeneralCall}