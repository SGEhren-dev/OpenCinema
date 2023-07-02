import { EditorView, TimelineMode } from "Data/Objects/Editor";
import { IBaseEffect, IFile, IKeyValue, IMedia, ITimelineChannel } from "Interfaces";
import { MediaBrowserPage } from "Data/Objects/MediaBrowser";

export interface IState {
	Editor: IEditorState;
	MediaBrowser: IMediaBrowserState;
	Save: ISaveState;
	Timeline: ITimelineState;
}

export interface IEditorState {
	paused: boolean;
	view: EditorView;
	previewMaximized: boolean;
	previewZoomLevel: number;
}

export interface ITimelineState {
	currentTime: number;
	channels: IKeyValue<ITimelineChannel>;
	effects: IKeyValue<IBaseEffect[]>;
	media: IKeyValue<IMedia[]>;
	timelineCollapsed: boolean;
	timelineMode: TimelineMode;
	timelineZoomLevel: number;
}

export interface ISaveState {
	projectTitle: string;
	videoLength: number;
	fps: number;
	saveLocation: string;
	projectMedia: IFile[];
}

export interface IMediaBrowserState {
	browserPage: MediaBrowserPage;
}
