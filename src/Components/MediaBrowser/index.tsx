import React, { Key, ReactNode, useState } from "react";
import { Menu, MenuProps, Input, Button } from "antd";
import Icon from "Components/Global/Icon";
import { MediaBrowserPage } from "@/Data/Objects/MediaBrowser";
import { GiphyApi } from "@/Data/Objects/Giphy";
import { Grid } from "@giphy/react-components";
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
		getItem("Images", "myImages", <Icon name="image" />)
	]),
	getItem("Giphy", "giphy", <Icon name="file-video" />),
	getItem("Stock Images", "stock", <Icon name="image" />)
];

function RenderMyMediaPage() {
	return <p>My Media</p>;
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
	const [ searchTerm, setSearchTerm ] = useState<string>("");
	const [ currentBrowserPage, setCurrentBrowserPage ] = useState<MediaBrowserPage>(MediaBrowserPage.MY_MEDIA);

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
			case "giphy":
				setCurrentBrowserPage(MediaBrowserPage.GIHPY);
				break;
			case "stock":
				setCurrentBrowserPage(MediaBrowserPage.STOCK_PHOTOS);
				break;
		}
	};

	const renderSelectedPage = () => {
		console.log(searchTerm);

		switch (currentBrowserPage) {
			case MediaBrowserPage.MY_MEDIA:
				return <RenderMyMediaPage />;
			case MediaBrowserPage.MY_IMAGES:
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
