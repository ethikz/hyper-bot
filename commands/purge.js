exports.run = async (client, message, args ) => {
	const amount = parseInt(args[0]) + 1;

	if (isNaN(amount)) {
		return message.reply('that doesn\'t seem to be a valid number');
	} else if (amount < 1 || amount > 100) {
		return message.reply("you need to input a number between 1 and 99.");
	}

	message.channel.bulkDelete(amount, true).catch(err => {
		console.log(err);
		message.channel.send('there was an error trying to prune messages in this channel');
	});
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["purge", "prune"],
  permLevel: "Moderator"
};

exports.help = {
  name: "purge",
  category: "Moderation",
  description: "Deletes a specified number of messages",
  usage: "purge [number]"
};