import React, { Component, Fragment } from "react";
import styles from "./App.module.css";
import store from "store";
import { Provider } from "react-redux";

import Bass from "components/Bass";
import Keyboard from "components/Keyboard";

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			started: false,
		};
	}

	renderApp() {
		return (
			<Fragment>
				<Bass />
				<Keyboard />
			</Fragment>
		);
	}

	renderPending() {
		return (
			<Fragment>
				<h2>By William Haynes</h2>
				<p className={styles.paragraph}>
					The Stradella Bass system is a type of layout for the bass
					section of an accordion I've made this as an interactive
					demo utilising the web audio API + React & Redux to
					demonstrate how the mysterious buttons on the stradella bass
					correspond to piano keys.
				</p>
				<p className={styles.paragraph}>
					When I was first getting acquainted with the accordion I was
					infatuated with its simplicity and musicality of harmonic
					design in how with relative ease you can provide yourself
					with accompaniments.
				</p>
				<button
					className={styles.startButton}
					onClick={() => this.setState({ started: true })}
				>
					Click here to start
				</button>
			</Fragment>
		);
	}

	render() {
		return (
			<Provider store={store}>
				<div className={styles.appWrapper}>
					<h1 className={styles.header}>
						Stradella Bass System{" "}
						<span role="img" aria-label="Musical notes">
							🎵
						</span>
					</h1>
					{this.state.started
						? this.renderApp()
						: this.renderPending()}
				</div>
			</Provider>
		);
	}
}
