const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const { token, default_prefix } = require("./config.json")
const db = require('quick.db');

const client = new Client({
    disableEveryone: true
})




client.commands = new Collection();
client.aliases = new Collection();



["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`oye ${client.user.username} esta online!`);

    client.user.setPresence("En beta") 
})

client.on("message", async message => {
    let prefix = await db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = default_prefix;

   let RegMention = new RegExp(`^<@!?${client.user.id}>( |)$`); 

if (message.content.match(RegMention)) { 
    message.channel.send(`para obtener ayuda usa ${prefix}help`)
}

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
 
    let command = client.commands.get(cmd);

    if (!command) command = client.commands.get(client.aliases.get(cmd));

  
    if (command) 
        command.run(client, message, args);
});


client.login(token);
