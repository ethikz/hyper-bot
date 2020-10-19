exports.run = async (client, message, args) => {
	let toMute = message.mentions.members.first() || message.guild.members.cache.find(r => r.name === args[0]);

	if (!toMute) {
		return message.channel.send('You did not specify a user mention ID!');
	}

	if (toMute.id == message.author.id) {
		return message.channel.send('You cannot unmute yourself!');
	}

	if (toMute.roles.highest.position >= message.member.roles.highest.position) {
		return message.channel.send('You cannot unmute a member who is higher or has the same role as you!');
	}

	let role = message.guild.roles.cache.find(r => r.name == 'Muted');

	if (!toMute.roles.cache.has(role.id)) {
		return message.channel.send('This user is not muted!');
	}

	await toMute.roles.remove(role);

	message.channel.send(`${toMute} was unmuted`);
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["unmute", "umute"],
	permLevel: "Moderator"
};

exports.help = {
	name: "unmute",
	category: "Moderation",
	description: "unmute a specific user",
	usage: "unmute [tagged user]"
};