const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "yeniden bağlandım kral");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);


//////////////////////////
client.on('ready', ()=>{
    client.channels.cache.get('782777338004766720').join()
    })
/////////////////////////

////////////////////
c
///////////////////

///////////////////////////////////////////
client.on("guildMemberAdd", member => {  
    const kanal = member.guild.channels.cache.find(r => r.id === "782777316660871208");
    const register = "<@&782777145146605611>"
    var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
  var üs = üyesayısı.match(/([0-9])/g)
  üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
  if(üs) {
    üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
      return {
  '0': `<a:0_:782793635758211132>`, //
    '1': `<a:1_:782793719119085569>`, //
    '2': `<a:2_:782793779055820820>`, //
    '3': `<a:3_:782793830537494528>`, //
    '4': `<a:4_:782793880633999361>`, //                        
    '5': `<a:5_:782793950682415204>`, // 
    '6': `<a:6_:782793996333350933>`, //
    '7': `<a:7_:782794179016917033>`, //
    '8': `<a:8_:782794230464512021>`, //
    '9': `<a:9_:782794265533218846>`}[d]; //
      })
    }
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
   
    var kontrol;
  if (kurulus < 1296000000) kontrol = 'Hesap Durumu: **Güvenilir Değil** <a:onaylanamad:782795627758878770>'
  if (kurulus > 1296000000) kontrol = 'Hesap Durumu: **Güvenilir Gözüküyor** <a:onayland:782795490592686150>'
    moment.locale("tr");
    const embed = new Discord.MessageEmbed()
   .setDescription("**<a:kelebek:782898806114877462> Hoşgeldin! <@" + member + "> Seninle " + üyesayısı + " Kişiyiz.\n\n<a:load:782898982924845106> Müsait olduğunda Confirmed Odalarından Birine Geçip Kaydını Yaptırabilirsin. \n\n<a:prizma:782899115687673896> <@&782777145146605611> seninle ilgilenicektir. \n\n<a:kilit:782899292644835328> Hesabın Oluşturulma Tarihi: " + moment(member.user.createdAt).format("`YYYY DD MMMM dddd`") +  "\n\n"  + kontrol + "\n\n<a:loading:776924999360446465> Tagımızı alarak `Ժ` bize destek olabilirsin.**\n")
   .setImage('https://cdn.discordapp.com/attachments/782777336566775828/782896952454676550/eac4b689332e4123a706e8eb94dd9ae7.gif')
   kanal.send(embed)
   kanal.send(register)
  });
  
///////////////////

//////////////////Oto Tag\\\\\\\\\\\\\\\\\\
client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = 'Ժ'
  const sunucu = '749597697903689849'
  const kanal = '782777402664943616'
  const rol = '781290621285302272'

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam ${newUser.username}, Sunucumuzda ${tag} Tagımızı Aldığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Sana Verdim!`)
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RED").setDescription(`${newUser} ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam **${newUser.username}**, Sunucumuzda ${tag} Tagımızı Çıkardığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Senden Aldım!`)
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});
//////////////////Oto Tag\\\\\\\\\\\\\\\\\\