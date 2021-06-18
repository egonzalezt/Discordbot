const axios = require("axios");

const gemlist = ["Rose_Quartz","Pearl","Amethyst","Ruby","Sapphire","Peridot","Bismuth","Lapis_Lazuli","Biggs_Jasper","Snowflake_Obsidian","Larimar","Bismuth","White_Diamond","Yellow_Diamond",
"Blue_Diamond","Pink_Diamond","Emerald","Hessonite","Demantoid","Pyrope","Aquiamarine","Topaz","Nephrite","Peridot_(Squaridot)","Jasper","Holly_Blue_Agate","Cherry_Quartz","Zircon","Spinel","Garnet"
,"Opal","Sugilite","Alexandrite","Rainbow_Quartz","Sardonyx","Obsidian","Stevonnie","Smoky_Quartz","Sunstone","Rainbow_Quartz_2.0","Malachite","Ruby_(Giant_Ruby)","Rhodonite","Mega_Pearl","The_Cluster"
,"Ocean_Jasper","Lace_Amethyst","Blue_Lace_Agate","Angel_Aura_Quartz","Bixbite","Heaven_Beetle","Earth_Beetle"]

module.exports.run = async (bot, message, args,LapisEmoji,error) => {
    //var parts = message.content.split(" ");
    var gem = gemlist[Math.floor(Math.random() * gemlist.length)];
    var search = "Steven Universe "+gem; // Slices of the command part of the array ["!image", "cute", "dog"] ---> ["cute", "dog"] ---> "cute dog"
    
    message.channel.send("Loading..."+ "https://media1.tenor.com/images/cee0050ee665b830cb5e56a4895a74f4/tenor.gif").then(msg => {
        try
        {
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

            msg.edit(gem).then(() => 
            {   
                getLinks().then((links) =>{
                    message.channel.send(links[0]).then(msg1 => 
                        {
                            msg1.react(LapisEmoji.Lapis5.Emoji);
                        });   
                });                   
            }).catch(() => {
              error.error(message);
          });

        }
        catch
        {
            error1.error(message);
        }
    });
}

module.exports.config = {
    name: "gem",
    description: "Gets a random SU gem character",
    usage: "?gem",
    accessableby: "Members",
    help:"only type ?gem",
    aliases: []
}