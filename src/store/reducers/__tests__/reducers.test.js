import { NOTE_ON, NOTE_OFF } from "store/actionTypes/note";
import reducer from "../";

describe("notes reducer", () => {
	it("has initial state", () => {
		const state = reducer(undefined, {});
		expect(state).toEqual({ notes: [] });
	});

	describe("note on", () => {
		it("updates notes part of state given NOTE_ON action", () => {
			const midiNote = 2;
			const action = {
				type: NOTE_ON,
				payload: {
					midiNote,
				},
			};
			const state = {
				notes: [],
			};
			const newState = reducer(state, action);
			expect(newState.notes[midiNote]).toBeTruthy();
		});
		it("updates notes part of state given NOTE_ON action retaining notes", () => {
			const midiNote = 2;
			const action = {
				type: NOTE_ON,
				payload: {
					midiNote,
				},
			};
			const state = {
				notes: [true, false],
			};
			const newState = reducer(state, action);
			expect(newState.notes[midiNote]).toBeTruthy();
			expect(newState.notes[0]).toBeTruthy();
			expect(newState.notes[1]).toBeFalsy();
		});
	});
	describe("note off", () => {
		it("updates notes part of state given NOTE_OFF action", () => {
			const midiNote = 2;
			const action = {
				type: NOTE_OFF,
				payload: {
					midiNote,
				},
			};
			const state = {
				notes: [true, true, true],
			};
			const newState = reducer(state, action);
			expect(newState.notes[midiNote]).toBeFalsy();
		});
		it("updates notes part of state given NOTE_OFF action retaining existing note boolean states", () => {
			const midiNote = 0;
			const action = {
				type: NOTE_OFF,
				payload: {
					midiNote,
				},
			};
			const state = {
				notes: [true, true],
			};
			const newState = reducer(state, action);
			expect(newState.notes[0]).toBeFalsy();
			expect(newState.notes[1]).toBeTruthy();
		});
	});
});
