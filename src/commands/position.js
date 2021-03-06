module.exports = {
  name: 'position',
  usage: '<USER MENTION>',
  description: 'Fetches the current scoreboard position of a user (or your own, if no user is mentioned).',
  tag: 'fun',
  run: async (message) => {
    const target =  message.mentions.members.first() || message.member;
    const scoreboard = message.client.getScoreboard.all(message.guild.name);
    const position = scoreboard.map(e => e.id).indexOf(target.id);
    message.channel.send(`Current position: **${position + 1}**`);
  }
};
