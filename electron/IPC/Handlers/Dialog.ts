import { IRequestDialogPayload } from "../../Data/Interfaces/Dialog";
import { mainWindow } from "../../main";
import { IpcMainEvent, OpenDialogReturnValue, SaveDialogReturnValue, dialog } from "electron";
import { IPC_ACTIONS } from "../IPCActions";
import { IIPCHandler } from "../../Data/Interfaces/IPC";
import { IFile, IState } from "Interfaces";
import { getVideoDurationInSeconds } from "get-video-duration";
import { TimeUnits } from "../../../src/Shared/Objects/Time";

const {
	REQUEST_OPEN_FILE_DIALOG, REQUEST_SAVE_FILE_DIALOG, REQUEST_SAVE_PROJECT,
	REQUEST_LOAD_META_DATA
} = IPC_ACTIONS.File;

const requestOpenFileDialog = (event: IpcMainEvent, payload: IRequestDialogPayload) => {
	const { dialogType } = payload;
	const type = dialogType === "file" ? "openFile" : "openDirectory";

	dialog.showOpenDialog(mainWindow, { properties: [ type ] })
		.then((value: OpenDialogReturnValue) => {
			event.sender.send(REQUEST_OPEN_FILE_DIALOG.RESPONSE, value);
		})
		.catch((error: unknown) => {
			console.log(error);
			event.sender.send(REQUEST_OPEN_FILE_DIALOG.RESPONSE, undefined);
		});
};

const requestSaveFileDialog = (event: IpcMainEvent) => {
	dialog.showSaveDialog(mainWindow, { properties: [ "dontAddToRecent" ] })
		.then((value: SaveDialogReturnValue) => {
			event.sender.send(REQUEST_SAVE_FILE_DIALOG.RESPONSE, { data: value });
		})
		.catch(() => {
			event.sender.send(REQUEST_OPEN_FILE_DIALOG.RESPONSE, undefined);
		});
};

const requestSaveProject = (event: IpcMainEvent, payload: IState) => {
	event.sender.send(REQUEST_SAVE_PROJECT.RESPONSE, payload);
};

const requestLoadFileMetaData = (event: IpcMainEvent, payload: IFile) => {
	const { filePath, codec } = payload;

	if (codec.includes("mp4")) {
		getVideoDurationInSeconds(filePath).then((duration: number) => {
			const response: IFile = {
				...payload,
				meta: {
					duration: duration * TimeUnits.SECONDS
				}
			};

			event.sender.send(REQUEST_LOAD_META_DATA.RESPONSE, { data: response });
		});
	}
};

const ipcHandlers: IIPCHandler[] = [
	{
		message: REQUEST_OPEN_FILE_DIALOG.INVOKE,
		handler: requestOpenFileDialog
	},
	{
		message: REQUEST_SAVE_FILE_DIALOG.INVOKE,
		handler: requestSaveFileDialog
	},
	{
		message: REQUEST_SAVE_PROJECT.INVOKE,
		handler: requestSaveProject
	},
	{
		message: REQUEST_LOAD_META_DATA.INVOKE,
		handler: requestLoadFileMetaData
	}
];

export default ipcHandlers;
