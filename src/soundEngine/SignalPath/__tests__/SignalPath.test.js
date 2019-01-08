import SignalPath from "../SignalPath";
import audioContext from "../../audioContext";
import getNoteFrequency from "../util/getNoteFrequency";
import Envelope from "../Envelope";

jest.mock("../../audioContext");
jest.mock("../util/getNoteFrequency");
jest.mock("../Envelope");

describe("SignalPath", () => {
	let audioContextMock,
		oscillatorAMock,
		oscillatorBMock,
		ampAMock,
		ampBMock,
		ampCMock,
		filterMock,
		filterEnvelopeMock,
		ampEnvelopeMock;

	beforeEach(() => {
		oscillatorAMock = {
			start: jest.fn(),
			connect: jest.fn(),
			frequency: {
				setValueAtTime: jest.fn(),
			},
		};
		filterEnvelopeMock = {
			setEnvelopeNoteOnAutomation: jest.fn(),
			setEnvelopeNoteOffAutomation: jest.fn(),
		};
		ampEnvelopeMock = {
			setEnvelopeNoteOnAutomation: jest.fn(),
			setEnvelopeNoteOffAutomation: jest.fn(),
		};
		oscillatorBMock = {
			start: jest.fn(),
			connect: jest.fn(),
			frequency: {
				setValueAtTime: jest.fn(),
			},
		};
		ampAMock = {
			gain: {
				value: 0,
			},
			connect: jest.fn(),
		};
		ampBMock = {
			gain: {
				value: 0,
			},
			connect: jest.fn(),
		};
		ampCMock = {
			gain: {
				value: 0,
			},
			connect: jest.fn(),
		};
		filterMock = {
			connect: jest.fn(),
			frequency: {
				setValueAtTime: jest.fn(),
			},
			Q: {
				setValueAtTime: jest.fn(),
			},
		};
		audioContextMock = {
			createOscillator: jest
				.fn()
				.mockReturnValueOnce(oscillatorAMock)
				.mockReturnValueOnce(oscillatorBMock),
			createGain: jest
				.fn()
				.mockReturnValueOnce(ampAMock)
				.mockReturnValueOnce(ampBMock)
				.mockReturnValueOnce(ampCMock),
			createBiquadFilter: jest.fn().mockReturnValue(filterMock),
			currentTime: 20,
			destination: "destination",
		};
		audioContext.mockReturnValue(audioContextMock);
		Envelope.mockImplementationOnce(() => filterEnvelopeMock);
		Envelope.mockImplementationOnce(() => ampEnvelopeMock);
	});

	describe("signal path instantiation", () => {
		describe("oscillators", () => {
			it("creates two oscillators", () => {
				const signalPath = new SignalPath();

				expect(audioContextMock.createOscillator).toBeCalledTimes(2);
			});
			it("starts oscillator A", () => {
				const signalPath = new SignalPath();

				expect(oscillatorAMock.start).toBeCalled();
			});
			it("starts oscillator B", () => {
				const signalPath = new SignalPath();

				expect(oscillatorBMock.start).toBeCalled();
			});
			it("connects oscillatorA to amplifierA", () => {
				const signalPath = new SignalPath();

				expect(oscillatorAMock.connect).toBeCalledWith(ampAMock);
			});
			it("connects oscillatorB to amplifierB", () => {
				const signalPath = new SignalPath();

				expect(oscillatorBMock.connect).toBeCalledWith(ampBMock);
			});
		});
		describe("gain nodes (amplifiers (VCAs))", () => {
			it("creates three amplifiers", () => {
				const signalPath = new SignalPath();

				expect(audioContextMock.createGain).toBeCalledTimes(3);
			});
			it("connects ampA to filter", () => {
				const signalPath = new SignalPath();

				expect(ampAMock.connect).toBeCalledWith(filterMock);
			});
			it("connects ampB to filter", () => {
				const signalPath = new SignalPath();

				expect(ampBMock.connect).toBeCalledWith(filterMock);
			});
			it("connects ampC to audioContext destination", () => {
				const signalPath = new SignalPath();

				expect(ampCMock.connect).toBeCalledWith(
					audioContextMock.destination
				);
			});
		});
		describe("filter", () => {
			it("creates one filter", () => {
				const signalPath = new SignalPath();

				expect(audioContextMock.createBiquadFilter).toBeCalledTimes(1);
			});
			it("connects filter to ampC", () => {
				const signalPath = new SignalPath();

				expect(filterMock.connect).toBeCalledWith(ampCMock);
			});
		});
	});

	describe("midiNoteOn", () => {
		it("calls getNoteFrequency with note value", () => {
			const signalPath = new SignalPath();

			signalPath.midiNoteOn(42);

			expect(getNoteFrequency).toBeCalledWith(42);
		});
		it("sets oscillatorA frequency to result of getNoteFrequency and audioContext currentTime", () => {
			const signalPath = new SignalPath();

			getNoteFrequency.mockReturnValue(440);

			signalPath.midiNoteOn(42);

			expect(oscillatorAMock.frequency.setValueAtTime).toBeCalledWith(
				440,
				audioContextMock.currentTime
			);
		});
		it("sets oscillatorB frequency to result of getNoteFrequency and audioContext currentTime", () => {
			const signalPath = new SignalPath();

			getNoteFrequency.mockReturnValue(440);

			signalPath.midiNoteOn(42);

			expect(oscillatorBMock.frequency.setValueAtTime).toBeCalledWith(
				440,
				audioContextMock.currentTime
			);
		});
		describe("oscillator mix", () => {
			it("sets ampA gain value to 0.4", () => {
				const signalPath = new SignalPath();

				signalPath.midiNoteOn(42);

				expect(ampAMock.gain.value).toEqual(0.4);
			});
			it("sets ampB gain value to 0.1", () => {
				const signalPath = new SignalPath();

				signalPath.midiNoteOn(42);

				expect(ampBMock.gain.value).toEqual(0.1);
			});
		});
		it("sets filter Q", () => {
			const signalPath = new SignalPath();

			signalPath.midiNoteOn(42);

			expect(filterMock.Q.setValueAtTime).toBeCalledWith(
				3,
				audioContextMock.currentTime
			);
		});
		it("sets signalPath to active", () => {
			const signalPath = new SignalPath();

			signalPath.midiNoteOn(42);

			expect(signalPath.active).toBe(true);
		});
		it("calls filterEnvelope.setEnvelopeNoteOnAutomation with filter frequency, filterCutoff and currentTime", () => {
			const signalPath = new SignalPath();

			signalPath.midiNoteOn(42);

			expect(
				filterEnvelopeMock.setEnvelopeNoteOnAutomation
			).toBeCalledWith(
				filterMock.frequency,
				200,
				audioContextMock.currentTime
			);
		});
		it("calls ampEnvelope.setEnvelopeNoteOnAutomation with ampC gain, filterCutoff and currentTime", () => {
			const signalPath = new SignalPath();

			signalPath.midiNoteOn(42);

			expect(ampEnvelopeMock.setEnvelopeNoteOnAutomation).toBeCalledWith(
				ampCMock.gain,
				0,
				audioContextMock.currentTime
			);
		});
	});
	describe("midiNoteOff", () => {
		it("sets signalPath to inactive on invocation of midiNoteOff after midiNoteOn has been triggered", () => {
			const signalPath = new SignalPath();

			signalPath.midiNoteOn(42);
			signalPath.midiNoteOff(42);

			expect(signalPath.active).toBe(false);
		});

		it("calls filterEnvelope.setEnvelopeNoteOffAutomation with filter frequency, filterCutoff, and currentTime", () => {
			const signalPath = new SignalPath();

			signalPath.midiNoteOff(42);

			expect(
				filterEnvelopeMock.setEnvelopeNoteOffAutomation
			).toBeCalledWith(
				filterMock.frequency,
				200,
				audioContextMock.currentTime
			);
		});

		it("calls ampEnvelope.setEnvelopeNoteOffAutomation with ampC gain, filterCutoff and currentTime", () => {
			const signalPath = new SignalPath();

			signalPath.midiNoteOff(42);

			expect(ampEnvelopeMock.setEnvelopeNoteOffAutomation).toBeCalledWith(
				ampCMock.gain,
				0,
				audioContextMock.currentTime
			);
		});
	});
});
