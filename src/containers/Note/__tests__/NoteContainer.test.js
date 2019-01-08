import React from "react";
import { Provider } from "react-redux";
import NoteContainer from "../NoteContainer";
import { mount } from "enzyme";

import { isNoteOn } from "store/selectors/note";
import { triggerNote, releaseNote } from "store/actionCreators/note";

jest.mock("store/selectors/note");
jest.mock("store/actionCreators/note");

describe("NoteContainer component", () => {
	function TestComponent() {
		return <div />;
	}

	function generateMockStore(state) {
		return {
			subscribe: jest.fn(),
			dispatch: jest.fn(),
			getState: () => state,
		};
	}

	beforeEach(() => isNoteOn.mockReset());
	describe("triggerNote", () => {
		it("generates a triggerNote function and populates the props of the component", () => {
			const ConfiguredComponent = NoteContainer(TestComponent);
			const mockStore = generateMockStore({});

			const component = mount(
				<Provider store={mockStore}>
					<ConfiguredComponent midiNote={42} />
				</Provider>
			);
			const props = component.find(TestComponent).props();

			expect(props.triggerNote).toBeDefined();
		});

		it("triggerNote calls dispatch of result of triggerNote action creator when invoked", () => {
			const ConfiguredComponent = NoteContainer(TestComponent);
			const mockStore = generateMockStore({});
			const stubbedActionCreatorResponse = {
				payload: "stuff",
				type: "blah",
			};
			triggerNote.mockReturnValue(stubbedActionCreatorResponse);

			const component = mount(
				<Provider store={mockStore}>
					<ConfiguredComponent midiNote={42} />
				</Provider>
			);
			const props = component.find(TestComponent).props();

			props.triggerNote(24);
			expect(triggerNote).toBeCalledWith(24);
			expect(mockStore.dispatch).toBeCalledWith(
				stubbedActionCreatorResponse
			);
		});
	});

	describe("releaseNote", () => {
		it("generates a releaseNote function and populates the props of the component", () => {
			const ConfiguredComponent = NoteContainer(TestComponent);
			const mockStore = generateMockStore({});

			const component = mount(
				<Provider store={mockStore}>
					<ConfiguredComponent midiNote={42} />
				</Provider>
			);
			const props = component.find(TestComponent).props();

			expect(props.releaseNote).toBeDefined();
		});
		it("releaseNote calls dispatch of result of releaseNote action creator when invoked", () => {
			const ConfiguredComponent = NoteContainer(TestComponent);
			const mockStore = generateMockStore({});
			const stubbedActionCreatorResponse = {
				payload: "stuff",
				type: "blah",
			};
			releaseNote.mockReturnValue(stubbedActionCreatorResponse);

			const component = mount(
				<Provider store={mockStore}>
					<ConfiguredComponent midiNote={42} />
				</Provider>
			);
			const props = component.find(TestComponent).props();

			props.releaseNote(24);
			expect(releaseNote).toBeCalledWith(24);
			expect(mockStore.dispatch).toBeCalledWith(
				stubbedActionCreatorResponse
			);
		});
	});

	describe("isOn", () => {
		describe("single notes", () => {
			it("populates props with result of isOn selector true case", () => {
				const ConfiguredComponent = NoteContainer(TestComponent);
				const mockState = { notes: 1234 };
				const mockStore = generateMockStore(mockState);
				isNoteOn.mockReturnValue(true);

				const component = mount(
					<Provider store={mockStore}>
						<ConfiguredComponent midiNote={42} />
					</Provider>
				);
				const props = component.find(TestComponent).props();

				expect(props.isOn).toBe(true);
				expect(isNoteOn).toBeCalledWith(mockState, 42);
			});

			it("populates props with result of isOn selector false case", () => {
				const ConfiguredComponent = NoteContainer(TestComponent);
				const mockState = { notes: 1234 };
				const mockStore = generateMockStore(mockState);
				isNoteOn.mockReturnValue(false);

				const component = mount(
					<Provider store={mockStore}>
						<ConfiguredComponent midiNote={42} />
					</Provider>
				);
				const props = component.find(TestComponent).props();

				expect(props.isOn).toBe(false);
				expect(isNoteOn).toBeCalledWith(mockState, 42);
			});
		});
		describe("chords", () => {
			it("populates props with aggregate result of isOn selector true case", () => {
				const ConfiguredComponent = NoteContainer(TestComponent);
				const mockState = { notes: 1234 };
				const mockStore = generateMockStore(mockState);
				isNoteOn.mockReturnValue(true);

				const component = mount(
					<Provider store={mockStore}>
						<ConfiguredComponent midiNotes={[42, 43, 44]} />
					</Provider>
				);
				const props = component.find(TestComponent).props();

				expect(props.isOn).toBe(true);
				expect(isNoteOn).toBeCalledWith(mockState, 42);
				expect(isNoteOn).toBeCalledWith(mockState, 43);
				expect(isNoteOn).toBeCalledWith(mockState, 44);
				expect(isNoteOn).toBeCalledTimes(3);
			});

			it("populates props with aggregate result of isOn selector false case no notes triggered", () => {
				const ConfiguredComponent = NoteContainer(TestComponent);
				const mockState = { notes: 1234 };
				const mockStore = generateMockStore(mockState);
				isNoteOn.mockReturnValue(false);

				const component = mount(
					<Provider store={mockStore}>
						<ConfiguredComponent midiNotes={[42, 43, 44]} />
					</Provider>
				);
				const props = component.find(TestComponent).props();

				expect(props.isOn).toBe(false);
			});

			it("populates props with aggregate result of isOn selector false case two of three notes triggered", () => {
				const ConfiguredComponent = NoteContainer(TestComponent);
				const mockState = { notes: 1234 };
				const mockStore = generateMockStore(mockState);
				isNoteOn
					.mockReturnValueOnce(true)
					.mockReturnValueOnce(true)
					.mockReturnValue(false);

				const component = mount(
					<Provider store={mockStore}>
						<ConfiguredComponent midiNotes={[42, 43, 44]} />
					</Provider>
				);
				const props = component.find(TestComponent).props();

				expect(props.isOn).toBe(false);
				expect(isNoteOn).toBeCalledWith(mockState, 42);
				expect(isNoteOn).toBeCalledWith(mockState, 43);
				expect(isNoteOn).toBeCalledWith(mockState, 44);
				expect(isNoteOn).toBeCalledTimes(3);
			});
		});
	});
});
