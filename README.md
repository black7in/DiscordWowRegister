# <img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white" /> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/WoW_icon.svg/1200px-WoW_icon.svg.png?raw=true" width="3%"></img>  DiscordWowRegister
## Introducción
DiscordWowRegister solo está disponible para Azerothcore/Trinitycore 3.3.5a.
Se espera que en las próximas versiones soporte a todos los emuladores existentes.
## Funciones
- Registra cuentas para tu servidor a través de Discord.
- Comando /register: Retorna un botón para registro de cuentas.
- Comando /realmlist: Consulta el reamlist de tu servidor.
- Comando /who: Consulta cuantos personajes están en línea.
- Comando /topkill: Consulta los jugadores con mayor número de asesinatos.
### Proximas funciones.
- Comando /top2v2: Consulta los mejores equipos de arena 2v2.
- Comando /top3v3: Consulta los mejores equipos de arena 3v3.
- Comando /top5v5: Consulta los mejores equipos de arena 5v5.
- Comunicación por Soap para gestionar el servidor a través de Discord.
- Registro para diferentes emuladores.
## Requisitos
- Obtener un Token, creando un bot en https://discord.com/developers/applications.
- [Node.js](https://nodejs.org/es/) >= v16.14.0

## Instalación
- Descargar o clonar el repositorio.
```sh
git clone https://github.com/black7in/DiscordBot-WowRegister.git
```
- Abrir el archivo config.json y configurar.:
```sh
"token": "",
"prefix": "!",
"clientId": "ID del bot en tu servidor.",
"guildId": "ID del servidor.", 
"mysql": {
	"auth": {
		"host": "127.0.0.1",
		"user": "root",
		"password": "ascent",
		"database": "auth"
	},
	"characters": {
		"host": "127.0.0.1",
		"user": "root",
		"password": "ascent",
		"database": "characters"
	}
},
"realmlist": "logon.wowregister.com"
```
- Abrir una terminal en el directorio.
```sh
# Primero instalar las dependencias con el siguiente comando.

> npm install

# Una vez configurado e instalado las dependicias, correr el bot.

> node index.js
```
## Creditos
- [Miorey](https://github.com/Miorey/trinitycore-srp6) trinitycore-srp6
