module.exports = (client, oldMember, newMember) => {
  try {
    const row = client.getRow.get(newMember.guild.id);
    if (row.defaultChannelID === 'none') return;
    if (newMember.presence.game && oldMember.presence.game){
      if (newMember.presence.game.streaming === true && oldMember.presence.game.streaming === false)
        client.channels.get(row.defaultChannelID).send(`${newMember.displayName} is now streaming! Here's a link: <${newMember.presence.game.url}>`);
    }
    else if (newMember.presence.game){
      if (newMember.presence.game.streaming)
        client.channels.get(row.defaultChannelID).send(`${newMember.displayName} is now streaming! Here's a link: <${newMember.presence.game.url}>`);
    }
  }
  catch (err) {
    return;
  }
};
