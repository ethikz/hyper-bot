exports.run = async (client, message, args) => {
	let toKick = message.mentions.members.first() || message.guild.members.cache.find(r => r.name === args[0]);

	if (!toKick) {
		return message.channel.send('You did not specify a user mention ID!');
	}

	if (toKick.id == message.author.id) {
		return message.channel.send('You cannot kick yourself!');
	}

	if (toKick.roles.highest.position >= message.member.roles.highest.position) {
		return message.channel.send('You cannot kick a member who is higher or has the same role as you!');
	}

	if (toKick) {
		toKick
			.kick('Optional reason that will display in the audit logs')
			.then(() => {
				// We let the message author know we were able to kick the person
				message.reply(`Successfully kicked ${toKick}`);
			})
			.catch(err => {
				// An error happened
				// This is generally due to the bot not being able to kick the member,
				// either due to missing permissions or role hierarchy
				message.reply('I was unable to kick the member');
				// Log the error
				console.error(err);
			});
	} else {
		// The mentioned user isn't in this guild
		message.reply("That user isn't in this guild!");
	}
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["kick", "boot"],
	permLevel: "Moderator"
};

exports.help = {
	name: "kick",
	category: "Moderation",
	description: "kick a specific user",
	usage: "kick [tagged user]"
};