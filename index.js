const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed  } = require('discord.js');
const { token, NameServer, channelId, mysql} = require('./config.json');
const { computeVerifier, params } = require(`trinitycore-srp6`);
const { createConnection } = require('mysql');
var crypto = require('crypto');

const client = new Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION'],  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES]});

let db = createConnection(mysql);

db.connect(err => {
    if (err) return console.log(err);

    console.log(`MySQL has been connected!`);
});

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity(NameServer, {type: "PLAYING"});
	const chann = client.channels.cache.find(chann => chann.id == channelId);

	const embed = new MessageEmbed()
		.setColor('#E74C3C')
		.setTitle('Quieres crear une cuenta?')
		//.setURL('https://discord.js.org')
		.setDescription('Click 👇 aquí para crear una cuenta por medio de Discord.'
	);

	const button = new MessageActionRow()
		.addComponents(
		new MessageButton()
			.setCustomId('registro')
			.setLabel('Registro')
			.setEmoji('😎')
			.setStyle('SUCCESS'),
	);	
	chann.send({ ephemeral: true, embeds: [embed], components: [button] });
});

client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
	if(interaction.customId == 'registro'){
		interaction.deferUpdate()
		const embed = new MessageEmbed()
			.setColor('#ff00ff')
			.setTitle('Registro de cuentas ' + NameServer)
			.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/WoW_icon.svg/1200px-WoW_icon.svg.png')
			.setDescription('Para crear una cuenta debes usar el comando:\n\n.register user password mail\n\nDonde:\n1⃣  user: es el usuario.\n2⃣  password: contrasenia.\n3⃣  mail: un correo válido.\n\nEjemplo:\n		.register pepito pepito123 pepito@gmail.com\n\n\Nota: Es importante respetar los espacios entre los datos.\n\n\nRecuerda no usar este comando en canales publicos para que otros no vean tus datos.'
		);
		interaction.user.send({ ephemeral: true, embeds: [embed] });
	}
});

function validateUser(username){
	if(!(username.length > 2 && username.length <= 16))
		return false

	var usernameRegex = /^[a-zA-Z0-9]+$/;
	var validfirstUsername = username.match(usernameRegex)
	if (validfirstUsername == null)
		return false

	return true
}
function validateMail(mail){
	var mail_format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	
	if(mail.match(mail_format))
		return true;
	else
		return false;
}

var genRandomString = function(length){
    //return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
	return crypto.randomBytes(32)
};

function GetSRP6RegistrationData(username, password){
	var salt = genRandomString(32);

	const Verifier = computeVerifier(
		params.trinitycore, 
		Buffer.from(salt), 
		username.toUpperCase(), 
		password.toUpperCase()
	)
	return new Array(salt, Verifier);
}

/*function VerifySRP6Login(username, password, salt, verifier){
	const checkVerifier = computeVerifier(
		params.trinitycore, 
		Buffer.from(salt), 
		username.toUpperCase(), 
		password.toUpperCase()
	)
	if(checkVerifier === verifier)
		return true
	else
		return false
}*/

function createEmbed(type){
	const embed = new MessageEmbed()
	.setColor('#ff00ff')
	.setTitle('Registro de cuentas ' + NameServer)
	.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/WoW_icon.svg/1200px-WoW_icon.svg.png');
	switch (type) {
		case 0:
			embed.setDescription('Correo invalido, por favor ingrese un correo válido.\nEjemplo:\n\n🟢  .register pepito pepito123 pepito@gmail.com')
			embed.setColor('#df0101')
			break;
		case 1:
			embed.setDescription('Usuario inválido o ya existente, por favor ingrese otro usuario.\nEjemplo:\n\n🟢  .register pepito pepito123 pepito@gmail.com')
			embed.setColor('#df0101')
			break;
		case 2:
			embed.setDescription('Contraseña inválida, por favor ingrese otra contraseña con más de 4 dígitos.\nEjemplo:\n\n🟢  .register pepito pepito123 pepito@gmail.com')
			embed.setColor('#df0101')
			break;
		default:
			embed.setDescription('Registrado con éxito.\n\nPara proteger sus datos se recomienda eliminar los mensajes.\n\nGracias por unirte a nuestro servidor!. 🙋')
			embed.setColor('#01df01')
			break;
	}
	return embed
}

client.on('messageCreate', (msg) => {
	if(msg.channel.type === 'DM'){
		var args = msg.content.replace(/\s+/g, ' ').split(" ")
		if (args[0] == ".register"){
			var user = args[1].toUpperCase();
			var pass = args[2].toUpperCase();
			var mail = args[3];
			//validar correo
			if(validateMail(mail)){
				//validar usuario
				if(validateUser(user)){
					db.query("SELECT id FROM account WHERE username = '" + user + "';", function (err, result, fields) {
						if (err) throw err;
						if (!(result.length > 0)){
							//validar contrasenia
							if(pass.length >= 4 && pass.length <= 16){
								//procesar contrasenia y registrar en DB
								var data = GetSRP6RegistrationData(user, pass)
								//var sql = "INSERT INTO account (username, salt, verifier) VALUES ('" + user + "', '" + data[0] + "', '" + data[1] + "')";
								db.query('INSERT INTO account (username, salt, verifier, email) VALUES (?, ?, ?, ?)', [user, data[0], data[1], mail], function (err, result) {
									if (err) throw err;

									console.log("Nueva cuenta registrada.");

									const embed = createEmbed(-1)
									msg.channel.send({ ephemeral: true, embeds: [embed] });
								});
							}else{
								//console.log('COntrasenia muy corta')
								const embed = createEmbed(2)
								msg.channel.send({ ephemeral: true, embeds: [embed] });
							}
						}else{
							//console.log("Usuario ya existe.");
							const embed = createEmbed(1)
							msg.channel.send({ ephemeral: true, embeds: [embed] });
						}
					});
				}else{
					//Usuario corto
					const embed = createEmbed(1)
					msg.channel.send({ ephemeral: true, embeds: [embed] });
				}
			}else{
				const embed = createEmbed(0)
				msg.channel.send({ ephemeral: true, embeds: [embed] });
				//console.log("Error correo invalido.");
			}
		}
	}
});

client.login(token);