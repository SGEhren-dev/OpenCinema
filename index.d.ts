/* eslint-disable @typescript-eslint/naming-convention */
declare module "*.wgsl" {
	let content: any;
	export default content;
}

interface GPUCanvasContext {
	/**
	 * Nominal type branding.
	 * https://github.com/microsoft/TypeScript/pull/33038
	 * @internal
	 */
	readonly __brand: "GPUCanvasContext";
	/**
	 * The canvas this context was created from.
	 */
	readonly canvas:
		| HTMLCanvasElement
		| OffscreenCanvas;
	/**
	 * Configures the context for this canvas.
	 * This clears the drawing buffer to transparent black (in [$Replace the drawing buffer$]).
	 * @param configuration - Desired configuration for the context.
	 */
	configure(
		configuration: GPUCanvasConfiguration
	): undefined;
	/**
	 * Removes the context configuration. Destroys any textures produced while configured.
	 */
	unconfigure(): undefined;
	/**
	 * Get the {@link GPUTexture} that will be composited to the document by the {@link GPUCanvasContext}
	 * next.
	 * Note: The same {@link GPUTexture} object will be returned by every
	 * call to {@link GPUCanvasContext#getCurrentTexture} until "[$Expire the current texture$]"
	 * runs, even if that {@link GPUTexture} is destroyed, failed validation, or failed to allocate.
	 */
	getCurrentTexture(): GPUTexture;
}

interface GPUAdapter {
	/**
	 * Nominal type branding.
	 * https://github.com/microsoft/TypeScript/pull/33038
	 * @internal
	 */
	readonly __brand: "GPUAdapter";
	/**
	 * The set of values in `this`.{@link GPUAdapter#[[adapter]]}.{@link adapter#[[features]]}.
	 */
	readonly features: GPUSupportedFeatures;
	/**
	 * The limits in `this`.{@link GPUAdapter#[[adapter]]}.{@link adapter#[[limits]]}.
	 */
	readonly limits: GPUSupportedLimits;
	/**
	 * Returns the value of {@link GPUAdapter#[[adapter]]}.{@link adapter#[[fallback]]}.
	 */
	readonly isFallbackAdapter: boolean;
	/**
	 * Requests a device from the adapter.
	 * This is a one-time action: if a device is returned successfully,
	 * the adapter becomes invalid.
	 * @param descriptor - Description of the {@link GPUDevice} to request.
	 */
	requestDevice(
		descriptor?: GPUDeviceDescriptor
	): Promise<GPUDevice>;
	/**
	 * Requests the {@link GPUAdapterInfo} for this {@link GPUAdapter}.
	 * Note: Adapter info values are returned with a Promise to give user agents an
	 * opportunity to perform potentially long-running checks when requesting unmasked values,
	 * such as asking for user consent before returning. If no `unmaskHints` are specified,
	 * however, no dialogs should be displayed to the user.
	 * @param unmaskHints - A list of {@link GPUAdapterInfo} attribute names for which unmasked
	 * 	values are desired if available.
	 */
	requestAdapterInfo(
		unmaskHints?: Array<string>
	): Promise<GPUAdapterInfo>;
}

interface GPUAdapterInfo {
	/**
	 * Nominal type branding.
	 * https://github.com/microsoft/TypeScript/pull/33038
	 * @internal
	 */
	readonly __brand: "GPUAdapterInfo";
	/**
	 * The name of the vendor of the adapter, if available. Empty string otherwise.
	 */
	readonly vendor: string;
	/**
	 * The name of the family or class of GPUs the adapter belongs to, if available. Empty
	 * string otherwise.
	 */
	readonly architecture: string;
	/**
	 * A vendor-specific identifier for the adapter, if available. Empty string otherwise.
	 * Note: This is a value that represents the type of adapter. For example, it may be a
	 * [PCI device ID](https://pcisig.com/). It does not uniquely identify a given piece of
	 * hardware like a serial number.
	 */
	readonly device: string;
	/**
	 * A human readable string describing the adapter as reported by the driver, if available.
	 * Empty string otherwise.
	 * Note: Because no formatting is applied to {@link GPUAdapterInfo#description} attempting to parse
	 * this value is not recommended. Applications which change their behavior based on the
	 * {@link GPUAdapterInfo}, such as applying workarounds for known driver issues, should rely on the
	 * other fields when possible.
	 */
	readonly description: string;
}

