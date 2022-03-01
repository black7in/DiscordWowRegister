const { MessageEmbed  } = require('discord.js');

function NewEmbed(inter, color, title, description, imgThumbnail, img){
    const embed = new MessageEmbed()
    .setColor('#'+color)
    .setTitle(title)
    .setAuthor({ name: 'WowRegister', iconURL: 'https://i.imgur.com/OTnUWRz.png'})
    .setThumbnail(imgThumbnail)
    .setDescription(description)
    .setImage(img)
    .setFooter({ text: `Solicitado por: ${inter.username}`, iconURL: inter.displayAvatarURL() });

    return embed;
}

module.exports = NewEmbed;