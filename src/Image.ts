export interface ImageData {
	id: number;
	tags?: string;
	tag_string?: string;
	created_at?: string | number;
	source: string;
	score: string;
	file_url?: string;
	file_size: number;
	preview_file_url?: string;
	preview_url?: string;
	large_file_url?: string;
	sample_url?: string;
	rating: string;
	height?: number;
	image_height?: number;
	width?: number;
	image_width?: number;
	directory: string;
	image: string;
	success?: string;
	message?: string;
}

export class Image {
	public id: number;
	public tags: string[];
	public createdAt?: Date | undefined;
	public source?: string;
	public score: number;
	public fileURL: string;
	public fileSize?: number;
	public previewURL?: string | undefined;
	public sampleURL?: string | undefined;
	public rating: string;
	public width: number;
	public height: number;

	public constructor(protected data: ImageData, private readonly site: string) {
		this.site = site;

		this.id = data.id;
		this.tags =
			(data.tags
				? data.tags.split(' ')
				: data.tag_string?.split(' ')?.map((tag: string) => tag.replace(/,/g, '').replace(/ /g, ''))
			)?.filter((tag: string) => tag) ?? [];
		this.createdAt = data.created_at
			? typeof data.created_at === 'number'
				? new Date(data.created_at * 1000)
				: new Date(data.created_at)
			: undefined;
		this.source = data.source;
		this.score = parseInt(data.score, 10);

		this.fileURL = data.file_url
			? /https?:\/\/lolibooru.moe/.exec(data.file_url)
				? data.file_url.replace(/(.*).*(\/lolibooru).*(\..*)/, '$1$3')
				: data.file_url
			: `https://${this.site}/images/${data.directory}/${data.image}`;
		this.fileSize = data.file_size;

		this.previewURL = data.preview_file_url ?? data.preview_url;
		this.sampleURL =
			data.large_file_url ??
			(data.sample_url
				? /https?:\/\/lolibooru.moe/.exec(data.sample_url)
					? data.sample_url.replace(/(.*).*(\/lolibooru).*(\..*)/, '$1$3')
					: data.sample_url
				: data.sample_url);

		this.rating = data.rating;

		this.height = data.height ?? data.image_height ?? 0;
		this.width = data.width ?? data.image_width ?? 0;
	}
}
