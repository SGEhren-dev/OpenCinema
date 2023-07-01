import { persistCombineReducers, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { initializeStore, store } from "Data/Redux/Store";
import EditorReducer from "Data/Reducers/Editor";
import TimelineReducer from "Data/Reducers/Timeline";
import SaveReducer from "Data/Reducers/Save";

const persistConfig = {
	key: "root",
	storage
};

const reducersMapObject = {
	Editor: EditorReducer,
	Timeline: TimelineReducer,
	Save: SaveReducer
};

initializeStore(persistCombineReducers(persistConfig, reducersMapObject));

export default persistStore(store);
