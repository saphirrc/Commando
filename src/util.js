//Ok!
function escapeRegex(str) {
	return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
}

function disambiguation(items, label, property = 'name') {
	const itemList = items.map(item => `"${(property ? item[property] : item).replace(/ /g, '\xa0')}"`).join(',   ');
	return `Multiple ${label} found, please be more specific: ${itemList}`;
}

function paginate(items, page = 1, pageLength = 10) {
	const maxPage = Math.ceil(items.length / pageLength);
	if(page < 1) page = 1;
	if(page > maxPage) page = maxPage;
	const startIndex = (page - 1) * pageLength;
	return {
		items: items.length > pageLength ? items.slice(startIndex, startIndex + pageLength) : items,
		page,
		maxPage,
		pageLength
	};
}

const permissions = {
	ADMINISTRATOR: 'Administrator',
	VIEW_AUDIT_LOG: 'Voir les logs',
	MANAGE_GUILD: 'Gérer le serveur',
	MANAGE_ROLES: 'Gérer les rôles',
	MANAGE_CHANNELS: 'Gérer les canaux',
	KICK_MEMBERS: 'Expulser des membres',
	BAN_MEMBERS: 'Bannir des membres',
	CREATE_INSTANT_INVITE: 'Créer une invitation',
	CHANGE_NICKNAME: 'Changer de pseudo',
	MANAGE_NICKNAMES: 'Gérer les pseudos',
	MANAGE_EMOJIS: 'Gérer les émojis',
	MANAGE_WEBHOOKS: 'Gérer les WebHooks',
	VIEW_CHANNEL: 'Lire les salons textuels et voir les salons vocaux',
	SEND_MESSAGES: 'Envoyer des messages',
	SEND_TTS_MESSAGES: 'Envoyer des messages TTS ',
	MANAGE_MESSAGES: 'Gérer les messages',
	EMBED_LINKS: 'Intégrer des liens',
	ATTACH_FILES: 'Envoyer des fichiers',
	READ_MESSAGE_HISTORY: 'Lire les anciens messages',
	MENTION_EVERYONE: 'Mentionner tout le monde',
	USE_EXTERNAL_EMOJIS: 'Utiliser des émojis externes',
	ADD_REACTIONS: 'Ajouter des réactions',
	CONNECT: 'Se connecter',
	SPEAK: 'Parler',
	MUTE_MEMBERS: 'Couper le micro des membres',
	DEAFEN_MEMBERS: 'Mettre en sourdine des membres',
	MOVE_MEMBERS: 'Déplacer des membres',
	USE_VAD: 'Utiliser la détection de voix'
};

module.exports = {
	escapeRegex,
	disambiguation,
	paginate,
	permissions
};
