module.exports.run = async (bot, message, args,LapisEmoji,error) => {

    const number = Math.random(); // generates a random number
    message.channel.send(number.toString()+LapisEmoji.Lapis5.Emoji); // sends a message to the channel with the number
}

module.exports.config = {
    name: "random",
    description: "Get a random value",
    usage: "?random",
    accessableby: "Members",
    help:"only type ?random",
    aliases: ['rd']
}

