import '../group-member'

export default (state) => {
    
const { isLoading, incidents } = state
const users = state.users.map(user => {
	user.incidents = incidents.filter(inc => inc.assigned_to.value === user.sys_id)	
	return user
});

const sortedUsers = users.sort((a, b) => {
	if (a.incidents > b.incidents) {
		return -1
	} else if (b.incidents > a.incidents) {
		return 1
	} else {
		return 0
	}
})

	return (
		<div>
		{isLoading ? <now-loader/> : 
			users.length > 0 ?
			sortedUsers.map(user =>
			(<group-member user={user} 
				incidents={user.incidents}/>))
			: <span>This group has no users</span>
			}

		</div>
	);
};
 