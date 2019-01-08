import React from "react";
import ButtonComponent from "../ButtonComponent";
import { shallow } from "enzyme";

describe("Button component", () => {
	it("renders as middle C if midiNote is 48", () => {
		const component = shallow(<ButtonComponent midiNote={48} />);

		expect(component.find(".middleC").exists()).toBe(true);
	});

	it("does not render as middle C if midiNote is not 48", () => {
		const component = shallow(<ButtonComponent midiNote={49} />);

		expect(component.find(".middleC").exists()).toBe(false);
	});

	it("renders as on if isOn passed as true", () => {
		const component = shallow(<ButtonComponent isOn />);

		expect(component.find(".on").exists()).toBe(true);
	});

	it("does not render as on if isOn passed as false", () => {
		const component = shallow(<ButtonComponent />);

		expect(component.find(".on").exists()).toBe(false);
	});

	describe("dispatches", () => {
		describe("single note", () => {
			it("invokes triggerNote with midiNote value when pointerDown", () => {
				const triggerNote = jest.fn();
				const component = shallow(
					<ButtonComponent midiNote={43} triggerNote={triggerNote} />
				);

				component.simulate("pointerDown");

				expect(triggerNote).toBeCalledWith(43);
			});

			it("invokes releaseNote with midiNote value when pointerUp", () => {
				const releaseNote = jest.fn();
				const component = shallow(
					<ButtonComponent midiNote={43} releaseNote={releaseNote} />
				);

				component.simulate("pointerUp");

				expect(releaseNote).toBeCalledWith(43);
			});

			it("invokes releaseNote with midiNote value when pointerLeave", () => {
				const releaseNote = jest.fn();
				const component = shallow(
					<ButtonComponent midiNote={43} releaseNote={releaseNote} />
				);

				component.simulate("pointerLeave");

				expect(releaseNote).toBeCalledWith(43);
			});
		});
		describe("chord buttons", () => {
			it("invokes triggerNote 3 times with midiNotes value when pointerDown", () => {
				const triggerNote = jest.fn();
				const component = shallow(
					<ButtonComponent
						midiNotes={[43, 44, 45]}
						triggerNote={triggerNote}
					/>
				);

				component.simulate("pointerDown");

				expect(triggerNote).toBeCalledWith(43);
				expect(triggerNote).toBeCalledWith(44);
				expect(triggerNote).toBeCalledWith(45);
				expect(triggerNote).toBeCalledTimes(3);
			});

			it("invokes releaseNote with midiNote value when pointerUp", () => {
				const releaseNote = jest.fn();
				const component = shallow(
					<ButtonComponent
						midiNotes={[43, 44, 45]}
						releaseNote={releaseNote}
					/>
				);

				component.simulate("pointerUp");

				expect(releaseNote).toBeCalledWith(43);
				expect(releaseNote).toBeCalledWith(44);
				expect(releaseNote).toBeCalledWith(45);
				expect(releaseNote).toBeCalledTimes(3);
			});

			it("invokes releaseNote with midiNote value when pointerLeave", () => {
				const releaseNote = jest.fn();
				const component = shallow(
					<ButtonComponent
						midiNotes={[43, 44, 45]}
						releaseNote={releaseNote}
					/>
				);

				component.simulate("pointerLeave");

				expect(releaseNote).toBeCalledWith(43);
				expect(releaseNote).toBeCalledWith(44);
				expect(releaseNote).toBeCalledWith(45);
				expect(releaseNote).toBeCalledTimes(3);
			});
		});
	});
});
