import { actionTypes } from '@servicenow/ui-core';
import { createHttpEffect } from '@servicenow/ui-effect-http';

const { COMPONENT_CONNECTED } = actionTypes

const fetchGroups = ({
	dispatch
}) => {

	dispatch('GROUPS_REQUESTED', {
		table: 'sys_user_group',
	})
}

export default {
	[COMPONENT_CONNECTED]: fetchGroups,
	GROUPS_REQUESTED: createHttpEffect('/api/now/table/:table', {
		pathParams: ['table'],
		queryParams: ['sysparm_query'],
		successActionType: 'GROUPS_FETCHED',
	}),
	'NOW_DROPDOWN#ITEM_CLICKED': ({
		action,
		updateState
	}) => {
		updateState({
			selectedGroup: {
				sys_id: action.payload.item.id,
				name: action.payload.item.label
			}
		})
	},
	GROUPS_FETCHED: ({
		action,
		updateState
	}) => {
		updateState({
			groups: action.payload.result
		})
	}
}