const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const config = require("./config.json");
const { YTSearcher } = require('ytsearcher');
const commandos = require('./commands.js');
const commands = require('./commands.js');
const steam = require('./steam.js');

const searcher = new YTSearcher({
    key: "AIzaSyAnxw4roCTZRyOsohF56qfIKAzSzfAqXdU",
    revealed: true
});
 
const client = new Discord.Client();
 
const queue = new Map();
 
client.on('ready', () => {
    console.log('Bot Now connected!');
    console.log('Logged In as', client.user.tag)
    client.user.setStatus('online'); // online, idle, invisible, dnd
    client.user.setActivity("In develop ?help"); 
    console.log('Bot status: ', client.user.presence.status);
});
 
client.on("message", async(message) => {
    const prefix = '?';
 
    const serverQueue = queue.get(message.guild.id);
 
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase();

    let contenido = message.content;

    if(contenido.includes("797947218471419952"))
    {
        message.react("❤️");
    }

    if (!message.content.startsWith(prefix))
    {return;}
    
    else
    {
        message.react("👍");
    switch(command){
        case 'play':
            execute(message, serverQueue);
            message.react("🎵");
            break;
        case 'stop':
            stop(message, serverQueue);
            message.react("❌");
            break;
        case 'skip':
            skip(message, serverQueue);
            message.react("🎯");
            break;
        case 'cat':
            commandos.cat(message);
            break;
        case 'help':
            commandos.help(message);
            break;
        case 'hello':
            commandos.message(message);
            break;
        case 'random':
            commandos.random(message);
            break;
        case 'server':
            commandos.server(message);
            break;
        case 'player':
            commandos.player(message);           
            break;
        case 'owner':
            commandos.owner(message);
            break;  
        case 'camilo':
            message.channel.send("Que creyo que le iba a decir onichan \n pues te jodes")
            message.react("😡");
            break;
        case 'test':
            commandos.men(message,args);
            break;  
        case 'avatar':
            commandos.avatar(message); 
            break;
        case 'image':
            commandos.image(message);
            break;
        case 'aguirre':
            commandos.aguirre(message);
            break;
        case 'emoji':
            commandos.aguirre(message);
            break;
        case 'cls':
            commandos.cls(message);
            break;
        case 'steam':
            steam.get_id(message);
            break;
        default:
            message.channel.send("Heyy I don't recognice this command");
            message.react("😞");
    }
}   
    async function execute(message, serverQueue){
        let vc = message.member.voice.channel;
        if(!vc){
            return message.channel.send("Please join a voice chat first");
        }else{
            let result = await searcher.search(args.join(" "), { type: "video" })
            const songInfo = await ytdl.getInfo(result.first.url)
 
            let song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url
            };
 
            if(!serverQueue){
                const queueConstructor = {
                    txtChannel: message.channel,
                    vChannel: vc,
                    connection: null,
                    songs: [],
                    volume: 10,
                    playing: true
                };
                queue.set(message.guild.id, queueConstructor);
 
                queueConstructor.songs.push(song);
 
                try{
                    let connection = await vc.join();
                    queueConstructor.connection = connection;
                    play(message.guild, queueConstructor.songs[0]);
                }catch (err){
                    console.error(err);
                    queue.delete(message.guild.id);
                    return message.channel.send(`Unable to join the voice chat ${err}`)
                }
            }else{
                serverQueue.songs.push(song);
                return message.channel.send(`The song has been added ${song.url}`);
            }
        }
    }
    function play(guild, song){
        const serverQueue = queue.get(guild.id);
        if(!song){
            serverQueue.vChannel.leave();
            queue.delete(guild.id);
            return;
        }
        const dispatcher = serverQueue.connection
            .play(ytdl(song.url))
            .on('finish', () =>{
                serverQueue.songs.shift();
                play(guild, serverQueue.songs[0]);
            })
            serverQueue.txtChannel.send(`Now playing ${serverQueue.songs[0].url}`)
    }
    function stop (message, serverQueue){
        if(!message.member.voice.channel)
            return message.channel.send("You need to join the voice chat first!")
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
    }
    function skip (message, serverQueue){
        if(!message.member.voice.channel)
            return message.channel.send("You need to join the voice chat first");
        if(!serverQueue)
            return message.channel.send("There is nothing to skip!");
        serverQueue.connection.dispatcher.end();
    }
})
 
client.login(config.BOT_TOKEN);
