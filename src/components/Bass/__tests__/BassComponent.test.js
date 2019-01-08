import React from "react";
import BassComponent from "../BassComponent";
import { shallow } from "enzyme";

describe("BassComponent component", () => {
	it("matches snapshot", () => {
		const component = shallow(<BassComponent />);

		expect(component).toMatchSnapshot();
	});
});
