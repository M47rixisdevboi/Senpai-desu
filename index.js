require('dotenv').config();
const Discord = require('discord.js');
const commands = require('./commands')
const meme_cmds = require('./meme_cmds')
//const test = require('./ds_test.js')




const client = new Discord.Client();



client.login(process.env.TOKEN);
client.on('ready', () => {
console.log("Bot ready")
});


    






