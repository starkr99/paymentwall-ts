import { Base } from "./Base";
import QueryString from "qs";
import { ApiType, SignatureVersion } from "./Config";
import { Pingback as Signature } from "./Signature/Pingback";
import { Product, ProductType } from "./Product";

export enum PingBackType {
	PINGBACK_TYPE_REGULAR = 0,
	PINGBACK_TYPE_GOODWILL = 1,
	PINGBACK_TYPE_NEGATIVE = 2,
}

export class Pingback extends Base {
	parameters: any;
	ipAddress: string;
	pingbackForBrick: any;

	constructor(parameters: any, ipAddress: string, pingbackForBrick: any) {
		super();
		this.errors = [];
		if (typeof parameters === "string") {
			parameters = QueryString.parse(parameters);
		} else if (parameters instanceof Object) {
		} else {
			console.log("Error: Please pass Object as the queryData in Paymentwall.Pingback(queryData, ip)");
		}

		this.parameters = parameters;
		this.ipAddress = ipAddress;
		this.pingbackForBrick = pingbackForBrick || false;
	}

    public validate(skipIpWhitelistCheck: boolean) {
		var pingbackForBrick = this.pingbackForBrick;
		var skipIpWhitelistCheck = skipIpWhitelistCheck || false;
		var validated = false;

		if (this.isParametersValid()) {
			if (this.isIpAddressValid() || skipIpWhitelistCheck) {
				if (this.isSignatureValid()) {
					validated = true;
				} else {
					this.appendToErrors('Wrong signature');
				}
			} else {
				this.appendToErrors('IP address is not whitelisted');
			}
		} else {
			this.appendToErrors('Missing parameters');
		}

		return validated;
	}

	public isSignatureValid() {
		var signatureParamsToSign:any = {};
		var signatureParams:any = [];
		if (this.getApiType() === ApiType.API_VC) {
			signatureParams = ['uid', 'currency', 'type', 'ref'];
		} else if (this.getApiType() === ApiType.API_GOODS) {
			if (!this.pingbackForBrick) {
				signatureParams = ['uid', 'goodsid', 'slength', 'speriod', 'type', 'ref'];
			} else{
				signatureParams = ['uid', 'slength', 'speriod', 'type', 'ref'];
			}
		} else { // API_CART
			signatureParams = ['uid', 'goodsid', 'type', 'ref'];
			this.parameters['sign_version'] = SignatureVersion.SIGNATURE_VERSION_2;
		}

		if (!this.parameters['sign_version'] || this.parameters['sign_version'] === SignatureVersion.SIGNATURE_VERSION_1) {

			var ref = this;

			signatureParams.forEach(function(field:any) {
				signatureParamsToSign[field] = (ref.parameters[field] !== undefined) ? ref.parameters[field] : null;
			});
			this.parameters['sign_version'] = SignatureVersion.SIGNATURE_VERSION_1;

		} else {
			signatureParamsToSign = this.parameters;
		}

		var signatureCalculated = Signature.calculateSignature(signatureParamsToSign, this.getSecretKey(), this.parameters['sign_version']);
		var signaturePassed = (this.parameters['sig'] !== undefined) ? this.parameters['sig'] : null;
		return signaturePassed === signatureCalculated;
	}

	public isIpAddressValid() {
		var ipsWhitelist = [
			'174.36.92.186',
			'174.36.96.66',
			'174.36.92.187',
			'174.36.92.192',
			'174.37.14.28'
		];

		var result = ipsWhitelist.indexOf(this.ipAddress) >= 0;
		if (!result) {
			const newIpRegexp = /^216\.127\.71\.(\d{1,3})$/;
			const match = this.ipAddress.match(newIpRegexp);
			if (!match || (parseInt(match[1]) < 0 || parseInt(match[1]) > 255)) {
				return false;
			}
		}

		return true;
	}

	public isParametersValid() {

		var errorsNumber = 0;
		var requiredParams = [];
		if (this.getApiType() === ApiType.API_VC) {
			requiredParams = ['uid', 'currency', 'type', 'ref', 'sig'];
		} else if (this.getApiType() === ApiType.API_GOODS) {
			if (!this.pingbackForBrick) {
				requiredParams = ['uid', 'goodsid', 'type', 'ref', 'sig'];
			} else{
				requiredParams = ['uid', 'type', 'ref', 'sig'];
			}
		} else { // Cart API
			requiredParams = ['uid', 'goodsid', 'type', 'ref', 'sig'];
		}

		var ref = this;

		if (typeof ref.parameters !== 'object') {
			ref.parameters = QueryString.parse(ref.parameters);}

		requiredParams.forEach(function(field) {
			if ((ref.parameters[field] === undefined) || ref.parameters[field] === '') {
				ref.appendToErrors('Parameter ' + field + ' is missing');
				errorsNumber++;
			}
		});

		return errorsNumber === 0;
	}

	public getParameter(param:any) {
		if (this.parameters[param] !== undefined) {
			return this.parameters[param];
		}
	}

	public getType():PingBackType {

		if (this.parameters['type']) {
			const type = parseInt(this.parameters['type']);
			return type;
		}else{
            return PingBackType.PINGBACK_TYPE_REGULAR
        }
	}

	public getUserId() {
		return this.getParameter('uid');
	}

	public getVirtualCurrencyAmount() {
		return this.getParameter('currency');
	}

	public getProductId() {
		return this.getParameter('goodsid');
	}

	public getProductPeriodLength() {
		return this.getParameter('slength');
	}

	public getProductPeriodType() {
		return this.getParameter('speriod');
	}

	public getReferenceId() {
		return this.getParameter('ref');
	}

	public getPingbackUniqueId() {
		return this.getReferenceId() + '_' + this.getType();
	}

	public getProduct() {
		return new Product(
			this.getProductId(),
			0,
			null,
			null,
			this.getProductPeriodLength() > 0 ? ProductType.TYPE_SUBSCRIPTION : ProductType.TYPE_FIXED,
			this.getProductPeriodLength(),
			this.getProductPeriodType()
		);
	}

	public getProducts() {
		var result = [];
		var productIds = this.getParameter('goodsid');

		if (productIds && productIds instanceof Array) {
			productIds.forEach(function(id) {
				result.push(new Product(id));
			});
		}
		return result;
	},

	public isDeliverable() {
		return (this.getType() === Pingback.PINGBACK_TYPE_REGULAR || this.getType() === Pingback.PINGBACK_TYPE_GOODWILL);
	},

	public isCancelable() {
		return this.getType() === Pingback.PINGBACK_TYPE_NEGATIVE;
	},
}
