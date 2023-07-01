import { createAction } from "@reduxjs/toolkit";
import { ITimelineChannel } from "Interfaces";
import { TimelineMode } from "Data/Objects/Editor";

export const createTimelineChannel = createAction<ITimelineChannel>("CREATE_TIMELINE_CHANNEL");

export const deleteTimelineChannel = createAction<string>("DELETE_TIMELINE_CHANNEL");

export const toggleTimelineCollapsed = createAction<void>("TOGGLE_TIMELINE_COLLAPSED");

export const setTimelineMode = createAction<TimelineMode>("SET_TIMELINE_MODE");

export const setTimelineZoomLevel = createAction<number>("SET_TIMELINE_ZOOM");

export const setPlayheadTime = createAction<number>("SET_PLAYHEAD_TIME");
