const { Discord, MessageEmbed} = require('discord.js')
const client1 = require("discord.js"); const client2 = require("discord.js"); const client3 = require("discord.js");
const serverGuard = new client1.Client(); const roleGuard = new client2.Client(); const channelGuard = new client3.Client();
const settings = require('./config')
const moment = require('moment'); moment.locale('tr');

const yetkiler = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS"];
function sunucuCeza(kisiID, tur) {let member = serverGuard.guilds.cache.get(settings.GuildID).members.cache.get(kisiID); if (!member) return; if (tur == "jail") return member.roles.cache.has(settings.BoosterRole) ? member.roles.set([settings.BoosterRole, settings.JailedRole]) : member.roles.set([settings.JailedRole]); if (tur == "ban") return member.ban({ reason: "Sunucu Koruma." }).catch();};
function rolCeza(kisiID, tur) {let member = roleGuard.guilds.cache.get(settings.GuildID).members.cache.get(kisiID); if (!member) return; if (tur == "jail") return member.roles.cache.has(settings.BoosterRole) ? member.roles.set([settings.BoosterRole, settings.JailedRole]) : member.roles.set([settings.JailedRole]); if (tur == "ban") return member.ban({ reason: "Sunucu Koruma." }).catch();};
function kanalCeza(kisiID, tur) {let member = channelGuard.guilds.cache.get(settings.GuildID).members.cache.get(kisiID); if (!member) return; if (tur == "jail") return member.roles.cache.has(settings.BoosterRole) ? member.roles.set([settings.BoosterRole, settings.JailedRole]) : member.roles.set([settings.JailedRole]); if (tur == "ban") return member.ban({ reason: "Sunucu Koruma." }).catch();};

//                                                                        SUNUCU KORUMA                                                                        \\

serverGuard.on("guildBanAdd", async function(guild, user) {
let entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first());
if(!entry || !entry.executor || settings.OwnerID.includes(entry.executor.id) || settings.Whitelist.includes(entry.executor.id) || settings.Bots.includes(entry.executor.id) || Date.now()-entry.createdTimestamp > 10000) return;
const yetkili = await guild.members.cache.get(entry.executor.id); sunucuCeza(entry.executor.id, "jail")
if(settings.BanLog) { serverGuard.channels.cache.get(settings.BanLog).send(new MessageEmbed().setAuthor(`??zinsiz Kullan??c?? Sunucudan Yasakland??`, guild.iconURL({dynamic:true})).setDescription(`**${yetkili} Yetkilisi Sunucudan Bir Kullan??c??y?? Yasaklad?? !**\n\n??? Yetkili: ${yetkili} | \` ${yetkili.id} \`\n??? Kullan??c??: ${user} | \` ${user.id} \`\n\n??? ????lem: \` Sunucudan Yasaklama \` | ??? Ceza: \` Rolleri al??nd?? \``).setFooter(`??? Tarih: ${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}`).setColor(`#73b8e7`))}});

serverGuard.on("guildMemberRemove", async function(member) {
let entry = await member.guild.fetchAuditLogs({type: 'MEMBER_KICK'}).then(audit => audit.entries.first());
if(!entry || !entry.executor || settings.OwnerID.includes(entry.executor.id) || settings.Whitelist.includes(entry.executor.id) || settings.Bots.includes(entry.executor.id) || Date.now()-entry.createdTimestamp > 10000) return;
const yetkili = await member.guild.members.cache.get(entry.executor.id); sunucuCeza(entry.executor.id, "jail")
if(settings.KickLog) { serverGuard.channels.cache.get(settings.KickLog).send(new MessageEmbed().setAuthor(`??zinsiz Kullan??c?? Sunucudan At??ld??`, member.guild.iconURL({dynamic:true})).setDescription(`**${yetkili} Yetkilisi Sunucudan Bir Kullan??c??y?? Att?? !**\n\n??? Yetkili: ${yetkili} | \` ${yetkili.id} \`\n??? Kullan??c??: ${member} | \` ${member.id} \`\n\n??? ????lem: \` Sunucudan Atmak \` | ??? Ceza: \` Rolleri al??nd?? \` `).setFooter(`??? Tarih: ${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}`).setColor(`#73b8e7`))}});

