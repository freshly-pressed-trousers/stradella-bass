import Envelope from "../Envelope";

describe("Envelope", () => {
	describe("setEnvelopeNoteOnAutomation", () => {
		it("invokes cancelScheduledValues when setting note on automation", () => {
			const scale = 1;
			const env = new Envelope(scale);

			const parameter = {
				cancelScheduledValues: jest.fn(),
				setValueAtTime: jest.fn(),
				linearRampToValueAtTime: jest.fn(),
			};
			const base = 0;
			const currentTime = 1;

			env.setEnvelopeNoteOnAutomation(parameter, base, currentTime);

			expect(parameter.cancelScheduledValues).toBeCalled();
		});
		it("sets value on invocation", () => {
			const scale = 1;
			const env = new Envelope(scale);

			const parameter = {
				cancelScheduledValues: jest.fn(),
				setValueAtTime: jest.fn(),
				linearRampToValueAtTime: jest.fn(),
			};
			const base = 0;
			const currentTime = 1;

			env.setEnvelopeNoteOnAutomation(parameter, base, currentTime);

			expect(parameter.setValueAtTime).toBeCalledWith(base, currentTime);
		});
		it("creates decay transient based on initial config and zero attack", () => {
			const scale = 1;
			const env = new Envelope(scale);

			const parameter = {
				cancelScheduledValues: jest.fn(),
				setValueAtTime: jest.fn(),
				linearRampToValueAtTime: jest.fn(),
			};
			const base = 0;
			const currentTime = 1;

			env.setEnvelopeNoteOnAutomation(parameter, base, currentTime);
			// decay ramp
			expect(parameter.linearRampToValueAtTime).toBeCalledWith(0, 3);
		});
		it("creates attack and decay transient based on initial config with 1 second attack", () => {
			const scale = 1;
			const env = new Envelope(scale);

			env.attack = 1;

			const parameter = {
				cancelScheduledValues: jest.fn(),
				setValueAtTime: jest.fn(),
				linearRampToValueAtTime: jest.fn(),
			};
			const base = 0;
			const currentTime = 1;

			env.setEnvelopeNoteOnAutomation(parameter, base, currentTime);
			// attack ramp
			expect(parameter.linearRampToValueAtTime).toBeCalledWith(scale, 2);
			// decay ramp
			expect(parameter.linearRampToValueAtTime).toBeCalledWith(0, 4);
		});
	});
	describe("setEnvelopeNoteOffAutomation", () => {
		it("invokes cancelScheduledValues when setting note on automation", () => {
			const scale = 1;
			const env = new Envelope(scale);

			const parameter = {
				cancelScheduledValues: jest.fn(),
				setValueAtTime: jest.fn(),
				linearRampToValueAtTime: jest.fn(),
			};
			const base = 0;
			const currentTime = 1;
			const currentValue = 1;

			env.setEnvelopeNoteOffAutomation(
				parameter,
				base,
				currentTime,
				currentValue
			);

			expect(parameter.cancelScheduledValues).toBeCalled();
		});
		it("sets value on invocation", () => {
			const scale = 1;
			const env = new Envelope(scale);

			const parameter = {
				cancelScheduledValues: jest.fn(),
				setValueAtTime: jest.fn(),
				linearRampToValueAtTime: jest.fn(),
				value: 2,
			};
			const base = 0;
			const currentTime = 1;

			env.setEnvelopeNoteOffAutomation(parameter, base, currentTime);

			expect(parameter.setValueAtTime).toBeCalledWith(
				parameter.value,
				currentTime
			);
		});
		it("invokes linearRampToValueAtTime with release transient", () => {
			const scale = 1;
			const env = new Envelope(scale);
			env.release = 1;

			const parameter = {
				cancelScheduledValues: jest.fn(),
				setValueAtTime: jest.fn(),
				linearRampToValueAtTime: jest.fn(),
			};
			const base = 0;
			const currentTime = 1;
			const currentValue = 1;

			env.setEnvelopeNoteOffAutomation(
				parameter,
				base,
				currentTime,
				currentValue
			);
			// release transient to scale to 0 at 2s
			expect(parameter.linearRampToValueAtTime).toBeCalledWith(0, 2);
		});
	});
});
