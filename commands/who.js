const { SlashCommandBuilder } = require('@discordjs/builders');
const NewEmbed = require('../others/embed.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('who')
		.setDescription('Quién está conectado?.'),
	async execute(interaction) {
        const char = require('../others/characters.js')
        char.query("SELECT name FROM characters WHERE online = 1 LIMIT 10;", function (err, result) {
			if (err) throw err;  
            var string = ``;

            if(result.length > 0){
                for (let index = 0; index < result.length; index++) {
                    string += `${'**'+ (index+1) + ':**'}` + " " + result[index].name + ".\n"
                }
            }else
                string = `${'**No hay jugadores conectados.**'}`;

            const embed = NewEmbed(
                interaction.user, 
                'E74C3C', 
                'Personajes Online: ' + result.length, 
                string, 
                'https://i.imgur.com/2i5hZHn.png', 
                'https://images7.alphacoders.com/111/1111389.jpg'
            );
            return interaction.reply({ embeds: [embed] });
		});
	},
};