import React from "react";
import ActionBar from "Components/Editor/ActionBar";
import MediaPreview from "Components/MediaPreview";
import { useSelector } from "react-redux";
import { getEditorView } from "@/Data/Selectors/Editor";
import { EditorView } from "@/Data/Objects/Editor";
import MediaBrowser from "Components/MediaBrowser";
import Timeline from "Components/Timeline";
import "Components/Editor/Editor.less";

export default function Editor() {
	const currentEditorView = useSelector(getEditorView);

	const getCurrentView = () => {
		switch (currentEditorView) {
			case EditorView.MEDIA:
				return <MediaBrowser />;
			case EditorView.AUDIO:
				return <div>Audio View</div>;
			case EditorView.EFFECTS:
				return <div>Effects View</div>;
			case EditorView.TITLES:
				return <div>Titles View</div>;
			case EditorView.TRANSITIONS:
				return <div>Transitions View</div>;
		}
	};

	return (
		<div className="editor-view">
			<div className="media-container">
				<div className="media-browser">
					<ActionBar />
					<div className="content">
						{ getCurrentView() }
					</div>
				</div>
				<div className="preview-container">
					<MediaPreview />
				</div>
			</div>
			<div className="timeline-container">
				<Timeline />
			</div>
		</div>
	);
}
