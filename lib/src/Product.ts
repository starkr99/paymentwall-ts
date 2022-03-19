export enum ProductType {
	TYPE_SUBSCRIPTION = "subscription",
	TYPE_FIXED = "fixed",
}
export enum PeriodType {
	PERIOD_TYPE_DAY = "day",
	PERIOD_TYPE_WEEK = "week",
	PERIOD_TYPE_MONTH = "month",
	PERIOD_TYPE_YEAR = "year",
}
export class Product {
	productId: string;
	amount: number;
	currencyCode: string | undefined;
	name: string | undefined;
	productType: ProductType | undefined;
	periodLength: number | undefined;
	periodType: PeriodType | undefined;
	recurring: boolean;
	trialProduct: number;
	constructor(
		productId: string,
		amount: number = 0,
		currencyCode?: string,
		name?: string,
		productType?: ProductType,
		periodLength?: number,
		periodType?: PeriodType,
		recurring: boolean = false,
		trialProduct: number = 0
	) {
		this.productId = productId;
		this.amount = amount;
		this.currencyCode = currencyCode;
		this.name = name;
		this.productType = productType;
		this.periodLength = periodLength;
		this.periodType = periodType;
		this.recurring = recurring;
		this.trialProduct = trialProduct;
	}
	public getId(): string {
		return this.productId;
	}

	public getAmount() {
		return this.amount;
	}

	public getCurrencyCode() {
		return this.currencyCode;
	}

	public getName() {
		return this.name;
	}

	public getType() {
		return this.productType;
	}

	public getPeriodType() {
		return this.periodType;
	}

	public getPeriodLength() {
		return this.periodLength;
	}

	public isRecurring() {
		return this.recurring;
	}

	public getTrialProduct() {
		return this.trialProduct;
	}
}
