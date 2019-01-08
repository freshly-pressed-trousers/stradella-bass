import React from "react";
import styles from "./ButtonRowComponent.module.css";

export default function ButtonRowComponent(props) {
	const { children, label } = props;

	return (
		<div className={styles.wrapper}>
			<span className={styles.label}>{label}</span>
			<div className={styles.rowContainer}>{children}</div>
		</div>
	);
}
