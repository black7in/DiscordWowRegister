module.exports = {
	name: 'ready',
	once: true,
	description: "Inicia el servidor",
	execute(client) {	
		const auth = require('../others/auth.js')
		const characters = require('../others/characters.js')
		client.user.setActivity("WowRegister", {type: "PLAYING"});
		console.log(`Estoy listo!! Usario: ${client.user.tag}`);
	},
};