const {get} = require("snekfetch");

module.exports.run = async (bot, message, args,LapisEmoji,error) => {
    let url = "https://some-random-api.ml/canvas/wasted?avatar="
    let map = await message.mentions.users.array();
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
            message.channel.startTyping();
            get(userend).then( () =>
            {
                message.channel.stopTyping(true);
                message.channel.send(userend)
            }
            ).catch( () => {error.error(message);});
        }) 
    }
}

module.exports.config = {
    name: "wasted1",
    description: "send your avatar with gta v wasted style",
    usage: "?wasted1",
    accessableby: "Members",
    help:"?wasted1 \n ?wasted1 <@usertag> #max 3 users",
    aliases: ['gta1']
}