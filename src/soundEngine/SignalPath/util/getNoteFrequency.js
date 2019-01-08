export default function getNoteFrequency(midiNote) {
	return Math.pow(2, (midiNote - 69) / 12) * 440;
}
