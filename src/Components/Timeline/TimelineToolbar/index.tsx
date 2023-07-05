import React from "react";
import { Button, Dropdown, MenuProps, Slider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createTimelineChannel, setTimelineZoomLevel } from "Data/Actions/Timeline";
import { v4 as uuidv4 } from "uuid";
import { ITimelineChannel, TimelineChannelType } from "Interfaces";
import "Components/Timeline/TimelineToolbar/TimelineToolbar.less";
import { getTimelineZoomLevel } from "Data/Selectors/Timeline";

const channelItems: MenuProps["items"] = [
	{
		key: TimelineChannelType.AUDIO,
		label: "Audio Channel"
	},
	{
		key: TimelineChannelType.VIDEO,
		label: "Video Channel"
	}
];

interface IAddChannelProps {
	onChannelAdd: (channel: ITimelineChannel) => void;
}

function RenderAddChannelDropdown({ onChannelAdd }: IAddChannelProps) {
	const handleCreateNewChannel: MenuProps["onClick"] = (event) => {
		const uuid = uuidv4();
		const newChannel: ITimelineChannel = {
			uuid: uuid,
			name: "New Channel",
			type: event.key as TimelineChannelType,
			muted: false
		};

		onChannelAdd(newChannel);
	};

	return (
		<Dropdown menu={ { items: channelItems, onClick: handleCreateNewChannel } }>
			<Button>Add Channel</Button>
		</Dropdown>
	);
}

export default function TimelineToolbar() {
	const dispatch = useDispatch();
	const timelineZoomLevel = useSelector(getTimelineZoomLevel);
	const updateTimelineZoom = (zoom: number) => dispatch(setTimelineZoomLevel(zoom));
	const createNewChannel = (channel: ITimelineChannel) => dispatch(createTimelineChannel(channel));

	return (
		<div className="timeline-toolbar">
			<RenderAddChannelDropdown onChannelAdd={ createNewChannel } />
			<div className="right-align row">
				<Slider
					value={ timelineZoomLevel }
					min={ 0.025000000000000022 }
					step={ 0.0002 }
					max={ 0.5249999999999999 }
					onChange={ updateTimelineZoom }
					tooltip={ { open: false } }
					style={ { width: 150 } }
				/>
			</div>
		</div>
	);
}
