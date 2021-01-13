const db = require('quick.db');

const discord = require('discord.js')


module.exports = {
  name: "prefix",
  description: "cambiar el prefix",
  category: "moderacion",
  usage: "prefix <nuevo prefix>",
  run: async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send(":x: no puedes hacer esto");

        if(!args[0]) return message.channel.send(":x: necesito el nuevo prefix");

        if(args[1]) return message.channel.send(":x: el prefix no puede tener dos espacios");

        db.set(`prefix_${message.guild.id}`, args[0])

        message.channel.send(`El nuevo prefix es **${args[0]}**`)
    }
}
