import { NOTE_ON, NOTE_OFF } from "store/actionTypes/notes";
import { triggerNote, releaseNote } from "../notes";

describe("notes", () => {
	it("triggerNote invocation creates action", () => {
		expect(triggerNote(24)).toEqual({
			type: NOTE_ON,
			payload: {
				midiNote: 24,
			},
		});
	});
	it("releaseNote invocation creates action", () => {
		expect(releaseNote(24)).toEqual({
			type: NOTE_OFF,
			payload: {
				midiNote: 24,
			},
		});
	});
});
