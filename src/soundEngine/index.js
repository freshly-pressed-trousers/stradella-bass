import SignalPath from "./SignalPath";

const POLYPHONY_LIMIT = 12;

let started = false;
let availableNotes = [];
const activeNotes = {};

// we need to lazily initialise our signal paths due to autoplay policies in place for browsers
// read more: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices#Autoplay_policy
const initialiseWebAudioIfUninitialised = fn => props => {
	if (!started) {
		for (var i = 0; i < POLYPHONY_LIMIT; i++) {
			availableNotes.push(new SignalPath());
		}
		started = true;
	}
	fn(props);
};

export const trigger = initialiseWebAudioIfUninitialised(function trigger(
	midiNote
) {
	const freeSignalPath = availableNotes.find(
		signalPath => !signalPath.isCurrentlyPlaying()
	);
	if (freeSignalPath) {
		activeNotes[midiNote] = freeSignalPath;
		freeSignalPath.midiNoteOn(midiNote);
	}
});

export const release = initialiseWebAudioIfUninitialised(function release(
	midiNote
) {
	const usedSignalPath = activeNotes[midiNote];
	if (usedSignalPath) {
		usedSignalPath.midiNoteOff(midiNote);
		delete activeNotes[midiNote];
	}
});
