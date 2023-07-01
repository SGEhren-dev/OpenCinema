import { vertexShader } from "Data/Rendering/Shaders/VertexShader";
import React from "react";

interface IRendererProps {
	canvasRef: React.RefObject<HTMLCanvasElement>;
}

export class Renderer {
	private canvasRef: React.RefObject<HTMLCanvasElement>;
	private gpuAdapter: GPUAdapter;
	private gpuDevice: GPUDevice;
	private shaderModule: GPUShaderModule;
	private canvasContext: GPUCanvasContext;
	private renderPipeline: GPURenderPipeline;
	private vertexDrawBuffer: Float32Array;
	private vertexBuffer;
	private commandEncoder;
	private passEncoder;

	constructor(props: IRendererProps) {
		// Since this is entirely experimental, the gpu object does not exist natively on the navigator object type yet
		if (!navigator["gpu"]) {
			throw Error("WebGPU is not supported.");
		}

		this.canvasRef = props.canvasRef;
	}

	initializeWebGPU = async () => {
		// Make use of async / await to get the GPU adapter and the GPU device
		this.gpuAdapter = await navigator["gpu"].requestAdapter();
		this.gpuDevice = await this.gpuAdapter.requestDevice();
		// Absolutely horrendous typing for this but it seems to currently be the only option
		this.canvasContext = this.canvasRef.current.getContext("webgpu") as unknown as GPUCanvasContext;

		// Make sure these are both initialized before we continue
		if (!this.gpuAdapter || !this.gpuDevice) {
			throw Error("There was an error setting up the adapter and device.");
		}

		// We need to get the aspect ratios so we can set the canvas element to the right height and width
		// for less pixely images
		const devicePixelRatio = window.devicePixelRatio || 1;

		this.canvasRef.current.width = this.canvasRef.current.clientWidth * devicePixelRatio;
		this.canvasRef.current.height = this.canvasRef.current.clientHeight * devicePixelRatio;

		return this;
	};

	compileAndBuildShaderModule = () => {
		// Create the shader module by compiling the basic vertex shader code
		this.shaderModule = this.gpuDevice.createShaderModule({ code: vertexShader });

		// Define our vertex buffers to be used
		const vertexBuffers = [
			{
				attributes: [
					{
						shaderLocation: 0,
						offset: 0,
						format: "float32x4"		// This is the format with each number being 4 bytes with a stride of 32
					},
					{
						shaderLocation: 1,
						offset: 16,				// Need an offset of 16 since we are doing X Y Z W ( 4 x 4 = 16 )
						format: "float32x4"
					}
				],
				arrayStride: 32,				// Stride needs to be 32 since we are using float32
				stepMode: "vertex"
			}
		];

		// Create our rendering pipeline
		this.renderPipeline = this.gpuDevice.createRenderPipeline({
			layout: "auto",
			vertex: {
				module: this.shaderModule,
				entryPoint: "vertex_main",
				buffers: vertexBuffers
			},
			fragment: {
				module: this.shaderModule,
				entryPoint: "fragment_main",
				targets: [
					{
						// This will either return bgra8unorm or rgba8unorm
						format: navigator["gpu"].getPreferredCanvasFormat()
					}
				]
			},
			primitive: {
				topology: "triangle-list"
			}
		});

		this.canvasContext.configure({
			device: this.gpuDevice,
			format: navigator["gpu"].getPreferredCanvasFormat(),
			alphaMode: "premultiplied"
		});

		return this;
	};

	createTestVertexBuffer = () => {
		// Trying to keep these inline to match 'X Y Z W R G B A'
		this.vertexDrawBuffer = new Float32Array([
			0.5, -0.5, 0, 1, 1, 0, 0, 1,
			-0.5, -0.5, 0, 1, 1, 0, 0, 1,
			-0.5, 0.5, 0, 1, 1, 0, 0, 1,

			0.5, -0.5, 0, 1, 1, 0, 0, 1,
			0.5, 0.5, 0, 1, 1, 0, 0, 1,
			-0.5, 0.5, 0, 1, 1, 0, 0, 1,

			0.5, -0.5, 0, 1, 0, 1, 0, 1,
			0.5, 0.5, 0, 1, 0, 1, 0, 1,
			0.7, 0.4, 0, 1, 0, 1, 0, 1,

			0.7, 0.4, 0, 1, 0, 1, 0, 1,
			0.7, 0.6, 0, 1, 0, 1, 0, 1,
			0.5, 0.5, 0, 1, 0, 1, 0, 1,

			0.5, 0.5, 0, 1, 0, 0, 1, 1,
			0.5, 0.6, 0, 1, 0, 0, 1, 1,
			0.7, 0.6, 0, 1, 0, 0, 1, 1,

			0.5, 0.5, 0, 1, 0, 0, 1, 1,
			0.5, 0.6, 0, 1, 0, 0, 1, 1,
			-0.5, 0.5, 0, 1, 0, 0, 1, 1,
		]);

		this.vertexBuffer = this.gpuDevice.createBuffer({
			size: this.vertexDrawBuffer.byteLength,
			usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
		});

		this.gpuDevice.queue.writeBuffer(this.vertexBuffer, 0, this.vertexDrawBuffer, 0, this.vertexDrawBuffer.length);

		return this;
	};

	createCommandAndPassEncoder = () => {
		const blueBackground = { r: 0.0, g: 0.5, b: 1.0, a: 1.0 };
		const renderPassDescriptor = {
			colorAttachments: [
				{
					clearValue: blueBackground,
					loadOp: "clear",
					storeOp: "store",
					view: this.canvasContext.getCurrentTexture().createView()
				}
			]
		};

		this.commandEncoder = this.gpuDevice.createCommandEncoder();
		this.passEncoder = this.commandEncoder.beginRenderPass(renderPassDescriptor);

		return this;
	};

	render = () => {
		this.passEncoder.setPipeline(this.renderPipeline);
		this.passEncoder.setVertexBuffer(0, this.vertexBuffer);
		this.passEncoder.draw(this.vertexDrawBuffer.length / 8);
		this.passEncoder.end();

		this.gpuDevice.queue.submit([ this.commandEncoder.finish() ]);
	};
}
