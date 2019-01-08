import React from "react";
import ButtonRowComponent from "../ButtonRowComponent";
import { shallow } from "enzyme";

describe("ButtonRow component", () => {
	it("renders label", () => {
		const component = shallow(<ButtonRowComponent label="Counter bass" />);

		expect(component.text()).toEqual("Counter bass");
	});

	it("renders children", () => {
		const component = shallow(
			<ButtonRowComponent label="Counter bass">
				<h2>I should be rendered</h2>
			</ButtonRowComponent>
		);

		expect(component.find("h2").exists()).toBe(true);
	});

	it("matches snapshot", () => {
		const component = shallow(<ButtonRowComponent label="Counter bass" />);

		expect(component).toMatchSnapshot();
	});
});
