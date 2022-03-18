import { CONSTANTS, JSHash } from "react-native-hash";
import { Abstract } from "./Abstract";

export class Widget {
	public static async calculateSignature(params: any, secret: string, version: number) {
		var baseString = "";

		const algorithm = version === 3 ? CONSTANTS.HashAlgorithms.sha256 : CONSTANTS.HashAlgorithms.md5;

		if (version === 1) {
			// TODO: throw exception if no uid parameter is present
			baseString += params["uid"] || "";
			baseString += secret;
		} else {
			if (params instanceof Object) {
				baseString = Abstract.sortObject(params);
			}

			baseString += secret;
		}

		return await JSHash(baseString, algorithm);
	}
}
