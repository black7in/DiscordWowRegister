const { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('consola')
		.setDescription('Panel de administración del servidor.')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId('consola_info')
				.setLabel('Info')
				.setEmoji('📊')
				.setStyle(ButtonStyle.Primary),
			new ButtonBuilder()
				.setCustomId('consola_tickets')
				.setLabel('Tickets')
				.setEmoji('🎫')
				.setStyle(ButtonStyle.Primary),
			new ButtonBuilder()
				.setCustomId('consola_gmin')
				.setLabel('GM In')
				.setEmoji('👤')
				.setStyle(ButtonStyle.Primary),
			new ButtonBuilder()
				.setCustomId('consola_comando')
				.setLabel('Comando')
				.setEmoji('⌨️')
				.setStyle(ButtonStyle.Secondary),
		);

		await interaction.reply({
			content: '🖥️ **Consola del servidor**',
			components: [row],
		});
	},
};
