import { Button, Dropdown, Form, Input, MenuProps } from "antd";
import React, { FormEvent, useState, DragEvent, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import "Components/ProjectCreator/ProjectCreator.less";
import { IFile, ISaveState } from "Interfaces";
import { addProjectMedia, createNewProject } from "Data/Actions/Save";
import { AsyncDispatch } from "Data/Redux/Store";
import { getProjectMedia } from "@/Data/Selectors/Save";
import { FileSelect } from "../Global/FileSelect";

const fpsOptions: MenuProps["items"] = [
	{
		key: 24,
		label: "24"
	},
	{
		key: 30,
		label: "30"
	},
	{
		key: 60,
		label: "60"
	},
	{
		key: 120,
		label: "120"
	},
	{
		key: 240,
		label: 240
	}
];

function RenderFilePlaceholder(file: IFile) {
	return (
		<div key={ file.name } className="file-placeholder ellipsize">
			<p>{ file.name }</p>
			<span>{ file.filePath }</span>
		</div>
	);
}

export default function ProjectCreator() {
	const dispatch: AsyncDispatch = useDispatch();
	const createNewVideoProject = (project: ISaveState) => dispatch(createNewProject(project));
	const [ submitted, setSubmitted ] = useState<boolean>(false);
	const [ projectTitle, setProjectTitle ] = useState<string>("Untitled");
	const [ projectFps, setProjectFps ] = useState<number>(25);
	const projectMedia = useSelector(getProjectMedia);
	const setProjectMedia = (media: IFile | IFile[]) => dispatch(addProjectMedia(media));
	const hasMedia = projectMedia.length > 0;
	const compositeFileDragClass = [ "file-drag-area", !hasMedia ? "no-media" : "" ].join(" ");

	const handleProjectTitleChange = (event: FormEvent<HTMLInputElement>) => {
		setProjectTitle(event.currentTarget.value);
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleFpsSelect: MenuProps["onClick"] = (event: any) => {
		setProjectFps(event.key);
	};

	const handleFileDragOver = (event: DragEvent) => {
		event.stopPropagation();
		event.preventDefault();
		event.dataTransfer.dropEffect = "copy";
	};

	const handleFileDrop = (event: DragEvent) => {
		event.stopPropagation();
		event.preventDefault();

		const files = event.dataTransfer.files;

		setProjectMedia(Array.from(files).map((value: File) => ({
			name: value.name,
			filePath: value.path,
			size: value.size,
			codec: value.type
		}) as IFile));
	};

	const handleFileSelect = (files: File[]) => {
		setProjectMedia(files.map((file: File) => ({
			name: file.name,
			filePath: file.path,
			size: file.size,
			codec: file.type
		}) as IFile));
	};

	const handleCreateNewProject = () => {
		const newProject: ISaveState = {
			projectTitle,
			fps: projectFps,
			projectMedia,
			saveLocation: "",
			videoLength: 0
		};

		console.log(newProject);

		setSubmitted(true);
		createNewVideoProject(newProject).unwrap()
			.then(() => {
				setSubmitted(false);
				console.log("Created project");
			})
			.catch(() => {
				setSubmitted(false);
				console.log("Failed to create project");
			});
	};

	const renderFileDragContent = () => {
		let content = (
			<Fragment>
				Drag Your Media Here
				<span>- or -</span>
				<FileSelect
					type="primary"
					onFilesSelected={ handleFileSelect }
				/>
			</Fragment>
		);

		if (hasMedia) {
			content = (
				<Fragment>
					{ projectMedia.map(RenderFilePlaceholder) }
				</Fragment>
			);
		}

		return content;
	};

	const validateInput = (value: string) => {
		return submitted && value.length === 0 ? "error" : "";
	};

	return (
		<div className="project-creator">
			<div className="project-toolbar">
				Create Project
				<div className="right-align row">
					<Button>Open Project</Button>
				</div>
			</div>
			<div className="project-options-container">
				<Form.Item label="Project Title">
					<Input
						style={ { width: "300px" } }
						onInput={ handleProjectTitleChange }
						status={ validateInput(projectTitle) }
						value={ projectTitle }
					/>
				</Form.Item>
				<Form.Item label="Select FPS">
					<Dropdown
						menu={ {
							items: fpsOptions,
							onClick: handleFpsSelect
						} }
					>
						<Button>{ projectFps }</Button>
					</Dropdown>
				</Form.Item>
			</div>
			<div className={ compositeFileDragClass } onDrop={ handleFileDrop } onDragOver={ handleFileDragOver }>
				{ renderFileDragContent() }
			</div>
			<div className="action-bar">
				<Button onClick={ handleCreateNewProject }>Create Project</Button>
			</div>
		</div>
	);
}
