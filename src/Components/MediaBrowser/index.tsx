import React, { Fragment, Key, ReactNode, useState } from "react";
import { Menu, MenuProps, Input, Button } from "antd";
import Icon from "Components/Global/Icon";
import { MediaBrowserPage } from "Data/Objects/MediaBrowser";
import { GiphyApi } from "Data/Objects/Giphy";
import { Grid } from "@giphy/react-components";
import { useDispatch, useSelector } from "react-redux";
import { getMediaBrowserPage } from "Data/Selectors/MediaBrowser";
import { setMediaBrowserPage } from "Data/Actions/MediaBrowser";
import { IFile, IState } from "Interfaces";
import { getFilteredProjectMedia } from "Data/Selectors/Save";
import { ProjectMediaFilter } from "Data/Objects/Save";
import noVideo from "/video-placeholder.jpg";
import "Components/MediaBrowser/MediaBrowser.less";

const Giphy = new GiphyApi("EE2izuw58rmKygv003kjGVPnRAwo7ndk");
const { Search } = Input;
type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: ReactNode, key: Key, icon?: ReactNode, children?: MenuItem[], type?: "group") {
	return {
		key,
		icon,
		children,
		label,
		type
	} as MenuItem;
}

const items: MenuProps["items"] = [
	getItem("My Media", "myMedia", <Icon name="camera" />, [
		getItem("Videos", "myVideos", <Icon name="film" />),
		getItem("Images", "myImages", <Icon name="image" />),
		getItem("Audio", "myAudio", <Icon name="music" />)
	]),
	getItem("Giphy", "giphy", <Icon name="file-video" />),
	getItem("Stock Images", "stock", <Icon name="image" />)
];

function RenderMyMediaPage() {
	const page = useSelector(getMediaBrowserPage);

	const getFilter = () => {
		switch (page) {
			case MediaBrowserPage.MY_AUDIO:
				return ProjectMediaFilter.AUDIO;
			case MediaBrowserPage.MY_IMAGES:
				return ProjectMediaFilter.IMAGES;
			case MediaBrowserPage.MY_VIDEOS:
				return ProjectMediaFilter.VIDEOS;
		}
	};

	const pageMedia = useSelector((state: IState) => {
		return getFilteredProjectMedia(state, getFilter());
	});

	const hasMedia = !pageMedia || pageMedia.length === 0;
	const noMediaClass = hasMedia ? "no-media" : undefined;
	const compositeClass = [ "media-content", noMediaClass ].join(" ");

	const renderMedia = (file: IFile) => {
		const uri = page === MediaBrowserPage.MY_IMAGES ? file.filePath : noVideo;

		return (
			<div key={ file.name } className="media-card">
				<img className="thumbnail" src={ uri } />
				{ file.name.split(".")?.[0] }
			</div>
		);
	};

	let content  = (
		<Fragment>
			{ pageMedia?.map(renderMedia) }
		</Fragment>
	);

	if (!pageMedia || pageMedia.length === 0) {
		content = <span>Sorry, you dont appear to have media loaded.</span>;
	}

	return (
		<div className={ compositeClass }>
			{ content }
		</div>
	);
}

interface IGiphyPageProps {
	term: string;
}

function RenderGiphyMediaPage(props: IGiphyPageProps) {
	const fetchGifs = (offset: number) => Giphy.search(props.term, offset);

	return (
		<Grid
			width={ 700 }
			columns={ 3 }
			gutter={ 6 }
			fetchGifs={ fetchGifs }
		/>
	);
}

function RenderStockPhotoMediaPage() {
	return <p>Stock Photo Page</p>;
}

export default function MediaBrowser() {
	const dispatch = useDispatch();
	const [ searchTerm, setSearchTerm ] = useState<string>("");
	const currentBrowserPage = useSelector(getMediaBrowserPage);
	const setCurrentBrowserPage = (page: MediaBrowserPage) => dispatch(setMediaBrowserPage(page));

	const onClick: MenuProps["onClick"] = (e) => {
		switch (e.key) {
			case "myMedia":
				setCurrentBrowserPage(MediaBrowserPage.MY_MEDIA);
				break;
			case "myVideos":
				setCurrentBrowserPage(MediaBrowserPage.MY_VIDEOS);
				break;
			case "myImages":
				setCurrentBrowserPage(MediaBrowserPage.MY_IMAGES);
				break;
			case "myAudio":
				setCurrentBrowserPage(MediaBrowserPage.MY_AUDIO);
				break;
			case "giphy":
				setCurrentBrowserPage(MediaBrowserPage.GIHPY);
				break;
			case "stock":
				setCurrentBrowserPage(MediaBrowserPage.STOCK_PHOTOS);
				break;
		}
	};

	const renderSelectedPage = () => {
		switch (currentBrowserPage) {
			case MediaBrowserPage.MY_MEDIA:
				return <RenderMyMediaPage />;
			case MediaBrowserPage.MY_IMAGES:
				return <RenderMyMediaPage />;
			case MediaBrowserPage.MY_AUDIO:
				return <RenderMyMediaPage />;
			case MediaBrowserPage.MY_VIDEOS:
				return <RenderMyMediaPage />;
			case MediaBrowserPage.GIHPY:
				return <RenderGiphyMediaPage term={ searchTerm } />;
			case MediaBrowserPage.STOCK_PHOTOS:
				return <RenderStockPhotoMediaPage />;
		}
	};

	const renderImportButton = () => {
		if (currentBrowserPage === MediaBrowserPage.GIHPY || currentBrowserPage === MediaBrowserPage.STOCK_PHOTOS) {
			return;
		}

		return <Button type="default">Import Media</Button>;
	};

	return (
		<div className="media-page">
			<Menu
				style={ { width: 200, height: "100%" } }
				mode="inline"
				items={ items }
				onClick={ onClick }
			/>
			<div className="align-right">
				<div className="actions">
					<Search
						placeholder="Search Content"
						allowClear
						onSearch={ setSearchTerm }
					/>
					{ renderImportButton() }
				</div>
				{ renderSelectedPage() }
			</div>
		</div>
	);
}
