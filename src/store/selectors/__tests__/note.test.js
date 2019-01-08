import { isNoteOn } from "../note";

describe("note", () => {
	[
		{
			notes: [],
			midiNote: 0,
			expectedResult: false,
		},
		{
			notes: [true],
			midiNote: 0,
			expectedResult: true,
		},
		{
			notes: [true, true],
			midiNote: 1,
			expectedResult: true,
		},
		{
			notes: [true, false, false, true],
			midiNote: 2,
			expectedResult: false,
		},
		{
			notes: [],
			midiNote: 3,
			expectedResult: false,
		},
		{
			notes: [false, true, false],
			midiNote: 1,
			expectedResult: true,
		},
		{
			notes: [true, false, false],
			midiNote: 0,
			expectedResult: true,
		},
	].forEach(({ notes, midiNote, expectedResult }) =>
		it(`given notes state of ${JSON.stringify(
			notes
		)}, and midiNote ${midiNote}, expect ${expectedResult}`, () =>
			expect(isNoteOn({ notes }, midiNote)).toBe(expectedResult))
	);
});
