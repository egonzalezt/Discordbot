module.exports.run = async (bot, message, args,LapisEmoji,error) => {
    const args1 = message.content.split(' ');
    var value = 5;
    var num = args1[1];
    let cond = true;
    if(message.guild.id=='255881707209621505')
    {
        message.channel.send("Sorry but this function was disabled on this group")
    }
    else if (message.member.hasPermission("MANAGE_MESSAGES")) {
        if(!args1[1])
        {
           value = 5;
        }
        else
        {
            if(parseInt(num))
            {
                value = parseInt(num);
                if(value > 25)
                {
                    cond = false;
                    message.channel.send("Sorry but I can't delete that amount");
                    message.react(LapisEmoji.Lapis13.Emoji);
                }
            }
            else
            {
                cond = false;
                message.channel.send("Sorry but I need a number")
                message.react(LapisEmoji.Lapis6.Emoji);
            }
        } 
        if(cond)
        {
            message.channel.bulkDelete(value)
            .then(messages => console.log('Bulk deleted messages'))
            .catch(console.error);
            message.channel.send("Bye bye " + value + " messages " + LapisEmoji.Lapis14.Emoji).then(msg => {msg.react(LapisEmoji.Lapis14.Emoji);}); 
        }  
    }
    else
    {
        message.channel.send("Heyyy, what are you doing \n you need permission to run this command" + LapisEmoji.Lapis13.Emoji).then(msg => {msg.react(LapisEmoji.Lapis13.Emoji);});
    }
}

module.exports.config = {
    name: "cls",
    description: "Clear 5 or more messages",
    usage: "?cls",
    accessableby: "Admins",
    help:"?cls #cleans 5 messages \n ?cls <amount of messages to delete>",
    aliases: []
}