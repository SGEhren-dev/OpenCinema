import { createAction } from "@reduxjs/toolkit";
import { MediaBrowserPage } from "Data/Objects/MediaBrowser";

export const setMediaBrowserPage = createAction<MediaBrowserPage>("SET_MEDIA_BROWSER_PAGE");