serverGuard.on("guildMemberAdd", async function(member) {
let entry = await member.guild.fetchAuditLogs({type: 'BOT_ADD'}).then(audit => audit.entries.first());
if(!entry || !entry.executor || settings.OwnerID.includes(entry.executor.id) || settings.Whitelist.includes(entry.executor.id) || settings.Bots.includes(entry.executor.id) || Date.now()-entry.createdTimestamp > 10000) return;
const yetkili = await member.guild.members.cache.get(entry.executor.id); 
if(settings.BotLog) { serverGuard.channels.cache.get(settings.BotLog).send(new MessageEmbed().setAuthor(`??zinsiz Bot ??ekme`, member.guild.iconURL({dynamic:true})).setDescription(`**${yetkili} Yetkilisi Sunucuya Bir Bot ??ekti !**\n\n??? Yetkili: ${yetkili} | \` ${yetkili.id} \`\n??? Bot: ${member} | \` ${member.id} \`\n\n??? ????lem: \` Bot ??ekmek \` | ??? Ceza: \` Rolleri al??nd?? \` `).setFooter(`??? Tarih: ${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}`).setColor(`#73b8e7`))}});

serverGuard.on('guildUpdate', async (oldGuild, newGuild) => {
let entry = await newGuild.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(audit => audit.entries.first());
if(!entry || !entry.executor || settings.OwnerID.includes(entry.executor.id) || settings.Whitelist.includes(entry.executor.id) || settings.Bots.includes(entry.executor.id) ||  Date.now()-entry.createdTimestamp > 10000) return;
const yetkili = await newGuild.members.cache.get(entry.executor.id); sunucuCeza(entry.executor.id, "jail"); await sunucuCeza(entry.executor.id, "ban");
if(newGuild.name !== oldGuild.name) newGuild.setName(oldGuild.name); newGuild.setIcon(oldGuild.iconURL({dynamic: true, size: 2048})); newGuild.roles.cache.forEach(async function(sunucu) {if (sunucu.permissions.has("ADMINISTRATOR") || sunucu.permissions.has("BAN_MEMBERS") || sunucu.permissions.has("MANAGE_GUILD") || sunucu.permissions.has("KICK_MEMBERS") || sunucu.permissions.has("MANAGE_ROLES") || sunucu.permissions.has("MANAGE_CHANNELS")) {sunucu.setPermissions(0).catch(err =>{});}});
if(settings.SunucuLog) { serverGuard.channels.cache.get(settings.SunucuLog).send(new MessageEmbed().setAuthor(`Sunucunun Ayarlar??yla Oynad??`, newGuild.iconURL({dynamic:true})).setDescription(`**${yetkili} Yetkilisi Sunucunun Ayarlar??yla Oynad?? !**\n\n??? Yetkili: ${yetkili} | \` ${yetkili.id} \`\n??? ????lem: \` Ayarlar?? De??i??ti \` | ??? Ceza: \` Yasaklama \` `).setFooter(`??? Tarih: ${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}`).setColor(`#73b8e7`))}});

serverGuard.on('emojiDelete', async (emoji, message) => {
let entry = await emoji.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first());
if(!entry || !entry.executor || settings.OwnerID.includes(entry.executor.id) || settings.Whitelist.includes(entry.executor.id) || settings.Bots.includes(entry.executor.id) ||  Date.now()-entry.createdTimestamp > 10000) return;
const yetkili = await newGuild.members.cache.get(entry.executor.id); sunucuCeza(entry.executor.id, "jail"); emoji.guild.emojis.create(`${emoji.url}`, `${emoji.name}`).catch();
if(settings.EmojiLog) { serverGuard.channels.cache.get(settings.EmojiLog).send(new MessageEmbed().setAuthor(`??zinsiz Emoji Sildi`, emoji.guild.iconURL({dynamic:true})).setDescription(`**${yetkili} Yetkilisi Emoji Sildi !**\n\n??? Yetkili: ${yetkili} | \` ${yetkili.id} \`\n??? Emoji: ${emoji.name} | \` ${emoji.id} \`\n\n??? ????lem: \` Emoji Silmek \` | ??? Ceza: \` Rolleri al??nd?? \` `).setFooter(`??? Tarih: ${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}`).setColor(`#73b8e7`))}});

