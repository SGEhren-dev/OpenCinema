import { GiphyFetch } from "@giphy/js-fetch-api";

export class GiphyApi {
	giphyApi: GiphyFetch;
	limiter: number;

	constructor(key: string, limiter?: number) {
		this.giphyApi = new GiphyFetch(key);
		this.limiter = limiter ?? 25;
	}

	setLimiter = (limiter: number) => {
		this.limiter = limiter;

		return this;
	};

	search = (searchTerm: string, offset: number) => {
		console.log(searchTerm);

		if (!searchTerm) {
			return this.getTrending(offset);
		}

		return this.giphyApi.search(searchTerm, { offset, limit: this.limiter });
	};

	getTrending = (offset: number) => {
		return this.giphyApi.trending({ offset, limit: this.limiter });
	};
}
