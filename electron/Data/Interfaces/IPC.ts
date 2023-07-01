import { IpcMainEvent } from "electron";

export interface IIPCHandler {
	message: string;
	handler: (event: IpcMainEvent, arg_0: unknown) => void;
}

export interface IIPCResponse<T> {
	data: T;
}
