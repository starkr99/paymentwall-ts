import { Abstract } from "./Abstract";
import { JSHash, CONSTANTS } from "react-native-hash";

class Pingback {
	public static async calculateSignature(params: any, secret: string, version: number) {
		var baseString = "";
		var params = params;
		var sig;

		if (params.sig) {
			sig = params.sig;
			delete params.sig;
		}

		if (version !== 1) {
			baseString = Abstract.sortObject(params);
		} else {
			baseString =
				"uid=" +
				params.uid +
				"goodsid=" +
				params.goodsid +
				"slength=" +
				params.slength +
				"speriod=" +
				params.speriod +
				"type=" +
				params.type +
				"ref=" +
				params.ref;
		}

		baseString += secret;
		const algorithm = version === 3 ? CONSTANTS.HashAlgorithms.sha256 : CONSTANTS.HashAlgorithms.md5;

		const shasum = await JSHash(baseString, algorithm);

		params.sig = sig;
		return shasum;
	}
}

export { Pingback };
export { Pingback as PingbackSignature };
