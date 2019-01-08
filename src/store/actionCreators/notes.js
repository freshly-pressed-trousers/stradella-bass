import { NOTE_ON, NOTE_OFF } from "store/actionTypes/notes";

export function triggerNote(midiNote) {
	return {
		type: NOTE_ON,
		payload: {
			midiNote,
		},
	};
}

export function releaseNote(midiNote) {
	return {
		type: NOTE_OFF,
		payload: {
			midiNote,
		},
	};
}
