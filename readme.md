# Folders Backup

A small utility to backup specific folders to a remote server.<br />
You must place you config.json in the same place as index.js.<br />
Password in remote folder must be base64 encoded.

```json
{
  "remote_server": {
    "host": "example.com",
    "username": "root",
    "password": "abcdef",
    "port": 22,
    "remote_folder": "/mnt/game_saves/"
  },
  "games": [
    {
      "name": "It Takes Two",
      "folder": "%LOCALAPPDATA%/ItTakesTwo/"
    },
    {
      "name": "Kena: Bridge of Spirits",
      "folder": "%LOCALAPPDATA%/Kena/Saved/SaveGames/"
    },
    {
      "name": "Call of Cthulhu",
      "folder": "%LOCALAPPDATA%/CallOfCthulhu/Saved/SaveGames/"
    },
    {
      "name": "Tools Up!",
      "folder": "%USERPROFILE%/AppData/LocalLow/The Knights of Unity/Tools Up/"
    }
  ]
}
```

Install as a global command:
<code>
npm install -g
</code>
