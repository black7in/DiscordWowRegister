# DiscordWowRegister <img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white" />
Create accounts for TrinityCore and Azerothcore 3.3.5a

## Requisitos
- Token de Discord
- [Node.js](https://nodejs.org/es/) >= v16.14.0

## Instalación
- Descargar
```sh
git clone https://github.com/black7in/DiscordBot-WowRegister.git
```
- Abrir el archivo config.json y configurar.:
```sh
{
	"token": "",
	"prefix": "!",
	"clientId": "",
	"guildId": "", 
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
}
```
- Abrir una terminal en el directorio y ejecutar:
```sh
npm install
node index.js
```
## Creditos
- [Miorey](https://github.com/Miorey/trinitycore-srp6) trinitycore-srp6