interface GPUDevice extends EventTarget, GPUObjectBase {
	/**
	 * Nominal type branding.
	 * https://github.com/microsoft/TypeScript/pull/33038
	 * @internal
	 */
	readonly __brand: "GPUDevice";
	/**
	 * A set containing the {@link GPUFeatureName} values of the features
	 * supported by the device (i.e. the ones with which it was created).
	 */
	readonly features: GPUSupportedFeatures;
	/**
	 * Exposes the limits supported by the device
	 * (which are exactly the ones with which it was created).
	 */
	readonly limits: GPUSupportedLimits;
	/**
	 * The primary {@link GPUQueue} for this device.
	 */
	readonly queue: GPUQueue;
	/**
	 * Destroys the device, preventing further operations on it.
	 * Outstanding asynchronous operations will fail.
	 * Note: It is valid to destroy a device multiple times.
	 */
	destroy(): undefined;
	/**
	 * Creates a {@link GPUBuffer}.
	 * @param descriptor - Description of the {@link GPUBuffer} to create.
	 */
	createBuffer(
		descriptor: GPUBufferDescriptor
	): GPUBuffer;
	/**
	 * Creates a {@link GPUTexture}.
	 * @param descriptor - Description of the {@link GPUTexture} to create.
	 */
	createTexture(
		descriptor: GPUTextureDescriptor
	): GPUTexture;
	/**
	 * Creates a {@link GPUSampler}.
	 * @param descriptor - Description of the {@link GPUSampler} to create.
	 */
	createSampler(
		descriptor?: GPUSamplerDescriptor
	): GPUSampler;
	/**
	 * Creates a {@link GPUExternalTexture} wrapping the provided image source.
	 * @param descriptor - Provides the external image source object (and any creation options).
	 */
	importExternalTexture(
    descriptor: GPUExternalTextureDescriptor
	): GPUExternalTexture;
	/**
   * Creates a {@link GPUBindGroupLayout}.
   * @param descriptor - Description of the {@link GPUBindGroupLayout} to create.
   */
	createBindGroupLayout(
		descriptor: GPUBindGroupLayoutDescriptor
	): GPUBindGroupLayout;
	/**
   * Creates a {@link GPUPipelineLayout}.
   * @param descriptor - Description of the {@link GPUPipelineLayout} to create.
   */
	createPipelineLayout(
		descriptor: GPUPipelineLayoutDescriptor
	): GPUPipelineLayout;
	/**
   * Creates a {@link GPUBindGroup}.
   * @param descriptor - Description of the {@link GPUBindGroup} to create.
   */
	createBindGroup(
		descriptor: GPUBindGroupDescriptor
	): GPUBindGroup;
	/**
   * Creates a {@link GPUShaderModule}.
   * @param descriptor - Description of the {@link GPUShaderModule} to create.
   */
	createShaderModule(
		descriptor: GPUShaderModuleDescriptor
	): GPUShaderModule;
	/**
   * Creates a {@link GPUComputePipeline} using immediate pipeline creation.
   * @param descriptor - Description of the {@link GPUComputePipeline} to create.
   */
	createComputePipeline(
		descriptor: GPUComputePipelineDescriptor
	): GPUComputePipeline;
	/**
   * Creates a {@link GPURenderPipeline} using immediate pipeline creation.
   * @param descriptor - Description of the {@link GPURenderPipeline} to create.
   */
	createRenderPipeline(
		descriptor: GPURenderPipelineDescriptor
	): GPURenderPipeline;
	/**
   * Creates a {@link GPUComputePipeline} using async pipeline creation.
   * The returned {@link Promise} resolves when the created pipeline
   * is ready to be used without additional delay.
   * If pipeline creation fails, the returned {@link Promise} rejects with an {@link GPUPipelineError}.
   * Note: Use of this method is preferred whenever possible, as it prevents blocking the
   * queue timeline work on pipeline compilation.
   * @param descriptor - Description of the {@link GPUComputePipeline} to create.
   */
	createComputePipelineAsync(
		descriptor: GPUComputePipelineDescriptor
	): Promise<GPUComputePipeline>;
	/**
   * Creates a {@link GPURenderPipeline} using async pipeline creation.
   * The returned {@link Promise} resolves when the created pipeline
   * is ready to be used without additional delay.
   * If pipeline creation fails, the returned {@link Promise} rejects with an {@link GPUPipelineError}.
   * Note: Use of this method is preferred whenever possible, as it prevents blocking the
   * queue timeline work on pipeline compilation.
   * @param descriptor - Description of the {@link GPURenderPipeline} to create.
   */
	createRenderPipelineAsync(
		descriptor: GPURenderPipelineDescriptor
	): Promise<GPURenderPipeline>;
	/**
   * Creates a {@link GPUCommandEncoder}.
   * @param descriptor - Description of the {@link GPUCommandEncoder} to create.
   */
	createCommandEncoder(
		descriptor?: GPUCommandEncoderDescriptor
	): GPUCommandEncoder;
	/**
   * Creates a {@link GPURenderBundleEncoder}.
   * @param descriptor - Description of the {@link GPURenderBundleEncoder} to create.
   */
	createRenderBundleEncoder(
		descriptor: GPURenderBundleEncoderDescriptor
	): GPURenderBundleEncoder;
	/**
   * Creates a {@link GPUQuerySet}.
   * @param descriptor - Description of the {@link GPUQuerySet} to create.
   */
	createQuerySet(
		descriptor: GPUQuerySetDescriptor
	): GPUQuerySet;
	/**
   * A slot-backed attribute holding a promise which is created with the device, remains
   * pending for the lifetime of the device, then resolves when the device is lost.
   * Upon initialization, it is set to a new promise.
   */
	readonly lost: Promise<GPUDeviceLostInfo>;
	/**
   * Pushes a new GPU error scope onto the {@link GPUDevice#[[errorScopeStack]]} for `this`.
   * @param filter - Which class of errors this error scope observes.
   */
	pushErrorScope(
    filter: GPUErrorFilter
	): undefined;
	/**
   * Pops a GPU error scope off the {@link GPUDevice#[[errorScopeStack]]} for `this`
   * and resolves to **any** {@link GPUError} observed by the error scope, or `null` if none.
   * There is no guarantee of the ordering of promise resolution.
   */
	popErrorScope(): Promise<GPUError | null>;
	/**
    * An event handler IDL attribute for the {@link GPUDevice#uncapturederror} event type.
    */
	onuncapturederror:
    | ((
        this: GPUDevice,
        ev: GPUUncapturedErrorEvent
	) => any)
    | null;
}

