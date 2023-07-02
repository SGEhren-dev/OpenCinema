import { createSelector } from "@reduxjs/toolkit";
import { IMediaBrowserState, IState } from "../Interfaces";

const getMediaBrowserState = (state: IState) => {
	return state.MediaBrowser;
};

const getPage = (state: IMediaBrowserState) => {
	return state.browserPage;
};

export const getMediaBrowserPage = createSelector(getMediaBrowserState, getPage);
