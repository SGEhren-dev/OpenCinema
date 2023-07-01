import { beforeEach, describe, it, expect } from "vitest";
import { IEditorState } from "Interfaces";
import { EditorView } from "Data/Objects/Editor";
import { PayloadAction } from "@reduxjs/toolkit";
import {
	handleSetEditorPaused, handleSetEditorView, handleSetPreviewZoomLevel, handleToggleEditorPaused,
	handleTogglePreviewMaximized
} from "Data/Reducers/Editor";
import { cloneDeep } from "lodash";

const undefinedPayload: PayloadAction<undefined> = {
	payload: undefined,
	type: ""
};

let testEditorState: IEditorState;
const editorState: IEditorState = {
	paused: false,
	view: EditorView.MEDIA,
	previewMaximized: false,
	previewZoomLevel: 100
};

beforeEach(() => {
	testEditorState = cloneDeep(editorState);
});

describe("handleSetEditorView", () => {
	it("Doesn't modify state if the value is undefined", () => {
		handleSetEditorView(testEditorState, undefinedPayload);

		expect(testEditorState.view).toBeDefined();
	});

	it("Properly sets the editor view to the provided value", () => {
		handleSetEditorView(testEditorState, { payload: EditorView.TRANSITIONS, type: "" });

		expect(testEditorState.view).toBe(EditorView.TRANSITIONS);
	});
});

describe("handleSetEditorPaused", () => {
	it("Properly sets the editor state to the value provided", () => {
		handleSetEditorPaused(testEditorState, { payload: true, type: "" });

		expect(testEditorState.paused).toBeTruthy();
	});
});

describe("handleToggleEditorPaused", () => {
	it("Properly toggles the paused state of the editor", () => {
		handleToggleEditorPaused(testEditorState);

		expect(testEditorState.paused).toBeTruthy();
	});
});

describe("handleTogglePreviewMaximized", () => {
	it("Properly toggles the preview maximized", () => {
		handleTogglePreviewMaximized(testEditorState);

		expect(testEditorState.previewMaximized).toBeTruthy();
	});
});

describe("handleSetPreviewZoomLevel", () => {
	it("Doesn't modify state if there is no value passed", () => {
		handleSetPreviewZoomLevel(testEditorState, undefinedPayload);

		expect(testEditorState.previewZoomLevel).toBeDefined();
	});

	it("Doesn't modify state if the value is greater than 200", () => {
		handleSetPreviewZoomLevel(testEditorState, { payload: 210, type: "" });

		expect(testEditorState.previewZoomLevel).toBeLessThan(200);
	});

	it("Doesn't modify state if the value passed is not divisible by 10", () => {
		handleSetPreviewZoomLevel(testEditorState, { payload: 155, type: "" });

		expect(testEditorState.previewZoomLevel).toBe(100);
	});

	it("Properly sets state to the value provided if all criteria is met", () => {
		handleSetPreviewZoomLevel(testEditorState, { payload: 150, type: "" });

		expect(testEditorState.previewZoomLevel).toBe(150);
	});
});
