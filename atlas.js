const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  response.sendStatus(200);
});
const Discord = require("discord.js");
const ayar = require("./ayarlar.json");
const client = new Discord.Client();
const ayarlar = require('./atlas.json')
const fs = require("fs");
const moment = require("moment");
moment.locale("tr")
const chalk = require("chalk");
require("./util/eventLoader")(client);

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    console.log("Bot başarıyla giriş yaptı.")
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
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
//client.on('debug', e => {
//console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
//});

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);


// hoş geldin mesajı
client.on("guildMemberAdd", async member => {
  const kanal = member.guild.channels.cache.find(r => r.id === ayar.registerChat);

    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gecen = moment.duration(kurulus).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`)

    var kontrol;
  if (kurulus < 1296000000) kontrol = ayar.carpiEmoji
  if (kurulus > 1296000000) kontrol = ayar.tikEmoji
  moment.locale("tr");
  kanal.send("<@" +member+ "> tanıdıksan etiket at kaydol caniko <:ciddiwink:1101101608353415188>")
  });


// otorol
client.on("guildMemberAdd", async member => {
  var kanal = (ayar.otorolLog);
  var rol = (ayar.kayitsizRolu);

  if(!kanal) return;
  if(!rol) return;
  member.roles.add(`${rol}`)
  member.guild.channels.cache.get(`${kanal}`).send(new Discord.MessageEmbed().setColor("2B2D31").setDescription(`${member} sunucuya giriş yaptı ve <@&${rol}> başarılı bir şekilde verildi!`).setFooter(`discord.gg/ciddi`).setTimestamp())

});


// botu sese çekme
//client.on("ready", () => {
//setInterval(() => {
//client.channels.cache.get(ayar.botSesKanali).join()
//}, )
//})