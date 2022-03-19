import QueryString from "qs";
import { ApiObject } from "./ApiObject";
import { HttpAction } from "./HttpAction";

export class Subscription extends ApiObject {
	amount: any;
	currency: any;
	description: any;
	email: any;
	fingerprint: any;
	token: any;
	period: any;
	period_duration: any;
	trial_data: any;
	extra: any;
	constructor(
		amount: any,
		currency: string,
		description: any,
		email: any,
		fingerprint: any,
		token: any,
		period: any,
		period_duration: any,
		trial_data: any,
		extra: any
	) {
		super();
		this.amount = amount || null;
		this.currency = currency || "USD";
		this.description = description || null;
		this.email = email || null;
		this.fingerprint = fingerprint || null;
		this.token = token || null;
		this.period = period || null;
		this.period_duration = period_duration || null;
		this.trial_data = trial_data || null;
		this.extra = extra || null;
	}

	public createSubscription(callback: any) {
		//set the post data
		var post_data: any = {
			public_key: this.getAppKey(),
			amount: this.amount,
			currency: this.currency,
			description: this.description,
			email: this.email,
			fingerprint: this.fingerprint,
			token: this.token,
			period: this.period,
			period_duration: this.period_duration,
		};

		post_data = this.objectMerge(post_data, this.trial_data);
		post_data = this.objectMerge(post_data, this.extra);
		post_data = QueryString.stringify(post_data);

		var post_options = this.createRequest("subscription");
		HttpAction.runAction(post_options, post_data, true, function (data: any) {
			callback(data);
		});
	}

	public otherOperation(subscriptionid: any, type: any, callback: any) {
		var post_data = "";
		var additional_path;
		switch (type) {
			case "detail":
				additional_path = "/" + subscriptionid;
				break;
			case "cancel":
				additional_path = "/" + subscriptionid + "/cancel";
				break;
			default:
				console.log("Parameter error in subscription.otherOperation");
				break;
		}

		var post_options = this.createRequest("subscription", additional_path);
		HttpAction.runAction(post_options, post_data, true, function (data: any) {
			callback(data);
		});
	}
}
