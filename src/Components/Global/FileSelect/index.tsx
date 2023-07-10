import { Button } from "antd";
import type { ButtonType } from "antd/es/button";
import React, { useRef } from "react";
import "Components/Global/FileSelect/FileSelect.less";

interface IFileSelectProps {
	onFilesSelected: (payload: File[]) => void;
	type: ButtonType;
}

export const FileSelect = (props: IFileSelectProps) => {
	const { onFilesSelected, type } = props;
	const fileSelectRef = useRef<HTMLInputElement>(null);

	const onFileSelect = (event) => {
		onFilesSelected(Array.from(event.target?.files));
	};

	const handleClick = () => {
		fileSelectRef.current?.click();
	};

	return (
		<div className="file-select">
			<input
				className="file-select-base"
				type="file"
				onChange={ onFileSelect }
				ref={ fileSelectRef }
				multiple
			/>
			<Button
				type={ type }
				onClick={ handleClick }
			>
				Import Media
			</Button>
		</div>
	);
};
