const { executionAsyncResource } = require('async_hooks');
const Discord = require('discord.js');
const config = require("./config.json");
const {get, unsubscribe} = require("snekfetch");
const os = require('os');
const { timeStamp } = require('console');
const { cpuUsage } = require('process');

const commands = {};

function cat(message) {
    try {
        get('https://aws.random.cat/meow').then(res => {
            const embed = new Discord.MessageEmbed()
            .setTitle(`Random Cat Image`)
            .setColor(`#f3f3f3`)
            .setImage(res.body.file)
            return message.channel.send({embed});
        });
    } catch(err) {
        return message.channel.send(err.stack);
    }   
}

function help(message) {
    let commando = new Discord.MessageEmbed()
                .setTitle(`Lapis commands`)
                .setColor(`#42e0f5`)
                .setDescription("Hey "+ message.author.username + "those are my commands")
                .addField("?cat return cat random pic")
                .addField("?hello lapis say hello to you")
                .addField("?help this are my commands")
                .addField("?play to play youtube music")
                .addField("?skip to skip the music in the queue")
                .addField("?stop to stop and disconnect the bot")
                .addField("?server to see the server specs ")
                .addField("?random to generate a random number")
                message.author.send(commando);
                //message.author.send('Hello '+ message.author.username +'this are my commands \n ?cat return cat random pic \n ?hello lapis say hello to you \n ?help this are my commands \n ?play to play youtube music \n ?skip to skip the music in the queue');
                message.channel.send("Hey look at your dm!!")
}

function message(message) {
    message.channel.send(`hello ${message.author}`);
            message.react(':tangerine:');
            //console.log(message.author);

            if(message.author.id == '256085480309915648')
            {
                message.channel.send(`Montes puto`);
            }
}

function random(message) {
    const number = Math.random(); // generates a random number
    message.channel.send(number.toString()); // sends a message to the channel with the number
}

function server(message) {
    const embe = new Discord.MessageEmbed()
                .setTitle(`Server specs`)
                .setColor(`RANDOM`)
                .addField("Your amount of ram memory",os.totalmem())
                .addField("Free memory ram on your system",os.freemem())
                .addField("Your os ver",os.release())
                .addField("Platform ",os.platform())
                message.channel.send(embe);
}

function player(message) {
    let getuser = message.content;

    if(!getuser.includes("@"))
    {
        const embed = new Discord.MessageEmbed()
        .setColor('#42e0f5')
        .setTitle(message.author.username)
        .setDescription("hey hey look at my profile")
        .addField("My id",message.author.discriminator)
        .setImage(message.author.avatarURL())
        message.channel.send(embed);
        //console.log(message.content)
    }
    else if(getuser.includes("@"))
    {
        try
        {
            let user = message.mentions.users.first().username;
        //message.channel.send("User " + user);
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(message.mentions.users.first().username)
            .setDescription("hey hey look at my profile")
            .addField("My id ", message.mentions.users.first().discriminator)
            .setImage(message.mentions.users.first().avatarURL())
            message.channel.send(embed);
        }
        catch
        {
            message.channel.send("Invalid user")
        }
    }
}

function owner(message) {
    let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Server Info")
        .setImage(message.guild.iconURL)
        .setDescription(message.guild.name+"'s information")
        .addField("Owner", "The owner of this server is " + message.guild.owner.user.username)
        .addField("Member Count  This server has ", message.guild.memberCount + " members")
        .addField("Emoji Count This server has ", message.guild.emojis.cache.size + " emojis")
        .addField("Roles Count This server has ", message.guild.roles.cache.size + " roles")
        message.channel.send(embed);    
}

function avatar(message)
{

    let getuser = message.content;

    if(!getuser.includes("@"))
    {
        const embed = new Discord.MessageEmbed()
        .setColor('#42e0f5')
        .setTitle(message.author.username)
        .setDescription(message.author.avatarURL())
        .setImage(message.author.avatarURL({size: 256}))
        message.channel.send(embed);
    }
    else if(getuser.includes("@"))
    {
        try
        {
            const embed = new Discord.MessageEmbed()
            .setColor('#42e0f5')
            .setTitle(message.mentions.users.first().username)
            .setDescription(message.author.avatarURL())
            .setImage(message.mentions.users.first().avatarURL({size: 256}))
            message.channel.send(embed);
        }
        catch
        {
            message.channel.send("Invalid user")
        }
    }
}

function men(message,args) {

}

/*
function men(message) {
    let prefix = '?'
    const withoutPrefix = message.content.slice(prefix.length);
	const split = withoutPrefix.split(/ +/);
	const command = split[0];
	const args = split.slice(1);

	if (args[0]) {
        const user = getUserFromMention(args[0]);
        console.log(user);
		if (!user) {
			return message.reply('Please use a proper mention if you want to see someone elses avatar.');
		}

		return message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
	}

	return message.channel.send(`${message.author.username}, your avatar: ${message.author.displayAvatarURL({ dynamic: true })}`);
 
}

function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}
*/

commands.message = message;
commands.help = help;
commands.cat = cat;
commands.random = random;
commands.server = server;
commands.player = player;
commands.men = men;
commands.owner = owner;
commands.avatar = avatar;

module.exports = commands;
