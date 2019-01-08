export function isNoteOn(state, noteNumber) {
	return !!state.notes[noteNumber];
}
