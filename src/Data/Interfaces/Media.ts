export interface IFile {
	name: string;
	filePath: string;
	size: number;
	codec: string;
	meta?: IMetaData;
}

export interface IMedia {
	uuid: string;
	name: string;
	startTime: number;
	endTime: number;
	filePath: string;
}

export interface IMetaData {
	duration?: number;
}
