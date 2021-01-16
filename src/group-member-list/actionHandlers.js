import { actionTypes } from '@servicenow/ui-core';
import { createHttpEffect } from '@servicenow/ui-effect-http';

const {
	COMPONENT_CONNECTED,
	COMPONENT_PROPERTY_CHANGED
} = actionTypes


const fetchGroupMembers = ({
	dispatch,
	state,
	action
}) => {

	let {
		properties: {
			group
		}
	} = state
	group = action.payload.value ? action.payload.value : group

	dispatch('GROUP_MEMBERS_REQUESTED', {
		table: 'sys_user_grmember',
		sysparm_query: `group=${group.sys_id}`
	})

}

const fetchUsers = (dispatch, groups) => {
	const userIDs = groups.map(group => group.user.value).join(',')

	dispatch('USERS_REQUESTED', {
		table: 'sys_user',
		sysparm_query: `sys_idIN${userIDs}`
	})
}

const fetchIncidents = (dispatch, users) => {
	const userIDs = users.map(user => user.sys_id).join(',')
	dispatch('INCIDENTS_REQUESTED', {
		table: 'incident',
		sysparm_query: `assigned_toIN${userIDs}^active=true`
	})
}

export default {
	[COMPONENT_CONNECTED]: fetchGroupMembers,
	[COMPONENT_PROPERTY_CHANGED]: fetchGroupMembers,
	GROUP_MEMBERS_REQUESTED: createHttpEffect('/api/now/table/:table', {
		method: 'GET',
		pathParams: ['table'],
		queryParams: ['sysparm_query'],
		startActionType: 'FETCHING_GROUP_MEMBERS',
		successActionType: 'GROUP_MEMBERS_FETCHED'
	}),
	USERS_REQUESTED: createHttpEffect('/api/now/table/:table', {
		method: 'GET',
		pathParams: ['table'],
		queryParams: ['sysparm_query'],
		successActionType: 'USERS_FETCHED'
	}),
	INCIDENTS_REQUESTED: createHttpEffect('/api/now/table/:table', {
		method: 'GET',
		pathParams: ['table'],
		queryParams: ['sysparm_query'],
		successActionType: 'INCIDENTS_FETCHED'
	}),
	FETCHING_GROUP_MEMBERS: ({
		updateState
	}) => {
		updateState({
			isLoading: true
		})
	},
	GROUP_MEMBERS_FETCHED: ({
		action,
		updateState,
		dispatch
	}) => {
		updateState({
			groupMembers: action.payload.result
		})
		fetchUsers(dispatch, action.payload.result)
	},
	USERS_FETCHED: ({
		action,
		updateState,
		dispatch
	}) => {
		updateState({
			users: action.payload.result,

		})
		fetchIncidents(dispatch, action.payload.result)
	},
	INCIDENTS_FETCHED: ({
		action,
		updateState
	}) => {
		updateState({
			incidents: action.payload.result,
			isLoading: false
		})

	}
}
