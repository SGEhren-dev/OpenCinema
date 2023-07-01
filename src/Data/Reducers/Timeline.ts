import { ActionReducerMapBuilder, PayloadAction, createReducer } from "@reduxjs/toolkit";
import { ITimelineChannel, ITimelineState, TimelineChannelType } from "Interfaces";
import { TimelineMode } from "Data/Objects/Editor";
import { v4 as uuidv4 } from "uuid";
import {
	createTimelineChannel, deleteTimelineChannel, toggleTimelineCollapsed, setTimelineMode, setTimelineZoomLevel,
	setPlayheadTime
} from "Data/Actions/Timeline";
import { TimeUnits } from "@/Shared/Objects/Time";
import { clamp } from "../Utils/Math";

const defaultState: ITimelineState = {
	currentTime: 0,
	channels: {
		[ "AUDIO_CHANNEL_1" ]: {
			uuid: "AUDIO_CHANNEL_1",
			type: TimelineChannelType.AUDIO,
			muted: false,
			name: "Audio 1"
		},
		[ "VIDEO_CHANNEL_1" ]: {
			uuid: "VIDEO_CHANNEL_1",
			type: TimelineChannelType.VIDEO,
			muted: false,
			name: "Video 1"
		}
	},
	timelineCollapsed: false,
	timelineMode: TimelineMode.CROPPING,
	timelineZoomLevel: 0.125,
	media: {
		[ "VIDEO_CHANNEL_1" ]: [
			{
				uuid: uuidv4(),
				startTime: 5 * TimeUnits.SECONDS,
				endTime: 12 * TimeUnits.SECONDS,
				filePath: "",
				name: "Riding Bicycle"
			},
			{
				uuid: uuidv4(),
				startTime: 0 * TimeUnits.SECONDS,
				endTime: 5 * TimeUnits.SECONDS,
				filePath: "",
				name: "Busy Intersection"
			}
		],
		[ "AUDIO_CHANNEL_1" ]: [
			{
				uuid: uuidv4(),
				startTime: 10 * TimeUnits.SECONDS,
				endTime: 25 * TimeUnits.SECONDS,
				filePath: "",
				name: "Swoosh"
			},
			{
				uuid: uuidv4(),
				startTime: 2 * TimeUnits.SECONDS,
				endTime: 8 * TimeUnits.SECONDS,
				filePath: "",
				name: "Crash"
			}
		]
	},
	effects: {}
};

const handleCreateTimelineChannel = (state: ITimelineState, action: PayloadAction<ITimelineChannel>) => {
	const { payload } = action;

	if (!payload || Object.keys(state.channels).includes(payload.uuid)) {
		return;
	}

	state.channels = {
		...state.channels,
		[ payload.uuid ]: payload
	};
};

const handleDeleteTimelineChannel = (state: ITimelineState, action: PayloadAction<string>) => {
	if (!action.payload) {
		return;
	}

	delete state.channels[ action.payload ];
};

const handleToggleTimelineCollapsed = (state: ITimelineState) => {
	state.timelineCollapsed = !state.timelineCollapsed;
};

const handleSetTimelineMode = (state: ITimelineState, action: PayloadAction<TimelineMode>) => {
	if (!action.payload) {
		return;
	}

	state.timelineMode = action.payload;
};

const handleSetTimelineZoomLevel = (state: ITimelineState, action: PayloadAction<number>) => {
	const clampedValue = clamp(0.025000000000000022, 0.5249999999999999, action.payload);

	state.timelineZoomLevel = clampedValue;
};

const handleSetPlayheadTime = (state: ITimelineState, action: PayloadAction<number>) => {
	state.currentTime = action.payload;
};

const reducerBuilder = (builder: ActionReducerMapBuilder<ITimelineState>) => {
	builder.addCase(createTimelineChannel, handleCreateTimelineChannel);
	builder.addCase(deleteTimelineChannel, handleDeleteTimelineChannel);
	builder.addCase(toggleTimelineCollapsed, handleToggleTimelineCollapsed);
	builder.addCase(setTimelineMode, handleSetTimelineMode);
	builder.addCase(setTimelineZoomLevel, handleSetTimelineZoomLevel);
	builder.addCase(setPlayheadTime, handleSetPlayheadTime);
};

export default createReducer(defaultState, reducerBuilder);
