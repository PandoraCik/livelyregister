const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
    if(!['782777145146605611'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`)
  
    let member = message.mentions.users.first() || args[0];
    if(!member) return message.channel.send('Bir kişiyi etiketlemelisin')
    let eskiisimler = await db.fetch(`eskiad_${member.id}`) || 'Eski ismi yok'
    let toplamik = await db.fetch(`toplamik_${member.id}`) || '0'


    const kayıtlılar = new Discord.MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true}))
.setThumbnail(message.author.avatarURL ({ dynamic: true}))
.setDescription(`Kullanıcının Eski İsimleri:\n ${eskiisimler}`)
.setFooter(`Kullanıcının Toplam İsimleri: ${toplamik}`)
message.channel.send(kayıtlılar)

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}
exports.help = {
  name: 'isimler',
  description: "kişinin eski isimlerini gösterir",
  usage: 'isimler @kişi'
}