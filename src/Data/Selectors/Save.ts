import { createSelector } from "@reduxjs/toolkit";
import { IState, ISaveState, IFile } from "Interfaces";
import { ProjectMediaFilter, audioCodecs, imageCodecs, videoCodecs } from "Data/Objects/Save";

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
	return state.projectMedia;
};

const filterProjectMedia = (media: IFile[], filter: ProjectMediaFilter) => {
	switch (filter) {
		case ProjectMediaFilter.IMAGES:
			return media.filter(({ codec }) => imageCodecs.includes(codec));
		case ProjectMediaFilter.VIDEOS:
			return media.filter(({ codec }) => videoCodecs.includes(codec));
		case ProjectMediaFilter.AUDIO:
			return media.filter(({ codec }) => audioCodecs.includes(codec));
	}
};

export const getProjectTitle = createSelector(getSaveState, projectTitle);

export const getComposedVideoLength = createSelector(getSaveState, videoLength);

export const getProjectFps = createSelector(getSaveState, projectFps);

export const getProjectMedia = createSelector(getSaveState, mediaLocations);

export const getCurrentSave = createSelector(getSaveState, (state) => state);

export const getFilteredProjectMedia = createSelector(
	getProjectMedia,
	(state, mediaFilter: ProjectMediaFilter) => (mediaFilter),
	filterProjectMedia
);
