const { executionAsyncResource } = require('async_hooks');
const Discord = require('discord.js');
const config = require("./config.json");
const {get, unsubscribe} = require("snekfetch");
const os = require('os');
const { timeStamp } = require('console');
const { cpuUsage } = require('process');
const cheerio = require("cheerio");
const request = require("request");

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
                .setDescription(`Hey ${message.author}`+ " those are my commands")
                .addField("?cat", "Return cat random pic")
                .addField("?hello", "Lapis say hello to you")
                .addField("?help", "This are my commands")
                .addField("?play", "To play youtube music")
                .addField("?skip" ,"To skip the music in the queue")
                .addField("?stop" ,"To stop and disconnect the bot")
                .addField("?server", "To see the server specs ")
                .addField("?random", "To generate a random number")
                .addField("?image something", "Lapis send a picture ")
                .addField("?player", "To see your or another user profile")
                .addField("?emoji", "Lapis send to you a random emoji")
                .addField("?cls", "Clear 5 messages on chat")
                message.author.send(commando);
                //message.author.send('Hello '+ message.author.username +'this are my commands \n ?cat return cat random pic \n ?hello lapis say hello to you \n ?help this are my commands \n ?play to play youtube music \n ?skip to skip the music in the queue');
                message.channel.send("Hey look at your dm!!")
}

function message(message) {
    message.channel.send(`hello ${message.author}`);
            //message.react(':tangerine:');
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
    // uses Nodejs module os to get system specs
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

    let getuser = message.content;//gets the content of the message in the json

    if(!getuser.includes("@"))//detect if the message don't content @ to send message owner user info
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
            console.log(message);
        }
        catch
        {
            message.channel.send("Invalid user")
        }
    }
}

/*

function that provide the server information

*/
function owner(message) {
    let embed = new Discord.MessageEmbed()//create embed message with the server basic info
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

    let getuser = message.content;//get the message content from the json

    if(!getuser.includes("@"))//send the user profile if they didn't pin other user
    {
        const embed = new Discord.MessageEmbed()
        .setColor('#42e0f5')
        .setTitle(`${message.author}`)
        .setDescription(message.author.avatarURL())
        .setImage(message.author.avatarURL({size: 256}))
        message.channel.send(embed);
    }
    else if(getuser.includes("@"))//detect if the user contains @
    {
        try//send and embed message with the info and handle errors if the rol didn't exist
        {
            const embed = new Discord.MessageEmbed()
            .setColor('#42e0f5')
            .setTitle(`${message.mentions.users.first().username}`)
            .setDescription(message.author.avatarURL())
            .setImage(message.mentions.users.first().avatarURL({size: 256}))
            message.channel.send(embed);
        }
        catch//send a error message if something happends
        {
            message.channel.send("Invalid user")
        }
    }
}

function men(message,args) {

}

function image(message) {
 
    /* extract search query from message */
 
    var parts = message.content.split(" ");

    var search = parts.slice(1).join(" "); // Slices of the command part of the array ["!image", "cute", "dog"] ---> ["cute", "dog"] ---> "cute dog"
 
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + search,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
    request(options, async function(error, response, responseBody) {
        if (error) {
            // handle error
            return;
        }
 
        /* Extract image URLs from responseBody using cheerio */
 
        $ = cheerio.load(responseBody); // load responseBody into cheerio (jQuery)
 
        // In this search engine they use ".image a.link" as their css selector for image links
        var links = $(".image a.link");
 
        // We want to fetch the URLs not the DOM nodes, we do this with jQuery's .attr() function
        // this line might be hard to understand but it goes thru all the links (DOM) and stores each url in an array called urls
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
        //console.log(urls);
        if (!urls.length) {
            // Handle no results
            return;
        }
 
        // Send result
        message.channel.send("There it is dude "+ message.author.username+" "+urls[0] );
    });
 
}

