const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Select a member and ban them.')
    .addUserOption((option) =>
      option
        .setName('target')
        .setDescription('The member to ban')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('reason')
        .setDescription('Reason for banning the member')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(
      PermissionFlagsBits.Administrator | PermissionFlagsBits.BanMembers
    )
    .setDMPermission(false),
  async execute(interaction) {
    const user = interaction.options.getMember('target');
    user.ban();
    await interaction.reply({
      content: `${user.user.username} has been banned!`,
      ephemeral: true,
    });
  },
};
