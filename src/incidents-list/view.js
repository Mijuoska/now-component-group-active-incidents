import {stateMap} from '../states'

export default (state) => {	
	const {properties: {incidents, isVisible}} = state 
	const sortedIncidents = incidents.sort((a, b) => {
		if (a.state > b.state) {
			return 1
		} else if (b.state > a.state) {
			return -1
		} else {
			return 0
		}
		});
		
	
	if (isVisible && incidents.length > 0) {
	return (
		<table>
		<tbody>
		<thead><th>Number</th><th>Short Description</th><th>State</th></thead>
		{sortedIncidents.map(inc =>(<tr><td>{inc.number}</td>
			<td>{inc.short_description}</td>
			<td>{stateMap[inc.state]}</td>
			</tr>))}
	</tbody>
		</table>

	)
	}
	else {
		return 
	}
}