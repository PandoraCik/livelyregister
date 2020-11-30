const Discord = require("discord.js");

exports.run = async (client, message, args) => {
//------------------------------------STRIGA--CODE-----------------------------------\\
  
let tag = "Ժ";
const aktif = message.guild.members.cache.filter(aktif => aktif.presence.status != "offline").size
const toplam = message.guild.memberCount
const ses = message.guild.channels.cache.filter(channel => channel.type === "voice").map(channel => channel.members.size).reduce((a, b) => a + b)
const tagli = message.guild.members.cache.filter(t => t.user.username.includes(tag)).size
const booster = message.guild.roles.cache.get('749797770831069345').members.size

//------------------------------------STRIGA--CODE-----------------------------------\\

const embed = new Discord.MessageEmbed()
.setColor('BLACK')
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`**Toplam Üye ・ \`${toplam}\`
Aktif Üye ・ \`${aktif}\`
Sesteki Üye ・ \`${ses}\`
Taglı Üye・ \`${tagli}\`
Booster Üye ・ \`${booster}\`**`)
message.channel.send(embed)
}

//------------------------------------STRIGA--CODE-----------------------------------\\

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "say"
};