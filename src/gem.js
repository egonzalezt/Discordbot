const Discord = require('discord.js');
const cheerio = require("cheerio");
const request = require("request");
//const fetch = require("node-fetch");
const LapisEmoji = require("./emoji.json");


const gemcommand = {};

const gemlist = ["Rose_Quartz","Pearl","Amethyst","Ruby","Sapphire","Peridot","Bismuth","Lapis_Lazuli","Biggs_Jasper","Snowflake_Obsidian","Larimar","Bismuth","White_Diamond","Yellow_Diamond",
"Blue_Diamond","Pink_Diamond","Emerald","Hessonite","Demantoid","Pyrope","Aquiamarine","Topaz","Nephrite","Peridot_(Squaridot)","Jasper","Holly_Blue_Agate","Cherry_Quartz","Zircon","Spinel","Garnet"
,"Opal","Sugilite","Alexandrite","Rainbow_Quartz","Sardonyx","Obsidian","Stevonnie","Smoky_Quartz","Sunstone","Rainbow_Quartz_2.0","Malachite","Ruby_Fusions","Ruby_(Giant_Ruby)","Rhodonite","Mega_Pearl","The_Cluster"
,"Ocean_Jasper","Lace_Amethyst","Blue_Lace_Agate","Angel_Aura_Quartz","Bixbite","Heaven_Beetle","Earth_Beetle"]

function gem(message)
{
    //var parts = message.content.split(" ");
    var gem = gemlist[Math.floor(Math.random() * gemlist.length)];
    var search = "Steven Universe "+gem; // Slices of the command part of the array ["!image", "cute", "dog"] ---> ["cute", "dog"] ---> "cute dog"
    
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
        message.channel.send(gem +" "+"\n"+urls[0] );
    });
}

gemcommand.gem = gem;

module.exports = gemcommand;