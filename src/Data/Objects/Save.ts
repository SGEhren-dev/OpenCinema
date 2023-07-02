export enum ProjectMediaFilter {
	VIDEOS,
	IMAGES,
	AUDIO
}

export const videoCodecs: string[] = [
	"video/mp4",
	"video/avi",
	"video/mov",
	"video/webm"
];

export const audioCodecs: string[] = [
	"audio/mp3",
	"audio/wav",
	"audio/ogg"
];

export const imageCodecs: string[] = [
	"image/png",
	"image/jpg",
	"image/jpeg",
	"image/gif",
	"image/tiff"
];
