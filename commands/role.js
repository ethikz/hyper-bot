exports.run = async (client, message, args) => {
	const Discord = require("discord.js");
	const role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name === args[0]);

	if (!role || undefined) {
		return message.reply('please enter a valid role.');
	}
	
	const permsObj = role;
	const permissions = Object.keys(role).filter(perm => permsObj[perm]);
	const roleEmbed = new Discord.MessageEmbed()
		.setColor(role.hexColor)
		.setThumbnail(message.guild.iconURL)
		.setTitle('Role Info')
		.addField(':arrow_right: Name', role.name, true)
		.addField(':arrow_right: ID', role.id, true)
		.addField(':arrow_right: Creation Date', role.createdAt.toDateString(), true)
		.addField(':arrow_right: Hoisted', role.hoist ? 'Yes' : 'No', true)
		.addField(':arrow_right: Mentionable', role.mentionable ? 'Yes' : 'No', true)
		.addField(':arrow_right: Permissions', permissions.join(' | ') || 'None');

	message.channel.send(roleEmbed);
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["role"],
	permLevel: "Moderator"
};

exports.help = {
	name: "role",
	category: "Moderation",
	description: "provides detailed infos about a particular role in the guild",
	usage: "role [role name]"
};