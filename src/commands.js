const Discord = require('discord.js');
const {get, unsubscribe} = require("snekfetch");
const os = require('os');
const cheerio = require("cheerio");
const request = require("request");
const fetch = require("node-fetch");
const LapisEmoji = require("./emoji.json");
const { lastIndexOf } = require('ffmpeg-static');
const { errorMonitor } = require('stream');

const commands = {};


function error(message)
{
    var fail = "https://media1.tenor.com/images/10b4e6780975558e86591258284ab55f/tenor.gif";
    const embed = new Discord.MessageEmbed()
    .setColor(`#f3f3f3`)
    .setImage(fail)
    //.attachFiles([fail]);
    return message.channel.send({embed});
}

function cat(message) 
{
    get('https://aws.random.cat/meow').then(res => {
        const embed = new Discord.MessageEmbed()
        .setTitle(`Random Cat Image`)
        .setColor(`#f3f3f3`)
        .setImage(res.body.file)
        return message.channel.send({embed});
    }).catch(() => {
        error(message);
    });
}

function dog(message) 
{
    get('https://dog.ceo/api/breeds/image/random').then(res => {
        const embed = new Discord.MessageEmbed()
        .setTitle(`Random Dog Image`)
        .setColor(`#f3f3f3`)
        .setImage(res.body.message)
        return message.channel.send({embed});
    }).catch(() => {
        error(message);
    });
}

function help(message) 
{
    message.channel.send("Hey look at your dm!!").then(msg => {
        let commando = new Discord.MessageEmbed()
            .setTitle(`Lapis commands`)
            .setColor(`#42e0f5`)
            .setAuthor("Lapis bot",msg.author.avatarURL())
            .setDescription(`Hey ${message.author} those are my commands`)
            .addField("?invite","To invite lapis on your server")
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
            .addField("?cls", "Clear 5 messages on current chat")
            .addField("?steam player", "To see steam basic player info")
            .addField("?meme","Lapis send to you a random meme")
            .addField("?lyrics song name","Get a song info")
            .addField("?catfact","Interesting info about cats")
            .addField("?bw","Transform player avatar to black and white")
            .addField("?rainbow","Transform player profile pic with rainbow")
            .addField("?wasted","User profile pic gta wasted style")
            .addField("?triggered","your avatar get triggered")
            .addField("?wasted1","3 users profile pic gta wasted style")
            .addField("?gem","Lapis send a random SU character")
        message.author.send(commando);
    }).catch( () => {
        error(message);
    });
}

