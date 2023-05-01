const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Select a member and kick them.')
    .addUserOption((option) =>
      option
        .setName('target')
        .setDescription('The member to kick')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('reason')
        .setDescription('Reason for kicking the member')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(
      PermissionFlagsBits.Administrator | PermissionFlagsBits.KickMembers
    )
    .setDMPermission(false),
  async execute(interaction) {
    const user = interaction.options.getMember('target');
    user.kick();
    await interaction.reply({
      content: `${user.user.username} has been kicked!`,
      ephemeral: true,
    });
  },
};