var emojis = [
    '😄','😃','😀','😊','☺','😉','😍','😘','😚','😗','😙','😜','😝','😛','😳','😁','😔','😌','😒','😞','😣','😢','😂','😭','😪','😥','😰','😅','😓','😩','😫','😨','😱','😠','😡','😤','😖','😆','😋','😷','😎','😴','😵','😲','😟','😦','😧','😈','👿','😮','😬','😐','😕','😯','😶','😇','😏','😑','👲','👳','👮','👷','💂','👶','👦','👧','👨','👩','👴','👵','👱','👼','👸','😺','😸','😻','😽','😼','🙀','😿','😹','😾','👹','👺','🙈','🙉','🙊','💀','👽','💩','🔥','✨','🌟','💫','💥','💢','💦','💧','💤','💨','👂','👀','👃','👅','👄','👍','👎','👌','👊','✊','✌','👋','✋','👐','👆','👇','👉','👈','🙌','🙏','☝','👏','💪','🚶','🏃','💃','👫','👪','👬','👭','💏','💑','👯','🙆','🙅','💁','🙋','💆','💇','💅','👰','🙎','🙍','🙇','🎩','👑','👒','👟','👞','👡','👠','👢','👕','👔','👚','👗','🎽','👖','👘','👙','💼','👜','👝','👛','👓','🎀','🌂','💄','💛','💙','💜','💚','❤','💔','💗','💓','💕','💖','💞','💘','💌','💋','💍','💎','👤','👥','💬','👣','💭','🐶','🐺','🐱','🐭','🐹','🐰','🐸','🐯','🐨','🐻','🐷','🐽','🐮','🐗','🐵','🐒','🐴','🐑','🐘','🐼','🐧','🐦','🐤','🐥','🐣','🐔','🐍','🐢','🐛','🐝','🐜','🐞','🐌','🐙','🐚','🐠','🐟','🐬',
    '🐳','🐋','🐄','🐏','🐀','🐃','🐅','🐇','🐉','🐎','🐐','🐓','🐕','🐖','🐁','🐂','🐲','🐡','🐊','🐫','🐪','🐆','🐈','🐩','🐾','💐','🌸','🌷','🍀','🌹','🌻','🌺','🍁','🍃','🍂','🌿','🌾','🍄','🌵','🌴','🌲','🌳','🌰','🌱','🌼','🌐','🌞','🌝','🌚','🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘','🌜','🌛','🌙','🌍','🌎','🌏','🌋','🌌','🌠','⭐','☀','⛅','☁','⚡','☔','❄','⛄','🌀','🌁','🌈','🌊','🎍','💝','🎎','🎒','🎓','🎏','🎆','🎇','🎐','🎑','🎃','👻','🎅','🎄','🎁','🎋','🎉','🎊','🎈','🎌','🔮','🎥','📷','📹','📼','💿','📀','💽','💾','💻','📱','☎','📞','📟','📠','📡','📺','📻','🔊','🔉','🔈','🔇','🔔','🔕','📢','📣','⏳','⌛','⏰','⌚','🔓','🔒','🔏','🔐','🔑','🔎','💡','🔦','🔆','🔅','🔌','🔋','🔍','🛁','🛀','🚿','🚽','🔧','🔩','🔨','🚪','🚬','💣','🔫','🔪','💊','💉','💰','💴','💵','💷','💶','💳','💸','📲','📧','📥','📤','✉','📩','📨','📯','📫','📪','📬','📭','📮','📦','📝','📄','📃','📑','📊','📈','📉','📜','📋','📅','📆','📇','📁','📂','✂','📌','📎','✒','✏','📏','📐','📕','📗','📘','📙','📓','📔','📒','📚','📖','🔖','📛','🔬','🔭','📰','🎨','🎬','🎤','🎧','🎼','🎵','🎶','🎹','🎻','🎺','🎷','🎸','👾','🎮','🃏','🎴','🀄','🎲',
    '🎯','🏈','🏀','⚽','⚾','🎾','🎱','🏉','🎳','⛳','🚵','🚴','🏁','🏇','🏆','🎿','🏂','🏊','🏄','🎣','☕','🍵','🍶','🍼','🍺','🍻','🍸','🍹','🍷','🍴','🍕','🍔','🍟','🍗','🍖','🍝','🍛','🍤','🍱','🍣','🍥','🍙','🍘','🍚','🍜','🍲','🍢','🍡','🍳','🍞','🍩','🍮','🍦','🍨','🍧','🎂','🍰','🍪','🍫','🍬','🍭','🍯','🍎','🍏','🍊','🍋','🍒','🍇','🍉','🍓','🍑','🍈','🍌','🍐','🍍','🍠','🍆','🍅','🌽','🏠','🏡','🏫','🏢','🏣','🏥','🏦','🏪','🏩','🏨','💒','⛪','🏬','🏤','🌇','🌆','🏯','🏰','⛺','🏭','🗼','🗾','🗻','🌄','🌅','🌃','🗽','🌉','🎠','🎡','⛲','🎢','🚢','⛵','🚤','🚣','⚓','🚀','✈','💺','🚁','🚂','🚊','🚉','🚞','🚆','🚄','🚅','🚈','🚇','🚝','🚋','🚃','🚎','🚌','🚍','🚙','🚘','🚗','🚕','🚖','🚛','🚚','🚨','🚓','🚔','🚒','🚑','🚐','🚲','🚡','🚟','🚠','🚜','💈','🚏','🎫','🚦','🚥','⚠','🚧','🔰','⛽','🏮','🎰','♨','🗿','🎪','🎭','📍','🚩','⬆','⬇','⬅','➡','🔠','🔡','🔤','↗','↖','↘','↙','↔','↕','🔄','◀','▶','🔼','🔽','↩','↪','ℹ','⏪','⏩','⏫','⏬','⤵','⤴','🆗','🔀','🔁','🔂','🆕','🆙','🆒','🆓','🆖','📶','🎦','🈁','🈯','🈳','🈵','🈴','🈲','🉐','🈹','🈺','🈶','🈚','🚻','🚹','🚺','🚼','🚾','🚰','🚮','🅿','♿','🚭','🈷','🈸',
    '🈂','Ⓜ','🛂','🛄','🛅','🛃','🉑','㊙','㊗','🆑','🆘','🆔','🚫','🔞','📵','🚯','🚱','🚳','🚷','🚸','⛔','✳','❇','❎','✅','✴','💟','🆚','📳','📴','🅰','🅱','🆎','🅾','💠','➿','♻','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','⛎','🔯','🏧','💹','💲','💱','©','®','™','〽','〰','🔝','🔚','🔙','🔛','🔜','❌','⭕','❗','❓','❕','❔','🔃','🕛','🕧','🕐','🕜','🕑','🕝','🕒','🕞','🕓','🕟','🕔','🕠','🕕','🕖','🕗','🕘','🕙','🕚','🕡','🕢','🕣','🕤','🕥','🕦','✖','➕','➖','➗','♠','♥','♣','♦','💮','💯','✔','☑','🔘','🔗','➰','🔱','🔲','🔳','◼','◻','◾','◽','▪','▫','🔺','⬜','⬛','⚫','⚪','🔴','🔵','🔻','🔶','🔷','🔸','🔹'
];

function aguirre(message) {
    message.channel.send(emojis[Math.floor(Math.random() * emojis.length)]);
}

function cls(message)
{
    if(message.guild.id=='255881707209621505')
    {
        message.channel.send("Sorry but this function was disabled on this group")
    }
    else if (message.member.hasPermission("MANAGE_MESSAGES")) {
        message.channel.bulkDelete(5)
        .then(messages => console.log('Bulk deleted messages'))
        .catch(console.error);
        message.channel.send("Chat cleared");                       
    }else
    {
        message.channel.send("Heyyy, what are you doing \n you need permission to run this command")
    }
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
commands.image = image;
commands.aguirre = aguirre;
commands.cls = cls;

module.exports = commands;
