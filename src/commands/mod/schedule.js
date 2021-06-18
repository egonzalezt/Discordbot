const momentTimezone = require('moment-timezone')
const moment= require('moment') 
const Discord = require('discord.js');
const mongo = require('../../mongo')
const scheduledSchema = require('../../models/scheduled-schema')
//const { Mongoose } = require('mongoose');

module.exports.run = async (bot, message, args,LapisEmoji) => {

    const values = args.split(" ")
    var channel1 = values[0]
    //let channeol = "#808709761368326214"
    //bot.channels.cache.get("808709761368326214").send("sadfsad");
    //console.log(message)
    if(!channel1.includes("#"))
    {
        message.reply('please tag a channel')
        return
    }
    else
    {
        channel1= channel1.replace("<#","")
        channel1 = channel1.replace(">","")
        //console.log(channel1)
    }
    values.shift()
    const[date,time,clockType,timeZone] = values
    console.log(date,time,clockType,timeZone)
    if(clockType !== 'AM' && clockType !== 'PM')
    {
        message.reply(`you must provide either AM or PM, you provided "${clockType}"`)
        return
    }
    const validTimeZones = momentTimezone.tz.names()
    if(!validTimeZones.includes(timeZone))
    {
        message.reply("Unknown timezone! Please use one of the following: <https://gist.github.com/AlexzanderFlores/d511a7c7e97b4c3ae60cb6e562f78300>")
        return
    }     
    const targetDate = momentTimezone.tz(
        `${date} ${time} ${clockType}`,
        'YYYY-MM-DD HH:mm A',
        timeZone
      )
    //const datetime = moment(`${date} ${time} ${clockType}`,'YYYY-MM-DD hh:mm a')
    if (!targetDate.isValid())
    {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        message.reply(`Invalid time check if the time is valid remember the format example ${yyyy}-${mm}-${dd} 1:30 PM`)
        return
    }
    message.reply("Please send the message you would like to save")
    const filter = (newMessage) => {
        return newMessage.author.id === message.author.id
    }
    const collector = new Discord.MessageCollector(message.channel,filter,{
        max:1,
        time: 1000*60 //60 seconds
    })

    collector.on('end',async (collected)=>{
        const collectedMessage = collected.first()
        if(!collectedMessage)
        {
            message.reply("you did not reply in time")
            return
        }else{
            message.reply(`your message has been scheduled to ${date} ${time} ${clockType} ${timeZone}`)
            await mongo().then( async (mongoose) => {
                try {
                    console.log('Connected to mongo!')
                    const test = new scheduledSchema({
                        date: targetDate.valueOf(),
                        content: collectedMessage.content,
                        guildId: message.guild.id,
                        channelId: channel1
                    })
                    await test.save().then(result => {
                        console.log(result)
                        console.log('note saved!')
                    })
                } finally {
                  mongoose.connection.close()
                }
            });
        }
    })
}

module.exports.config = {
    name: "save",
    description: "Save notes for a specific channel to send a message",
    usage: "?save <#channel> <YYYY-MM-DD HH-MM> <AM/PM> <TIMEZONE>",
    accessableby: "Members",
    help:"?save <#channel> <YYYY-MM-DD HH-MM> <AM/PM> <TIMEZONE>",
    aliases: ['s','nota']
}