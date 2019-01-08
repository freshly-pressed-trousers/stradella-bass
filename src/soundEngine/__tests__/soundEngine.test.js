import { trigger, release } from "../";
import SignalPath from "../SignalPath";
jest.mock("../SignalPath");

describe("soundEngine", () => {
	const midiNoteOn = jest.fn();
	const midiNoteOff = jest.fn();
	const isCurrentlyPlaying = jest.fn();

	afterEach(() => {
		midiNoteOn.mockReset();
		midiNoteOff.mockReset();
		isCurrentlyPlaying.mockReset();
	});

	SignalPath.mockImplementation(() => {
		return {
			isCurrentlyPlaying,
			midiNoteOn,
			midiNoteOff,
		};
	});

	describe("trigger", () => {
		it("when triggered and free signal paths available invokes midiNoteOn with midi note number", () => {
			isCurrentlyPlaying.mockReturnValue(false);

			trigger(42);

			expect(midiNoteOn).toBeCalledWith(42);
		});

		it("when triggered and no free signal paths available does not invoke midiNoteOn with midi note number", () => {
			isCurrentlyPlaying.mockReturnValue(true);

			trigger(42);

			expect(midiNoteOn).not.toBeCalledWith(42);
		});
	});
	describe("release", () => {
		it("when note on triggered and then released triggers midiNoteOff", () => {
			isCurrentlyPlaying.mockReturnValue(false);

			trigger(24);
			release(24);

			expect(midiNoteOff).toBeCalled();
		});
	});
});
