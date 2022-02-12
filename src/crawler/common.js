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
    );
});

const loadHtml = url => new Promise((resolve) => {
    fetchHtml('GET', url)
    .then(html => {
        const $ = cheerio.load(html);
        resolve($);
    });
});

module.exports = {
    loadHtml
}