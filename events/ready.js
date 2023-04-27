module.exports = client => {
  client.user.setStatus("DND");
  console.log(`${client.user.username} adı ile giriş yapıldı!`) 
client.user.setActivity(`discord.gg/ciddi`, { type: "WATCHING"});
};
