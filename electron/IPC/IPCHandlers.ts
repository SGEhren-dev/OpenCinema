import { ipcMain } from "electron";
import { IIPCHandler } from "../Data/Interfaces/IPC";
import DialogHandlers from "./Handlers/Dialog";
import WindowHandlers from "./Handlers/Window";

const ipcHandlers: IIPCHandler[] = [ ...DialogHandlers, ...WindowHandlers ];

export const registerIPCHandlers = () => {
	ipcHandlers.forEach((handler: IIPCHandler) => {
		ipcMain.on(handler.message, handler.handler);
	});
};
