import React from "react";
import Icon from "Components/Global/Icon";
import "Components/Editor/EditorButton/EditorButton.less";

interface IEditorButtonProps {
	text: string;
	icon: string;
	selected?: boolean;
	onClick?: () => void;
}

export default function EditorButton(props: IEditorButtonProps) {
	const { text, icon, selected, onClick } = props;
	const selectedClass = selected ? "editor-button-selected" : "";
	const compositeClass = [ "editor-button", selectedClass ].join(" ");

	return (
		<div className={ compositeClass } onClick={ onClick }>
			<div className="inner-content">
				<Icon name={ icon } />
				{ text }
			</div>
		</div>
	);
}
