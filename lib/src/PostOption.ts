export class PostOption {
	public port: number = 443;
	host: string;
	path: string;
	method: string;
	headers: any;

	constructor(host: string, path: string, method: string, headers: any) {
		this.host = host;
		this.path = path;
		this.method = method;
		this.headers = headers;
	}
}
