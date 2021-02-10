const Discord = require('discord.js');
const cheerio = require("cheerio");
const request = require("request");
const path = require('path')
let locate  = path.resolve('handler', 'error.js');
const error = require(locate);

module.exports.run = async (bot, message, args,LapisEmoji) => {
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
                error.error(message);
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
                error.error(message);
                return;
            }
 
            // Send result
            message.channel.send("There it is dude "+ message.author.username+"\n"+urls[0] );
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
    aliases: ['img']
}