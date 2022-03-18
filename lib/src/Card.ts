export class Card {
	number: number;
	exp_month: number;
	exp_year: number;
	cvv: any;
	constructor(number: number, exp_month: number, exp_year: number, cvv: any) {
		this.number = number;
		this.exp_month = exp_month;
		this.exp_year = exp_year;
		this.cvv = cvv;
	}
}
