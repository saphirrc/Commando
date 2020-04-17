const { oneLine } = require('common-tags');
const Command = require('../base');

module.exports = class EnableCommandCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'enable',
			aliases: ['enable-command', 'cmd-on', 'command-on'],
			group: 'commands',
			memberName: 'enable',
			description: 'Active une commande un groupe de commandes.',
			details: oneLine`
				Seul les administrateurs peuvent utiliser cette commande. 
			`,
			examples: ['enable util', 'enable Utility', 'enable prefix'],
			guarded: true,

			args: [
				{
					key: 'cmdOrGrp',
					label: 'command/group',
					prompt: 'Quelle commande souhaitez vous activer?',
					type: 'group|command'
				}
			]
		});
	}

	hasPermission(msg) {
		if(!msg.guild) return this.client.isOwner(msg.author);
		return msg.member.hasPermission('ADMINISTRATOR') || this.client.isOwner(msg.author);
	}

	run(msg, args) {
		const group = args.cmdOrGrp.group;
		if(args.cmdOrGrp.isEnabledIn(msg.guild, true)) {
			/*const tembed = {
				title: "Activation d'une commande",
				description: "La commande %name% est déjà activée mais le groupe %group% est désactivé, la commande ne peut donc pas être utilisé",
				color: "RANDOM"
			}
			*/
			const grpembed = {
			title: "Activation d'une commande",
			description: `La commande / le groupe __${args.cmdOrGrp.name}__ est déjà activé`
			}
			return msg.reply(
				`La commande / le groupe\`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'command' : 'group'} est déjà activé(e)${
					group && !group.isEnabledIn(msg.guild) ?
					`, mais le groupe \`${group.name}\` est désactivé, la commande ne peut pas être utilisée` :
					''
				}.`
			);
		}
		args.cmdOrGrp.setEnabledIn(msg.guild, true);
		return msg.reply(
			`La commande / le groupe \`${args.cmdOrGrp.name}\` ${group ? 'command' : 'group'} est déjà activé(e)${
				group && !group.isEnabledIn(msg.guild) ?
				`, mais le groupe\`${group.name}\` est désactivé, la commande ne peut pas être utilisée` :
				''
			}.`
		);
	}
};