import { createReducer, PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { IEditorState } from "Interfaces";
import { EditorView } from "Data/Objects/Editor";
import {
	setEditorView, setEditorPaused, toggleEditorPaused, togglePreviewMaximized, setPreviewZoomLevel
} from "Data/Actions/Editor";

// This is the default values of the current reducer slice
const defaultState: IEditorState = {
	paused: false,
	view: EditorView.MEDIA,
	previewMaximized: false,
	previewZoomLevel: 100
};

/**
 * @param state The current reducer slice
 * @param action The new editor view being set
 */
export const handleSetEditorView = (state: IEditorState, action: PayloadAction<EditorView>) => {
	if (!action.payload) {
		return;
	}

	state.view = action.payload;
};

/**
 * @param state The current reducer slice
 * @param action Boolean value determining whether the video is playing or paused
 */
export const handleSetEditorPaused = (state: IEditorState, action: PayloadAction<boolean>) => {
	state.paused = action.payload;
};

/**
 * @description Properly toggles the pause state of the current slice
 * @param state The current reducer slice
 */
export const handleToggleEditorPaused = (state: IEditorState) => {
	state.paused = !state.paused;
};

/**
 * @description Properly toggles the preview between maximized and not-maximized
 * @param state The current reducer slice
 */
export const handleTogglePreviewMaximized = (state: IEditorState) => {
	state.previewMaximized = !state.previewMaximized;
};

/**
 * @description Properly sets the previews zoom level to the value provided
 * @param state The current reducer slice
 * @param action The zoom level between 0 and 200, must be divisible by 10
 */
export const handleSetPreviewZoomLevel = (state: IEditorState, action: PayloadAction<number>) => {
	if (action.payload === undefined) {
		return;
	}

	const zoomLevel = action.payload;

	if ((zoomLevel === 0 || zoomLevel > 200) || zoomLevel % 10 !== 0) {
		return;
	}

	state.previewZoomLevel = zoomLevel;
};

// This will prepare the reducer for the current state slice
const reducerBuilder = (builder: ActionReducerMapBuilder<IEditorState>) => {
	builder.addCase(setEditorView.type, handleSetEditorView);
	builder.addCase(setEditorPaused.type, handleSetEditorPaused);
	builder.addCase(toggleEditorPaused.type, handleToggleEditorPaused);
	builder.addCase(togglePreviewMaximized.type, handleTogglePreviewMaximized);
	builder.addCase(setPreviewZoomLevel.type, handleSetPreviewZoomLevel);
};

// Create the current slice's reducer and export it
export default createReducer(defaultState, reducerBuilder);
