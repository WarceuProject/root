const express = require("express");
const app = express();
const PORT = 12096;
const { downloadAudio, downloadVideo } = require("./dl");
// const bodyParser = require("body-parser");
// audio -> ytdlp -f 18 https://youtube.com/watch?v=RSWPTbP2uik -x --audio-quality 5 --audio-format mp3 -o %path.mp3
// video -> ytdlp -f 18 https://youtube.com/watch?v=RSWPTbP2uik -o %path.mp4


app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get("/test", (req, res, next) => {
	res.end(`<iframe src=/tmp/test.mp4></iframe>`);
});
app.get('/dl/mp3', async (req, res, next) => {
	const { url } = (req.query || {});
	
	if (!url) {
		return res.sendStatus(400);
	}
	
	const audio = await downloadAudio(url);
	
	if (!audio) {
		return res.sendStatus(500);
	}
	
	// res.setHeader("Content-type", "audio/mpeg");
    res.json(audio);
});
app.get('/dl/mp4', async (req, res, next) => {
	const { url } = (req.query || {});
	
	if (!url) {
		return res.sendStatus(400);
	}
	
	const video = await downloadVideo(url);
	
	if (!video) {
		return res.sendStatus(500);
	}
	
	// res.setHeader("Content-type", "video/mp4");
    res.json(video);
});
app.listen(PORT, () => {
    console.log("App running on port: %s", PORT);
});
