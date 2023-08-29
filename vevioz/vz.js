const { default: axios } = require("axios");


axios("https://api.vevioz.com/apis/button/mp4", {
	params: {
		url: "https://www.youtube.com/watch?v=mYHPnqa7B3Y"
	}
})
	.then(res => {
		console.log(res.data);
	})
