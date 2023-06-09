import { persistCombineReducers, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { initializeStore, store } from "Data/Redux/Store";
import EditorReducer from "Data/Reducers/Editor";
import TimelineReducer from "Data/Reducers/Timeline";
import SaveReducer from "Data/Reducers/Save";
import MediaBrowserReducer from "Data/Reducers/MediaBrowser";

const persistConfig = {
	key: "root",
	storage
};

const reducersMapObject = {
	Editor: EditorReducer,
	MediaBrowser: MediaBrowserReducer,
	Timeline: TimelineReducer,
	Save: SaveReducer
};

initializeStore(persistCombineReducers(persistConfig, reducersMapObject));

export default persistStore(store);
