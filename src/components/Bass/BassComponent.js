import React from "react";
import styles from "./BassComponent.module.css";

import Button from "components/Button";
import ButtonRow from "components/ButtonRow";

const transpose = amount => note => note + amount;
const transformRootToMajorTriad = note => [note, note + 4, note + 7];
const transformRootToMinorTriad = note => [note, note + 3, note + 7];
const transformRootTo7th = note => [note + 10, note + 4, note + 7]; // 7th on the stradella bass ommits the root
const transformRootToDiminshed = note => [note + 3, note + 6, note + 9]; // Diminished on the stradella bass also ommits the root

const BASS_ROW_NOTES = [
	51, // Eb3
	46, // Bb2
	53, // F3
	48, // C3
	55, // G3
	50, // D3
	57, // A3
	52, // E3
];

// The counter bass in a stradella system is the major third above the root
const COUNTER_BASS_ROW_NOTES = BASS_ROW_NOTES.map(transpose(4));
// All the chord rows are one octave up from the bass row
const MAJOR_CHORD_ROW_NOTES = BASS_ROW_NOTES.map(transpose(12)).map(
	transformRootToMajorTriad
);
const MINOR_CHORD_ROW_NOTES = BASS_ROW_NOTES.map(transpose(12)).map(
	transformRootToMinorTriad
);
const SEVENTH_CHORD_ROW_NOTES = BASS_ROW_NOTES.map(transpose(12)).map(
	transformRootTo7th
);
const DIMINSHED_CHORD_ROW_NOTES = BASS_ROW_NOTES.map(transpose(12)).map(
	transformRootToDiminshed
);

export default function BassComponent() {
	return (
		<div className={styles.wrapper}>
			<ButtonRow label="Counter Bass">
				{COUNTER_BASS_ROW_NOTES.map(midiNote => (
					<Button key={midiNote} midiNote={midiNote} />
				))}
			</ButtonRow>
			<ButtonRow label="Bass">
				{BASS_ROW_NOTES.map(midiNote => (
					<Button key={midiNote} midiNote={midiNote} />
				))}
			</ButtonRow>
			<ButtonRow label="Major">
				{MAJOR_CHORD_ROW_NOTES.map((midiNotes, index) => (
					<Button key={index} midiNotes={midiNotes} />
				))}
			</ButtonRow>
			<ButtonRow label="Minor">
				{MINOR_CHORD_ROW_NOTES.map((midiNotes, index) => (
					<Button key={index} midiNotes={midiNotes} />
				))}
			</ButtonRow>
			<ButtonRow label="Seventh">
				{SEVENTH_CHORD_ROW_NOTES.map((midiNotes, index) => (
					<Button key={index} midiNotes={midiNotes} />
				))}
			</ButtonRow>
			<ButtonRow label="Diminished">
				{DIMINSHED_CHORD_ROW_NOTES.map((midiNotes, index) => (
					<Button key={index} midiNotes={midiNotes} />
				))}
			</ButtonRow>
		</div>
	);
}
