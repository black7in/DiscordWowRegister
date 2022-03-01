const {GetSRP6RegistrationData , validateMail, validateUser} = require('../others/functions.js')
const NewEmbed = require('../others/embed.js')
const { realmlist } = require('../config.json')
module.exports = {
	name: 'messageCreate',
	execute(msg) {
        if(msg.channel.type !== 'DM')
			return;

		var args = msg.content.replace(/\s+/g, ' ').split(" ")
		if (args[0] !== "!register")
			return;
		
		const user = args[1].toUpperCase();
		const password = args[2].toUpperCase();
		const mail = args[3];

		if(validateUser(user) === false){
			const embed = NewEmbed(msg.author, 'E74C3C', 'Registro de cuentas', 'El usuario que ingresaste no es valido.', '', '');
			return msg.channel.send({ embeds: [embed] });
		}

		if(validateMail(mail) == false){
			const embed = NewEmbed(msg.author, 'E74C3C', 'Registro de cuentas', 'El correo que ingresaste no es valido.', '', '');
			return msg.channel.send({ embeds: [embed] });
		}

		if(password.length < 4 || password.length > 16){
			const embed = NewEmbed(msg.author, 'E74C3C', 'Registro de cuentas', 'La contraseña debe tener de 4 a 16 dígitos.', '', '');
			return msg.channel.send({ embeds: [embed] });
		}
		const auth = require('../others/auth.js')
		const data = GetSRP6RegistrationData(user, password)

		auth.query('INSERT INTO account (username, salt, verifier, email) VALUES (?, ?, ?, ?)', [user, data[0], data[1], mail], function (err, result) {
			if (err) {
				if(err.errno == 1062){
					const embed = NewEmbed(msg.author, 'E74C3C', 'Registro de cuentas', 'El usuario que ingresaste ya existe.', '', '');
					return msg.channel.send({ embeds: [embed] });
				}
				const embed = NewEmbed(msg.author, 'E74C3C', 'Registro de cuentas', 'Error de sistema.', '', '');
				console.log(err)
				return msg.channel.send({ embeds: [embed] });
			}
			const embed = NewEmbed(
                msg.author, 
                'E74C3C', 
                'Registro de Cuentas', 
                'Cuenta registrada con éxito.\n\nPor la seguridad de su cuenta elimine los mensajes.\n\nset realmlist '+ realmlist, 
                'https://i.imgur.com/2i5hZHn.png', 
                'https://i.imgur.com/sC6uiV3.png?width=528&height=663'
            );
			return msg.channel.send({ embeds: [embed] });
		});
	},
};