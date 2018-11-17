module.exports = {
  name: 'color',
  usage: '<COLOR NAME>',
  description: 'Changes your current color to the one specified.',
  tag: 'general',
  run: async (message, args) => {
    const colors = message.guild.roles.filter(c => c.name.indexOf('#') === 0);
    const target = args.join(' ').toLowerCase();
    const color = colors.find(c => target.startsWith(c.name.slice(1).toLowerCase()) || target.startsWith(c.name.toLowerCase()));
    //args check
    if (!color) return message.channel.send(`Sorry ${message.member.displayName}, I don't recognize that color. Type \`!colors\` for a list.`);
    else if (message.member.roles.has(color.id)) return message.channel.send(`${message.member.displayName}, you are already ${color}!`);
    if (message.guild.me.hasPermission('MANAGE_ROLES')){
      try {
        await message.member.removeRoles(colors);
        await message.member.addRole(color);
        message.channel.send(`${message.member.displayName}, you now have the color ${color}.`);
      }
      catch (err) {
        console.log(err.message);
        message.channel.send('Something went wrong! Please confirm that I am at the top of the role hierarchy.');
      }
    }
    else message.channel.send('I require the **Manage Roles** permission for this command.');
  }
};
