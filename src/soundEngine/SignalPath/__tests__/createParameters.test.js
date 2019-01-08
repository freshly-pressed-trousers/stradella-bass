import createParameters from "../createParameters";
import Envelope from "../Envelope";

describe("createParameters", () => {
	it("has field detune", () => {
		expect(createParameters().detune).toBeDefined();
	});
	it("has field offset", () => {
		expect(createParameters().offset).toBeDefined();
	});
	it("has field bendAmount", () => {
		expect(createParameters().bendAmount).toBeDefined();
	});
	it("has field bendRange", () => {
		expect(createParameters().bendRange).toBeDefined();
	});
	it("has field filterCutoff", () => {
		expect(createParameters().filterCutoff).toBeDefined();
	});
	it("has field filterResonance", () => {
		expect(createParameters().filterResonance).toBeDefined();
	});
	it("has field oscAType", () => {
		expect(createParameters().oscAType).toBeDefined();
	});
	it("has field oscBType", () => {
		expect(createParameters().oscBType).toBeDefined();
	});

	it("oscAType is a valid type", () => {
		expect(createParameters().oscAType).toBeOneOf([
			"sine",
			"triangle",
			"square",
			"sawtooth",
		]);
	});
	it("oscBType is a valid type", () => {
		expect(createParameters().oscBType).toBeOneOf([
			"sine",
			"triangle",
			"square",
			"sawtooth",
		]);
	});

	it("has field oscMix", () => {
		expect(createParameters().oscMix).toBeDefined();
	});
	it("has field filterType", () => {
		expect(createParameters().filterType).toBeDefined();
	});

	it("has field filterEnvelope", () => {
		expect(createParameters().filterEnvelope).toBeDefined();
	});
	it("has field amplitudeEnvelope", () => {
		expect(createParameters().amplitudeEnvelope).toBeDefined();
	});

	it("filterEnvelope is instance of Envelope", () => {
		expect(createParameters().filterEnvelope).toBeInstanceOf(Envelope);
	});
	it("amplitudeEnvelope is instance of Envelope", () => {
		expect(createParameters().amplitudeEnvelope).toBeInstanceOf(Envelope);
	});
});
