import '../group-member-list'

export default (state, {updateState}) => {	

const { groups, selectedGroup } = state
const dropdownItems = groups.map(group => {
	return {id: group.sys_id, label: group.name}
}
	)


	return (
<div>
<now-dropdown size="md" placeholder="Select group" items={dropdownItems}/>
<group-member-list group={selectedGroup}/>
</div> 
	);
};
