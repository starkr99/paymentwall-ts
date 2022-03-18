import { Err } from "./Err";
import { Success } from "./Success";

export class CallbackRes {
	JSON_chunk: any;
	String_chunk: any;
	constructor(JSON_chunk: any, String_chunk: any) {
		this.JSON_chunk = JSON_chunk;
		this.String_chunk = String_chunk;
	}

	public isSuccessful(): boolean {
		if (this.JSON_chunk.hasOwnProperty("type")) {
			if (this.JSON_chunk.type === "Error") {
				return false;
			} else {
				return true;
			}
		} else if (this.JSON_chunk.hasOwnProperty("secure")) {
			return true;
		} else {
			console.log(this.getFullResponse());
			return false;
		}
	}

	public isCaptured(): any {
		return Success.getParameter("capture", this.JSON_chunk);
	}

	public isRefunded(): any {
		return Success.getParameter("refunded", this.JSON_chunk);
	}

	public isActivated(): any {
		return Success.getParameter("active", this.JSON_chunk);
	}

	public isStarted(): any {
		return Success.getParameter("started", this.JSON_chunk);
	}

	public isExpired(): any {
		return Success.getParameter("expired", this.JSON_chunk);
	}

	public isUnderReview(): any {
		return Success.getParameter("risk", this.JSON_chunk);
	}

	public getFullResponse(type?: any): any {
		if (type === "JSON") {
			return this.JSON_chunk;
		} else {
			return this.String_chunk;
		}
	}

	public get3DHtml(): any {
		var secure = Success.getParameter("secure", this.JSON_chunk);
		return secure.formHTML;
	}

	public getChargeId(): any {
		if (this.JSON_chunk.object === "charge") {
			return Success.getParameter("id", this.JSON_chunk);
		} else {
			var all_chargeid = Success.getParameter("charge", this.JSON_chunk);
			return all_chargeid[all_chargeid.length - 1];
		}
	}

	public getOnetimeToken(): any {
		return Success.getParameter("token", this.JSON_chunk);
	}

	public getPermanentToken(): any {
		if (this.JSON_chunk.hasOwnProperty("card") && this.JSON_chunk.card != null) {
			var card = Success.getParameter("token", this.JSON_chunk);
			return card.token;
		} else {
			return null;
		}
	}

	public getCardInfo(): any {
		return Success.getParameter("card", this.JSON_chunk);
	}

	public getTrialInfo(): any {
		return Success.getParameter("trial", this.JSON_chunk);
	}

	public getSubscriptionId(): any {
		return Success.getParameter("id", this.JSON_chunk);
	}

	public getErrorCode(): any {
		return Err.getParameter("code", this.JSON_chunk);
	}

	public getErrorDetails(): any {
		return Err.getParameter("error", this.JSON_chunk);
	}
}
