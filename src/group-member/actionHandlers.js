export default {
	'NOW_CARD#CLICKED': ({
		state,
		updateState
	}) => {
		const {
			showIncs
		} = state
		updateState({
			showIncs: !showIncs
		})
	}
}

