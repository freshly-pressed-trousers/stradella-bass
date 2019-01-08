// from https://facebook.github.io/create-react-app/docs/running-tests#src-setuptestsjs

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { createSerializer } from "enzyme-to-json";
import "jest-matcher-one-of";

configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
