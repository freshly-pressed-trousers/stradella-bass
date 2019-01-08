import Envelope from "./Envelope";

export default function createParameters() {
	const filterEnvelope = new Envelope(1800);
	filterEnvelope.attack = 0.02;
	filterEnvelope.decay = 0.6;
	filterEnvelope.sustain = 0.5;
	filterEnvelope.release = 0.05;

	const amplitudeEnvelope = new Envelope(0.5);
	amplitudeEnvelope.attack = 0.01;
	amplitudeEnvelope.decay = 3.8;
	amplitudeEnvelope.sustain = 1;
	amplitudeEnvelope.release = 0.01;

	return {
		detune: 0.05,
		offset: 0,
		bendAmount: 0,
		bendRange: 2,
		filterCutoff: 200,
		filterResonance: 3,
		oscAType: "sawtooth",
		oscBType: "sawtooth",
		oscMix: 0.2,
		filterType: "lowpass",
		filterEnvelope,
		amplitudeEnvelope,
	};
}
