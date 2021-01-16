import {
	createCustomElement
} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import '@servicenow/now-card';
import '@servicenow/now-avatar'
import view from './view'
import actionHandlers from './actionHandlers'
import styles from './styles.scss';


createCustomElement('group-member', {
	renderer: {
		type: snabbdom
	},
	initialState: {
		showIncs: false
	},
	properties: {
		user: {},
		incidents: [],
	},
	actionHandlers,
	view,
	styles
});
