const { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('anuncio')
		.setDescription('Envía un anuncio en el canal indicado.')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addChannelOption(option =>
			option.setName('canal')
				.setDescription('Canal donde enviar el anuncio')
				.setRequired(true)
		),
	async execute(interaction) {
		const channel = interaction.options.getChannel('canal');

		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId(`anuncioEmbed_${channel.id}`)
				.setLabel('Embed')
				.setEmoji('📊')
				.setStyle(ButtonStyle.Primary),
			new ButtonBuilder()
				.setCustomId(`anuncioPlain_${channel.id}`)
				.setLabel('Texto plano')
				.setEmoji('💬')
				.setStyle(ButtonStyle.Secondary),
		);

		await interaction.reply({
			content: `¿Qué tipo de anuncio quieres enviar en ${channel}?`,
			components: [row],
			flags: MessageFlags.Ephemeral,
		});
	},
};
