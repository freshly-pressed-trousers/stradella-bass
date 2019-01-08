import { NOTE_ON, NOTE_OFF } from "store/actionTypes/notes";
import reducer from "../notes";

describe("notes reducer", () => {
	it("has initial state", () => {
		const state = reducer(undefined, {});
		expect(state).toEqual([]);
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
			const state = [];
			const newState = reducer(state, action);
			expect(newState[midiNote]).toBeTruthy();
		});
		it("updates notes part of state given NOTE_ON action retaining notes", () => {
			const midiNote = 2;
			const action = {
				type: NOTE_ON,
				payload: {
					midiNote,
				},
			};
			const state = [true, false];
			const newState = reducer(state, action);
			expect(newState[midiNote]).toBeTruthy();
			expect(newState[0]).toBeTruthy();
			expect(newState[1]).toBeFalsy();
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
			const state = [true, true, true];
			const newState = reducer(state, action);
			expect(newState[midiNote]).toBeFalsy();
		});
		it("updates notes part of state given NOTE_OFF action retaining existing note boolean states", () => {
			const midiNote = 0;
			const action = {
				type: NOTE_OFF,
				payload: {
					midiNote,
				},
			};
			const state = [true, true];
			const newState = reducer(state, action);
			expect(newState[0]).toBeFalsy();
			expect(newState[1]).toBeTruthy();
		});
	});
});
