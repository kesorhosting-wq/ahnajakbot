import 'dotenv/config';
import { REST, Routes, SlashCommandBuilder } from 'discord.js';
const commands=[new SlashCommandBuilder().setName('setup').setDescription('Post AhnajakMC Store UI in this channel').addRoleOption(o=>o.setName('admin_role').setDescription('Role allowed to manage setup').setRequired(false)).toJSON()];
const rest=new REST({version:'10'}).setToken(process.env.DISCORD_TOKEN);
if(process.env.DISCORD_GUILD_ID){await rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID,process.env.DISCORD_GUILD_ID),{body:commands});console.log('Registered guild commands')}else{await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),{body:commands});console.log('Registered global commands')}
