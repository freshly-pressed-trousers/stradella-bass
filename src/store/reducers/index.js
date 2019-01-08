import { NOTE_ON, NOTE_OFF } from "store/actionTypes/note";

const INITIAL_STATE = {
	notes: [],
};

const ACTION_HANDLERS = {
	[NOTE_ON]: (state, action) => {
		const {
			payload: { midiNote },
		} = action;
		const newNotes = state.notes.slice();
		newNotes[midiNote] = true;

		return {
			...state,
			notes: newNotes,
		};
	},
	[NOTE_OFF]: (state, action) => {
		const {
			payload: { midiNote },
		} = action;
		const newNotes = state.notes.slice();
		newNotes[midiNote] = false;

		return {
			...state,
			notes: newNotes,
		};
	},
};

export default function reducer(state = INITIAL_STATE, action) {
	if (ACTION_HANDLERS[action.type]) {
		return ACTION_HANDLERS[action.type](state, action);
	} else {
		return state;
	}
}
