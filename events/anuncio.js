const { EmbedBuilder, MessageFlags, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		// Botón Embed
		if (interaction.isButton() && interaction.customId.startsWith('anuncioEmbed_')) {
			const channelId = interaction.customId.split('_')[1];
			const modal = new ModalBuilder()
				.setCustomId(`anuncioModalEmbed_${channelId}`)
				.setTitle('Nuevo Anuncio (Embed)')
				.addComponents(
					new ActionRowBuilder().addComponents(
						new TextInputBuilder()
							.setCustomId('titulo')
							.setLabel('Título')
							.setStyle(TextInputStyle.Short)
							.setRequired(false)
							.setMaxLength(256)
					),
					new ActionRowBuilder().addComponents(
						new TextInputBuilder()
							.setCustomId('descripcion')
							.setLabel('Descripción')
							.setStyle(TextInputStyle.Paragraph)
							.setRequired(true)
							.setMaxLength(4000)
					),
					new ActionRowBuilder().addComponents(
						new TextInputBuilder()
							.setCustomId('color')
							.setLabel('Color hex (ej: E74C3C)')
							.setStyle(TextInputStyle.Short)
							.setRequired(false)
							.setMaxLength(6)
							.setPlaceholder('7289DA')
					),
					new ActionRowBuilder().addComponents(
						new TextInputBuilder()
							.setCustomId('imagen')
							.setLabel('URL de imagen (opcional)')
							.setStyle(TextInputStyle.Short)
							.setRequired(false)
					),
				);
			return interaction.showModal(modal);
		}

		// Botón Texto plano
		if (interaction.isButton() && interaction.customId.startsWith('anuncioPlain_')) {
			const channelId = interaction.customId.split('_')[1];
			const modal = new ModalBuilder()
				.setCustomId(`anuncioModalPlain_${channelId}`)
				.setTitle('Nuevo Anuncio')
				.addComponents(
					new ActionRowBuilder().addComponents(
						new TextInputBuilder()
							.setCustomId('mensaje')
							.setLabel('Mensaje')
							.setStyle(TextInputStyle.Paragraph)
							.setRequired(true)
							.setMaxLength(2000)
					),
				);
			return interaction.showModal(modal);
		}

		if (!interaction.isModalSubmit()) return;

		// Modal Embed
		if (interaction.customId.startsWith('anuncioModalEmbed_')) {
			const channelId = interaction.customId.split('_')[1];
			const channel = interaction.guild.channels.cache.get(channelId);
			if (!channel) return interaction.reply({ content: 'No se encontró el canal.', flags: MessageFlags.Ephemeral });

			const titulo = interaction.fields.getTextInputValue('titulo');
			const descripcion = interaction.fields.getTextInputValue('descripcion');
			const color = interaction.fields.getTextInputValue('color') || '7289DA';
			const imagen = interaction.fields.getTextInputValue('imagen');

			const embed = new EmbedBuilder()
				.setColor('#' + color)
				.setDescription(descripcion)
				.setTimestamp();

			if (titulo) embed.setTitle(titulo);
			if (imagen) embed.setImage(imagen);

			await channel.send({ embeds: [embed] });
			return interaction.reply({ content: `Anuncio enviado en ${channel}.`, flags: MessageFlags.Ephemeral });
		}

		// Modal Texto plano
		if (interaction.customId.startsWith('anuncioModalPlain_')) {
			const channelId = interaction.customId.split('_')[1];
			const channel = interaction.guild.channels.cache.get(channelId);
			if (!channel) return interaction.reply({ content: 'No se encontró el canal.', flags: MessageFlags.Ephemeral });

			const mensaje = interaction.fields.getTextInputValue('mensaje');
			await channel.send(mensaje);
			return interaction.reply({ content: `Anuncio enviado en ${channel}.`, flags: MessageFlags.Ephemeral });
		}
	},
};