serverGuard.on('emojiCreate', async (emoji, message) => {
let entry = await emoji.fetchAuditLogs({type: 'EMOJI_CREATE'}).then(audit => audit.entries.first());
if(!entry || !entry.executor || settings.OwnerID.includes(entry.executor.id) || settings.Whitelist.includes(entry.executor.id) || settings.Bots.includes(entry.executor.id) ||  Date.now()-entry.createdTimestamp > 10000) return;
const yetkili = await newGuild.members.cache.get(entry.executor.id); sunucuCeza(entry.executor.id, "jail"); emoji.delete({reason: "??zinsiz Emoji Y??klendi Sildim."});
if(settings.EmojiLog) { serverGuard.channels.cache.get(settings.EmojiLog).send(new MessageEmbed().setAuthor(`??zinsiz Emoji Y??klendi`, emoji.guild.iconURL({dynamic:true})).setDescription(`**${yetkili} Yetkilisi Emoji Y??kledi !**\n\n??? Yetkili: ${yetkili} | \` ${yetkili.id} \`\??? ????lem: \` Emoji Y??klemek \` | ??? Ceza: \` Rolleri al??nd?? \` `).setFooter(`??? Tarih: ${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}`).setColor(`#73b8e7`))}});

serverGuard.on('emojiUpdate', async (oldEmoji, newEmoji) => {
if(oldEmoji === newEmoji) return;
let entry = await emoji.fetchAuditLogs({type: 'EMOJI_UPDATE'}).then(audit => audit.entries.first());
if(!entry || !entry.executor || settings.OwnerID.includes(entry.executor.id) || settings.Whitelist.includes(entry.executor.id) || settings.Bots.includes(entry.executor.id) ||  Date.now()-entry.createdTimestamp > 10000) return;
const yetkili = await newGuild.members.cache.get(entry.executor.id); sunucuCeza(entry.executor.id, "jail"); await newEmoji.setName(oldEmoji.name); 
if(settings.EmojiLog) { serverGuard.channels.cache.get(settings.EmojiLog).send(new MessageEmbed().setAuthor(`??zinsiz Emoji G??ncellendi`, emoji.guild.iconURL({dynamic:true})).setDescription(`**${yetkili} Yetkilisi Emoji G??ncelledi !**\n\n??? Yetkili: ${yetkili} | \` ${yetkili.id} \`\n??? Emoji: ${oldEmoji.name} | \` ${oldEmoji.id} \`\n\n\??? ????lem: \` Emoji G??ncellemek \` | ??? Ceza: \` Rolleri Al??nd?? \` `).setFooter(`??? Tarih: ${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}`).setColor(`#73b8e7`))}});


//                                                                        ROL KORUMA                                                                        \\

roleGuard.on("roleDelete", async role => {
let entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
if(!entry || !entry.executor || settings.OwnerID.includes(entry.executor.id) || settings.Whitelist.includes(entry.executor.id) || settings.Bots.includes(entry.executor.id) || Date.now()-entry.createdTimestamp > 10000) return;
const yetkili = await role.guild.members.cache.get(entry.executor.id); rolCeza(entry.executor.id, "jail"); await rolCeza(entry.executor.id, "ban"); role.roles.cache.forEach(async function(sunucu) {if (sunucu.permissions.has("ADMINISTRATOR") || sunucu.permissions.has("BAN_MEMBERS") || sunucu.permissions.has("MANAGE_GUILD") || sunucu.permissions.has("KICK_MEMBERS") || sunucu.permissions.has("MANAGE_ROLES") || sunucu.permissions.has("MANAGE_CHANNELS")) {sunucu.setPermissions(0).catch(err =>{});}});
role.guild.roles.create({ data: {name: role.name, color: role.color, hoist: role.hoist, permissions: role.permissions, mentionable: role.mentionable, position: role.position}, reason: 'Silinen Roller Tekrar A????ld??.'})
if(settings.RolSilmeLog) { roleGuard.channels.cache.get(settings.RolSilmeLog).send(new MessageEmbed().setAuthor(`??zinsiz Rol Silindi`, role.guild.iconURL({dynamic:true})).setDescription(`**${yetkili} Yetkilisi Sunucudan Bir Rol Sildi !**\n\n??? Yetkili: ${yetkili} | \` ${yetkili.id} \`\n??? Rol: **${role.name}** | \` ${role.id} \`\n\n??? ????lem: \` Rol Silmek \` | ??? Ceza: \` Yasaklama \``).setFooter(`??? Tarih: ${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}`).setColor(`#73b8e7`))}});

