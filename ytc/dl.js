const path = require("path");
const audio = path.join(__dirname, "./public/tmp/audio.mp3");
const video = path.join(__dirname, "./public/tmp/video.mp4");
const cp = require("child_process");
const fs = require("fs");
const util = require("util");
const execAsync = util.promisify(cp.exec);
const { filesize } = require("filesize");


async function fetchVideo(url) {
	const { stdout, stderr } = await execAsync(`ytdlp -f 22 ${url} -o ${video} --quiet`).catch(e => {});
	const mediaExists = fs.existsSync(video);
	
	if (!mediaExists) {
		return;
	}
	
	const buffer = fs.readFileSync(video);
	const fsize = filesize(buffer.byteLength);
	
	fs.unlinkSync(video);
	console.log("remove %s", video);
	
	return {
		media: buffer.toString("base64"),
		fsize
	};
}

async function fetchAudio(url) {
	const { stdout, stderr } = await execAsync(`ytdlp -f 22 ${url} -x --audio-quality 5 --audio-format mp3 -o ${audio} --quiet`);
	const mediaExists = fs.existsSync(audio);
	
	if (!mediaExists) {
		return;
	}
	
	const buffer = fs.readFileSync(audio);
	const fsize = filesize(buffer.byteLength);
	
	fs.unlinkSync(audio);
	console.log("remove %s", audio);
	
	return {
		media: buffer.toString('base64'),
		fsize
	};
}

exports.downloadAudio = fetchAudio;
exports.downloadVideo = fetchVideo;

// require("axios")
// 	.default("http://154.53.61.106:12096/dl/mp4", {
// 		params: {
// 			url: "https://youtube.com/watch?v=RSWPTbP2uik"
// 		},
// 		responseType: "json"
// 	})
// 	.then(res => {
// 		console.log(res.data.fsize);
// 		require("fs").writeFileSync("./public/tmp/test.mp4", Buffer.from(res.data.media, 'base64'));
// 	});
