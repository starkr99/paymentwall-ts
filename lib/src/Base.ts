import { Config } from "./Config";

export class Base {
	public errors: string[] = [];

	public getApiType(): number {
		return Config.apiType;
	}
	public getAppKey(): string {
		return Config.appKey;
	}
	public getSecretKey(): string {
		return Config.secretKey;
	}
	public objectMerge(a: any, b: any): any {
		for (var x in b) a[x] = b[x];
		return a;
	}

	public appendToErrors(err: string): any {
		return this.errors.push(err);
	}

	public getErrors(): string[] {
		return this.errors;
	}

	public getErrorSummary(): string {
		return this.getErrors().join("\n");
	}
}
