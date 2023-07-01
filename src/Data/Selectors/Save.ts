import { createSelector } from "@reduxjs/toolkit";
import { IState, ISaveState } from "Interfaces";

const getSaveState = (state: IState) => {
	return state.Save;
};

const videoLength = (state: ISaveState) => {
	return state.videoLength;
};

const projectTitle = (state: ISaveState) => {
	return state.projectTitle;
};

const projectFps = (state: ISaveState) => {
	return state.fps;
};

const mediaLocations = (state: ISaveState) => {
	return state.mediaLocations;
};

export const getProjectTitle = createSelector(getSaveState, projectTitle);

export const getComposedVideoLength = createSelector(getSaveState, videoLength);

export const getProjectFps = createSelector(getSaveState, projectFps);

export const getProjectMediaLocations = createSelector(getSaveState, mediaLocations);

export const getCurrentSave = createSelector(getSaveState, (state) => state);
