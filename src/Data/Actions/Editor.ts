import { createAction } from "@reduxjs/toolkit";
import { EditorView, TimelineMode } from "Data/Objects/Editor";

export const setEditorView = createAction<EditorView>("SET_EDITOR_VIEW");

export const setEditorPaused = createAction<boolean>("SET_EDITOR_PAUSED");

export const setTimelineMode = createAction<TimelineMode>("SET_TIMELINE_MODE");

export const toggleEditorPaused = createAction<void>("TOGGLE_EDITOR_PAUSED");

export const togglePreviewMaximized = createAction<void>("TOGGLE_PREVIEW_MAXIMIZED");

export const setPreviewZoomLevel = createAction<number>("SET_PREVIEW_ZOOM_LEVEL");
