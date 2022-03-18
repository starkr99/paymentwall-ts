import { ApiObject } from "./ApiObject";
import QueryString from "qs";
import { PostOption } from "./PostOption";
import { HttpAction } from "./HttpAction";

export class Charge extends ApiObject {
	publickey: any;
	amount: any;
	currency: any;
	description: any;
	email: any;
	fingerprint: any;
	token: any;
	extra: any;

	constructor(amount: any, currency: any, description: any, email: any, fingerprint: any, token: any, extra: any) {
		super();
		this.amount = amount;
		this.currency = currency;
		this.description = description;
		this.email = email;
		this.fingerprint = fingerprint;
		this.token = token;
		this.extra = extra;
	}

	public createCharge(callback: any) {
		//set the post data
		let post_data: any = {
			public_key: this.publickey,
			amount: this.amount,
			currency: this.currency,
			description: this.description,
			email: this.email,
			fingerprint: this.fingerprint,
			token: this.token,
		};

		post_data = this.objectMerge(post_data, this.extra);
		post_data = QueryString.stringify(post_data);

		const post_options: PostOption = this.createRequest("charge");
		HttpAction.runAction(post_options, post_data, true, function (response: any) {
			callback(response);
		});
	}

	public otherOperation(chargeid: string, type: string, callback: any) {
		var post_data = "";
		var additional_path;
		switch (type) {
			case "detail":
				additional_path = "/" + chargeid;
				break;
			case "refund":
				additional_path = "/" + chargeid + "/refund";
				break;
			case "capture":
				additional_path = "/" + chargeid + "/capture";
				break;
			case "void":
				additional_path = "/" + chargeid + "/void";
				break;
			default:
				console.log("Parameter error in charge.otherOperation");
				break;
		}

		var post_options = this.createRequest("charge", additional_path);
		HttpAction.runAction(post_options, post_data, true, function (data: any) {
			callback(data);
		});
	}
}
