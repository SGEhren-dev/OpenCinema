export enum TimelineChannelType {
	AUDIO = "AUDIO",
	VIDEO = "VIDEO"
}

export enum VideoEffectType {
	BLUR = "BLUR",
	ENHANCE = "ENHANCE",
	DISTORTION = "DISTORTION"
}

export interface ITimelineChannel {
	uuid: string;
	name: string;
	type: TimelineChannelType;
	muted: boolean;
}

export interface IMarker {
	uuid: string;
	time: number;
}

export interface IBaseEffect {
	uuid: string;
	name: string;
	startTime: number;
	endTime: number;
}

export interface IVideoEffect extends IBaseEffect {
	type: VideoEffectType;
}
