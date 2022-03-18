import { Base } from "./Base";
import { Config } from "./Config";
import { PostOption } from "./PostOption";

export class ApiObject extends Base {
	public checkProjectEnv(): any {
		var reg = /_+/;
		return reg.test(this.getSecretKey());
	}

	public createPostOptions(url: string, path: string, method: string): PostOption {
		// set the request options
		return new PostOption(url, path, method, {
			"Content-Type": "application/x-www-form-urlencoded",
			"X-ApiKey": this.getSecretKey(),
		});
	}

	public createRequest(type: string, additional_path?: string): PostOption {
		let url: string;
		let path: string;
		let method: string;

		additional_path = additional_path || "";

		path = "";

		if (!this.checkProjectEnv() && type === "onetimetoken") {
			method = "Post";
			url = Config.BRICK_ONETIMETOKEN_TEST_BASE_URL;
			path = Config.BRICK_ONETIMETOKEN_TEST_PATH;
		} else {
			url = Config.BRICK_BASE_URL;
			method = "Post";
			if (type === "onetimetoken") {
				path = Config.BRICK_ONETIMETOKEN_PATH;
			} else if (type === "charge") {
				path = Config.BRICK_CHARGE_PATH + additional_path;
			} else if (type === "subscription") {
				path = Config.BRICK_SUBSCRIPTION_CHARGE_PATH + additional_path;
			}
		}

		var post_options = this.createPostOptions(url, path, method);
		return post_options;
	}
}
