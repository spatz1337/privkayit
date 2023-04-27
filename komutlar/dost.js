const Discord = require('discord.js'); // atlas.
const ayar = require("../ayarlar.json");
exports.run = async (client, message, args) => {
 if (!message.member.roles.cache.has(ayar.kayitciRolu) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp().setThumbnail(message.author.avatarURL).setFooter(`discord.gg/ciddi`).setDescription(`Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!`)).then(m => m.delete({timeout: 8000}));
      let member = message.guild.member(
    message.mentions.users.first() || message.guild.members.cache.get(args[0])
  );
  if (!member) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp().setThumbnail(message.author.avatarURL).setFooter(`discord.gg/ciddi`).setDescription(`Lütfen argümanları doğru yerleştirdiğinizden emin olun.`)).then(m => m.delete({timeout: 8000}));
  member.roles.add(ayar.dostRolu);
     const atlaskanal = message.guild.channels.cache.find(c => c.id == ayar.chatKanali)
    const embed1 = new Discord.MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setThumbnail(message.author.avatarURL)
    .setDescription(`<@!${member.id}> kullanıcısına <@&${ayar.dostRolu}> rolü verildi`)
    .setColor("2B2D31")
    .setFooter("discord.gg/ciddi")
    .setTimestamp()
  let embed = new Discord.MessageEmbed()
  .setColor("2B2D31")
  .setTimestamp()
  .setDescription(`<@!${member.id}> kullanıcısına <@&${ayar.dostRolu}> rolü verildi`)
  .setFooter(`${message.author.username} tarafından`)
  return message.channel.send(embed).then(atlaskanal.send(embed1)).then// atlas.
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["vip","knk"],
  permLevel: 0
}
exports.help = {
  name: 'dost',
  usage: "dost [üye] [isim]",
  description: "Belirtilen üyeyi erkek olarak kaydedersiniz."
}