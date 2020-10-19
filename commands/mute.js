exports.run = async (client, message, args) => {
	let toMute = message.mentions.members.first() || message.guild.members.cache.find(r => r.name === args[0]);

	if (!toMute) {
		return message.channel.send('You did not specify a user mention ID!');
	}

	if (toMute.id == message.author.id) {
		return message.channel.send('You cannot mute yourself!');
	}

	if (toMute.roles.highest.position >= message.member.roles.highest.position) {
		return message.channel.send('You cannot mute a member who is higher or has the same role as you!');
	}

	let role = message.guild.roles.cache.find(r => r.name == 'Muted');


	if (toMute.roles.cache.has(role.id)) {
		return message.channel.send('This user is already muted!');
	}

	if (isNaN(args[1])) {
		return message.reply('Mute time doesn\'t seem to be a valid number');
	}

	await toMute.roles.add(role);

	message.channel.send(`${toMute} was muted for ${args[1]} minute(s)`);

	setTimeout( () => unMute(role), (args[1] * 60000));

	function unMute(role) {
		toMute.roles.remove(role)
	}
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["mute", "silence"],
	permLevel: "Moderator"
};

exports.help = {
	name: "mute",
	category: "Moderation",
	description: "mute a specific user",
	usage: "mute [tagged user] [mute time]"
};