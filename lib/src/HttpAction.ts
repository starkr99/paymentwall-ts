// import https from "https";

export class HttpAction {
	public static runAction = function (post_options: any, post_data: any, https_action: any, callback: any) {
		// var abstractResponse = function (res: any) {
		// 	res.setEncoding("utf8");
		// 	res.on("data", function (String_chunk: any) {
		// 		var JSON_chunk = JSON.parse(String_chunk);
		// 		var response = new Response(JSON_chunk, String_chunk);
		// 		callback(response);
		// 	});
		// };
		console.log(post_options);
		// post_options.port = 443;
		// var post_req = https.request(post_options, function (res) {
		// 	abstractResponse(res);
		// });

		// post_req.write(post_data);
		// post_req.end();
	};
}
