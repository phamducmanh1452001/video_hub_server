const router = require('express').Router();
const axios = require('axios');
const http = require('http')
const https = require('https')

const dbcontainer = require('../dbcontainer');
const { VideoResponse } = require('./response');

let cachedVideosByCode = new Map();

router.get('/:code', function(req, res, next) {
    const code = req.params.code;
    if (cachedVideosByCode.has(code)) {
        res.json(
            new VideoResponse(cachedVideosByCode.get(code), true)
        );
        return;
    }
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(clientIp);
    let video;
    let files;

    dbcontainer
    .getVideoByCode(code)
    .then(value => {
        video = value;
        if (video == undefined) {
            console.log('Not found');
            res.status(404).json({
                'message': 'not found',
            });
        } else {
            video.files = {};
            res.json(
                new VideoResponse(video, true)
            );
        }
    });
});

module.exports = router;