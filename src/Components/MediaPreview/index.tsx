import React, { createRef, useEffect } from "react";
import "Components/MediaPreview/MediaPreview.less";
import PreviewToolbar from "Components/MediaPreview/PreviewToolbar";
import { Renderer } from "@/Data/Rendering/Renderer";

function MediaPreviewHeader() {
	return (
		<div className="preview-header">
			Preview
		</div>
	);
}

export default function MediaPreview() {
	const videoPlayerRef = createRef<HTMLCanvasElement>();
	const videoEditorRenderer = new Renderer({ canvasRef: videoPlayerRef });

	useEffect(() => {
		if (videoPlayerRef.current) {
			videoEditorRenderer.initializeWebGPU().then((self: Renderer) => {
				self.compileAndBuildShaderModule()
					.createTestVertexBuffer()
					.createCommandAndPassEncoder()
					.render();
			});
		}
	}, [ videoPlayerRef.current ]);

	return (
		<div className="media-preview">
			<MediaPreviewHeader />
			<canvas
				id="video-player"
				ref={ videoPlayerRef }
				className="video-player"
			/>
			<PreviewToolbar videoPlayerRef={ videoPlayerRef } />
		</div>
	);
}
