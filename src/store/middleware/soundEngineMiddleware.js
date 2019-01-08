import { trigger, release } from "soundEngine";

import { NOTE_ON, NOTE_OFF } from "store/actionTypes/notes";

export default store => next => action => {
	next(action);

	if (action.type === NOTE_ON) {
		trigger(action.payload.midiNote);
	} else if (action.type === NOTE_OFF) {
		release(action.payload.midiNote);
	}
};
