import React, { Fragment, RefObject, createRef, useState } from "react";
import {
	getChannelMedia, getPlayheadTime, getTimelineChannels, getTimelineZoomLevel
} from "Data/Selectors/Timeline";
import { useDispatch, useSelector } from "react-redux";
import { IMedia, ITimelineChannel, TimelineChannelType } from "Interfaces";
import Icon from "Components/Global/Icon";
import { IVector2 } from "Data/Objects/World";
import TimelineToolbar from "Components/Timeline/TimelineToolbar";
import { getComposedVideoLength } from "Data/Selectors/Save";
import { TimeUnits } from "Shared/Objects/Time";
import { setTimelineZoomLevel } from "Data/Actions/Timeline";
import "Components/Timeline/Timeline.less";

interface IChannelMediaProps {
	channelMedia: IMedia[];
	type: TimelineChannelType;
}

function ChannelMedia({ channelMedia, type }: IChannelMediaProps) {
	const color = type === TimelineChannelType.AUDIO ? "#48BB78" : "#63B3ED";
	const timelineZoomLevel = useSelector(getTimelineZoomLevel);

	return (
		<Fragment>
			{ channelMedia?.map((media: IMedia, index: number) => {
				const { startTime, endTime, uuid, name } = media;

				return (
					<div
						key={ `media_${ index + 1 }_${ uuid }` }
						className="channel-media"
						style={ {
							left: startTime * timelineZoomLevel,
							width: `${ (endTime - startTime) * timelineZoomLevel }px`,
							backgroundColor: color
						} }
					>
						{ name }
					</div>
				);
			}) }
		</Fragment>
	);
}

function TimelineChannelInfo(channel: ITimelineChannel, index: number) {
	const { uuid, muted, type, name } = channel;
	const compositeClass = [ "channel-info", index % 2 === 0 ? "light" : "" ].join(" ");
	const iconName = muted ? "microphone-slash" : "microphone";

	return (
		<div
			key={ `info_${ uuid }` }
			className={ compositeClass }
		>
			{ name }
			<div className="bottom">
				{ type === TimelineChannelType.AUDIO && (
					<Icon name={ iconName } />
				) }
			</div>
		</div>
	);
}

function TimelineChannel(channel: ITimelineChannel, index: number, length: number, zoomLevel: number, media: IMedia[]) {
	const { uuid, type } = channel;
	const width = length * zoomLevel;
	const compositeClass = [ "channel-data", index % 2 === 0 ? "light" : "" ].join(" ");

	return (
		<div key={ uuid } className={ compositeClass } style={ { width: `${ width }px` } }>
			<ChannelMedia channelMedia={ media } type={ type } />
		</div>
	);
}

export default function Timeline() {
	const dispatch = useDispatch();
	const timelineRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();
	const timelineChannels = useSelector(getTimelineChannels);
	const currentPlayheadTime = useSelector(getPlayheadTime);
	const timelineZoomLevel = useSelector(getTimelineZoomLevel);
	const videoLength = useSelector(getComposedVideoLength);
	const channelMedia = useSelector(getChannelMedia);
	const [ startPosition, setStartPosition ] = useState<IVector2>({ x: 0, y: 0 });
	const [ scrollDist, setScrollDist ] = useState<number>(0);
	const [ mouseHeld, setMouseHeld ] = useState<boolean>(false);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleTimelineDragScroll = (event: any) => {
		event.preventDefault();

		if (!mouseHeld) {
			return;
		}

		const x = event.pageX - (timelineRef?.current?.offsetLeft ?? 0);
		const moveDist = (x - startPosition.x) * 2;

		if (timelineRef.current) {
			timelineRef.current.scrollLeft = scrollDist - moveDist;
		}
	};

	const mouseUpHandler = () => {
		setMouseHeld(false);

		if (timelineRef.current) {
			timelineRef.current.style.cursor = "grab";
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const mouseDownHandler = (event: any) => {
		setMouseHeld(true);

		setStartPosition({
			x: event.pageX - (timelineRef?.current?.offsetLeft ?? 0),
			y: 0
		});

		setScrollDist(timelineRef?.current?.scrollLeft ?? 0);

		if (timelineRef.current) {
			timelineRef.current.style.cursor = "grabbing";
		}
	};

	const handleMouseWheelZooming = (event) => {
		const value = timelineZoomLevel - (event.deltaY * 0.0002);

		dispatch(setTimelineZoomLevel(value));
	};

	return (
		<div className="timeline">
			<TimelineToolbar />
			<div
				className="timeline-scroll-container"
				ref={ timelineRef }
				onMouseDown={ mouseDownHandler }
				onMouseUp={ mouseUpHandler }
				onMouseMove={ handleTimelineDragScroll }
				onWheel={ handleMouseWheelZooming }
			>
				<div className="channel-info-sider">
					{ Object.values(timelineChannels).map(TimelineChannelInfo) }
				</div>
				<div className="channel-data-container" style={ { width: `${ 5 * TimeUnits.MINUTES }px` } }>
					<div
						className="timeline-playhead"
						style={ { left: `${ (currentPlayheadTime) * timelineZoomLevel }px` } }
					/>
					{
						Object.values(timelineChannels).map((channel, index) =>
							TimelineChannel(channel, index, videoLength, timelineZoomLevel, channelMedia[ channel.uuid ]))
					}
				</div>
			</div>
		</div>
	);
}
