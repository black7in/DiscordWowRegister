const { createConnection } = require('mysql');
const { mysql } = require('../config.json');

const auth = createConnection(mysql.auth);

auth.connect(function (err) {
    if (err) {
        console.log(`Mysql: error de conexion: ${err.message}`);
        setTimeout(auth.connect, 2000);
    }
});

auth.on('connect', () => {
    console.log(`Mysql: Conectado a la base de datos auth.`)
})

module.exports = auth;