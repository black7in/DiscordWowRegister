const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed  } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('topkill')
		.setDescription('Lista de los 6 mejores asesinos del servidor.'),
	async execute(interaction) {
        const char = require('../others/characters.js')
        var nombres = [":one: ", ":two: ", ":three: ", ":four: ", ":five: ", ":six: "];
        var kill = [':crossed_swords: Kills: ', ':crossed_swords: Kills: ', ':crossed_swords: Kills: ', ':crossed_swords: Kills: ', ':crossed_swords: Kills: ', ':crossed_swords: Kills: '];
        char.query("SELECT name, totalkills FROM characters ORDER BY totalkills DESC LIMIT 6;", function (err, result) {
			if (err) throw err;

            if(result.length > 0){
                for (let index = 0; index < result.length; index++) {
                    nombres[index] += result[index].name;
                    kill[index] += result[index].totalkills;
                }
            }
            const embed = new MessageEmbed()
            .setColor('#FFF000')
            .setTitle('TOP PVP KILL')
            .setAuthor({ name: 'WowRegister', iconURL: 'https://i.imgur.com/OTnUWRz.png'})
            .setThumbnail('https://i.imgur.com/2i5hZHn.png')
            .setDescription(`${'```fix\n' + 'Lista de los jugadores con mayor numero de asesinatos en todo el servidor.\n' + '```'}`)
            .addFields(
                { name: nombres[0], value: kill[0], inline: true },
                { name: nombres[1], value: kill[1], inline: true },
                { name: nombres[2], value: kill[2], inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: nombres[3], value: kill[3], inline: true },
                { name: nombres[4], value: kill[4], inline: true },
                { name: nombres[5], value: kill[5], inline: true },
            )
            .setImage('https://images7.alphacoders.com/111/1111389.jpg')
            .setFooter({ text: `Solicitado por: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });
            return interaction.reply({ embeds: [embed] });
        });
	},
};