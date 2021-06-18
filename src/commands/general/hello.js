module.exports.run = async (bot, message, args,LapisEmoji,error) => {
    message.channel.send(`hello ${message.author}`)
    .then(msg => 
        {
            msg.react(LapisEmoji.Lapis1.Emoji)
            message.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.id == LapisEmoji.Lapis15.id),
                { max: 1, time: 10000 }).then(collected => {
                    if (collected.first().emoji.id == LapisEmoji.Lapis15.id) {
                        message.channel.send("https://tenor.com/view/steven-universe-lapis-lazuli-gif-7334165");
                    }
            }).catch(() => {});
        })
    .catch(() => {
        error(message);
    });
}

module.exports.config = {
    name: "hello",
    description: "Lapis say hello to you :)",
    usage: "?hello",
    accessableby: "Members",
    help:"only type ?hello and react lapis emoji",
    aliases: ['hi']
}