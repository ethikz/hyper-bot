exports.run = async (client, message, args) => {
	const role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name === args[0]);
	
	if (!role) {
		return;
	}

	let userID = args.includes('<@!') ? args.replace('<@!', '').replace('>', '') :
		args.includes('<@') ? args.replace('<@', '').replace('<', '') : '';

	if (userID == '') {
		message.reply('Invalid user ID or mention.');
		return;
	}

	message.guild.fetchMember(userID).then(member => {
		member.kick("Banned by " + message.author.tag).then(m => {
			message.channel.send('🔨 Banned <@' + userID + '>.');
		}).catch(() => {
			console.error;
			message.reply('Could not ban the specified member.');
		});
	});
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["ban"],
	permLevel: "Moderator"
};

exports.help = {
	name: "ban",
	category: "Moderation",
	description: "ban a specific user",
	usage: "ban [tagged user]"
};