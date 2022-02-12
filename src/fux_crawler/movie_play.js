const { loadHtml } = require('./common')
const https = require('https')
const axios = require('axios');

const getVideoLinkByCode = code => new Promise((resolve) => {
    loadHtml(`https://fuxporn.com/embed.php?id=${code}`)
    .then($ => {
        let imageLink = $('#my-video').attr('poster');
        let file = $('source[title="1080p"]').attr('src');
        if (file == undefined) {
            file = $('source[title="720p"]').attr('src');
        }
        if (file == undefined) {
            file = $('source[title="360p"]').attr('src');
        }
        resolve({
            file: file,
            image: imageLink,
        });
    });
});

const getVideoCodeLinkByUrl = url => new Promise((resolve) => {
    loadHtml(`https://fuxporn.com${url}`)
    .then($ => {
        let title = $('title').text();
        let code = $('iframe[class="embed-responsive-item"]').attr('src').replace('/embed.php?id=', '');
        resolve({
            title: title,
            code: code,
        });
    });
});

module.exports = {
    getVideoCodeLinkByUrl,
    getVideoLinkByCode,
}
