import { IIPCHandler } from "../../Data/Interfaces/IPC";
import { mainWindow } from "../../main";
import { IPC_ACTIONS } from "../IPCActions";

const { REQUEST_CLOSE_WINDOW } = IPC_ACTIONS.Window;

const requestCloseWindow = () => {
	mainWindow.close();
};

const ipcHandlers: IIPCHandler[] = [
	{
		message: REQUEST_CLOSE_WINDOW.INVOKE,
		handler: requestCloseWindow
	}
];

export default ipcHandlers;
