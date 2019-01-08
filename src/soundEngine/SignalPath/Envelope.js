export default class Envelope {
	constructor(scale) {
		this.attack = 0;
		this.decay = 2;
		this.sustain = 0;
		this.release = 0;
		this.amount = scale;
	}

	setEnvelopeNoteOnAutomation = (parameter, base, currentTime) => {
		parameter.cancelScheduledValues(currentTime);
		parameter.setValueAtTime(base, currentTime);
		parameter.linearRampToValueAtTime(
			base + this.amount,
			currentTime + this.attack
		);
		parameter.linearRampToValueAtTime(
			base + this.sustain * this.amount,
			currentTime + this.attack + this.decay
		);
	};

	setEnvelopeNoteOffAutomation = (parameter, base, currentTime) => {
		parameter.cancelScheduledValues(currentTime);
		parameter.setValueAtTime(parameter.value, currentTime);
		parameter.linearRampToValueAtTime(base, currentTime + this.release);
	};
}
