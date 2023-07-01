import React from "react";
import { ConfigProvider, theme } from "antd";
import ProjectCreator from "Components/ProjectCreator";
import { useSelector } from "react-redux";
import { getCurrentSave } from "@/Data/Selectors/Save";
import Editor from "Components/Editor";

export default function App() {
	const currentSave = useSelector(getCurrentSave);
	let content = <ProjectCreator />;

	if (currentSave.projectTitle) {
		content = <Editor />;
	}

	console.log(currentSave);

	return (
		<ConfigProvider
			theme={ {
				algorithm: theme.darkAlgorithm
			} }
		>
			<div className="app-window">
				{ content }
			</div>
		</ConfigProvider>
	);
}
