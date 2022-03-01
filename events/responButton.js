const { MessageEmbed  } = require('discord.js');

const embed = new MessageEmbed()
    .setColor('#ff00ff')
    .setTitle('Registro de cuentas WowRegister')
    .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/WoW_icon.svg/1200px-WoW_icon.svg.png')
    .setDescription('Para crear una cuenta debes usar el comando:\n\n.register user password mail\n\nDonde:\n1⃣  user: es el usuario.\n2⃣  password: contrasenia.\n3⃣  mail: un correo válido.\n\nEjemplo:\n		.register pepito pepito123 pepito@gmail.com\n\n\Nota: Es importante respetar los espacios entre los datos.\n\n\nRecuerda no usar este comando en canales publicos para que otros no vean tus datos.'
);

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
        if (!interaction.isButton()) return;

        if(interaction.customId == 'registro'){
            interaction.deferUpdate()
            interaction.user.send({ ephemeral: true, embeds: [embed] });
        }
	},
};