function message(message) 
{
    message.channel.send(`hello ${message.author}`)
    .then(msg => 
        {
            msg.react(LapisEmoji.Lapis1.Emoji)
            if(message.author.id == '256085480309915648')
            {
                message.channel.send(`Montes puto`);
            }
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

function random(message) 
{
    const number = Math.random(); // generates a random number
    message.channel.send(number.toString()+LapisEmoji.Lapis5.Emoji); // sends a message to the channel with the number
}

function server(message) 
{
    // uses Nodejs module os to get system specs
    const embe = new Discord.MessageEmbed()
        .setTitle(`Server specs`)
        .setColor(`RANDOM`)
        .addField("Your amount of ram memory",os.totalmem())
        .addField("Free memory ram on your system",os.freemem())
        .addField("Your os ver",os.release())
        .addField("Platform ",os.platform())
        message.channel.send(embe).then(send => {
            send.react(LapisEmoji.Lapis4.Emoji);
        });
}

function player(message) {

    let getuser = message.content;//gets the content of the message in the json

    if(!getuser.includes("@"))//detect if the message don't content @ to send message owner user info
    {
        const embed = new Discord.MessageEmbed()
        .setColor('#42e0f5')
        .setAuthor("User " + message.author.username, message.author.avatarURL())
        .setTitle(message.author.username)
        .setDescription("hey hey look at my profile")
        .addField("My id",message.author.discriminator)
        .addField("Joined at",message.author.createdAt)
        .setImage(message.author.avatarURL())
        message.channel.send(embed).then(()=>{}).catch( ()=>{error(message);});
        //console.log(message.content)
    }
    else if(getuser.includes("@"))
    {

        let user = message.mentions.users.first().username;
        //message.channel.send("User " + user);
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(message.mentions.users.first().username)
            .setDescription("hey hey look at my profile")
            .addField("My id ", message.mentions.users.first().discriminator)
            .setImage(message.mentions.users.first().avatarURL())
            message.channel.send(embed).then(msg => {}).catch((err)=>{error(message);message.channel.send("Invalid user");});
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
        message.channel.send(embed).then(msg => {}).catch(err => {error(message);});    
}

function avatar(message)
{
    let getuser = message.content;//get the message content from the json

    if(!getuser.includes("@"))//send the user profile if they didn't pin other user
    {
        const embed = new Discord.MessageEmbed()
        .setColor('#42e0f5')
        .setTitle(`${message.author.username}`)
        .setDescription(message.author.avatarURL())
        .setImage(message.author.avatarURL({size: 2048}))
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
            .setImage(message.mentions.users.first().avatarURL({size: 2048}))
            message.channel.send(embed);
        }
        catch//send a error message if something happends
        {
            message.channel.send("Invalid user")
            error(message);
        }
    }
}

function schimage(message) {
 
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
    try
    {
        request(options, async function(error1, response, responseBody) {
            if (error1) {
            // handle error
                error(message);
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
                error(message);
                return;
            }
 
            // Send result
            message.channel.send("There it is dude "+ message.author.username+"\n"+urls[0] );
        });
    }
    catch
    {
        error(message);
    }
 
}

var emojis = [
    '😄','😃','😀','😊',LapisEmoji.Lapis1.Emoji,LapisEmoji.Lapis3.Emoji,LapisEmoji.Lapis4.Emoji,LapisEmoji.Lapis5.Emoji,LapisEmoji.Lapis6.Emoji,LapisEmoji.Lapis7.Emoji,LapisEmoji.Lapis8.Emoji,LapisEmoji.Lapis9.Emoji,LapisEmoji.Lapis10.Emoji,LapisEmoji.Lapis11.Emoji,LapisEmoji.Lapis12.Emoji,LapisEmoji.Lapis13.Emoji,LapisEmoji.Lapis14.Emoji,LapisEmoji.Lapis15.Emoji,'☺','😉','😍','😘','😚','😗','😙','😜','😝','😛','😳','😁','😔','😌','😒','😞','😣','😢','😂','😭','😪','😥','😰','😅','😓','😩','😫','😨','😱','😠','😡','😤','😖','😆','😋','😷','😎','😴','😵','😲','😟','😦','😧','😈','👿','😮','😬','😐','😕','😯','😶','😇','😏','😑','👲','👳','👮','👷','💂','👶','👦','👧','👨','👩','👴','👵','👱','👼','👸','😺','😸','😻','😽','😼','🙀','😿','😹','😾','👹','👺','🙈','🙉','🙊','💀','👽','💩','🔥','✨','🌟','💫','💥','💢','💦','💧','💤','💨','👂','👀','👃','👅','👄','👍','👎','👌','👊','✊','✌','👋','✋','👐','👆','👇','👉','👈','🙌','🙏','☝','👏','💪','🚶','🏃','💃','👫','👪','👬','👭','💏','💑','👯','🙆','🙅','💁','🙋','💆','💇','💅','👰','🙎','🙍','🙇','🎩','👑','👒','👟','👞','👡','👠','👢','👕','👔','👚','👗','🎽','👖','👘','👙','💼','👜','👝','👛','👓','🎀','🌂','💄','💛','💙','💜','💚','❤','💔','💗','💓','💕','💖','💞','💘','💌','💋','💍','💎','👤','👥','💬','👣','💭','🐶','🐺','🐱','🐭','🐹','🐰','🐸','🐯','🐨','🐻','🐷','🐽','🐮','🐗','🐵','🐒','🐴','🐑','🐘','🐼','🐧','🐦','🐤','🐥','🐣','🐔','🐍','🐢','🐛','🐝','🐜','🐞','🐌','🐙','🐚','🐠','🐟','🐬',
    '🐳','🐋','🐄','🐏','🐀','🐃','🐅','🐇','🐉','🐎','🐐','🐓','🐕','🐖','🐁','🐂','🐲','🐡','🐊','🐫','🐪','🐆','🐈','🐩','🐾','💐','🌸','🌷','🍀','🌹','🌻','🌺','🍁','🍃','🍂','🌿','🌾','🍄','🌵','🌴','🌲','🌳','🌰','🌱','🌼','🌐','🌞','🌝','🌚','🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘','🌜','🌛','🌙','🌍','🌎','🌏','🌋','🌌','🌠','⭐','☀','⛅','☁','⚡','☔','❄','⛄','🌀','🌁','🌈','🌊','🎍','💝','🎎','🎒','🎓','🎏','🎆','🎇','🎐','🎑','🎃','👻','🎅','🎄','🎁','🎋','🎉','🎊','🎈','🎌','🔮','🎥','📷','📹','📼','💿','📀','💽','💾','💻','📱','☎','📞','📟','📠','📡','📺','📻','🔊','🔉','🔈','🔇','🔔','🔕','📢','📣','⏳','⌛','⏰','⌚','🔓','🔒','🔏','🔐','🔑','🔎','💡','🔦','🔆','🔅','🔌','🔋','🔍','🛁','🛀','🚿','🚽','🔧','🔩','🔨','🚪','🚬','💣','🔫','🔪','💊','💉','💰','💴','💵','💷','💶','💳','💸','📲','📧','📥','📤','✉','📩','📨','📯','📫','📪','📬','📭','📮','📦','📝','📄','📃','📑','📊','📈','📉','📜','📋','📅','📆','📇','📁','📂','✂','📌','📎','✒','✏','📏','📐','📕','📗','📘','📙','📓','📔','📒','📚','📖','🔖','📛','🔬','🔭','📰','🎨','🎬','🎤','🎧','🎼','🎵','🎶','🎹','🎻','🎺','🎷','🎸','👾','🎮','🃏','🎴','🀄','🎲',
    '🎯','🏈','🏀','⚽','⚾','🎾','🎱','🏉','🎳','⛳','🚵','🚴','🏁','🏇','🏆','🎿','🏂','🏊','🏄','🎣','☕','🍵','🍶','🍼','🍺','🍻','🍸','🍹','🍷','🍴','🍕','🍔','🍟','🍗','🍖','🍝','🍛','🍤','🍱','🍣','🍥','🍙','🍘','🍚','🍜','🍲','🍢','🍡','🍳','🍞','🍩','🍮','🍦','🍨','🍧','🎂','🍰','🍪','🍫','🍬','🍭','🍯','🍎','🍏','🍊','🍋','🍒','🍇','🍉','🍓','🍑','🍈','🍌','🍐','🍍','🍠','🍆','🍅','🌽','🏠','🏡','🏫','🏢','🏣','🏥','🏦','🏪','🏩','🏨','💒','⛪','🏬','🏤','🌇','🌆','🏯','🏰','⛺','🏭','🗼','🗾','🗻','🌄','🌅','🌃','🗽','🌉','🎠','🎡','⛲','🎢','🚢','⛵','🚤','🚣','⚓','🚀','✈','💺','🚁','🚂','🚊','🚉','🚞','🚆','🚄','🚅','🚈','🚇','🚝','🚋','🚃','🚎','🚌','🚍','🚙','🚘','🚗','🚕','🚖','🚛','🚚','🚨','🚓','🚔','🚒','🚑','🚐','🚲','🚡','🚟','🚠','🚜','💈','🚏','🎫','🚦','🚥','⚠','🚧','🔰','⛽','🏮','🎰','♨','🗿','🎪','🎭','📍','🚩','⬆','⬇','⬅','➡','🔠','🔡','🔤','↗','↖','↘','↙','↔','↕','🔄','◀','▶','🔼','🔽','↩','↪','ℹ','⏪','⏩','⏫','⏬','⤵','⤴','🆗','🔀','🔁','🔂','🆕','🆙','🆒','🆓','🆖','📶','🎦','🈁','🈯','🈳','🈵','🈴','🈲','🉐','🈹','🈺','🈶','🈚','🚻','🚹','🚺','🚼','🚾','🚰','🚮','🅿','♿','🚭','🈷','🈸',
    '🈂','Ⓜ','🛂','🛄','🛅','🛃','🉑','㊙','㊗','🆑','🆘','🆔','🚫','🔞','📵','🚯','🚱','🚳','🚷','🚸','⛔','✳','❇','❎','✅','✴','💟','🆚','📳','📴','🅰','🅱','🆎','🅾','💠','➿','♻','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','⛎','🔯','🏧','💹','💲','💱','©','®','™','〽','〰','🔝','🔚','🔙','🔛','🔜','❌','⭕','❗','❓','❕','❔','🔃','🕛','🕧','🕐','🕜','🕑','🕝','🕒','🕞','🕓','🕟','🕔','🕠','🕕','🕖','🕗','🕘','🕙','🕚','🕡','🕢','🕣','🕤','🕥','🕦','✖','➕','➖','➗','♠','♥','♣','♦','💮','💯','✔','☑','🔘','🔗','➰','🔱','🔲','🔳','◼','◻','◾','◽','▪','▫','🔺','⬜','⬛','⚫','⚪','🔴','🔵','🔻','🔶','🔷','🔸','🔹'
];

function aguirre(message) {
    message.channel.send(emojis[Math.floor(Math.random() * emojis.length)]);
}

function cls(message)
{
    const args = message.content.split(' ');
    var value = 5;
    var num = args[1];
    let cond = true;
    if(message.guild.id=='255881707209621505')
    {
        message.channel.send("Sorry but this function was disabled on this group")
    }
    else if (message.member.hasPermission("MANAGE_MESSAGES")) {
        if(!args[1])
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

function catfact(message) {

    let url = "https://some-random-api.ml/facts/cat";
    fetch(url).then(res => res.json()).then(body => {
        let embed = new Discord.MessageEmbed()
        .setTitle("Cat fact")
        .setColor(`RANDOM`)
        .setDescription(body.fact)
        message.channel.send(embed)
    }).catch(() => {error(message);});
    
}

function meme(message) {

    let url = "https://some-random-api.ml/meme";
    fetch(url).then(res => res.json()).then(body => {
        let embed = new Discord.MessageEmbed()
        .setTitle("Meme")
        .setColor(`RANDOM`)
        .setDescription("Category " + body.category)
        .setImage(body.image)
        message.channel.send(embed);
    }).catch(() => {error(message);});
}

function lyrics(message) {

    const args = message.content.split(' ');
    if(!args[1])
    {
        message.channel.send("Sorry but i need a song title")
    }
    else
    {
        let song = args[1];
        let url = "https://some-random-api.ml/lyrics?title="+song;
        fetch(url).then(res => res.json()).then(body => {
            let embed = new Discord.MessageEmbed()
            .setAuthor(body.author)
            .setTitle(body.title)
            .setColor(`RANDOM`)
            .setImage(body.thumbnail.genius)
            .addField("Lyrics",`[Song link](${body.links.genius}).`)
            message.channel.send(embed)
        }).catch(() => {
            error(message).then(msg => {msg.react(LapisEmoji.Lapis6.Emoji)})
        });
    }
}

function men(message,args) {
    console.log(message.content);
    //message.channel.send(`${"<:maincra:434164447548932107>"}`)
    //message.channel.send(args);
    //get("https://tenor.com/GIKC.gif").then(result => {console.log(result)});
    message.channel.send("Loading..."+ "https://media1.tenor.com/images/cee0050ee665b830cb5e56a4895a74f4/tenor.gif").then(msg => {
        get("https://some-random-api.ml/facts/cat").then(res => 
        {
            msg.delete();
            message.channel.send(res.body.fact)
        });
    });
}

async function wasted1(message) {
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
            let user = url+value.avatarURL();
            let userend = user.replace("webp", "png");
            message.channel.startTyping();
            get(userend).then( () =>
            {
                message.channel.stopTyping(true);
                message.channel.send(userend)
            }
            ).catch( () => {error(message);});
        }) 
    } 
}

function imageapi(message,type) 
{
    var url = ``;

    if(type == 1)
    {
        url = `https://some-random-api.ml/canvas/threshold?avatar=`
    }
    else if(type == 2)
    {
        url = `https://some-random-api.ml/canvas/gay?avatar=`
    }
    else if(type == 3)
    {
        url = `https://some-random-api.ml/canvas/glass?avatar=`
    }
    else if(type == 4)
    {
        url = `https://some-random-api.ml/canvas/wasted?avatar=`
    }
    else if(type == 5)
    {
        url = `https://some-random-api.ml/canvas/triggered?avatar=`
    }
    else if(type == 6)
    {
        url = `https://some-random-api.ml/canvas/invert?avatar=`
    }

    if(!message.mentions.users.first())
    {
        let avatarurl = message.author.avatarURL({size: 1024});
        url += `${avatarurl.replace("webp", "png")}`;
    }else
    {
        let avatarurl = message.mentions.users.first().avatarURL({size: 1024})
        url += `${avatarurl.replace("webp", "png")}`;
    }
    message.channel.send("Loading..."+ "https://media1.tenor.com/images/cee0050ee665b830cb5e56a4895a74f4/tenor.gif").then(msg => {
        get(url).then(res =>
            {
                msg.delete();
                //message.channel.attachFiles([url]);
                const attach = new Discord.MessageAttachment(url)
                message.channel.send(attach).then(msg => {msg.react(LapisEmoji.Lapis12.Emoji)});
            }).catch( () => {
                msg.delete();
                error(message).then(msg => {msg.react(LapisEmoji.Lapis6.Emoji)});
            })        
    })

}

function invite(message)
{
    message.channel.send("There is it ->" + "https://discord.com/api/oauth2/authorize?client_id=797947218471419952&permissions=8&scope=bot");
}

commands.message = message;
commands.help = help;
commands.cat = cat;
commands.random = random;
commands.server = server;
commands.player = player;
commands.men = men;
commands.owner = owner;
commands.avatar = avatar;
commands.aguirre = aguirre;
commands.cls = cls;
commands.catfact = catfact;
commands.meme = meme;
commands.lyrics = lyrics;
commands.imageapi = imageapi;
commands.schimage = schimage;
commands.wasted1 = wasted1;
commands.invite = invite;
commands.dog = dog;

module.exports = commands;
