const Discord = require("discord.js");
const db = require('quick.db');

exports.run = (client, message, args) => {
  

  
////////ayarlamalar\\\\\\\\
const kalp = client.emojis.cache.find(emoji => emoji.name === 'kelebek');
const ayıcık = client.emojis.cache.find(emoji => emoji.name === 'tavan');

const kayıtlıerkek = message.guild.roles.cache.find(r => r.id === '781290622631936021');
const kayıtlıerkek2 = message.guild.roles.cache.find(r => r.id === '782777184293093426');
const kayıtlıerkek3 = message.guild.roles.cache.find(r => r.id === '782777184971784202');
const kayıtsız = message.guild.roles.cache.find(r => r.id === '782777186464694282');
const kayıtlog = message.guild.channels.cache.find(c => c.id === '782891183013101598');
const genelchat = message.guild.channels.cache.find(c => c.id === '782777345719140423');

////////ayarlamalar\\\\\\\\

let tag = "Ժ"

let member = message.mentions.users.first() || args[0];
let pandoraisrose = message.guild.member(member) 

let isim = args[1];
let yaş = args[2];

let toplamaisim = `${tag} ${isim} ${yaş}`


////////////Eğer Yoksalar\\\\\\\\\\\\\
if (!member) return message.reply('Bir üye belirtmeniz lazım.');
if (!isim) return message.reply('İsim belirlemelisin.');
if (!yaş) return message.reply('Yaş belirlemelisin.');
if (!kayıtlıerkek) return message.reply('erkek rolü ayarlanmamış');
if (!kayıtsız) return message.reply('kayıtsız rolü ayarlanmamış.');
if(!['782777145146605611'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`)
////////////Eğer Yoksalar\\\\\\\\\\\\\
  
  
  
////////////
pandoraisrose.roles.add(kayıtlıerkek)
pandoraisrose.roles.add(kayıtlıerkek2)
pandoraisrose.roles.add(kayıtlıerkek3)
pandoraisrose.roles.remove(kayıtsız)
pandoraisrose.setNickname(`${tag} ${isim} | ${yaş}`)
///////////
  
///////////
db.set(`kayıtlıisim_${member}`, toplamaisim) 
db.push(`eskiad_${member.id}`, toplamaisim)
db.add(`toplamik_${member.id}`, 1)


db.add(`KayıtSayi.${message.author.id}`, 1)
db.add(`erkekUye.${message.author.id}`, 1)
let erkek = db.get(`erkekUye.${message.author.id}`);
let kayıtlar = db.get(`KayıtSayi.${message.author.id}`);
///////////
  

  
  
  
  
  
  
//////////////////////Atılan Mesajlar//////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////
genelchat.send(`${pandoraisrose}, Hoş geldin aramıza. iyi eğlenceler ve hoş vakitler geçirmen dileğiyle. ${ayıcık}`)
/////////////////////////////////////////////////////////////////////////////////////////////
  
const pandoraisroseembed = new Discord.MessageEmbed()
 .setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true}))
 .setThumbnail(message.author.avatarURL ({ dynamic: true}))
 .setDescription(`• Kayıt Eden: <@${message.author.id}>
                 • Kayıt Edilen: <@${pandoraisrose.user.id}>
                 • Verilen Rol: <@&${kayıtlıerkek.id}>,<@&${kayıtlıerkek2.id}>,<@&${kayıtlıerkek3.id}>
                 • Alınan Rol: <@&${kayıtsız.id}>
                 • Yeni İsim: \`${isim}\` \`${yaş}\`
                 • Kayıt Edilen Kanal: <#${message.channel.id}>
                 • Toplan Kayıtlar: \`${kayıtlar}\``)
 .setColor(`265ec9`)
kayıtlog.send(pandoraisroseembed)
  
  
  

//////////////////////Atılan Mesajlar//////////////////////
  
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['e', 'erkek', 'man', 'boy'],
    permLevel: 0
};

exports.help = {
    name: 'erkek',
};