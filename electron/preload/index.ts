import { IpcRendererEvent, OpenDialogReturnValue, SaveDialogReturnValue, contextBridge, ipcRenderer } from "electron";
import { IPC_ACTIONS } from "../IPC/IPCActions";
import { IIPCResponse } from "../Data/Interfaces/IPC";
import { IFile } from "Interfaces";

const { REQUEST_CLOSE_WINDOW } = IPC_ACTIONS.Window;
const { REQUEST_OPEN_FILE_DIALOG, REQUEST_SAVE_FILE_DIALOG, REQUEST_LOAD_META_DATA } = IPC_ACTIONS.File;

const registerIPCHandler = <Payload, Return>(requestType: string, responseType: string) => {
	return (payload: Payload) => {
		return new Promise<Return | void>((resolve) => {
			ipcRenderer.send(requestType, payload);

			ipcRenderer.once(responseType,
				(event: IpcRendererEvent, response: IIPCResponse<Return>) => {
					resolve(response?.data);
				});
		});
	};
};

const requestCloseWindow = registerIPCHandler<void, void>(
	REQUEST_CLOSE_WINDOW.INVOKE,
	REQUEST_CLOSE_WINDOW.RESPONSE
);

const requestOpenFileDialog = registerIPCHandler<void, OpenDialogReturnValue>(
	REQUEST_OPEN_FILE_DIALOG.INVOKE,
	REQUEST_OPEN_FILE_DIALOG.RESPONSE
);

const requestSaveFileDialog = registerIPCHandler<void, SaveDialogReturnValue>(
	REQUEST_SAVE_FILE_DIALOG.INVOKE,
	REQUEST_SAVE_FILE_DIALOG.RESPONSE
);

const requestLoadFileMetaData = registerIPCHandler<IFile, IFile>(
	REQUEST_LOAD_META_DATA.INVOKE,
	REQUEST_LOAD_META_DATA.RESPONSE
);

contextBridge.exposeInMainWorld("ipcAPI", {
	requestCloseWindow,
	requestOpenFileDialog,
	requestSaveFileDialog,
	requestLoadFileMetaData
});
