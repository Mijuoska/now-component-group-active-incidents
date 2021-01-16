import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import '@servicenow/now-dropdown'
import view from './view'
import actionHandlers from './actionHandlers'
import styles from './styles.scss';

createCustomElement('x-365298-group-active-incidents', {
	renderer: {type: snabbdom},
	initialState: {
		groups: [],
		selectedGroup: {'sys_id': 'd625dccec0a8016700a222a0f7900d06', 'name': 'Service Desk'}
	},
	actionHandlers,
	view,
	styles
});
