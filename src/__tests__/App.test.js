import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { shallow } from "enzyme";

import Bass from "components/Bass";
import Keyboard from "components/Keyboard";

describe("App component", () => {
	it("renders name on first mount", () => {
		const component = shallow(<App />);

		expect(component.find("h2").text()).toEqual("By William Haynes");
	});

	it("renders Bass component when clicked", () => {
		const component = shallow(<App />);

		component.find("button").simulate("click");

		expect(
			component
				.update()
				.find(Bass)
				.exists()
		).toBe(true);
	});

	it("renders Keyboard component when clicked", () => {
		const component = shallow(<App />);

		component.find("button").simulate("click");

		expect(
			component
				.update()
				.find(Keyboard)
				.exists()
		).toBe(true);
	});
});
