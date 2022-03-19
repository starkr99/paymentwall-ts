export enum ApiType {
	API_VC = 1,
	API_GOODS = 2,
	API_CART = 3,
}
export enum SignatureVersion {
	SIGNATURE_VERSION_1 = 1,
	SIGNATURE_VERSION_2 = 2,
	SIGNATURE_VERSION_3 = 3,
	DEFAULT_SIGNATURE_VERSION = 3,
}

export enum Controllers {
	VC_CONTROLLER = "ps",
	GOODS_CONTROLLER = "subscription",
	CART_CONTROLLER = "cart",
}

export class Config {
	public static apiType: ApiType;
	public static appKey: string;
	public static secretKey: string;

	public init(appKey: string, secretKey: string, apiType: ApiType) {
		Config.appKey = appKey;
		Config.secretKey = secretKey;
		Config.apiType = apiType;
	}

	public static WIDGET_BASE_URL = "https://api.paymentwall.com/api";

	public static BRICK_ONETIMETOKEN_TEST_BASE_URL: string = "pwgateway.com";
	public static BRICK_ONETIMETOKEN_TEST_PATH: string = "/api/token";
	public static BRICK_BASE_URL: string = "api.paymentwall.com";
	public static BRICK_ONETIMETOKEN_PATH: string = "/api/brick/token";
	public static BRICK_CHARGE_PATH: string = "/api/brick/charge";
	public static BRICK_SUBSCRIPTION_CHARGE_PATH: string = "/api/brick/subscription";

	public static VERSION: string = "2.0.0";
}

export { Config as Configure };
