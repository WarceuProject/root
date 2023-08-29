const { default: axios } = require("axios");
const { JSDOM } = require("jsdom");


class VeviozAPI {
    constructor(yturl) {
        this.yturl = yturl;
        this.originurl = "https://api.vevioz.com/api/button";
        this.vidID = "jT1DA5H69H4";
    }
    async #getInfo(ftype) {
        let res;

        switch (ftype) {
            case "audios":
            case "mp3":
                ftype = "mp3";
                res = await axios(`${this.originurl}/${ftype}/${this.vidID}`).catch(e => e);
                break;
            case "videos":
            case "mp4":
                ftype = "videos";
                res = await axios(`${this.originurl}/${ftype}/${this.vidID}`).catch(e => e);
                break;
            default:
                throw TypeError("Invalid ftype: " + ftype);
                break;
        }

        if (!res.data || res instanceof Error) {
            throw Error("Failed getting info: " + res.message);
        }

        return {
            json() {
                return res.data || null;
            },
            cookie() {
                return (res.headers?.["set-cookie"] || []).join("; ") || null;
            }
        }
    }
    async #factoryJsonResult(ftype) {
        const data = (await this.#getInfo(ftype)).json();
        const { window } = new JSDOM(data);
        const { document } = window;
        const results = [].slice.call(document.querySelectorAll("div a"));

        if (!results || !results.length) {
            throw Error("Something error");
        }

        const mediaList = results.reduce((obj, el) => {
            const [ftype, fquality, ,fsize] = [].slice.call(el.children);
            const dlink = el.getAttribute("href");
            const type = ftype.textContent.toLowerCase();
            const quality = fquality.textContent.replace(/\D+/g, "");
            
            return {
                ...obj,
                [quality]: {
                    fquality: fquality.textContent.trim(),
                    fsize: fsize.textContent,
                    dlink,
                    type
                }
            };
        }, {});

        return mediaList;
    }
    async getAudios() {
        return await this.#factoryJsonResult("audios");
    }
    async getVideos() {
        return await this.#factoryJsonResult("videos");
    }
}

module.exports = VeviozAPI;
