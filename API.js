
exports.go = function(path, data, success_callback, fail_callback) {
	console.log("calling api");
	console.log(data);
	var xhr = Ti.Network.createHTTPClient({
		onload: function(e) {
			var o;
			try {
				o = JSON.parse(this.responseText);
			} catch (error) {
				
			}
			if (o) { 
				console.log("callback ok");
				console.log(o);
				if (o.success) {
					if (success_callback) {
						success_callback(o);
					}
				} else {
					if (fail_callback) {
						if (o.err) {
							fail_callback(o.err);
						} else {
							fail_callback(["你觉得有什么地方不对，但是又说不上来."]);
						}
					}
				}
			} else {
				if (fail_callback) {
					fail_callback(["你觉得有什么地方不对，但是又说不上来"]);
				}
			}
		},
		onerror: function(e) {
			console.log("api failed " + exports.baseURL + path);
			console.log(e);
			if (fail_callback) {
				console.log("calling api fail callback");
				fail_callback(["网络好像不太通畅"]);
			}
		},
		timeout: 30000,
	});
	xhr.open("POST", exports.baseURL + path + "?r=" + new Date().getTime());
	xhr.send(data);
};