roleGuard.on("roleCreate", async role => {
let entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());
if(!entry || !entry.executor || settings.OwnerID.includes(entry.executor.id) || settings.Whitelist.includes(entry.executor.id) || settings.Bots.includes(entry.executor.id) || Date.now()-entry.createdTimestamp > 10000) return;
const yetkili = await role.guild.members.cache.get(entry.executor.id); rolCeza(entry.executor.id, "jail"); 
role.delete({reason: `${yetkili.id} idli kullan??c?? izinsiz rol a??t?? sildim.`})
if(settings.RolA??maLog) { roleGuard.channels.cache.get(settings.RolA??maLog).send(new MessageEmbed().setAuthor(`??zinsiz Rol A????ld??`, role.guild.iconURL({dynamic:true})).setDescription(`**${yetkili} Yetkilisi Sunucudan Bir Rol A??t?? !**\n\n??? Yetkili: ${yetkili} | \` ${yetkili.id} \`\n??? Rol: **${role.name}** | \` ${role.id} \`\n\n??? ????lem: \` Rol A??mak \` | ??? Ceza: \` Rolleri Al??nd?? \``).setFooter(`??? Tarih: ${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}`).setColor(`#73b8e7`))}});

roleGuard.on("roleUpdate", async (oldRole, newRole) => {
let entry = await newRole.guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first());
if(!entry || !entry.executor || settings.OwnerID.includes(entry.executor.id) || settings.Whitelist.includes(entry.executor.id) || settings.Bots.includes(entry.executor.id) || Date.now()-entry.createdTimestamp > 10000) return;
const yetkili = await newRole.guild.members.cache.get(entry.executor.id); rolCeza(entry.executor.id, "jail"); await rolCeza(entry.executor.id, "ban")
if (yetkiler.some(p => !oldRole.permissions.has(p) && newRole.permissions.has(p))) {newRole.setPermissions(oldRole.permissions); newRole.guild.roles.cache.filter(r => !r.managed && (r.permissions.has("ADMINISTRATOR") || r.permissions.has("MANAGE_ROLES") || r.permissions.has("MANAGE_GUILD"))).forEach(r => r.setPermissions(36818497));}; newRole.edit({name: oldRole.name, color: oldRole.hexColor, hoist: oldRole.hoist, permissions: oldRole.permissions, mentionable: oldRole.mentionable});
if(settings.RolG??ncellemeLog) { roleGuard.channels.cache.get(settings.RolG??ncellemeLog).send(new MessageEmbed().setAuthor(`??zinsiz Rol G??ncellendi`, newRole.guild.iconURL({dynamic:true})).setDescription(`**${yetkili} Yetkilisi Sunucudan Bir Rol G??ncelledi !**\n\n??? Yetkili: ${yetkili} | \` ${yetkili.id} \`\n??? Rol: **${newRole.name}** | \` ${newRole.id} \`\n\n??? ????lem: \` Rol G??ncellemek \` | ??? Ceza: \` Yasaklama \``).setFooter(`??? Tarih: ${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}`).setColor(`#73b8e7`))}});

roleGuard.on("guildMemberUpdate", async (oldMember, newMember) => {
if (newMember.roles.cache.size > oldMember.roles.cache.size) {    
let entry = await newMember.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first());
if(!entry || !entry.executor || settings.OwnerID.includes(entry.executor.id) || settings.Whitelist.includes(entry.executor.id) || settings.Bots.includes(entry.executor.id) || Date.now()-entry.createdTimestamp > 10000) return;
const yetkili = await newMember.guild.members.cache.get(entry.executor.id); rolCeza(entry.executor.id, "jail"); newMember.roles.set(oldMember.roles.cache.map(x => x.id));
if(settings.YetkiKorumaLog) { roleGuard.channels.cache.get(settings.YetkiKorumaLog).send(new MessageEmbed().setAuthor(`??zinsiz Rol Verildi`, newMember.guild.iconURL({dynamic:true})).setDescription(`**${yetkili} Yetkilisi Sunucudan Birisine Rol Verdi !**\n\n??? Yetkili: ${yetkili} | \` ${yetkili.id} \`\n??? Kullan??c??: **${newMember}** | \` ${newMember.id} \`\n\n??? ????lem: \` Rol Vermek \` | ??? Ceza: \` Rolleri al??nd?? \``).setFooter(`??? Tarih: ${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}`).setColor(`#73b8e7`))}}});

