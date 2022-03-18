import { ApiObject } from "./ApiObject";
import { Card } from "./Card";
import QueryString from "qs";
import { HttpAction } from "./HttpAction";

export class Onetimetoken extends ApiObject {
	card: Card;
	constructor(number: number, exp_month: number, exp_year: number, cvv: any) {
		super();
		this.card = new Card(number, exp_month, exp_year, cvv);
	}

	public createOnetimetoken(callback: any) {
		//set the post data
		let post_data: any = {
			public_key: this.getAppKey(),
			"card[number]": this.card.number,
			"card[exp_month]": this.card.exp_month,
			"card[exp_year]": this.card.exp_year,
			"card[cvv]": this.card.cvv,
		};
		post_data = QueryString.stringify(post_data);
		var post_options = this.createRequest("onetimetoken");
		HttpAction.runAction(post_options, post_data, true, function (data: any) {
			callback(data);
		});
	}
}
