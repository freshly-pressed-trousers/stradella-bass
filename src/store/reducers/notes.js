import { NOTE_ON, NOTE_OFF } from "store/actionTypes/notes";

const INITIAL_STATE = [];

const ACTION_HANDLERS = {
	[NOTE_ON]: (state, action) => {
		const {
			payload: { midiNote },
		} = action;
		const newNotes = state.slice();
		newNotes[midiNote] = true;

		return newNotes;
	},
	[NOTE_OFF]: (state, action) => {
		const {
			payload: { midiNote },
		} = action;
		const newNotes = state.slice();
		newNotes[midiNote] = false;

		return newNotes;
	},
};

export default function reducer(state = INITIAL_STATE, action) {
	if (ACTION_HANDLERS[action.type]) {
		return ACTION_HANDLERS[action.type](state, action);
	} else {
		return state;
	}
}
