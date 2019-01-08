import React from "react";
import ReactDOM from "react-dom";
import KeyboardComponent from "../KeyboardComponent";
import { shallow } from "enzyme";
import Key from "components/Key";

describe("Keyboard component", () => {
	it("matches snapshot", () => {
		expect(shallow(<KeyboardComponent />)).toMatchSnapshot();
	});

	it("has 33 keys", () => {
		const component = shallow(<KeyboardComponent />);

		expect(component.find(Key).length).toEqual(33);
	});
});
