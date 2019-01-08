import ButtonComponent from "./ButtonComponent";
import NoteContainer from "containers/Note";

const ConnectedButtonComponent = NoteContainer(ButtonComponent);

export default ConnectedButtonComponent;
