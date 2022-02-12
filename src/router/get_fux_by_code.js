const router = require('express').Router();
const dbcontainer = require('../dbcontainer');
const { FuxResponse } = require('./response');
const { loadHtml } = require('../fux_crawler/common');

let cachedFuxesByCode = new Map();

router.get('/:code', function(req, res, next) {
    const code = req.params.code;
    if (cachedFuxesByCode.has(code)) {
        res.json(
            new FuxResponse(cachedFuxesByCode.get(code))
        );
        return;
    }
    let fux;
    let files;
    let imageLink;

    dbcontainer
    .getFuxByCode(code)
    .then(value => {
        fux = value;
        if (fux == undefined) {
            console.log('Not found');
            res.status(404).json({
                'message': 'not found',
            });
        } else if (files != undefined) {
            fux.files = files;
            fux.imageLink = imageLink;
            res.json(
                new FuxResponse(fux)
            );
        }
    });

    getVideoLinkByCode(code)
    .then(value => {
        if (fux != undefined) {
            fux.imageLink = value.imageLink;
            fux.files = value.files;

            cachedFuxesByCode.set(code, fux);
            setTimeout(() => {
                cachedFuxesByCode.delete(code);
            }, 1200 * 3600);

            res.json(
                new FuxResponse(fux)
            );
        } else {
            files = value.files;
            imageLink = value.imageLink;
        }
    });
});

const getVideoLinkByCode = code => new Promise((resolve) => {
    loadHtml(`https://fuxporn.com/embed.php?id=${code}`)
    .then($ => {
        let imageLink = $('#my-video').attr('poster');
        let files = {
            '1080p': '',
            '720p': '',
            '360p': ''
        };
        files['1080p'] = $('source[title="1080p"]').attr('src');
        files['720p'] = $('source[title="720p"]').attr('src');
        files['360p'] = $('source[title="360p"]').attr('src');

        resolve({
            files: files,
            imageLink: imageLink,
        });
    })
    .catch(err => {
        resolve({
            files: [],
            imageLink: '',
        });
    });
});

module.exports = router;