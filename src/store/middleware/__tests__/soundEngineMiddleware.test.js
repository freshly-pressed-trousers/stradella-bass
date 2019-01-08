import { trigger, release } from "soundEngine";
import { NOTE_ON, NOTE_OFF } from "store/actionTypes/note";
import soundEngineMiddleware from "../soundEngineMiddleware";

jest.mock("soundEngine");

describe("soundEngineMiddleware", () => {
	it("does nothing when action is not understood", () => {
		const next = jest.fn();
		const action = {
			type: "blah",
			payload: {},
		};
		soundEngineMiddleware()(next)(action);

		expect(trigger).not.toBeCalled();
		expect(release).not.toBeCalled();
	});

	it("calls next with action", () => {
		const next = jest.fn();
		const action = {
			type: "blah",
			payload: {},
		};
		soundEngineMiddleware()(next)(action);

		expect(next).toBeCalledWith(action);
	});
	it("calls release when NOTE_OFF action", () => {
		const next = jest.fn();
		const action = {
			type: NOTE_OFF,
			payload: {
				midiNote: 42,
			},
		};
		soundEngineMiddleware()(next)(action);

		expect(release).toBeCalledWith(42);
	});
	it("calls trigger when NOTE_ON action", () => {
		const next = jest.fn();
		const action = {
			type: NOTE_ON,
			payload: {
				midiNote: 42,
			},
		};
		soundEngineMiddleware()(next)(action);

		expect(trigger).toBeCalledWith(42);
	});
});
