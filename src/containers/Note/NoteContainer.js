import { connect } from "react-redux";
import { isNoteOn } from "store/selectors/note";
import { triggerNote, releaseNote } from "store/actionCreators/note";

function mapStateToProps(state, ownProps) {
	const { midiNote, midiNotes } = ownProps;

	if (!!midiNotes) {
		// chord type
		return {
			isOn: midiNotes.every(midiNote => isNoteOn(state, midiNote)),
		};
	} else {
		// single note type
		return {
			isOn: isNoteOn(state, midiNote),
		};
	}
}

function mapDispatchToProps(dispatch) {
	return {
		triggerNote: midiNote => dispatch(triggerNote(midiNote)),
		releaseNote: midiNote => dispatch(releaseNote(midiNote)),
	};
}

export default Component =>
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Component);
