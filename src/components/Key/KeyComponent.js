import React from "react";
import styles from "./KeyComponent.module.css";
import classNames from "classnames";

function isBlackNote(midiNote) {
	return [1, 3, 6, 8, 10].indexOf(midiNote % 12) >= 0;
}

export default function KeyComponent(props) {
	const { midiNote, isOn, triggerNote, releaseNote } = props;

	return (
		<div
			className={classNames(styles.wrapper, {
				[styles.blackNote]: isBlackNote(midiNote),
				[styles.on]: isOn,
			})}
			onPointerDown={() => triggerNote(midiNote)}
			onPointerUp={() => releaseNote(midiNote)}
			onPointerLeave={() => releaseNote(midiNote)}
		/>
	);
}
