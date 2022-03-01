const { prefix } = require('../config.json')

module.exports = {
	name: 'messageCreate',
	execute(msg) {
        if (msg.content.startsWith(prefix + 'say')) {
            if (msg.author.bot) return;

            if(!msg.member.permissions.has('ADMINISTRATOR')) return;

            const SayMessage = msg.content.slice(5).trim();
    
            msg.channel.send(SayMessage)
            msg.delete({ timeout: 100 });
        }
	},
};