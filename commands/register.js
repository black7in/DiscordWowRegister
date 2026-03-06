const { SlashCommandBuilder } = require('discord.js');
const { buildRegisterModal } = require('../events/responButton.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Registro de cuentas.'),
	async execute(interaction) {
		await interaction.showModal(buildRegisterModal());
	},
};
