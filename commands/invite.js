exports.run = async (client, message ) => {
	message.channel.send(`https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot`);
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["invite"],
  permLevel: "User"
};

exports.help = {
  name: "invite",
  category: "System",
  description: "Creates an invite link for the bot",
  usage: "invite"
};