const Discord = require('discord.js');

module.exports.run = async (bot, message, args,LapisEmoji,error) => {
    /* extract search query from message */
 
    var parts = message.content.split(" ");

    var search = parts.slice(1).join(" "); // Slices of the command part of the array ["!image", "cute", "dog"] ---> ["cute", "dog"] ---> "cute dog"
    try
    {
        const axios = require("axios");
        const encodedString = encodeURI(search);

        const AXIOS_OPTIONS = {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.74 Safari/537.36 Edg/79.0.309.43",
          },
          params: { q: encodedString, tbm: "isch" },
        };

        const decodeUrl = url => decodeURIComponent(JSON.parse(`"${url}"`))

        function getLinks() {
          return axios
            .get(`https://www.google.com/search`, AXIOS_OPTIONS)
            .then(function({ data: html }) {
              const pattern =
                /\[1,\[0,"(?<id>[\d\w\-_]+)",\["https?:\/\/(?:[^"]+)",\d+,\d+\]\s?,\["(?<url>https?:\/\/(?:[^"]+))",\d+,\d+\]/gm;            
              const matches = html.matchAll(pattern);           
              return [...matches].map(({ groups: { url } }) => decodeUrl(url))
            });
        }
        getLinks().then((links) =>{
            const random = Math.floor(Math.random() * links.length);
            message.channel.send("There it is dude "+ message.author.username+"\n"+links[random])
        });

    }
    catch
    {
        error.error(message);
    }

}

module.exports.config = {
    name: "image",
    description: "search an specific image",
    usage: "?image",
    accessableby: "Members",
    help:"?image <image to search>",
    aliases: ['img']
}