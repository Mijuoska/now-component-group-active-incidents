import {
	createCustomElement,
} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import '@servicenow/now-loader';
import view from './view'
import actionHandlers from './actionHandlers'
import styles from './styles.scss';


createCustomElement('group-member-list', {
	renderer: {
		type: snabbdom
	},
	initialState: {
		isLoading: false,
		users: [],
		groupMembers: [],
		incidents: []
	},
	properties: {
		group: {
			default: {
				sys_id: 'd625dccec0a8016700a222a0f7900d06',
				name: 'Service Desk'
			}
		}
	},
	view,
	actionHandlers,
	styles
});
