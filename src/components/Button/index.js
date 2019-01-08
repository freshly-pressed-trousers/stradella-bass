import ButtonComponent from "./ButtonComponent";
import NotesContainer from "containers/Notes";

const ConnectedButtonComponent = NotesContainer(ButtonComponent);

export default ConnectedButtonComponent;
