import { createSelector } from "@reduxjs/toolkit";
import { IState, IEditorState } from "Interfaces";

const getEditorState = (state: IState) => {
	return state.Editor;
};

const editorView = (state: IEditorState) => {
	return state.view;
};

const editorPaused = (state: IEditorState) => {
	return state.paused;
};

const timelineMode = (state: IEditorState) => {
	return state.timelineMode;
};

const previewZoomLevel = (state: IEditorState) => {
	return state.previewZoomLevel;
};

const previewMaximized = (state: IEditorState) => {
	return state.previewMaximized;
};

export const getEditorView = createSelector(
	getEditorState,
	editorView
);

export const getEditorPaused = createSelector(
	getEditorState,
	editorPaused
);

export const getTimelineMode = createSelector(
	getEditorState,
	timelineMode
);

export const getPreviewZoomLevel = createSelector(
	getEditorState,
	previewZoomLevel
);

export const getPreviewMaximized = createSelector(
	getEditorState,
	previewMaximized
);
