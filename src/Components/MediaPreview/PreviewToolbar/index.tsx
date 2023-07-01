import React, { RefObject } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditorPaused, setPreviewZoomLevel, toggleEditorPaused } from "Data/Actions/Editor";
import { getEditorPaused, getPreviewZoomLevel } from "Data/Selectors/Editor";
import Icon from "Components/Global/Icon";
import { Dropdown, MenuProps, Slider } from "antd";
import { durationFromMilliseconds } from "@/Shared/Utils/Time";
import { setPlayheadTime } from "Data/Actions/Timeline";
import { getPlayheadTime } from "Data/Selectors/Timeline";
import "Components/MediaPreview/PreviewToolbar/PreviewToolbar.less";
import { getComposedVideoLength } from "Data/Selectors/Save";

interface IToolbarButton {
	name: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onClick?: (e: any) => void;
}

const zoomItems: MenuProps["items"] = [
	{
		key: 50,
		label: "50%"
	},
	{
		key: 100,
		label: "100%"
	},
	{
		key: 125,
		label: "125%"
	},
	{
		key: 150,
		label: "150%"
	},
	{
		key: 175,
		label: "175%"
	},
	{
		key: 200,
		label: "200%"
	}
];

interface IPreviewToolbarProps {
	videoPlayerRef: RefObject<HTMLCanvasElement>;
}

function RenderZoomSelector() {
	const dispatch = useDispatch();
	const currentZoomLevel = useSelector(getPreviewZoomLevel);
	const changePreviewZoom = (zoom: number) => dispatch(setPreviewZoomLevel(zoom));

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleItemSelect = (payload: any) => {
		changePreviewZoom(payload?.key);
	};

	return (
		<Dropdown.Button
			menu={ {
				items: zoomItems,
				selectable: true,
				defaultSelectedKeys: [ "100" ],
				onSelect: handleItemSelect
			} }
		>
			<a onClick={ (e) => e.preventDefault() }>
				{ currentZoomLevel }%
			</a>
		</Dropdown.Button>
	);
}

export default function PreviewToolbar(props: IPreviewToolbarProps) {
	const dispatch = useDispatch();
	const togglePaused = () => dispatch(toggleEditorPaused());
	const setPaused = () => dispatch(setEditorPaused(true));
	const updatePlayheadTime = (time: number) => dispatch(setPlayheadTime(time));
	const isEditorPaused = useSelector(getEditorPaused);
	const currentPlayheadTime = useSelector(getPlayheadTime);
	const videoLength = useSelector(getComposedVideoLength);
	const [ timeOutUuid, setTimeOutUuid ] = React.useState<number>(0);

	const handlePausePlayClick = () => {
		togglePaused();
	};

	const getFormattedTooltip = (time: number | undefined) => {
		return durationFromMilliseconds(time ?? 0);
	};

	const onValueChanged = (value: number) => {
		clearTimeout(timeOutUuid);

		setTimeOutUuid(window.setTimeout(() => {
			updatePlayheadTime(value);
		}, 25));
	};

	const handleStopClick = () => {
		updatePlayheadTime(0);
		setPaused();
	};

	const toolbarButtons: IToolbarButton[] = [
		{ name: "backward", onClick: undefined },
		{ name: "forward", onClick: undefined },
		{ name: isEditorPaused ? "play" : "pause", onClick: handlePausePlayClick },
		{ name: "stop", onClick: handleStopClick }
	];

	return (
		<div className="preview-toolbar">
			<div className="top-content">
				<Slider
					defaultValue={ currentPlayheadTime }
					min={ 0 }
					max={ videoLength }
					style={ { width: "100%" } }
					tooltip={ { formatter: getFormattedTooltip } }
					onChange={ onValueChanged }
				/>
			</div>
			<div className="bottom-content">
				{ toolbarButtons.map((payload: IToolbarButton) => {
					const { name, onClick } = payload;

					return (
						<div key={ name } className="toolbar-button" onClick={ onClick } >
							<Icon name={ name } />
						</div>
					);
				}) }
				<div className="right-align row">
					<RenderZoomSelector />
					<div className="toolbar-button">
						<Icon name="camera" />
					</div>
					<div className="toolbar-button">
						<Icon name="maximize" />
					</div>
				</div>
			</div>
		</div>
	);
}
