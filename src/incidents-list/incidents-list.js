import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import view from './view'

createCustomElement('incidents-list', {
	renderer: {type: snabbdom},
	properties: {
		incidents: [],
		isVisible: {
			default: false
		}
	},
	view,
	styles
});
