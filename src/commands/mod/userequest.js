module.exports.run = async (bot, message, args,LapisEmoji) => {
    try
    {
        const args1 = message.content.split(' ');
        if(message.mentions.users.first()) 
        {
            let user1 = message.mentions.users.first();
            if(!user1.bot)
            {
                args1.shift();
                let messageU = args1.toString().replace(/,/g," ");
                user1.send(message.author.username+" needs you on "+message.channel.name+" From "+message.channel.guild.name+" Server and says \n"+messageU)
                .then(msg => {
                    msg.react(LapisEmoji.Lapis15.Emoji)
                        msg.awaitReactions((reaction, user) => user.id == user1.id &&  (reaction.emoji.id == LapisEmoji.Lapis15.id),
                                { max: 1, time: 10000 }).then(collected => {
                                    if (collected.first().emoji.id == LapisEmoji.Lapis15.id) {
                                        message.author.send("Hey "+message.author.username+", "+msg.channel.recipient.username+" React to your message.");
                                    }
                            }).catch(() => {});
                }).then((msg1)=>{message.author.send("Hey "+message.author.username+", Your request have send have a good day :)");});
            }
            else
            {
                message.channel.send("Sorry but this is not an user")
            }
        }
        else
        {
            message.channel.send("First at all I need a user");
        }
    }
    catch
    {
        message.channel.send("Error")
    }
}

module.exports.config = {
    name: "userequest",
    description: "Request a user to specific channel",
    usage: "?urequest",
    accessableby: "Members",
    aliases: ['invocar','urqst','urequest']
}