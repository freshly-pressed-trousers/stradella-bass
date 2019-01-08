import React from "react";
import Key from "components/Key";
import styles from "./KeyboardComponent.module.css";

const BASE_NOTE = 45;
const KEYS = 33;

export default function ButtonRowComponent(props) {
	return (
		<div className={styles.wrapper}>
			{new Array(KEYS).fill(true).map((v, index) => (
				<Key key={index} midiNote={BASE_NOTE + index} />
			))}
		</div>
	);
}
