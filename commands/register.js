const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton  } = require('discord.js');
const NewEmbed = require('../others/embed.js')

const button = new MessageActionRow()
		.addComponents(
		new MessageButton()
			.setCustomId('registro')
			.setLabel('Registro')
			.setEmoji('😎')
			.setStyle('SUCCESS'),
)

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Registro de cuentas.'),
	async execute(interaction) {
		const embed = NewEmbed(
			interaction.user, 
			'E74C3C', 
			'Quieres crear une cuenta?', 
			'Click 👇 aquí para crear una cuenta por medio de Discord.', 
			'', 
			''
		); 
        return interaction.reply({ ephemeral: false, embeds: [embed], components: [button] });
	},
};