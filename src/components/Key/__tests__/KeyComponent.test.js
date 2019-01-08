import React from "react";
import KeyComponent from "../KeyComponent";
import { shallow } from "enzyme";

describe("Key component", () => {
	it("has just wrapper class when given midiNote value for white key", () => {
		const component = shallow(<KeyComponent midiNote={41} />);

		expect(component.props().className).toEqual("wrapper");
	});

	it("has black Key class when given midiNote value for black key", () => {
		const component = shallow(<KeyComponent midiNote={42} />);

		expect(component.props().className).toEqual("wrapper blackNote");
	});

	it("has on class when isOn passed as true", () => {
		const component = shallow(<KeyComponent midiNote={43} isOn />);

		expect(component.props().className).toEqual("wrapper on");
	});

	it("invokes triggerNote with midiNote value when pointerDown", () => {
		const triggerNote = jest.fn();
		const component = shallow(
			<KeyComponent midiNote={43} triggerNote={triggerNote} />
		);

		component.simulate("pointerDown");

		expect(triggerNote).toBeCalledWith(43);
	});

	it("invokes releaseNote with midiNote value when pointerUp", () => {
		const releaseNote = jest.fn();
		const component = shallow(
			<KeyComponent midiNote={43} releaseNote={releaseNote} />
		);

		component.simulate("pointerUp");

		expect(releaseNote).toBeCalledWith(43);
	});

	it("invokes releaseNote with midiNote value when pointerLeave", () => {
		const releaseNote = jest.fn();
		const component = shallow(
			<KeyComponent midiNote={43} releaseNote={releaseNote} />
		);

		component.simulate("pointerLeave");

		expect(releaseNote).toBeCalledWith(43);
	});
});
