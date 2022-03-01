const { createConnection } = require('mysql');
const { mysql } = require('../config.json');

const characters = createConnection(mysql.characters);

characters.connect(function (err) {
    if (err) {
        console.log(`Mysql: error de conexion: ${err.message}`);
        setTimeout(characters.connect, 2000);
    }
});

characters.on('connect', () => {
    console.log(`Mysql: Conectado a la base de datos characters.`)
})

module.exports = characters;