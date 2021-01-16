import '../incidents-list'

export default (state) => {	

const {properties: {user, incidents}} = state
const WIPIncs = incidents.filter(inc => inc.state == 2).length
const OHIncs = incidents.filter(inc => inc.state == 3).length
const { showIncs } = state

	return (
		<div>
		<now-card size='md' interaction="click">
		<div className='row'>
		<div className='col'>
		<now-avatar size='md' user-name={user.name}></now-avatar>
		<now-card-header heading={{"size": "md", "label": user.name, "lines": 1}}/>
		</div>
		<div className='col'>
		<p>Incidents: {incidents.length}</p>
		<em>Work in Progress: {WIPIncs}</em><br/>
		<em>On Hold: {OHIncs}</em>
		</div>
		</div>

		</now-card>
		<incidents-list 
		incidents={incidents} isVisible={showIncs}/>
		</div>
	);
};

