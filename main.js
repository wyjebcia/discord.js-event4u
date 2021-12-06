const Discord = require('discord.js');
const client = new Discord.Client();
require('discord-buttons')(client);
const prefix = '$';
const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));



client.once('ready', () => {
    console.log('Bot jest online');
    client.user.setActivity('NA EVENT4U.PL', { type: 'PLAYING' });
});

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('clickButton', async (button) => {
    if (button.id === 'Click') {
        button.reply.send(`Poprawnie zweryfikowano!`, true)
        const Role = button.guild.roles.cache.find(role => role.id === "ID ROLI DO NADANIA")
        const member = button.clicker.member
        await member.roles.add(Role);
    }
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLocaleLowerCase();

    if (command === 'verify') {
        client.commands.get('verify').execute(message, args);
    } else if (command === 'embed') {
        client.commands.get('embed').execute(message, args);
}
});


client.on('guildMemberAdd', guildMember => {
    const channel = guildMember.guild.channels.cache.get('779770176946176070');
    const embed = new Discord.MessageEmbed()
        .setColor('#0000')
        .setTitle("WALKI MMA! - Lobby")
        .setTimestamp()
        .setFooter("WALKI MMA")
        .setDescription(`<@${guildMember.user.id}> dołączył do serwera!\n`
            + `Aktualnie jest nas **${client.guilds.cache.get('779721709828833330').memberCount}** Members.`);

    channel.send(embed);
})

client.login('OTE3NTE0OTY3ODMyNDYxMzcy.Ya50Zg.Juhogk89c8-H-qYDOVuNpeJGuGw');