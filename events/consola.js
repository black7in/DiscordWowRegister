const { MessageFlags, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle } = require('discord.js');
const { executeCommand } = require('../others/soap.js');

async function handleSoap(interaction, command, label) {
    const isModal = interaction.isModalSubmit();

    if (isModal) {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    } else {
        await interaction.deferUpdate();
    }

    try {
        const result = await executeCommand(command);
        const embed = new EmbedBuilder()
            .setColor('#2ECC71')
            .setTitle(`🖥️ ${label}`)
            .setDescription(`\`\`\`${result || 'Sin respuesta.'}\`\`\``)
            .setFooter({ text: `Ejecutado por: ${interaction.user.username}` })
            .setTimestamp();

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('consola_comando')
                .setLabel('Comando')
                .setEmoji('⌨️')
                .setStyle(ButtonStyle.Secondary),
        );

        await interaction.channel.send({ embeds: [embed], components: [row] });

        if (isModal) await interaction.deleteReply();
    } catch (err) {
        console.error(err);
        const msg = `❌ Error al conectar con SOAP: \`${err.message}\``;
        if (isModal) {
            await interaction.editReply({ content: msg });
        } else {
            await interaction.channel.send(msg);
        }
    }
}

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isButton() && interaction.customId.startsWith('consola_')) {
            if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
                return interaction.reply({ content: '❌ No tienes permisos para usar esto.', flags: MessageFlags.Ephemeral });
            }

            if (interaction.customId === 'consola_info') {
                return handleSoap(interaction, 'server info', 'Info del Servidor');
            }
            if (interaction.customId === 'consola_tickets') {
                return handleSoap(interaction, 'ticket list', 'Lista de Tickets');
            }
            if (interaction.customId === 'consola_gmin') {
                return handleSoap(interaction, 'gm ingame', 'GMs en Línea');
            }
            if (interaction.customId === 'consola_comando') {
                const modal = new ModalBuilder()
                    .setCustomId('consolaModal')
                    .setTitle('Ejecutar Comando')
                    .addComponents(
                        new ActionRowBuilder().addComponents(
                            new TextInputBuilder()
                                .setCustomId('comando')
                                .setLabel('Comando')
                                .setStyle(TextInputStyle.Short)
                                .setRequired(true)
                                .setPlaceholder('server info')
                        ),
                    );
                return interaction.showModal(modal);
            }
        }

        if (interaction.isModalSubmit() && interaction.customId === 'consolaModal') {
            const command = interaction.fields.getTextInputValue('comando');
            return handleSoap(interaction, command, `Comando: ${command}`);
        }
    },
};
