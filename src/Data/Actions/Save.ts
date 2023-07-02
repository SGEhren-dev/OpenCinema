import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IFile, ISaveState } from "Interfaces";
import { requestLoadFileMetaData } from "Data/IPC/IpcEvents";

export const setProjectTitle = createAction<string>("SET_PROJECT_TITLE");

export const setVideoLength = createAction<number>("SET_VIDEO_LENGTH");

export const setVideoFps = createAction<number>("SET_VIDEO_FPS");

export const setSaveLocation = createAction<string>("SET_SAVE_LOCATION");

export const addProjectMedia = createAction<IFile | IFile[]>("ADD_PROJECT_MEDIA");

export const deleteProjectMedia = createAction<string>("DELETE_PROJECT_MEDIA");

export const createNewProject = createAsyncThunk(
	"CREATE_PROJECT",
	async (payload: ISaveState) => {
		return Promise.all(payload.projectMedia.map((file: IFile) => {
			return requestLoadFileMetaData(file) as Promise<IFile>;
		})).then((files: IFile[]) => {
			return {
				...payload,
				mediaLocations: files
			};
		});
	}
);

export const loadExistingProject = createAsyncThunk(
	"LOAD_PROJECT",
	async (payload: string) => {
		return payload;
	}
);

export const closeProject = createAction<void>("CLOSE_PROJECT");
