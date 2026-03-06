const { EmbedBuilder } = require('discord.js');

function NewEmbed(inter, color, title, description, imgThumbnail, img){
    const embed = new EmbedBuilder()
    .setColor('#'+color)
    .setTitle(title)
    .setAuthor({ name: 'WowRegister', iconURL: 'https://i.imgur.com/OTnUWRz.png'})
    .setDescription(description)
    .setFooter({ text: `Solicitado por: ${inter.username}`, iconURL: inter.displayAvatarURL() });

    if (imgThumbnail) embed.setThumbnail(imgThumbnail);
    if (img) embed.setImage(img);

    return embed;
}

module.exports = NewEmbed;
