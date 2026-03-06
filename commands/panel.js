const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('panel')
		.setDescription('Publica el panel de registro de cuentas para anclar.'),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor('#E74C3C')
			.setTitle('Registro de Cuentas')
			.setAuthor({ name: 'WowRegister', iconURL: 'https://i.imgur.com/OTnUWRz.png' })
			.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/WoW_icon.svg/1200px-WoW_icon.svg.png')
			.setDescription('¿Quieres jugar en nuestro servidor?\n\nHaz click en el botón **Registro** y completa el formulario para crear tu cuenta.');

		const button = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('registro')
					.setLabel('Registro')
					.setEmoji('😎')
					.setStyle(ButtonStyle.Success)
			);

		await interaction.reply({ embeds: [embed], components: [button] });
	},
};
