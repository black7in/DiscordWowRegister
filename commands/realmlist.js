const { realmlist } = require('../config.json')
const { SlashCommandBuilder } = require('@discordjs/builders');
const NewEmbed = require('../others/embed.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('realmlist')
		.setDescription('Cual es el reamlist del servidor?.'),
	async execute(interaction) {
            const embed = NewEmbed(
                interaction.user, 
                '00FF00', 
                'Realmlist del Servidor.', 
                `${'**set realmlist '}` + realmlist +`${'**'}`+ '\n\nAbrir el archivo realmlist.wtf copia, pega y guarda.', 
                'https://i.imgur.com/2i5hZHn.png', 
                'https://images2.alphacoders.com/121/1215841.jpg'
            );
            return interaction.reply({ embeds: [embed] });
	}
};
