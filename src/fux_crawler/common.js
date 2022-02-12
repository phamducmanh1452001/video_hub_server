const https = require('https');
const cheerio = require('cheerio');

const fetchHtml = (method, url, payload = undefined) => new Promise((resolve) => {
    https.get(
        url,
        res => {
            const dataBuffers = []
            res.on('data', data => dataBuffers.push(data.toString('utf8')))
            res.on('end', () => resolve(dataBuffers.join('')))
        }
    ).on('error', (e) => {
        console.error(e);
        throw new Error('Cannot get uav by code');        
    });
});

const loadHtml = url => new Promise((resolve) => {
    fetchHtml('GET', url)
    .then(html => {
        if (html != null && html != undefined) {
            const $ = cheerio.load(html);
            resolve($);
        } else {
            throw new Error('Cannot get uav by code #1');
        }
    })
    .catch(err => {
        throw err;
    });
});

module.exports = {
    loadHtml
}