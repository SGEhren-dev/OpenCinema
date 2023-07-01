import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "Components/App";
import "Styles/index.less";
import { store } from "Data/Redux/Store";
import persistor from "Data/Redux/Persist";
import { initializeIcons } from "@/FontAwesome";

initializeIcons();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Provider store={ store }>
		<PersistGate loading={ null } persistor={ persistor }>
			<App />
		</PersistGate>
	</Provider>
);
