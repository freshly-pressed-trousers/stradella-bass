import getNoteFrequency from "../getNoteFrequency";

describe("getNoteFrequency", () => {
	it("A4 is 440 hz", () => {
		expect(getNoteFrequency(69)).toBeCloseTo(440);
	});
	it("A5 is 880 hz", () => {
		expect(getNoteFrequency(81)).toBeCloseTo(880);
	});
	it("C4 is 261.63 hz", () => {
		expect(getNoteFrequency(60)).toBeCloseTo(261.63);
	});
	it("E7 is 2637 hz", () => {
		expect(getNoteFrequency(100)).toBeCloseTo(2637, 0);
	});
});
