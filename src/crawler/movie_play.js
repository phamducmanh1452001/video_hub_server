const { loadHtml } = require('./common')
const https = require('https')
const axios = require('axios')

const scrapeHtml = url => new Promise((resolve) => {
    loadHtml(url)
    .then($ => {
        const ans = $('#div3').find('div').find('iframe')['0'];

        var smartShareLink;
        if (ans != undefined) {
            smartShareLink = ans.attribs.src;
        } else {
            const ans = $('#div2').find('div').find('iframe')['0'];
            smartShareLink = ans.attribs.src;
        }
        
        var actor = $('p[class="meta_dd limpiar"]').find('a').text();
        var imageLink = $('img[class="cover"]')['0'].attribs.src;
        var data = {
            'smartShareLink': smartShareLink,
            'actor': actor,
            'imageLink': imageLink,
        };

        resolve(data);
    });
});

const getSmartShareLinkByItemLink = (url) => new Promise((resolve) => {
    scrapeHtml(url)
    .then(data => {
        resolve(data);
    });
});

const getOriginLinkFromSmartShare = (url) => new Promise((resolve) => {
    axios
        .post(url.replace('/v/', '/api/source/'))
        .then(res => {
            resolve(res.data.data[1].file);
        })
        .catch(error => {
            console.error(error);
        }
    );
});

module.exports = {
    getSmartShareLinkByItemLink,
    getOriginLinkFromSmartShare
};