import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import soundEngineMiddleware from "./middleware/soundEngineMiddleware";

const logger = createLogger({});

const store = createStore(
	rootReducer,
	applyMiddleware(soundEngineMiddleware, logger)
);

export default store;
