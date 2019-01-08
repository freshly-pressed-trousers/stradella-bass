import React from "react";
import styles from "./ButtonComponent.module.css";
import classNames from "classnames";

export default function ButtonComponent(props) {
	const { isOn, triggerNote, releaseNote, midiNote, midiNotes } = props;
	const isChord = !!midiNotes;
	const isMiddleC = midiNote === 48;

	function trigger() {
		if (isChord) {
			midiNotes.forEach(note => triggerNote(note));
		} else {
			triggerNote(midiNote);
		}
	}

	function release() {
		if (isChord) {
			midiNotes.forEach(note => releaseNote(note));
		} else {
			releaseNote(midiNote);
		}
	}

	return (
		<div
			className={classNames(styles.wrapper, {
				[styles.on]: isOn,
			})}
			onPointerDown={trigger}
			onPointerUp={release}
			onPointerLeave={release}
		>
			<div
				className={classNames(styles.inner, {
					[styles.middleC]: isMiddleC,
				})}
			/>
		</div>
	);
}
