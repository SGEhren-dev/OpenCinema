import { createReducer, PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { MediaBrowserPage } from "Data/Objects/MediaBrowser";
import { IMediaBrowserState } from "Interfaces";
import { setMediaBrowserPage } from "Data/Actions/MediaBrowser";

export const defaultState: IMediaBrowserState = {
	browserPage: MediaBrowserPage.MY_MEDIA
};

export const handleSetMediaBrowserPage = (state: IMediaBrowserState, action: PayloadAction<MediaBrowserPage>) => {
	if (!action.payload) {
		return;
	}

	state.browserPage = action.payload;
};

export default createReducer(defaultState, (builder: ActionReducerMapBuilder<IMediaBrowserState>) => {
	builder.addCase(setMediaBrowserPage, handleSetMediaBrowserPage);
});