interface GPUShaderModule
	extends GPUObjectBase {
	/**
   * Nominal type branding.
   * https://github.com/microsoft/TypeScript/pull/33038
   * @internal
   */
	readonly __brand: "GPUShaderModule";
	/**
   * Returns any messages generated during the {@link GPUShaderModule}'s compilation.
   * The locations, order, and contents of messages are implementation-defined.
   * In particular, messages may not be ordered by {@link GPUCompilationMessage#lineNum}.
   */
	getCompilationInfo(): Promise<GPUCompilationInfo>;
}

interface GPURenderPipeline extends GPUObjectBase, GPUPipelineBase {
	/**
	 * Nominal type branding.
	 * https://github.com/microsoft/TypeScript/pull/33038
	 * @internal
	 */
	readonly __brand: "GPURenderPipeline";
}

interface GPUBufferUsage {
	/**
	 * Nominal type branding.
	 * https://github.com/microsoft/TypeScript/pull/33038
	 * @internal
	 */
	readonly __brand: "GPUBufferUsage";
	readonly MAP_READ: GPUFlagsConstant;
	readonly MAP_WRITE: GPUFlagsConstant;
	readonly COPY_SRC: GPUFlagsConstant;
	readonly COPY_DST: GPUFlagsConstant;
	readonly INDEX: GPUFlagsConstant;
	readonly VERTEX: GPUFlagsConstant;
	readonly UNIFORM: GPUFlagsConstant;
	readonly STORAGE: GPUFlagsConstant;
	readonly INDIRECT: GPUFlagsConstant;
	readonly QUERY_RESOLVE: GPUFlagsConstant;
}

declare const GPUBufferUsage: {
	prototype: GPUBufferUsage;
	readonly MAP_READ: GPUFlagsConstant;
	readonly MAP_WRITE: GPUFlagsConstant;
	readonly COPY_SRC: GPUFlagsConstant;
	readonly COPY_DST: GPUFlagsConstant;
	readonly INDEX: GPUFlagsConstant;
	readonly VERTEX: GPUFlagsConstant;
	readonly UNIFORM: GPUFlagsConstant;
	readonly STORAGE: GPUFlagsConstant;
	readonly INDIRECT: GPUFlagsConstant;
	readonly QUERY_RESOLVE: GPUFlagsConstant;
};