//                                                                        KANAL KORUMA                                                                        \\

channelGuard.on("channelDelete", async channel => {
let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
if(!entry || !entry.executor || settings.OwnerID.includes(entry.executor.id) || settings.Whitelist.includes(entry.executor.id) || settings.Bots.includes(entry.executor.id) || Date.now()-entry.createdTimestamp > 10000) return;
const yetkili = await channel.guild.members.cache.get(entry.executor.id); kanalCeza(entry.executor.id, "jail"); await kanalCeza(entry.executor.id, "ban");
await channel.clone({ reason: "Silinen Kanal Geri A????ld??" }).then(async kanal => {if (channel.parentID != null) await kanal.setParent(channel.parentID); await kanal.setPosition(channel.position); if (channel.type == "category") await channel.guild.channels.cache.filter(k => k.parentID == channel.id).forEach(x => x.setParent(kanal.id))});
if(settings.KanalSilmeLog) { channelGuard.channels.cache.get(settings.KanalSilmeLog).send(new MessageEmbed().setAuthor(`??zinsiz Kanal Silindi`, channel.guild.iconURL({dynamic:true})).setDescription(`**${yetkili} Yetkilisi Sunucudan Bir Kanal Sildi !**\n\n??? Yetkili: ${yetkili} | \` ${yetkili.id} \`\n??? Kanal: **${channel.name}** | \` ${channel.id} \`\n\n??? ????lem: \` Kanal Silmek \` | ??? Ceza: \` Yasaklama \``).setFooter(`??? Tarih: ${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}`).setColor(`#73b8e7`))}});

channelGuard.on("channelCreate", async channel => {
let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
if(!entry || !entry.executor || settings.OwnerID.includes(entry.executor.id) || settings.Whitelist.includes(entry.executor.id) || settings.Bots.includes(entry.executor.id) || Date.now()-entry.createdTimestamp > 10000) return;
const yetkili = await channel.guild.members.cache.get(entry.executor.id); kanalCeza(entry.executor.id, "jail"); 
channel.delete({reason: `${yetkili.id} idli kullan??c?? izinsiz kanal a??t?? sildim.`})
if(settings.KanalA??maLog) { channelGuard.channels.cache.get(settings.KanalA??maLog).send(new MessageEmbed().setAuthor(`??zinsiz Kanal A????ld??`, channel.guild.iconURL({dynamic:true})).setDescription(`**${yetkili} Yetkilisi Sunucudan Bir Kanal A??t?? !**\n\n??? Yetkili: ${yetkili} | \` ${yetkili.id} \`\n??? Kanal: **${channel.name}** | \` ${channel.id} \`\n\n??? ????lem: \` Kanal A??mak \` | ??? Ceza: \` Yasaklama \``).setFooter(`??? Tarih: ${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}`).setColor(`#73b8e7`))} else if(!GuardLog) {}});

channelGuard.on("channelUpdate", async (oldChannel, newChannel) => {
let entry = await newChannel.guild.fetchAuditLogs({type: 'CHANNEL_UPDATE'}).then(audit => audit.entries.first());
if(!entry || !entry.executor || settings.OwnerID.includes(entry.executor.id) || settings.Whitelist.includes(entry.executor.id) || settings.Bots.includes(entry.executor.id) || Date.now()-entry.createdTimestamp > 10000) return;
const yetkili = await newChannel.guild.members.cache.get(entry.executor.id); kanalCeza(entry.executor.id, "jail"); 
if (newChannel.type !== "category" && newChannel.parentID !== oldChannel.parentID) newChannel.setParent(oldChannel.parentID);
if (newChannel.type === "category") {newChannel.edit({name: oldChannel.name})} else if (newChannel.type === "text") {newChannel.edit({name: oldChannel.name, topic: oldChannel.topic, nsfw: oldChannel.nsfw, rateLimitPerUser: oldChannel.rateLimitPerUser})} else if (newChannel.type === "voice") {newChannel.edit({name: oldChannel.name, bitrate: oldChannel.bitrate, userLimit: oldChannel.userLimit,})}; oldChannel.permissionOverwrites.forEach(perm => {let thisPermOverwrites = {}; perm.allow.toArray().forEach(p => {thisPermOverwrites[p] = true;}); perm.deny.toArray().forEach(p => {thisPermOverwrites[p] = false;}); newChannel.createOverwrite(perm.id, thisPermOverwrites)});
if(settings.KanalG??ncellemeLog) { channelGuard.channels.cache.get(settings.KanalG??ncellemeLog).send(new MessageEmbed().setAuthor(`??zinsiz Kanal G??ncellendi`, newChannel.guild.iconURL({dynamic:true})).setDescription(`**${yetkili} Yetkilisi Sunucudan Bir Kanal G??ncelledi !**\n\n??? Yetkili: ${yetkili} | \` ${yetkili.id} \`\n??? Kanal: **${newChannel.name}** | \` ${newChannel.id} \`\n\n??? ????lem: \` Kanal G??ncellemek \` | ??? Ceza: \` Yasaklama \``).setFooter(`??? Tarih: ${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}`).setColor(`#73b8e7`))} else if(!GuardLog) {}});

