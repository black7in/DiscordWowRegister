const { GetSRP6RegistrationData, validateMail, validateUser } = require('../others/functions.js');
const { MessageFlags, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const NewEmbed = require('../others/embed.js');
const { realmlist } = require('../config.json');

function buildRegisterModal() {
	const modal = new ModalBuilder()
		.setCustomId('registerModal')
		.setTitle('Registro de Cuenta WoW');

	modal.addComponents(
		new ActionRowBuilder().addComponents(
			new TextInputBuilder()
				.setCustomId('username')
				.setLabel('Usuario (letras y números, 3-16 chars)')
				.setStyle(TextInputStyle.Short)
				.setMinLength(3)
				.setMaxLength(16)
				.setRequired(true)
		),
		new ActionRowBuilder().addComponents(
			new TextInputBuilder()
				.setCustomId('password')
				.setLabel('Contraseña (4-16 caracteres)')
				.setStyle(TextInputStyle.Short)
				.setMinLength(4)
				.setMaxLength(16)
				.setRequired(true)
		),
		new ActionRowBuilder().addComponents(
			new TextInputBuilder()
				.setCustomId('email')
				.setLabel('Correo electrónico')
				.setStyle(TextInputStyle.Short)
				.setRequired(true)
		),
	);

	return modal;
}

module.exports = {
	buildRegisterModal,
	name: 'interactionCreate',
	async execute(interaction) {
		if (interaction.isButton()) {
			if (interaction.customId === 'registro') {
				await interaction.showModal(buildRegisterModal());
			}
			return;
		}

		if (!interaction.isModalSubmit()) return;
		if (interaction.customId !== 'registerModal') return;

		await interaction.deferReply({ flags: MessageFlags.Ephemeral });

		const user = interaction.fields.getTextInputValue('username').toUpperCase();
		const password = interaction.fields.getTextInputValue('password').toUpperCase();
		const mail = interaction.fields.getTextInputValue('email');

		if (!validateUser(user)) {
			const embed = NewEmbed(interaction.user, 'E74C3C', 'Registro de cuentas', 'El usuario no es válido. Usa solo letras y números (3-16 caracteres).', '', '');
			return interaction.editReply({ embeds: [embed] });
		}

		if (!validateMail(mail)) {
			const embed = NewEmbed(interaction.user, 'E74C3C', 'Registro de cuentas', 'El correo electrónico no es válido.', '', '');
			return interaction.editReply({ embeds: [embed] });
		}

		const auth = require('../others/auth.js');
		const data = GetSRP6RegistrationData(user, password);

		auth.query(
			'INSERT INTO account (username, salt, verifier, email) VALUES (?, ?, ?, ?)',
			[user, data[0], data[1], mail],
			function (err, result) {
				if (err) {
					if (err.errno == 1062) {
						const embed = NewEmbed(interaction.user, 'E74C3C', 'Registro de cuentas', 'El usuario ya existe, elige otro nombre.', '', '');
						return interaction.editReply({ embeds: [embed] });
					}
					console.error(err);
					const embed = NewEmbed(interaction.user, 'E74C3C', 'Registro de cuentas', 'Error de sistema. Inténtalo más tarde.', '', '');
					return interaction.editReply({ embeds: [embed] });
				}

				const embed = NewEmbed(
					interaction.user,
					'2ECC71',
					'Registro de Cuentas',
					`¡Cuenta registrada con éxito!\n\nPara conectarte copia y pega en tu realmlist.wtf:\n\`\`\`set realmlist ${realmlist}\`\`\``,
					'https://i.imgur.com/2i5hZHn.png',
					''
				);
				return interaction.editReply({ embeds: [embed] });
			}
		);
	},
};
