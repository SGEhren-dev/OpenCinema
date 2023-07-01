import { createSelector } from "@reduxjs/toolkit";
import { IState, ITimelineState } from "Interfaces";
import { selectorWithArg } from "Data/Utils/Redux";

const getTimelineState = (state: IState) => {
	return state.Timeline;
};

const getChannels = (state: ITimelineState) => {
	return state.channels;
};

const getChannelByUuid = (state: ITimelineState, uuid: string) => {
	return state.channels[ uuid ];
};

const getCurrentMode = (state: ITimelineState) => {
	return state.timelineMode;
};

const getCollapsed = (state: ITimelineState) => {
	return state.timelineCollapsed;
};

const getZoom = (state: ITimelineState) => {
	return state.timelineZoomLevel;
};

const currentTime = (state: ITimelineState) => {
	return state.currentTime;
};

const channelMedia = (state: ITimelineState, uuid: string) => {
	return state.media[ uuid ];
};

const channelEffects = (state: ITimelineState, uuid: string) => {
	return state.effects[ uuid ];
};

export const getTimelineChannels = createSelector(
	getTimelineState,
	getChannels
);

export const getTimelineChannelByUuid = createSelector(
	[ getTimelineState, selectorWithArg<string>() ],
	getChannelByUuid
);

export const getTimelineMode = createSelector(
	getTimelineState,
	getCurrentMode
);

export const getTimelineCollapsed = createSelector(
	getTimelineState,
	getCollapsed
);

export const getTimelineZoomLevel = createSelector(
	getTimelineState,
	getZoom
);

export const getPlayheadTime = createSelector(
	getTimelineState,
	currentTime
);

export const getChannelMediaByUuid = createSelector(
	[ getTimelineState, selectorWithArg<string>() ],
	channelMedia
);

export const getChannelEffectsByUuid = createSelector(
	[ getTimelineState, selectorWithArg<string>() ],
	channelEffects
);
