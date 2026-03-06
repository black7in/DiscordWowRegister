# <img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white" /> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/WoW_icon.svg/1200px-WoW_icon.svg.png?raw=true" width="3%"></img>  DiscordWowRegister
## Introducción
DiscordWowRegister solo está disponible para Azerothcore/Trinitycore 3.3.5a.
Se espera que en las próximas versiones soporte a todos los emuladores existentes.
## Comandos
| Comando | Descripción | Admin |
|---|---|---|
| `/register` | Abre un formulario para crear una cuenta (usuario, contraseña, correo). | No |
| `/panel` | Publica un mensaje con botón de registro para anclar en un canal. | No |
| `/realmlist` | Muestra el realmlist del servidor. | No |
| `/who` | Muestra los personajes conectados (máx. 10). | No |
| `/topkill` | Muestra los 6 jugadores con más asesinatos. | No |
| `/anuncio` | Envía un anuncio en el canal elegido (embed o texto plano). | Sí |
| `/consola` | Panel de administración del servidor vía SOAP. | Sí |

El comando `/consola` despliega 4 botones en el canal:
| Botón | Acción |
|---|---|
| 📊 Info | Muestra el estado del servidor (`server info`) |
| 🎫 Tickets | Lista los tickets abiertos (`ticket list`) |
| 👤 GM In | Lista los GMs conectados en el mundo (`gm ingame`) |
| ⌨️ Comando | Abre un formulario para ejecutar cualquier comando |

### Próximas funciones
- Comando /top2v2: Consulta los mejores equipos de arena 2v2.
- Comando /top3v3: Consulta los mejores equipos de arena 3v3.
- Comando /top5v5: Consulta los mejores equipos de arena 5v5.
- Registro para diferentes emuladores.
## Requisitos
- Obtener un Token, creando un bot en https://discord.com/developers/applications.
- [Node.js](https://nodejs.org/es/) >= v18.0.0

## Instalación
- Descargar o clonar el repositorio.
```sh
git clone https://github.com/black7in/DiscordBot-WowRegister.git
```
- Copiar el archivo de configuración de ejemplo y completar los valores:
```sh
cp config.example.json config.json
```
```json
{
    "token": "TOKEN_DE_TU_BOT",
    "clientId": "ID_DE_LA_APLICACION_BOT",
    "guildId": "ID_DE_TU_SERVIDOR",
    "mysql": {
        "auth": {
            "host": "127.0.0.1",
            "user": "root",
            "password": "tu_password",
            "database": "auth"
        },
        "characters": {
            "host": "127.0.0.1",
            "user": "root",
            "password": "tu_password",
            "database": "characters"
        }
    },
    "realmlist": "logon.tuservidor.com",
    "soap": {
        "host": "127.0.0.1",
        "port": 7878,
        "user": "soapuser",
        "password": "abcd1234"
    }
}
```
- Abrir una terminal en el directorio.
```sh
# Instalar las dependencias.
npm install

# Correr el bot.
node index.js
```
## Creditos
- [Miorey](https://github.com/Miorey/trinitycore-srp6) trinitycore-srp6
