import { TimeUnits } from "@/Shared/Objects/Time";
import { ActionReducerMapBuilder, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { IFile, ISaveState } from "Interfaces";
import {
	addProjectMedia, closeProject, createNewProject, deleteProjectMedia, setProjectTitle, setVideoFps,
	setVideoLength
} from "Data/Actions/Save";
import { clamp } from "Data/Utils/Math";

const defaultState: ISaveState = {
	projectTitle: "",
	videoLength: 4 * TimeUnits.MINUTES,
	fps: 25,
	projectMedia: [ ],
	saveLocation: ""
};

/**
 * @param state Current save state
 * @param action New project title
 */
const handleSetProjectTitle = (state: ISaveState, action: PayloadAction<string>) => {
	if (!action.payload) {
		state.projectTitle = "Untitled";

		return;
	}

	state.projectTitle = action.payload;
};

/**
 * @param state Current save state
 * @param action Length of composed video in milliseconds
 */
const handleSetVideoLength = (state: ISaveState, action: PayloadAction<number>) => {
	state.videoLength = action.payload;
};

/**
 * @param state Current save state
 * @param action The value to set the fps to. This is clamped between 24 and 240
 */
const handleSetProjectFps = (state: ISaveState, action: PayloadAction<number>) => {
	const clampedFps = clamp(24, 240, action.payload);

	state.fps = clampedFps;
};

/**
 * @param state Current save state
 * @param action The location of user media
 */
const handleAddProjectMedia = (state: ISaveState, action: PayloadAction<IFile | IFile[]>) => {
	if (!action.payload) {
		return;
	}

	const media = Array.isArray(action.payload) ? action.payload : [ action.payload ];

	state.projectMedia = [ ...new Set(state.projectMedia), ...media ];
};

/**
 * @param state Current save state
 * @param action The location to of user media to be removed
 */
const handleDeleteProjectMedia = (state: ISaveState, action: PayloadAction<string>) => {
	if (!action.payload) {
		return;
	}

	state.projectMedia = state.projectMedia.filter((file: IFile) => file.name !== action.payload);
};

/**
 * @param state Current save state
 * @param action The new save location that will overwrite the current state
 */
const handleCreateNewProject = (state: ISaveState, action: PayloadAction<ISaveState>) => {
	if (!action.payload) {
		return state;
	}

	return action.payload;
};

const handleCloseProject = () => {
	return defaultState;
};

const reducerBuilder = (builder: ActionReducerMapBuilder<ISaveState>) => {
	builder.addCase(setProjectTitle, handleSetProjectTitle);
	builder.addCase(setVideoLength, handleSetVideoLength);
	builder.addCase(setVideoFps, handleSetProjectFps);
	builder.addCase(addProjectMedia, handleAddProjectMedia);
	builder.addCase(deleteProjectMedia, handleDeleteProjectMedia);
	builder.addCase(createNewProject.fulfilled, handleCreateNewProject);
	builder.addCase(closeProject, handleCloseProject);
};

export default createReducer(defaultState, reducerBuilder);
