import { describe, it, expect, beforeEach } from "vitest";
import { defaultState, handleSetMediaBrowserPage } from "Data/Reducers/MediaBrowser";
import { IMediaBrowserState } from "@/Data/Interfaces";
import { cloneDeep } from "lodash";
import { PayloadAction } from "@reduxjs/toolkit";
import { MediaBrowserPage } from "@/Data/Objects/MediaBrowser";

let testState: IMediaBrowserState;
const undefinedPayload: PayloadAction<undefined> = {
	payload: undefined,
	type: ""
};

beforeEach(() => {
	testState = cloneDeep(defaultState);
});

describe("handleSetMediaBrowserPage", () => {
	it("Doesn't modify state if the value is undefined", () => {
		handleSetMediaBrowserPage(testState, undefinedPayload);

		expect(testState.browserPage).toBeDefined();
	});

	it("Properly sets the state to the value provided", () => {
		handleSetMediaBrowserPage(testState, { payload: MediaBrowserPage.GIHPY, type: "" });

		expect(testState.browserPage).toBe(MediaBrowserPage.GIHPY);
	});
});
