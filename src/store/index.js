import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import soundEngineMiddleware from "./middleware/soundEngineMiddleware";

const logger = createLogger({
	// ...options
});

const store = createStore(
	rootReducer,
	applyMiddleware(logger, soundEngineMiddleware)
);

export default store;