channelGuard.on("webhookUpdate", async channel => {
let entry = await channel.guild.fetchAuditLogs({type: 'WEBHOOK_CREATE'}).then(audit => audit.entries.first());
if(!entry || !entry.executor || settings.OwnerID.includes(entry.executor.id) || settings.Whitelist.includes(entry.executor.id) || settings.Bots.includes(entry.executor.id) || Date.now()-entry.createdTimestamp > 10000) return;
const yetkili = await channel.guild.members.cache.get(entry.executor.id); kanalCeza(entry.executor.id, "jail");
const webhooklar = await channel.fetchWebhooks(); await webhooklar.map(x => x.delete({reason: "??zinsiz webhook a????ld?????? i??in silindi."})) 
if(settings.KanalWebhookLog) { channelGuard.channels.cache.get(settings.KanalWebhookLog).send(new MessageEmbed().setAuthor(`??zinsiz Webhook A????ld??`, channel.guild.iconURL({dynamic:true})).setDescription(`**${yetkili} Yetkilisi Sunucudan Bir Webkhook A??t?? !**\n\n??? Yetkili: ${yetkili} | \` ${yetkili.id} \`\n??? Webhook A????lan Kanal: **${channel.name}** | \` ${channel.id} \`\n\n??? ????lem: \` Webh????j A??mak \` | ??? Ceza: \` Rolleri al??nd?? \``).setFooter(`??? Tarih: ${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}`).setColor(`#73b8e7`))} else if(!GuardLog) {}});


serverGuard.on('ready', async() => {serverGuard.user.setPresence({ activity: { name: settings.statusMessage }, status: settings.statusCase }); if (settings.VoiceID && serverGuard.channels.cache.has(settings.VoiceID)) serverGuard.channels.cache.get(settings.VoiceID).join().catch(); console.log(`Sunucu Guard??na ses-durum ba??land??.`)})
roleGuard.on('ready', async() => {roleGuard.user.setPresence({ activity: { name: settings.statusMessage }, status: settings.statusCase }); if (settings.VoiceID && roleGuard.channels.cache.has(settings.VoiceID)) roleGuard.channels.cache.get(settings.VoiceID).join().catch(); console.log(`Rol Guard??na ses-durum ba??land??.`)})
channelGuard.on('ready', async() => {channelGuard.user.setPresence({ activity: { name: settings.statusMessage }, status: settings.statusCase }); if (settings.VoiceID && channelGuard.channels.cache.has(settings.VoiceID)) channelGuard.channels.cache.get(settings.VoiceID).join().catch(); console.log(`Kanal Guard??na ses-durum ba??land??.`)})

serverGuard.login(settings.SunucuGuardToken).then(console.log(`Sunucu Korunuyor.`)).catch(err => console.error('API ba??lanamad?? i??te hata sebebi: ' + err));
roleGuard.login(settings.RolGuardToken).then(console.log(`Roller Korunuyor.`)).catch(err => console.error('API ba??lanamad?? i??te hata sebebi: ' + err));
channelGuard.login(settings.KanalGuardToken).then(console.log(`Kanallar Korunuyor.`)).catch(err => console.error('API ba??lanamad?? i??te hata sebebi: ' + err));