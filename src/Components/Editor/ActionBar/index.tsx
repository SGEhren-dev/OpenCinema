import React from "react";
import { EditorView } from "Data/Objects/Editor";
import EditorButton from "Components/Editor/EditorButton";
import { useDispatch, useSelector } from "react-redux";
import { setEditorView } from "Data/Actions/Editor";
import "Components/Editor/ActionBar/ActionBar.less";
import { getEditorView } from "@/Data/Selectors/Editor";
import { Button } from "antd";

export default function ActionBar() {
	const dispatch = useDispatch();
	const currentEditorView = useSelector(getEditorView);

	const handleButtonClick = (view: EditorView) => () => {
		console.log(view);
		dispatch(setEditorView(view));
	};

	const getEditorButtonContent = (view: EditorView) => {
		switch (view) {
			case EditorView.MEDIA:
				return { icon: "film", text: "Media" };
			case EditorView.AUDIO:
				return { icon: "headphones", text: "Audio" };
			case EditorView.EFFECTS:
				return { icon: "star", text: "Effects" };
			case EditorView.TITLES:
				return { icon: "font", text: "Titles" };
			case EditorView.TRANSITIONS:
				return { icon: "sliders", text: "Transitions" };
		}
	};

	return (
		<div className="action-bar">
			{ Object.values(EditorView).map((view: EditorView) => {
				return (
					<EditorButton
						key={ view }
						onClick={ handleButtonClick(view) }
						selected={ currentEditorView === view }
						{ ...getEditorButtonContent(view) }
					/>
				);
			}) }
			<div className="right-content">
				<Button type="primary">Export</Button>
			</div>
		</div>
	);
}
