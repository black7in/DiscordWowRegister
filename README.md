# DiscordBot-WowRegister <img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white" />
Create accounts for TrinityCore and Azerothcore 3.3.5a

## Requisitos
- Token de Discord
- [Node.js](https://nodejs.org/es/) >= v16.13.1

## Instalación
- Descargar
```sh
git clone https://github.com/black7in/DiscordBot-WowRegister.git
```
- Abrir Config.js y editar tus datos:
- channelId es para que el bot envie un boton de registro al canal.
```sh
{
    "token": "",
    "NameServer": "World of Warcraft",
    "channelId": "",
    "mysql": {
        "host": "127.0.0.1",
        "user": "root",
        "password": "ascent",
        "database": "eluna_auth"
    }
}
```
- Abrir una terminal en el directorio y ejecutar:
```sh
node index.js
```
## Creditos
- [Miorey](https://github.com/Miorey/trinitycore-srp6) trinitycore-srp6
